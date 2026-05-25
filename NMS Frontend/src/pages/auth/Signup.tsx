import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Mail, Users, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Dynamic validations
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match. Integrity check failed.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Keycode too weak. Must contain at least 6 characters.');
      return;
    }

    const success = await signup({
      name,
      email,
      username,
      role,
      password
    });

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-slate-200 relative overflow-hidden flex flex-col justify-between font-sans">
      
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b1329_1px,transparent_1px),linear-gradient(to_bottom,#0b1329_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent w-full h-[300%] -top-[100%] animate-scanline pointer-events-none" />

      {/* Top Header */}
      <header className="px-6 h-16 border-b border-slate-900/60 bg-slate-950/20 flex items-center justify-between z-10 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/landing')}>
          <Shield className="text-cyber-blue" size={16} />
          <span className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider">D-CIPHERS</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="font-mono text-xs text-cyber-blue hover:text-cyan-300 transition uppercase cursor-pointer"
        >
          Have Account? Login
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center p-6 z-10 my-auto">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Illustration info */}
          <div className="lg:col-span-5 hidden lg:flex flex-col space-y-5 text-left border-r border-slate-900/80 pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0a142c] border border-cyan-950 text-cyber-blue font-mono text-[9px] uppercase font-bold tracking-widest w-fit">
              Security Protocol: Active
            </div>
            
            <h2 className="font-orbitron font-black text-2xl text-slate-100 uppercase tracking-wide leading-tight">
              Create operator profile <br />
              <span className="text-cyber-blue">in routing nodes</span>
            </h2>

            <p className="font-mono text-[11px] text-slate-500 leading-relaxed">
              Registering creates an isolated operator database account. Administrators get configuration control access, whereas Operators get read-only packet sniff charts panels.
            </p>

            <div className="bg-[#03060c] border border-slate-900 rounded p-4 font-mono text-[9px] text-slate-500 space-y-1">
              <p className="text-cyber-purple font-bold">SYSTEM CHECKS:</p>
              <p>✔ Firewall registry: active</p>
              <p>✔ Local memory backup: persistent</p>
              <p>✔ SSL handshake: enforced</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 w-full max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-glass rounded-xl border border-slate-800/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-slate-900 pb-3">
                <Users className="text-cyber-blue" size={18} />
                <h3 className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider uppercase">
                  OPERATOR ENROLLMENT FORM
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
                
                {/* Validation Notifications */}
                {(validationError || error) && (
                  <div className="p-3 bg-rose-950/20 border border-rose-900/30 text-rose-300 rounded font-mono text-[10px] leading-relaxed">
                    {validationError || error}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase">Full Operator Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 text-slate-600" size={13} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alan Turing"
                      className="w-full bg-[#03060b]/90 border border-slate-800 rounded pl-9 pr-4 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue placeholder-slate-700"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Email / Username */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-500 text-[10px] uppercase">Username</label>
                    <div className="relative flex items-center">
                      <KeyRound className="absolute left-3 text-slate-600" size={13} />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="turing_dev"
                        className="w-full bg-[#03060b]/90 border border-slate-800 rounded pl-9 pr-4 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue placeholder-slate-700"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 text-[10px] uppercase">Role Authorization</label>
                    <div className="relative flex items-center">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-full bg-[#03060b]/90 border border-slate-800 rounded px-3 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="user">Operator (User)</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase">Secure Email</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 text-slate-600" size={13} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@netintel.com"
                      className="w-full bg-[#03060b]/90 border border-slate-800 rounded pl-9 pr-4 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue placeholder-slate-700"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password / Confirm */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-500 text-[10px] uppercase">Access Keycode</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 text-slate-600" size={13} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full bg-[#03060b]/90 border border-slate-800 rounded pl-9 pr-8 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue placeholder-slate-700"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 text-slate-600 hover:text-slate-400 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 text-[10px] uppercase">Verify keycode</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 text-slate-600" size={13} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full bg-[#03060b]/90 border border-slate-800 rounded pl-9 pr-8 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue placeholder-slate-700"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Submission */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-cyan-950/20 border border-cyber-blue text-cyber-blue font-orbitron font-bold text-xs tracking-widest rounded hover:bg-cyber-blue/20 transition flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4 uppercase"
                >
                  {isLoading ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 border-t-slate-200 animate-spin" />
                      <span>REGISTERING...</span>
                    </>
                  ) : (
                    <span>ENROLL PORTAL PROFILE</span>
                  )}
                </button>

              </form>
            </motion.div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-slate-900/60 bg-slate-950/20 flex items-center justify-center text-[9px] font-mono text-slate-600 flex-shrink-0">
        ENROLLMENT GATEWAY ACTIVE // SHIELD SECURE
      </footer>

    </div>
  );
};
export default Signup;
