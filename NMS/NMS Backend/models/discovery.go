package models

import "time"

// DiscoveryJob represents one network discovery run persisted in Postgres.
type DiscoveryJob struct {
	ID         int64     `json:"id"`
	Status     string    `json:"status"`    // running | completed | failed
	StartIP    string    `json:"start_ip"`
	EndIP      string    `json:"end_ip"`
	CIDR       string    `json:"cidr,omitempty"`
	Community  string    `json:"community"`
	AliveCount int       `json:"alive_count"`
	SNMPCount  int       `json:"snmp_count"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
