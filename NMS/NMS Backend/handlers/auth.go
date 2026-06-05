package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"github.com/dciphers/nms-backend/config"
	"github.com/dciphers/nms-backend/models"
)

type AuthHandler struct {
	db  *sql.DB
	cfg *config.Config
}

func NewAuthHandler(db *sql.DB, cfg *config.Config) *AuthHandler {
	return &AuthHandler{db: db, cfg: cfg}
}

// ── request / response shapes ────────────────────────────────────────────────

type signupRequest struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Role      string `json:"role"` // "admin" | "operator"
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// authResponse matches exactly what the frontend reads:
//
//	data.user.first_name / data.user.last_name / data.user.email / data.user.role
//	data.access_token
type authResponse struct {
	User        userPublic `json:"user"`
	AccessToken string     `json:"access_token"`
}

type userPublic struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Role      string `json:"role"`
}

// ── helpers ──────────────────────────────────────────────────────────────────

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v) //nolint:errcheck
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

func (h *AuthHandler) generateToken(user *models.User) (string, error) {
	claims := jwt.MapClaims{
		"sub":  user.ID,
		"role": user.Role,
		"exp":  time.Now().Add(24 * time.Hour).Unix(),
		"iat":  time.Now().Unix(),
	}
	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(h.cfg.JWTSecret))
}

// ── handlers ─────────────────────────────────────────────────────────────────

func (h *AuthHandler) Signup(w http.ResponseWriter, r *http.Request) {
	var req signupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Email == "" || req.Password == "" {
		writeError(w, http.StatusBadRequest, "email and password are required")
		return
	}

	// Normalise role: only "admin" is elevated; everything else → "operator"
	role := "operator"
	if req.Role == "admin" {
		role = "admin"
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to hash password")
		return
	}

	var id int64
	err = h.db.QueryRow(
		`INSERT INTO users (email, password, first_name, last_name, role)
		 VALUES ($1,$2,$3,$4,$5) RETURNING id`,
		req.Email, string(hash), req.FirstName, req.LastName, role,
	).Scan(&id)
	if err != nil {
		writeError(w, http.StatusConflict, "email already registered")
		return
	}

	user := &models.User{ID: id, Email: req.Email, FirstName: req.FirstName, LastName: req.LastName, Role: role}
	token, err := h.generateToken(user)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to generate token")
		return
	}

	writeJSON(w, http.StatusCreated, authResponse{
		User:        userPublic{FirstName: user.FirstName, LastName: user.LastName, Email: user.Email, Role: user.Role},
		AccessToken: token,
	})
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	var user models.User
	err := h.db.QueryRow(
		`SELECT id, email, password, first_name, last_name, role FROM users WHERE email=$1`,
		req.Email,
	).Scan(&user.ID, &user.Email, &user.Password, &user.FirstName, &user.LastName, &user.Role)
	if err != nil {
		writeError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		writeError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}

	token, err := h.generateToken(&user)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to generate token")
		return
	}

	writeJSON(w, http.StatusOK, authResponse{
		User:        userPublic{FirstName: user.FirstName, LastName: user.LastName, Email: user.Email, Role: user.Role},
		AccessToken: token,
	})
}
