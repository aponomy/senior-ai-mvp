# Topic Cluster Toggle Feature

## Overview
The Topic/Cluster button in the footer now displays a full-screen view with two toggleable modes:
1. **Clustered List View** - A responsive grid showing all topics with metadata
2. **Skyline View** - A dynamic skyline-packed layout using the Jylänki algorithm

## Component: TopicCluster (`ClusterCard.tsx`)

### Features
- **Full-screen takeover**: No card containers, uses all available space
- **View toggle**: Switch between list and skyline views via header buttons
- **Responsive design**: Both views adapt to window resize
- **Clean header**: Sticky header with view mode toggle and close button

### View Modes

#### 1. Clustered List View (Default)
```
- Responsive grid layout (auto-fill, minmax 300px)
- Sorted by last activity (most recent first)
- Card-based items with:
  - Color-coded size indicator (small/medium/large)
  - Topic title
  - Conversation count
  - Last activity date
  - Hover effects (lift + glow)
```

#### 2. Skyline View
```
- Discrete skyline bin-packing algorithm
- Grid-based positioning (20px cells)
- DynamicCard components with:
  - Size-based dimensions (180px, 280px, 400px)
  - Color-coded accents
  - Glass morphism effects
  - Cloud animations
  - Ripple effects on click
```

### Data Source
- Loads from `src/data/topics.json`
- Topic structure:
  ```typescript
  {
    id: string;
    title: string;
    size: 'small' | 'medium' | 'large';
    count: number;
    lastActivity: string; // ISO date
  }
  ```

### Size Configuration
```typescript
small:  { span: 9,  accent: '#9d4eff', 180px, 16px font }
medium: { span: 14, accent: '#4a9eff', 280px, 22px font }
large:  { span: 20, accent: '#4effc8', 400px, 32px font }
```

## User Interaction

### Opening the View
1. Click the **Cluster button** (cyan grid icon) in the footer
2. View opens in full-screen mode
3. Default mode: **Clustered List View**

### Switching Views
- Click **📋 Lista** button for clustered list view
- Click **🏙️ Skyline** button for skyline view
- Active button highlighted with purple background

### Closing the View
- Click **✕** button in top-right header
- Click footer Cluster button again to toggle off

## Implementation Details

### Skyline Algorithm
- **Jylänki 2010 Discrete Skyline** bin-packing heuristic
- Sorts topics by size (largest first)
- Tracks height at each grid column
- Places each item at lowest skyline position
- Updates skyline heights after placement
- Maximizes space usage, minimizes gaps

### Responsive Behavior
- **List view**: CSS Grid auto-fill adapts to width
- **Skyline view**: Recalculates on window resize
  - Columns = `floor(windowWidth / 20px)`
  - Re-runs packing algorithm
  - Smooth transitions on layout change

### Styling
- Background: `rgba(10, 11, 15, 0.95)` with blur
- Sticky header with view toggle
- List cards: Hover lift + color-matched glow
- Skyline cards: DynamicCard with full effects
- No container padding - full space usage

## Integration Points

### Footer (`Footer.tsx`)
```typescript
onClick={() => toggleObject('clusterCard')}
isClusterActive = activeObjects.some(obj => obj.id === 'clusterCard')
```

### App (`App.tsx`)
```typescript
{layout.id === 'clusterCard' && (
  <TopicCluster />
)}
```

### Object Config (`types/objects.ts`)
```typescript
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
    }
  }
}
```

## Future Enhancements
- [ ] Click topic to view associated conversations
- [ ] Search/filter topics
- [ ] Topic detail modal
- [ ] Drag to reorder in list view
- [ ] Custom size editing
- [ ] Topic creation/editing
- [ ] Persistence of view mode preference
- [ ] Animation between view modes
- [ ] Keyboard shortcuts (L for list, S for skyline)

## Testing
1. **Open view**: Click cyan cluster button in footer
2. **List view**: Verify responsive grid, hover effects, sorted by date
3. **Toggle to skyline**: Click 🏙️ button, verify skyline layout
4. **Toggle back**: Click 📋 button, verify list view returns
5. **Resize window**: Verify both views adapt responsively
6. **Close view**: Click ✕ or footer button, verify cleanup
7. **Multiple topics**: Verify all topics from topics.json render
8. **Hover effects**: 
   - List: Cards lift and glow on hover
   - Skyline: DynamicCards show ripple effects

## Files Changed
- ✅ `src/components/objects/ClusterCard.tsx` - Complete rewrite
- ✅ `src/App.tsx` - Updated to remove old props, renamed import
- 📄 `src/data/topics.json` - Data source (existing)
- 📄 `src/components/Footer.tsx` - Integration (existing)
- 📄 `src/types/objects.ts` - Object config (existing)

## Status
✅ **Complete and Ready to Test**

Visit http://localhost:5175 and click the cyan cluster button (grid icon) in the footer to test!
