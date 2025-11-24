# GitHub Issue: Fourth Column (Shared Canvas) + Tag System + Tag View

**Title**: Implement Fourth Column Shared Canvas, Tag System, and Tag-Based Navigation

**Labels**: `enhancement`, `feature`, `Phase 2`, `UI/UX`, `elderly-friendly`

**Priority**: High

**Estimated Effort**: 2-3 weeks

---

## Overview

Extend the three-column conversation system with:
1. **Fourth Column** - Shared canvas for rich media and interactive content
2. **Tag System** - Categorization system for topics/key points
3. **Tag View** - New navigation mode in Topics page to browse by tags

---

## Feature 1: Fourth Column (Shared Canvas) 🎨

### Concept

Add a fourth column that appears on-demand for rich content visualization and interaction:
- View images full-size
- See bank transfer details/receipts
- Edit videos
- View documents
- Interactive forms
- Media galleries

### Visual Layout

#### Normal State (3 columns):
```
┌──────────┬──────────┬────────────────┐
│ Summary  │ KeyPoint │ Conversation   │
│  240px   │  280px   │   flex 1fr     │
└──────────┴──────────┴────────────────┘
```

#### Canvas Active (4 columns, 1st and 2nd minimized):
```
┌───┬───┬──────────┬──────────────────┐
│ S │ K │ Convers. │  Shared Canvas   │
│ 60│ 60│  280px   │   flex 1fr       │
└───┴───┴──────────┴──────────────────┘
 ↑   ↑
 Minimized (icon only)
 Click to expand temporarily
```

### Behavior

#### Triggering Canvas
Canvas opens when:
1. User clicks "View Receipt" on bank transaction
2. User clicks image thumbnail in conversation
3. User clicks "Edit" on video/document
4. System needs to show form (e.g., payment confirmation)

#### Column Minimization
When canvas opens:
- **Summary Column**: Shrinks to 60px, shows only icons
- **KeyPoint Column**: Shrinks to 60px, shows only bullet points
- **Hover to expand**: Hovering shows full content in overlay
- **Click to pin**: Click to temporarily expand and pin

#### Canvas Content Types

**1. Image Viewer**
```
┌──────────────────────────┐
│  [Close]        [⬇ Save] │
│                          │
│   ┌──────────────────┐   │
│   │                  │   │
│   │    Full Image    │   │
│   │                  │   │
│   └──────────────────┘   │
│                          │
│  Caption: Birthday cake  │
└──────────────────────────┘
```

**2. Bank Receipt**
```
┌──────────────────────────┐
│  [Close]        [⬇ PDF]  │
│                          │
│  Transaction Receipt     │
│  ──────────────────────  │
│  To: Vattenfall          │
│  Amount: 847 SEK         │
│  Date: Nov 21, 2025      │
│  ID: TX-2025-1121-847    │
│  Status: ✓ Completed     │
│                          │
│  [Email Receipt]         │
│  [Repeat Payment]        │
└──────────────────────────┘
```

**3. Video Editor (Simple)**
```
┌──────────────────────────┐
│  [Close]        [✓ Save] │
│                          │
│  ▶️ Birthday Video        │
│  ━━━━━━━━━●━━━━━━━━━━   │
│  0:15 / 1:30             │
│                          │
│  [Trim]  [Mute]  [Share] │
└──────────────────────────┘
```

**4. Document Viewer**
```
┌──────────────────────────┐
│  [Close]    [Print] [⬇]  │
│                          │
│  ┌──────────────────┐    │
│  │ Medical Report   │    │
│  │                  │    │
│  │ [Page 1 of 3]    │    │
│  │                  │    │
│  └──────────────────┘    │
│  [◀] Page 1/3 [▶]       │
└──────────────────────────┘
```

### Technical Implementation

#### Type Additions
```typescript
// Canvas content types
type CanvasContentType = 'image' | 'receipt' | 'video' | 'document' | 'form';

interface CanvasContent {
  id: string;
  type: CanvasContentType;
  title: string;
  data: {
    // For image
    imageUrl?: string;
    caption?: string;
    
    // For receipt
    transaction?: {
      to: string;
      amount: number;
      currency: string;
      date: Date;
      transactionId: string;
      status: 'completed' | 'pending' | 'failed';
    };
    
    // For video
    videoUrl?: string;
    duration?: number;
    
    // For document
    documentUrl?: string;
    pageCount?: number;
    
    // For form
    formFields?: Array<{
      id: string;
      label: string;
      type: 'text' | 'number' | 'select';
      value?: string;
    }>;
  };
  relatedMessageId?: string;
  timestamp: Date;
}

interface Message {
  // ... existing fields
  canvasContent?: CanvasContent; // Link to canvas content
  canvasTrigger?: 'view' | 'edit' | 'share'; // How to open
}
```

