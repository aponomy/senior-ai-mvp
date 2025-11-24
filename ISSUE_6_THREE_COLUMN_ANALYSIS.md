# Issue 6: Funktioner - Workflow Skeletons in Three-Column Architecture

## Executive Summary

This issue introduces **Funktioner** - structured workflow skeletons with progressive information disclosure for guided task completion (e.g., Bank Transfers, Image Generation, Calendar Management, Health Tracking).

**Key Design**: Funktioner integrate seamlessly with our three-column architecture. The workflow skeleton doesn't replace any columns - it becomes a **fourth spatial element** that appears contextually when Functions execute or are reviewed.

---

## 🎯 Core Integration: How They Work Together

### The Four-Space Model

```
┌────────────┬─────────────┬──────────────────┬─────────────────┐
│  SUMMARY   │  KEYPOINT   │  CONVERSATION    │   FUNKTION      │
│  COLUMN    │  COLUMN     │  COLUMN          │   CANVAS        │
│  (240px)   │  (280px)    │  (flex 1fr)      │   (overlay/4th) │
├────────────┼─────────────┼──────────────────┼─────────────────┤
│            │             │                  │                 │
│ REGULAR    │ When user   │ Messages flow    │ When Function   │
│ FUNCTIONS  │ selects a   │ with separators: │ executes:       │
│ META       │ Function    │                  │                 │
│            │ summary:    │ ─── Bank ───     │ ┌─────────────┐ │
│ 💳 Bank    │─────────────┼─>💳 Processing   │ │ BANK        │ │
│ 3 sec ago  │ Key points  │  ✓ Complete      │ │ SKELETON    │ │
│ • Verify   │ of that     │ ─── Back ───     │ │             │ │
│ • Process  │ transaction │                  │ │ ☑ Balance   │ │
│            │ appear here │ User continues   │ │ ▶ Transfer  │ │
│            │             │                  │ │ ○ Advice    │ │
│            │             │                  │ └─────────────┘ │
└────────────┴─────────────┴──────────────────┴─────────────────┘
```

**When NOT executing a Function**: 3 columns (as designed)
**When executing a Function**: 3 columns + Function Canvas (overlay or 4th space)

---

## ✅ How Funktioner Enhance Three-Column UX

### 1. Function Category Gets Rich Workflow Detail

**What the three-column system provides**: 
- Function messages separated with green dividers in conversation
- Function summaries in left column: "💳 Bank • 3 sec ago"
- Function key points in middle column when selected

**What Funktioner add**:
- Function summaries display workflow progress (which steps completed)
- Key points show each step with results
- Visual skeleton shows structured workflow
- Conversation column shows contextual messages with tool execution details

**Example Enhancement:**

```
SUMMARY COLUMN (Left)
═══FUNCTIONS═══
┌────────────────┐
│ 💳 Bank Trans  │ 🔀 (can branch from here)
│ 2 min ago      │
│ ☑ Balance      │ ← Workflow summary
│ ☑ Verify       │
│ ☑ Transfer     │
│ ✓ Complete     │
└────────────────┘

KEYPOINT COLUMN (Middle) - When selected:
┌────────────────┐
│ • Check Balance│ → Messages: "Your balance is 3,450 kr"
│   ✓ 3,450 kr   │
│                │
│ • Verify Recip │ → Messages: "Recipient verified"
│   ✓ Valid      │
│                │
│ • Transfer 500 │ → Messages: "Transfer complete"
│   ✓ TX-12345   │
└────────────────┘

CONVERSATION COLUMN (Right):
Shows the conversational flow WITH function messages:
User: "I need to pay my rent"
─────────── Bank Transaction ───────────
🔧 Checking balance...
✓ Balance: 3,450 kr
AI: "You have enough. Proceed?"
User: "Yes"
🔧 Verifying recipient...
✓ Recipient verified
🔧 Processing transfer...
✓ Transfer complete • TX-12345
─────────── Back to conversation ───────
User: "Great! Thanks"
```

### 2. Function Canvas as Fourth Space

**When a Function is ACTIVELY executing** (not just reviewing past executions):

