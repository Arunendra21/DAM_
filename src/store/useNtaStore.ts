import { create } from 'zustand';

export interface WidgetSettings {
  id: string;
  name: string;
  description: string;
  topcount: number;
  signatureId: string;
  filter: string;
  alertGroup: string;
  showDescription: boolean;
  showEndpoints: boolean;
  alertCount: number;
  historicalValue: number;
}

export interface NtaAlert {
  id: string;
  alertId: string;
  sensorId: string;
  time: string;
  sourceIp: string;
  sourcePort: number;
  destinationIp: string;
  destinationPort: number;
  probe: string;
  classification: string;
  status: 'active' | 'acknowledged' | 'mitigated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  signature: string;
  description: string;
  extraText: string;
  acknowledged: boolean;
}

export interface SuspiciousActivity {
  id: string;
  time: string;
  terminalName: string;
  ip: string;
  event: string;
  severity: 'high' | 'critical' | 'medium';
}

export interface DeviceStatus {
  id: string;
  terminalName: string;
  ip: string;
  status: 'active' | 'suspended' | 'compromised' | 'offline';
  rxtx: string;
  load: number;
}

export interface BannedCommunication {
  id: string;
  time: string;
  ip: string;
  reason: string;
  protocol: string;
}

interface NtaState {
  widgets: Record<string, WidgetSettings>;
  alerts: NtaAlert[];
  suspiciousActivities: SuspiciousActivity[];
  deviceStatuses: DeviceStatus[];
  bannedCommunications: BannedCommunication[];
  customizingWidgetId: string | null;
  activeInspectAlert: NtaAlert | null;
  showCustomizeModal: boolean;
  showInspectModal: boolean;
  laptopTrafficHistory: { time: string; rx: number; tx: number }[];

  // Actions
  updateWidgetSettings: (id: string, settings: Partial<WidgetSettings>) => void;
  setCustomizingWidgetId: (id: string | null) => void;
  setActiveInspectAlert: (alert: NtaAlert | null) => void;
  setShowCustomizeModal: (show: boolean) => void;
  setShowInspectModal: (show: boolean) => void;
  acknowledgeAlert: (id: string) => void;
  mitigateAlert: (id: string) => void;
  addBannedIp: (ip: string, reason: string) => void;
  tickNta: () => void;
}

const initialWidgets: Record<string, WidgetSettings> = {
  'nta-alerts': {
    id: 'nta-alerts',
    name: 'NTA Active Alerts',
    description: 'Tracks cyber alarms triggered by enterprise signature monitoring rules.',
    topcount: 24,
    signatureId: 'SIG-9082',
    filter: 'severity:critical',
    alertGroup: 'SIG-ALARM-CORE',
    showDescription: true,
    showEndpoints: true,
    alertCount: 14,
    historicalValue: 248
  },
  'multiple-ip': {
    id: 'multiple-ip',
    name: 'MULTIPLE-IP-ASSIGNED',
    description: 'Signals internal nodes actively changing physical MAC ports or claiming rogue DHCP IPs.',
    topcount: 8,
    signatureId: 'SIG-1044',
    filter: 'ip:192.168.*',
    alertGroup: 'DHCP-ROGUE-MON',
    showDescription: true,
    showEndpoints: false,
    alertCount: 3,
    historicalValue: 12
  },
  'total-terminals': {
    id: 'total-terminals',
    name: 'Total Active Terminals',
    description: 'Total monitored Linux/Windows terminal endpoints registered under NTA node control.',
    topcount: 150,
    signatureId: 'SIG-8801',
    filter: 'status:active',
    alertGroup: 'NODE-ENDPOINT-GRP',
    showDescription: false,
    showEndpoints: true,
    alertCount: 42,
    historicalValue: 180
  },
  'laptop-traffic': {
    id: 'laptop-traffic',
    name: 'Laptop Terminal Traffic',
    description: 'Live bandwidth monitoring logs for laptop terminals routing via core enterprise routers.',
    topcount: 10,
    signatureId: 'SIG-3401',
    filter: 'type:laptop',
    alertGroup: 'WIRELESS-ZONE-A',
    showDescription: true,
    showEndpoints: true,
    alertCount: 8,
    historicalValue: 95
  }
};