#### Component Structure
```
ConversationNavigator (extended)
├─ SummaryColumn (with minimize state)
├─ KeyPointColumn (with minimize state)
├─ ConversationColumn
└─ SharedCanvas (new!)
   ├─ CanvasHeader
   ├─ ImageViewer
   ├─ ReceiptViewer
   ├─ VideoEditor
   ├─ DocumentViewer
   └─ FormViewer
```

#### State Management
```typescript
const [canvasContent, setCanvasContent] = useState<CanvasContent | null>(null);
const [columnsMinimized, setColumnsMinimized] = useState(false);
const [pinnedColumn, setPinnedColumn] = useState<'summary' | 'keypoint' | null>(null);

// Grid template with canvas
const gridTemplate = canvasContent
  ? columnsMinimized
    ? '60px 60px 280px 1fr'  // Minimized
    : '240px 280px 280px 1fr' // Expanded
  : shouldShowSummaries
    ? '240px 280px 1fr'       // Normal 3-column
    : '...';                   // Stage 1 or 2
```

### Accessibility Features
- **Large close button**: 60px × 60px minimum
- **Keyboard navigation**: Esc to close, arrows to navigate
- **High contrast**: Same 7:1 ratio as main interface
- **Screen reader**: Announces canvas content type
- **Touch-friendly**: All buttons 48px minimum

---

## Feature 2: Tag System 🏷️

### Concept

Add a flexible tagging system to categorize and organize topics and key points:
- Multiple tags per topic
- Color-coded tag categories
- Auto-suggested tags based on content
- Manual tag creation
- Tag-based search and filtering

### Visual Design

#### Tags on Key Points
```
KeyPoint Column
┌──────────────────────────────┐
│ Current                      │
│                              │
│ • Recipe search              │
│   [Food] [Baking]            │ ← Tags
│                              │
│ • Vanilla cake ingredients   │
│   [Food] [Baking] [Shopping] │
│                              │
│ • Simple baking instructions │
│   [Food] [Baking] [Tutorial] │
│                              │
└──────────────────────────────┘
```

#### Tag Badges Design
```
Small badge (in lists):
┌─────────────┐
│ Food        │  12px text, rounded
└─────────────┘

Medium badge (in detail):
┌──────────────────┐
│ 🍰 Food          │  14px text, icon
└──────────────────┘

Interactive badge (with count):
┌──────────────────┐
│ 🍰 Food    (12)  │  Click to filter
└──────────────────┘
```

### Tag Categories & Colors

| Category | Color | Examples |
|----------|-------|----------|
| **Food & Cooking** | 🟠 Orange #FF9800 | Baking, Recipe, Cooking |
| **Shopping & Errands** | 🟣 Purple #9C27B0 | Shopping, Groceries, Errands |
| **Health & Medical** | 🔴 Red #F44336 | Doctor, Medicine, Health |
| **Finance & Banking** | 🟢 Green #4CAF50 | Bank, Payment, Bills |
| **Entertainment** | 🔵 Blue #2196F3 | Movies, Music, Games |
| **Family & Social** | 🟡 Yellow #FFC107 | Family, Friends, Events |
| **Home & Garden** | 🟤 Brown #795548 | Home, Garden, DIY |
| **Travel & Transport** | 🔷 Cyan #00BCD4 | Travel, Transport, Trips |
| **Learning & Tutorial** | 📘 Indigo #3F51B5 | Tutorial, Learn, Help |
| **Other** | ⚪ Grey #9E9E9E | Misc, General |

### Tag Features

#### Auto-Tagging
System suggests tags based on:
- Message content analysis
- Function type (bank → Finance)
- Tool calls (recipe search → Food)
- Previous user patterns

#### Manual Tagging
- Click "Add Tag" on any key point
- Type to search existing tags
- Create new tag if not found
- Drag to reorder tags
- Remove with X button

#### Tag Management
Users can:
- Rename tags (affects all instances)
- Merge tags (combine similar)
- Delete tags (confirm before removing)
- Change tag colors
- View tag statistics

### Technical Implementation

#### Type Additions
```typescript
interface Tag {
  id: string;
  name: string;
  category: TagCategory;
  color: string;
  icon?: string;
  count: number; // Number of topics with this tag
  createdAt: Date;
  lastUsed: Date;
}

type TagCategory = 
  | 'food' 
  | 'shopping' 
  | 'health' 
  | 'finance' 
  | 'entertainment'
  | 'family'
  | 'home'
  | 'travel'
  | 'learning'
  | 'other';

interface KeyPoint {
  // ... existing fields
  tags: Tag[]; // Tags attached to this key point
  suggestedTags?: Tag[]; // AI-suggested tags
}

interface Summary {
  // ... existing fields
  tags: Tag[]; // Aggregated from all key points
}
```

