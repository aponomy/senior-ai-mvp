# Object-Based Dashboard Architecture

## Overview

The application has been refactored from a route-based architecture to an object-based dashboard system. Instead of navigating between pages, users interact with dynamic "objects" that appear, disappear, and reposition themselves on the dashboard based on user actions.

## Key Innovation: Conversation Atlas

**Conversation Atlas** is our proprietary multi-resolution conversation interface that organizes dialogue along three axes:

1. **Time Axis**: Progressive column reveal (1 column → 2 columns → 3 columns) as conversations mature
2. **Detail Axis**: Five resolution levels (full messages → condensed → summaries → conversation summaries → topic clusters)
3. **Intent Axis**: Three-category separation (Regular conversations, Functions, Meta-conversations)

Users can bidirectionally zoom—from topic overview to full message detail and back—with live synchronization across all views. This enables 30+ turn context retention versus 3-5 turns in mainstream assistants, with ≥70% reduction in content re-reading.

**Note**: Implementation files may reference "three-column" for technical clarity in describing the layout structure, but the branded technology name is **"Conversation Atlas"**.ect-Based Dashboard Architecture

## Overview

The application has been refactored from a route-based architecture to an object-based dashboard system. Instead of navigating between pages, users now interact with dynamic "objects" that appear, disappear, and reposition themselves on the dashboard based on user actions.

## Key Concepts

### Objects

Objects are independent UI components that can be displayed on the dashboard. Each object has:

- **Position**: Where it aligns (top, bottom, left, right)
- **Size**: Width and height specifications
- **State**: Can be full, collapsed, or hidden
- **Space Sharing**: Whether other objects can be placed next to or above/below it

### Current Objects

1. **LargeButtons** - The main 4-button grid (default view)
2. **ChatWindow** - New conversation interface (300px max width, right-aligned)
3. **Timeline** - Historical conversation timeline (bottom, 180px height)
4. **SearchField** - Search interface (top, 80px height)
5. **ClusterCard** - 3D stacked conversation view (center, fills available space)

## Architecture Components

### 1. Type Definitions (`src/types/objects.ts`)

Defines the structure for objects, their positions, and states:

```typescript
export type ObjectPosition = 'top' | 'bottom' | 'left' | 'right';
export type ObjectState = 'full' | 'collapsed' | 'hidden';
export type ObjectId = 'timeline' | 'chatWindow' | 'largeButtons' | 'searchField' | 'clusterCard';
```

Each object has a configuration that specifies:
- Whether it can be collapsed
- Position and size for each state
- Whether it can share horizontal/vertical space

### 2. Layout Engine (`src/lib/layoutEngine.ts`)

The layout engine calculates the position and size of all active objects using a modified skyline algorithm:

**Algorithm Flow:**
1. Separate objects by alignment (top, bottom, left, right)
2. Process top-aligned objects first (fixed at top)
3. Process bottom-aligned objects (fixed at bottom, above footer)
4. Calculate remaining vertical space for center objects
5. Process right-aligned objects (aligned to right edge)
6. Process left-aligned objects (fill remaining horizontal space)
7. Return calculated layouts with absolute positions

**Key Functions:**
- `calculateLayout()` - Main layout calculation
- `addObject()` - Add object to active list
- `removeObject()` - Remove object from active list
- `toggleObjectState()` - Toggle between full/collapsed

### 3. Dashboard Context (`src/context/DashboardContext.tsx`)

Provides state management for the dashboard:

```typescript
const { 
  activeObjects,     // Currently active objects
  layouts,           // Calculated layouts
  viewport,          // Current window dimensions
  showObject,        // Show an object
  hideObject,        // Hide an object
  toggleObject       // Toggle object visibility
} = useDashboard();
```

Handles:
- Active object tracking
- Layout recalculation on changes
- Window resize events
- State updates

### 4. Object Components (`src/components/objects/`)

Each object is a self-contained component:

- **Timeline.tsx** - Timeline with zoom controls
- **ChatWindow.tsx** - Chat interface with glass morphism effect
- **SearchField.tsx** - Expandable search with filters
- **ClusterCard.tsx** - 3D stacked conversation cards
- **LargeButtons.tsx** - 4-button grid layout

