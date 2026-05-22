import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../store/useDashboardStore';
import { GEO_LOCATIONS } from '../utils/mockGenerator';

export const GeoMap: React.FC = () => {
  const geoConnections = useDashboardStore(state => state.geoConnections);

  return (
    <div className="relative w-full h-[280px] bg-[#02050c]/80 border border-slate-900 rounded overflow-hidden cyber-grid-bg">
      {/* Grid Scan Line overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1/2 w-full animate-scanline" />

      {/* Futuristic Map HUD */}
      <div className="absolute top-2 left-3 font-mono text-[9px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        Live Traffic Telemetry // Global Nodes
      </div>

      <div className="absolute bottom-2 right-3 font-mono text-[9px] text-slate-500 flex flex-col items-end">
        <div>SYS_LOC: ACTIVE_GATEWAY_HQ</div>
        <div>SCALE: 1 : 45,000,000</div>
      </div>

      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connection Paths */}
        {geoConnections.map((conn) => {
          if (!conn.active) return null;

          const [x1, y1] = conn.fromCoords;
          const [x2, y2] = conn.toCoords;

          // Determine curve parameters for architectural arches
          const dx = x2 - x1;
          const dy = y2 - y1;
          const cx = (x1 + x2) / 2 - dy * 0.15;
          const cy = (y1 + y2) / 2 + dx * 0.15;
          
          const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
          
          let strokeColor = 'rgba(0, 240, 255, 0.4)';
          let flowColor = '#00f0ff';
          if (conn.type === 'malicious') {
            strokeColor = 'rgba(255, 0, 127, 0.4)';
            flowColor = '#ff007f';
          } else if (conn.type === 'inbound') {
            strokeColor = 'rgba(57, 255, 20, 0.4)';
            flowColor = '#39ff14';
          }

          return (
            <g key={conn.id}>
              {/* Backing arc */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth="0.8"
                strokeDasharray="3 3"
                className="opacity-70"
              />

              {/* Glowing animated line */}
              <motion.path
                d={pathD}
                fill="none"
                stroke={flowColor}
                strokeWidth="1.2"
                strokeDasharray="8 30"
                animate={{
                  strokeDashoffset: [0, -100],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 / conn.intensity,
                  ease: 'linear',
                }}
                style={{
                  filter: `drop-shadow(0 0 4px ${flowColor})`,
                }}
              />
            </g>
          );
        })}

        {/* Major Cities / Hub Nodes */}
        {GEO_LOCATIONS.map((loc) => {
          const [x, y] = loc.coords;

          // Check if any active connections are targeting or starting from this location
          const hasMalicious = geoConnections.some(
            c => c.active && c.type === 'malicious' && (c.fromName === loc.name || c.toName === loc.name)
          );

          return (
            <g key={loc.name}>
              {/* Ring Pulse */}
              <circle
                cx={x}
                cy={y}
                r="3"
                fill="none"
                stroke={hasMalicious ? '#ff007f' : '#00f0ff'}
                strokeWidth="0.5"
                className="opacity-60"
              >
                <animate
                  attributeName="r"
                  values="1;6;1"
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0;0.7"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Center point */}
              <circle
                cx={x}
                cy={y}
                r="1.2"
                fill={hasMalicious ? '#ff007f' : '#00f0ff'}
                style={{
                  filter: `drop-shadow(0 0 3px ${hasMalicious ? '#ff007f' : '#00f0ff'})`,
                }}
              />
              
              {/* Text label */}
              <text
                x={x + 2}
                y={y + 1}
                fill="#94a3b8"
                fontSize="2"
                fontFamily="var(--font-cyber)"
                letterSpacing="0.1"
                className="pointer-events-none select-none opacity-80"
              >
                {loc.name.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-3 font-mono text-[8px] flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-slate-400">OUTBOUND</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-slate-400">INBOUND</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-rose-400 font-bold">THREAT STATE</span>
        </div>
      </div>
    </div>
  );
};
export default GeoMap;
