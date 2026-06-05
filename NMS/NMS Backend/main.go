package main

import (
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"

	"github.com/dciphers/nms-backend/config"
	"github.com/dciphers/nms-backend/db"
	"github.com/dciphers/nms-backend/handlers"
	authmw "github.com/dciphers/nms-backend/middleware"
	"github.com/dciphers/nms-backend/services"
	"github.com/dciphers/nms-backend/sse"
	"github.com/dciphers/nms-backend/ws"
)

func main() {
	_ = godotenv.Load()

	cfg := config.Load()

	// ── Database ──────────────────────────────────────────────────────────────
	database, err := db.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("db connect: %v", err)
	}
	defer database.Close()

	if err := db.Migrate(database); err != nil {
		log.Fatalf("db migrate: %v", err)
	}

	if err := db.Seed(database); err != nil {
		log.Printf("db seed (non-fatal): %v", err)
	}

	// ── WebSocket hub + simulator ─────────────────────────────────────────────
	hub := ws.NewHub()
	go hub.Run()
	go ws.StartSimulator(hub)

	// ── SSE broker + discovery service ───────────────────────────────────────
	sseBroker := sse.NewBroker()
	discoverySvc := services.NewDiscoveryService(database, sseBroker)

	// ── Handlers ──────────────────────────────────────────────────────────────
	authHandler      := handlers.NewAuthHandler(database, cfg)
	deviceHandler    := handlers.NewDeviceHandler(database)
	alertHandler     := handlers.NewAlertHandler(database)
	wsHandler        := handlers.NewWSHandler(hub)
	discoveryHandler := handlers.NewDiscoveryHandler(database, discoverySvc, sseBroker)

	// ── HTTP router ───────────────────────────────────────────────────────────
	r := chi.NewRouter()

	r.Use(chimw.Logger)
	r.Use(chimw.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000", "http://localhost:4173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// ── SSE stream routes — NO request timeout (streams stay open) ────────────
	// The ?token= query parameter is supported for browser EventSource clients
	// that cannot set custom headers.
	r.Group(func(r chi.Router) {
		r.Use(authmw.JWTFlexible(cfg.JWTSecret))
		r.Get("/api/v1/discovery/{id}/stream", discoveryHandler.Stream)
	})

	// ── Standard REST routes — 30-second timeout ──────────────────────────────
	r.Group(func(r chi.Router) {
		r.Use(chimw.Timeout(30 * time.Second))

		r.Route("/api/v1", func(r chi.Router) {
			// Public
			r.Post("/auth/signup", authHandler.Signup)
			r.Post("/auth/login", authHandler.Login)

			// JWT-protected
			r.Group(func(r chi.Router) {
				r.Use(authmw.JWT(cfg.JWTSecret))

				r.Get("/devices", deviceHandler.List)
				r.Get("/alerts", alertHandler.List)
				r.Put("/alerts/{id}/acknowledge", alertHandler.Acknowledge)

				// Discovery
				r.Post("/discovery", discoveryHandler.Start)
				r.Get("/discovery", discoveryHandler.ListJobs)
				r.Get("/discovery/{id}", discoveryHandler.GetJob)
			})
		})
	})

	// WebSocket endpoint (no JWT — frontend connects without a token header)
	r.Get("/ws", wsHandler.Handle)

	// ── Start ─────────────────────────────────────────────────────────────────
	addr := ":" + cfg.Port
	log.Printf("NMS Backend listening on %s", addr)
	log.Printf("  REST  → http://localhost%s/api/v1", addr)
	log.Printf("  WS    → ws://localhost%s/ws", addr)
	log.Printf("  SSE   → http://localhost%s/api/v1/discovery/{id}/stream", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("server: %v", err)
	}
}
