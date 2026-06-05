package services

import (
	"testing"
)

// ── ExpandRange ───────────────────────────────────────────────────────────────

func TestExpandRange_Basic(t *testing.T) {
	ips, err := ExpandRange("192.168.1.1", "192.168.1.5")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	want := []string{"192.168.1.1", "192.168.1.2", "192.168.1.3", "192.168.1.4", "192.168.1.5"}
	if len(ips) != len(want) {
		t.Fatalf("len = %d, want %d", len(ips), len(want))
	}
	for i, ip := range ips {
		if ip != want[i] {
			t.Errorf("[%d] got %s, want %s", i, ip, want[i])
		}
	}
}

func TestExpandRange_SingleHost(t *testing.T) {
	ips, err := ExpandRange("10.0.0.1", "10.0.0.1")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(ips) != 1 || ips[0] != "10.0.0.1" {
		t.Fatalf("got %v", ips)
	}
}

func TestExpandRange_ReversedIPs(t *testing.T) {
	_, err := ExpandRange("192.168.1.5", "192.168.1.1")
	if err == nil {
		t.Fatal("expected error for reversed range, got nil")
	}
}

func TestExpandRange_InvalidIP(t *testing.T) {
	_, err := ExpandRange("not-an-ip", "192.168.1.5")
	if err == nil {
		t.Fatal("expected error for invalid IP, got nil")
	}
}

func TestExpandRange_TooLarge(t *testing.T) {
	_, err := ExpandRange("10.0.0.0", "10.1.0.0") // >65535 hosts
	if err == nil {
		t.Fatal("expected error for oversized range, got nil")
	}
}

// ── ExpandCIDR ────────────────────────────────────────────────────────────────

func TestExpandCIDR_Slash30(t *testing.T) {
	ips, err := ExpandCIDR("192.168.1.0/30")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	// /30 has 4 addresses (network, 2 hosts, broadcast)
	if len(ips) != 4 {
		t.Fatalf("len = %d, want 4; ips = %v", len(ips), ips)
	}
}

func TestExpandCIDR_Slash32(t *testing.T) {
	ips, err := ExpandCIDR("10.0.0.1/32")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(ips) != 1 || ips[0] != "10.0.0.1" {
		t.Fatalf("got %v", ips)
	}
}

func TestExpandCIDR_TooLarge(t *testing.T) {
	_, err := ExpandCIDR("10.0.0.0/8") // 16 million hosts — should be rejected
	if err == nil {
		t.Fatal("expected error for /8 CIDR, got nil")
	}
}

func TestExpandCIDR_Invalid(t *testing.T) {
	_, err := ExpandCIDR("notacidr")
	if err == nil {
		t.Fatal("expected error for invalid CIDR, got nil")
	}
}
