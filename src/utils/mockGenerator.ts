import { Packet, Alert, SystemMetrics, DeviceHost, GeoConnection } from '../types';

// Seed lists for generating random traffic
export const PROTOCOLS = ['TCP', 'UDP', 'ICMP', 'DNS', 'HTTP', 'TLS'] as const;
export const SEVERITIES = ['low', 'medium', 'high', 'critical'] as const;
export const CATEGORIES = ['DDoS', 'Port Scan', 'DNS Anomaly', 'Brute Force', 'Exfiltration', 'Malware'] as const;

export const INTERNAL_HOSTS: { ip: string; hostname: string; mac: string }[] = [
  { ip: '10.0.1.12', hostname: 'ops-workstation-01', mac: '00:0a:95:9d:68:16' },
  { ip: '10.0.1.45', hostname: 'ops-workstation-02', mac: '00:0a:95:9d:68:17' },
  { ip: '10.0.2.10', hostname: 'db-primary-srv', mac: '3c:d9:2b:80:a4:23' },
  { ip: '10.0.2.22', hostname: 'k8s-master-node', mac: '3c:d9:2b:80:a4:24' },
  { ip: '10.0.3.50', hostname: 'web-gateway-01', mac: 'a4:83:e7:7c:12:ef' },
  { ip: '10.0.3.51', hostname: 'web-gateway-02', mac: 'a4:83:e7:7c:12:f0' },
  { ip: '10.0.4.15', hostname: 'mail-exchange-srv', mac: 'f8:ca:b8:91:02:44' },
  { ip: '10.0.4.88', hostname: 'active-directory-dc', mac: 'f8:ca:b8:91:02:45' },
  { ip: '10.0.5.105', hostname: 'iot-sensor-hub', mac: '70:b3:d5:a8:00:11' },
];

export const EXTERNAL_HOSTS: { ip: string; hostname: string; location: string }[] = [
  { ip: '8.8.8.8', hostname: 'google-dns-primary', location: 'USA' },
  { ip: '1.1.1.1', hostname: 'cloudflare-dns-primary', location: 'USA' },
  { ip: '185.190.140.22', hostname: 'shady-tunnels-vpn', location: 'Netherlands' },
  { ip: '45.227.254.18', hostname: 'host-brute-ip', location: 'Russia' },
  { ip: '23.45.65.101', hostname: 'edge-cache-akamai', location: 'Germany' },
  { ip: '13.233.109.21', hostname: 'aws-ap-south-datacenter', location: 'India' },
  { ip: '202.96.128.86', hostname: 'china-telecom-dns', location: 'China' },
  { ip: '91.198.174.192', hostname: 'wikimedia-foundation', location: 'France' },
  { ip: '103.22.200.15', hostname: 'malicious-tor-exit', location: 'Romania' },
  { ip: '198.51.100.42', hostname: 'test-api-target', location: 'Brazil' },
];

export const APPS = [
  { name: 'HTTPS/TLS', defaultPort: 443 },
  { name: 'HTTP', defaultPort: 80 },
  { name: 'SSH', defaultPort: 22 },
  { name: 'DNS', defaultPort: 53 },
  { name: 'Database (PGSQL)', defaultPort: 5432 },
  { name: 'SMTP', defaultPort: 25 },
  { name: 'RDP', defaultPort: 3389 },
];

export const GEO_LOCATIONS = [
  { name: 'San Francisco', coords: [15, 38] as [number, number] },
  { name: 'New York', coords: [28, 36] as [number, number] },
  { name: 'London', coords: [48, 25] as [number, number] },
  { name: 'Frankfurt', coords: [51, 26] as [number, number] },
  { name: 'Moscow', coords: [60, 20] as [number, number] },
  { name: 'Tokyo', coords: [88, 38] as [number, number] },
  { name: 'Singapore', coords: [78, 62] as [number, number] },
  { name: 'Sydney', coords: [92, 85] as [number, number] },
  { name: 'Bangalore', coords: [72, 53] as [number, number] },
  { name: 'Sao Paulo', coords: [35, 78] as [number, number] },
  { name: 'Cape Town', coords: [53, 82] as [number, number] },
];

