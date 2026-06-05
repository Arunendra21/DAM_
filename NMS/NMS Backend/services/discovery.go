package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/dciphers/nms-backend/sse"
)

// DiscoveryRequest is the decoded POST /api/v1/discovery body.
type DiscoveryRequest struct {
	StartIP   string `json:"start_ip"`
	EndIP     string `json:"end_ip"`
	CIDR      string `json:"cidr"`
	Community string `json:"community"`
}

// DiscoveryService orchestrates the two-stage network discovery pipeline
// and streams progress events over SSE.
type DiscoveryService struct {
	db     *sql.DB
	broker *sse.Broker
}

func NewDiscoveryService(db *sql.DB, broker *sse.Broker) *DiscoveryService {
	return &DiscoveryService{db: db, broker: broker}
}

// StartJob persists a new job row and launches the discovery pipeline in a
// background goroutine.  It returns the new job ID immediately.
func (s *DiscoveryService) StartJob(ctx context.Context, req DiscoveryRequest) (int64, error) {
	if req.Community == "" {
		req.Community = "public"
	}

	var jobID int64
	err := s.db.QueryRowContext(ctx, `
		INSERT INTO discovery_jobs (status, start_ip, end_ip, cidr, community)
		VALUES ('running', $1, $2, $3, $4)
		RETURNING id
	`, req.StartIP, req.EndIP, nullableStr(req.CIDR), req.Community).Scan(&jobID)
	if err != nil {
		return 0, fmt.Errorf("create discovery job: %w", err)
	}

	go s.run(jobID, req)
	return jobID, nil
}

// publish serialises data as JSON and broadcasts it to all SSE subscribers.
func (s *DiscoveryService) publish(jobID int64, eventType string, data any) {
	b, _ := json.Marshal(data)
	s.broker.Publish(jobID, sse.Event{Type: eventType, Data: string(b)})
}

// run is the background goroutine executing Stage 1 (ping) then Stage 2 (SNMP).
func (s *DiscoveryService) run(jobID int64, req DiscoveryRequest) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Minute)
	defer cancel()

	// ── Preamble ─────────────────────────────────────────────────────────────
	log.Printf("[Job %d] Discovery started  start=%s end=%s cidr=%s community=%s",
		jobID, req.StartIP, req.EndIP, req.CIDR, req.Community)

	s.publish(jobID, "discovery_started", map[string]any{
		"job_id":    jobID,
		"start_ip":  req.StartIP,
		"end_ip":    req.EndIP,
		"cidr":      req.CIDR,
		"community": req.Community,
	})

	// ── Stage 1: build IP list ────────────────────────────────────────────────
	var (
		ips []string
		err error
	)
	if req.CIDR != "" {
		ips, err = ExpandCIDR(req.CIDR)
	} else {
		ips, err = ExpandRange(req.StartIP, req.EndIP)
	}
	if err != nil {
		s.failJob(ctx, jobID, err)
		return
	}

	log.Printf("[Job %d] Stage 1: Pinging %d IPs...", jobID, len(ips))
	s.publish(jobID, "stage1_started", map[string]any{
		"total":   len(ips),
		"message": fmt.Sprintf("Stage 1: Pinging %d IPs...", len(ips)),
	})

	// Concurrent ping scan — callback fires for each alive host.
	aliveHosts := ScanPing(ctx, ips, func(ip string) {
		log.Printf("[Job %d] ping ✓ %s", jobID, ip)
		s.publish(jobID, "host_found", map[string]any{"ip": ip})
	})

	log.Printf("[Job %d] Stage 1 complete: %d alive IPs found", jobID, len(aliveHosts))
	s.publish(jobID, "stage1_completed", map[string]any{
		"alive_count": len(aliveHosts),
		"message":     fmt.Sprintf("Stage 1 complete:\n%d alive IPs found", len(aliveHosts)),
	})

	s.db.ExecContext(ctx, `UPDATE discovery_jobs SET alive_count=$1, updated_at=NOW() WHERE id=$2`,
		len(aliveHosts), jobID)

	// ── Stage 2: SNMP scan ────────────────────────────────────────────────────
	log.Printf("[Job %d] Stage 2: SNMP checking %d alive IPs  community=%s",
		jobID, len(aliveHosts), req.Community)
	s.publish(jobID, "stage2_started", map[string]any{
		"targets":   len(aliveHosts),
		"community": req.Community,
		"message": fmt.Sprintf(
			"Stage 2:\nSNMP checking %d alive IPs\n\nCommunity String:\n%s",
			len(aliveHosts), req.Community,
		),
	})

	var (
		mu          sync.Mutex
		snmpResults []*SNMPResult
	)

	// Limit SNMP concurrency to avoid flooding the network.
	const snmpWorkers = 10
	sem := make(chan struct{}, snmpWorkers)
	var wg sync.WaitGroup

	for _, ip := range aliveHosts {
		if ctx.Err() != nil {
			break
		}
		wg.Add(1)
		ip := ip
		sem <- struct{}{}
		go func() {
			defer wg.Done()
			defer func() { <-sem }()

			result, err := CheckSNMP(ip, req.Community)
			if err != nil {
				log.Printf("[Job %d] SNMP ✗ %s: %v", jobID, ip, err)
				return
			}

			mu.Lock()
			snmpResults = append(snmpResults, result)
			mu.Unlock()

			log.Printf("[Job %d] SNMP ✓ %s  name=%q", jobID, ip, result.SystemName)
			s.publish(jobID, "snmp_found", map[string]any{
				"ip":          ip,
				"system_name": result.SystemName,
				"system_descr": result.SystemDescr,
				"uptime":      result.Uptime,
				"if_count":    result.IfCount,
			})

			s.upsertDevice(ip, result)
		}()
	}
	wg.Wait()

	log.Printf("[Job %d] Stage 2 complete: %d SNMP devices found", jobID, len(snmpResults))
	s.publish(jobID, "stage2_completed", map[string]any{
		"snmp_count": len(snmpResults),
		"message":    fmt.Sprintf("Stage 2 complete:\n%d SNMP devices found", len(snmpResults)),
	})

	// ── Finalise ──────────────────────────────────────────────────────────────
	s.db.ExecContext(ctx,
		`UPDATE discovery_jobs SET status='completed', snmp_count=$1, updated_at=NOW() WHERE id=$2`,
		len(snmpResults), jobID)

	summary := fmt.Sprintf("Scan complete\n\n%d hosts alive\n%d SNMP devices found",
		len(aliveHosts), len(snmpResults))
	log.Printf("[Job %d] %s", jobID, summary)

	s.publish(jobID, "discovery_completed", map[string]any{
		"job_id":      jobID,
		"alive_count": len(aliveHosts),
		"snmp_count":  len(snmpResults),
		"message":     summary,
	})

	// Signal all SSE subscribers that the stream is done.
	s.broker.CloseJob(jobID)
}

