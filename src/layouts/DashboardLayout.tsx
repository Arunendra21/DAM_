import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useDashboardStore } from '../store/useDashboardStore';

export const DashboardLayout: React.FC = () => {
  const { isSidebarCollapsed, setActiveSidebarItem } = useDashboardStore();
  const { pathname } = useLocation();

  // Keep sidebar highlight state in sync with React Router navigation path
  useEffect(() => {
    switch (pathname) {
      case '/':
        setActiveSidebarItem('Dashboard');
        break;
      case '/packet-explorer':
        setActiveSidebarItem('Packet Explorer');
        break;
      case '/alerts':
        setActiveSidebarItem('Threat Alerts');
        break;
      case '/retro-analytics':
        setActiveSidebarItem('Retro Analytics');
        break;
      case '/system-performance':
        setActiveSidebarItem('System Performance');
        break;
      case '/terminal-monitor':
        setActiveSidebarItem('Terminal Monitor');
        break;
      case '/live-traffic':
        setActiveSidebarItem('Live Traffic');
        break;
      case '/sessions':
        setActiveSidebarItem('Sessions');
        break;
      case '/flows':
        setActiveSidebarItem('Network Flows');
        break;
      case '/threats':
        setActiveSidebarItem('Threat Matrix');
        break;
      case '/dns':
        setActiveSidebarItem('DNS Monitor');
        break;
      case '/hosts':
        setActiveSidebarItem('Network Hosts');
        break;
      case '/applications':
        setActiveSidebarItem('Applications');
        break;
      case '/reports':
        setActiveSidebarItem('Reports');
        break;
      case '/settings':
        setActiveSidebarItem('Settings');
        break;
      default:
        break;
    }
  }, [pathname, setActiveSidebarItem]);

  return (
    <div className="flex min-h-screen bg-[#02050a] text-slate-100 overflow-x-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Console Container */}
      <div
        className={`flex-grow flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'pl-16' : 'pl-64'
        }`}
      >
        
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Route Outlet Content */}
        <main className="flex-grow p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
export default DashboardLayout;
