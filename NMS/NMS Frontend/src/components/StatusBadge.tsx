import React from 'react';

type StatusType = 'normal' | 'clean' | 'suspicious' | 'blocked' | 'banned' | 'low' | 'medium' | 'high' | 'critical' | 'active' | 'mitigated' | 'triaged';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStyles = () => {
    switch (status) {
      case 'clean':
      case 'normal':
      case 'mitigated':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-glow-green cyber-glass-glow-green';
      case 'low':
      case 'triaged':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-glow-blue cyber-glass-glow-blue';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30 text-glow-yellow cyber-glass-glow-yellow';
      case 'high':
      case 'suspicious':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_8px_rgba(249,115,22,0.15)]';
      case 'critical':
      case 'blocked':
      case 'banned':
      case 'active':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30 text-glow-pink cyber-glass-glow-pink animate-pulse-slow';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold border uppercase tracking-wider ${getStyles()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
};
export default StatusBadge;
