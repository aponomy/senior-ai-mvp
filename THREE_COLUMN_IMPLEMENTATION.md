# Three-Column Context Navigator - Implementation Guide

**Branded Technology**: **Conversation Atlas** - Multi-resolution conversation interface with progressive disclosure  
**Date**: November 21, 2025  
**Updated**: November 24, 2025 (Rebranded as Conversation Atlas)  
**Issue**: #1 Progressive Conversation Summarization  
**Status**: Phase 1 Complete ✅ + Meta/Function Extensions Implemented

> **Note**: This implementation guide uses "three-column" for technical clarity in describing the layout structure. The branded product name is **"Conversation Atlas"** — a multi-resolution conversation interface organized along three axes: time (progressive column reveal), detail (five resolution levels), and intent (regular/function/meta separation).

---

## 🆕 NEW: Meta & Function Conversation Separation

### Concept
The conversation is intelligently organized into THREE types:

1. **Regular Conversations** (Blue) - Content discussions (recipes, shopping, appointments)
2. **Functions** (Green) - Action executions (bank transfers, bookings, purchases)
3. **Meta Conversations** (Amber) - Interface help, navigation, app usage

### Visual Organization

#### Summary Column Layout:
```
┌─────────────────────┐
│   [+ New Button]    │
├─────────────────────┤
│  🍰 Baking Tips     │  ← Regular summaries (Blue)
│  🛒 Shopping Plans  │
│  📅 Appointments    │
├─────────────────────┤
│ ═════════════════   │  ← GREEN separator
│     Functions       │  ← Functions section label
├─────────────────────┤
│  💳 Bank Payment    │  ← Function summaries (Green)
│  🎫 Concert Booking │
├─────────────────────┤
│ ═════════════════   │  ← AMBER separator
│     Navigation      │  ← Meta section label
├─────────────────────┤
│  🧭 Using Interface │  ← Meta summaries (Amber)
└─────────────────────┘
```

#### Conversation Column Behavior:
```
Regular message
Regular message
─────── Bank Transaction ────────  ← Entry separator (Green)
Bank function inline
Bank function inline
─────── Back to conversation ────────  ← Exit separator (Blue)
Regular message continues
Regular message
─────── Navigation ────────  ← Meta entry (Amber)
Meta help inline
─────── Back to conversation ────────  ← Back to regular (Blue)
Regular message
```

### Why This Matters for Elderly Users

1. **Functions don't clutter conversation history**
   - Bank payments visible during execution
   - Hidden when reviewing conversation topic
   - Accessible separately in Functions section

2. **Interface help stays accessible but separate**
   - "How do I...?" questions don't pollute content
   - Easy to find help without scrolling through recipes

3. **Clear mental model**
   - Blue = Talking about life tasks
   - Green = Doing something (bank, booking)
   - Amber = Learning to use the app

### Implementation Status

✅ **Types Added:**
- `isMeta` flag for messages and summaries
- `isFunction` flag for messages and summaries
- `functionType` enum: bank, booking, shopping, health, communication

✅ **Components Created:**
- `MetaSummaryCard.tsx` - Amber-themed cards
- `FunctionSummaryCard.tsx` - Color-coded by function type

✅ **Visual Separators:**
- Horizontal lines in Summary Column
- Inline separators in Conversation Column
- Automatic show/hide based on content

✅ **Mock Data:**
- Meta conversation example (navigation help)
- Function execution example (bank payment)

---

## Quick Start Prompt for Next Session

