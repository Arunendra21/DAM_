import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ShieldAlert, Activity, Server, Zap, Cpu, Network, Globe, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { useLiveUpdates } from '../hooks/useLiveUpdates';
import { useAuthStore } from '../store/useAuthStore';
import AnalyticsCard from '../components/AnalyticsCard';
import LiveCounter from '../components/LiveCounter';
import StatusBadge from '../components/StatusBadge';
import GeoMap from '../components/GeoMap';

export const Dashboard: React.FC = () => {
  // Start the live metrics engine (ticks every 1.5 seconds)
  useLiveUpdates(1500);

  const {
    metrics,
    bandwidthHistory,
    hosts,
    alerts,
    widgetLayout,
    reorderWidgets,
    toggleWidgetVisibility,
    blockIp,
    totalPacketsProcessed,
  } = useDashboardStore();

  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  // HTML5 Drag and Drop Handlers (Only enabled for Admins)
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (!isAdmin) return;
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    if (!isAdmin) return;
    const draggedId = e.dataTransfer.setData('text/plain', ''); // clear
    // Use raw event transfers if needed
  };

  // Summarize alerts count
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalAlertsCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const highAlertsCount = activeAlerts.filter(a => a.severity === 'high').length;
  const totalThreats = activeAlerts.length;

  // Filter hosts list
  const internalHosts = hosts.filter(h => h.type === 'internal').slice(0, 5);
  const externalHosts = hosts.filter(h => h.type === 'external').slice(0, 5);

  // Widget rendering resolver
  const renderWidgetContent = (id: string) => {
    switch (id) {
      case 'traffic-chart':
        return (
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bandwidthHistory} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9d4edd" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#9d4edd" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="inbound"
                  name="Inbound"
                  stroke="#00f0ff"
                  fillOpacity={1}
                  fill="url(#colorInbound)"
                  strokeWidth={1.5}
                />
                <Area
                  type="monotone"
                  dataKey="outbound"
                  name="Outbound"
                  stroke="#9d4edd"
                  fillOpacity={1}
                  fill="url(#colorOutbound)"
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'active-flows':
        return (
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bandwidthHistory.slice(-12)} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                <Tooltip />
                <Bar dataKey="inbound" name="Active flows/sec" fill="#39ff14" radius={[2, 2, 0, 0]}>
                  {bandwidthHistory.slice(-12).map((entry, index) => {
                    const isSpike = entry.inbound > 350;
                    return <Cell key={`cell-${index}`} fill={isSpike ? '#ff007f' : '#39ff14'} fillOpacity={isSpike ? 0.8 : 0.4} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'internal-hosts':
        return (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase">
                  <th className="pb-2">Hostname</th>
                  <th className="pb-2">Internal IP</th>
                  <th className="pb-2 text-right">Traffic IN</th>
                  <th className="pb-2 text-right">Traffic OUT</th>
                  <th className="pb-2 text-right">Share %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-mono text-xs text-slate-300">
                {internalHosts.map(h => (
                  <tr key={h.ip} className="hover:bg-slate-900/30 transition">
                    <td className="py-2.5 truncate max-w-[120px] font-bold text-slate-200">{h.hostname}</td>
                    <td className="py-2.5 text-cyber-blue">{h.ip}</td>
                    <td className="py-2.5 text-right">{(h.trafficIn / 100).toFixed(1)} GB</td>
                    <td className="py-2.5 text-right">{(h.trafficOut / 100).toFixed(1)} GB</td>
                    <td className="py-2.5 text-right text-glow-green text-emerald-400 font-bold">{h.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'external-hosts':
        return (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase">
                  <th className="pb-2">IP Endpoint</th>
                  <th className="pb-2">Node Name</th>
                  <th className="pb-2 text-right">Total Data</th>
                  <th className="pb-2">Security</th>
                  {isAdmin && <th className="pb-2 text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-mono text-xs text-slate-300">
                {externalHosts.map(h => (
                  <tr key={h.ip} className="hover:bg-slate-900/30 transition">
                    <td className="py-2.5 text-rose-300 font-semibold">{h.ip}</td>
                    <td className="py-2.5 truncate max-w-[110px] text-slate-400">{h.hostname}</td>
                    <td className="py-2.5 text-right text-slate-200 font-bold">{((h.trafficIn + h.trafficOut) / 100).toFixed(1)} GB</td>
                    <td className="py-2.5">
                      <StatusBadge status={h.status === 'suspicious' ? 'suspicious' : 'clean'} />
                    </td>
                    {isAdmin && (
                      <td className="py-2.5 text-center">
                        {h.status !== 'banned' ? (
                          <button
                            onClick={() => blockIp(h.ip)}
                            className="px-2 py-0.5 border border-rose-900/40 hover:border-rose-600 bg-rose-950/10 text-rose-400 rounded text-[9px] font-bold uppercase transition cursor-pointer"
                          >
                            Ban IP
                          </button>
                        ) : (
                          <span className="text-[9px] text-rose-500 font-bold uppercase tracking-wider">Blocked</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'threat-panel':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="cyber-glass rounded p-2.5 border border-slate-800/40 flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 uppercase">Threat Incidents</span>
                <span className="text-2xl font-bold text-rose-500 text-glow-pink animate-pulse-slow">{totalThreats}</span>
              </div>
              <div className="cyber-glass rounded p-2.5 border border-slate-800/40 flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 uppercase">Critical Severity</span>
                <span className="text-2xl font-bold text-cyber-pink text-glow-pink">{criticalAlertsCount}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block">Active Incidents Queue</span>
              {activeAlerts.slice(0, 3).map(alert => (
                <div key={alert.id} className="border border-slate-900 bg-slate-950/20 p-2.5 rounded flex items-start gap-2.5">
                  <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${alert.severity === 'critical' ? 'text-rose-500' : 'text-orange-400'}`} />
                  <div className="flex-1 min-w-0 font-mono text-[10px]">
                    <div className="flex justify-between items-center gap-1.5">
                      <span className="text-slate-200 font-bold uppercase truncate">{alert.category} // {alert.sourceIp}</span>
                      <StatusBadge status={alert.severity} className="scale-90" />
                    </div>
                    <p className="text-slate-400 mt-1 truncate">{alert.title}</p>
                  </div>
                </div>
              ))}
              {activeAlerts.length === 0 && (
                <div className="text-center font-mono text-xs text-slate-600 py-4 flex items-center justify-center gap-2">
                  <ShieldCheck className="text-emerald-400" size={14} />
                  <span>All nodes secure. No threat logs.</span>
                </div>
              )}
            </div>
          </div>
        );

      case 'system-performance':
        return (
          <div className="space-y-3 font-mono">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">CPU Usage ({metrics.cpuCores.length} Cores)</span>
                <span className="text-cyber-blue font-bold">{metrics.cpuUsage}%</span>
              </div>
              <div className="w-full bg-[#050814] h-2 rounded overflow-hidden border border-slate-900">
                <div
                  className="bg-gradient-to-r from-cyber-blue to-cyan-400 h-full transition-all duration-500"
                  style={{ width: `${metrics.cpuUsage}%`, boxShadow: '0 0 8px #00f0ff' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Memory Load (DDR5 RAM)</span>
                <span className="text-cyber-purple font-bold">{metrics.memoryUsage}%</span>
              </div>
              <div className="w-full bg-[#050814] h-2 rounded overflow-hidden border border-slate-900">
                <div
                  className="bg-gradient-to-r from-cyber-purple to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${metrics.memoryUsage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-900">
              <div className="flex flex-col">
                <span>Disk Reads</span>
                <span className="text-slate-300 font-bold">{metrics.diskRead} MB/s</span>
              </div>
              <div className="flex flex-col">
                <span>Disk Writes</span>
                <span className="text-slate-300 font-bold">{metrics.diskWrite} MB/s</span>
              </div>
              <div className="flex flex-col">
                <span>Packet Drops</span>
                <span className="text-rose-400 font-bold">{metrics.packetDropRate}%</span>
              </div>
            </div>
          </div>
        );

      case 'geo-map':
        return <GeoMap />;

      default:
        return <div>Unknown Widget</div>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HUD Overview Tickers */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="cyber-glass rounded-lg p-4 flex items-center gap-3.5 border-l-2 border-l-cyber-blue">
          <div className="p-2.5 rounded bg-cyan-950/20 border border-cyan-900/40 text-cyber-blue flex-shrink-0">
            <Activity size={18} className="animate-pulse" />
          </div>
          <div className="min-w-0">
            <LiveCounter label="Bandwidth (In)" value={metrics.networkIn} format="bandwidth" />
          </div>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex items-center gap-3.5 border-l-2 border-l-cyber-purple">
          <div className="p-2.5 rounded bg-purple-950/20 border border-purple-900/40 text-cyber-purple flex-shrink-0">
            <Network size={18} />
          </div>
          <div className="min-w-0">
            <LiveCounter label="Bandwidth (Out)" value={metrics.networkOut} format="bandwidth" />
          </div>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex items-center gap-3.5 border-l-2 border-l-emerald-500">
          <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 flex-shrink-0">
            <Server size={18} />
          </div>
          <div className="min-w-0">
            <LiveCounter label="Packets (Total)" value={totalPacketsProcessed} format="number" />
          </div>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex items-center gap-3.5 border-l-2 border-l-cyber-yellow">
          <div className="p-2.5 rounded bg-yellow-950/20 border border-yellow-900/40 text-cyber-yellow flex-shrink-0">
            <Zap size={18} />
          </div>
          <div className="min-w-0">
            <LiveCounter label="Active Sessions" value={Math.floor(metrics.networkIn * 4.2)} format="number" />
          </div>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex items-center gap-3.5 border-l-2 border-l-rose-500">
          <div className="p-2.5 rounded bg-rose-950/20 border border-rose-900/40 text-rose-400 flex-shrink-0">
            <ShieldAlert size={18} className="animate-bounce" />
          </div>
          <div className="min-w-0">
            <LiveCounter label="Security Events" value={totalThreats} format="number" />
          </div>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex items-center gap-3.5 border-l-2 border-l-cyan-400">
          <div className="p-2.5 rounded bg-cyan-950/20 border border-cyan-900/40 text-cyan-400 flex-shrink-0">
            <Cpu size={18} />
          </div>
          <div className="min-w-0">
            <LiveCounter label="CPU Load" value={metrics.cpuUsage} format="percent" />
          </div>
        </div>

      </div>

      {/* Draggable Dashboard Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {widgetLayout
          .filter(widget => widget.visible)
          // Hide Threat and System Performance cards entirely from simple user view
          .filter(widget => isAdmin || (widget.id !== 'threat-panel' && widget.id !== 'system-performance'))
          .map(widget => (
            <div
              key={widget.id}
              className={widget.id === 'geo-map' ? 'xl:col-span-2' : ''}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, widget.id)}
            >
              <AnalyticsCard
                id={widget.id}
                title={widget.title}
                subtitle={
                  widget.id === 'traffic-chart'
                    ? 'Inbound: Cyan // Outbound: Purple (Realtime)'
                    : widget.id === 'geo-map'
                    ? 'Visualizing nodes routing in real time'
                    : 'System intelligence stream'
                }
                onDragStart={handleDragStart}
                onHide={() => toggleWidgetVisibility(widget.id)}
                // Hide card layout modifiers (minimize/hide buttons) from Users
                showControls={isAdmin}
              >
                {renderWidgetContent(widget.id)}
              </AnalyticsCard>
            </div>
          ))}
      </div>

    </div>
  );
};
export default Dashboard;
