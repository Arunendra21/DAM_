import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, ShieldAlert as AlertIcon, Eye, Trash2, ShieldX, RefreshCw, AlertTriangle } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { useLiveUpdates } from '../hooks/useLiveUpdates';
import StatusBadge from '../components/StatusBadge';

export const AlertsDashboard: React.FC = () => {
  // Feed live telemetry simulation
  useLiveUpdates(1500);

  const { alerts, triageAlert, mitigateAlert, blockIp, blockedIps } = useDashboardStore();
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(a => {
    return severityFilter === 'ALL' || a.severity === severityFilter.toLowerCase();
  });

  const getSeverityProgressColor = (sev: string) => {
    switch (sev) {
      case 'critical': return 'bg-rose-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-amber-500';
      default: return 'bg-cyan-500';
    }
  };

  // Stats calculation
  const totalAlerts = alerts.length;
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const highCount = activeAlerts.filter(a => a.severity === 'high').length;
  const mediumCount = activeAlerts.filter(a => a.severity === 'medium').length;
  const lowCount = activeAlerts.filter(a => a.severity === 'low').length;
  
  const mitigatedCount = alerts.filter(a => a.status === 'mitigated').length;

  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="cyber-glass rounded-lg p-4 flex flex-col justify-center border-l-2 border-rose-500">
          <span className="font-mono text-[10px] text-slate-500 uppercase">Critical Threats</span>
          <span className="font-orbitron font-extrabold text-2xl text-rose-500 text-glow-pink mt-1">{criticalCount}</span>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex flex-col justify-center border-l-2 border-orange-500">
          <span className="font-mono text-[10px] text-slate-500 uppercase">High Threats</span>
          <span className="font-orbitron font-extrabold text-2xl text-orange-500 text-glow-yellow mt-1">{highCount}</span>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex flex-col justify-center border-l-2 border-amber-500">
          <span className="font-mono text-[10px] text-slate-500 uppercase">Medium Threats</span>
          <span className="font-orbitron font-extrabold text-2xl text-amber-500 mt-1">{mediumCount}</span>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex flex-col justify-center border-l-2 border-cyan-500">
          <span className="font-mono text-[10px] text-slate-500 uppercase">Low Threats</span>
          <span className="font-orbitron font-extrabold text-2xl text-cyan-400 text-glow-blue mt-1">{lowCount}</span>
        </div>

        <div className="cyber-glass rounded-lg p-4 flex flex-col justify-center border-l-2 border-emerald-500 col-span-2 lg:col-span-1">
          <span className="font-mono text-[10px] text-slate-500 uppercase">Mitigated Incidents</span>
          <span className="font-orbitron font-extrabold text-2xl text-emerald-400 text-glow-green mt-1">{mitigatedCount}</span>
        </div>

      </div>

      {/* Action Filters Panel */}
      <div className="flex items-center justify-between bg-[#050914] p-4 border border-slate-900 rounded-lg cyber-glass">
        
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-xs text-slate-500 mr-2 uppercase">Filter Severity:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 font-mono text-[10px] font-bold rounded border uppercase transition ${
                severityFilter === sev
                  ? 'bg-cyber-blue/10 border-cyber-blue text-cyber-blue text-glow-blue'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="font-mono text-[10px] text-slate-500">
          BLOCKED CLIENTS: <span className="text-rose-400 font-bold">{blockedIps.length}</span>
        </div>

      </div>

      {/* Alerts Feed Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Feed (left 2 columns) */}
        <div className="xl:col-span-2 space-y-4">
          
          {filteredAlerts.length === 0 ? (
            <div className="cyber-glass rounded-lg p-8 border border-slate-900 text-center font-mono text-slate-500 text-xs">
              No active security incidents matching severity filter.
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`cyber-glass rounded-lg border p-4 flex flex-col md:flex-row gap-4 justify-between transition-all duration-300 ${
                  alert.status === 'mitigated'
                    ? 'border-slate-800/40 opacity-60 bg-slate-950/15'
                    : alert.severity === 'critical'
                    ? 'border-rose-900/60 shadow-[0_0_15px_rgba(239,68,68,0.06)]'
                    : 'border-slate-800'
                }`}
              >
                
                {/* Info Container */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusBadge status={alert.severity} />
                    <span className="font-mono text-[9px] text-slate-500">
                      {new Date(alert.timestamp).toISOString()}
                    </span>
                    <span className="font-mono text-[9px] bg-slate-900 border border-slate-800 px-1.5 py-0.2 rounded text-slate-400 font-bold uppercase">
                      ID: {alert.id}
                    </span>
                    {alert.status === 'mitigated' && (
                      <span className="font-mono text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-bold uppercase">
                        RESOLVED
                      </span>
                    )}
                  </div>

                  <h4 className="font-orbitron font-bold text-sm text-slate-200 tracking-wide">
                    {alert.title}
                  </h4>
                  <p className="font-mono text-xs text-slate-400 leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono text-slate-500 pt-1">
                    <div>
                      SOURCE IP: <span className="text-rose-300 font-semibold">{alert.sourceIp}</span>
                    </div>
                    <div>
                      TARGET HOST: <span className="text-cyan-400">{alert.destinationIp}</span>
                    </div>
                    <div>
                      PACKETS LOGGED: <span className="text-slate-300 font-bold">{alert.packetsCount}</span>
                    </div>
                    <div>
                      THREAT TYPE: <span className="text-slate-300">{alert.category.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Operations Actions */}
                <div className="flex md:flex-col justify-end items-end gap-2.5 flex-shrink-0 border-t md:border-t-0 md:border-l border-slate-800/60 pt-3 md:pt-0 md:pl-4">
                  {alert.status === 'active' && (
                    <>
                      <button
                        onClick={() => triageAlert(alert.id)}
                        className="px-3 py-1.5 bg-[#0a0f1d] hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyber-blue hover:border-cyber-blue/30 rounded font-mono text-[10px] font-bold uppercase transition flex items-center gap-1.5 w-full justify-center md:justify-start"
                      >
                        <CheckCircle size={12} /> Acknowledge
                      </button>
                      <button
                        onClick={() => mitigateAlert(alert.id)}
                        className="px-3 py-1.5 bg-rose-950/20 hover:bg-rose-900/30 border border-rose-900/40 hover:border-rose-500 text-rose-300 rounded font-mono text-[10px] font-bold uppercase transition flex items-center gap-1.5 w-full justify-center md:justify-start"
                      >
                        <ShieldX size={12} /> Mitigate & Block
                      </button>
                    </>
                  )}
                  {alert.status === 'triaged' && (
                    <button
                      onClick={() => mitigateAlert(alert.id)}
                      className="px-3 py-1.5 bg-rose-950/20 hover:bg-rose-900/30 border border-rose-900/40 hover:border-rose-500 text-rose-300 rounded font-mono text-[10px] font-bold uppercase transition flex items-center gap-1.5 w-full justify-center md:justify-start"
                    >
                      <ShieldX size={12} /> Resolve Attack
                    </button>
                  )}
                  {alert.status === 'mitigated' && (
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 py-1 px-2 bg-emerald-500/5 border border-emerald-500/10 rounded">
                      Threat Neutralized
                    </div>
                  )}
                </div>

              </div>
            ))
          )}

        </div>

        {/* Security Command Info Panel (right column) */}
        <div className="space-y-6">
          
          <div className="cyber-glass rounded-lg border border-slate-900 p-4">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
              Mitigation Protocol System
            </h4>
            <div className="font-mono text-xs text-slate-400 space-y-3">
              <p>
                Mitigating an incident performs the following actions:
              </p>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>Stops dynamic telemetry flow from malicious node.</li>
                <li>Appends threat source IP address to firewall blacklists.</li>
                <li>Sends notification telemetry upstream.</li>
              </ul>
              <div className="bg-[#03060b] border border-slate-900 rounded p-3 text-[10px] text-slate-500 leading-normal">
                SYSTEM CONFIG: AUTO_MITIGATE: FALSE<br />
                FIREWALL STATUS: ENGAGED // FILTER ACTIVE<br />
                BLOCKED PACKETS: {blockedIps.length * 1250} +
              </div>
            </div>
          </div>

          <div className="cyber-glass rounded-lg border border-slate-900 p-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
              <h4 className="font-orbitron font-bold text-xs text-rose-400 uppercase tracking-widest">
                Blacklisted IP Pool
              </h4>
              <span className="font-mono text-[10px] text-slate-500">{blockedIps.length} IPS</span>
            </div>
            <div className="font-mono text-xs divide-y divide-slate-900">
              {blockedIps.map(ip => (
                <div key={ip} className="py-2 flex justify-between items-center">
                  <span className="text-rose-300 font-semibold">{ip}</span>
                  <span className="text-[9px] bg-rose-500/10 border border-rose-500/20 text-rose-400 px-1.5 py-0.2 rounded font-bold uppercase">
                    BANNED
                  </span>
                </div>
              ))}
              {blockedIps.length === 0 && (
                <div className="text-slate-600 text-center py-4">No blocked IPs in current pool.</div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default AlertsDashboard;