```
I need to implement the Three-Column Context Navigator for Issue #1.

CONTEXT:
- We're replacing the current scrolling timeline approach
- This is for elderly users (75+), prioritizing simplicity and clarity
- Design has been fully specified in Issue #1 comment #5

TASK:
Implement the three-column layout with:
1. Left column: Summary cards (past conversations)
2. Middle column: Key points (topics fr### Testing Checklist

### Progressive Reveal
- [ ] **Stage 1**: Fresh conversation shows only chat column (full width)
- [ ] **Transition 1→2**: Second topic triggers keypoints column with slide animation
- [ ] **Stage 2**: Keypoints column visible, conversation column shrinks smoothly
- [ ] **Transition 2→3**: Second summary triggers summaries column with slide animation
- [ ] **Stage 3**: All columns visible with proper widths
- [ ] **No flashing**: Columns appear/disappear smoothly without jarring jumps
- [ ] **Persistence**: Reopening app shows correct stage based on data

### Functionalityselected summary)
3. Right column: Full conversation messages + chat input

KEY FEATURES:
- Click summary → Show its keypoints in middle column
- Click keypoint → Jump to those messages in right column
- "Continue from here" → Make old context active for chat
- Always show "building" (current) summary/keypoints at bottom
- Auto-scroll and selection states

SPECIFICATIONS:
See Issue #1 comment #5 for complete visual design specs, component structure, 
state management, and accessibility requirements.

FILES TO CREATE/MODIFY:
Create: ConversationNavigator.tsx, SummaryColumn.tsx, SummaryCard.tsx, 
        KeyPointColumn.tsx, KeyPointItem.tsx, ConversationColumn.tsx
Modify: Conversation.tsx (use ConversationNavigator)
Delete: ProgressiveConversationView.tsx (old approach)

Let's build Phase 1: Core layout + navigation!
```

---

## KEY FEATURE: Progressive Column Reveal 🎯

**Instead of showing all three columns immediately, we progressively reveal them:**

- **Stage 1** (0-1 topics): Only conversation column (full width)
- **Stage 2** (2+ topics): Key Points + Conversation columns
- **Stage 3** (2+ summaries): All three columns

**Why?**
- ✅ No overwhelming empty states
- ✅ Interface grows naturally with conversation
- ✅ User learns system gradually
- ✅ Feels alive and responsive

See Issue #1 comment #7 for complete progressive reveal specifications.

---

## Implementation Phases

### Phase 1: Core Layout (3-4 hours)

**Goals:**
- ✅ Three-column CSS Grid layout with progressive reveal
- ✅ Basic component structure
- ✅ Mock data rendering
- ✅ Column scrolling behavior
- ✅ Smooth slide-in animations

**Components to Create:**

#### 1. `src/components/conversation/ConversationNavigator.tsx`
```typescript
import React, { useState } from 'react';
import SummaryColumn from './SummaryColumn';
import KeyPointColumn from './KeyPointColumn';
import ConversationColumn from './ConversationColumn';
import { Summary, KeyPoint, Message } from '../../types/conversation';

interface ConversationNavigatorProps {
  summaries: Summary[];
  messages: Message[];
}

export default function ConversationNavigator({
  summaries,
  messages
}: ConversationNavigatorProps) {
  const [selectedSummaryId, setSelectedSummaryId] = useState<number | null>(null);
  const [selectedKeyPointId, setSelectedKeyPointId] = useState<number | null>(null);
  
  // Calculate visibility (PROGRESSIVE REVEAL)
  const completedSummaries = summaries.filter(s => !s.isBuilding);
  const currentSummary = summaries.find(s => s.isBuilding);
  const allKeyPoints = summaries.flatMap(s => s.keyPoints);
  const completedKeyPoints = allKeyPoints.filter(k => !k.isBuilding);
  
  const shouldShowSummaries = completedSummaries.length >= 2;
  const shouldShowKeyPoints = completedKeyPoints.length >= 2;
  
  // Grid template based on stage
  const gridTemplate = shouldShowSummaries
    ? '240px 280px 1fr'
    : shouldShowKeyPoints
      ? '280px 1fr'
      : '1fr';
  
  const selectedSummary = selectedSummaryId 
    ? summaries.find(s => s.id === selectedSummaryId)
    : currentSummary;
  
  const keyPoints = selectedSummary?.keyPoints || [];
  
  const handleSummaryClick = (id: number) => {
    setSelectedSummaryId(id);
    setSelectedKeyPointId(null); // Reset keypoint selection
  };
  
  const handleKeyPointClick = (id: number) => {
    setSelectedKeyPointId(id);
    // Scroll to messages related to this keypoint
  };
  
  const handleBackToCurrent = () => {
    setSelectedSummaryId(null);
    setSelectedKeyPointId(null);
  };
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: gridTemplate,
      gap: shouldShowKeyPoints ? '16px' : '0',
      height: '100%',
      width: '100%',
      padding: '16px',
      overflow: 'hidden',
      transition: 'grid-template-columns 0.3s ease'
    }}>
      {/* Only show if 2+ summaries (STAGE 3) */}
      {shouldShowSummaries && (
        <SummaryColumn
          summaries={summaries}
          selectedId={selectedSummaryId}
          onSelect={handleSummaryClick}
        />
      )}
      
      {/* Only show if 2+ keypoints (STAGE 2+) */}
      {shouldShowKeyPoints && (
        <KeyPointColumn
          keyPoints={keyPoints}
          selectedId={selectedKeyPointId}
          onSelect={handleKeyPointClick}
          isCurrentContext={selectedSummaryId === null}
        />
      )}
      
      {/* Always show conversation (ALL STAGES) */}
      <ConversationColumn
        messages={messages}
        selectedKeyPointId={selectedKeyPointId}
        isCurrentContext={selectedSummaryId === null}
        onBackToCurrent={handleBackToCurrent}
        showNavigationHint={!shouldShowKeyPoints} // Show hint in Stage 1
      />
    </div>
  );
}
```

