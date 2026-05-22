import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, History, Trash2, EyeOff } from 'lucide-react';

interface WidgetMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomize: () => void;
  onRemove: () => void;
  onDisable: () => void;
}

export const WidgetMenu: React.FC<WidgetMenuProps> = ({
  isOpen,
  onClose,
  onCustomize,
  onRemove,
  onDisable
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Click outside to close handler
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          className="absolute right-0 top-8 z-30 w-48 rounded bg-[#050b16]/95 border border-slate-800 shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden font-mono text-[11px] text-slate-300"
        >
          <div className="py-1 flex flex-col">
            
            <button
              onClick={() => {
                onCustomize();
                onClose();
              }}
              className="flex items-center gap-2 px-3.5 py-2 hover:bg-cyan-950/20 hover:text-cyber-blue transition text-left w-full cursor-pointer"
            >
              <Sliders size={13} className="text-cyber-blue" />
              <span>Customize</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 py-2 hover:bg-cyan-950/20 hover:text-cyber-blue transition text-left w-full cursor-pointer"
            >
              <History size={13} className="text-slate-500" />
              <span>View Historical</span>
            </button>

            <button
              onClick={() => {
                onRemove();
                onClose();
              }}
              className="flex items-center gap-2 px-3.5 py-2 hover:bg-rose-950/20 hover:text-rose-400 transition text-left w-full cursor-pointer border-t border-slate-900/60"
            >
              <Trash2 size={13} className="text-rose-500" />
              <span>Remove from Dashboard</span>
            </button>

            <button
              onClick={() => {
                onDisable();
                onClose();
              }}
              className="flex items-center gap-2 px-3.5 py-2 hover:bg-rose-950/20 hover:text-rose-400 transition text-left w-full cursor-pointer"
            >
              <EyeOff size={13} className="text-slate-500" />
              <span>Disable</span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default WidgetMenu;
