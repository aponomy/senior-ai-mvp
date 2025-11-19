import type { ActiveObject, CalculatedLayout } from '../types/objects';
import { OBJECT_CONFIGS } from '../types/objects';

interface ViewportDimensions {
  width: number;
  height: number;
}

const FOOTER_HEIGHT = 80; // Fixed footer height

/**
 * Calculate layout positions for all active objects
 * Uses a modified skyline algorithm approach
 */
export function calculateLayout(
  activeObjects: ActiveObject[],
  viewport: ViewportDimensions
): CalculatedLayout[] {
  const layouts: CalculatedLayout[] = [];
  const workingHeight = viewport.height - FOOTER_HEIGHT;

  // Separate objects by their alignment type for easier processing
  const topAligned = activeObjects.filter(obj => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;
    return posConfig.align === 'top';
  });

  const bottomAligned = activeObjects.filter(obj => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;
    return posConfig.align === 'bottom';
  });

  const leftAligned = activeObjects.filter(obj => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;
    return posConfig.align === 'left';
  }).sort((a, b) => {
    // Ensure 'functions' comes before other left-aligned objects
    if (a.id === 'functions') return -1;
    if (b.id === 'functions') return 1;
    return 0;
  });

  const rightAligned = activeObjects.filter(obj => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;
    return posConfig.align === 'right';
  });

  // Track available space
  let topOccupied = 0;
  let bottomOccupied = 0;
  let leftOccupied = 0;
  let rightOccupied = 0;

  // First, calculate right-aligned objects (like chat window) to know how much space they take
  rightAligned.forEach((obj) => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;

    let width: number;
    if (posConfig.maxWidthPx) {
      width = Math.min(posConfig.maxWidthPx, viewport.width);
    } else if (posConfig.widthPercent) {
      width = viewport.width * (posConfig.widthPercent / 100);
    } else {
      width = viewport.width;
    }

    rightOccupied = width;
  });

  // Calculate available width for top/bottom aligned objects (excluding right-aligned space)
  const availableWidthForFullWidth = viewport.width - rightOccupied;

  // Process top-aligned objects first (like search)
  topAligned.forEach((obj, index) => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;

    const height = posConfig.fixedHeightPx || (posConfig.heightPercent ? workingHeight * (posConfig.heightPercent / 100) : workingHeight);
    const width = availableWidthForFullWidth; // Use available width instead of full viewport width

    layouts.push({
      id: obj.id,
      top: topOccupied,
      left: 0,
      width,
      height,
      zIndex: 100 + index,
    });

    topOccupied += height;
  });

  // Process bottom-aligned objects (like timeline)
  bottomAligned.forEach((obj, index) => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;

    const height = posConfig.fixedHeightPx || (posConfig.heightPercent ? workingHeight * (posConfig.heightPercent / 100) : workingHeight);
    const width = availableWidthForFullWidth; // Use available width instead of full viewport width

    layouts.push({
      id: obj.id,
      top: viewport.height - FOOTER_HEIGHT - height,
      left: 0,
      width,
      height,
      zIndex: 100 + index,
    });

    bottomOccupied += height;
  });

  // Calculate remaining vertical space for center objects
  const centerTop = topOccupied;
  const centerHeight = workingHeight - topOccupied - bottomOccupied;

  // Process right-aligned objects (like chat window)
  // These take full height but are aligned to the right
  rightAligned.forEach((obj, index) => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;

    let width: number;
    if (posConfig.maxWidthPx) {
      width = Math.min(posConfig.maxWidthPx, viewport.width);
    } else if (posConfig.widthPercent) {
      width = viewport.width * (posConfig.widthPercent / 100);
    } else {
      width = viewport.width;
    }

    layouts.push({
      id: obj.id,
      top: centerTop,
      left: viewport.width - width,
      width,
      height: centerHeight,
      zIndex: 90 + index,
    });
  });

  // Process left-aligned objects (fill remaining space)
  // These get the space not used by right-aligned objects
  const availableWidth = viewport.width - rightOccupied;
  
  leftAligned.forEach((obj, index) => {
    const config = OBJECT_CONFIGS[obj.id];
    const posConfig = obj.state === 'collapsed' && config.states.collapsed 
      ? config.states.collapsed 
      : config.states.full;

    // Calculate remaining width after previous left-aligned objects
    const remainingWidth = availableWidth - leftOccupied;

    let width: number;
    if (posConfig.maxWidthPx) {
      width = Math.min(posConfig.maxWidthPx, remainingWidth);
    } else if (posConfig.widthPercent) {
      width = remainingWidth * (posConfig.widthPercent / 100);
    } else {
      width = remainingWidth;
    }

    layouts.push({
      id: obj.id,
      top: centerTop,
      left: leftOccupied,
      width,
      height: centerHeight,
      zIndex: 80 + index,
    });

    leftOccupied += width;
  });

  return layouts;
}

/**
 * Helper to check if an object is currently active
 */
export function isObjectActive(objectId: string, activeObjects: ActiveObject[]): boolean {
  return activeObjects.some(obj => obj.id === objectId && obj.state !== 'hidden');
}

/**
 * Toggle object state between full and collapsed (if collapsible)
 */
export function toggleObjectState(
  objectId: string,
  activeObjects: ActiveObject[]
): ActiveObject[] {
  return activeObjects.map(obj => {
    if (obj.id !== objectId) return obj;
    
    const config = OBJECT_CONFIGS[objectId];
    if (!config.canCollapse) return obj;
    
    return {
      ...obj,
      state: obj.state === 'full' ? 'collapsed' : 'full',
    };
  });
}

/**
 * Add an object to active objects
 */
export function addObject(
  objectId: string,
  activeObjects: ActiveObject[]
): ActiveObject[] {
  // Check if already active
  if (isObjectActive(objectId, activeObjects)) {
    return activeObjects;
  }
  
  return [
    ...activeObjects,
    {
      id: objectId as any,
      state: 'full',
    },
  ];
}

/**
 * Remove an object from active objects
 */
export function removeObject(
  objectId: string,
  activeObjects: ActiveObject[]
): ActiveObject[] {
  return activeObjects.filter(obj => obj.id !== objectId);
}
