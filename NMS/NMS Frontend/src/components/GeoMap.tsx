import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../store/useDashboardStore';
import { GEO_LOCATIONS } from '../utils/mockGenerator';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, Activity, ShieldAlert, Globe } from 'lucide-react';

export const GeoMap: React.FC = () => {
  const geoConnections = useDashboardStore(state => state.geoConnections);

  // Layout Zoom and Pan local state
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Hover states for tooltips
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredRouteDetails, setHoveredRouteDetails] = useState<any>(null);

  // Map Coordinates scaling
  const scaleX = (x: number) => x * 10;
  const scaleY = (y: number) => y * 5;

  // Zoom / Pan actions
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Drag Pan support
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanX(e.clientX - dragStart.x);
      setPanY(e.clientY - dragStart.y);
    }
    // Update tooltip coordinates relative to parent container
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Mock telemetry calculator for tooltips
  const getNodeTelemetry = (cityName: string) => {
    const hasMalicious = geoConnections.some(
      c => c.active && c.type === 'malicious' && (c.fromName === cityName || c.toName === cityName)
    );
    const hasInbound = geoConnections.some(
      c => c.active && c.type === 'inbound' && (c.fromName === cityName || c.toName === cityName)
    );
    
    return {
      cityName: cityName.toUpperCase(),
      packets: hasMalicious ? '1,894 pps' : hasInbound ? '920 pps' : '412 pps',
      latency: hasMalicious ? '280 ms' : hasInbound ? '42 ms' : '15 ms',
      threat: hasMalicious ? 'CRITICAL ATTACK DETECTED' : 'CLEAN SECURED LINK',
      color: hasMalicious ? 'text-rose-400' : 'text-cyan-400'
    };
  };

  // Simplified vector paths for the 5 key continental plates (Drawn on 1000x500 scale)
  const continentPaths = [
    // North America
    'M 80 150 Q 140 100 240 150 T 360 210 T 300 290 T 170 280 Z',
    // South America
    'M 290 300 Q 360 320 380 390 T 310 490 T 280 390 Z',
    // Eurasia / Europe / Asia
    'M 470 120 Q 580 90 820 130 T 940 180 T 840 310 T 630 350 T 470 230 Z',
    // Africa
    'M 480 250 Q 570 270 590 350 T 500 470 T 460 330 Z',
    // Australia / Oceania
    'M 840 370 Q 910 370 930 410 T 820 460 Z'
  ];

  return (
    <div className={`relative bg-[#02050b] border border-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-500 ${
      isFullscreen ? 'fixed inset-4 z-50 h-[calc(100vh-32px)] bg-[#010408]/98' : 'w-full h-[360px]'
    }`}>
      
      {/* HUD Header Panel */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-900 bg-slate-950/40 relative z-20 flex-shrink-0">
        <div className="flex items-center gap-2 font-orbitron font-extrabold text-[10px] text-slate-100 uppercase tracking-widest">
          <Globe className="text-cyber-blue animate-spin" size={13} style={{ animationDuration: '20s' }} />
          <span>Geo-Intelligence Traffic Matrix</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="hidden md:flex items-center gap-4 font-mono text-[9px] text-slate-500">
          <span>NODES: {GEO_LOCATIONS.length}</span>
          <span>LINKS: {geoConnections.filter(c => c.active).length} ACTIVE</span>
          <span className="text-rose-500 font-bold animate-pulse">
            ATTACKS Neutralized: {geoConnections.filter(c => c.type === 'malicious').length}
          </span>
        </div>

        {/* Map Control Buttons */}
        <div className="flex items-center gap-1.5">
          <button onClick={handleZoomIn} className="p-1 text-slate-500 hover:text-cyber-blue rounded hover:bg-slate-900/60 cursor-pointer" title="Zoom In">
            <ZoomIn size={14} />
          </button>
          <button onClick={handleZoomOut} className="p-1 text-slate-500 hover:text-cyber-blue rounded hover:bg-slate-900/60 cursor-pointer" title="Zoom Out">
            <ZoomOut size={14} />
          </button>
          <button onClick={handleReset} className="p-1 text-slate-500 hover:text-cyber-blue rounded hover:bg-slate-900/60 cursor-pointer" title="Reset View">
            <RotateCcw size={14} />
          </button>
          <div className="w-[1px] h-3.5 bg-slate-900 mx-1" />
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 text-slate-400 hover:text-cyber-blue rounded hover:bg-slate-900/60 cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Main Map Viewer Canvas */}
      <div
        className="flex-grow relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Glowing Cyber Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-40 cyber-grid-bg" />

        {/* SVG Visualization viewport */}
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          
          {/* Zoom and Pan Viewport Group */}
          <g transform={`translate(${panX}, ${panY}) scale(${zoom})`} className="transition-transform duration-100">
            
            {/* 1. Futuristic Continental Plate Contours */}
            <g className="opacity-[0.08] stroke-cyber-blue/30 fill-cyan-950/20">
              {continentPaths.map((path, idx) => (
                <path
                  key={idx}
                  d={path}
                  strokeWidth="2.5"
                  className="transition duration-500 hover:opacity-[0.14]"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.4))' }}
                />
              ))}
            </g>

            {/* 2. Connection Routes & Particle Streams */}
            {geoConnections.map((conn) => {
              if (!conn.active) return null;

              const x1 = scaleX(conn.fromCoords[0]);
              const y1 = scaleY(conn.fromCoords[1]);
              const x2 = scaleX(conn.toCoords[0]);
              const y2 = scaleY(conn.toCoords[1]);

              // Curve computation for premium arc contours
              const dx = x2 - x1;
              const dy = y2 - y1;
              const cx = (x1 + x2) / 2 - dy * 0.15;
              const cy = (y1 + y2) / 2 + dx * 0.15;
              
              const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
              
              let strokeColor = 'rgba(0, 240, 255, 0.4)';
              let glowColor = '#00f0ff';
              let trafficType = 'OUTBOUND';

              if (conn.type === 'malicious') {
                strokeColor = 'rgba(244, 63, 94, 0.65)';
                glowColor = '#f43f5e';
                trafficType = 'MALICIOUS CRITICAL FLOOD';
              } else if (conn.type === 'inbound') {
                strokeColor = 'rgba(16, 185, 129, 0.6)';
                glowColor = '#10b981';
                trafficType = 'INBOUND CONGESTION';
              }

              const isHovered = hoveredRoute === conn.id;

              return (
                <g
                  key={conn.id}
                  onMouseEnter={() => {
                    setHoveredRoute(conn.id);
                    setHoveredRouteDetails({
                      src: conn.fromName.toUpperCase(),
                      dst: conn.toName.toUpperCase(),
                      bandwidth: conn.type === 'malicious' ? '1.4 Gbps' : '482 Mbps',
                      protocol: conn.type === 'malicious' ? 'UDP FLOOD' : 'HTTPS/TLS',
                      type: trafficType,
                      color: glowColor
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredRoute(null);
                    setHoveredRouteDetails(null);
                  }}
                  className="cursor-pointer"
                >
                  {/* Outer glow aura route */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={glowColor}
                    strokeWidth={isHovered ? 4.5 : 1.5}
                    className="opacity-20 transition-all duration-300"
                    style={{ filter: `blur(${isHovered ? '4px' : '1px'})` }}
                  />

                  {/* Intercept backing path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isHovered ? 3 : 1.2}
                    strokeDasharray={conn.type === 'malicious' ? '4 4' : '6 3'}
                  />

                  {/* GPU-Accelerated flowing package particle */}
                  <path
                    id={`flow-${conn.id}`}
                    d={pathD}
                    fill="none"
                    stroke="none"
                  />
                  <circle r="3.5" fill={glowColor} className="animate-pulse shadow-2xl">
                    <animateMotion dur={`${6 - (conn.intensity * 4.5)}s`} repeatCount="indefinite">
                      <mpath href={`#flow-${conn.id}`} />
                    </animateMotion>
                  </circle>
                  <circle r="1.5" fill="#ffffff">
                    <animateMotion dur={`${6 - (conn.intensity * 4.5)}s`} repeatCount="indefinite">
                      <mpath href={`#flow-${conn.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {/* 3. Major Cities / Hub Nodes */}
            {GEO_LOCATIONS.map((loc) => {
              const x = scaleX(loc.coords[0]);
              const y = scaleY(loc.coords[1]);

              const hasMalicious = geoConnections.some(
                c => c.active && c.type === 'malicious' && (c.fromName === loc.name || c.toName === loc.name)
              );
              const hasInbound = geoConnections.some(
                c => c.active && c.type === 'inbound' && (c.fromName === loc.name || c.toName === loc.name)
              );

              let nodeColor = '#00f0ff';
              let ringColor = 'rgba(0, 240, 255, 0.4)';
              if (hasMalicious) {
                nodeColor = '#f43f5e';
                ringColor = 'rgba(244, 63, 94, 0.5)';
              } else if (hasInbound) {
                nodeColor = '#10b981';
                ringColor = 'rgba(16, 185, 129, 0.5)';
              }

              const isHovered = hoveredNode === loc.name;

              return (
                <g
                  key={loc.name}
                  onMouseEnter={() => setHoveredNode(loc.name)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer"
                >
                  {/* Radar Wave rings */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 24 : 15}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="0.8"
                    className="transition-all duration-300"
                  >
                    <animate attributeName="r" values="3;25;3" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
                  </circle>

                  {/* Glowing outer node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 9 : 5.5}
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth={isHovered ? 2.5 : 1.2}
                    className="transition-all duration-300"
                    style={{ filter: `drop-shadow(0 0 6px ${nodeColor})` }}
                  />

                  {/* High intensity node core */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 4.5 : 2.5}
                    fill={nodeColor}
                    className="transition-all duration-300"
                  />

                  {/* Premium, visible glowing city label */}
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    fill={isHovered ? '#ffffff' : '#e2e8f0'}
                    fontSize="9.5"
                    fontWeight="bold"
                    letterSpacing="1.2"
                    fontFamily="var(--font-orbitron)"
                    className="pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    {loc.name.toUpperCase()}
                  </text>
                </g>
              );
            })}

          </g>
        </svg>

        {/* Render Interactive Node tooltips on hovering */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute pointer-events-none z-30 rounded border border-slate-800 bg-[#040815]/95 p-3.5 shadow-2xl backdrop-blur-md font-mono text-[10px] w-56 text-slate-300"
              style={{ left: mousePos.x + 15, top: mousePos.y + 15 }}
            >
              {(() => {
                const tel = getNodeTelemetry(hoveredNode);
                return (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 border-b border-slate-900 pb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      <span className="font-bold text-slate-100 text-[11px] tracking-wide">{tel.cityName} HUB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 uppercase">Packets/Sec:</span>
                      <span className="font-bold text-slate-300">{tel.packets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 uppercase">Latency RTT:</span>
                      <span className="font-bold text-slate-300">{tel.latency}</span>
                    </div>
                    <div className="border-t border-slate-900 pt-1.5 mt-1">
                      <span className={`font-bold block uppercase text-[9px] ${tel.color}`}>
                        {tel.threat}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render Interactive Route tooltips on hovering */}
        <AnimatePresence>
          {hoveredRouteDetails && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute pointer-events-none z-30 rounded border border-slate-800 bg-[#040815]/95 p-3.5 shadow-2xl backdrop-blur-md font-mono text-[10px] w-64 text-slate-300"
              style={{ left: mousePos.x + 15, top: mousePos.y + 15 }}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 border-b border-slate-900 pb-1.5">
                  <Activity size={12} className="text-cyber-blue" />
                  <span className="font-bold text-slate-100 text-[11px] tracking-wide">TELEMETRY LINK AUDIT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SOURCE:</span>
                  <span className="font-bold text-slate-200">{hoveredRouteDetails.src}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TARGET:</span>
                  <span className="font-bold text-slate-200">{hoveredRouteDetails.dst}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">BANDWIDTH:</span>
                  <span className="font-bold text-slate-200">{hoveredRouteDetails.bandwidth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PROTOCOL:</span>
                  <span className="font-bold text-cyber-purple">{hoveredRouteDetails.protocol}</span>
                </div>
                <div className="border-t border-slate-900 pt-1.5 mt-1">
                  <span className="font-extrabold text-[9px] uppercase tracking-wider block" style={{ color: hoveredRouteDetails.color }}>
                    {hoveredRouteDetails.type}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Diagnostics Minimap Indicator overlay */}
        <div className="absolute right-4 bottom-4 w-28 h-28 bg-[#02050c]/90 border border-slate-900 rounded-full overflow-hidden hidden sm:flex flex-col items-center justify-center pointer-events-none">
          <div className="absolute inset-1.5 border border-dashed border-cyan-800/30 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
          <div className="absolute inset-3 border border-cyan-500/10 rounded-full" />
          
          <Activity className="text-cyber-blue animate-pulse" size={18} />
          <span className="font-mono text-[8px] text-slate-400 mt-2 font-bold tracking-wider uppercase">GLOBAL NOC</span>
          <span className="font-mono text-[7px] text-slate-600">SECURE SHIELD</span>
        </div>

        {/* Legend overlays */}
        <div className="absolute bottom-4 left-4 font-mono text-[9px] flex flex-wrap gap-4 bg-[#02050c]/70 border border-slate-900/60 p-2.5 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400 font-medium">OUTBOUND</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400 font-medium">INBOUND</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-rose-400 font-bold uppercase tracking-wider text-[8.5px]">ATTACK STATE</span>
          </div>
        </div>

      </div>

    </div>
  );
};
export default GeoMap;
