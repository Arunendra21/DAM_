package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/dciphers/nms-backend/models"
)

type AlertHandler struct {
	db *sql.DB
}

func NewAlertHandler(db *sql.DB) *AlertHandler {
	return &AlertHandler{db: db}
}

func (h *AlertHandler) List(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query(`
		SELECT id, title, description, source_ip, destination_ip,
		       severity, category, status, packets_count, created_at, updated_at
		FROM alerts
		ORDER BY created_at DESC
	`)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to fetch alerts")
		return
	}
	defer rows.Close()

	alerts := []models.Alert{}
	for rows.Next() {
		var a models.Alert
		if err := rows.Scan(
			&a.ID, &a.Title, &a.Description, &a.SourceIP, &a.DestinationIP,
			&a.Severity, &a.Category, &a.Status, &a.PacketsCount, &a.CreatedAt, &a.UpdatedAt,
		); err != nil {
			continue
		}
		alerts = append(alerts, a)
	}

	writeJSON(w, http.StatusOK, alerts)
}

func (h *AlertHandler) Acknowledge(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	var req struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Status != "triaged" && req.Status != "mitigated" {
		writeError(w, http.StatusBadRequest, "status must be 'triaged' or 'mitigated'")
		return
	}

	result, err := h.db.Exec(
		`UPDATE alerts SET status=$1, updated_at=NOW() WHERE id=$2`,
		req.Status, id,
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to update alert")
		return
	}

	n, _ := result.RowsAffected()
	if n == 0 {
		writeError(w, http.StatusNotFound, "alert not found")
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}
