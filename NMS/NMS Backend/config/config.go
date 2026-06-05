package config

import "os"

type Config struct {
	Port        string
	DatabaseURL string
	JWTSecret   string
}

func Load() *Config {
	return &Config{
		Port:        getenv("PORT", "8080"),
		DatabaseURL: getenv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/nms?sslmode=disable"),
		JWTSecret:   getenv("JWT_SECRET", "netintel-super-secret-jwt-key-2026"),
	}
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
