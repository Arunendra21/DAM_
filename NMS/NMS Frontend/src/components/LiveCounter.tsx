import React, { useEffect, useState } from 'react';

interface LiveCounterProps {
  value: number;
  format?: 'number' | 'bandwidth' | 'percent';
  label?: string;
  className?: string;
}

export const LiveCounter: React.FC<LiveCounterProps> = ({ value, format = 'number', label, className = '' }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setPulse(true);
      const id = setTimeout(() => setPulse(false), 300);
      setPrevValue(value);
      return () => clearTimeout(id);
    }
  }, [value, prevValue]);

  const formatValue = (val: number) => {
    if (format === 'percent') {
      return `${val.toFixed(1)}%`;
    }
    if (format === 'bandwidth') {
      if (val >= 1000) {
        return `${(val / 1000).toFixed(2)} Gbps`;
      }
      return `${val.toFixed(1)} Mbps`;
    }
    return val.toLocaleString();
  };

  return (
    <div className={`font-mono flex flex-col ${className}`}>
      {label && <span className="text-[10px] text-slate-500 uppercase tracking-widest">{label}</span>}
      <span
        className={`text-lg font-bold transition-all duration-300 ${
          pulse ? 'text-cyber-blue scale-105 text-glow-blue' : 'text-slate-200'
        }`}
      >
        {formatValue(value)}
      </span>
    </div>
  );
};
export default LiveCounter;
