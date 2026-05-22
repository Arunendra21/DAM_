import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Cpu, HardDrive, RefreshCw, LayoutList, Layers } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { useLiveUpdates } from '../hooks/useLiveUpdates';

export const SystemPerformance: React.FC = () => {
  // Feed live system simulation ticks
  useLiveUpdates(1200);

  const { metrics, systemMetricsHistory } = useDashboardStore();

  // Mock running system services
  const processList = [
    { pid: 485, name: 'packet_capture_engine', cpu: 14.5, mem: 4.2, port: 'ALL (Promiscuous)', status: 'running' },
    { pid: 512, name: 'alert_triage_daemon', cpu: 6.2, mem: 2.1, port: 'n/a', status: 'running' },
    { pid: 902, name: 'recharts_telem_bridge', cpu: 3.8, mem: 1.5, port: 3000, status: 'running' },
    { pid: 104, name: 'dns_tunnel_sniff', cpu: 2.1, mem: 0.8, port: 53, status: 'running' },
    { pid: 1402, name: 'elastic_telem_db', cpu: 8.5, mem: 18.4, port: 9200, status: 'running' },
    { pid: 1515, name: 'kibana_cyber_proxy', cpu: 4.2, mem: 8.1, port: 5601, status: 'running' },
    { pid: 2110, name: 'nginx_soc_ingress', cpu: 1.8, mem: 1.2, port: 443, status: 'running' },
    { pid: 3122, name: 'threat_signature_sync', cpu: 0.2, mem: 0.5, port: 'n/a', status: 'sleeping' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CPU Cores Monitor */}
        <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <Cpu className="text-cyber-blue" size={16} />
            <h4 className="font-orbitron font-bold text-xs text-slate-200 uppercase tracking-widest">
              CPU Multi-Core Threads
            </h4>
          </div>
          
          <div className="space-y-2.5 font-mono text-xs">
            {metrics.cpuCores.map((usage, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">CORE_THREAD_{index + 1}</span>
                  <span className={usage > 80 ? 'text-rose-400 font-bold' : 'text-slate-300'}>{usage}%</span>
                </div>
                <div className="w-full bg-[#050814] h-1.5 rounded-full overflow-hidden border border-slate-900/60">
                  <div
                    className={`h-full transition-all duration-300 ${
                      usage > 80 ? 'bg-rose-500' : 'bg-cyber-blue'
                    }`}
                    style={{ width: `${usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Memory allocation */}
        <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5 mb-3">
              <Layers className="text-cyber-purple" size={16} />
              <h4 className="font-orbitron font-bold text-xs text-slate-200 uppercase tracking-widest">
                DDR5 RAM Cache Allocations
              </h4>
            </div>
            
            <div className="space-y-4 font-mono">
              <div className="flex items-end justify-between">
                <span className="text-xs text-slate-500">USED / TOTAL PHYSICAL</span>
                <span className="text-lg font-bold text-slate-200">
                  {metrics.memoryUsed} GB / {metrics.memoryTotal} GB
                </span>
              </div>

              <div className="w-full bg-[#050814] h-3.5 rounded border border-slate-900 overflow-hidden relative flex items-center justify-center">
                <div
                  className="bg-gradient-to-r from-cyber-purple to-purple-600 h-full absolute left-0 transition-all duration-500"
                  style={{ width: `${metrics.memoryUsage}%` }}
                />
                <span className="text-[10px] font-bold text-slate-100 z-10 text-glow-blue">
                  {metrics.memoryUsage}% ALLOCATED
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#03060c] border border-slate-900 rounded p-3 text-[10px] font-mono text-slate-500 leading-normal">
            SWAP MEMORY: 4.8 GB / 16.0 GB USED<br />
            CACHE MEM: 18.5 GB (BUFFER DEFERRABLE)<br />
            JVM TELEMETRY ARCHIVE: ENGAGED
          </div>
        </div>

        {/* Disk IO / drops */}
        <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5 mb-3">
              <HardDrive className="text-cyber-yellow" size={16} />
              <h4 className="font-orbitron font-bold text-xs text-slate-200 uppercase tracking-widest">
                Disk RAID & Dropped Rates
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-center">
              <div className="bg-[#03060b] border border-slate-900 p-3 rounded flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 uppercase">DISK READ</span>
                <span className="text-xl font-bold text-cyber-yellow mt-1">{metrics.diskRead} MB/s</span>
              </div>
              <div className="bg-[#03060b] border border-slate-900 p-3 rounded flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 uppercase">DISK WRITE</span>
                <span className="text-xl font-bold text-slate-200 mt-1">{metrics.diskWrite} MB/s</span>
              </div>
            </div>
          </div>

          <div className="space-y-1 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">PACKET BUFFER DROP RATE</span>
              <span className="text-rose-400 font-bold">{metrics.packetDropRate}%</span>
            </div>
            <div className="w-full bg-[#050814] h-1.5 rounded-full overflow-hidden border border-slate-900">
              <div
                className="bg-rose-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, metrics.packetDropRate * 100)}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Historical Telemetry Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Core telemetry history */}
        <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-3">
          <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">
            CPU & RAM Historic Allocation
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemMetricsHistory} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" name="CPU Usage %" stroke="#00f0ff" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="memory" name="RAM Usage %" stroke="#9d4edd" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disk & Drops history */}
        <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-3">
          <h4 className="font-orbitron font-bold text-xs text-cyber-yellow uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">
            Disk Write & Packet Drop History
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemMetricsHistory} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                <YAxis tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                <Tooltip />
                <Line type="monotone" dataKey="diskWrite" name="Disk Write MB/s" stroke="#ffbf00" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="packetDrop" name="Packet Drops %" stroke="#ff007f" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* System Processes Inspector */}
      <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-3">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-2">
          <h4 className="font-orbitron font-bold text-xs text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
            <LayoutList size={14} /> NOC Background System Process Manager
          </h4>
          <span className="font-mono text-[9px] text-slate-500">ALL SYSTEMS OPERATIONAL</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase">
                <th className="pb-2 pl-3">PID</th>
                <th className="pb-2">Process Name</th>
                <th className="pb-2 text-right">CPU Share %</th>
                <th className="pb-2 text-right">Memory Share %</th>
                <th className="pb-2">Binding Interface / Port</th>
                <th className="pb-2">Execution State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 font-mono text-xs text-slate-300">
              {processList.map(proc => (
                <tr key={proc.pid} className="hover:bg-slate-900/30 transition">
                  <td className="py-2 pl-3 text-slate-500">#{proc.pid}</td>
                  <td className="py-2 font-bold text-slate-200">{proc.name}</td>
                  <td className="py-2 text-right text-cyber-blue font-bold">{proc.cpu}%</td>
                  <td className="py-2 text-right text-cyber-purple">{proc.mem}%</td>
                  <td className="py-2 text-slate-400">{proc.port}</td>
                  <td className="py-2">
                    <span className={`inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold rounded uppercase ${
                      proc.status === 'running'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      {proc.status}
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
};
export default SystemPerformance;
