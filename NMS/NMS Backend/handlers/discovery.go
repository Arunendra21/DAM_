package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/dciphers/nms-backend/models"
	"github.com/dciphers/nms-backend/services"
	"github.com/dciphers/nms-backend/sse"
)

// DiscoveryHandler exposes:
//
//	POST   /api/v1/discovery              — start a new discovery job
//	GET    /api/v1/discovery              — list recent jobs
//	GET    /api/v1/discovery/{id}         — get job status + results
//	GET    /api/v1/discovery/{id}/stream  — SSE live progress stream
type DiscoveryHandler struct {
	db     *sql.DB
	svc    *services.DiscoveryService
	broker *sse.Broker
}

func NewDiscoveryHandler(db *sql.DB, svc *services.DiscoveryService, broker *sse.Broker) *DiscoveryHandler {
	return &DiscoveryHandler{db: db, svc: svc, broker: broker}
}

// Start — POST /api/v1/discovery
// Accepts { start_ip, end_ip, community } or { cidr, community }.
// Returns { job_id, message, status_url, stream_url }.
func (h *DiscoveryHandler) Start(w http.ResponseWriter, r *http.Request) {
	var req services.DiscoveryRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if req.CIDR == "" && (req.StartIP == "" || req.EndIP == "") {
		writeError(w, http.StatusBadRequest, "provide 'cidr' or both 'start_ip' and 'end_ip'")
		return
	}
	if req.Community == "" {
		req.Community = "public"
	}

	jobID, err := h.svc.StartJob(r.Context(), req)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to start discovery: "+err.Error())
		return
	}

	writeJSON(w, http.StatusAccepted, map[string]any{
		"job_id":     jobID,
		"message":    "Discovery started",
		"status_url": fmt.Sprintf("/api/v1/discovery/%d", jobID),
		"stream_url": fmt.Sprintf("/api/v1/discovery/%d/stream", jobID),
	})
}

// GetJob — GET /api/v1/discovery/{id}
func (h *DiscoveryHandler) GetJob(w http.ResponseWriter, r *http.Request) {
	id, err := parseJobID(r)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid job id")
		return
	}

	var job models.DiscoveryJob
	var cidr sql.NullString
	err = h.db.QueryRowContext(r.Context(), `
		SELECT id, status, start_ip, end_ip, cidr, community,
		       alive_count, snmp_count, created_at, updated_at
		FROM discovery_jobs
		WHERE id = $1
	`, id).Scan(
		&job.ID, &job.Status, &job.StartIP, &job.EndIP, &cidr, &job.Community,
		&job.AliveCount, &job.SNMPCount, &job.CreatedAt, &job.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		writeError(w, http.StatusNotFound, "job not found")
		return
	}
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to fetch job")
		return
	}

	if cidr.Valid {
		job.CIDR = cidr.String
	}
	writeJSON(w, http.StatusOK, job)
}

// ListJobs — GET /api/v1/discovery
func (h *DiscoveryHandler) ListJobs(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.QueryContext(r.Context(), `
		SELECT id, status, start_ip, end_ip, COALESCE(cidr,''), community,
		       alive_count, snmp_count, created_at, updated_at
		FROM discovery_jobs
		ORDER BY created_at DESC
		LIMIT 50
	`)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list jobs")
		return
	}
	defer rows.Close()

	jobs := []models.DiscoveryJob{}
	for rows.Next() {
		var j models.DiscoveryJob
		if err := rows.Scan(
			&j.ID, &j.Status, &j.StartIP, &j.EndIP, &j.CIDR, &j.Community,
			&j.AliveCount, &j.SNMPCount, &j.CreatedAt, &j.UpdatedAt,
		); err != nil {
			continue
		}
		jobs = append(jobs, j)
	}

	writeJSON(w, http.StatusOK, jobs)
}

// Stream — GET /api/v1/discovery/{id}/stream
// Upgrades the connection to an SSE stream.  Must NOT be wrapped in the global
// request-timeout middleware (see main.go routing).
func (h *DiscoveryHandler) Stream(w http.ResponseWriter, r *http.Request) {
	id, err := parseJobID(r)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid job id")
		return
	}
	h.broker.ServeSSE(w, r, id)
}

func parseJobID(r *http.Request) (int64, error) {
	return strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
}
