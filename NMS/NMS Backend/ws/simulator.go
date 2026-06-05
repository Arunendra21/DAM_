package ws

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"time"
)

// ── wire shapes — must match the frontend's WebSocket onmessage handler exactly ──

type wsMessage struct {
	Type string `json:"type"`
	Data any    `json:"data"`
}

type systemMetricsData struct {
	CPUUsage       float64   `json:"cpuUsage"`
	CPUCores       []float64 `json:"cpuCores"`
	MemoryUsage    float64   `json:"memoryUsage"`
	MemoryTotal    float64   `json:"memoryTotal"`
	MemoryUsed     float64   `json:"memoryUsed"`
	DiskRead       float64   `json:"diskRead"`
	DiskWrite      float64   `json:"diskWrite"`
	NetworkIn      float64   `json:"networkIn"`
	NetworkOut     float64   `json:"networkOut"`
	PacketDropRate float64   `json:"packetDropRate"`
}

type packetData struct {
	ID            string `json:"id"`
	Timestamp     string `json:"timestamp"`
	SourceIP      string `json:"source_ip"`
	DestinationIP string `json:"destination_ip"`
	Protocol      string `json:"protocol"`
	Port          int    `json:"port"`
	Size          int    `json:"size"`
	Flags         string `json:"flags"`
	Status        string `json:"status"`
	Payload       string `json:"payload"`
	Layer2        string `json:"layer2"`
	Layer3        string `json:"layer3"`
	Layer4        string `json:"layer4"`
}

type alertData struct {
	ID            string `json:"id"`
	CreatedAt     string `json:"created_at"`
	Title         string `json:"title"`
	Description   string `json:"description"`
	SourceIP      string `json:"source_ip"`
	DestinationIP string `json:"destination_ip"`
	Severity      string `json:"severity"`
	Category      string `json:"category"`
	Status        string `json:"status"`
	PacketsCount  int    `json:"packets_count"`
}

type deviceStatusData struct {
	Hostname string `json:"hostname"`
	Status   string `json:"status"`
}

// ── seed pools ────────────────────────────────────────────────────────────────

var (
	protocols   = []string{"TCP", "UDP", "ICMP", "DNS", "HTTP", "TLS"}
	pktStatuses = []string{"normal", "normal", "normal", "suspicious", "blocked"}
	severities  = []string{"low", "medium", "high", "critical"}
	categories  = []string{"DDoS", "Port Scan", "DNS Anomaly", "Brute Force", "Exfiltration", "Malware"}
	flagSets    = []string{"[SYN]", "[SYN, ACK]", "[ACK]", "[FIN, ACK]", "[RST]", "[PSH, ACK]"}
	hostnames   = []string{
		"HQ-DEVELOPER-LTP01", "HQ-FINANCE-DESK02", "HQ-RECEPTION-LTP04",
		"HQ-SERVER-AD01", "OPS-WORKSTATION-01", "OPS-WORKSTATION-02",
	}
	internalIPs = []string{
		"192.168.1.15", "192.168.1.88", "192.168.10.12",
		"192.168.10.155", "10.0.0.10", "10.0.1.12", "10.0.2.10",
	}
	externalIPs = []string{
		"8.8.8.8", "1.1.1.1", "103.22.200.15",
		"45.227.254.18", "72.34.12.9", "185.220.101.55", "91.195.240.12",
	}
	commonPorts = []int{80, 443, 22, 53, 8080, 3306, 5432, 6379, 25, 587, 3389, 21}

	alertPool = []struct{ title, desc, category string }{
		{"DDoS SYN Flood Detected", "Volumetric SYN flood targeting internal web server. 14k+ pps.", "DDoS"},
		{"Port Scan Identified", "Systematic TCP port sweep across internal subnet.", "Port Scan"},
		{"DNS Tunneling Detected", "High-frequency DNS queries with anomalous subdomains.", "DNS Anomaly"},
		{"Brute Force SSH Attack", "Multiple failed SSH auth attempts in 60s window.", "Brute Force"},
		{"Data Exfiltration Alert", "Unusually large outbound transfer to foreign IP.", "Exfiltration"},
		{"Malware C2 Callback", "Outbound connection to known C2 server detected.", "Malware"},
	}
)

// ── helpers ───────────────────────────────────────────────────────────────────

func pick(s []string) string            { return s[rand.Intn(len(s))] }
func rFloat(min, max float64) float64   { return min + rand.Float64()*(max-min) }
func rInt(min, max int) int             { return min + rand.Intn(max-min+1) }
func clamp(v, lo, hi float64) float64  {
	if v < lo { return lo }
	if v > hi { return hi }
	return v
}
func round1(v float64) float64 { return float64(int(v*10+0.5)) / 10 }
func round3(v float64) float64 { return float64(int(v*1000+0.5)) / 1000 }

func emit(hub *Hub, msgType string, data any) {
	b, _ := json.Marshal(wsMessage{Type: msgType, Data: data})
	hub.Broadcast(b)
}

