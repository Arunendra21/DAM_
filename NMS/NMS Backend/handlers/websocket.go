package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"

	"github.com/dciphers/nms-backend/ws"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 4096,
	// Origin check is intentionally permissive — CORS is enforced at the HTTP layer.
	CheckOrigin: func(r *http.Request) bool { return true },
}

type WSHandler struct {
	hub *ws.Hub
}

func NewWSHandler(hub *ws.Hub) *WSHandler {
	return &WSHandler{hub: hub}
}

func (h *WSHandler) Handle(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("ws upgrade: %v", err)
		return
	}

	client := &ws.Client{Send: make(chan []byte, 256)}
	h.hub.Register(client)

	// writePump: forward hub messages to the WebSocket connection.
	go writePump(conn, client, h.hub)

	// readPump (this goroutine): drain incoming frames and detect close.
	readPump(conn, client, h.hub)
}

func readPump(conn *websocket.Conn, client *ws.Client, hub *ws.Hub) {
	defer func() {
		hub.Unregister(client)
		conn.Close()
	}()
	conn.SetReadLimit(512)
	for {
		if _, _, err := conn.ReadMessage(); err != nil {
			break
		}
	}
}

func writePump(conn *websocket.Conn, client *ws.Client, hub *ws.Hub) {
	defer conn.Close()
	for msg := range client.Send {
		if err := conn.WriteMessage(websocket.TextMessage, msg); err != nil {
			return
		}
	}
}
