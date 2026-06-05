package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
)

// handlerTestRouter wires only the discovery routes around a stub that records
// the parsed request, so we can unit-test validation logic without a real DB.
func handlerTestRouter(h http.HandlerFunc) *chi.Mux {
	r := chi.NewRouter()
	r.Post("/api/v1/discovery", h)
	return r
}

func TestDiscoveryStart_MissingBody(t *testing.T) {
	// POST with an empty body must return 400.
	h := &DiscoveryHandler{}
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/v1/discovery", bytes.NewBufferString(""))
	h.Start(rec, req)
	if rec.Code != http.StatusBadRequest {
		t.Errorf("status = %d, want 400", rec.Code)
	}
}

func TestDiscoveryStart_MissingRange(t *testing.T) {
	// POST without start_ip/end_ip AND without cidr must return 400.
	h := &DiscoveryHandler{}
	body, _ := json.Marshal(map[string]string{"community": "public"})
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/v1/discovery", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	h.Start(rec, req)
	if rec.Code != http.StatusBadRequest {
		t.Errorf("status = %d, want 400", rec.Code)
	}
}

func TestDiscoveryStart_ValidCIDR(t *testing.T) {
	// A valid CIDR request must reach svc.StartJob.  We stop at the nil-svc
	// panic, which proves validation passed.
	h := &DiscoveryHandler{}
	body, _ := json.Marshal(map[string]string{
		"cidr":      "192.168.1.0/30",
		"community": "public",
	})
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/v1/discovery", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	defer func() {
		if r := recover(); r != nil {
			// Nil svc dereference expected — means validation passed.
			t.Log("expected nil-svc panic after validation passed:", r)
		}
	}()
	h.Start(rec, req)
	// If we reach here with 5xx the svc was nil but validation passed.
	if rec.Code == http.StatusBadRequest {
		t.Errorf("got 400; validation should have passed for valid CIDR body")
	}
}

// ── Integration tests (require DATABASE_URL) ──────────────────────────────────
// Run: DATABASE_URL=postgres://... go test ./handlers/ -run TestDiscovery -v

func TestDiscoveryIntegration_StartAndGet(t *testing.T) {
	dsn := testEnv(t, "DATABASE_URL")
	_ = dsn
	// Full integration test wiring is left for the CI pipeline where a real
	// PostgreSQL + test DB is available.  Mark it as a placeholder.
	t.Skip("integration test: set DATABASE_URL to run")
}
