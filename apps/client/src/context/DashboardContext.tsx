import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { addObject, calculateLayout, removeObject } from '../lib/layoutEngine';
import type { ActiveObject, CalculatedLayout } from '../types/objects';

interface DashboardContextType {
  activeObjects: ActiveObject[];
  layouts: CalculatedLayout[];
  viewport: { width: number; height: number };
  showObject: (objectId: string) => void;
  hideObject: (objectId: string) => void;
  toggleObject: (objectId: string) => void;
  isTimelineActive: boolean;
  setIsTimelineActive: (active: boolean) => void;
  toggleTimeline: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeObjects, setActiveObjects] = useState<ActiveObject[]>([
    { id: 'welcome', state: 'full' }, // Start with welcome screen
  ]);
  
  const [isTimelineActive, setIsTimelineActive] = useState(false);
  
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Calculate layouts whenever active objects or viewport changes
  const layouts = calculateLayout(activeObjects, viewport);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showObject = (objectId: string) => {
    setActiveObjects(prev => {
      // Hide welcome screen when showing any other object
      const filtered = prev.filter(obj => obj.id !== 'welcome');
      return addObject(objectId, filtered);
    });
  };

  const hideObject = (objectId: string) => {
    setActiveObjects(prev => removeObject(objectId, prev));
  };

  const toggleObject = (objectId: string) => {
    const isActive = activeObjects.some(obj => obj.id === objectId);
    if (isActive) {
      hideObject(objectId);
    } else {
      // Hide welcome when toggling any object on
      setActiveObjects(prev => {
        const filtered = prev.filter(obj => obj.id !== 'welcome');
        return addObject(objectId, filtered);
      });
    }
  };

  const toggleTimeline = () => {
    setIsTimelineActive(prev => !prev);
  };

  return (
    <DashboardContext.Provider
      value={{
        activeObjects,
        layouts,
        viewport,
        showObject,
        hideObject,
        toggleObject,
        isTimelineActive,
        setIsTimelineActive,
        toggleTimeline,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