#### 2. `src/components/conversation/SummaryColumn.tsx`
```typescript
import React from 'react';
import SummaryCard from './SummaryCard';
import { Summary } from '../../types/conversation';

interface SummaryColumnProps {
  summaries: Summary[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function SummaryColumn({
  summaries,
  selectedId,
  onSelect
}: SummaryColumnProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '20px',
      backgroundColor: 'rgba(255,255,255,0.02)',
      borderRadius: '12px'
    }}>
      {/* [+ New] button */}
      <button
        style={{
          height: '48px',
          width: '100%',
          backgroundColor: 'rgba(94,208,255,0.15)',
          border: '2px solid #5ED0FF',
          borderRadius: '8px',
          color: '#5ED0FF',
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer'
        }}
        onClick={() => {/* TODO: Start new conversation */}}
      >
        + New
      </button>
      
      {/* Summary cards */}
      {summaries.map(summary => (
        <SummaryCard
          key={summary.id}
          summary={summary}
          isSelected={summary.id === selectedId}
          onClick={() => onSelect(summary.id)}
        />
      ))}
    </div>
  );
}
```

#### 3. `src/components/conversation/SummaryCard.tsx`
```typescript
import React from 'react';
import { Summary } from '../../types/conversation';

interface SummaryCardProps {
  summary: Summary;
  isSelected: boolean;
  onClick: () => void;
}

export default function SummaryCard({
  summary,
  isSelected,
  onClick
}: SummaryCardProps) {
  const isBuilding = summary.isBuilding;
  
  return (
    <div
      onClick={isBuilding ? undefined : onClick}
      style={{
        minHeight: '120px',
        padding: '16px',
        backgroundColor: isSelected 
          ? 'rgba(94,208,255,0.15)'
          : isBuilding
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(255,255,255,0.06)',
        border: isSelected
          ? '2px solid #5ED0FF'
          : isBuilding
            ? '2px dashed rgba(255,255,255,0.2)'
            : '2px solid rgba(255,255,255,0.12)',
        borderRadius: '12px',
        cursor: isBuilding ? 'default' : 'pointer',
        opacity: isBuilding ? 0.7 : 1,
        transform: isSelected ? 'scale(1.02)' : 'none',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Icon + Title */}
      <div style={{
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '8px',
        color: '#FFFFFF'
      }}>
        {summary.icon} {summary.title}
      </div>
      
      {/* Relative time */}
      <div style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.6)',
        marginBottom: '12px'
      }}>
        {summary.relativeTime}
      </div>
      
      {/* Bullet points */}
      {!isBuilding && (
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)' }}>
          {summary.bulletPoints.map((point, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              • {point}
            </div>
          ))}
        </div>
      )}
      
      {/* Building indicator */}
      {isBuilding && (
        <div style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.5)',
          fontStyle: 'italic'
        }}>
          Building...
        </div>
      )}
    </div>
  );
}
```