// Helper to get random item
export const pickRandom = <T>(arr: readonly T[] | T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Helper for random IP
export const generateRandomIp = () => {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

// Generate Hex mock
export const generateHexMock = (size: number): string => {
  let hex = '';
  let text = '';
  for (let i = 0; i < Math.min(size, 64); i++) {
    const charCode = Math.floor(Math.random() * 256);
    hex += charCode.toString(16).padStart(2, '0').toUpperCase() + ' ';
    // Readable characters, otherwise dot
    text += (charCode >= 32 && charCode <= 126) ? String.fromCharCode(charCode) : '.';
    if ((i + 1) % 16 === 0) {
      hex += '  ';
    }
  }
  return `0000  ${hex.padEnd(52)}  ${text}`;
};

// Generate fake packet payload descriptions
export const generatePayload = (protocol: string, src: string, dst: string, port: number) => {
  switch (protocol) {
    case 'HTTP':
      return `GET /index.html HTTP/1.1\r\nHost: ${dst}\r\nUser-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36\r\nAccept: text/html\r\nConnection: keep-alive\r\n\r\n`;
    case 'TLS':
      return `Client Hello [TLSv1.3]\r\n  Cipher Suites: TLS_AES_256_GCM_SHA384 (0x1302)\r\n  Server Name Indication: ${dst}\r\n  Handshake protocol details...`;
    case 'DNS':
      const qname = pickRandom(['api.github.com', 'tracker.malware-domain.io', 'google.com', 'aws.amazon.com', 'badactor-c2-server.net']);
      return `Query: ${qname}\r\n  Type: A (IPv4 Address)\r\n  Class: IN\r\n  Transaction ID: 0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase()}`;
    case 'TCP':
      return `TCP Segment\r\n  Source Port: ${Math.floor(Math.random() * 50000) + 1024}\r\n  Destination Port: ${port}\r\n  Sequence Number: ${Math.floor(Math.random() * 1000000)}\r\n  Acknowledgment Number: ${Math.floor(Math.random() * 1000000)}\r\n  Window Size: 64240`;
    case 'UDP':
      return `UDP Datagram\r\n  Source Port: ${Math.floor(Math.random() * 50000) + 1024}\r\n  Destination Port: ${port}\r\n  Length: ${Math.floor(Math.random() * 1400)}\r\n  Checksum: 0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase()}`;
    case 'ICMP':
      return `ICMP Type 8 (Echo Ping Request)\r\n  Code: 0\r\n  Identifier: 0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase()}\r\n  Sequence: ${Math.floor(Math.random() * 500)}`;
    default:
      return `Payload: Binary Stream [${Math.floor(Math.random() * 1500)} bytes]`;
  }
};

// Generate random single Packet
export const generatePacket = (customAttrs?: Partial<Packet>): Packet => {
  const isInternalSrc = Math.random() > 0.4;
  const srcHost = isInternalSrc ? pickRandom(INTERNAL_HOSTS) : pickRandom(EXTERNAL_HOSTS);
  const dstHost = !isInternalSrc ? pickRandom(INTERNAL_HOSTS) : pickRandom(EXTERNAL_HOSTS);
  const protocol = pickRandom(PROTOCOLS);
  
  const app = pickRandom(APPS);
  const port = protocol === 'DNS' ? 53 : (protocol === 'HTTP' ? 80 : (protocol === 'TLS' ? 443 : app.defaultPort));
  const size = Math.floor(Math.random() * 1400) + 64;
  const flags = protocol === 'TCP' ? pickRandom(['[SYN]', '[ACK]', '[SYN, ACK]', '[FIN, ACK]', '[RST]']) : '';
  const status = customAttrs?.status || (Math.random() > 0.96 ? 'suspicious' : 'normal');

  const sourceIp = srcHost.ip;
  const destinationIp = dstHost.ip;

  return {
    id: `pkt-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    sourceIp,
    destinationIp,
    protocol,
    port,
    size,
    flags,
    status,
    payload: generatePayload(protocol, sourceIp, destinationIp, port) + '\n\n' + generateHexMock(size),
    headers: {
      layer2: `Ethernet II, Src: ${isInternalSrc ? (srcHost as any).mac : '00:11:22:33:44:55'}, Dst: ${!isInternalSrc ? (dstHost as any).mac : '00:11:22:33:44:55'}`,
      layer3: `Internet Protocol Version 4, Src: ${sourceIp}, Dst: ${destinationIp}`,
      layer4: `${protocol} Protocol, Src Port: ${Math.floor(Math.random() * 50000) + 1024}, Dst Port: ${port}`,
    },
    ...customAttrs,
  };
};

// Generate random single Alert
export const generateAlert = (customAttrs?: Partial<Alert>): Alert => {
  const category = pickRandom(CATEGORIES);
  const severity = pickRandom(SEVERITIES);
  
  const srcHost = pickRandom(EXTERNAL_HOSTS);
  const dstHost = pickRandom(INTERNAL_HOSTS);

  const titles: Record<typeof category, string> = {
    'DDoS': `Volumetric UDP Flood attack detected from ${srcHost.hostname}`,
    'Port Scan': `Host Port Scan (reconnaissance) originating from ${srcHost.ip}`,
    'DNS Anomaly': `Excessive query requests for malicious domain 'badactor-c2-server.net'`,
    'Brute Force': `Repeated SSH/RDP connection failures on ${dstHost.hostname}`,
    'Exfiltration': `High volume outbound traffic spike to VPN exit ${srcHost.ip}`,
    'Malware': `C2 Beaconing handshake detected on ${dstHost.hostname}`,
  };

  const descriptions: Record<typeof category, string> = {
    'DDoS': `Targeting internal web-gateway-01 (port 80/443). Traffic volume exceeding 150k PPS. Potential service degradation.`,
    'Port Scan': `Host scanned 100+ ports in under 2 seconds. Targeted database servers and Ops workstations.`,
    'DNS Anomaly': `Internal host resolving domains linked to known ransomware command and control channels.`,
    'Brute Force': `50+ login requests failed within a 30s window. Originating IP matches blacklisted scanner.`,
    'Exfiltration': `Internal DB host transmitting 4.5 GB of raw payloads to unclassified external IP in Netherlands.`,
    'Malware': `Cryptographic exchange patterns and packet timings matched signature of Cobalt Strike beacon.`,
  };

  return {
    id: `alt-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    title: titles[category],
    description: descriptions[category],
    sourceIp: srcHost.ip,
    destinationIp: dstHost.ip,
    severity,
    category,
    status: 'active',
    packetsCount: Math.floor(Math.random() * 1500) + 50,
    ...customAttrs,
  };
};

// Initial Packet database
export const generateInitialPackets = (count = 100): Packet[] => {
  const packets: Packet[] = [];
  for (let i = 0; i < count; i++) {
    const p = generatePacket();
    // Offset timestamp
    const d = new Date();
    d.setMilliseconds(d.getMilliseconds() - (count - i) * 120);
    p.timestamp = d.toISOString();
    packets.push(p);
  }
  return packets;
};

// Initial Alerts database
export const generateInitialAlerts = (): Alert[] => {
  const alerts: Alert[] = [];
  
  // Specific interesting default alerts
  alerts.push(
    generateAlert({
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      severity: 'critical',
      category: 'DDoS',
      title: 'Volumetric UDP Flood attack detected',
      status: 'active',
    }),
    generateAlert({
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
      severity: 'high',
      category: 'Brute Force',
      title: 'SSH brute-force login attempts detected',
      status: 'active',
    }),
    generateAlert({
      timestamp: new Date(Date.now() - 600000).toISOString(), // 10 min ago
      severity: 'medium',
      category: 'DNS Anomaly',
      title: 'DNS Tunneling anomaly detected',
      status: 'active',
    }),
    generateAlert({
      timestamp: new Date(Date.now() - 60000).toISOString(), // 1 min ago
      severity: 'low',
      category: 'Port Scan',
      title: 'Horizontal port scan activity',
      status: 'active',
    })
  );

  return alerts;
};

// Initial Hosts list
export const generateHosts = (): DeviceHost[] => {
  const list: DeviceHost[] = [];
  
  // Populate internal
  INTERNAL_HOSTS.forEach((ih, index) => {
    const trafficIn = Math.floor(Math.random() * 5000) + 150;
    const trafficOut = Math.floor(Math.random() * 4000) + 80;
    list.push({
      ip: ih.ip,
      hostname: ih.hostname,
      type: 'internal',
      mac: ih.mac,
      trafficIn,
      trafficOut,
      percentage: 0, // calculated relative later
      status: index === 2 ? 'suspicious' : 'clean',
      applications: APPS.map(app => ({
        name: app.name,
        traffic: Math.floor(Math.random() * (trafficIn + trafficOut) * 0.4)
      }))
    });
  });

  // Populate external
  EXTERNAL_HOSTS.forEach((eh, index) => {
    const trafficIn = Math.floor(Math.random() * 8000) + 10;
    const trafficOut = Math.floor(Math.random() * 12000) + 10;
    list.push({
      ip: eh.ip,
      hostname: eh.hostname,
      type: 'external',
      mac: 'FF:FF:FF:FF:FF:FF',
      trafficIn,
      trafficOut,
      percentage: 0,
      status: eh.hostname.includes('shady') || eh.hostname.includes('malicious') ? 'suspicious' : 'clean',
      applications: APPS.map(app => ({
        name: app.name,
        traffic: Math.floor(Math.random() * (trafficIn + trafficOut) * 0.4)
      }))
    });
  });

  // Calculate percentages
  const totalTraffic = list.reduce((sum, h) => sum + h.trafficIn + h.trafficOut, 0);
  list.forEach(h => {
    h.percentage = parseFloat(((h.trafficIn + h.trafficOut) / totalTraffic * 100).toFixed(1));
  });

  return list.sort((a, b) => (b.trafficIn + b.trafficOut) - (a.trafficIn + a.trafficOut));
};

// Generate Geo Connections
export const generateGeoConnections = (): GeoConnection[] => {
  const connections: GeoConnection[] = [];
  // Connect SF to New York
  const sf = GEO_LOCATIONS[0];
  const ny = GEO_LOCATIONS[1];
  const london = GEO_LOCATIONS[2];
  const frankfurt = GEO_LOCATIONS[3];
  const tokyo = GEO_LOCATIONS[5];
  const singapore = GEO_LOCATIONS[6];
  const bangalore = GEO_LOCATIONS[8];

  connections.push(
    { id: 'geo-1', fromName: sf.name, toName: ny.name, fromCoords: sf.coords, toCoords: ny.coords, intensity: 0.8, active: true, type: 'outbound' },
    { id: 'geo-2', fromName: london.name, toName: frankfurt.name, fromCoords: london.coords, toCoords: frankfurt.coords, intensity: 0.9, active: true, type: 'inbound' },
    { id: 'geo-3', fromName: tokyo.name, toName: sf.name, fromCoords: tokyo.coords, toCoords: sf.coords, intensity: 0.65, active: true, type: 'inbound' },
    { id: 'geo-4', fromName: singapore.name, toName: bangalore.name, fromCoords: singapore.coords, toCoords: bangalore.coords, intensity: 0.5, active: true, type: 'outbound' },
    { id: 'geo-5', fromName: 'Moscow', toName: 'New York', fromCoords: GEO_LOCATIONS[4].coords, toCoords: ny.coords, intensity: 0.95, active: true, type: 'malicious' }
  );

  return connections;
};

// Initial System performance state
export const generateSystemMetrics = (): SystemMetrics => {
  return {
    cpuUsage: 45,
    cpuCores: [42, 38, 52, 48, 41, 35, 62, 42],
    memoryUsage: 64.2,
    memoryTotal: 64, // GB
    memoryUsed: 41.1, // GB
    diskRead: 12.4, // MB/s
    diskWrite: 8.2, // MB/s
    networkIn: 245.8, // Mbps
    networkOut: 184.2, // Mbps
    packetDropRate: 0.04, // %
  };
};
