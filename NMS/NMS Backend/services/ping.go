package services

import (
	"context"
	"encoding/binary"
	"fmt"
	"net"
	"os/exec"
	"sync"
	"time"
)

const pingWorkers = 50

// ExpandRange returns every IPv4 address between startIP and endIP (inclusive).
func ExpandRange(startIP, endIP string) ([]string, error) {
	s := net.ParseIP(startIP).To4()
	e := net.ParseIP(endIP).To4()
	if s == nil || e == nil {
		return nil, fmt.Errorf("invalid IP address in range: %s - %s", startIP, endIP)
	}
	sn := binary.BigEndian.Uint32(s)
	en := binary.BigEndian.Uint32(e)
	if sn > en {
		return nil, fmt.Errorf("start_ip must be <= end_ip")
	}
	if en-sn > 65535 {
		return nil, fmt.Errorf("range too large (max 65535 hosts per scan)")
	}
	ips := make([]string, 0, en-sn+1)
	for n := sn; n <= en; n++ {
		b := make(net.IP, 4)
		binary.BigEndian.PutUint32(b, n)
		ips = append(ips, b.String())
	}
	return ips, nil
}

// ExpandCIDR returns every host address within the given CIDR notation.
func ExpandCIDR(cidr string) ([]string, error) {
	_, ipNet, err := net.ParseCIDR(cidr)
	if err != nil {
		return nil, fmt.Errorf("invalid CIDR %q: %w", cidr, err)
	}

	// Guard against huge prefixes (e.g. /8 = 16 million hosts).
	ones, bits := ipNet.Mask.Size()
	if bits-ones > 16 {
		return nil, fmt.Errorf("CIDR prefix too large (max /16); got /%d", ones)
	}

	var ips []string
	ip := cloneIP(ipNet.IP)
	for ipNet.Contains(ip) {
		ips = append(ips, ip.String())
		incrementIP(ip)
	}
	return ips, nil
}

func cloneIP(ip net.IP) net.IP {
	clone := make(net.IP, len(ip))
	copy(clone, ip)
	return clone
}

func incrementIP(ip net.IP) {
	for i := len(ip) - 1; i >= 0; i-- {
		ip[i]++
		if ip[i] != 0 {
			return
		}
	}
}

// pingHost sends one ICMP echo via the system ping binary and reports success.
// Using os/exec avoids the need for raw-socket privileges while staying portable
// on Linux.  Each invocation respects the parent context deadline.
func pingHost(ctx context.Context, ip string) bool {
	ctx, cancel := context.WithTimeout(ctx, 1500*time.Millisecond)
	defer cancel()
	// -c 1 : one packet  -W 1 : 1-second deadline  -n : skip DNS
	cmd := exec.CommandContext(ctx, "ping", "-c", "1", "-W", "1", "-n", ip)
	return cmd.Run() == nil
}

// ScanPing pings all ips concurrently using a fixed worker pool.
// onAlive is called (from goroutines) for each host that responds — callers
// must synchronise any shared state they touch inside the callback.
// The returned slice contains only the alive IPs; order is non-deterministic.
func ScanPing(ctx context.Context, ips []string, onAlive func(ip string)) []string {
	jobs := make(chan string, len(ips))
	type result struct {
		ip    string
		alive bool
	}
	results := make(chan result, len(ips))

	var wg sync.WaitGroup
	for i := 0; i < pingWorkers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for ip := range jobs {
				if ctx.Err() != nil {
					results <- result{ip: ip, alive: false}
					continue
				}
				alive := pingHost(ctx, ip)
				results <- result{ip: ip, alive: alive}
				if alive && onAlive != nil {
					onAlive(ip)
				}
			}
		}()
	}

	for _, ip := range ips {
		jobs <- ip
	}
	close(jobs)

	go func() {
		wg.Wait()
		close(results)
	}()

	var alive []string
	for r := range results {
		if r.alive {
			alive = append(alive, r.ip)
		}
	}
	return alive
}
