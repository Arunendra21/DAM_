package sse

import (
	"fmt"
	"net/http"
	"sync"
)

// Event is a single SSE message sent to subscribers of a discovery job.
type Event struct {
	Type string // SSE event name
	Data string // JSON-encoded payload
}

// Broker fans out discovery progress events to all SSE clients watching a job.
// Each job has an independent subscriber set; closing a job broadcasts channel
// closure to every subscriber, which makes their ServeSSE handler return cleanly.
type Broker struct {
	mu          sync.RWMutex
	subscribers map[int64]map[chan Event]struct{}
}

func NewBroker() *Broker {
	return &Broker{
		subscribers: make(map[int64]map[chan Event]struct{}),
	}
}

// Subscribe registers a new channel for jobID events.
// The caller must eventually call Unsubscribe or let CloseJob handle cleanup.
func (b *Broker) Subscribe(jobID int64) chan Event {
	ch := make(chan Event, 128)
	b.mu.Lock()
	if b.subscribers[jobID] == nil {
		b.subscribers[jobID] = make(map[chan Event]struct{})
	}
	b.subscribers[jobID][ch] = struct{}{}
	b.mu.Unlock()
	return ch
}

// Unsubscribe removes ch from jobID's set without closing it.
// ServeSSE calls this in defer after the HTTP handler returns.
func (b *Broker) Unsubscribe(jobID int64, ch chan Event) {
	b.mu.Lock()
	if subs, ok := b.subscribers[jobID]; ok {
		delete(subs, ch)
		if len(subs) == 0 {
			delete(b.subscribers, jobID)
		}
	}
	b.mu.Unlock()
}

// Publish sends evt to every active subscriber of jobID (non-blocking, drops for slow clients).
func (b *Broker) Publish(jobID int64, evt Event) {
	b.mu.RLock()
	subs := b.subscribers[jobID]
	chs := make([]chan Event, 0, len(subs))
	for ch := range subs {
		chs = append(chs, ch)
	}
	b.mu.RUnlock()

	for _, ch := range chs {
		select {
		case ch <- evt:
		default:
		}
	}
}

// CloseJob closes every subscriber channel for jobID, signalling EOF to all
// ServeSSE goroutines.  Called by the discovery service when a job finishes.
func (b *Broker) CloseJob(jobID int64) {
	b.mu.Lock()
	subs := b.subscribers[jobID]
	delete(b.subscribers, jobID)
	b.mu.Unlock()

	for ch := range subs {
		close(ch)
	}
}

// ServeSSE upgrades w to an SSE stream and blocks until the job closes or the
// client disconnects.  Must NOT be wrapped in the global request-timeout middleware.
func (b *Broker) ServeSSE(w http.ResponseWriter, r *http.Request, jobID int64) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("X-Accel-Buffering", "no") // disable Nginx buffering

	// Send an initial keep-alive comment so the browser opens the stream.
	fmt.Fprintf(w, ": connected\n\n")
	flusher.Flush()

	ch := b.Subscribe(jobID)
	defer b.Unsubscribe(jobID, ch)

	for {
		select {
		case evt, ok := <-ch:
			if !ok {
				// Job closed; send a final "done" comment and exit.
				fmt.Fprintf(w, ": stream closed\n\n")
				flusher.Flush()
				return
			}
			fmt.Fprintf(w, "event: %s\ndata: %s\n\n", evt.Type, evt.Data)
			flusher.Flush()
		case <-r.Context().Done():
			return
		}
	}
}