All objects maintain their exact visual appearance from the previous implementation.

### 5. Main App (`src/App.tsx`)

The App component:
1. Wraps everything in `DashboardProvider`
2. Renders all active objects with calculated positions
3. Handles user interactions that show/hide objects
4. Manages conversation data and state

## Layout Rules

### Object Positioning Specifications

**Topics (Future)**
- Full: 100% width, 100% height, left-aligned
- Collapsed: 120px width, 100% height, left-aligned
- Can share space with other objects

**SearchField**
- Top-aligned, 100% width, 80px height
- Cannot share horizontal space
- Can have objects below

**Timeline**
- Bottom-aligned, 100% width, 180px height
- Cannot share horizontal space
- Can have objects above

**ChatWindow**
- Right-aligned, 300px max width, 100% height
- Cannot share vertical space (takes full height)
- Search and timeline stay to the left

**LargeButtons / ClusterCard**
- Left-aligned, fills available space
- Can share space with right-aligned objects

### Footer
- Always visible at bottom
- 80px height
- Fixed position

## User Interactions

### Button Actions

**"Tidigare Konversationer"** (Previous Conversations)
- Hides: LargeButtons
- Shows: Timeline (bottom, 100% width)

**"Starta ny Konversation"** (New Conversation)
- Hides: LargeButtons
- Shows: ChatWindow (right, 300px max width)

**Chat Close Button**
- Hides: ChatWindow
- Shows: LargeButtons

## Benefits of Object-Based Architecture

1. **Flexible Layouts** - Objects can appear in any combination
2. **Smooth Transitions** - All position changes are animated
3. **Responsive** - Automatically recalculates on window resize
4. **Scalable** - Easy to add new objects with different positioning rules
5. **No Routing** - Single page, no navigation overhead
6. **State Preservation** - Objects maintain their state when hidden/shown

## Adding New Objects

To add a new object:

1. **Define configuration** in `src/types/objects.ts`:
```typescript
newObject: {
  id: 'newObject',
  canCollapse: false,
  states: {
    full: {
      align: 'left',
      widthPercent: 50,
      // ... other properties
    }
  }
}
```

2. **Create component** in `src/components/objects/NewObject.tsx`

3. **Add to App.tsx** render logic:
```typescript
{layout.id === 'newObject' && (
  <NewObject {...props} />
)}
```

4. **Trigger visibility** via `showObject('newObject')`

## Future Enhancements

1. **Topics Object** - Implement the topics browsing interface
2. **More Collapse States** - Add collapse functionality where applicable
3. **Drag & Drop** - Allow users to manually position objects
4. **Persistent Layouts** - Save user's preferred layout
5. **Multiple Workspaces** - Different object combinations for different workflows
6. **Object Snapping** - Smart positioning suggestions
7. **Z-Index Management** - Allow users to bring objects to front

## File Structure

```
src/
├── App.tsx                          # Main app with object rendering
├── types/
│   └── objects.ts                   # Type definitions
├── lib/
│   └── layoutEngine.ts              # Layout calculation algorithm
├── context/
│   └── DashboardContext.tsx         # State management
├── components/
│   ├── Footer.tsx                   # Fixed footer
│   ├── objects/                     # Object components
│   │   ├── Timeline.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── SearchField.tsx
│   │   ├── ClusterCard.tsx
│   │   └── LargeButtons.tsx
│   └── cards/
│       └── DynamicCard.tsx          # Reusable card component
└── data/
    └── conversationHelpers.ts       # Conversation data utilities
```

## Migration Notes

### Removed
- `react-router-dom` routes
- Individual page components (moved to objects)
- Dashboard.tsx (replaced by App.tsx with layout engine)

### Preserved
- All visual styling and effects
- Component logic and functionality
- Glass morphism effects
- DynamicCard component
- Footer component
- All animations and transitions

### Changed
- Navigation model (routes → object visibility)
- Component hierarchy (pages → objects)
- State management (route state → dashboard context)