// upsertDevice inserts a newly discovered SNMP device or updates an existing
// record matched by IP address.
func (s *DiscoveryService) upsertDevice(ip string, r *SNMPResult) {
	var id int64
	err := s.db.QueryRow(`SELECT id FROM devices WHERE ip_address = $1`, ip).Scan(&id)

	switch err {
	case nil:
		// Update the existing row.
		_, dbErr := s.db.Exec(`
			UPDATE devices
			SET status='online', snmp_enabled=true,
			    system_name=$1, system_description=$2,
			    last_seen=NOW(), updated_at=NOW()
			WHERE ip_address=$3
		`, r.SystemName, r.SystemDescr, ip)
		if dbErr != nil {
			log.Printf("device update %s: %v", ip, dbErr)
		}
	case sql.ErrNoRows:
		// Insert a new discovered device.
		name := r.SystemName
		if name == "" {
			name = ip
		}
		_, dbErr := s.db.Exec(`
			INSERT INTO devices
				(ip_address, hostname, mac_address, status, snmp_enabled,
				 system_name, system_description, last_seen)
			VALUES ($1, $2, '', 'online', true, $3, $4, NOW())
		`, ip, name, r.SystemName, r.SystemDescr)
		if dbErr != nil {
			log.Printf("device insert %s: %v", ip, dbErr)
		}
	default:
		log.Printf("device lookup %s: %v", ip, err)
	}
}

// failJob marks the job as failed and broadcasts the error to subscribers.
func (s *DiscoveryService) failJob(ctx context.Context, jobID int64, cause error) {
	log.Printf("[Job %d] failed: %v", jobID, cause)
	s.db.ExecContext(ctx, `UPDATE discovery_jobs SET status='failed', updated_at=NOW() WHERE id=$1`, jobID)
	s.publish(jobID, "discovery_failed", map[string]any{"error": cause.Error()})
	s.broker.CloseJob(jobID)
}

// nullableStr converts an empty string to nil so it is stored as SQL NULL.
func nullableStr(s string) any {
	if s == "" {
		return nil
	}
	return s
}
