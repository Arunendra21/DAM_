package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const (
	UserIDKey   contextKey = "userID"
	UserRoleKey contextKey = "userRole"
)

// JWT validates a Bearer token from the Authorization header.
func JWT(secret string) func(http.Handler) http.Handler {
	return jwtMiddleware(secret, false)
}

// JWTFlexible validates a Bearer token from either the Authorization header or
// the ?token= query parameter.  Use this for SSE endpoints where the browser
// EventSource API cannot set custom request headers.
func JWTFlexible(secret string) func(http.Handler) http.Handler {
	return jwtMiddleware(secret, true)
}

func jwtMiddleware(secret string, allowQueryParam bool) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			raw := extractToken(r, allowQueryParam)
			if raw == "" {
				writeUnauthorized(w, "missing authorization token")
				return
			}

			token, err := jwt.Parse(raw, func(t *jwt.Token) (interface{}, error) {
				if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, jwt.ErrSignatureInvalid
				}
				return []byte(secret), nil
			})
			if err != nil || !token.Valid {
				writeUnauthorized(w, "invalid or expired token")
				return
			}

			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				writeUnauthorized(w, "invalid token claims")
				return
			}

			ctx := context.WithValue(r.Context(), UserIDKey, claims["sub"])
			ctx = context.WithValue(ctx, UserRoleKey, claims["role"])
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// extractToken pulls the raw JWT from the Authorization header, and optionally
// from the ?token= query parameter as a fallback for SSE clients.
func extractToken(r *http.Request, allowQueryParam bool) string {
	if h := r.Header.Get("Authorization"); h != "" {
		if parts := strings.SplitN(h, " ", 2); len(parts) == 2 && parts[0] == "Bearer" {
			return parts[1]
		}
	}
	if allowQueryParam {
		return r.URL.Query().Get("token")
	}
	return ""
}

func writeUnauthorized(w http.ResponseWriter, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	w.Write([]byte(`{"error":"` + msg + `"}`)) //nolint:errcheck
}
