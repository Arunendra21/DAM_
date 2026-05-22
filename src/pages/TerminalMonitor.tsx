import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ShieldAlert, Cpu, AlertOctagon, HelpCircle } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { useLiveUpdates } from '../hooks/useLiveUpdates';

interface LogLine {
  text: string;
  type: 'info' | 'error' | 'success' | 'warn' | 'input';
}

export const TerminalMonitor: React.FC = () => {
  // Feed live ticks
  useLiveUpdates(1500);

  const { blockedIps, unblockIp, alerts, metrics } = useDashboardStore();
  const [terminalInput, setTerminalInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<LogLine[]>([
    { text: 'D-CIPHERS SECURITY TERMINAL // SECURE ACCESS LOGGED', type: 'info' },
    { text: 'SYSTEM GATEWAY STATUS: ONLINE', type: 'success' },
    { text: 'Type "help" for a list of available command operations.', type: 'info' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...consoleLogs, { text: `NOC-COMMANDER:~$ ${terminalInput}`, type: 'input' as const }];
    
    // Command evaluation
    const args = cmd.split(' ');
    const primaryCmd = args[0];

    switch (primaryCmd) {
      case 'help':
        newLogs.push(
          { text: 'Available commands:', type: 'info' },
          { text: '  status     - Show gateway operational status and basic load.', type: 'info' },
          { text: '  blacklist  - List current banned client IPs.', type: 'info' },
          { text: '  unblock <ip> - Lift banning rules from a blacklisted IP.', type: 'info' },
          { text: '  scan <ip>  - Run deep heuristic scan on internal/external node.', type: 'info' },
          { text: '  clear      - Clear the console scroll history.', type: 'info' },
          { text: '  alerts     - Display high-severity alert summary.', type: 'info' }
        );
        break;
      
      case 'status':
        newLogs.push(
          { text: `SYSTEM STATUS: NORMAL`, type: 'success' },
          { text: `BANDWIDTH LOAD: IN: ${metrics.networkIn} Mbps // OUT: ${metrics.networkOut} Mbps`, type: 'info' },
          { text: `CPU THREAD TEMPERATURE: 42.5°C // ALL CORES NOMINAL`, type: 'info' },
          { text: `PACKET DROPS: ${metrics.packetDropRate}%`, type: 'info' }
        );
        break;

      case 'blacklist':
        if (blockedIps.length === 0) {
          newLogs.push({ text: 'Firewall blacklist is empty. No blocked nodes.', type: 'success' });
        } else {
          newLogs.push({ text: 'Active Firewall Blacklist:', type: 'info' });
          blockedIps.forEach(ip => {
            newLogs.push({ text: `  - IP: ${ip} [RULE: DEVIANT_FLOW_DROP]`, type: 'warn' });
          });
        }
        break;

      case 'unblock':
        const targetIp = args[1];
        if (!targetIp) {
          newLogs.push({ text: 'Error: Please specify target IP. Example: "unblock 8.8.8.8"', type: 'error' });
        } else if (!blockedIps.includes(targetIp)) {
          newLogs.push({ text: `Error: IP ${targetIp} is not blacklisted.`, type: 'error' });
        } else {
          unblockIp(targetIp);
          newLogs.push({ text: `Success: IP ${targetIp} unblocked. Rule removed from routing tables.`, type: 'success' });
        }
        break;

      case 'scan':
        const scanIp = args[1];
        if (!scanIp) {
          newLogs.push({ text: 'Error: Please specify IP. Example: "scan 10.0.1.12"', type: 'error' });
        } else {
          newLogs.push({ text: `Initiating heuristic scanner on ${scanIp}...`, type: 'info' });
          newLogs.push({ text: '  [+] Querying MAC Address resolution: RESOLVED', type: 'info' });
          newLogs.push({ text: '  [+] Port inspection: 5 open ports registered.', type: 'info' });
          newLogs.push({ text: `  [+] Threat state: CLEAN. No malware beacons detected on ${scanIp}.`, type: 'success' });
        }
        break;

      case 'alerts':
        const activeAlerts = alerts.filter(a => a.status === 'active');
        if (activeAlerts.length === 0) {
          newLogs.push({ text: 'No active threat alerts in buffer.', type: 'success' });
        } else {
          newLogs.push({ text: `Active threat queue: ${activeAlerts.length} items.`, type: 'info' });
          activeAlerts.forEach(a => {
            newLogs.push({ text: `  [${a.severity.toUpperCase()}] ${a.title} (Source: ${a.sourceIp})`, type: a.severity === 'critical' ? 'error' : 'warn' });
          });
        }
        break;

      case 'clear':
        setConsoleLogs([]);
        setTerminalInput('');
        return;

      default:
        newLogs.push({ text: `Command not found: "${primaryCmd}". Type "help" for a list of operations.`, type: 'error' });
        break;
    }

    setConsoleLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* HUD Info Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        <div className="cyber-glass rounded-lg border border-slate-900 p-4 flex items-center gap-3.5 border-l-2 border-l-rose-500 bg-rose-950/5">
          <AlertOctagon className="text-rose-500 animate-pulse" size={20} />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 uppercase block">Active Firewall Rules</span>
            <span className="text-sm font-bold text-slate-200">{blockedIps.length} PACKET DROP TARGETS</span>
          </div>
        </div>

        <div className="cyber-glass rounded-lg border border-slate-900 p-4 flex items-center gap-3.5 border-l-2 border-l-cyan-500 bg-cyan-950/5">
          <Cpu className="text-cyber-blue" size={20} />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 uppercase block">Terminal Daemon PID</span>
            <span className="text-sm font-bold text-slate-200">#15201 (SHELL_ACTIVE)</span>
          </div>
        </div>

        <div className="cyber-glass rounded-lg border border-slate-900 p-4 flex items-center gap-3.5 border-l-2 border-l-cyber-yellow bg-yellow-950/5">
          <HelpCircle className="text-cyber-yellow" size={20} />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 uppercase block">CLI Manual Link</span>
            <span className="text-sm font-bold text-slate-200">TYPE "HELP" IN PROMPT</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Shell Panel */}
      <div className="cyber-glass rounded-lg border border-slate-900 flex flex-col h-[360px] overflow-hidden">
        
        {/* Terminal Header */}
        <div className="px-4 py-2 border-b border-slate-900 bg-slate-950/40 flex items-center gap-2 flex-shrink-0">
          <Terminal size={14} className="text-cyber-blue" />
          <span className="font-orbitron font-bold text-xs text-slate-200 tracking-wider">COMMANDER_SHELL_LINK</span>
        </div>

        {/* Scroll Output */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#02050c]/90 font-cyber text-xs space-y-1.5 scrollbar-thin">
          {consoleLogs.map((log, index) => {
            let color = 'text-slate-300';
            if (log.type === 'error') color = 'text-rose-400 font-bold';
            if (log.type === 'success') color = 'text-emerald-400 font-bold';
            if (log.type === 'warn') color = 'text-orange-400';
            if (log.type === 'input') color = 'text-cyber-blue font-bold';
            return (
              <div key={index} className={`whitespace-pre-wrap leading-relaxed ${color}`}>
                {log.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleCommandSubmit} className="flex border-t border-slate-900 bg-slate-950/60 flex-shrink-0">
          <span className="font-mono text-xs text-cyber-blue font-bold py-3 pl-4 pr-1.5 select-none">
            NOC-COMMANDER:~$
          </span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Enter NOC command terminal operations..."
            className="flex-1 bg-transparent py-3 px-1 font-cyber text-xs text-slate-100 border-none outline-none focus:ring-0 placeholder-slate-700"
          />
        </form>

      </div>

      {/* Suspicious Communications & Blacklist table */}
      <div className="cyber-glass rounded-lg border border-slate-900 p-4">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-3">
          <h4 className="font-orbitron font-bold text-xs text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldAlert size={14} /> Active Banned Communications Firewall Registry
          </h4>
          <span className="font-mono text-[9px] text-slate-500">DYNAMIC DROPS ACTIVE</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase">
                <th className="pb-2 pl-3">Banned Node IP</th>
                <th className="pb-2">Firewall Rule ID</th>
                <th className="pb-2">Threat Vector Category</th>
                <th className="pb-2 text-right">Packets Blocked</th>
                <th className="pb-2">Banning Action Status</th>
                <th className="pb-2 text-right">Release Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 font-mono text-xs text-slate-300">
              {blockedIps.map((ip, idx) => (
                <tr key={ip} className="hover:bg-slate-900/30 transition">
                  <td className="py-2.5 pl-3 text-rose-300 font-semibold">{ip}</td>
                  <td className="py-2.5 text-slate-400">FW_RULE_00{idx + 1}</td>
                  <td className="py-2.5 text-slate-400">{idx % 2 === 0 ? 'Exfiltration' : 'DDoS Threat Stream'}</td>
                  <td className="py-2.5 text-right text-rose-400 font-bold">{(idx + 1) * 3524} pkts</td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded uppercase">
                      Rule Blocked
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => unblockIp(ip)}
                      className="px-2 py-0.5 border border-slate-800 hover:border-cyber-blue bg-slate-950 text-slate-400 hover:text-cyber-blue rounded text-[9px] font-bold uppercase transition"
                    >
                      Release
                    </button>
                  </td>
                </tr>
              ))}
              {blockedIps.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-slate-600 text-center py-6">
                    No blacklisted nodes registered in active firewalls.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
export default TerminalMonitor;