```
Option A: Overlay (Recommended for MVP)
┌────────────────────────────────────────────────────────────┐
│  [3 columns compressed to left, canvas overlays right]     │
│                                                            │
│  ┌────┬─────┬────────┬────────────────────────────────┐   │
│  │Sum │ Key │  Conv  │    FUNCTION CANVAS             │   │
│  │    │     │        │  ┌──────────────────────────┐  │   │
│  │💳  │     │[msgs]  │  │ Bank Transaction     [✕] │  │   │
│  │Bank│     │        │  ├──────────────────────────┤  │   │
│  │    │     │        │  │                          │  │   │
│  │    │     │        │  │ ☑ [1] Check Balance      │  │   │
│  │    │     │        │  │      ✓ 3,450 kr         │  │   │
│  │    │     │        │  │      ↓                   │  │   │
│  │    │     │        │  │ ▶ [2] Make Transfer      │  │   │
│  │    │     │        │  │      ⏳ Processing...     │  │   │
│  │    │     │        │  │      Amount: 500 kr     │  │   │
│  │    │     │        │  │      To: Savings        │  │   │
│  │    │     │        │  │      ↓                   │  │   │
│  │    │     │        │  │ ○ [3] Get Receipt       │  │   │
│  │    │     │        │  │                          │  │   │
│  │    │     │        │  └──────────────────────────┘  │   │
│  └────┴─────┴────────┴────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘

Option B: Fourth Column (Desktop only)
┌────┬─────┬──────┬───────────────┐
│Sum │ Key │ Conv │  SKELETON     │
│    │     │      │  [Workflow]   │
└────┴─────┴──────┴───────────────┘
```

**Design Decision**: 
- **Mobile**: Canvas overlays (full screen or bottom sheet)
- **Tablet**: Canvas overlays conversation column
- **Desktop**: Canvas can be 4th column OR overlay

### 3. Transaction Grouping Maps to Summaries

**The Transaction Concept** perfectly maps to Function Summaries:

```typescript
// Function summary = Transaction wrapper
interface FunctionSummary extends ConversationSummary {
  category: 'function';
  
  // Transaction metadata
  transaction: {
    type: 'bank_transfer' | 'image_generation' | 'calendar_booking';
    status: 'completed' | 'failed' | 'pending';
    startTime: Date;
    endTime: Date;
    duration: number;
    
    // Before/after state
    before?: Record<string, any>;
    after?: Record<string, any>;
    
    // Reference/receipt
    reference?: string;
  };
  
  // Workflow progress
  workflow: {
    skeletonId: string;          // Which skeleton was used
    completedSteps: string[];    // Step IDs
    currentStep?: string;
    failedStep?: string;
    totalSteps: number;
  };
}
```

---

## 🔄 Critical Design Decisions

### 1. ❌ Skeleton Does NOT Replace Column 1

**Important**: The workflow skeleton is supplementary, not a replacement for the summary column

```
❌ WRONG: Skeleton replaces summary column
┌──────────────┬─────────────────┐
│  SKELETON    │  TIMELINE       │
│  [Actions]   │  [Messages]     │
└──────────────┴─────────────────┘

✅ RIGHT: Skeleton complements three columns
┌──────┬────────┬──────────┬─────────────┐
│ Sum  │ Key    │ Conv     │ Skeleton    │
│      │        │          │ (when func) │
└──────┴────────┴──────────┴─────────────┘
```

**Why**: 
- Summary column provides navigation across ALL conversation types
- Skeleton is temporary, only during Function execution
- User needs to see Functions in context with Regular and Meta conversations

### 2. ⚡ Skeleton Appears Contextually

**When to show workflow skeleton**:
- ✅ Function is actively executing (user triggered action)
- ✅ User clicks "View workflow" on completed Function summary
- ❌ NOT when simply viewing Function messages in conversation column
- ❌ NOT when Function summary appears in column 1 but is unselected

**State Management**:
```typescript
interface FunctionUIState {
  mode: 'inactive' | 'active' | 'review';
  
  // inactive: Function summary in column 1, skeleton hidden
  // active: Function executing NOW, skeleton visible
  // review: User clicked to see workflow, skeleton visible
  
  skeletonVisible: boolean;
  skeletonPosition: 'overlay' | 'fourth-column' | 'fullscreen';
  
  // Which function
  functionId: string;
  skeletonId: string;
  
  // Current progress
  currentStepId: string;
  completedSteps: string[];
}
```

### 3. 🎨 Visual Design: Integration Not Replacement

**Layout Options for Active Function**:

