import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, Calendar, Download, RefreshCw, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '../store/useDashboardStore';
import { useLiveUpdates } from '../hooks/useLiveUpdates';

// Generate some static historical load records
const generateHistoricalData = (hoursCount = 24) => {
  return Array.from({ length: hoursCount }).map((_, i) => {
    const hour = (new Date(Date.now() - (hoursCount - i) * 3600000)).getHours();
    const time = `${hour.toString().padStart(2, '0')}:00`;
    const baseVal = 200 + Math.floor(Math.random() * 400);
    return {
      time,
      inbound: baseVal,
      outbound: Math.floor(baseVal * 0.75 + (Math.random() * 80 - 40)),
      threats: Math.random() > 0.8 ? Math.floor(Math.random() * 4) + 1 : 0,
    };
  });
};

export const RetroAnalytics: React.FC = () => {
  // Feed live telemetry simulation
  useLiveUpdates(1500);

  const { metrics } = useDashboardStore();
  const [data, setData] = useState(generateHistoricalData(24));
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayProgress, setReplayProgress] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Last 24 Hours');
  const [replaySpeed, setReplaySpeed] = useState(1); // 1x, 2x, 5x

  const [dateStart, setDateStart] = useState('2026-05-20T12:00');
  const [dateEnd, setDateEnd] = useState('2026-05-21T12:00');

  // Replay timeline simulation
  useEffect(() => {
    let intervalId: any = null;
    if (isReplaying) {
      intervalId = setInterval(() => {
        setReplayProgress(prev => {
          if (prev >= 100) {
            setIsReplaying(false);
            return 0;
          }
          return prev + (1 * replaySpeed);
        });

        // Add a bit of jitter to historical data to simulate "replay live stream"
        setData(prev => prev.map(item => ({
          ...item,
          inbound: Math.max(50, item.inbound + Math.floor(Math.random() * 20 - 10)),
          outbound: Math.max(40, item.outbound + Math.floor(Math.random() * 16 - 8)),
        })));
      }, 200);
    }
    return () => clearInterval(intervalId);
  }, [isReplaying, replaySpeed]);

  const handleQuickSelect = (range: string) => {
    setSelectedRange(range);
    if (range === 'Last 1 Hour') {
      setData(generateHistoricalData(12));
    } else if (range === 'Last 24 Hours') {
      setData(generateHistoricalData(24));
    } else {
      setData(generateHistoricalData(48)); // Last 7 days / longer
    }
    setShowDatePicker(false);
  };

  const handleApplyCustomDates = () => {
    setSelectedRange('Custom Range');
    setData(generateHistoricalData(30)); // Mock size
    setShowDatePicker(false);
  };

  // Protocols load array (for heat grid representation)
  const heatmapData = [
    { label: 'HTTP/TLS (Port 443)', loads: [40, 52, 60, 48, 80, 92, 85, 74, 60, 52, 45, 38] },
    { label: 'DNS Queries (Port 53)', loads: [20, 22, 28, 45, 30, 32, 25, 20, 18, 12, 10, 15] },
    { label: 'SSH sessions (Port 22)', loads: [8, 12, 5, 2, 14, 25, 30, 22, 18, 10, 5, 8] },
    { label: 'DB Traffic (Port 5432)', loads: [60, 65, 75, 80, 62, 58, 44, 40, 55, 68, 70, 62] },
    { label: 'SMTP Traffic (Port 25)', loads: [15, 18, 20, 22, 14, 10, 12, 18, 15, 12, 10, 8] },
  ];

  const getHeatmapColor = (load: number) => {
    if (load > 80) return 'bg-rose-500/80 border-rose-500 shadow-[inset_0_0_8px_rgba(239,68,68,0.3)]';
    if (load > 60) return 'bg-orange-500/60 border-orange-500';
    if (load > 40) return 'bg-yellow-500/40 border-yellow-500/60';
    if (load > 20) return 'bg-cyan-500/30 border-cyan-500/40';
    return 'bg-slate-900 border-slate-800/40';
  };

  return (
    <div className="space-y-6">
      
      {/* Date Picker & Controls Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#050914] p-4 border border-slate-900 rounded-lg cyber-glass">
        
        <div className="flex items-center gap-3">
          <Calendar className="text-cyber-blue" size={16} />
          <span className="font-mono text-xs text-slate-400">TELEMETRY TIMEFRAME:</span>
          <button
            onClick={() => setShowDatePicker(true)}
            className="px-3.5 py-1.5 bg-[#0a0f1d] border border-slate-800 rounded font-mono text-xs text-cyber-blue font-bold tracking-wider hover:border-cyber-blue/40 transition uppercase"
          >
            {selectedRange}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded border border-slate-800 bg-[#0a0f1d] text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 transition duration-300">
            <Download size={14} />
          </button>
          <button
            onClick={() => setData(generateHistoricalData(24))}
            className="px-3 py-1.5 bg-[#0a0f1d] border border-slate-800 hover:border-slate-700 text-slate-300 rounded font-mono text-xs transition flex items-center gap-1.5"
          >
            <RefreshCw size={12} /> Refetch Archive
          </button>
        </div>

      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#070b14] border border-slate-800 rounded-lg p-5 w-96 space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest border-b border-slate-800 pb-2">
              Select Historic Frame
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              {['Last 1 Hour', 'Last 24 Hours', 'Last 7 Days'].map(range => (
                <button
                  key={range}
                  onClick={() => handleQuickSelect(range)}
                  className="px-2 py-1.5 border border-slate-800 bg-[#0a0f1d] hover:border-cyber-blue text-slate-300 rounded font-mono text-[10px] text-left hover:text-cyber-blue transition"
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-900 font-mono text-xs">
              <span className="text-[10px] text-slate-500 uppercase block">Custom Datetime Range</span>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label className="text-slate-500 text-[10px] mb-1">START POINT</label>
                  <input
                    type="datetime-local"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                    className="bg-[#03060c] border border-slate-800 rounded p-1.5 text-slate-300 text-xs focus:outline-none focus:border-cyber-blue"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-slate-500 text-[10px] mb-1">END POINT</label>
                  <input
                    type="datetime-local"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    className="bg-[#03060c] border border-slate-800 rounded p-1.5 text-slate-300 text-xs focus:outline-none focus:border-cyber-blue"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-900 font-mono text-[10px]">
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-3 py-1.5 border border-slate-800 text-slate-400 rounded hover:text-slate-200 transition uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomDates}
                className="px-3 py-1.5 bg-cyber-blue/10 border border-cyber-blue text-cyber-blue font-bold rounded uppercase hover:bg-cyber-blue/20 transition"
              >
                Apply Range
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Replay Controls & Chart (left 2 columns) */}
        <div className="xl:col-span-2 space-y-6">
          
          <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-4">
            
            {/* HUD Playback toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 bg-slate-950/20 px-3 py-2 rounded">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReplaying(!isReplaying)}
                  className={`p-2 rounded border font-mono text-xs font-bold uppercase transition flex items-center gap-1.5 ${
                    isReplaying
                      ? 'bg-rose-950/20 border-rose-900/50 text-rose-400'
                      : 'bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20'
                  }`}
                >
                  {isReplaying ? <Pause size={14} /> : <Play size={14} />}
                  {isReplaying ? 'Pause' : 'Replay'}
                </button>
                <button
                  onClick={() => setReplayProgress(0)}
                  className="p-2 rounded border border-slate-800 bg-[#0a0f1d] text-slate-400 hover:text-slate-200 transition"
                  title="Reset Replay"
                >
                  <FastForward size={14} className="rotate-180" />
                </button>
              </div>

              {/* Progress Slider */}
              <div className="flex-1 min-w-[150px] flex items-center gap-3 font-mono text-xs text-slate-500">
                <span>00:00</span>
                <div className="flex-grow bg-[#050814] h-1.5 rounded relative border border-slate-900 overflow-hidden">
                  <div
                    className="bg-cyber-blue h-full transition-all duration-300"
                    style={{ width: `${replayProgress}%`, boxShadow: '0 0 6px #00f0ff' }}
                  />
                </div>
                <span>100%</span>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 font-mono text-[9px]">
                {[1, 2, 5].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setReplaySpeed(speed)}
                    className={`px-2 py-1 rounded border transition ${
                      replaySpeed === speed
                        ? 'border-cyber-blue text-cyber-blue bg-cyber-blue/5'
                        : 'border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {speed}X
                  </button>
                ))}
              </div>

            </div>

            {/* Historical Traffic Chart */}
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRetroInbound" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00f0ff" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorRetroOutbound" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff007f" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ff007f" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                  <YAxis tick={{ fill: '#475569', fontSize: 9 }} fontStyle="var(--font-cyber)" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="inbound"
                    name="Inbound Mbps"
                    stroke="#00f0ff"
                    fillOpacity={1}
                    fill="url(#colorRetroInbound)"
                    strokeWidth={1.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="outbound"
                    name="Outbound Mbps"
                    stroke="#ff007f"
                    fillOpacity={1}
                    fill="url(#colorRetroOutbound)"
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

        {/* Heatmap Grid (right column) */}
        <div className="cyber-glass rounded-lg border border-slate-900 p-4 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <h4 className="font-orbitron font-bold text-xs text-cyber-blue uppercase tracking-widest flex items-center gap-1.5">
              <BarChart2 size={14} /> Telemetry Load Heat-Grid
            </h4>
            <span className="font-mono text-[9px] text-slate-500">12 HOUR SPANS</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {heatmapData.map((row, rIdx) => (
              <div key={rIdx} className="space-y-1.5">
                <span className="text-[10px] text-slate-400 block font-semibold">{row.label}</span>
                <div className="grid grid-cols-12 gap-1.5">
                  {row.loads.map((load, cIdx) => (
                    <div
                      key={cIdx}
                      className={`h-6 rounded border transition-all duration-300 ${getHeatmapColor(load)}`}
                      title={`Hour: ${cIdx + 1} // Load: ${load}%`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 font-mono text-[9px] text-slate-500 pt-3 border-t border-slate-900 justify-end">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-slate-900 border border-slate-800" />
              <span>0-20%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-cyan-500/30 border border-cyan-500/40" />
              <span>21-40%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-yellow-500/40 border border-yellow-500/60" />
              <span>41-60%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-orange-500/60 border border-orange-500" />
              <span>61-80%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/80 border-rose-500" />
              <span>81-100%</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default RetroAnalytics;
