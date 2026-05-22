import { useEffect } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';

export const useLiveUpdates = (intervalMs = 1500) => {
  const tick = useDashboardStore(state => state.tick);

  useEffect(() => {
    tick(); // initial tick
    const id = setInterval(() => {
      tick();
    }, intervalMs);

    return () => clearInterval(id);
  }, [tick, intervalMs]);
};