```
Option A: Overlay Conversation Column (Recommended)
┌────────────┬───────────┬─────────────────────────────────┐
│  SUMMARY   │ KEYPOINT  │     FUNCTION CANVAS             │
│            │           │  (overlays conversation col)    │
│  Shows     │ Shows     │  ┌───────────────────────────┐  │
│  Function  │ workflow  │  │ 💳 Bank Transaction   [✕] │  │
│  summary   │ steps as  │  │                           │  │
│  like any  │ key       │  │  SKELETON HERE            │  │
│  other     │ points    │  │  [Interactive workflow]   │  │
│            │           │  │                           │  │
│            │           │  │  [Close] returns to       │  │
│            │           │  │  conversation view        │  │
│            │           │  └───────────────────────────┘  │
└────────────┴───────────┴─────────────────────────────────┘

Option B: Conversation Column Shows Skeleton Inline
┌────────────┬───────────┬─────────────────────────────────┐
│  SUMMARY   │ KEYPOINT  │     CONVERSATION                │
│            │           │                                 │
│  Function  │ Workflow  │  User: "Pay rent"               │
│  summary   │ steps     │  ──────────────────             │
│            │           │  [SKELETON EMBEDDED]            │
│            │           │  ☑ Balance check                │
│            │           │  ▶ Transfer (processing...)     │
│            │           │  ○ Receipt                      │
│            │           │  ──────────────────             │
│            │           │  ✓ Complete! TX-12345           │
│            │           │  ──────────────────             │
│            │           │  User: "Thanks!"                │
└────────────┴───────────┴─────────────────────────────────┘

Option C: Fourth Column (Desktop, Large Screens)
┌────────┬───────┬──────────┬────────────────────┐
│SUMMARY │ KEY   │ CONV     │  FUNCTION CANVAS   │
│        │       │          │  [Full skeleton]   │
│Function│Steps  │Messages  │  ☑ Step 1          │
│summary │       │with AI   │  ▶ Step 2 (active) │
│        │       │responses │  ○ Step 3          │
│        │       │          │                    │
└────────┴───────┴──────────┴────────────────────┘
```

**Recommendation**: Start with **Option B** (inline) for MVP, add **Option A** (overlay) for complex workflows.

### 4. 📱 Responsive Design Considerations

**Mobile** (< 768px):
- Only show conversation column during Function
- Skeleton overlays full screen
- Swipe to dismiss, returns to conversation
- Progress indicator at top

**Tablet** (768px - 1024px):
- Summary column collapses to icons
- Skeleton overlays conversation + keypoint
- OR use bottom sheet for skeleton

**Desktop** (> 1024px):
- All options available
- Prefer Option C (fourth column) for large screens
- Option A (overlay) for standard desktop

### 5. 🔀 Branching Integration

**Critical**: Funktioner MUST support branching from three-column UI

**Where users can branch from Function summaries**:

```
SUMMARY COLUMN
═══FUNCTIONS═══
┌────────────────┐
│ 💳 Bank Trans  │ 🔀 ← Right-click here
│ ☑ Verified     │      "Try different amount"
│ ☑ Transferred  │      "What if I cancel?"
└────────────────┘

KEYPOINT COLUMN (when Function selected)
┌────────────────┐
│ • Transfer 500 │ 🔀 ← Right-click here
│   to Savings   │      "Try 1000 instead"
│                │      "Different account"
└────────────────┘
```

**Branching scenarios for Funktioner**:

1. **Before confirmation**: "What if I transfer different amount?"
2. **After completion**: "What if I had chosen option B?"
3. **At any step**: "Explore alternative path"

**Implementation**:
```typescript
// Function summaries support branching like any other
interface FunctionSummary extends ConversationSummary {
  category: 'function';
  
  // Standard branching support
  isBranchPoint: boolean;
  branchPointId: string | null;
  
  // Function-specific: Which step to branch from
  branchableSteps: string[];  // Step IDs where branching makes sense
}

// Example: Bank transfer
branchableSteps: [
  'amount_selection',    // Before confirming amount
  'recipient_selection', // Before confirming recipient
  'after_verification'   // After seeing what would happen
]
```

---

## 🎨 Revised Visual Design: Funktioner in Three-Column Context

### Scenario 1: User Triggers Bank Function

