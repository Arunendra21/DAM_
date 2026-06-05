import React, { useState } from 'react';
import { MoreVertical, Maximize2, Minimize2 } from 'lucide-react';
import WidgetMenu from './WidgetMenu';

interface WidgetCardProps {
  id: string;
  title: string;
  description?: string;
  showDescription?: boolean;
  onCustomize: () => void;
  children: React.ReactNode;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  id,
  title,
  description,
  showDescription = true,
  onCustomize,
  children
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  if (isRemoved) return null;

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-[#02050a]/95 backdrop-blur-md p-6 border border-cyber-blue/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] font-sans">
        <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4">
          <div>
            <h3 className="text-lg font-orbitron font-extrabold text-cyber-blue tracking-wider uppercase text-glow-blue">
              {title}
            </h3>
            {description && showDescription && (
              <p className="text-[10px] text-slate-500 font-mono mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-400 hover:text-cyber-blue hover:bg-slate-900/60 rounded transition cursor-pointer"
            title="Exit Fullscreen"
          >
            <Minimize2 size={16} />
          </button>
        </div>
        <div className="flex-grow overflow-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`cyber-glass rounded-xl border border-slate-900/80 p-5 flex flex-col justify-between relative transition-all duration-300 hover:border-slate-800/80 group hover:shadow-[0_0_20px_rgba(0,240,255,0.06)] ${
      isDisabled ? 'opacity-30 pointer-events-none' : ''
    }`}>
      {/* Title block with 3-dot dropdown */}
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0 pr-6">
          <h4 className="font-orbitron font-bold text-xs text-slate-200 tracking-widest uppercase truncate">
            {title}
          </h4>
          {description && showDescription && (
            <p className="text-[9px] text-slate-500 font-mono mt-1 leading-normal">
              {description}
            </p>
          )}
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-1.5">
          <button
            onClick={toggleFullscreen}
            className="p-1 text-slate-600 hover:text-slate-300 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
            title="Fullscreen"
          >
            <Maximize2 size={12} />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 text-slate-500 hover:text-cyber-blue hover:bg-slate-900/50 rounded transition cursor-pointer"
          >
            <MoreVertical size={14} />
          </button>
          <WidgetMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onCustomize={onCustomize}
            onRemove={() => setIsRemoved(true)}
            onDisable={() => setIsDisabled(true)}
          />
        </div>
      </div>

      {/* Widget Content Body */}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};
export default WidgetCard;
