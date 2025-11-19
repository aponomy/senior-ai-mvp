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
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeObjects, setActiveObjects] = useState<ActiveObject[]>([
    // Start with no objects active - use footer buttons to activate
  ]);
  
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
    setActiveObjects(prev => addObject(objectId, prev));
  };

  const hideObject = (objectId: string) => {
    setActiveObjects(prev => removeObject(objectId, prev));
  };

  const toggleObject = (objectId: string) => {
    const isActive = activeObjects.some(obj => obj.id === objectId);
    if (isActive) {
      hideObject(objectId);
    } else {
      showObject(objectId);
    }
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
