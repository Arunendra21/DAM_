import React, { useState } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';
import { useLiveUpdates } from '../hooks/useLiveUpdates';
import { Search, Eye, Filter, Info, Server, Network, Terminal } from 'lucide-react';
import { Packet } from '../types';
import StatusBadge from '../components/StatusBadge';

export const PacketExplorer: React.FC = () => {
  // Run live simulation to fill the packet explorer in real-time
  useLiveUpdates(1500);

  const { packets, searchQuery, setSearchQuery } = useDashboardStore();
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [protocolFilter, setProtocolFilter] = useState<string>('ALL');

  // Filter packets
  const filteredPackets = packets.filter(pkt => {
    // Protocol filter
    const matchesProto = protocolFilter === 'ALL' || pkt.protocol === protocolFilter;
    
    // Search query matches IP or payload or flags
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      pkt.sourceIp.includes(query) ||
      pkt.destinationIp.includes(query) ||
      pkt.protocol.toLowerCase().includes(query) ||
      pkt.flags.toLowerCase().includes(query) ||
      pkt.payload.toLowerCase().includes(query);

    return matchesProto && matchesSearch;
  });

  const getProtocolColor = (proto: string, status: string) => {
    if (status === 'blocked') return 'border-l-rose-500/80 bg-rose-950/5';
    if (status === 'suspicious') return 'border-l-orange-500/80 bg-orange-950/5';
    
    switch (proto) {
      case 'TCP': return 'border-l-blue-500/60 bg-blue-950/5';
      case 'UDP': return 'border-l-purple-500/60 bg-purple-950/5';
      case 'DNS': return 'border-l-cyan-500/60 bg-cyan-950/5';
      case 'ICMP': return 'border-l-amber-500/60 bg-amber-950/5';
      case 'HTTP': 
      case 'TLS': return 'border-l-emerald-500/60 bg-emerald-950/5';
      default: return 'border-l-slate-700 bg-slate-900/5';
    }
  };

  const getProtocolTextClass = (proto: string) => {
    switch (proto) {
      case 'TCP': return 'text-blue-400';
      case 'UDP': return 'text-purple-400';
      case 'DNS': return 'text-cyan-400 font-bold';
      case 'ICMP': return 'text-amber-400';
      case 'HTTP':
      case 'TLS': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Top Controls Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#050914] p-4 border border-slate-900 rounded-lg cyber-glass">
        
        {/* Protocol filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-xs text-slate-500 mr-2 flex items-center gap-1">
            <Filter size={12} /> PROTOCOL:
          </span>
          {['ALL', 'TCP', 'UDP', 'DNS', 'ICMP', 'HTTP', 'TLS'].map(proto => (
            <button
              key={proto}
              onClick={() => setProtocolFilter(proto)}
              className={`px-3 py-1 font-mono text-[10px] font-bold rounded border uppercase transition ${
                protocolFilter === proto
                  ? 'bg-cyber-blue/10 border-cyber-blue text-cyber-blue text-glow-blue'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {proto}
            </button>
          ))}
        </div>

        {/* Local Search input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter packets stream..."
            className="w-full bg-[#0a0f1d] border border-slate-800 rounded pl-9 pr-4 py-1.5 font-mono text-[11px] text-slate-200 focus:outline-none focus:border-cyber-blue placeholder-slate-600"
          />
        </div>

      </div>

      {/* Main Workspace split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Table View (left 8 columns) */}
        <div className="lg:col-span-7 flex flex-col bg-[#050914] border border-slate-900 rounded-lg overflow-hidden cyber-glass min-h-0">
          
          <div className="px-4 py-3 border-b border-slate-900 bg-slate-950/40 flex justify-between items-center flex-shrink-0">
            <span className="font-orbitron font-bold text-xs text-slate-200 tracking-wider">PACKET DISPATCH STREAM</span>
            <span className="font-mono text-[10px] text-slate-500">SHOWING {filteredPackets.length} PACKETS</span>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="sticky top-0 bg-[#050914] z-10 border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase select-none">
                <tr>
                  <th className="py-2.5 px-3 w-20">Time</th>
                  <th className="py-2.5 px-2 w-32">Source IP</th>
                  <th className="py-2.5 px-2 w-32">Dest IP</th>
                  <th className="py-2.5 px-2 w-16">Proto</th>
                  <th className="py-2.5 px-2 w-16 text-right">Port</th>
                  <th className="py-2.5 px-2 w-16 text-right">Size</th>
                  <th className="py-2.5 px-2 w-28">Flags</th>
                  <th className="py-2.5 px-2 w-10 text-center">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/50 font-mono text-[10px] text-slate-300">
                {filteredPackets.map((pkt) => (
                  <tr
                    key={pkt.id}
                    onClick={() => setSelectedPacket(pkt)}
                    className={`cursor-pointer border-l-2 transition hover:bg-slate-900/40 ${
                      getProtocolColor(pkt.protocol, pkt.status)
                    } ${selectedPacket?.id === pkt.id ? 'bg-slate-900/60 border-l-cyber-blue shadow-[inset_4px_0_12px_rgba(0,240,255,0.05)]' : ''}`}
                  >
                    <td className="py-2 px-3 text-slate-500 truncate">
                      {new Date(pkt.timestamp).toLocaleTimeString([], { hour12: false })}
                    </td>
                    <td className={`py-2 px-2 truncate ${pkt.status === 'blocked' ? 'text-rose-400 font-semibold' : 'text-slate-200'}`}>{pkt.sourceIp}</td>
                    <td className="py-2 px-2 truncate text-slate-200">{pkt.destinationIp}</td>
                    <td className={`py-2 px-2 font-bold ${getProtocolTextClass(pkt.protocol)}`}>{pkt.protocol}</td>
                    <td className="py-2 px-2 text-right text-slate-400">{pkt.port}</td>
                    <td className="py-2 px-2 text-right text-slate-400">{pkt.size} B</td>
                    <td className="py-2 px-2 text-rose-400 font-bold tracking-tight truncate">{pkt.flags || '-'}</td>
                    <td className="py-2 px-2 text-center text-slate-500">
                      <Eye size={12} className={selectedPacket?.id === pkt.id ? 'text-cyber-blue' : ''} />
                    </td>
                  </tr>
                ))}
                {filteredPackets.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                      No matching packets found in active frame buffer.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Detailed Inspection Drawer (right 5 columns) */}
        <div className="lg:col-span-5 flex flex-col bg-[#050914] border border-slate-900 rounded-lg overflow-hidden cyber-glass min-h-0">
          
          <div className="px-4 py-3 border-b border-slate-900 bg-slate-950/40 flex-shrink-0 flex items-center gap-2">
            <Info size={14} className="text-cyber-blue" />
            <span className="font-orbitron font-bold text-xs text-slate-200 tracking-wider">PACKET ANALYZER</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5 min-h-0 font-mono text-xs">
            {selectedPacket ? (
              <div className="space-y-4">
                
                {/* Meta details */}
                <div className="space-y-1.5 bg-[#03060c] p-3 border border-slate-900 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-slate-500">PACKET INDEX ID</span>
                    <span className="text-slate-300 font-bold text-[10px]">{selectedPacket.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Timestamp:</span>
                    <span className="text-slate-300">{new Date(selectedPacket.timestamp).toISOString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Packet Size:</span>
                    <span className="text-slate-300 font-bold">{selectedPacket.size} bytes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Security Tag:</span>
                    <StatusBadge status={selectedPacket.status} className="scale-90" />
                  </div>
                </div>

                {/* Protocol Stack (Wireshark-style collapsible frames) */}
                <div className="space-y-2.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Protocol Layer Stack</span>
                  
                  {/* Layer 2 */}
                  <div className="border border-slate-900 rounded bg-[#0a0f1d]/50 p-2.5">
                    <div className="flex items-center gap-2 font-bold text-slate-300">
                      <Network size={13} className="text-slate-500" />
                      <span>Layer 2 // Ethernet Frame</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 pl-5">{selectedPacket.headers.layer2}</p>
                  </div>

                  {/* Layer 3 */}
                  <div className="border border-slate-900 rounded bg-[#0a0f1d]/50 p-2.5">
                    <div className="flex items-center gap-2 font-bold text-slate-300">
                      <Server size={13} className="text-cyan-500" />
                      <span>Layer 3 // IPv4 Header</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 pl-5">{selectedPacket.headers.layer3}</p>
                  </div>

                  {/* Layer 4 */}
                  <div className="border border-slate-900 rounded bg-[#0a0f1d]/50 p-2.5">
                    <div className="flex items-center gap-2 font-bold text-slate-300">
                      <Terminal size={13} className="text-purple-400" />
                      <span>Layer 4 // {selectedPacket.protocol} Header</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 pl-5">{selectedPacket.headers.layer4}</p>
                  </div>
                </div>

                {/* Payload & Hex Details */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Decoded Hex & ASCII Payload</span>
                  <div className="bg-[#03050a] border border-slate-900 rounded p-3 overflow-x-auto">
                    <pre className="text-[9px] leading-relaxed text-slate-400 font-cyber whitespace-pre-wrap">
                      {selectedPacket.payload}
                    </pre>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 py-12">
                <Info size={28} className="opacity-40 animate-pulse text-cyber-blue" />
                <p className="text-center text-xs">
                  Select a packet from the dispatch stream<br />to inspect details and memory traces.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
export default PacketExplorer;
