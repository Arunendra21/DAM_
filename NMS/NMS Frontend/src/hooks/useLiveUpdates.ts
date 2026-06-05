import { useEffect } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';

export const useLiveUpdates = (intervalMs = 1500) => {
  const tick = useDashboardStore(state => state.tick);
  const connectWebSocket = useDashboardStore(state => state.connectWebSocket);

  useEffect(() => {
    // Connect to Golang real-time WebSocket Stream
    connectWebSocket();
  }, [connectWebSocket]);

  useEffect(() => {
    tick(); // Keep tick running for local animations/animations if needed
    const id = setInterval(() => {
      tick();
    }, intervalMs);

    return () => clearInterval(id);
  }, [tick, intervalMs]);
};