const initialAlerts: NtaAlert[] = [
  {
    id: 'alert-1',
    alertId: 'ALRT-98214',
    sensorId: 'NTA-SENSOR-01',
    time: new Date().toLocaleTimeString(),
    sourceIp: '192.168.10.144',
    sourcePort: 49214,
    destinationIp: '8.8.8.8',
    destinationPort: 53,
    probe: 'PROBE-DNS-SNIFF',
    classification: 'TROJAN-OUTBOUND',
    status: 'active',
    priority: 'critical',
    signature: 'MULTIPLE-IP-ASSIGNED',
    description: 'Internal terminal changing physical network host addresses rapidly within 5s intervals.',
    extraText: 'Alert triggered by rule DHCP-ROGUE-MON; potential MAC spoofing threat detected.',
    acknowledged: false
  },
  {
    id: 'alert-2',
    alertId: 'ALRT-11094',
    sensorId: 'NTA-SENSOR-02',
    time: new Date(Date.now() - 30000).toLocaleTimeString(),
    sourceIp: '10.0.0.12',
    sourcePort: 22,
    destinationIp: '45.142.12.98',
    destinationPort: 49120,
    probe: 'PROBE-SSH-GUARD',
    classification: 'UNAUTHORIZED-ACCESS',
    status: 'active',
    priority: 'high',
    signature: 'SSH-BRUTE-FORCE-ATTEMPT',
    description: 'Failed SSH attempts detected from known suspicious external blacklisted address.',
    extraText: 'IP block registered under firewall chain NOC-SSH-DROP.',
    acknowledged: false
  }
];

const initialDeviceStatuses: DeviceStatus[] = [
  { id: 'dev-1', terminalName: 'HQ-DEVELOPER-LTP01', ip: '192.168.1.15', status: 'active', rxtx: '14.2 MB/s', load: 45 },
  { id: 'dev-2', terminalName: 'HQ-FINANCE-DESK02', ip: '192.168.1.88', status: 'active', rxtx: '2.1 MB/s', load: 12 },
  { id: 'dev-3', terminalName: 'HQ-RECEPTION-LTP04', ip: '192.168.10.12', status: 'compromised', rxtx: '280.9 KB/s', load: 88 },
  { id: 'dev-4', terminalName: 'HQ-MARKETING-LTP09', ip: '192.168.10.155', status: 'suspended', rxtx: '0.0 KB/s', load: 0 },
  { id: 'dev-5', terminalName: 'HQ-SERVER-AD01', ip: '10.0.0.10', status: 'active', rxtx: '124.8 MB/s', load: 68 }
];

const initialBanned: BannedCommunication[] = [
  { id: 'ban-1', time: '11:12:08 AM', ip: '103.22.200.15', reason: 'DDoS SYN Flood attack vector detected', protocol: 'UDP' },
  { id: 'ban-2', time: '11:15:30 AM', ip: '45.227.254.18', reason: 'Malware command callback domain handshake', protocol: 'TCP' }
];

