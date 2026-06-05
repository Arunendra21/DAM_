import { create } from 'zustand';
import { Packet, Alert, SystemMetrics, DeviceHost, GeoConnection } from '../types';
import {
  generateInitialPackets,
  generateInitialAlerts,
  generateHosts,
  generateGeoConnections,
  generateSystemMetrics,
  generatePacket,
  generateAlert,
  pickRandom,
} from '../utils/mockGenerator';

interface HistoricalMetric {
  time: string;
  cpu: number;
  memory: number;
  diskRead: number;
  diskWrite: number;
  networkIn: number;
  networkOut: number;
  packetDrop: number;
}

interface DashboardState {
  packets: Packet[];
  alerts: Alert[];
  totalPacketsProcessed: number;
  hosts: DeviceHost[];
  geoConnections: GeoConnection[];
  metrics: SystemMetrics;
  blockedIps: string[];
  systemMetricsHistory: HistoricalMetric[];
  bandwidthHistory: { time: string; inbound: number; outbound: number }[];
  searchQuery: string;
  filterProtocol: string;
  filterSeverity: string;
  activeSidebarItem: string;
  isSidebarCollapsed: boolean;
  widgetLayout: { id: string; title: string; visible: boolean; x: number; y: number }[];
  notifications: { id: string; text: string; time: string; severity: string; read: boolean }[];
  