#### 4. `src/components/conversation/KeyPointColumn.tsx`
```typescript
import React from 'react';
import KeyPointItem from './KeyPointItem';
import { KeyPoint } from '../../types/conversation';

interface KeyPointColumnProps {
  keyPoints: KeyPoint[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  isCurrentContext: boolean;
}

export default function KeyPointColumn({
  keyPoints,
  selectedId,
  onSelect,
  isCurrentContext
}: KeyPointColumnProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '20px',
      backgroundColor: 'rgba(255,255,255,0.02)',
      borderRadius: '12px'
    }}>
      {/* Sticky label */}
      <div style={{
        fontSize: '14px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {isCurrentContext ? 'Current' : 'Key Points'}
      </div>
      
      {/* Key point items */}
      {keyPoints.map(keyPoint => (
        <KeyPointItem
          key={keyPoint.id}
          keyPoint={keyPoint}
          isSelected={keyPoint.id === selectedId}
          onClick={() => onSelect(keyPoint.id)}
        />
      ))}
      
      {/* Building indicator for current context */}
      {isCurrentContext && keyPoints.length === 0 && (
        <div style={{
          minHeight: '48px',
          padding: '12px 16px',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '2px dashed rgba(255,255,255,0.2)',
          borderRadius: '8px',
          fontSize: '16px',
          color: 'rgba(255,255,255,0.5)',
          fontStyle: 'italic'
        }}>
          Building...
        </div>
      )}
    </div>
  );
}
```

#### 5. `src/components/conversation/KeyPointItem.tsx`
```typescript
import React from 'react';
import { KeyPoint } from '../../types/conversation';

interface KeyPointItemProps {
  keyPoint: KeyPoint;
  isSelected: boolean;
  onClick: () => void;
}

export default function KeyPointItem({
  keyPoint,
  isSelected,
  onClick
}: KeyPointItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        minHeight: '48px',
        padding: '12px 16px',
        backgroundColor: isSelected
          ? 'rgba(94,208,255,0.12)'
          : 'rgba(255,255,255,0.04)',
        borderLeft: isSelected
          ? '3px solid #5ED0FF'
          : '3px solid transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '17px',
        color: '#FFFFFF',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.transform = 'translateX(4px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
          e.currentTarget.style.transform = 'translateX(0)';
        }
      }}
    >
      • {keyPoint.text}
    </div>
  );
}
```

#### 6. `src/components/conversation/ConversationColumn.tsx`
```typescript
import React, { useRef, useEffect } from 'react';
import { Message } from '../../types/conversation';
import MessageBubble from './MessageComponents'; // Reuse existing
import ChatInput from '../ChatInput'; // Reuse existing

interface ConversationColumnProps {
  messages: Message[];
  selectedKeyPointId: number | null;
  isCurrentContext: boolean;
  onBackToCurrent: () => void;
}

export default function ConversationColumn({
  messages,
  selectedKeyPointId,
  isCurrentContext,
  onBackToCurrent
}: ConversationColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when in current context
  useEffect(() => {
    if (isCurrentContext && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isCurrentContext]);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'rgba(255,255,255,0.02)',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Back to current button (if viewing old context) */}
      {!isCurrentContext && (
        <button
          onClick={onBackToCurrent}
          style={{
            height: '48px',
            width: '100%',
            backgroundColor: 'rgba(94,208,255,0.1)',
            border: 'none',
            borderBottom: '2px solid rgba(94,208,255,0.3)',
            color: '#5ED0FF',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          ← Back to current
        </button>
      )}
      
      {/* Messages area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px'
        }}
      >
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      
      {/* Chat input (only active in current context) */}
      <div style={{
        padding: '16px',
        borderTop: '2px solid rgba(255,255,255,0.1)'
      }}>
        {isCurrentContext ? (
          <ChatInput onSend={(text) => {/* TODO: Send message */}} />
        ) : (
          <div style={{
            padding: '12px',
            textAlign: 'center',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic'
          }}>
            Click "Back to current" to continue chatting
          </div>
        )}
      </div>
    </div>
  );
}
```

#### 7. Update `src/pages/Conversation.tsx`
```typescript
import React from 'react';
import ConversationNavigator from '../components/conversation/ConversationNavigator';
import { mockSummaries, mockMessages } from '../data/mockConversation';

export default function Conversation() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ConversationNavigator
        summaries={mockSummaries}
        messages={mockMessages}
      />
    </div>
  );
}
```

---