```
STEP 1: User in normal conversation
┌──────────┬───────────┬─────────────────────────────────┐
│ SUMMARY  │ KEYPOINT  │ CONVERSATION                    │
├──────────┼───────────┼─────────────────────────────────┤
│          │           │                                 │
│ 🍰 Baking│ Current   │ User: "I need to pay my rent"  │
│          │ • Recipe  │                                 │
│ 🛒 Shop  │ • Ingred  │ AI: "I can help you with that. │
│          │           │      How much is your rent?"    │
│          │           │                                 │
│          │           │ User: "8,500 kr"                │
│          │           │                                 │
│          │           │ [Chat Input]                    │
└──────────┴───────────┴─────────────────────────────────┘

STEP 2: AI recognizes function needed, shows separator
┌──────────┬───────────┬─────────────────────────────────┐
│ SUMMARY  │ KEYPOINT  │ CONVERSATION                    │
├──────────┼───────────┼─────────────────────────────────┤
│          │           │                                 │
│ 🍰 Baking│           │ User: "8,500 kr"                │
│          │           │                                 │
│ 🛒 Shop  │           │ ─────── Bank Transaction ─────  │
│          │           │                                 │
│          │           │ AI: "I'll help you transfer     │
│          │           │      8,500 kr. First, let me    │
│          │           │      check your balance..."     │
│          │           │                                 │
│          │           │ 🔧 Checking balance...          │
│          │           │                                 │
└──────────┴───────────┴─────────────────────────────────┘

STEP 3: Function executing - skeleton appears
┌──────────┬───────────┬──────────────┬──────────────────┐
│ SUMMARY  │ KEYPOINT  │ CONV         │ FUNCTION CANVAS  │
├──────────┼───────────┼──────────────┼──────────────────┤
│          │           │              │                  │
│ 🍰 Baking│ (Building)│ User: 8500kr │ 💳 Bank Payment  │
│          │           │ ────────     │ ┌──────────────┐ │
│ 🛒 Shop  │           │ 🔧 Balance   │ │☑ Check Balance│ │
│          │           │ ✓ 11,200 kr  │ │  ✓ 11,200 kr  │ │
│          │           │              │ │      ↓        │ │
│ (Building│           │ AI: You have │ │▶ Verify       │ │
│  summary)│           │ enough. Show │ │  ⏳ Checking...│ │
│          │           │ recipient?   │ │      ↓        │ │
│          │           │              │ │○ Transfer     │ │
│          │           │              │ │      ↓        │ │
│          │           │              │ │○ Receipt      │ │
│          │           │              │ └──────────────┘ │
│          │           │              │ [Close/Minimize] │
└──────────┴───────────┴──────────────┴──────────────────┘

STEP 4: Function completes, summary appears in column 1
┌──────────┬───────────┬─────────────────────────────────┐
│ SUMMARY  │ KEYPOINT  │ CONVERSATION                    │
├──────────┼───────────┼─────────────────────────────────┤
│          │           │                                 │
│ 🍰 Baking│ Current   │ User: "8,500 kr"                │
│          │           │ ─────── Bank Transaction ─────  │
│ 🛒 Shop  │           │ 🔧 Balance check ✓              │
│          │           │ 🔧 Verification ✓               │
│══Func══  │           │ 🔧 Transfer ✓                   │
│ 💳 Bank  │🔀        │ ✓ Complete! TX-12345            │
│ 2 min ago│           │ ─────── Back to convo ───────   │
│ ☑ Balance│           │                                 │
│ ☑ Verify │           │ AI: "Done! Your new balance:    │
│ ☑ Transf │           │      2,700 kr"                  │
│ ✓ 8500kr │           │                                 │
│          │           │ User: "Thank you!"              │
│          │           │                                 │
│          │           │ [Chat Input]                    │
└──────────┴───────────┴─────────────────────────────────┘

STEP 5: User clicks Function summary to review
┌──────────┬───────────┬─────────────────────────────────┐
│ SUMMARY  │ KEYPOINT  │ CONVERSATION                    │
├──────────┼───────────┼─────────────────────────────────┤
│          │           │                                 │
│══Func══  │ 💳 Bank   │ [← Back to current]             │
│ 💳 Bank  │ Payment   │                                 │
│ (Selected)│          │ User: "8,500 kr"                │
│ 2 min ago│ • Balance │ ─────── Bank Transaction ─────  │
│          │   ✓ OK    │ 🔧 Checking balance...          │
│          │           │ ✓ Balance: 11,200 kr            │
│          │ • Verify  │ AI: "Enough funds available"    │
│          │   ✓ Valid │                                 │
│          │           │ 🔧 Verifying recipient...       │
│          │ • Transf  │ ✓ Landlord account verified     │
│          │   ✓ Done  │ AI: "Ready to transfer. OK?"    │
│          │           │ User: "Yes"                     │
│          │ • Receipt │ 🔧 Processing transfer...       │
│          │   TX-1234 │ ✓ Transfer complete • TX-12345  │
│          │           │ ─────── Back to convo ───────   │
│          │           │ AI: "All done! Receipt sent."   │
│          │           │                                 │
│          │           │ [View Workflow] ← Opens skeleton│
└──────────┴───────────┴─────────────────────────────────┘
```