#### Components
```
TagSystem/
├─ TagBadge.tsx         # Display single tag
├─ TagList.tsx          # List of tags
├─ TagSelector.tsx      # Tag picker UI
├─ TagManager.tsx       # Manage all tags
└─ TagStatistics.tsx    # Tag usage stats
```

---

## Feature 3: Tag View in Topics Page 🔖

### Concept

Add a new "Tags" button in the Topics page header that switches to a tag-based view where all content is organized by tags instead of topics.

### Visual Design

#### Topics Page Header (Updated)
```
┌────────────────────────────────────────────┐
│  Ämnen                                     │
│                                            │
│  [All] [Recent] [Tags] ← NEW!             │
│                                            │
│  [Search topics...]                        │
└────────────────────────────────────────────┘
```

#### Tag View Layout
```
┌──────────────────────────────────────────────────────────┐
│  Ämnen > Tags                                            │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ 🍰 Food (12)│  │ 💳 Finance  │  │ 👨‍👩‍👧 Family  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐                       │
│  │ 🏥 Health   │  │ 🎵 Entertainment │                   │
│  └─────────────┘  └─────────────┘                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Tag Detail View
Click on a tag to see all topics with that tag:

```
┌──────────────────────────────────────────────────────────┐
│  Ämnen > Tags > Food                                     │
│  ← Back to Tags                                          │
│                                                          │
│  🍰 Food (12 topics)                                     │
│                                                          │
│  ┌────────────────────┐  ┌────────────────────┐         │
│  │ Baking Tips        │  │ Recipe Collection  │         │
│  │ 35 min ago         │  │ 2 hours ago        │         │
│  │ • Recipe search    │  │ • Pasta recipes    │         │
│  │ • Cake ingredients │  │ • Quick meals      │         │
│  └────────────────────┘  └────────────────────┘         │
│                                                          │
│  ┌────────────────────┐  ┌────────────────────┐         │
│  │ Grocery Shopping   │  │ Meal Planning      │         │
│  │ 3 days ago         │  │ 1 week ago         │         │
│  └────────────────────┘  └────────────────────┘         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Tag View Features

#### 1. Tag Cloud Layout
- Larger tags = more topics
- Color-coded by category
- Click to drill down
- Hover shows topic count

#### 2. Tag Filters
```
┌─────────────────────────────────┐
│ Filter Tags:                    │
│ ☑ Food & Cooking               │
│ ☑ Shopping & Errands           │
│ ☑ Health & Medical             │
│ ☐ Finance & Banking            │
│ ☐ Entertainment                │
│ [Select All] [Clear]           │
└─────────────────────────────────┘
```

#### 3. Tag Combinations
View topics that have multiple tags:
```
Food + Shopping
  → Grocery trips, ingredient shopping

Health + Family  
  → Family doctor appointments, kids' checkups
```

#### 4. Tag Timeline
See when tags were most active:
```
🍰 Food
  ███████░░░░░░ Nov
  ░░░████████░░ Oct
  ░░░░░░██████ Sep
```

### Technical Implementation

#### Page Structure
```typescript
// Topics.tsx (updated)
type ViewMode = 'grid' | 'list' | 'tags';
const [viewMode, setViewMode] = useState<ViewMode>('grid');
const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

// Tag view component
<TagView 
  topics={topics}
  tags={allTags}
  selectedTag={selectedTag}
  onSelectTag={setSelectedTag}
/>
```

#### New Components
```
pages/Topics.tsx (updated with Tags button)
components/tags/
├─ TagView.tsx           # Main tag view layout
├─ TagCloud.tsx          # Visual tag cloud
├─ TagFilter.tsx         # Filter tags UI
├─ TagDetail.tsx         # Single tag detail
├─ TagTimeline.tsx       # Tag usage over time
└─ TagCombinations.tsx   # Multi-tag filtering
```

#### Data Structure
```typescript
// Tag aggregation
interface TagSummary {
  tag: Tag;
  topicCount: number;
  topics: Topic[];
  lastActivity: Date;
  activityByMonth: Map<string, number>;
  relatedTags: Tag[]; // Often used together
}

// Helper function
function getTopicsByTag(tag: Tag, topics: Topic[]): Topic[] {
  return topics.filter(topic => 
    topic.keyPoints.some(kp => 
      kp.tags.some(t => t.id === tag.id)
    )
  );
}
```

---

## Implementation Roadmap

### Phase 1: Fourth Column Foundation (Week 1)
- [ ] Update ConversationNavigator for 4-column layout
- [ ] Implement column minimization logic
- [ ] Create SharedCanvas component structure
- [ ] Build CanvasHeader with close/actions
- [ ] Add hover-to-expand for minimized columns
- [ ] Test responsive behavior

