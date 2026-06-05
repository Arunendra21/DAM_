package db

import "database/sql"

// Seed inserts demo data only when tables are empty.
func Seed(database *sql.DB) error {
	if err := seedDevices(database); err != nil {
		return err
	}
	return seedAlerts(database)
}

func seedDevices(database *sql.DB) error {
	var count int
	if err := database.QueryRow(`SELECT COUNT(*) FROM devices`).Scan(&count); err != nil {
		return err
	}
	if count > 0 {
		return nil
	}

	devices := []struct{ ip, hostname, mac, status string }{
		{"192.168.1.15", "HQ-DEVELOPER-LTP01", "00:1A:2B:3C:4D:01", "online"},
		{"192.168.1.88", "HQ-FINANCE-DESK02", "00:1A:2B:3C:4D:02", "online"},
		{"192.168.10.12", "HQ-RECEPTION-LTP04", "00:1A:2B:3C:4D:03", "online"},
		{"192.168.10.155", "HQ-MARKETING-LTP09", "00:1A:2B:3C:4D:04", "offline"},
		{"10.0.0.10", "HQ-SERVER-AD01", "00:1A:2B:3C:4D:05", "online"},
		{"10.0.1.12", "OPS-WORKSTATION-01", "00:1A:2B:3C:4D:06", "online"},
		{"10.0.2.10", "OPS-WORKSTATION-02", "00:1A:2B:3C:4D:07", "online"},
		{"45.227.254.18", "EXT-HOST-APAC-01", "AA:BB:CC:DD:EE:01", "online"},
		{"103.22.200.15", "EXT-HOST-EU-01", "AA:BB:CC:DD:EE:02", "offline"},
	}

	for _, d := range devices {
		_, err := database.Exec(
			`INSERT INTO devices (ip_address, hostname, mac_address, status) VALUES ($1,$2,$3,$4)`,
			d.ip, d.hostname, d.mac, d.status,
		)
		if err != nil {
			return err
		}
	}
	return nil
}

func seedAlerts(database *sql.DB) error {
	var count int
	if err := database.QueryRow(`SELECT COUNT(*) FROM alerts`).Scan(&count); err != nil {
		return err
	}
	if count > 0 {
		return nil
	}

	alerts := []struct {
		title, description, srcIP, dstIP, severity, category string
		packets                                               int
	}{
		{
			"DDoS SYN Flood Detected",
			"Volumetric SYN flood from external host targeting internal web server. 14,000+ packets per second.",
			"45.227.254.18", "10.0.1.12", "critical", "DDoS", 14820,
		},
		{
			"Port Scan from External Host",
			"Systematic TCP port sweep detected across internal subnet from Russian IP range.",
			"103.22.200.15", "192.168.1.0", "high", "Port Scan", 1248,
		},
		{
			"Suspicious DNS Tunneling Activity",
			"High-frequency DNS queries with abnormally long subdomains — possible data exfiltration.",
			"192.168.10.12", "8.8.8.8", "medium", "DNS Anomaly", 320,
		},
		{
			"Repeated SSH Authentication Failures",
			"Brute force SSH attempts from known blacklisted address. 48 failed attempts in 60 seconds.",
			"185.220.101.55", "10.0.0.10", "low", "Brute Force", 48,
		},
	}

	for _, a := range alerts {
		_, err := database.Exec(
			`INSERT INTO alerts (title, description, source_ip, destination_ip, severity, category, status, packets_count)
			 VALUES ($1,$2,$3,$4,$5,$6,'active',$7)`,
			a.title, a.description, a.srcIP, a.dstIP, a.severity, a.category, a.packets,
		)
		if err != nil {
			return err
		}
	}
	return nil
}
