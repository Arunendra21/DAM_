import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Activity, Lock, Terminal, Radio, Network } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleExploreClick = () => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-slate-200 relative overflow-hidden flex flex-col justify-between font-sans">
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b1329_1px,transparent_1px),linear-gradient(to_bottom,#0b1329_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
      
      {/* Blinking Scanning Lines Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent w-full h-[300%] -top-[100%] animate-scanline pointer-events-none" />

      {/* Floating Animated Packet Nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute w-2 h-2 rounded-full bg-cyber-blue"
            style={{
              left: `${Math.random() * 85 + 5}%`,
              top: `${Math.random() * 85 + 5}%`,
              boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff'
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Header bar */}
      <header className="px-6 h-20 border-b border-slate-900/60 bg-slate-950/20 flex items-center justify-between z-10 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyber-purple to-cyber-blue flex items-center justify-center border border-cyber-blue/30 shadow-[0_0_10px_rgba(0,240,255,0.25)]">
            <Shield className="text-slate-100 animate-pulse" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-extrabold text-sm text-slate-100 tracking-wider">D-CIPHERS</span>
            <span className="font-mono text-[9px] text-cyber-blue tracking-widest uppercase">NOC CENTRAL GATEWAY</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          {!user ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-1.5 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/30 text-slate-300 rounded transition cursor-pointer"
              >
                LOGIN
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-1.5 bg-cyber-blue/10 border border-cyber-blue text-cyber-blue font-bold rounded hover:bg-cyber-blue/20 transition cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.1)]"
              >
                SIGN UP
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="px-4 py-1.5 bg-cyan-950/20 border border-cyber-blue text-cyber-blue rounded font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>ACCESSING CONSOLE</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12 z-10 my-auto">
        
        {/* Left Side Texts */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0a142c] border border-cyan-950 text-cyber-blue font-mono text-[10px] uppercase font-bold tracking-widest">
            <Radio size={12} className="animate-pulse" /> Live Telemetry Feed Online
          </div>

          <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl text-slate-100 leading-tight uppercase tracking-tight">
            Realtime Network <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-cyan-400 to-cyber-purple text-glow-blue">
              Intelligence Platform
            </span>
          </h1>

          <p className="font-mono text-sm text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Enterprise-grade cyber operations & packets monitors dashboard inspired by Wireshark, Splunk, and Cisco SOC platforms. Full-packet sniffing matrices for mission-critical gateway analytics.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={handleExploreClick}
              className="px-6 py-3.5 bg-gradient-to-r from-cyber-blue to-cyan-500 text-[#02050a] font-orbitron font-bold text-xs tracking-widest rounded shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transform hover:-translate-y-0.5 transition duration-300 uppercase cursor-pointer"
            >
              Explore Dashboard
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-3.5 bg-[#070c18]/80 border border-slate-800 hover:border-slate-700 text-slate-300 font-orbitron font-bold text-xs tracking-widest rounded hover:bg-slate-900/40 transition duration-300 uppercase cursor-pointer"
            >
              Sign Up Operator
            </button>
          </div>

          {/* Live mock metrics cards */}
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t border-slate-900/60 font-mono">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Telemetry Rate</span>
              <span className="text-lg font-bold text-cyber-blue">845,901 p/s</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Global Nodes</span>
              <span className="text-lg font-bold text-cyber-purple">12 datacenters</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Threat Index</span>
              <span className="text-lg font-bold text-rose-500 text-glow-pink">0.001% drops</span>
            </div>
          </div>

        </div>

        {/* Right Side Glass Mockup Preview */}
        <div className="flex-1 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cyber-glass rounded-xl border border-slate-800/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Window title bar mockup */}
            <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">SECURE_MONITOR // PREVIEW</span>
            </div>

            {/* Dashboard Mock items */}
            <div className="space-y-4 font-mono text-[10px]">
              
              <div className="bg-[#03060c] border border-slate-900 rounded p-3 space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>PACKETS ANALYZED</span>
                  <span className="text-emerald-400 font-bold">100% ONLINE</span>
                </div>
                <div className="text-xl font-bold font-orbitron text-slate-200 tracking-wider">
                  48,905,251
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#03060c] border border-slate-900 rounded p-2.5 space-y-1">
                  <span className="text-slate-500 block">BANDWIDTH LOAD</span>
                  <span className="text-xs font-bold text-cyber-blue">892.4 Mbps</span>
                </div>
                <div className="bg-[#03060c] border border-slate-900 rounded p-2.5 space-y-1">
                  <span className="text-slate-500 block">THREAT INCIDENTS</span>
                  <span className="text-xs font-bold text-rose-500 animate-pulse">0 ACTIVE</span>
                </div>
              </div>

              {/* Mock code scanner block */}
              <div className="bg-[#010408]/90 border border-slate-900 rounded p-3 space-y-1 text-slate-400 text-[8px] leading-relaxed">
                <p className="text-cyber-green font-bold">[info] Sniffing socket interface eth0...</p>
                <p>13:10:42 DNS request resolved for query txt: tracker-io</p>
                <p className="text-rose-400">[warn] DDoS Threat pattern detected originating from 103.2.1.200</p>
                <p className="text-cyber-blue">[info] Dynamic routing rules block applied. IP blacklisted.</p>
              </div>

            </div>

          </motion.div>
        </div>

      </main>

      {/* Footer credits */}
      <footer className="h-16 px-6 border-t border-slate-900/60 bg-slate-950/20 flex items-center justify-between text-[10px] font-mono text-slate-600 z-10">
        <span>© 2026 D-CIPHERS SECURITY SYSTEMS INC.</span>
        <span>GATEWAY: DEPLOYED_SECURE</span>
      </footer>

    </div>
  );
};
export default Landing;