---

## 🏗️ Technical Implementation Changes

### 1. Data Model Integration

```typescript
// Extend ConversationSummary for Functions
interface FunctionSummary extends ConversationSummary {
  category: 'function';
  
  // Link to Funktion skeleton
  funktionId: string;              // e.g., 'bank-transfer'
  skeletonId: string;              // e.g., 'bank-transfer-v1'
  
  // Workflow state
  workflow: {
    status: 'pending' | 'executing' | 'completed' | 'failed';
    currentStepId: string | null;
    completedSteps: string[];
    failedStepId: string | null;
    
    // Step results for display
    stepResults: Record<string, any>;
    
    // Timing
    startedAt: Date;
    completedAt: Date | null;
    duration: number | null;
  };
  
  // Transaction data (as in Issue 6)
  transaction: {
    type: string;
    reference: string;
    before: Record<string, any>;
    after: Record<string, any>;
  };
  
  // Branching support
  isBranchPoint: boolean;
  branchPointId: string | null;
  branchableSteps: string[];
}

// Funktion skeleton definition (from Issue 6)
interface FunktionSkeleton {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'bank' | 'image' | 'calendar' | 'health' | 'shopping';
  
  // Visual representation
  layout: 'linear' | 'branching' | 'loop';
  
  // Steps in workflow
  steps: SkeletonStep[];
  
  // Relationships between steps
  flow: StepFlow[];
  
  // UI configuration
  ui: {
    displayMode: 'overlay' | 'inline' | 'fourth-column';
    primaryColor: string;
    progressIndicator: 'steps' | 'percentage' | 'timeline';
  };
}

interface SkeletonStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  
  // Execution
  requiredTools: string[];
  estimatedDuration: number;
  requiresConfirmation: boolean;
  
  // Branching
  canBranchFrom: boolean;          // Can user branch from this step?
  branchPrompt?: string;           // "Try different amount?"
  
  // UI
  successMessage: string;
  failureMessage: string;
  loadingMessage: string;
}

interface StepFlow {
  from: string;              // Step ID
  to: string;                // Step ID  
  type: 'sequential' | 'branch' | 'parallel' | 'loop';
  condition?: string;        // When this flow applies
  label?: string;            // For branching: "Domestic" vs "International"
}
```

### 2. UI State Management

```typescript
// Dashboard context extension
interface DashboardState {
  // Existing three-column state
  activeColumn: 'summary' | 'keypoint' | 'conversation';
  selectedSummaryId: string | null;
  selectedKeyPointId: string | null;
  
  // NEW: Function canvas state
  functionCanvas: {
    visible: boolean;
    mode: 'overlay' | 'inline' | 'fourth-column';
    
    // Active function
    activeFunctionId: string | null;
    activeSkeletonId: string | null;
    
    // Execution state
    isExecuting: boolean;
    currentStepId: string | null;
    completedSteps: string[];
    
    // Layout
    position: 'right' | 'fullscreen' | 'bottom-sheet';
    width?: number;             // For fourth-column mode
  };
}

// Actions
type DashboardAction = 
  | { type: 'START_FUNCTION'; funktionId: string; skeletonId: string }
  | { type: 'UPDATE_FUNCTION_STEP'; stepId: string; status: 'executing' | 'completed' | 'failed' }
  | { type: 'COMPLETE_FUNCTION'; results: any }
  | { type: 'SHOW_FUNCTION_REVIEW'; summaryId: string }
  | { type: 'HIDE_FUNCTION_CANVAS' }
  | { type: 'BRANCH_FROM_FUNCTION_STEP'; stepId: string }
  // ... existing actions
```

### 3. Component Architecture

```
apps/client/src/components/
├── funktioner/
│   ├── FunctionCanvas.tsx           ← New: Container for skeleton
│   ├── FunctionSkeleton.tsx         ← New: Renders workflow
│   ├── FunctionStep.tsx             ← New: Individual step
│   ├── FunctionProgress.tsx         ← New: Progress indicator
│   ├── FunctionBranchMenu.tsx       ← New: Branch options
│   └── skeletons/
│       ├── BankSkeleton.tsx         ← Specific implementations
│       ├── ImageGenSkeleton.tsx
│       ├── CalendarSkeleton.tsx
│       └── HealthSkeleton.tsx
│
├── conversation/
│   ├── FunctionSummaryCard.tsx      ← Update: Add workflow preview
│   ├── FunctionSeparator.tsx        ← New: Enhanced separator
│   └── MessageComponents.tsx        ← Update: Tool call display
│
└── Dashboard.tsx                     ← Update: Function canvas integration
```

