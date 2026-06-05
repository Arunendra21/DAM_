import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sliders, Shield, Zap, RefreshCw, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { StatusBadge } from './StatusBadge';
import { useAuthStore } from '../store/useAuthStore';

export const Navbar: React.FC = () => {
  const {
    totalPacketsProcessed,
    notifications,
    searchQuery,
    setSearchQuery,
    markNotificationsRead,
    metrics,
    alerts,
    blockIp,
    widgetLayout,
    toggleWidgetVisibility,
  } = useDashboardStore();

  const { user } = useAuthStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
        setShowQuickActions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Quick actions
  const blockThreatIps = () => {
    // Block the IPs of all active high or critical alerts
    alerts
      .filter(a => a.status === 'active' && (a.severity === 'critical' || a.severity === 'high'))
      .forEach(a => blockIp(a.sourceIp));
    setShowQuickActions(false);
  };

  const triggerSimulationSpike = () => {
    // Modify store values to trigger a sudden traffic spike
    useDashboardStore.setState(state => ({
      metrics: {
        ...state.metrics,
        networkIn: 980.4,
        networkOut: 852.1,
        cpuUsage: 94.2,
      }
    }));
    setShowQuickActions(false);
  };

  return (
    <header className="bg-[#050914] border-b border-slate-900 h-16 px-6 flex items-center justify-between sticky top-0 z-30 bg-opacity-95 backdrop-blur">
      
      {/* Global Search Bar */}
      <div className="flex items-center gap-3 w-72 relative">
        <Search className="absolute left-3 text-slate-500" size={16} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Global telemetry search..."
          className="w-full bg-[#0a0f1d] border border-slate-800 rounded pl-9 pr-4 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-blue transition duration-300 placeholder-slate-600"
        />
      </div>

      {/* Center - Telemetry Indicators */}
      <div className="hidden lg:flex items-center gap-6 text-[11px] font-mono text-slate-400">
        <div className="flex flex-col">
          <span className="text-slate-600 uppercase text-[9px] tracking-wider">Gateway Status</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-bold uppercase">Online</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-slate-600 uppercase text-[9px] tracking-wider">Uptime</span>
          <span className="text-slate-300 font-bold mt-0.5">04h 28m 15s</span>
        </div>

        <div className="flex flex-col">
          <span className="text-slate-600 uppercase text-[9px] tracking-wider">Total Telemetry</span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-cyber-blue font-bold text-glow-blue">
              {totalPacketsProcessed.toLocaleString()}
            </span>
            <span className="text-[9px] text-slate-500">pkts</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-slate-600 uppercase text-[9px] tracking-wider">Loss Rate</span>
          <span className="text-emerald-400 font-bold mt-0.5">
            {metrics.packetDropRate.toFixed(3)}%
          </span>
        </div>
      </div>

      {/* Right - Notifications, User, & Actions */}
      <div className="flex items-center gap-4">
        
        {/* Quick Config Toggles */}
        <div className="relative" ref={actionRef}>
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className={`p-2 rounded border border-slate-800 bg-[#0a0f1d] text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 transition duration-300 ${showQuickActions ? 'text-cyber-blue border-cyber-blue/30' : ''}`}
            title="Console Controls"
          >
            <Sliders size={15} />
          </button>
          
          {showQuickActions && (
            <div className="absolute right-0 mt-2 w-64 bg-[#070b14] border border-slate-800 rounded shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-3 space-y-3 z-50">
              <h5 className="font-orbitron font-bold text-[10px] text-cyber-blue uppercase tracking-widest border-b border-slate-800 pb-1.5">
                NOC Dashboard Panels
              </h5>
              
              <div className="space-y-1.5">
                {widgetLayout.map(widget => (
                  <button
                    key={widget.id}
                    onClick={() => toggleWidgetVisibility(widget.id)}
                    className="w-full flex items-center justify-between font-mono text-[10px] text-slate-300 hover:bg-slate-900/60 p-1.5 rounded transition"
                  >
                    <span>{widget.title}</span>
                    {widget.visible ? (
                      <span className="text-cyber-blue flex items-center gap-1"><Eye size={12} /> ON</span>
                    ) : (
                      <span className="text-slate-600 flex items-center gap-1"><EyeOff size={12} /> OFF</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-2 space-y-2">
                <button
                  onClick={blockThreatIps}
                  className="w-full bg-rose-950/20 hover:bg-rose-900/20 border border-rose-900/40 text-rose-300 rounded font-mono text-[9px] font-bold py-1.5 uppercase transition flex items-center justify-center gap-1.5"
                >
                  <Shield size={12} /> Blacklist Threat IPs
                </button>
                <button
                  onClick={triggerSimulationSpike}
                  className="w-full bg-cyan-950/20 hover:bg-cyan-900/20 border border-cyan-900/40 text-cyan-300 rounded font-mono text-[9px] font-bold py-1.5 uppercase transition flex items-center justify-center gap-1.5"
                >
                  <Zap size={12} /> Trigger Load Spike
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications && unreadCount > 0) {
                markNotificationsRead();
              }
            }}
            className="p-2 rounded border border-slate-800 bg-[#0a0f1d] text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 transition duration-300 relative"
          >
            <Bell size={15} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center font-mono text-[8px] font-bold text-slate-100 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#070b14] border border-slate-800 rounded shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-slate-800 bg-slate-950/40 flex justify-between items-center">
                <span className="font-orbitron font-bold text-xs text-slate-200 tracking-wider">ALERTS FEED</span>
                {unreadCount > 0 && (
                  <span className="font-mono text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-1.5 py-0.2 rounded font-bold uppercase">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-900">
                {notifications.length === 0 ? (
                  <div className="p-4 font-mono text-xs text-slate-500 text-center">
                    No active threat notifications.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-3 hover:bg-slate-900/30 transition">
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={13} className={`flex-shrink-0 mt-0.5 ${notif.severity === 'critical' ? 'text-rose-500' : 'text-orange-400'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-[10px] text-slate-200 leading-tight">
                            {notif.text}
                          </p>
                          <span className="font-mono text-[8px] text-slate-500 mt-1 block">
                            {notif.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Command profile */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
          <div className="flex flex-col text-right hidden sm:block">
            <span className="font-mono text-xs text-slate-200 font-bold leading-none">{user?.name || 'Guest User'}</span>
            <span className="font-mono text-[9px] text-cyber-blue tracking-widest uppercase mt-0.5">
              {user?.role === 'admin' ? 'SECURE_ADMIN' : 'SECURE_OP-01'}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full border border-cyber-blue/30 bg-[#0c142c] overflow-hidden flex items-center justify-center shadow-[0_0_8px_rgba(0,240,255,0.15)] select-none">
            <span className="font-orbitron font-extrabold text-[10px] text-cyber-blue">
              {(user?.name || 'CT').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
export default Navbar;
