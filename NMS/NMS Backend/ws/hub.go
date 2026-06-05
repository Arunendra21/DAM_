package ws

// Client is a single WebSocket connection managed by the Hub.
type Client struct {
	Send chan []byte
}

// Hub maintains the set of active clients and broadcasts messages to them.
// All map mutations happen inside Run() — no mutex needed.
type Hub struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		broadcast:  make(chan []byte, 512),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (h *Hub) Register(c *Client) {
	h.register <- c
}

func (h *Hub) Unregister(c *Client) {
	h.unregister <- c
}

func (h *Hub) Broadcast(msg []byte) {
	// Non-blocking send so the simulator never stalls when there are no clients.
	select {
	case h.broadcast <- msg:
	default:
	}
}

func (h *Hub) Run() {
	for {
		select {
		case c := <-h.register:
			h.clients[c] = true

		case c := <-h.unregister:
			if _, ok := h.clients[c]; ok {
				delete(h.clients, c)
				close(c.Send)
			}

		case msg := <-h.broadcast:
			for c := range h.clients {
				select {
				case c.Send <- msg:
				default:
					// Slow client: disconnect it.
					delete(h.clients, c)
					close(c.Send)
				}
			}
		}
	}
}
