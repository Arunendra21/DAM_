package services

import (
	"fmt"
	"time"

	"github.com/gosnmp/gosnmp"
)

// Standard MIB-II OIDs collected during discovery.
const (
	oidSysDescr  = "1.3.6.1.2.1.1.1.0"
	oidSysUptime = "1.3.6.1.2.1.1.3.0"
	oidSysName   = "1.3.6.1.2.1.1.5.0"
	oidIfNumber  = "1.3.6.1.2.1.2.1.0"
)

// SNMPResult holds the metadata collected from one SNMP-capable host.
type SNMPResult struct {
	IP          string
	SystemName  string
	SystemDescr string
	Uptime      string
	IfCount     int
}

// CheckSNMP queries a host with SNMP v2c and returns device metadata.
// Returns an error if the host does not respond or returns an error PDU.
func CheckSNMP(ip, community string) (*SNMPResult, error) {
	g := &gosnmp.GoSNMP{
		Target:             ip,
		Port:               161,
		Community:          community,
		Version:            gosnmp.Version2c,
		Timeout:            2 * time.Second,
		Retries:            1,
		ExponentialTimeout: false,
	}

	if err := g.Connect(); err != nil {
		return nil, fmt.Errorf("connect %s: %w", ip, err)
	}
	defer g.Conn.Close()

	oids := []string{oidSysName, oidSysDescr, oidSysUptime, oidIfNumber}
	pdu, err := g.Get(oids)
	if err != nil {
		return nil, fmt.Errorf("get %s: %w", ip, err)
	}

	r := &SNMPResult{IP: ip}
	for _, v := range pdu.Variables {
		// gosnmp always prefixes returned OID names with a leading dot.
		switch v.Name {
		case "." + oidSysName:
			if b, ok := v.Value.([]byte); ok {
				r.SystemName = string(b)
			}
		case "." + oidSysDescr:
			if b, ok := v.Value.([]byte); ok {
				r.SystemDescr = string(b)
			}
		case "." + oidSysUptime:
			// TimeTicks — 1/100 seconds since last re-init.
			if ticks, ok := v.Value.(uint32); ok {
				r.Uptime = formatTicks(ticks)
			}
		case "." + oidIfNumber:
			switch val := v.Value.(type) {
			case int:
				r.IfCount = val
			case uint:
				r.IfCount = int(val)
			case int64:
				r.IfCount = int(val)
			}
		}
	}
	return r, nil
}

// formatTicks converts SNMPv2 TimeTicks (hundredths of a second) to a
// human-readable uptime string, e.g. "3d 04h 22m 15s".
func formatTicks(ticks uint32) string {
	total := ticks / 100 // seconds
	days := total / 86400
	total %= 86400
	hours := total / 3600
	total %= 3600
	mins := total / 60
	secs := total % 60
	return fmt.Sprintf("%dd %02dh %02dm %02ds", days, hours, mins, secs)
}
