package handlers

import (
	"database/sql"
	"net/http"

	"github.com/dciphers/nms-backend/models"
)

type DeviceHandler struct {
	db *sql.DB
}

func NewDeviceHandler(db *sql.DB) *DeviceHandler {
	return &DeviceHandler{db: db}
}

func (h *DeviceHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query(`
		SELECT id, ip_address, hostname, mac_address, status,
		       COALESCE(snmp_enabled, false),
		       COALESCE(system_name, ''),
		       COALESCE(system_description, ''),
		       last_seen,
		       created_at, updated_at
		FROM devices
		ORDER BY created_at DESC
	`)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to fetch devices")
		return
	}
	defer rows.Close()

	devices := []models.Device{}
	for rows.Next() {
		var d models.Device
		if err := rows.Scan(
			&d.ID, &d.IPAddress, &d.Hostname, &d.MACAddress, &d.Status,
			&d.SNMPEnabled, &d.SystemName, &d.SystemDescription,
			&d.LastSeen,
			&d.CreatedAt, &d.UpdatedAt,
		); err != nil {
			continue
		}
		devices = append(devices, d)
	}

	writeJSON(w, http.StatusOK, devices)
}