---

## 📋 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
**Goal**: Function summaries work in three-column system

- [ ] Extend `ConversationSummary` for Functions (add workflow state)
- [ ] Update summary detection to recognize Function execution
- [ ] Function separator styling (green with icon)
- [ ] Function summary card with workflow preview
- [ ] Key points extraction from function steps
- [ ] Store function execution in database with workflow state

**Deliverable**: Functions appear as summaries with basic workflow info

### Phase 2: Skeleton Data Model (Week 2-3)
**Goal**: Define and store skeleton configurations

- [ ] `FunktionSkeleton` data structure
- [ ] `SkeletonStep` and `StepFlow` types
- [ ] Skeleton registry (define available Funktioner)
- [ ] Basic skeleton definitions (Bank, Image Gen)
- [ ] Skeleton-to-summary linking

**Deliverable**: Skeleton definitions ready to render

### Phase 3: Function Canvas - Inline Mode (Week 3-4)
**Goal**: Skeleton appears in conversation column

- [ ] `FunctionCanvas` component (container)
- [ ] `FunctionSkeleton` component (renders steps)
- [ ] `FunctionStep` component (individual step)
- [ ] Inline embedding in conversation column
- [ ] Progress indicator
- [ ] Step status display (pending/executing/completed/failed)

**Deliverable**: Skeleton shows in conversation during function

### Phase 4: Function Canvas - Overlay Mode (Week 4-5)
**Goal**: Skeleton can overlay for complex functions

- [ ] Overlay positioning logic
- [ ] Responsive sizing (mobile/tablet/desktop)
- [ ] Close/minimize functionality
- [ ] Transition animations
- [ ] Overlay vs inline mode switching

**Deliverable**: Complex functions can show detailed skeleton

### Phase 5: Review Mode (Week 5-6)
**Goal**: View completed function workflow

- [ ] "View workflow" button on function summaries
- [ ] Historical skeleton rendering (show what happened)
- [ ] Step results display
- [ ] Transaction details (before/after states)
- [ ] Export/print receipt functionality

**Deliverable**: Users can review past function executions

### Phase 6: Branching Integration (Week 6-7)
**Goal**: Branch from function steps

- [ ] Mark branchable steps in skeleton
- [ ] Right-click menu on function summaries
- [ ] Right-click menu on key points (function category)
- [ ] Branch creation from specific step
- [ ] Copy function context up to branch point
- [ ] Branch visualization for functions

**Deliverable**: Users can explore "what if" in functions

### Phase 7: Specific Funktioner (Week 7-10)
**Goal**: Implement real-world skeletons

**Bank Transfer** (Week 7):
- [ ] Skeleton definition
- [ ] Tool integrations (balance check, transfer, receipt)
- [ ] Confirmation steps
- [ ] Success/failure handling
- [ ] Branch points (amount, recipient)

**Image Generation** (Week 8):
- [ ] Skeleton definition
- [ ] Long-running process handling
- [ ] Progress updates (0-100%)
- [ ] Preview display
- [ ] Regeneration loop
- [ ] Branch points (style, parameters)

**Calendar** (Week 9):
- [ ] Skeleton definition
- [ ] Calendar API integration
- [ ] Event creation/editing
- [ ] Reminder setup
- [ ] Branch points (time, date, participants)

**Health Tracker** (Week 10):
- [ ] Skeleton definition
- [ ] Measurement recording
- [ ] Data visualization
- [ ] Sharing functionality
- [ ] Branch points (measurement type)

### Phase 8: Polish & UX (Week 11-12)
**Goal**: Elderly-friendly refinements

- [ ] Large touch targets on skeleton steps
- [ ] Clear visual feedback on each step
- [ ] Simple confirmation dialogs
- [ ] Error recovery flows
- [ ] Help text and tooltips
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] User testing with elderly users

---

## 🎨 Design Specifications for Developers

### Function Separator in Conversation Column

