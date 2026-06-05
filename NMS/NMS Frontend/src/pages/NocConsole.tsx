import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDashboardStore } from '../store/useDashboardStore';
import { useLiveUpdates } from '../hooks/useLiveUpdates';
import { Globe, Settings, FileSpreadsheet, Server, Laptop, Cpu, Shield, HelpCircle, Activity, Key, ShieldAlert, GitMerge, FileText } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export const NocConsole: React.FC = () => {
  // Feed live telemetry ticks
  useLiveUpdates(1500);

  const { pathname } = useLocation();
  const { hosts, metrics, alerts, blockedIps, blockIp, unblockIp } = useDashboardStore();

  // Settings states
  const [anomalyThreshold, setAnomalyThreshold] = useState(85);
  const [packetBufferCapacity, setPacketBufferCapacity] = useState(1024);
  const [logRotationSize, setLogRotationSize] = useState(500);

  // 1. Render Host list view
  if (pathname === '/hosts') {
    return (
      <div className="space-y-6">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-2">
              <Laptop size={14} /> Registered Network Hosts telemetries
            </h4>
            <span className="font-mono text-[9px] text-slate-500">{hosts.length} HOSTS REGISTERED</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase">
                  <th className="pb-2 pl-3">Hostname</th>
                  <th className="pb-2">IP Address</th>
                  <th className="pb-2">MAC Address</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2 text-right">Data In</th>
                  <th className="pb-2 text-right">Data Out</th>
                  <th className="pb-2">Threat Status</th>
                  <th className="pb-2 text-center">Firewall Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-mono text-xs text-slate-300">
                {hosts.map(h => (
                  <tr key={h.ip} className="hover:bg-slate-900/30 transition">
                    <td className="py-3 pl-3 font-bold text-slate-200">{h.hostname}</td>
                    <td className="py-3 text-cyber-blue">{h.ip}</td>
                    <td className="py-3 text-slate-500">{h.mac}</td>
                    <td className="py-3 uppercase text-[10px]">{h.type}</td>
                    <td className="py-3 text-right">{(h.trafficIn / 100).toFixed(1)} GB</td>
                    <td className="py-3 text-right">{(h.trafficOut / 100).toFixed(1)} GB</td>
                    <td className="py-3">
                      <StatusBadge status={blockedIps.includes(h.ip) ? 'blocked' : h.status} />
                    </td>
                    <td className="py-3 text-center">
                      {!blockedIps.includes(h.ip) ? (
                        <button
                          onClick={() => blockIp(h.ip)}
                          className="px-2 py-0.5 border border-rose-900/40 hover:border-rose-600 bg-rose-950/10 text-rose-400 rounded text-[9px] font-bold uppercase transition cursor-pointer"
                        >
                          Ban Node
                        </button>
                      ) : (
                        <button
                          onClick={() => unblockIp(h.ip)}
                          className="px-2 py-0.5 border border-slate-800 hover:border-cyber-blue bg-slate-950 text-slate-400 hover:text-cyber-blue rounded text-[9px] font-bold uppercase transition cursor-pointer"
                        >
                          Release
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 2. Render Applications list view
  if (pathname === '/applications') {
    const appMap: Record<string, number> = {};
    hosts.forEach(h => {
      h.applications.forEach(app => {
        appMap[app.name] = (appMap[app.name] || 0) + app.traffic;
      });
    });

    const appsSorted = Object.entries(appMap)
      .map(([name, traffic]) => ({ name, traffic: parseFloat(traffic.toFixed(1)) }))
      .sort((a, b) => b.traffic - a.traffic);

    const totalAppTraffic = appsSorted.reduce((sum, item) => sum + item.traffic, 0);

    return (
      <div className="space-y-6">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-2">
              <Cpu size={14} /> Core Application Traffic Telemetries
            </h4>
            <span className="font-mono text-[9px] text-slate-500">APPLICATIONS ANALYSIS</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {appsSorted.map(app => {
              const pct = totalAppTraffic > 0 ? parseFloat((app.traffic / totalAppTraffic * 100).toFixed(1)) : 0;
              return (
                <div key={app.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-200">{app.name}</span>
                    <span className="text-slate-400">{(app.traffic / 100).toFixed(1)} GB ({pct}%)</span>
                  </div>
                  <div className="w-full bg-[#050814] h-3 rounded overflow-hidden border border-slate-900">
                    <div
                      className="bg-gradient-to-r from-cyber-blue to-cyan-500 h-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Render DNS Monitor view
  if (pathname === '/dns') {
    const dnsLogs = [
      { timestamp: new Date(Date.now() - 5000).toISOString(), query: 'api.github.com', type: 'A', status: 'SUCCESS', client: '10.0.1.12' },
      { timestamp: new Date(Date.now() - 8000).toISOString(), query: 'aws-ap-south-datacenter.net', type: 'A', status: 'SUCCESS', client: '10.0.2.10' },
      { timestamp: new Date(Date.now() - 12000).toISOString(), query: 'badactor-c2-server.net', type: 'TXT', status: 'BLOCKED', client: '10.0.5.105' },
      { timestamp: new Date(Date.now() - 16000).toISOString(), query: 'cloudflare-dns-primary.com', type: 'AAAA', status: 'SUCCESS', client: '10.0.1.45' },
      { timestamp: new Date(Date.now() - 20000).toISOString(), query: 'edge-cache-akamai.com', type: 'CNAME', status: 'SUCCESS', client: '10.0.3.50' },
      { timestamp: new Date(Date.now() - 25000).toISOString(), query: 'tracker.malware-domain.io', type: 'A', status: 'ALERTED', client: '10.0.5.105' },
    ];

    return (
      <div className="space-y-6">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-2">
              <Server size={14} /> DNS Sniffer & Queries Logs
            </h4>
            <span className="font-mono text-[9px] text-slate-500">LIVE Sniffing</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase">
                  <th className="pb-2 pl-3">Time</th>
                  <th className="pb-2">Sniffed DNS Query Domain</th>
                  <th className="pb-2">Q-Type</th>
                  <th className="pb-2">Client Node</th>
                  <th className="pb-2">Resolution Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-mono text-xs text-slate-300">
                {dnsLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition">
                    <td className="py-2.5 pl-3 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                    <td className="py-2.5 text-cyber-blue font-bold">{log.query}</td>
                    <td className="py-2.5 text-slate-400">{log.type}</td>
                    <td className="py-2.5 text-slate-400">{log.client}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold rounded uppercase ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : log.status === 'BLOCKED'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 4. Render Reports download page
  if (pathname === '/reports') {
    const reportList = [
      { id: 'rep-01', title: 'Network Bandwidth Performance Archive', date: '2026-05-21', size: '4.8 MB', format: 'PDF' },
      { id: 'rep-02', title: 'Threat Mitigations & Blacklist Log', date: '2026-05-20', size: '1.2 MB', format: 'CSV' },
      { id: 'rep-03', title: 'Application Sniffing Performance Audit', date: '2026-05-18', size: '12.4 MB', format: 'PDF' },
      { id: 'rep-04', title: 'NOC DNS Tunneling & Security Report', date: '2026-05-15', size: '3.1 MB', format: 'XLSX' },
    ];

    return (
      <div className="space-y-6">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-2">
              <FileSpreadsheet size={14} /> Telemetry PDF/CSV Reports Center
            </h4>
            <span className="font-mono text-[9px] text-slate-500">EXPORTS GATEWAY</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {reportList.map(rep => (
              <div key={rep.id} className="border border-slate-900 bg-slate-950/20 p-3 rounded flex items-center justify-between hover:border-slate-800 transition">
                <div>
                  <h5 className="font-bold text-slate-200">{rep.title}</h5>
                  <span className="text-[10px] text-slate-500">ARCHIVED ON: {rep.date} // SIZE: {rep.size}</span>
                </div>
                <button className="px-3.5 py-1.5 bg-[#0a0f1d] hover:bg-slate-900 border border-slate-800 hover:border-cyber-blue text-cyber-blue font-bold rounded text-[10px] uppercase transition cursor-pointer">
                  Download {rep.format}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 5. Active Keys Monitor (`/keys`)
  if (pathname === '/keys') {
    const activeKeys = [
      { id: 'key-1', entity: 'NOC-CENTRAL-ROUTER', type: 'SSL Signature', algorithm: 'ECDSA-SHA256', expiry: '2027-12-05', status: 'VALID' },
      { id: 'key-2', entity: 'VPN-GATEWAY-DEV', type: 'SSH Authorized Key', algorithm: 'ED25519-256', expiry: '2026-10-22', status: 'VALID' },
      { id: 'key-3', entity: 'EXTERNAL-APIS-GATEWAY', type: 'OAuth Token Signature', algorithm: 'HMAC-SHA512', expiry: '2026-06-15', status: 'EXPIRES-SOON' }
    ];

    return (
      <div className="space-y-6">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-2">
              <Key size={14} /> Active Cryptographic Keys & Signature Monitor
            </h4>
            <span className="font-mono text-[9px] text-slate-500">SIGNATURE AUDITS</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse font-mono text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-900 text-slate-500 uppercase pb-2">
                  <th className="pb-2">Node Entity</th>
                  <th className="pb-2">Key Type</th>
                  <th className="pb-2">Algorithm</th>
                  <th className="pb-2">Expiration</th>
                  <th className="pb-2 text-right">Integrity Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {activeKeys.map(k => (
                  <tr key={k.id} className="hover:bg-slate-900/20 transition">
                    <td className="py-2.5 font-bold text-slate-200">{k.entity}</td>
                    <td className="py-2.5 text-cyber-blue">{k.type}</td>
                    <td className="py-2.5 text-slate-400">{k.algorithm}</td>
                    <td className="py-2.5 text-slate-400">{k.expiry}</td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        k.status === 'VALID' ? 'bg-emerald-950/20 border border-emerald-800 text-emerald-400' : 'bg-yellow-950/20 border border-yellow-800 text-yellow-400'
                      }`}>
                        {k.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 6. Overview Dashboard (`/overview`)
  if (pathname === '/overview') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="cyber-glass rounded-lg border border-slate-900 p-4">
            <h5 className="font-orbitron font-bold text-slate-400 uppercase tracking-wider mb-2">TELEMETRY LINK STATUS</h5>
            <div className="space-y-1.5">
              <p>✔ Active DNS Queries Sniffer: <span className="text-emerald-400">ONLINE</span></p>
              <p>✔ SSL Encryption Handshake: <span className="text-emerald-400">ENFORCED</span></p>
              <p>✔ Capture Ring Buffer allocation: <span className="text-emerald-400">100% OK</span></p>
            </div>
          </div>
          <div className="cyber-glass rounded-lg border border-slate-900 p-4">
            <h5 className="font-orbitron font-bold text-slate-400 uppercase tracking-wider mb-2">NOC SECURITY METRICS</h5>
            <div className="space-y-1.5">
              <p>✔ Neutralized threat streams: <span className="text-emerald-400">{blockedIps.length} Nodes</span></p>
              <p>✔ Firewall registry rules: <span className="text-cyber-blue">ACTIVE</span></p>
              <p>✔ Packet drop logs: <span className="text-slate-400">0.00% drops</span></p>
            </div>
          </div>
          <div className="cyber-glass rounded-lg border border-slate-900 p-4">
            <h5 className="font-orbitron font-bold text-slate-400 uppercase tracking-wider mb-2">SYSTEM ALLOCATIONS</h5>
            <div className="space-y-1.5">
              <p>✔ CPU usage cores: <span className="text-cyber-purple">{metrics.cpuUsage}%</span></p>
              <p>✔ Memory cache alloc: <span className="text-cyber-purple">{metrics.memoryUsage}%</span></p>
              <p>✔ Disk telemetry read: <span className="text-slate-300">{metrics.diskRead} MB/s</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. NTA Endpoints Sniffer (`/nta-endpoints`)
  if (pathname === '/nta-endpoints') {
    return (
      <div className="space-y-6">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-2">
              <GitMerge size={14} /> NTA Sniffed Rouge DHCP Endpoints Registry
            </h4>
            <span className="font-mono text-[9px] text-slate-500">ROGUE DHCP SWEEPS</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse font-mono text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-900 text-slate-500 uppercase pb-2">
                  <th className="pb-2">Endpoint Host</th>
                  <th className="pb-2">MAC Signature</th>
                  <th className="pb-2">Internal Range IP</th>
                  <th className="pb-2 text-right">Subnet Gateway</th>
                  <th className="pb-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                <tr className="hover:bg-slate-900/20 transition">
                  <td className="py-2.5 font-bold text-slate-200">HQ-PRINTER-ZONE-B</td>
                  <td className="py-2.5 text-slate-400">00:1A:2B:3C:4D:5E</td>
                  <td className="py-2.5 text-cyber-blue">192.168.10.45</td>
                  <td className="py-2.5 text-right text-slate-500">255.255.255.0</td>
                  <td className="py-2.5 text-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/20 border border-emerald-800 text-emerald-400 text-[9px] font-bold">
                      SECURED
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/20 transition">
                  <td className="py-2.5 font-bold text-rose-300">ROGUE-WIFI-CLIENT</td>
                  <td className="py-2.5 text-slate-400">FF:FF:FF:FF:FF:FF</td>
                  <td className="py-2.5 text-rose-400">192.168.1.254</td>
                  <td className="py-2.5 text-right text-slate-500">255.255.255.0</td>
                  <td className="py-2.5 text-center">
                    <span className="px-2 py-0.5 rounded bg-rose-950/20 border border-rose-800 text-rose-400 text-[9px] font-bold animate-pulse">
                      SUSPICIOUS
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 8. Alerts Live Stream / Realtime Alerts (`/live-alerts` & `/alerts-dashboard`)
  if (pathname === '/live-alerts' || pathname === '/alerts-dashboard') {
    return (
      <div className="space-y-6">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
            <h4 className="font-orbitron font-bold text-xs text-rose-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert size={14} className="animate-pulse" /> Live Telemetry Alarm Stream
            </h4>
            <span className="font-mono text-[9px] text-slate-500 animate-pulse">WEBSOCKET STREAM ACTIVE</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {alerts.slice(0, 3).map(alert => (
              <div key={alert.id} className="border border-slate-900 bg-slate-950/20 p-3 rounded flex items-center justify-between hover:border-slate-800 transition">
                <div>
                  <h5 className="font-bold text-slate-200 uppercase">{alert.category} // {alert.sourceIp}</h5>
                  <span className="text-[10px] text-slate-500">TIMESTAMP: {alert.timestamp} // PRIORITY: {alert.severity}</span>
                  <p className="text-slate-400 mt-1">{alert.title}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-950/20 border border-rose-900/40 text-rose-400 text-[9px] font-bold uppercase">
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Settings Panel view
  if (pathname === '/settings') {
    return (
      <div className="space-y-6 max-w-xl">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-5">
          
          <div className="border-b border-slate-800 pb-2 mb-2">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-2">
              <Settings size={14} /> Dashboard Console Settings
            </h4>
          </div>

          <div className="space-y-4 font-mono text-xs text-slate-300">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span>Threat Anomaly Threshold</span>
                <span className="text-cyber-blue font-bold">{anomalyThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={anomalyThreshold}
                onChange={(e) => setAnomalyThreshold(parseInt(e.target.value))}
                className="w-full h-1 bg-[#050814] rounded outline-none appearance-none cursor-pointer"
              />
              <span className="text-[9px] text-slate-500">CPU/Bandwidth anomaly spike alerts will trigger above this threshold.</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span>Packet Frame Buffer Capacity</span>
                <span className="text-cyber-purple font-bold">{packetBufferCapacity} pkts</span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={packetBufferCapacity}
                onChange={(e) => setPacketBufferCapacity(parseInt(e.target.value))}
                className="w-full h-1 bg-[#050814] rounded outline-none appearance-none cursor-pointer"
              />
              <span className="text-[9px] text-slate-500">Maximum packets logged in active UI stream explorer memory.</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span>Log Rotation size</span>
                <span className="text-cyber-yellow font-bold">{logRotationSize} MB</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={logRotationSize}
                onChange={(e) => setLogRotationSize(parseInt(e.target.value))}
                className="w-full h-1 bg-[#050814] rounded outline-none appearance-none cursor-pointer"
              />
              <span className="text-[9px] text-slate-500">Log dumps will rotate dynamically when file logs exceed this value.</span>
            </div>

            <div className="border-t border-slate-900 pt-3 flex justify-end">
              <button
                onClick={() => alert('Security configuration synced to NOC daemon successfully.')}
                className="px-4 py-2 bg-cyber-blue/10 border border-cyber-blue text-cyber-blue font-bold rounded text-[10px] uppercase hover:bg-cyber-blue/20 transition cursor-pointer"
              >
                Sync Settings
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Fallback View (Live Traffic, Flows, Sessions)
  const isSecurity = pathname === '/security' || pathname === '/threats';
  const flowType = pathname === '/flows' ? 'FLOWS' : pathname === '/sessions' ? 'SESSIONS' : 'TRAFFIC';

  return (
    <div className="space-y-6">
      
      <div className="cyber-glass rounded-lg border border-slate-900 p-4">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
          <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} className="animate-pulse" /> Live Telemetry {flowType} Trace
          </h4>
          <span className="font-mono text-[9px] text-slate-500 animate-ping">STREAM ACTIVE // 256B FRAME</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase">
                <th className="pb-2 pl-3">Session IP</th>
                <th className="pb-2">External Endpoint</th>
                <th className="pb-2 text-right">Packets logged</th>
                <th className="pb-2 text-right">Throughput</th>
                <th className="pb-2">Protocol</th>
                <th className="pb-2">Link Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 font-mono text-xs text-slate-300">
              {hosts.slice(0, 7).map((h, index) => {
                const activePackets = Math.floor(h.trafficIn * 1.5 + (Math.random() * 20 - 10));
                return (
                  <tr key={index} className="hover:bg-slate-900/30 transition">
                    <td className="py-2.5 pl-3 text-slate-200 font-semibold">{h.ip}</td>
                    <td className="py-2.5 text-cyber-blue">8.8.8.8 // DNS-Google</td>
                    <td className="py-2.5 text-right text-slate-400">{activePackets} PPS</td>
                    <td className="py-2.5 text-right text-glow-green text-emerald-400 font-bold">{(h.trafficOut / 120).toFixed(1)} Mbps</td>
                    <td className="py-2.5 text-slate-400">DNS // PORT 53</td>
                    <td className="py-2.5">
                      <StatusBadge status={blockedIps.includes(h.ip) ? 'banned' : 'normal'} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
export default NocConsole;
