// Object positioning and state types

export type ObjectPosition = 'top' | 'bottom' | 'left' | 'right';
export type ObjectState = 'full' | 'collapsed' | 'hidden';
export type ObjectId = 
  | 'timeline' 
  | 'chatWindow' 
  | 'largeButtons' 
  | 'searchField' 
  | 'clusterCard'
  | 'topics'
  | 'settings'
  | 'functions'
  | 'welcome';

export interface PositionConfig {
  align: ObjectPosition;
  widthPercent?: number; // undefined means 100%
  maxWidthPx?: number;
  heightPercent?: number; // undefined means 100%
  fixedHeightPx?: number;
  canShareHorizontal: boolean; // Can other objects be next to it horizontally
  canShareVertical: boolean; // Can other objects be above/below it
}

export interface ObjectConfig {
  id: ObjectId;
  canCollapse: boolean;
  states: {
    full: PositionConfig;
    collapsed?: PositionConfig;
  };
}

// Define all object configurations
export const OBJECT_CONFIGS: Record<ObjectId, ObjectConfig> = {
  topics: {
    id: 'topics',
    canCollapse: true,
    states: {
      full: {
        align: 'left',
        widthPercent: 100,
        heightPercent: 100,
        canShareHorizontal: true,
        canShareVertical: true,
      },
      collapsed: {
        align: 'left',
        maxWidthPx: 120,
        heightPercent: 100,
        canShareHorizontal: true,
        canShareVertical: true,
      },
    },
  },
  searchField: {
    id: 'searchField',
    canCollapse: false,
    states: {
      full: {
        align: 'top',
        widthPercent: 100,
        fixedHeightPx: 80,
        canShareHorizontal: false, // Takes full width
        canShareVertical: true, // Can have things below
      },
    },
  },
  timeline: {
    id: 'timeline',
    canCollapse: false,
    states: {
      full: {
        align: 'bottom',
        widthPercent: 100,
        fixedHeightPx: 180,
        canShareHorizontal: false, // Takes full width
        canShareVertical: true, // Can have things above
      },
    },
  },
  chatWindow: {
    id: 'chatWindow',
    canCollapse: false,
    states: {
      full: {
        align: 'right',
        widthPercent: 100,
        maxWidthPx: 300,
        heightPercent: 100,
        canShareHorizontal: true,
        canShareVertical: false, // Takes full height, no space up or down
      },
    },
  },
  largeButtons: {
    id: 'largeButtons',
    canCollapse: false,
    states: {
      full: {
        align: 'left',
        widthPercent: 100,
        heightPercent: 100,
        canShareHorizontal: true,
        canShareVertical: true,
      },
    },
  },
  clusterCard: {
    id: 'clusterCard',
    canCollapse: false,
    states: {
      full: {
        align: 'left',
        widthPercent: 100,
        heightPercent: 100,
        canShareHorizontal: true,
        canShareVertical: true,
      },
    },
  },
  settings: {
    id: 'settings',
    canCollapse: false,
    states: {
      full: {
        align: 'left', // Will be positioned as overlay in App.tsx
        widthPercent: 100,
        heightPercent: 100,
        canShareHorizontal: false,
        canShareVertical: false,
      },
    },
  },
  functions: {
    id: 'functions',
    canCollapse: false,
    states: {
      full: {
        align: 'left',
        maxWidthPx: 200,
        heightPercent: 100,
        canShareHorizontal: true,
        canShareVertical: false,
      },
    },
  },
  welcome: {
    id: 'welcome',
    canCollapse: false,
    states: {
      full: {
        align: 'left',
        widthPercent: 100,
        heightPercent: 100,
        canShareHorizontal: false,
        canShareVertical: false,
      },
    },
  },
};

export interface ActiveObject {
  id: ObjectId;
  state: ObjectState;
  zIndex?: number;
}

export interface CalculatedLayout {
  id: ObjectId;
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
}
