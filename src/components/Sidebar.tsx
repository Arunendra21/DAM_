import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Laptop,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  Flame,
  BellDot,
  Globe,
  LineChart,
  GitMerge,
  History,
  FileBarChart2,
  Terminal,
  ChevronDown,
  ChevronUp,
  LogOut,
  Radio,
  FileText,
  Activity,
  KeyRound,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { useAuthStore } from '../store/useAuthStore';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
}

interface CollapsibleSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export const Sidebar: React.FC = () => {
  const isCollapsed = useDashboardStore(state => state.isSidebarCollapsed);
  const toggleSidebar = useDashboardStore(state => state.toggleSidebar);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [hoverExpanded, setHoverExpanded] = useState(false);

  // Track collapsible group open states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    telemetry: true,
    security: true,
    nta: true,
    historic: true
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/landing');
  };

  // Structured submenus listing the exact 17 items requested!
  const collapsibleSections: CollapsibleSection[] = [
    {
      id: 'telemetry',
      title: 'Telemetry & Hosts',
      items: [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Overview', path: '/overview', icon: Layers },
        { name: 'Current Hosts', path: '/hosts', icon: Laptop },
        { name: 'Current Apps', path: '/applications', icon: Cpu },
        { name: 'NTA Endpoints', path: '/nta-endpoints', icon: GitMerge }
      ]
    },
    {
      id: 'security',
      title: 'Security & Streams',
      items: [
        { name: 'Alerts', path: '/alerts', icon: ShieldAlert },
        { name: 'Alerts Dashboard', path: '/alerts-dashboard', icon: BellDot },
        { name: 'Real Time Alerts', path: '/live-alerts', icon: Radio },
        { name: 'Security', path: '/security', icon: Flame },
        { name: 'Sessions', path: '/sessions', icon: Activity }
      ]
    },
    {
      id: 'nta',
      title: 'NTA Diagnostics',
      items: [
        { name: 'NTA Terminal Monitor', path: '/nta-terminal', icon: Terminal },
        { name: 'Real Time Traffic', path: '/live-traffic', icon: Radio },
        { name: 'Geo Map', path: '/geo-map', icon: Globe },
        { name: 'Active Keys Monitor', path: '/keys', icon: KeyRound }
      ]
    },
    {
      id: 'historic',
      title: 'Analytics & Reports',
      items: [
        { name: 'System Performance', path: '/system-performance', icon: LineChart },
        { name: 'Retro Analytics', path: '/retro-analytics', icon: History },
        { name: 'Reports', path: '/reports', icon: FileBarChart2 }
      ]
    }
  ];

  const effectivelyCollapsed = isCollapsed && !hoverExpanded;

  return (
    <motion.aside
      className={`flex flex-col bg-[#050914] border-r border-slate-900 h-screen fixed left-0 top-0 z-40 transition-all duration-300 ${
        effectivelyCollapsed ? 'w-16' : 'w-64'
      }`}
      onMouseEnter={() => isCollapsed && setHoverExpanded(true)}
      onMouseLeave={() => isCollapsed && setHoverExpanded(false)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-900/60 bg-slate-950/25 flex-shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex-shrink-0 w-8 h-8 rounded bg-gradient-to-tr from-cyber-purple to-cyber-blue flex items-center justify-center border border-cyber-blue/30 shadow-[0_0_10px_rgba(0,240,255,0.25)]">
            <ShieldCheck className="text-slate-100" size={18} />
          </div>
          {!effectivelyCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col select-none"
            >
              <span className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider">
                D-CIPHERS
              </span>
              <span className="font-mono text-[9px] text-cyber-blue tracking-widest uppercase">
                {user?.role === 'admin' ? 'SECURE_ADMIN' : 'OPERATOR_PORTAL'}
              </span>
            </motion.div>
          )}
        </div>

        {/* Collapsible toggle */}
        {!effectivelyCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1 rounded text-slate-500 hover:text-cyber-blue hover:bg-slate-900/60 hidden md:block transition cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {effectivelyCollapsed && (
          <button
            onClick={toggleSidebar}
            className="mx-auto p-1 rounded text-slate-500 hover:text-cyber-blue hover:bg-slate-900/60 hidden md:block transition cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Collapsible Nested submenus & timelines */}
      <div className="flex-grow overflow-y-auto px-2 py-4 space-y-4 relative">
        
        {/* Glowing active line timeline linking indicators */}
        {!effectivelyCollapsed && (
          <div className="absolute left-[20px] top-6 bottom-6 w-[1px] bg-slate-900 pointer-events-none" />
        )}

        {collapsibleSections.map((section) => (
          <div key={section.id} className="space-y-1">
            
            {/* Collapsible Group Header */}
            {!effectivelyCollapsed ? (
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between font-mono text-[10px] text-slate-500 hover:text-slate-300 uppercase tracking-widest px-3 py-1.5 rounded select-none cursor-pointer"
              >
                <span>{section.title}</span>
                {openSections[section.id] ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>
            ) : (
              <div className="border-b border-slate-900 my-1 mx-2" />
            )}

            {/* Submenu Item Links */}
            <AnimatePresence initial={false}>
              {(effectivelyCollapsed || openSections[section.id]) && (
                <motion.div
                  initial={effectivelyCollapsed ? undefined : { height: 0, opacity: 0 }}
                  animate={effectivelyCollapsed ? undefined : { height: 'auto', opacity: 1 }}
                  exit={effectivelyCollapsed ? undefined : { height: 0, opacity: 0 }}
                  className="space-y-1 overflow-hidden"
                >
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded font-mono text-xs tracking-wide transition-all group relative ${
                            isActive
                              ? 'bg-slate-900/40 text-cyber-blue border-l-2 border-cyber-blue shadow-[inset_4px_0_12px_rgba(0,240,255,0.05)] font-bold'
                              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/20 font-medium'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {/* Glowing timeline node dot */}
                            {!effectivelyCollapsed && (
                              <span className={`absolute left-[-2px] w-1.5 h-1.5 rounded-full border border-[#050914] z-10 transition duration-300 ${
                                isActive ? 'bg-cyber-blue shadow-[0_0_8px_#00f0ff]' : 'bg-slate-800'
                              }`} />
                            )}
                            <Icon
                              size={15}
                              className="flex-shrink-0 group-hover:scale-110 transition duration-300 ml-1.5"
                            />
                            {!effectivelyCollapsed && (
                              <span className="truncate">{item.name}</span>
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ))}
      </div>

      {/* Sidebar Footer with Log Out */}
      <div className="p-2 border-t border-slate-900 flex-shrink-0 bg-slate-950/30">
        <button
          onClick={handleLogoutClick}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded font-mono text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/15 border border-transparent hover:border-rose-900/20 transition cursor-pointer ${
            effectivelyCollapsed ? 'justify-center' : ''
          }`}
          title="Disconnect Session"
        >
          <LogOut size={15} className="flex-shrink-0" />
          {!effectivelyCollapsed && <span>DISCONNECT</span>}
        </button>
      </div>

    </motion.aside>
  );
};
export default Sidebar;
