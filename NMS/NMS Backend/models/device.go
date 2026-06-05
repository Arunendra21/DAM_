package models

import "time"

type Device struct {
	ID                int64      `json:"id"`
	IPAddress         string     `json:"ip_address"`
	Hostname          string     `json:"hostname"`
	MACAddress        string     `json:"mac_address"`
	Status            string     `json:"status"`
	SNMPEnabled       bool       `json:"snmp_enabled"`
	SystemName        string     `json:"system_name"`
	SystemDescription string     `json:"system_description"`
	LastSeen          *time.Time `json:"last_seen"`
	CreatedAt         time.Time  `json:"created_at"`
	UpdatedAt         time.Time  `json:"updated_at"`
}
