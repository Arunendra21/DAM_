import React, { useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ShieldAlert, Laptop, Network, Server, Ban, AlertTriangle, Cpu, HelpCircle, Activity } from 'lucide-react';
import { useNtaStore } from '../../store/useNtaStore';
import WidgetCard from '../../components/dashboard/WidgetCard';
import CustomizeWidgetModal from '../../components/dashboard/CustomizeWidgetModal';
import AlertDetailModal from '../../components/dashboard/AlertDetailModal';

export const NtaTerminalMonitor: React.FC = () => {
  const {
    widgets,
    alerts,
    deviceStatuses,
    suspiciousActivities,
    bannedCommunications,
    laptopTrafficHistory,
    tickNta,
    setCustomizingWidgetId,
    setShowCustomizeModal,
    setActiveInspectAlert,
    setShowInspectModal
  } = useNtaStore();

  // Tick the NTA store periodically (every 1.8 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      tickNta();
    }, 1800);
    return () => clearInterval(timer);
  }, [tickNta]);

  const handleCustomizeClick = (id: string) => {
    setCustomizingWidgetId(id);
    setShowCustomizeModal(true);
  };

  const handleAlertTitleClick = (alertSignature: string) => {
    const matchedAlert = alerts.find(a => a.signature === alertSignature);
    if (matchedAlert) {
      setActiveInspectAlert(matchedAlert);
      setShowInspectModal(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HUD Top customizable section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* CARD 1: NTA Alerts */}
        <WidgetCard
          id="nta-alerts"
          title={widgets['nta-alerts'].name}
          description={widgets['nta-alerts'].description}
          showDescription={widgets['nta-alerts'].showDescription}
          onCustomize={() => handleCustomizeClick('nta-alerts')}
        >
          <div className="flex items-center justify-between mt-3">
            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 text-rose-400">
              <ShieldAlert size={22} className="animate-pulse" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Active rule alarms</span>
              <span className="text-3xl font-orbitron font-extrabold text-rose-500 text-glow-rose">
                {widgets['nta-alerts'].alertCount}
              </span>
            </div>
          </div>
          {widgets['nta-alerts'].showEndpoints && (
            <div className="mt-4 border-t border-slate-900/60 pt-2 flex justify-between text-[10px] font-mono text-slate-500">
              <span>Rule target ID:</span>
              <span className="text-slate-300 font-bold">{widgets['nta-alerts'].signatureId}</span>
            </div>
          )}
        </WidgetCard>

        {/* CARD 2: Multiple IP Assigned (Clickable Signature Title!) */}
        <WidgetCard
          id="multiple-ip"
          title={widgets['multiple-ip'].name}
          description={widgets['multiple-ip'].description}
          showDescription={widgets['multiple-ip'].showDescription}
          onCustomize={() => handleCustomizeClick('multiple-ip')}
        >
          <div className="flex items-center justify-between mt-3">
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-900/30 text-cyber-purple">
              <AlertTriangle size={22} className="animate-bounce" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">IP Conflict logs</span>
              <span className="text-3xl font-orbitron font-extrabold text-cyber-purple text-glow-purple">
                {widgets['multiple-ip'].alertCount}
              </span>
            </div>
          </div>
          
          <div className="mt-4 border-t border-slate-900/60 pt-2 flex flex-col gap-1 text-[10px] font-mono">
            <div className="flex justify-between text-slate-500">
              <span>Trigger keyword:</span>
              <span className="text-slate-300 font-bold">{widgets['multiple-ip'].filter}</span>
            </div>
            {/* Clickable signature element! */}
            <div className="flex items-center justify-between bg-purple-950/10 border border-purple-900/20 rounded p-1.5 mt-1 hover:border-cyber-purple transition cursor-pointer"
                 onClick={() => handleAlertTitleClick('MULTIPLE-IP-ASSIGNED')}>
              <span className="text-[9px] font-bold text-cyber-purple uppercase tracking-wider">Inspect Alert:</span>
              <span className="text-[9px] font-extrabold text-slate-200 underline">MULTIPLE-IP-ASSIGNED &rarr;</span>
            </div>
          </div>
        </WidgetCard>

        {/* CARD 3: Total Terminals */}
        <WidgetCard
          id="total-terminals"
          title={widgets['total-terminals'].name}
          description={widgets['total-terminals'].description}
          showDescription={widgets['total-terminals'].showDescription}
          onCustomize={() => handleCustomizeClick('total-terminals')}
        >
          <div className="flex items-center justify-between mt-3">
            <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-900/30 text-cyber-blue">
              <Laptop size={22} />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Monitored units</span>
              <span className="text-3xl font-orbitron font-extrabold text-cyber-blue text-glow-blue">
                {widgets['total-terminals'].topcount}
              </span>
            </div>
          </div>
          {widgets['total-terminals'].showEndpoints && (
            <div className="mt-4 border-t border-slate-900/60 pt-2 flex justify-between text-[10px] font-mono text-slate-500">
              <span>Active sensors:</span>
              <span className="text-slate-300 font-bold">{deviceStatuses.filter(d => d.status === 'active').length} Nodes</span>
            </div>
          )}
        </WidgetCard>

        {/* CARD 4: Laptop Terminal Traffic */}
        <WidgetCard
          id="laptop-traffic"
          title={widgets['laptop-traffic'].name}
          description={widgets['laptop-traffic'].description}
          showDescription={widgets['laptop-traffic'].showDescription}
          onCustomize={() => handleCustomizeClick('laptop-traffic')}
        >
          <div className="h-[55px] w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={laptopTrafficHistory} margin={{ top: 2, right: 2, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRx" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#040814', border: '1px solid #1e293b', fontSize: '9px', fontFamily: 'monospace' }} />
                <Area type="monotone" dataKey="rx" name="Download" stroke="#00f0ff" fill="url(#colorRx)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {widgets['laptop-traffic'].showEndpoints && (
            <div className="mt-2 border-t border-slate-900/60 pt-1.5 flex justify-between text-[10px] font-mono text-slate-500">
              <span>Router Zone:</span>
              <span className="text-slate-300 font-bold">{widgets['laptop-traffic'].alertGroup}</span>
            </div>
          )}
        </WidgetCard>

      </div>

      {/* LOWER MULTI-PANEL DIAGNOSTICS GRIDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (lg:7): Alert Feeds & IP Assigned logs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Panel 1: Multiple IP Assigned Detailed Feed */}
          <div className="cyber-glass rounded-xl border border-slate-900/80 p-5">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
              <Activity className="text-cyber-purple" size={16} />
              <h4 className="font-orbitron font-bold text-[10px] text-slate-200 uppercase tracking-widest">
                Multiple IP Assigned Detailed Feed
              </h4>
            </div>

            <div className="space-y-3 font-mono text-[11px]">
              {alerts.filter(a => a.signature === 'MULTIPLE-IP-ASSIGNED').map(alert => (
                <div key={alert.id} className="border border-slate-900 bg-slate-950/35 p-3.5 rounded flex flex-col gap-2 relative group hover:border-cyber-purple/50 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-purple font-bold uppercase tracking-wider">{alert.signature}</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950/20 border border-rose-900/30 text-rose-400 text-[9px] font-bold">
                      {alert.priority}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-normal">{alert.description}</p>
                  
                  <div className="flex items-center justify-between text-[9px] text-slate-500 pt-2 border-t border-slate-900/60">
                    <span>Source Node IP: <b className="text-slate-300">{alert.sourceIp}</b></span>
                    <span>Sensor Probe: <b className="text-slate-300">{alert.probe}</b></span>
                    <span>Time: <b className="text-slate-300">{alert.time}</b></span>
                  </div>

                  <button
                    onClick={() => handleAlertTitleClick(alert.signature)}
                    className="absolute right-3.5 top-3.5 px-2 py-0.5 bg-purple-950/20 border border-purple-900 text-cyber-purple rounded text-[9px] opacity-0 group-hover:opacity-100 transition cursor-pointer"
                  >
                    INSPECT DETAILS
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Recent Alerts Feed */}
          <div className="cyber-glass rounded-xl border border-slate-900/80 p-5">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
              <ShieldAlert className="text-rose-400" size={16} />
              <h4 className="font-orbitron font-bold text-[10px] text-slate-200 uppercase tracking-widest">
                Recent Rule Alarms Queue
              </h4>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 uppercase pb-2">
                    <th className="pb-2">Signature</th>
                    <th className="pb-2">Source IP</th>
                    <th className="pb-2">Classification</th>
                    <th className="pb-2 text-right">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-300">
                  {alerts.slice(0, 4).map(alert => (
                    <tr key={alert.id} className="hover:bg-slate-900/20 transition cursor-pointer" onClick={() => handleAlertTitleClick(alert.signature)}>
                      <td className="py-2.5 font-bold text-slate-200 truncate max-w-[150px]">{alert.signature}</td>
                      <td className="py-2.5 text-cyber-blue font-semibold">{alert.sourceIp}</td>
                      <td className="py-2.5 text-slate-400">{alert.classification}</td>
                      <td className="py-2.5 text-right">
                        <span className={`text-[9px] font-bold uppercase ${
                          alert.priority === 'critical' ? 'text-rose-400' : 'text-orange-400'
                        }`}>
                          {alert.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (lg:5): Banned, Suspicious Activity, Device status */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Panel 3: List of Banned Communications */}
          <div className="cyber-glass rounded-xl border border-slate-900/80 p-5">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
              <Ban className="text-rose-400" size={16} />
              <h4 className="font-orbitron font-bold text-[10px] text-slate-200 uppercase tracking-widest">
                NOC Blacklisted Communications
              </h4>
            </div>

            <div className="space-y-3 font-mono text-[10px]">
              {bannedCommunications.map(ban => (
                <div key={ban.id} className="p-3 border border-slate-900 bg-slate-950/20 rounded flex items-center justify-between">
                  <div className="min-w-0 pr-4">
                    <span className="text-rose-400 font-bold block">{ban.ip}</span>
                    <span className="text-slate-500 block truncate">{ban.reason}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-950/20 border border-rose-900/40 text-rose-400 text-[9px] font-bold flex-shrink-0">
                    BLOCKED
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 4: Suspicious Terminal Activity */}
          <div className="cyber-glass rounded-xl border border-slate-900/80 p-5">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
              <AlertTriangle className="text-cyber-yellow" size={16} />
              <h4 className="font-orbitron font-bold text-[10px] text-slate-200 uppercase tracking-widest">
                Suspicious Terminal Activity Logs
              </h4>
            </div>

            <div className="space-y-3 font-mono text-[10px] text-slate-300">
              {suspiciousActivities.slice(0, 3).map(activity => (
                <div key={activity.id} className="border border-slate-900 bg-slate-950/25 p-2.5 rounded flex items-start gap-2.5">
                  <Cpu size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-200 truncate">{activity.terminalName}</span>
                      <span className="text-slate-500 text-[8px]">{activity.time}</span>
                    </div>
                    <p className="text-slate-400 mt-1 truncate">{activity.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 5: Device Communication Status */}
          <div className="cyber-glass rounded-xl border border-slate-900/80 p-5">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
              <Server className="text-cyber-blue" size={16} />
              <h4 className="font-orbitron font-bold text-[10px] text-slate-200 uppercase tracking-widest">
                Device Communication Status
              </h4>
            </div>

            <div className="space-y-3 font-mono text-[10px]">
              {deviceStatuses.map(dev => (
                <div key={dev.id} className="flex items-center justify-between p-2 hover:bg-slate-900/20 rounded transition">
                  <div className="min-w-0 pr-4">
                    <span className="font-bold text-slate-200 block truncate">{dev.terminalName}</span>
                    <span className="text-slate-500 block">{dev.ip} // load: {dev.load}%</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                      dev.status === 'active' 
                        ? 'bg-emerald-950/20 border border-emerald-800 text-emerald-400'
                        : dev.status === 'compromised'
                        ? 'bg-rose-950/20 border border-rose-800 text-rose-400 animate-pulse'
                        : 'bg-slate-950/20 border border-slate-800 text-slate-500'
                    }`}>
                      {dev.status}
                    </span>
                    <span className="text-slate-400 block text-[9px] mt-1 font-bold">{dev.rxtx}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modal containers */}
      <CustomizeWidgetModal />
      <AlertDetailModal />

    </div>
  );
};
export default NtaTerminalMonitor;