```tsx
// Enhanced separator with function icon
<FunctionSeparator
  type="function"
  label="Bank Transaction"
  icon="💳"
  status="executing" | "completed" | "failed"
  showWorkflow={true}  // Show mini workflow preview
  onViewWorkflow={() => openFunctionCanvas()}
/>

// CSS
.function-separator {
  border-color: var(--function-green);
  background: linear-gradient(90deg, 
    transparent, 
    var(--function-green-10), 
    transparent
  );
}
```

### Function Summary Card in Column 1

```tsx
<FunctionSummaryCard
  summary={functionSummary}
  workflow={{
    steps: ['Balance', 'Verify', 'Transfer', 'Receipt'],
    completed: ['Balance', 'Verify', 'Transfer'],
    current: 'Receipt'
  }}
  transaction={{
    amount: '8,500 kr',
    status: 'completed',
    reference: 'TX-12345'
  }}
  onBranch={() => createBranchFromFunction()}
  canBranch={true}
/>
```

### Function Canvas Overlay

```tsx
<FunctionCanvas
  mode="overlay"
  skeleton={bankTransferSkeleton}
  state={{
    completedSteps: ['balance', 'verify'],
    currentStep: 'transfer',
    executing: true
  }}
  onClose={() => minimizeCanvas()}
  onStepComplete={(stepId, result) => handleStepComplete(stepId, result)}
  onBranchFromStep={(stepId) => createBranch(stepId)}
/>

// CSS
.function-canvas {
  position: fixed;
  right: 20px;
  top: 80px;
  bottom: 20px;
  width: min(400px, calc(100vw - 800px)); // Adapt to screen
  background: var(--glass-background);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 100;
}
```

---

## 🚨 Critical Integration Points

### 1. When to Trigger Function Canvas

```typescript
// In conversation flow
async function handleUserMessage(message: string) {
  const response = await sendToAI(message);
  
  // Check if AI wants to execute a function
  if (response.toolCalls && response.toolCalls.length > 0) {
    const funktionId = determineFunktionType(response.toolCalls);
    
    if (funktionId) {
      // Show function separator
      addSeparator('function', getFunktionLabel(funktionId));
      
      // Open function canvas
      dispatch({ 
        type: 'START_FUNCTION', 
        funktionId,
        skeletonId: getSkeletonForFunktion(funktionId)
      });
      
      // Execute workflow
      await executeWorkflow(funktionId, response.toolCalls);
    }
  }
}
```

### 2. Workflow Execution with Skeleton Updates

```typescript
async function executeWorkflow(
  funktionId: string, 
  toolCalls: ToolCall[]
) {
  const skeleton = getSkeletonDefinition(funktionId);
  const steps = skeleton.steps;
  
  for (const step of steps) {
    // Update UI: show step as executing
    dispatch({
      type: 'UPDATE_FUNCTION_STEP',
      stepId: step.id,
      status: 'executing'
    });
    
    // Execute tools for this step
    const results = await executeStepTools(step, toolCalls);
    
    // Update UI: show step as completed
    dispatch({
      type: 'UPDATE_FUNCTION_STEP',
      stepId: step.id,
      status: 'completed',
      results
    });
    
    // Add message to conversation
    addMessage({
      role: 'assistant',
      content: formatStepResult(step, results),
      category: 'function',
      toolCall: { name: step.requiredTools[0], result: results }
    });
    
    // Check if user needs to confirm before next step
    if (step.requiresConfirmation) {
      const confirmed = await askUserConfirmation(step);
      if (!confirmed) break;
    }
  }
  
  // Workflow complete
  dispatch({ type: 'COMPLETE_FUNCTION', results: allResults });
  
  // Create summary
  await createFunctionSummary(funktionId, steps, allResults);
}
```

### 3. Function Summary Creation

```typescript
async function createFunctionSummary(
  funktionId: string,
  steps: SkeletonStep[],
  results: any
): Promise<FunctionSummary> {
  
  const summary: FunctionSummary = {
    id: generateId(),
    conversationId: currentConversation.id,
    branchId: currentBranch.id,
    category: 'function',
    
    // Display
    title: generateFunctionTitle(funktionId, results),
    icon: getFunktionIcon(funktionId),
    
    // Workflow
    workflow: {
      status: 'completed',
      completedSteps: steps.map(s => s.id),
      stepResults: results,
      startedAt: workflowStartTime,
      completedAt: new Date(),
      duration: Date.now() - workflowStartTime
    },
    
    // Transaction
    transaction: extractTransactionData(results),
    
    // Key points from steps
    keyPoints: steps.map(step => ({
      id: generateId(),
      summaryId: '', // Set by parent
      branchId: currentBranch.id,
      text: formatStepAsKeyPoint(step, results),
      messageIds: getMessagesForStep(step.id),
      position: step.position,
      
      // Branching
      isBranchPoint: step.canBranchFrom,
      branchPointId: null
    })),
    
    // Messages
    startMessageId: firstFunctionMessageId,
    endMessageId: lastFunctionMessageId,
    messageCount: functionMessages.length,
    
    summaryText: generateSummaryText(funktionId, steps, results),
    position: calculatePosition(),
    
    // Branching
    isBranchPoint: true,  // Functions are always branchable
    branchPointId: null,
    branchableSteps: steps
      .filter(s => s.canBranchFrom)
      .map(s => s.id),
    
    createdAt: new Date()
  };
  
  // Save to database
  await saveFunctionSummary(summary);
  
  // Update UI: show in summary column
  dispatch({ type: 'ADD_SUMMARY', summary });
  
  return summary;
}
```