// ── simulator entry point ─────────────────────────────────────────────────────

// StartSimulator runs forever, pushing live events into the hub.
// Intervals mirror what the frontend expects:
//   - system_metrics : every 2 s
//   - packet_capture : every 1.5 s
//   - new_alert       : every ~15 s (random 70 % fire rate)
//   - device_status_change: every ~20 s (random 40 % fire rate)
func StartSimulator(hub *Hub) {
	metricsTick := time.NewTicker(2 * time.Second)
	packetTick  := time.NewTicker(1500 * time.Millisecond)
	alertTick   := time.NewTicker(15 * time.Second)
	deviceTick  := time.NewTicker(20 * time.Second)

	// Smoothly drifting base values for natural-looking telemetry
	cpuBase    := 45.0
	memBase    := 62.0
	netInBase  := 650.0
	netOutBase := 420.0

	for {
		select {

		case <-metricsTick.C:
			cpuBase    = clamp(cpuBase+rFloat(-3, 3), 15, 92)
			memBase    = clamp(memBase+rFloat(-0.5, 0.5), 40, 85)
			netInBase  = clamp(netInBase+rFloat(-30, 30), 100, 980)
			netOutBase = clamp(netOutBase+rFloat(-25, 25), 80, 860)

			memTotal := 32.0
			cores := make([]float64, 4)
			for i := range cores {
				cores[i] = round1(clamp(cpuBase+rFloat(-15, 15), 5, 100))
			}

			emit(hub, "system_metrics", systemMetricsData{
				CPUUsage:       round1(cpuBase),
				CPUCores:       cores,
				MemoryUsage:    round1(memBase),
				MemoryTotal:    memTotal,
				MemoryUsed:     round1(memTotal * memBase / 100),
				DiskRead:       round1(rFloat(80, 200)),
				DiskWrite:      round1(rFloat(30, 100)),
				NetworkIn:      round1(netInBase),
				NetworkOut:     round1(netOutBase),
				PacketDropRate: round3(rFloat(0.01, 0.5)),
			})

		case <-packetTick.C:
			srcIP, dstIP := pick(internalIPs), pick(externalIPs)
			if rand.Float32() < 0.3 {
				srcIP, dstIP = dstIP, srcIP // inbound traffic
			}
			proto := pick(protocols)
			port  := commonPorts[rand.Intn(len(commonPorts))]

			srcMAC := fmt.Sprintf("%02x:%02x:%02x:%02x:%02x:%02x",
				rand.Intn(256), rand.Intn(256), rand.Intn(256),
				rand.Intn(256), rand.Intn(256), rand.Intn(256))
			dstMAC := fmt.Sprintf("%02x:%02x:%02x:%02x:%02x:%02x",
				rand.Intn(256), rand.Intn(256), rand.Intn(256),
				rand.Intn(256), rand.Intn(256), rand.Intn(256))

			emit(hub, "packet_capture", packetData{
				ID:            fmt.Sprintf("pkt-%d", time.Now().UnixNano()),
				Timestamp:     time.Now().UTC().Format(time.RFC3339),
				SourceIP:      srcIP,
				DestinationIP: dstIP,
				Protocol:      proto,
				Port:          port,
				Size:          rInt(64, 1500),
				Flags:         pick(flagSets),
				Status:        pick(pktStatuses),
				Payload:       fmt.Sprintf("0x%016x", rand.Int63()),
				Layer2:        fmt.Sprintf("Ethernet II, Src: %s, Dst: %s", srcMAC, dstMAC),
				Layer3:        fmt.Sprintf("IPv4, Src: %s, Dst: %s, TTL: %d, Len: %d", srcIP, dstIP, rInt(32, 128), rInt(64, 1500)),
				Layer4:        fmt.Sprintf("%s, Src Port: %d, Dst Port: %d, Seq: %d, Ack: %d", proto, rInt(1024, 65535), port, rand.Int31(), rand.Int31()),
			})

		case <-alertTick.C:
			if rand.Float32() >= 0.7 {
				break
			}
			idx := rand.Intn(len(alertPool))
			a   := alertPool[idx]
			emit(hub, "new_alert", alertData{
				ID:            fmt.Sprintf("alert-%d", time.Now().UnixNano()),
				CreatedAt:     time.Now().UTC().Format(time.RFC3339),
				Title:         a.title,
				Description:   a.desc,
				SourceIP:      pick(externalIPs),
				DestinationIP: pick(internalIPs),
				Severity:      pick(severities),
				Category:      a.category,
				Status:        "active",
				PacketsCount:  rInt(50, 8000),
			})

		case <-deviceTick.C:
			if rand.Float32() >= 0.4 {
				break
			}
			statPool := []string{"online", "online", "online", "offline"}
			emit(hub, "device_status_change", deviceStatusData{
				Hostname: pick(hostnames),
				Status:   pick(statPool),
			})
		}
	}
}
