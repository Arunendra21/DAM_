import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Cpu, Eye, FileText, CheckCircle2, AlertOctagon } from 'lucide-react';
import { useNtaStore } from '../../store/useNtaStore';

export const AlertDetailModal: React.FC = () => {
  const {
    activeInspectAlert,
    showInspectModal,
    setShowInspectModal,
    acknowledgeAlert,
    mitigateAlert
  } = useNtaStore();

  const [isPulling, setIsPulling] = useState(false);
  const [pullMessage, setPullMessage] = useState<string | null>(null);

  if (!showInspectModal || !activeInspectAlert) return null;

  const handlePullPackets = () => {
    setIsPulling(true);
    setPullMessage(null);
    setTimeout(() => {
      setIsPulling(false);
      setPullMessage('SUCCESS: 12 Ethernet frames retrieved from buffer ring. Decoded successfully.');
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020409]/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          className="w-full max-w-4xl bg-[#040814] border border-cyan-950/60 rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col max-h-[90vh] font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900/60 bg-slate-950/40">
            <div className="flex items-center gap-2.5 text-rose-400">
              <ShieldAlert size={18} className="animate-pulse" />
              <h3 className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider uppercase">
                DETAILED SECURITY THREAT INSPECTION // {activeInspectAlert.signature}
              </h3>
            </div>
            <button
              onClick={() => {
                setShowInspectModal(false);
                setPullMessage(null);
              }}
              className="p-1 rounded text-slate-500 hover:text-slate-200 transition hover:bg-slate-900/40 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Double-Panel Content */}
          <div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Side: Details Table */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="font-orbitron font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-900 pb-1">
                Telemetry Diagnostics Report
              </h4>
              
              <div className="overflow-x-auto border border-slate-900 rounded bg-slate-950/20">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <tbody className="divide-y divide-slate-900/60 text-slate-300">
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase w-1/3">Alert ID</td>
                      <td className="py-2.5 px-3 text-slate-200">{activeInspectAlert.alertId}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Sensor Node</td>
                      <td className="py-2.5 px-3 text-slate-200">{activeInspectAlert.sensorId}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Timestamp</td>
                      <td className="py-2.5 px-3 text-slate-200">{activeInspectAlert.time}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition text-rose-300">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Source IP / Port</td>
                      <td className="py-2.5 px-3 font-bold">{activeInspectAlert.sourceIp} : {activeInspectAlert.sourcePort}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition text-cyber-blue">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Dest IP / Port</td>
                      <td className="py-2.5 px-3 font-bold">{activeInspectAlert.destinationIp} : {activeInspectAlert.destinationPort}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Probe Sniffer</td>
                      <td className="py-2.5 px-3 text-slate-400">{activeInspectAlert.probe}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Classification</td>
                      <td className="py-2.5 px-3 text-cyber-purple font-bold">{activeInspectAlert.classification}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Priority</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                          activeInspectAlert.priority === 'critical' 
                            ? 'bg-rose-950/20 border border-rose-600 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.15)]'
                            : 'bg-orange-950/20 border border-orange-600 text-orange-300'
                        }`}>
                          {activeInspectAlert.priority}
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Signature Group</td>
                      <td className="py-2.5 px-3 text-slate-200">{activeInspectAlert.signature}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Rule Description</td>
                      <td className="py-2.5 px-3 text-slate-400 leading-normal">{activeInspectAlert.description}</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 transition">
                      <td className="py-2.5 px-3 text-slate-500 font-bold uppercase">Acknowledge State</td>
                      <td className="py-2.5 px-3">
                        <span className={`font-bold ${activeInspectAlert.acknowledged ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {activeInspectAlert.acknowledged ? 'ACKNOWLEDGED' : 'PENDING TRIAGE'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side: Security Actions Panel */}
            <div className="lg:col-span-5 space-y-4 border-l border-slate-900/80 pl-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="font-orbitron font-bold text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-900 pb-1 flex items-center justify-between">
                  <span>Mitigation Actions</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                </h4>

                <p className="font-mono text-[10px] text-slate-500 leading-relaxed">
                  Trisul-style automated mitigation controls allows operators to command local routers to pull raw packets or drop the offending threat stream.
                </p>

                {/* Pull Packets Buffer */}
                <div className="bg-[#02050c] border border-slate-800 rounded p-4 relative overflow-hidden font-mono text-[11px]">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Ring Packet buffer</span>
                    <button
                      onClick={handlePullPackets}
                      disabled={isPulling}
                      className="px-2.5 py-1 bg-cyan-950/20 border border-cyber-blue hover:bg-cyber-blue/20 text-cyber-blue rounded text-[9px] font-bold uppercase cursor-pointer"
                    >
                      {isPulling ? 'RETRIEVING...' : 'PULL PACKETS'}
                    </button>
                  </div>
                  {isPulling && (
                    <div className="w-full bg-[#050814] h-1.5 rounded overflow-hidden border border-slate-800 animate-pulse">
                      <div className="bg-cyber-blue h-full animate-progress" style={{ width: '60%' }} />
                    </div>
                  )}
                  {pullMessage && (
                    <div className="text-[10px] text-emerald-400 font-bold leading-relaxed border-t border-slate-900/60 pt-2.5 flex items-start gap-1.5 mt-2">
                      <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" />
                      <span>{pullMessage}</span>
                    </div>
                  )}
                </div>

                {/* Main mitigations */}
                <div className="space-y-2 pt-2">
                  
                  <button
                    onClick={() => {
                      acknowledgeAlert(activeInspectAlert.id);
                    }}
                    disabled={activeInspectAlert.acknowledged}
                    className="w-full py-2.5 bg-cyan-950/20 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/20 transition rounded font-orbitron font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 size={13} />
                    <span>Acknowledge Threat Alarm</span>
                  </button>

                  <button
                    onClick={() => {
                      mitigateAlert(activeInspectAlert.id);
                      setShowInspectModal(false);
                    }}
                    className="w-full py-2.5 bg-rose-950/20 border border-rose-600 text-rose-300 hover:bg-rose-900/20 transition rounded font-orbitron font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <AlertOctagon size={13} className="text-rose-500" />
                    <span>NEUTRALIZE COMMUNICATOR</span>
                  </button>

                </div>
              </div>

              {/* Console log */}
              <div className="bg-[#02050c] border border-slate-900 rounded p-3 font-mono text-[9px] text-slate-500 space-y-1 mt-auto">
                <p className="text-cyber-blue font-bold">SNIFFER STATUS:</p>
                <p>✔ Core bypass checks: OK</p>
                <p>✔ Active keys signature: validated</p>
                <p>✔ Decoupled capture stream: active</p>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default AlertDetailModal;
