import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Laptop,
  Cpu,
  Cable,
  Activity,
  ShieldAlert,
  Flame,
  BellDot,
  Globe,
  LineChart,
  ServerCrash,
  Layers,
  GitMerge,
  History,
  FileBarChart2,
  Terminal,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import { useAuthStore } from '../store/useAuthStore';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const Sidebar: React.FC = () => {
  const isCollapsed = useDashboardStore(state => state.isSidebarCollapsed);
  const toggleSidebar = useDashboardStore(state => state.toggleSidebar);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [hoverExpanded, setHoverExpanded] = useState(false);

  const handleLogoutClick = () => {
    logout();
    navigate('/landing');
  };

  const isAdmin = user?.role === 'admin';

  // Segregated navigation lists
  const menuSections: MenuSection[] = isAdmin
    ? [
        {
          title: 'Telemetry',
          items: [
            { name: 'Dashboard', path: '/', icon: LayoutDashboard },
            { name: 'Live Traffic', path: '/live-traffic', icon: Activity },
            { name: 'Sessions', path: '/sessions', icon: Cable },
            { name: 'Network Flows', path: '/flows', icon: GitMerge },
            { name: 'Geo Map', path: '/geo-map', icon: Globe },
          ],
        },
        {
          title: 'Security',
          items: [
            { name: 'Threat Detection', path: '/threats', icon: Flame },
            { name: 'Security Center', path: '/security', icon: ShieldAlert },
            { name: 'Alerts Dashboard', path: '/alerts', icon: BellDot },
            { name: 'DNS Monitor', path: '/dns', icon: ServerCrash },
            { name: 'Packet Explorer', path: '/packet-explorer', icon: Layers },
          ],
        },
        {
          title: 'Analytics',
          items: [
            { name: 'Retro Analytics', path: '/retro-analytics', icon: History },
            { name: 'Current Hosts', path: '/hosts', icon: Laptop },
            { name: 'Current Applications', path: '/applications', icon: Cpu },
            { name: 'Reports', path: '/reports', icon: FileBarChart2 },
          ],
        },
        {
          title: 'System',
          items: [
            { name: 'System Performance', path: '/system-performance', icon: LineChart },
            { name: 'Terminal Monitor', path: '/terminal-monitor', icon: Terminal },
            { name: 'Settings', path: '/settings', icon: Sliders },
          ],
        },
      ]
    : [
        {
          title: 'Telemetry',
          items: [
            { name: 'Dashboard', path: '/', icon: LayoutDashboard },
            { name: 'Live Traffic', path: '/live-traffic', icon: Activity },
            { name: 'Sessions', path: '/sessions', icon: Cable },
            { name: 'Geo Map', path: '/geo-map', icon: Globe },
          ],
        },
        {
          title: 'Security',
          items: [
            { name: 'Alerts Dashboard', path: '/alerts', icon: BellDot },
            { name: 'Packet Monitoring', path: '/packet-explorer', icon: Layers },
          ],
        },
        {
          title: 'Analytics',
          items: [
            { name: 'Current Hosts', path: '/hosts', icon: Laptop },
            { name: 'Current Applications', path: '/applications', icon: Cpu },
          ],
        },
        {
          title: 'System',
          items: [
            { name: 'Settings', path: '/settings', icon: Sliders },
          ],
        },
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
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-900/60 bg-slate-950/20 flex-shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex-shrink-0 w-8 h-8 rounded bg-gradient-to-tr from-cyber-purple to-cyber-blue flex items-center justify-center border border-cyber-blue/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
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

      {/* Navigation Links */}
      <div className="flex-grow overflow-y-auto px-2 py-3 space-y-4">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {!effectivelyCollapsed && (
              <h5 className="font-mono text-[10px] text-slate-600 uppercase tracking-widest px-3 mb-1 select-none">
                {section.title}
              </h5>
            )}
            
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded font-mono text-xs tracking-wide transition-all group ${
                      isActive
                        ? 'bg-slate-900/50 text-cyber-blue border-l-2 border-cyber-blue shadow-[inset_4px_0_12px_rgba(0,240,255,0.05)] font-bold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/30 font-medium'
                    }`
                  }
                >
                  <Icon
                    size={16}
                    className="flex-shrink-0 group-hover:scale-110 transition duration-300"
                  />
                  {!effectivelyCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </NavLink>
              );
            })}
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
          <LogOut size={16} className="flex-shrink-0" />
          {!effectivelyCollapsed && <span>DISCONNECT</span>}
        </button>
      </div>

    </motion.aside>
  );
};
export default Sidebar;