export const useNtaStore = create<NtaState>((set, get) => ({
  widgets: initialWidgets,
  alerts: initialAlerts,
  suspiciousActivities: [
    { id: 'susp-1', time: '11:20 AM', terminalName: 'HQ-RECEPTION-LTP04', ip: '192.168.10.12', event: 'Excessive high port sweeps', severity: 'critical' as const },
    { id: 'susp-2', time: '11:23 AM', terminalName: 'HQ-SERVER-AD01', ip: '10.0.0.10', event: 'New administrator register alert', severity: 'high' as const }
  ],
  deviceStatuses: initialDeviceStatuses,
  bannedCommunications: initialBanned,
  customizingWidgetId: null,
  activeInspectAlert: null,
  showCustomizeModal: false,
  showInspectModal: false,
  laptopTrafficHistory: Array.from({ length: 15 }).map((_, i) => ({
    time: new Date(Date.now() - (15 - i) * 2000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    rx: Math.floor(Math.random() * 40) + 10,
    tx: Math.floor(Math.random() * 30) + 5
  })),

  updateWidgetSettings: (id, settings) => {
    set(state => ({
      widgets: {
        ...state.widgets,
        [id]: {
          ...state.widgets[id],
          ...settings
        }
      }
    }));
  },

  setCustomizingWidgetId: (id) => set({ customizingWidgetId: id }),
  setActiveInspectAlert: (alert) => set({ activeInspectAlert: alert }),
  setShowCustomizeModal: (show) => set({ showCustomizeModal: show }),
  setShowInspectModal: (show) => set({ showInspectModal: show }),

  acknowledgeAlert: (id) => {
    set(state => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, status: 'acknowledged', acknowledged: true } : a)
    }));
  },

  mitigateAlert: (id) => {
    const alert = get().alerts.find(a => a.id === id);
    if (alert) {
      get().addBannedIp(alert.sourceIp, `Mitigated signature: ${alert.signature}`);
    }
    set(state => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, status: 'mitigated' } : a)
    }));
  },

  addBannedIp: (ip, reason) => {
    set(state => {
      if (state.bannedCommunications.some(b => b.ip === ip)) return {};
      const newBan: BannedCommunication = {
        id: `ban-${Math.random().toString(36).substr(2, 9)}`,
        time: new Date().toLocaleTimeString(),
        ip,
        reason,
        protocol: 'TCP'
      };
      return {
        bannedCommunications: [newBan, ...state.bannedCommunications]
      };
    });
  },

  tickNta: () => {
    const state = get();
    const timeStr = new Date().toLocaleTimeString();

    // 1. Laptop traffic history tick
    const newRx = Math.floor(Math.random() * 60) + 12;
    const newTx = Math.floor(Math.random() * 45) + 8;
    const updatedHistory = [...state.laptopTrafficHistory.slice(1), {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      rx: newRx,
      tx: newTx
    }];

    // 2. Fluctuating alert count in widgets
    const updatedWidgets = { ...state.widgets };
    if (Math.random() > 0.8) {
      updatedWidgets['nta-alerts'].alertCount = Math.max(1, updatedWidgets['nta-alerts'].alertCount + (Math.random() > 0.5 ? 1 : -1));
    }
    if (Math.random() > 0.9) {
      updatedWidgets['multiple-ip'].alertCount = Math.max(1, updatedWidgets['multiple-ip'].alertCount + (Math.random() > 0.5 ? 1 : -1));
    }

    // 3. Random Suspicious Activity (5% chance)
    let updatedSusp = [...state.suspiciousActivities];
    if (Math.random() < 0.05) {
      const randomHost = initialDeviceStatuses[Math.floor(Math.random() * initialDeviceStatuses.length)];
      const eventsList = ['Rogue protocol port connection', 'DNS tunnel bypass logs', 'Unencrypted HTTP payload transmission'];
      updatedSusp = [
        {
          id: `susp-${Math.random().toString(36).substr(2, 9)}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          terminalName: randomHost.terminalName,
          ip: randomHost.ip,
          event: eventsList[Math.floor(Math.random() * eventsList.length)],
          severity: (Math.random() > 0.6 ? 'critical' : 'high') as 'critical' | 'high'
        },
        ...state.suspiciousActivities
      ].slice(0, 10);
    }

    // 4. Random Device Status updates
    const updatedDevices = state.deviceStatuses.map(dev => {
      if (Math.random() > 0.85) {
        const statuses: ('active' | 'suspended' | 'compromised' | 'offline')[] = ['active', 'suspended', 'compromised', 'offline'];
        const targetStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const load = targetStatus === 'active' ? Math.floor(Math.random() * 50) + 10 : targetStatus === 'compromised' ? 95 : 0;
        return {
          ...dev,
          status: targetStatus,
          rxtx: targetStatus === 'active' ? `${(Math.random() * 15).toFixed(1)} MB/s` : '0.0 KB/s',
          load
        };
      }
      return dev;
    });

    set({
      laptopTrafficHistory: updatedHistory,
      widgets: updatedWidgets,
      suspiciousActivities: updatedSusp,
      deviceStatuses: updatedDevices
    });
  }
}));