  // Actions
  connectWebSocket: () => void;
  fetchInitialData: () => Promise<void>;
  tick: () => void;
  triageAlert: (id: string) => void;
  mitigateAlert: (id: string) => void;
  blockIp: (ip: string) => void;
  unblockIp: (ip: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterProtocol: (protocol: string) => void;
  setFilterSeverity: (severity: string) => void;
  setActiveSidebarItem: (item: string) => void;
  toggleSidebar: () => void;
  markNotificationsRead: () => void;
  reorderWidgets: (draggedId: string, targetId: string) => void;
  toggleWidgetVisibility: (id: string) => void;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';
const WS_BASE_URL = 'ws://localhost:8080/ws';

// Generate initial historical data
const getInitialHistory = (length = 30): HistoricalMetric[] => {
  const history: HistoricalMetric[] = [];
  const baseMetrics = generateSystemMetrics();
  for (let i = 0; i < length; i++) {
    const time = new Date(Date.now() - (length - i) * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    history.push({
      time,
      cpu: Math.max(10, Math.min(95, baseMetrics.cpuUsage + (Math.random() * 16 - 8))),
      memory: baseMetrics.memoryUsage,
      diskRead: Math.max(0, baseMetrics.diskRead + (Math.random() * 10 - 5)),
      diskWrite: Math.max(0, baseMetrics.diskWrite + (Math.random() * 6 - 3)),
      networkIn: Math.max(10, baseMetrics.networkIn + (Math.random() * 80 - 40)),
      networkOut: Math.max(10, baseMetrics.networkOut + (Math.random() * 60 - 30)),
      packetDrop: Math.max(0, baseMetrics.packetDropRate + (Math.random() * 0.08 - 0.04)),
    });
  }
  return history;
};

const getInitialBandwidthHistory = (length = 30) => {
  const baseMetrics = generateSystemMetrics();
  return Array.from({ length }).map((_, i) => {
    const time = new Date(Date.now() - (length - i) * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return {
      time,
      inbound: parseFloat((baseMetrics.networkIn + (Math.random() * 100 - 50)).toFixed(1)),
      outbound: parseFloat((baseMetrics.networkOut + (Math.random() * 80 - 40)).toFixed(1)),
    };
  });
};

let webSocketInstance: WebSocket | null = null;

export const useDashboardStore = create<DashboardState>((set, get) => ({
  packets: generateInitialPackets(60),
  alerts: [],
  totalPacketsProcessed: 48902581,
  hosts: generateHosts(),
  geoConnections: generateGeoConnections(),
  metrics: generateSystemMetrics(),
  blockedIps: ['103.22.200.15', '45.227.254.18'],
  systemMetricsHistory: getInitialHistory(30),
  bandwidthHistory: getInitialBandwidthHistory(30),
  searchQuery: '',
  filterProtocol: 'ALL',
  filterSeverity: 'ALL',
  activeSidebarItem: 'Dashboard',
  isSidebarCollapsed: false,
  notifications: [
    { id: 'notif-1', text: 'Critical DDoS threat stream neutralized', time: '1h ago', severity: 'critical', read: false },
    { id: 'notif-2', text: 'Port scan originating from Russia registered', time: '30m ago', severity: 'high', read: false },
  ],
  widgetLayout: [
    { id: 'traffic-chart', title: 'Inbound vs Outbound Traffic', visible: true, x: 0, y: 0 },
    { id: 'active-flows', title: 'Active Flows', visible: true, x: 1, y: 0 },
    { id: 'internal-hosts', title: 'Top Bandwidth Internal Hosts', visible: true, x: 0, y: 1 },
    { id: 'external-hosts', title: 'Top Bandwidth External Hosts', visible: true, x: 1, y: 1 },
    { id: 'threat-panel', title: 'Threat Detection Panel', visible: true, x: 0, y: 2 },
    { id: 'system-performance', title: 'System Performance', visible: true, x: 1, y: 2 },
    { id: 'geo-map', title: 'Geo Traffic Visualization', visible: true, x: 0, y: 3 },
  ],

  connectWebSocket: () => {
    if (webSocketInstance && webSocketInstance.readyState === WebSocket.OPEN) {
      return;
    }

    // Call REST APIs to get base data
    get().fetchInitialData();

    webSocketInstance = new WebSocket(WS_BASE_URL);

    webSocketInstance.onopen = () => {
      console.log('🔌 NMS WebSocket Connected Successfully!');
    };

    webSocketInstance.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const { type, data } = payload;
        const state = get();
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        switch (type) {
          case 'system_metrics':
            const currentMetrics: SystemMetrics = {
              cpuUsage: data.cpuUsage,
              cpuCores: data.cpuCores,
              memoryUsage: data.memoryUsage,
              memoryTotal: data.memoryTotal,
              memoryUsed: data.memoryUsed,
              diskRead: data.diskRead,
              diskWrite: data.diskWrite,
              networkIn: data.networkIn,
              networkOut: data.networkOut,
              packetDropRate: data.packetDropRate,
            };

            const updatedHistory = [...state.systemMetricsHistory.slice(1), {
              time: timeStr,
              cpu: data.cpuUsage,
              memory: data.memoryUsage,
              diskRead: data.diskRead,
              diskWrite: data.diskWrite,
              networkIn: data.networkIn,
              networkOut: data.networkOut,
              packetDrop: data.packetDropRate,
            }];

            const updatedBandwidth = [...state.bandwidthHistory.slice(1), {
              time: timeStr,
              inbound: data.networkIn,
              outbound: data.networkOut,
            }];

            set({
              metrics: currentMetrics,
              systemMetricsHistory: updatedHistory,
              bandwidthHistory: updatedBandwidth,
            });
            break;

          case 'packet_capture':
            const newPacket: Packet = {
              id: String(data.id || Math.random()),
              timestamp: data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : timeStr,
              sourceIp: data.source_ip,
              destinationIp: data.destination_ip,
              protocol: data.protocol,
              port: data.port,
              size: data.size,
              flags: data.flags,
              status: data.status,
              payload: data.payload,
              headers: {
                layer2: data.layer2,
                layer3: data.layer3,
                layer4: data.layer4,
              }
            };

            if (state.blockedIps.includes(newPacket.sourceIp) || state.blockedIps.includes(newPacket.destinationIp)) {
              newPacket.status = 'blocked';
            }

            set({
              packets: [newPacket, ...state.packets].slice(0, 150),
              totalPacketsProcessed: state.totalPacketsProcessed + 1,
            });
            break;

          case 'new_alert':
            const newAlert: Alert = {
              id: String(data.id || Math.random()),
              timestamp: data.created_at ? new Date(data.created_at).toLocaleTimeString() : timeStr,
              title: data.title,
              description: data.description,
              sourceIp: data.source_ip,
              destinationIp: data.destination_ip,
              severity: data.severity,
              category: data.category,
              status: data.status,
              packetsCount: data.packets_count,
            };

            set({
              alerts: [newAlert, ...state.alerts],
              notifications: [
                {
                  id: `notif-${Math.random().toString(36).substr(2, 9)}`,
                  text: `REAL-TIME ALERT: ${newAlert.title}`,
                  time: 'Just now',
                  severity: newAlert.severity,
                  read: false,
                },
                ...state.notifications
              ].slice(0, 15),
            });
            break;

          case 'device_status_change':
            set({
              hosts: state.hosts.map(h => 
                h.hostname === data.hostname ? { ...h, status: data.status === 'offline' ? 'suspicious' as const : 'clean' as const } : h
              )
            });
            break;
        }
      } catch (err) {
        console.error('Failed to parse WebSocket event', err);
      }
    };

    webSocketInstance.onclose = () => {
      console.log('🔌 WebSocket connection closed. Reconnecting in 5 seconds...');
      setTimeout(() => get().connectWebSocket(), 5000);
    };
  },

  fetchInitialData: async () => {
    const session = localStorage.getItem('netintel_session');
    if (!session) return;

    const token = JSON.parse(session).token;

    try {
      // 1. Fetch real-time devices
      const deviceRes = await fetch(`${API_BASE_URL}/devices`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (deviceRes.ok) {
        const goDevices = await deviceRes.json();
        const mappedHosts = goDevices.map((d: any) => ({
          ip: d.ip_address,
          hostname: d.hostname,
          type: d.ip_address.startsWith('192.168') ? 'internal' : 'external',
          mac: d.mac_address,
          trafficIn: 10 + Math.random() * 50,
          trafficOut: 8 + Math.random() * 40,
          percentage: 0,
          status: d.status === 'offline' ? 'suspicious' as const : 'clean' as const,
          applications: [
            { name: 'HTTPS', traffic: 12.5 },
            { name: 'DNS', traffic: 1.2 },
            { name: 'SSH', traffic: 3.4 }
          ]
        }));

        // Calculate host percentages
        const totalTraffic = mappedHosts.reduce((sum: number, h: any) => sum + h.trafficIn + h.trafficOut, 0);
        mappedHosts.forEach((h: any) => {
          h.percentage = totalTraffic > 0 ? parseFloat(((h.trafficIn + h.trafficOut) / totalTraffic * 100).toFixed(1)) : 0;
        });
        mappedHosts.sort((a: any, b: any) => (b.trafficIn + b.trafficOut) - (a.trafficIn + a.trafficOut));

        set({ hosts: mappedHosts });
      }

      // 2. Fetch real alerts
      const alertRes = await fetch(`${API_BASE_URL}/alerts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (alertRes.ok) {
        const goAlerts = await alertRes.json();
        const mappedAlerts: Alert[] = goAlerts.map((data: any) => ({
          id: String(data.id),
          timestamp: new Date(data.created_at).toLocaleTimeString(),
          title: data.title,
          description: data.description,
          sourceIp: data.source_ip,
          destinationIp: data.destination_ip,
          severity: data.severity,
          category: data.category,
          status: data.status,
          packetsCount: data.packets_count,
        }));
        set({ alerts: mappedAlerts });
      }
    } catch (err) {
      console.error('Failed to load initial data from REST API', err);
    }
  },

  tick: () => {
    // Left as no-op to support component intervals without causing duplicate local mocks
  },

  triageAlert: async (id: string) => {
    const session = localStorage.getItem('netintel_session');
    if (session) {
      const token = JSON.parse(session).token;
      try {
        await fetch(`${API_BASE_URL}/alerts/${id}/acknowledge`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: 'triaged' })
        });
      } catch (err) {
        console.error(err);
      }
    }

    set(state => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, status: 'triaged' } : a)
    }));
  },

  mitigateAlert: async (id: string) => {
    const session = localStorage.getItem('netintel_session');
    let token = '';
    if (session) {
      token = JSON.parse(session).token;
      try {
        await fetch(`${API_BASE_URL}/alerts/${id}/acknowledge`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: 'mitigated' })
        });
      } catch (err) {
        console.error(err);
      }
    }

    const alertToMitigate = get().alerts.find(a => a.id === id);
    let blockedAddon = {};
    
    if (alertToMitigate && (alertToMitigate.severity === 'critical' || alertToMitigate.severity === 'high')) {
      const currentBlocked = get().blockedIps;
      if (!currentBlocked.includes(alertToMitigate.sourceIp)) {
        blockedAddon = { blockedIps: [...currentBlocked, alertToMitigate.sourceIp] };
      }
    }

    set(state => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, status: 'mitigated' } : a),
      ...blockedAddon
    }));
  },

  blockIp: (ip: string) => {
    set(state => {
      if (state.blockedIps.includes(ip)) return {};
      return {
        blockedIps: [...state.blockedIps, ip],
        hosts: state.hosts.map(h => h.ip === ip ? { ...h, status: 'banned' as const } : h)
      };
    });
  },

  unblockIp: (ip: string) => {
    set(state => ({
      blockedIps: state.blockedIps.filter(item => item !== ip),
      hosts: state.hosts.map(h => h.ip === ip ? { ...h, status: 'clean' as const } : h)
    }));
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setFilterProtocol: (protocol: string) => set({ filterProtocol: protocol }),
  setFilterSeverity: (severity: string) => set({ filterSeverity: severity }),
  setActiveSidebarItem: (item: string) => set({ activeSidebarItem: item }),
  toggleSidebar: () => set(state => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  
  markNotificationsRead: () => set(state => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  reorderWidgets: (draggedId: string, targetId: string) => {
    const layout = [...get().widgetLayout];
    const draggedIdx = layout.findIndex(w => w.id === draggedId);
    const targetIdx = layout.findIndex(w => w.id === targetId);

    if (draggedIdx !== -1 && targetIdx !== -1) {
      const [draggedWidget] = layout.splice(draggedIdx, 1);
      layout.splice(targetIdx, 0, draggedWidget);
      
      const updatedLayout = layout.map((w, idx) => ({
        ...w,
        x: idx % 2,
        y: Math.floor(idx / 2),
      }));
      
      set({ widgetLayout: updatedLayout });
    }
  },

  toggleWidgetVisibility: (id: string) => {
    set(state => ({
      widgetLayout: state.widgetLayout.map(w => w.id === id ? { ...w, visible: !w.visible } : w)
    }));
  }
}));
