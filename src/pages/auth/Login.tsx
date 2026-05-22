import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, User, Eye, EyeOff, KeyRound, Radio } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const [activePortal, setActivePortal] = useState<'user' | 'admin' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Prefill default credentials depending on which panel is loaded
  const loadPrefilled = (role: 'user' | 'admin') => {
    setActivePortal(role);
    if (role === 'admin') {
      setEmail('admin@netintel.com');
      setPassword('admin123');
    } else {
      setEmail('user@netintel.com');
      setPassword('user123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePortal) return;

    const success = await login(email, password, activePortal);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-slate-200 relative overflow-hidden flex flex-col justify-between font-sans">
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b1329_1px,transparent_1px),linear-gradient(to_bottom,#0b1329_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      
      {/* Scanning scanning line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent w-full h-[300%] -top-[100%] animate-scanline pointer-events-none" />

      {/* Top Header */}
      <header className="px-6 h-16 border-b border-slate-900/60 bg-slate-950/20 flex items-center justify-between z-10 backdrop-blur-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/landing')}>
          <Shield className="text-cyber-blue" size={16} />
          <span className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider">D-CIPHERS</span>
        </div>
        <button
          onClick={() => navigate('/signup')}
          className="font-mono text-xs text-cyber-blue hover:text-cyan-300 transition uppercase cursor-pointer"
        >
          Create Account
        </button>
      </header>

      {/* Main Login split container */}
      <main className="flex-grow flex items-center justify-center p-6 z-10 my-auto">
        <div className="w-full max-w-4xl">
          
          <AnimatePresence mode="wait">
            {!activePortal ? (
              
              /* Portal Choice Selection View */
              <motion.div
                key="portal-select"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                
                {/* Operator portal card */}
                <div
                  onClick={() => loadPrefilled('user')}
                  className="cyber-glass rounded-xl border border-slate-800/80 p-8 flex flex-col justify-between items-center text-center cursor-pointer hover:border-cyber-blue/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] group transition-all duration-500 h-[360px]"
                >
                  <div className="p-4 rounded-full bg-cyan-950/20 border border-cyan-900/40 text-cyber-blue group-hover:scale-110 transition duration-300 relative">
                    <User size={36} />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 absolute top-1 right-1 border-2 border-[#050914] animate-pulse" />
                  </div>
                  
                  <div className="space-y-2.5">
                    <h3 className="font-orbitron font-black text-lg text-slate-100 uppercase tracking-widest group-hover:text-cyber-blue transition">
                      User Access Portal
                    </h3>
                    <p className="font-mono text-xs text-slate-500 leading-normal px-2">
                      Simplified Operator node. View packets capture streams, dynamic travel maps, active hosts tables, and local settings without admin control overrides.
                    </p>
                  </div>

                  <span className="px-5 py-2.5 rounded bg-cyan-950/20 border border-cyan-900/40 text-cyber-blue font-mono text-[10px] font-bold tracking-widest uppercase transition group-hover:bg-cyber-blue group-hover:text-[#02050a] shadow-sm">
                    Enter Portal
                  </span>
                </div>

                {/* Administrator portal card */}
                <div
                  onClick={() => loadPrefilled('admin')}
                  className="cyber-glass rounded-xl border border-slate-800/80 p-8 flex flex-col justify-between items-center text-center cursor-pointer hover:border-cyber-purple/60 hover:shadow-[0_0_25px_rgba(157,78,221,0.15)] group transition-all duration-500 h-[360px]"
                >
                  <div className="p-4 rounded-full bg-purple-950/20 border border-purple-900/40 text-cyber-purple group-hover:scale-110 transition duration-300">
                    <Shield size={36} />
                  </div>
                  
                  <div className="space-y-2.5">
                    <h3 className="font-orbitron font-black text-lg text-slate-100 uppercase tracking-widest group-hover:text-cyber-purple transition">
                      Admin Control Center
                    </h3>
                    <p className="font-mono text-xs text-slate-500 leading-normal px-2">
                      Full privileged SOC/NOC master console. Core CPU process allocations, developer CLI monitors, historic replay timelines, and mitigation overrides.
                    </p>
                  </div>

                  <span className="px-5 py-2.5 rounded bg-purple-950/20 border border-purple-900/40 text-cyber-purple font-mono text-[10px] font-bold tracking-widest uppercase transition group-hover:bg-cyber-purple group-hover:text-slate-100 shadow-sm">
                    Initialize Command
                  </span>
                </div>

              </motion.div>
            ) : (
              
              /* Credentials Login Form Card */
              <motion.div
                key="portal-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className={`cyber-glass rounded-xl border p-8 max-w-md mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden ${
                  activePortal === 'admin' ? 'border-cyber-purple/40' : 'border-cyber-blue/40'
                }`}
              >
                
                {/* Back button */}
                <button
                  onClick={() => {
                    setActivePortal(null);
                    setEmail('');
                    setPassword('');
                  }}
                  className="absolute top-4 left-4 font-mono text-[9px] text-slate-500 hover:text-slate-300 uppercase tracking-wider cursor-pointer"
                >
                  &larr; Switch Portal
                </button>

                <div className="flex flex-col items-center text-center space-y-2 mb-6 mt-2">
                  <div className={`p-2.5 rounded-full border ${
                    activePortal === 'admin' 
                      ? 'bg-purple-950/20 border-purple-900/40 text-cyber-purple' 
                      : 'bg-cyan-950/20 border-cyan-900/40 text-cyber-blue'
                  }`}>
                    {activePortal === 'admin' ? <Shield size={20} /> : <User size={20} />}
                  </div>
                  <h3 className="font-orbitron font-extrabold text-sm text-slate-100 tracking-wider uppercase">
                    {activePortal === 'admin' ? 'NOC ADMINISTRATOR PORTAL' : 'OPERATOR MONITOR ACCESS'}
                  </h3>
                  <span className="font-mono text-[9px] text-slate-500">
                    SECURE SHIELD CREDENTIALS ENFORCED
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  
                  {/* Error Notification */}
                  {error && (
                    <div className="p-3 bg-rose-950/20 border border-rose-900/30 text-rose-300 rounded font-mono text-[10px] leading-relaxed">
                      {error}
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-slate-500 text-[10px] uppercase">Routing Email</label>
                    <div className="relative flex items-center">
                      <KeyRound className="absolute left-3 text-slate-600" size={14} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="operator@netintel.com"
                        className="w-full bg-[#03060b]/90 border border-slate-800 rounded pl-9 pr-4 py-2 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue placeholder-slate-700"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <label className="text-slate-500 text-[10px] uppercase">Access Keycode</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 text-slate-600" size={14} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#03060b]/90 border border-slate-800 rounded pl-9 pr-10 py-2 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue placeholder-slate-700"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-slate-600 hover:text-slate-400 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="rounded bg-[#03060b] border-slate-800 text-cyber-blue focus:ring-0 focus:ring-offset-0"
                      />
                      <span>Keep Session persisted</span>
                    </label>
                    <span className="text-slate-600 hover:text-slate-400 cursor-pointer">Recover Key</span>
                  </div>

                  {/* Submission */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2.5 font-orbitron font-bold text-xs tracking-widest rounded transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      activePortal === 'admin'
                        ? 'bg-purple-950/20 border border-cyber-purple hover:bg-cyber-purple/20 text-cyber-purple'
                        : 'bg-cyan-950/20 border border-cyber-blue hover:bg-cyber-blue/20 text-cyber-blue'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 border-t-slate-200 animate-spin" />
                        <span>ESTABLISHING LOG...</span>
                      </>
                    ) : (
                      <span>DISPATCH CONNECTIONS</span>
                    )}
                  </button>

                </form>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 px-6 border-t border-slate-900/60 bg-slate-950/20 flex items-center justify-center text-[9px] font-mono text-slate-600">
        SECURE LINK: AES-256 GCM SHIELD LINK ACTIVE
      </footer>

    </div>
  );
};
export default Login;
