package services

import "testing"

// ── formatTicks ───────────────────────────────────────────────────────────────

func TestFormatTicks_Zero(t *testing.T) {
	got := formatTicks(0)
	want := "0d 00h 00m 00s"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestFormatTicks_OneDay(t *testing.T) {
	// 1 day = 86400 seconds = 8_640_000 ticks
	got := formatTicks(8_640_000)
	want := "1d 00h 00m 00s"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func TestFormatTicks_Mixed(t *testing.T) {
	// 3d 4h 22m 15s  →  (3*86400 + 4*3600 + 22*60 + 15) * 100
	secs := uint32(3*86400 + 4*3600 + 22*60 + 15)
	got := formatTicks(secs * 100)
	want := "3d 04h 22m 15s"
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

// ── CheckSNMP (live) ──────────────────────────────────────────────────────────
// These tests require a real SNMP agent and are skipped in normal CI.
// Run with:  SNMP_HOST=192.168.1.1 go test ./services/ -run TestCheckSNMP -v

func TestCheckSNMP_Live(t *testing.T) {
	host := testEnv(t, "SNMP_HOST")
	community := testEnvOr("SNMP_COMMUNITY", "public")

	result, err := CheckSNMP(host, community)
	if err != nil {
		t.Fatalf("CheckSNMP(%s): %v", host, err)
	}
	t.Logf("IP:          %s", result.IP)
	t.Logf("SystemName:  %s", result.SystemName)
	t.Logf("SystemDescr: %s", result.SystemDescr)
	t.Logf("Uptime:      %s", result.Uptime)
	t.Logf("IfCount:     %d", result.IfCount)
}

func TestCheckSNMP_WrongCommunity(t *testing.T) {
	host := testEnv(t, "SNMP_HOST")
	_, err := CheckSNMP(host, "definitely-wrong-community-xyz")
	if err == nil {
		t.Log("warning: device responded despite wrong community string")
	}
}
