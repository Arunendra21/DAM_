export interface Packet {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'DNS' | 'HTTP' | 'TLS';
  port: number;
  size: number;
  flags: string;
  status: 'normal' | 'suspicious' | 'blocked';
  payload: string;
  headers: {
    layer2: string;
    layer3: string;
    layer4: string;
  };
}

export interface Alert {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  sourceIp: string;
  destinationIp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'DDoS' | 'Port Scan' | 'DNS Anomaly' | 'Brute Force' | 'Exfiltration' | 'Malware';
  status: 'active' | 'mitigated' | 'triaged';
  packetsCount: number;
}

export interface SystemMetrics {
  cpuUsage: number;
  cpuCores: number[];
  memoryUsage: number;
  memoryTotal: number;
  memoryUsed: number;
  diskRead: number; // MB/s
  diskWrite: number; // MB/s
  networkIn: number; // Mbps
  networkOut: number; // Mbps
  packetDropRate: number; // %
}

export interface DeviceHost {
  ip: string;
  hostname: string;
  type: 'internal' | 'external';
  mac: string;
  trafficIn: number; // MB
  trafficOut: number; // MB
  percentage: number;
  status: 'clean' | 'suspicious' | 'banned';
  applications: { name: string; traffic: number }[];
}

export interface GeoConnection {
  id: string;
  fromName: string;
  toName: string;
  fromCoords: [number, number]; // [x, y] percentage or raw lat/long
  toCoords: [number, number];
  intensity: number; // 0.1 to 1.0
  active: boolean;
  type: 'inbound' | 'outbound' | 'malicious';
}
