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
  INTERNAL_HOSTS,
  EXTERNAL_HOSTS,
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

export const useDashboardStore = create<DashboardState>((set, get) => ({
  packets: generateInitialPackets(100),
  alerts: generateInitialAlerts(),
  totalPacketsProcessed: 48902581,
  hosts: generateHosts(),
  geoConnections: generateGeoConnections(),
  metrics: generateSystemMetrics(),
  blockedIps: ['103.22.200.15', '45.227.254.18'], // Pre-banned malicious IPs
  systemMetricsHistory: getInitialHistory(30),
  bandwidthHistory: getInitialBandwidthHistory(30),
  searchQuery: '',
  filterProtocol: 'ALL',
  filterSeverity: 'ALL',
  activeSidebarItem: 'Dashboard',
  isSidebarCollapsed: false,
  notifications: [
    { id: 'notif-1', text: 'Critical DDoS threat stream neutralized', time: '1h ago', severity: 'critical', read: false },
    { id: 'notif-2', text: 'Port scan scan originating from Russia registered', time: '30m ago', severity: 'high', read: false },
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

  tick: () => {
    const state = get();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // 1. Generate 1 to 4 new packets
    const newPacketsCount = Math.floor(Math.random() * 4) + 1;
    const newPacketsList: Packet[] = [];
    
    // Check if there is an active DDoS or scan alert to trigger packets matching the threat
    const hasDdos = state.alerts.some(a => a.category === 'DDoS' && a.status === 'active');
    const hasScan = state.alerts.some(a => a.category === 'Port Scan' && a.status === 'active');

    for (let i = 0; i < newPacketsCount; i++) {
      let customAttrs: Partial<Packet> = {};
      if (hasDdos && Math.random() > 0.3) {
        customAttrs = {
          protocol: 'UDP',
          port: pickRandom([80, 443]),
          size: Math.floor(Math.random() * 200) + 1200, // Large payloads
          status: 'suspicious',
          flags: '[SYN-FLOOD-UDP]',
        };
      } else if (hasScan && Math.random() > 0.3) {
        customAttrs = {
          protocol: pickRandom(['TCP', 'UDP']),
          port: Math.floor(Math.random() * 1024),
          status: 'suspicious',
          flags: '[SYN]',
        };
      }
      
      const pkt = generatePacket(customAttrs);
      // If source IP or destination IP is blocked, tag packet as blocked
      if (state.blockedIps.includes(pkt.sourceIp) || state.blockedIps.includes(pkt.destinationIp)) {
        pkt.status = 'blocked';
      }
      newPacketsList.push(pkt);
    }

    const updatedPackets = [...newPacketsList, ...state.packets].slice(0, 200);

    // 2. Fluctuating metrics
    // Calculate network activity spikes
    const isSpike = Math.random() > 0.90; // 10% chance of traffic spike
    const isCpuAnomaly = Math.random() > 0.93; // Anomaly spike for CPU
    
    const targetNetworkIn = isSpike ? state.metrics.networkIn * 2.5 : state.metrics.networkIn + (Math.random() * 30 - 15);
    const targetNetworkOut = isSpike ? state.metrics.networkOut * 2.2 : state.metrics.networkOut + (Math.random() * 26 - 13);
    const cappedNetIn = Math.max(10, Math.min(1200, targetNetworkIn));
    const cappedNetOut = Math.max(10, Math.min(1000, targetNetworkOut));

    const targetCpu = isCpuAnomaly ? 92.5 : 35 + (Math.random() * 20 - 10);
    const cappedCpu = Math.max(5, Math.min(100, targetCpu));

    const updatedMetrics: SystemMetrics = {
      cpuUsage: parseFloat(cappedCpu.toFixed(1)),
      cpuCores: state.metrics.cpuCores.map(c => Math.max(3, Math.min(100, c + Math.floor(Math.random() * 20 - 10)))),
      memoryUsage: parseFloat(Math.max(50, Math.min(95, state.metrics.memoryUsage + (Math.random() * 0.4 - 0.2))).toFixed(1)),
      memoryTotal: state.metrics.memoryTotal,
      memoryUsed: parseFloat((state.metrics.memoryTotal * (state.metrics.memoryUsage / 100)).toFixed(1)),
      diskRead: parseFloat(Math.max(0.1, state.metrics.diskRead + (Math.random() * 4 - 2)).toFixed(1)),
      diskWrite: parseFloat(Math.max(0.1, state.metrics.diskWrite + (Math.random() * 2 - 1)).toFixed(1)),
      networkIn: parseFloat(cappedNetIn.toFixed(1)),
      networkOut: parseFloat(cappedNetOut.toFixed(1)),
      packetDropRate: parseFloat(Math.max(0.001, state.metrics.packetDropRate + (Math.random() * 0.02 - 0.01)).toFixed(3)),
    };

    // Update histories
    const updatedSysHistory = [...state.systemMetricsHistory.slice(1), {
      time: timeStr,
      cpu: updatedMetrics.cpuUsage,
      memory: updatedMetrics.memoryUsage,
      diskRead: updatedMetrics.diskRead,
      diskWrite: updatedMetrics.diskWrite,
      networkIn: updatedMetrics.networkIn,
      networkOut: updatedMetrics.networkOut,
      packetDrop: updatedMetrics.packetDropRate,
    }];

    const updatedBandwidthHistory = [...state.bandwidthHistory.slice(1), {
      time: timeStr,
      inbound: updatedMetrics.networkIn,
      outbound: updatedMetrics.networkOut,
    }];

    // 3. Update Hosts bandwidth consumption
    const updatedHosts = state.hosts.map(h => {
      const activeFlow = Math.random() > 0.3;
      if (activeFlow) {
        // Add random traffic
        const addIn = Math.random() * 5;
        const addOut = Math.random() * 6;
        
        // If IP is blocked, drop its transmission additions
        if (state.blockedIps.includes(h.ip)) {
          return h;
        }

        const appUpdate = h.applications.map(app => {
          if (Math.random() > 0.5) {
            return { ...app, traffic: parseFloat((app.traffic + Math.random() * 3).toFixed(1)) };
          }
          return app;
        });

        return {
          ...h,
          trafficIn: parseFloat((h.trafficIn + addIn).toFixed(1)),
          trafficOut: parseFloat((h.trafficOut + addOut).toFixed(1)),
          applications: appUpdate,
        };
      }
      return h;
    });

    // Re-calculate host percentages
    const totalTraffic = updatedHosts.reduce((sum, h) => sum + h.trafficIn + h.trafficOut, 0);
    updatedHosts.forEach(h => {
      h.percentage = parseFloat(((h.trafficIn + h.trafficOut) / totalTraffic * 100).toFixed(1));
    });
    updatedHosts.sort((a, b) => (b.trafficIn + b.trafficOut) - (a.trafficIn + a.trafficOut));

    // 4. Random Security Alert trigger (3% chance per tick)
    let updatedAlerts = [...state.alerts];
    let updatedNotifications = [...state.notifications];

    if (Math.random() < 0.03) {
      const newAlert = generateAlert();
      updatedAlerts = [newAlert, ...updatedAlerts];
      updatedNotifications = [
        {
          id: `notif-${Math.random().toString(36).substr(2, 9)}`,
          text: `NEW INCIDENT: ${newAlert.title}`,
          time: 'Just now',
          severity: newAlert.severity,
          read: false,
        },
        ...updatedNotifications,
      ].slice(0, 15);
    }

    // 5. Fluctuating Geo Connections
    const updatedGeo = state.geoConnections.map(conn => {
      if (Math.random() > 0.7) {
        return {
          ...conn,
          active: Math.random() > 0.2, // toggle active status
          intensity: parseFloat(Math.min(1.0, Math.max(0.2, conn.intensity + (Math.random() * 0.4 - 0.2))).toFixed(2)),
        };
      }
      return conn;
    });

    set({
      packets: updatedPackets,
      metrics: updatedMetrics,
      systemMetricsHistory: updatedSysHistory,
      bandwidthHistory: updatedBandwidthHistory,
      hosts: updatedHosts,
      alerts: updatedAlerts,
      notifications: updatedNotifications,
      geoConnections: updatedGeo,
      totalPacketsProcessed: state.totalPacketsProcessed + newPacketsCount,
    });
  },

  triageAlert: (id: string) => {
    set(state => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, status: 'triaged' } : a)
    }));
  },

  mitigateAlert: (id: string) => {
    const alertToMitigate = get().alerts.find(a => a.id === id);
    let blockedAddon = {};
    
    // Auto-block the source IP if it's a critical mitigation
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
        // Mark any host matching this IP as banned
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
      
      // Re-assign coordinate positions
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