### Phase 2: State Management (2-3 hours)

**Goals:**
- ✅ Selection logic working correctly
- ✅ Scroll to keypoint messages
- ✅ "Continue from here" functionality
- ✅ Update mock data with proper relationships

**Tasks:**

1. **Update `src/types/conversation.ts`**:
   - Add `Summary` interface
   - Add `KeyPoint` interface with `messageIds: number[]`

2. **Update `src/data/mockConversation.ts`**:
   - Create 3-4 summary objects with keypoints
   - Link keypoints to specific message IDs
   - Add helper function `getMessagesForKeyPoint(keyPointId)`

3. **Implement scroll-to-messages logic**:
   - When keypoint clicked, find first message in `messageIds`
   - Scroll to that message in conversation column
   - Highlight messages related to keypoint

4. **Add "Continue from here" button**:
   - Show button when viewing old keypoint messages
   - On click: Make that keypoint's context active
   - Enable chat input for that context

---

### Phase 3: Polish & Accessibility (2 hours)

**Goals:**
- ✅ Smooth transitions and animations
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Proper ARIA labels and roles
- ✅ High contrast colors (7:1 minimum)
- ✅ Pulse animation for "building" states

**Tasks:**

1. **Add animations**:
   - Smooth scroll with `scrollIntoView({ behavior: 'smooth' })`
   - Fade-in for new summaries/keypoints
   - Scale animation on selection

2. **Keyboard support**:
   - Tab through summaries and keypoints
   - Enter to select
   - Escape to go back to current

3. **ARIA attributes**:
   - `role="navigation"` on columns
   - `aria-selected` on selected items
   - `aria-label` on interactive elements

4. **Polish**:
   - Add pulse animation for "Building..." states
   - Smooth color transitions
   - Loading states if data is async

---

## Testing Checklist

### Functionality
- [ ] Click summary → Keypoints update
- [ ] Click keypoint → Messages scroll to context
- [ ] "Back to current" → Returns to building state
- [ ] Chat input disabled when viewing old context
- [ ] "Continue from here" makes old context active
- [ ] [+ New] button starts fresh conversation

### Visual
- [ ] Selected states clearly visible
- [ ] Hover states work smoothly
- [ ] Building states have pulse animation
- [ ] Columns scroll independently
- [ ] High contrast throughout (7:1 ratio)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] All tap targets ≥ 48px
- [ ] Focus indicators visible
- [ ] ARIA labels present

### Edge Cases
- [ ] Empty summaries list
- [ ] Empty keypoints list
- [ ] Very long summary titles
- [ ] Many keypoints (overflow scroll)
- [ ] Rapid clicking doesn't break state

---

## Success Criteria

✅ **Layout**: Three columns render correctly on desktop
✅ **Navigation**: Click summaries/keypoints to navigate
✅ **Context switching**: Can view old conversations and return
✅ **Visual clarity**: Selected states obvious, high contrast
✅ **Accessibility**: Keyboard nav, ARIA labels, 48px targets
✅ **Performance**: Smooth scrolling and transitions
✅ **Elderly-friendly**: Simple, predictable, forgiving

---

## Next Session Commands

```bash
# Start dev server
cd apps/client && npm run dev

# Open in browser
open http://localhost:5173

# Run TypeScript check
npm run type-check

# Run linter
npm run lint
```

---

## Notes for Implementation

### Key Insights:
1. **Simplicity over features**: Don't add complexity elderly users won't use
2. **Visual feedback**: Every click should have clear visual response
3. **Forgiving UX**: Easy to undo, hard to break
4. **Spatial consistency**: Columns always in same position

### Common Pitfalls:
- ❌ Don't make columns too narrow (min 240px/280px)
- ❌ Don't use thin borders (2px minimum)
- ❌ Don't skip loading states (users need feedback)
- ❌ Don't forget to disable chat when viewing old context

### Design Philosophy:
- **Everything visible**: No hidden menus or modals
- **Click to navigate**: Simple cause-and-effect
- **One active context**: Never confusing which conversation is active
- **Progressive building**: History grows naturally over time

---

**Ready to build!** 🚀

Start with Phase 1 (core layout), verify it works, then move to Phase 2 (state management), then Phase 3 (polish).