---

## 💡 Key Innovations

### 1. Functions Become Navigable History

Each function execution becomes a summary in the left column with full timeline, branchable and reviewable just like regular conversations.

### 2. Skeleton Shows Both Past and Future

The workflow skeleton displays:
- What WAS done (completed steps with results)
- What CAN be done next (available steps)
- Current progress (which step is executing)

### 3. Functions Inline with Conversation Flow

Functions execute within the conversation, not as separate modal experiences. The three-category system (Regular/Function/Meta) keeps everything organized.

### 4. Branching Enables "What-If" for Actions

Users can explore alternatives:
- **User**: "I transferred 500 kr... what if I had transferred 1000?"
- **System**: Branch from "Amount selection" step, explore alternative without losing original

---

## 📊 Success Metrics

### UX Metrics (Elderly Users)

- **Function Understanding**: >85% understand skeleton without explanation
- **Navigation**: Can find past function execution in <15 seconds
- **Branching**: >70% discover branching from functions
- **Confidence**: >90% feel confident executing functions

### Technical Metrics

- **Skeleton Render**: <100ms to show skeleton
- **Step Update**: <50ms to update step status
- **Function Summary**: <3s to create after completion
- **Canvas Transition**: <200ms smooth animation

### Feature Adoption

- **Functions Used**: >60% of users try at least one function
- **Review Rate**: >40% view completed function workflow
- **Branch Rate**: >20% branch from function step
- **Repeat Usage**: >80% use same function again

---

## 🎯 Summary: Funktioner in Three-Column Architecture

### Key Design Principles
1. **Fourth Space**: Skeleton complements three columns, doesn't replace them
2. **Contextual Display**: Skeleton appears during execution or on review, not always visible
3. **Flexible Layout**: Multiple options (inline, overlay, fourth-column) based on complexity and screen size
4. **Responsive Design**: Adapt presentation for mobile, tablet, and desktop
5. **Branching Support**: Functions integrate with branching system for "what-if" exploration

### Core Features
1. **Structured Workflows**: Function category in summaries shows actual workflow progress
2. **Transaction Records**: Each function execution creates before/after state snapshot
3. **Progressive Detail**: Navigate from summary → key points → full workflow skeleton
4. **Integrated Navigation**: Functions appear naturally in three-column interface
5. **Non-Disruptive**: Skeleton provides detail without interrupting conversation flow

### Implementation Components
1. **Workflow Skeleton**: Visual step-by-step representation of function
2. **Guided Execution**: User follows clear steps with confirmations
3. **Tool Visualization**: See each tool call and result in real-time
4. **Progress Tracking**: Know exactly where you are in multi-step process
5. **State Recording**: Before/after snapshots for transaction audit trail

---

## 🚀 Recommendation

**Start with Phase 1-3** (Weeks 1-4):
- Get function summaries working in three columns
- Show basic skeleton inline in conversation
- Prove the integration before building complex overlays

**Then Phase 4-6** (Weeks 4-7):
- Add overlay mode for complex functions
- Implement review mode
- Integrate branching

**Finally Phase 7-8** (Weeks 7-12):
- Build real Funktioner (Bank, Image, Calendar)
- Polish for elderly users
- User testing and refinement

This approach validates the integration early and builds complexity gradually.

---

## Labels
- `enhancement`
- `funktioner`
- `three-column`
- `workflow`
- `ux-design`
- `integration`

## Priority
**High** - Core feature that leverages three-column architecture

## Related Issues
- #2 (Three-Column UX) ✅
- #4 (Branching) ✅
- #5 (Backend) ✅