### Phase 2: Canvas Content Viewers (Week 1-2)
- [ ] Implement ImageViewer component
- [ ] Implement ReceiptViewer component
- [ ] Implement VideoEditor (basic)
- [ ] Implement DocumentViewer component
- [ ] Add canvas triggers to messages
- [ ] Test all viewer types

### Phase 3: Tag System Core (Week 2)
- [ ] Define Tag and TagCategory types
- [ ] Create TagBadge component
- [ ] Create TagSelector component
- [ ] Implement auto-tagging logic
- [ ] Add tags to KeyPoint type
- [ ] Create tag management UI
- [ ] Test tag CRUD operations

### Phase 4: Tag View in Topics (Week 2-3)
- [ ] Add "Tags" button to Topics header
- [ ] Create TagView component
- [ ] Implement TagCloud visualization
- [ ] Build TagDetail component
- [ ] Add TagFilter component
- [ ] Implement TagTimeline
- [ ] Add TagCombinations view
- [ ] Test navigation and filtering

### Phase 5: Integration & Polish (Week 3)
- [ ] Connect canvas to real messages
- [ ] Connect tags to real conversations
- [ ] Add transitions and animations
- [ ] Implement keyboard shortcuts
- [ ] Add accessibility features
- [ ] Write documentation
- [ ] User testing with elderly users
- [ ] Bug fixes and refinements

---

## Design Considerations for Elderly Users

### Fourth Column
- **Large close button**: Always visible, 60px × 60px
- **Simple controls**: Max 3-4 buttons, clearly labeled
- **Auto-close option**: Close after action complete
- **No accidental triggers**: Require explicit click to open

### Minimized Columns
- **Clear icons**: Large, recognizable symbols
- **Easy to expand**: Hover or single click
- **Visual feedback**: Highlight on hover
- **Not too hidden**: Icons always visible

### Tag System
- **Limited choices**: Show max 8 tags at once
- **Clear categories**: Color + icon + name
- **Auto-suggest first**: Reduce typing
- **Easy to remove**: Large X button

### Tag View
- **Large tag badges**: Minimum 48px height
- **High contrast**: Colors pass WCAG AAA
- **Simple navigation**: Back button always visible
- **No overwhelming**: Max 12 tags per screen

---

## Success Metrics

### Fourth Column
- [ ] Canvas opens < 0.5 seconds
- [ ] Minimized columns expand smoothly
- [ ] 100% of content types displayable
- [ ] Zero accidental closures in testing

### Tag System
- [ ] 90% tag accuracy from auto-suggest
- [ ] < 3 clicks to add manual tag
- [ ] Users can explain tag colors
- [ ] Tags improve findability by 50%+

### Tag View
- [ ] Users find tagged content < 10 seconds
- [ ] 80%+ understand tag categories
- [ ] Tag combinations work intuitively
- [ ] Prefer tags over search in some cases

---

## Technical Requirements

### Performance
- Canvas content lazy-loaded
- Images optimized and cached
- Tag filtering < 100ms
- Smooth animations at 60fps

### Accessibility
- WCAG AAA compliant
- Keyboard navigation complete
- Screen reader compatible
- High contrast mode support

### Browser Support
- Modern Chrome, Firefox, Safari, Edge
- Touch and mouse input
- Desktop and tablet (mobile later)

---

## Open Questions

1. **Canvas persistence**: Should canvas state persist across sessions?
2. **Tag limits**: Max tags per key point (suggest 3-5)?
3. **Tag sync**: Sync tags across devices/sessions?
4. **Canvas size**: Fixed or user-adjustable canvas width?
5. **Video editing**: How complex should the editor be?

---

## Related Issues

- #1 Progressive Conversation Summarization (completed)
- #[TBD] Phase 2: Message Filtering
- #[TBD] Phase 3: Keyboard Navigation

---

## Mockups Needed

1. Fourth column with image viewer (desktop)
2. Minimized columns with hover state
3. Tag badges in different sizes/states
4. Tag view in Topics page
5. Tag detail view with multiple topics
6. Canvas with bank receipt
7. Tag filter panel

---

## Documentation Updates Required

- [ ] Update THREE_COLUMN_IMPLEMENTATION.md → FOUR_COLUMN_...
- [ ] Create SHARED_CANVAS_GUIDE.md
- [ ] Create TAG_SYSTEM_GUIDE.md
- [ ] Update VISUAL_ARCHITECTURE_DIAGRAM.md
- [ ] Add to QUICK_REFERENCE.md

---

**Assignee**: TBD  
**Milestone**: Phase 2 - Advanced Navigation  
**Created**: November 21, 2025  
**Status**: 📋 Planning
