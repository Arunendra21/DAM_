package sse

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestBroker_PublishAndReceive(t *testing.T) {
	b := NewBroker()
	ch := b.Subscribe(1)

	b.Publish(1, Event{Type: "test", Data: `{"x":1}`})

	select {
	case evt := <-ch:
		if evt.Type != "test" {
			t.Errorf("type = %q, want \"test\"", evt.Type)
		}
	case <-time.After(time.Second):
		t.Fatal("timeout waiting for published event")
	}

	b.Unsubscribe(1, ch)
}

func TestBroker_CloseJobSignalsSubscriber(t *testing.T) {
	b := NewBroker()
	ch := b.Subscribe(42)

	go func() {
		time.Sleep(10 * time.Millisecond)
		b.CloseJob(42)
	}()

	select {
	case _, ok := <-ch:
		if ok {
			t.Error("expected channel to be closed (ok=false)")
		}
	case <-time.After(time.Second):
		t.Fatal("timeout: CloseJob did not close the channel")
	}
}

func TestBroker_UnsubscribeBeforeClose(t *testing.T) {
	b := NewBroker()
	ch := b.Subscribe(7)
	b.Unsubscribe(7, ch)

	// CloseJob after Unsubscribe must not panic (job entry already gone).
	b.CloseJob(7)
}

func TestBroker_MultipleSubscribers(t *testing.T) {
	b := NewBroker()
	ch1 := b.Subscribe(10)
	ch2 := b.Subscribe(10)

	b.Publish(10, Event{Type: "ping", Data: `{}`})

	timeout := time.After(time.Second)
	for i, ch := range []chan Event{ch1, ch2} {
		select {
		case evt := <-ch:
			if evt.Type != "ping" {
				t.Errorf("sub%d: type = %q, want \"ping\"", i+1, evt.Type)
			}
		case <-timeout:
			t.Fatalf("sub%d: timeout", i+1)
		}
	}

	b.Unsubscribe(10, ch1)
	b.Unsubscribe(10, ch2)
}

func TestBroker_ServeSSE_ResponseHeaders(t *testing.T) {
	b := NewBroker()

	// Use a recorder and cancel quickly via a short-lived request context.
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/stream", nil)

	// Close the job immediately in a goroutine so ServeSSE returns.
	go func() {
		time.Sleep(20 * time.Millisecond)
		b.CloseJob(99)
	}()

	b.ServeSSE(rec, req, 99)

	ct := rec.Header().Get("Content-Type")
	if !strings.HasPrefix(ct, "text/event-stream") {
		t.Errorf("Content-Type = %q, want text/event-stream", ct)
	}
}
