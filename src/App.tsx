import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import PacketExplorer from './pages/PacketExplorer';
import AlertsDashboard from './pages/AlertsDashboard';
import RetroAnalytics from './pages/RetroAnalytics';
import SystemPerformance from './pages/SystemPerformance';
import TerminalMonitor from './pages/TerminalMonitor';
import NocConsole from './pages/NocConsole';

// Auth views
import Landing from './pages/auth/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

export const App: React.FC = () => {
  const initializeSession = useAuthStore(state => state.initializeSession);

  // Restore authenticated operator sessions on page mounts
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Unprotected Public Auth Routes */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Guarded Console Router Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Shared Operator / Admin dashboards */}
          <Route index element={<Dashboard />} />
          
          <Route path="packet-explorer" element={<PacketExplorer />} />
          <Route path="alerts" element={<AlertsDashboard />} />
          
          {/* Admin-only exclusive pages */}
          <Route
            path="retro-analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RetroAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="system-performance"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SystemPerformance />
              </ProtectedRoute>
            }
          />
          <Route
            path="terminal-monitor"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TerminalMonitor />
              </ProtectedRoute>
            }
          />

          {/* NOC Console dynamic routes */}
          <Route path="live-traffic" element={<NocConsole />} />
          <Route path="sessions" element={<NocConsole />} />
          
          <Route
            path="flows"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <NocConsole />
              </ProtectedRoute>
            }
          />
          <Route
            path="threats"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <NocConsole />
              </ProtectedRoute>
            }
          />
          <Route
            path="dns"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <NocConsole />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <NocConsole />
              </ProtectedRoute>
            }
          />

          <Route path="hosts" element={<NocConsole />} />
          <Route path="applications" element={<NocConsole />} />
          <Route path="settings" element={<NocConsole />} />
          
          {/* Catch-all route redirects back to core dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
