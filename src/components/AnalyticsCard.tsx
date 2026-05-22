import React, { useState } from 'react';
import { Maximize2, Minimize2, Move, EyeOff, Settings } from 'lucide-react';

interface AnalyticsCardProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, targetId: string) => void;
  onHide?: () => void;
  className?: string;
  showControls?: boolean;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  id,
  title,
  subtitle,
  children,
  onDragStart,
  onDragOver,
  onDrop,
  onHide,
  className = '',
  showControls = true,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const toggleMinimize = () => setIsMinimized(!isMinimized);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-cyber-bg/95 backdrop-blur-md p-6 border border-cyber-blue/30 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div>
            <h3 className="text-xl font-orbitron font-bold text-cyber-blue tracking-wide uppercase text-glow-blue">
              {title}
            </h3>
            {subtitle && <p className="text-xs text-slate-500 font-mono mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="p-2 text-slate-400 hover:text-cyber-blue hover:bg-slate-800/40 rounded transition"
              title="Exit Fullscreen"
            >
              <Minimize2 size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto min-h-0">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      draggable={!!onDragStart}
      onDragStart={(e) => onDragStart && onDragStart(e, id)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver && onDragOver(e);
      }}
      onDrop={(e) => onDrop && onDrop(e, id)}
      className={`cyber-glass rounded-lg flex flex-col transition-all duration-300 ${
        isMinimized ? 'h-auto' : 'h-full'
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/60 px-4 py-2.5 bg-slate-950/20 select-none">
        <div className="flex items-center gap-2 min-w-0">
          {onDragStart && showControls && (
            <div className="cursor-grab active:cursor-grabbing text-slate-600 hover:text-cyber-blue transition">
              <Move size={14} className="drag-handle" />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="text-sm font-orbitron font-bold text-slate-200 tracking-wider truncate uppercase">
              {title}
            </h4>
            {subtitle && !isMinimized && (
              <p className="text-[10px] text-slate-500 font-mono truncate">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Actions */}
        {showControls && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={toggleMinimize}
              className="p-1 text-slate-500 hover:text-slate-300 rounded transition hover:bg-slate-800/30"
              title={isMinimized ? "Expand" : "Collapse"}
            >
              <span className="block w-2.5 h-0.5 bg-current" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1 text-slate-500 hover:text-cyber-blue rounded transition hover:bg-slate-800/30"
              title="Fullscreen"
            >
              <Maximize2 size={13} />
            </button>
            {onHide && (
              <button
                onClick={onHide}
                className="p-1 text-slate-500 hover:text-rose-400 rounded transition hover:bg-slate-800/30"
                title="Hide Widget"
              >
                <EyeOff size={13} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="flex-1 p-4 overflow-hidden min-h-0">
          {children}
        </div>
      )}
    </div>
  );
};
export default AnalyticsCard;
