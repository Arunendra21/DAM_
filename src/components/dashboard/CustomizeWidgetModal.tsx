import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Sliders } from 'lucide-react';
import { useNtaStore, WidgetSettings } from '../../store/useNtaStore';

export const CustomizeWidgetModal: React.FC = () => {
  const {
    customizingWidgetId,
    widgets,
    showCustomizeModal,
    setShowCustomizeModal,
    updateWidgetSettings
  } = useNtaStore();

  const activeWidget = customizingWidgetId ? widgets[customizingWidgetId] : null;

  // Local form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [topcount, setTopcount] = useState(10);
  const [signatureId, setSignatureId] = useState('');
  const [filter, setFilter] = useState('');
  const [alertGroup, setAlertGroup] = useState('');
  const [showDescription, setShowDescription] = useState(true);
  const [showEndpoints, setShowEndpoints] = useState(true);

  // Sync settings when active widget changes
  useEffect(() => {
    if (activeWidget) {
      setName(activeWidget.name);
      setDescription(activeWidget.description);
      setTopcount(activeWidget.topcount);
      setSignatureId(activeWidget.signatureId);
      setFilter(activeWidget.filter);
      setAlertGroup(activeWidget.alertGroup);
      setShowDescription(activeWidget.showDescription);
      setShowEndpoints(activeWidget.showEndpoints);
    }
  }, [activeWidget]);

  if (!showCustomizeModal || !activeWidget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customizingWidgetId) {
      updateWidgetSettings(customizingWidgetId, {
        name,
        description,
        topcount: Number(topcount),
        signatureId,
        filter,
        alertGroup,
        showDescription,
        showEndpoints
      });
      setShowCustomizeModal(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020409]/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="w-full max-w-2xl bg-[#040814] border border-cyan-950/60 rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh] font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900/60 bg-slate-950/40">
            <div className="flex items-center gap-2 text-cyber-blue">
              <Sliders size={18} />
              <h3 className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider uppercase">
                WIDGET CONFIGURATION CONTROL
              </h3>
            </div>
            <button
              onClick={() => setShowCustomizeModal(false)}
              className="p-1 rounded text-slate-500 hover:text-slate-200 transition hover:bg-slate-900/40 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-4 font-mono text-xs text-slate-300">
            
            {/* Widget Name / Desc */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Telemetry Label</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#02050c]/90 border border-slate-800 rounded px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyber-blue font-bold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Top Limit count</label>
                <input
                  type="number"
                  value={topcount}
                  onChange={(e) => setTopcount(Number(e.target.value))}
                  className="w-full bg-[#02050c]/90 border border-slate-800 rounded px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyber-blue"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Node Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-[#02050c]/90 border border-slate-800 rounded px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyber-blue resize-none"
              />
            </div>

            {/* Signature ID / Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Signature identifier (Rule ID)</label>
                <input
                  type="text"
                  value={signatureId}
                  onChange={(e) => setSignatureId(e.target.value)}
                  className="w-full bg-[#02050c]/90 border border-slate-800 rounded px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyber-blue font-bold text-cyber-blue"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Alert Group Registry</label>
                <input
                  type="text"
                  value={alertGroup}
                  onChange={(e) => setAlertGroup(e.target.value)}
                  className="w-full bg-[#02050c]/90 border border-slate-800 rounded px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyber-blue"
                />
              </div>
            </div>

            {/* Filter Parameter */}
            <div className="space-y-1.5">
              <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">NTA Filter Expression</label>
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-[#02050c]/90 border border-slate-800 rounded px-3.5 py-2 text-slate-200 focus:outline-none focus:border-cyber-blue font-bold text-cyber-purple"
                placeholder="e.g. status:critical, srcIp:192.168.1.*"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-6 pt-2 border-t border-slate-900/60">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showDescription}
                  onChange={() => setShowDescription(!showDescription)}
                  className="rounded bg-[#02050c] border-slate-800 text-cyber-blue focus:ring-0 focus:ring-offset-0"
                />
                <span>Render Description</span>
              </label>

              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showEndpoints}
                  onChange={() => setShowEndpoints(!showEndpoints)}
                  className="rounded bg-[#02050c] border-slate-800 text-cyber-blue focus:ring-0 focus:ring-offset-0"
                />
                <span>Show Endpoints IP list</span>
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-900/60">
              <button
                type="button"
                onClick={() => setShowCustomizeModal(false)}
                className="px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-950/20 text-slate-400 rounded transition font-orbitron font-bold uppercase tracking-wider text-[10px] cursor-pointer"
              >
                Close
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-cyan-950/20 border border-cyber-blue hover:bg-cyber-blue/20 text-cyber-blue rounded transition font-orbitron font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Save size={13} />
                <span>Save Changes</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default CustomizeWidgetModal;
