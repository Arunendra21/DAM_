package models

import "time"

type Alert struct {
	ID            int64     `json:"id"`
	Title         string    `json:"title"`
	Description   string    `json:"description"`
	SourceIP      string    `json:"source_ip"`
	DestinationIP string    `json:"destination_ip"`
	Severity      string    `json:"severity"`
	Category      string    `json:"category"`
	Status        string    `json:"status"`
	PacketsCount  int       `json:"packets_count"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
