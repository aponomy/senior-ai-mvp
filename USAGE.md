# Object-Based Dashboard - Usage Guide

## Getting Started

The dashboard starts with the **Large Buttons** object visible, showing four main action buttons:

1. **Tidigare Ämnen** (Previous Topics) - Browse topics
2. **Tidigare Konversationer** (Previous Conversations) - View conversation history
3. **Beställningar och Funktioner** (Orders and Functions) - Access functions
4. **Starta ny Konversation** (Start New Conversation) - Begin a chat

## User Interactions

### Starting a New Conversation

1. Click **"Starta ny Konversation"** button
2. Large buttons hide, Chat Window appears on the right (max 300px width)
3. Type message in input field or use voice recording
4. Click **✕** button in chat header to close and return to dashboard

### Viewing Previous Conversations

1. Click **"Tidigare Konversationer"** button
2. Large buttons hide, Timeline appears at bottom (180px height)
3. Use zoom controls to adjust timeline granularity
4. Click on timeline markers to jump to specific dates
5. View conversation clusters in the center area

### Timeline Controls

**Zoom Controls:**
- **− Zoom Out**: Show more time range (months view)
- **+ Zoom In**: Show more detail (days/weeks view)
- Zoom level display shows current zoom (0.25x - 4.0x)

**Timeline Interaction:**
- Click on date markers to select that date
- Selected date is highlighted in blue
- Markers show if conversations exist on that date
- Dates with conversations have taller markers

### Search

When search is active:
- Type in search field to filter conversations
- Search by title or content
- Results update in real-time
- Clear button (×) appears when text is entered
- Search field expands when focused (200px → 400px)

### 3D Conversation Clusters

- Conversations are grouped by date based on zoom level
- Cards stack in 3D with perspective
- Front card is interactive
- Hover over conversations to highlight
- Shows conversation count per cluster
- "Clustered" badge appears for multiple conversations

## Object States

### Currently Active

| Object | State | Position | Size |
|--------|-------|----------|------|
| Large Buttons | Default | Center | 848×848px max |
| Chat Window | On demand | Right | 300px × Full height |
| Timeline | On demand | Bottom | 100% × 180px |

### Coming Soon

| Object | State | Position | Size |
|--------|-------|----------|------|
| Search Field | Available | Top | 100% × 80px |
| Cluster Card | Available | Center | Fills space |
| Topics | Planned | Left | Configurable |

## Layout Behavior

### Automatic Positioning

Objects position themselves based on rules:

1. **Top-aligned objects** (Search) render first
2. **Bottom-aligned objects** (Timeline) render next
3. **Right-aligned objects** (Chat) align to right edge
4. **Left-aligned objects** (Buttons, Clusters) fill remaining space
5. **Footer** always stays at bottom (80px)

### Space Sharing

- Chat Window takes full height but only 300px width
- Timeline takes full width but only 180px height
- Search takes full width but only 80px height
- Other objects can coexist in remaining space

### Responsive Design

- Layout recalculates on window resize
- Objects maintain their aspect ratios
- Smooth transitions between layouts (0.3s cubic-bezier)
- Min/max constraints prevent overflow

## Keyboard Shortcuts

**Chat Window:**
- `Enter` - Send message
- `Esc` - Close chat (when focused)

**Search Field:**
- Focus search field to expand
- `Escape` - Clear search (when focused)

## Visual Effects

### Glass Morphism
- Chat window uses glass effect
- Semi-transparent backgrounds
- Backdrop blur for depth
- Smooth hover transitions

### 3D Perspective
- Conversation clusters use 3D transforms
- 2000px perspective for depth
- Cards scale and translate in Z-space
- Hover brings cards forward

### Animations
- All object movements are animated
- 300ms cubic-bezier easing
- Smooth opacity transitions
- Ripple effects on buttons

## Footer

The footer is always visible at the bottom:

- **Microphone Button**: Click to start/stop voice listening
- **Visual Feedback**: Red pulsing when active
- **Status Text**: Shows current state
- Fixed 80px height

## Tips & Tricks

1. **Quick Navigation**: Use the large buttons for main actions
2. **Timeline Navigation**: Zoom out to see overview, zoom in for details
3. **Search First**: Use search to find specific conversations before browsing
4. **Keyboard Focus**: Tab through interactive elements
5. **Hover States**: Hover over elements to see available interactions

## Troubleshooting

**Objects not appearing?**
- Check browser console for errors
- Ensure viewport is large enough (min 800×600 recommended)
- Try refreshing the page

**Layout looks wrong?**
- Resize window to trigger recalculation
- Check browser zoom level (should be 100%)
- Clear browser cache and reload

**Animation lag?**
- Close other browser tabs to free resources
- Check if browser hardware acceleration is enabled
- Some older devices may have reduced performance

## Development Notes

### Adding New Objects

Developers can add new objects by:

1. Creating component in `src/components/objects/`
2. Adding configuration to `src/types/objects.ts`
3. Registering in `src/App.tsx`
4. Implementing show/hide logic

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed development guide.

### Customizing Layouts

Modify `src/lib/layoutEngine.ts` to change:
- Object positioning algorithm
- Space calculation rules
- Priority ordering
- Collision detection

### Styling

All objects use inline styles for positioning. Component-specific styles are in the component files. Global styles in `src/index.css`.
