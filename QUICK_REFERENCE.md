# Quick Reference Card

## File Locations

```
📁 Core System
├── src/types/objects.ts              # Object definitions
├── src/lib/layoutEngine.ts           # Layout algorithm
├── src/context/DashboardContext.tsx  # State management
└── src/App.tsx                       # Main app

📁 Objects
├── src/components/objects/Timeline.tsx
├── src/components/objects/ChatWindow.tsx
├── src/components/objects/SearchField.tsx
├── src/components/objects/ClusterCard.tsx
└── src/components/objects/LargeButtons.tsx

📁 Documentation
├── ARCHITECTURE.md     # Technical details
├── USAGE.md           # User guide
├── LAYOUT_GUIDE.md    # Visual diagrams
├── REFACTOR_SUMMARY.md # What changed
└── COMPLETE.md        # This summary
```

## Key Hooks

```typescript
// In any component:
import { useDashboard } from './context/DashboardContext';

const { 
  activeObjects,  // Array of active objects
  layouts,        // Calculated positions
  showObject,     // Show an object
  hideObject,     // Hide an object
  toggleObject    // Toggle visibility
} = useDashboard();
```

## Show/Hide Objects

```typescript
// Show timeline
showObject('timeline');

// Hide chat window
hideObject('chatWindow');

// Toggle search field
toggleObject('searchField');
```

## Object IDs

```typescript
'largeButtons'  // Main 4-button grid
'chatWindow'    // Chat interface
'timeline'      // Timeline at bottom
'searchField'   // Search at top
'clusterCard'   // 3D conversation cards
'topics'        // Future: Topics browser
```

## Layout Positions

```typescript
align: 'top'     // Search field
align: 'bottom'  // Timeline
align: 'right'   // Chat window
align: 'left'    // Buttons, clusters
```

## Object Sizes

```typescript
// Timeline
widthPercent: 100
fixedHeightPx: 180
align: 'bottom'

// Chat Window  
maxWidthPx: 300
heightPercent: 100
align: 'right'

// Search Field
widthPercent: 100
fixedHeightPx: 80
align: 'top'
```

## Common Tasks

### Add New Object

1. Define in `src/types/objects.ts`
2. Create component in `src/components/objects/`
3. Add render logic in `src/App.tsx`
4. Call `showObject('newObject')`

### Modify Layout

Edit `src/lib/layoutEngine.ts`:
- `calculateLayout()` - Main algorithm
- Add alignment processing
- Update space calculations

### Change Object Size

Edit `src/types/objects.ts`:
```typescript
OBJECT_CONFIGS.myObject.states.full = {
  widthPercent: 50,  // 50% width
  heightPercent: 100 // 100% height
}
```

### Add Button Action

Edit `src/App.tsx`:
```typescript
const handleButtonClick = (action: string) => {
  switch (action) {
    case 'my-action':
      hideObject('largeButtons');
      showObject('myObject');
      break;
  }
}
```

## CSS Classes

```css
.glass              /* Glass morphism effect */
.chat-container     /* Chat window container */
.message            /* Chat message bubble */
.message.user       /* User message */
.message.assistant  /* AI message */
```

## Transitions

```typescript
// All objects animate with:
transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'

// Appears: opacity 0→1, scale 0.95→1
// Disappears: opacity 1→0, scale 1→0.95
// Moves: position changes smoothly
```

## Z-Index Layers

```
1000: Footer (always on top)
100+: Top/bottom objects
90+:  Right objects
80+:  Left objects
0:    Background
```

## Viewport Constants

```typescript
FOOTER_HEIGHT = 80  // px
workingHeight = viewport.height - FOOTER_HEIGHT
```

## Button Colors

```typescript
'#4a9eff'  // Tidigare Ämnen (blue)
'#9d4eff'  // Tidigare Konversationer (purple)
'#ff4e9d'  // Funktioner (pink)
'#4effc8'  // Starta ny Konversation (cyan)
```

## Data Helpers

```typescript
import { 
  generateMockConversations,
  getTimeBuckets,
  getVisibleBuckets 
} from './data/conversationHelpers';

const conversations = generateMockConversations();
const buckets = getTimeBuckets(conversations, zoom);
const visible = getVisibleBuckets(buckets, date, zoom);
```

## Development Commands

```bash
# Start dev server
cd apps/client && npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Debugging

```typescript
// Log active objects
console.log('Active:', activeObjects);

// Log calculated layouts
console.log('Layouts:', layouts);

// Log viewport size
console.log('Viewport:', viewport);
```

## Testing Checklist

```
□ App loads without errors
□ Buttons display correctly
□ Timeline button shows timeline
□ Chat button shows chat window
□ Close buttons work
□ Window resize recalculates
□ Animations are smooth
□ Footer stays at bottom
```

## Performance Tips

- Layout recalculates only when needed
- Use React.memo for heavy components
- Debounce window resize events
- Lazy load large data sets
- Virtual scroll for long lists

## Common Pitfalls

❌ Forgetting to add object to OBJECT_CONFIGS
❌ Not adding render logic in App.tsx
❌ Misspelling object IDs
❌ Not handling window resize
❌ Hardcoding positions instead of using layout
❌ Forgetting z-index management
❌ Not testing on different screen sizes

## Useful Patterns

```typescript
// Conditional object visibility
const isTimelineVisible = activeObjects.some(
  obj => obj.id === 'timeline'
);

// Show multiple objects
const showTimelineAndSearch = () => {
  showObject('timeline');
  showObject('searchField');
};

// Replace one object with another
const swapObjects = (hide: string, show: string) => {
  hideObject(hide);
  showObject(show);
};
```

## Configuration Example

```typescript
// Full object configuration
myObject: {
  id: 'myObject',
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
    }
  }
}
```

## Resources

- **Architecture**: `ARCHITECTURE.md`
- **User Guide**: `USAGE.md`
- **Visual Guide**: `LAYOUT_GUIDE.md`
- **Changes**: `REFACTOR_SUMMARY.md`
- **Summary**: `COMPLETE.md`

## Quick Fixes

**Objects not appearing?**
→ Check console for errors
→ Verify object ID in showObject() call
→ Check OBJECT_CONFIGS has entry

**Layout looks wrong?**
→ Resize window to trigger recalc
→ Check viewport size (min 800×600)
→ Verify object configuration

**Animations choppy?**
→ Check browser performance
→ Reduce active objects
→ Disable hardware acceleration test

## Support

Need help? Check:
1. Documentation files
2. Inline code comments
3. TypeScript type hints
4. Console error messages
5. React DevTools

---

**Quick Start**: `cd apps/client && npm run dev`
**Documentation**: See markdown files in project root
**Latest**: http://localhost:5174
