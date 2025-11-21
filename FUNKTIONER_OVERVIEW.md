# Funktioner System Overview

## What Are Funktioner?

**Funktioner** (Functions) are structured, guided interaction workflows that combine:
1. **Workflow Skeleton** - A predefined sequence of actions and their relationships
2. **Progressive Information** - Conversation timeline with graduated summarization
3. **Tool Orchestration** - Coordinated execution of external tools and APIs
4. **Transaction Management** - Trackable, confirmable, reversible operations

Think of it as: **"Conversations with guardrails and progress indicators"**

## Core Concept

Traditional AI conversations are freeform and can be overwhelming for elderly users. Funktioner provide **structure without rigidity** - users know what's possible, where they are, and what happens next, while still interacting naturally with the AI.

### Visual Design Philosophy

```
┌────────────────────────────────────────────────┐
│  Fixed Workflow Skeleton (Background/Sidebar)  │
│  ↕                                              │
│  Progressive Timeline (Scrolling Foreground)   │
└────────────────────────────────────────────────┘
```

Users simultaneously see:
- **Structure**: Visual skeleton showing available actions and progress
- **History**: Conversation timeline with messages, tool calls, and results
- **Context**: Where they are in the workflow and what's next

## Funktioner vs Conversations

| Aspect | Conversations | Funktioner |
|--------|--------------|------------|
| **Structure** | Freeform | Guided workflow |
| **Visualization** | Timeline only | Skeleton + Timeline |
| **Goal** | Exploration, discussion | Task completion |
| **Actions** | Implicit in dialog | Explicit action steps |
| **Tool Use** | As needed | Orchestrated per action |
| **Progress** | Subjective | Objective (% complete) |
| **Branching** | User-initiated | Workflow-defined + user-initiated |
| **Completion** | Open-ended | Clear end state |

Both share:
- Progressive summarization (L1-L3)
- Tool call visibility
- Message history
- Accessibility focus

## Example Funktioner

### 1. Bank Account Management

**Skeleton**:
```
[1] Check Balance
     ↓
[2] View Transactions
     ↓
[3] Make Transfer
     ├→ Domestic
     └→ International
     ↓
[4] Get Financial Advice
     ↓
[5] Download Statement
```

**Timeline Shows**:
- User requests in natural language
- AI guidance between steps
- Tool calls (bank API)
- Transaction confirmations
- Results and receipts

**Key Features**:
- Every transfer is a tracked **transaction**
- Clear before/after states
- Confirmation required for transfers
- Reversible (within limits)

### 2. AI Image Generation

**Skeleton**:
```
[1] Describe Image
     ↓
[2] Choose Style
     ├→ Photo realistic
     ├→ Painting
     ├→ Cartoon
     └→ Abstract
     ↓
[3] Generate Image (⏳ Long-running)
     ↓
[4] Review & Edit
     ├→ Adjust details (↺ Loop)
     ├→ Regenerate (↺ Loop)
     └→ Keep & Continue
     ↓
[5] Save & Use Image
```

**Timeline Shows**:
- Conversation refining description
- Style selection dialog
- Generation progress (0-100%)
- Generated image preview
- Edit iterations (each creates visual record)
- Final saved image

**Key Features**:
- Progress bar during generation
- Can branch to try different styles simultaneously
- Each iteration saved in timeline
- Compare versions side-by-side

### 3. Calendar Management

**Skeleton**:
```
[1] View Calendar
     ├→ Today
     ├→ This Week
     └→ This Month
     ↓
[2] Create Event
     ↓
[3] Edit/Cancel Event
     ↓
[4] Set Reminder
     ↓
[5] Get Schedule Summary
```

**Timeline Shows**:
- Calendar tool calls
- Event details
- Confirmation dialogs
- Reminders set
- Schedule summaries

**Key Features**:
- Calendar API integration
- Multiple reminder options
- Easy event modification
- Natural language parsing

### 4. Health Tracking

**Skeleton**:
```
[1] Record Measurement
     ├→ Blood Pressure
     ├→ Blood Sugar
     ├→ Weight
     └→ Other
     ↓
[2] View History
     ↓
[3] Get Insights
     ↓
[4] Share with Doctor
```

**Timeline Shows**:
- Measurement entries
- Graphs and trends (tool generates)
- AI insights about patterns
- Share confirmations

**Key Features**:
- Data visualization tools
- Historical comparisons
- Privacy controls for sharing
- Export functionality

## User Experience Flow

### Starting a Funktion

**Entry Point**: User clicks "Bank Account" from Functions page

**Initial View**:
```
┌─────────────────────────────────────────────────────┐
│  Bank Account Management                      ✕     │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│  ACTIONS     │  🤖 Assistant: Welcome! I can help   │
│              │      you with your bank account.     │
│  ○ Balance   │                                       │
│  ○ Transact  │      What would you like to do?     │
│  ○ Transfer  │                                       │
│  ○ Advice    │  [Check Balance]                     │
│  ○ Statement │  [View Transactions]                 │
│              │  [Make Transfer]                     │
│              │  [Get Advice]                        │
│              │                                       │
│              │  Or just tell me what you need...    │
│              │  [Type here........................] │
└──────────────┴──────────────────────────────────────┘
```

### During Execution

**User says**: "What's my balance?"

```
┌─────────────────────────────────────────────────────┐
│  Bank Account Management                      ✕     │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│  ACTIONS     │  👤 User: What's my balance?         │
│              │  ───────────────────────────────      │
│  ▶ Balance   │  🤖 Assistant: Let me check...       │
│     ↓        │  ───────────────────────────────      │
│  ○ Transact  │  🔧 Bank API: Check Balance          │
│  ○ Transfer  │  ⏳ Connecting to bank...            │
│  ○ Advice    │                                       │
│  ○ Statement │                                       │
│              │  [Scroll for earlier messages]       │
└──────────────┴──────────────────────────────────────┘
```

**After tool completes**:

```
┌─────────────────────────────────────────────────────┐
│  Bank Account Management                      ✕     │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│  ACTIONS     │  👤 User: What's my balance?         │
│              │  ───────────────────────────────      │
│  ☑ Balance   │  🔧 Bank API: Check Balance          │
│     ↓        │  ✓ Success • 3,450 kr (0.8s)        │
│  → Transact  │  ───────────────────────────────      │
│  → Transfer  │  🤖 Assistant: Your checking account │
│  ○ Advice    │      has 3,450 kr available.         │
│  ○ Statement │                                       │
│              │      What would you like to do next? │
│              │  [View Transactions]                 │
│              │  [Make Transfer]                     │
│              │  [Type message....................]  │
└──────────────┴──────────────────────────────────────┘
```

**Legend**:
- ☑ = Completed
- ▶ = Currently active
- → = Available next
- ○ = Not yet available

## Progressive Summarization in Funktioner

As conversation grows, older messages summarize:

### Recent (L1 - Full Detail)
```
User: Transfer 500 kr to savings
─────────────────────────────
🔧 Bank API: Verify Account
✓ Savings account verified
─────────────────────────────
AI: Confirm: 500 kr to savings?
─────────────────────────────
User: Yes
─────────────────────────────
🔧 Bank API: Execute Transfer
✓ Complete • Ref: TX-12345
─────────────────────────────
AI: Transfer complete!
```

### Near-Recent (L2 - Condensed)
```
💭 [Blurred Box]
Transfer to savings completed
🔧 2 tool calls • ✓ Success
Result: 500 kr moved
Reference: TX-12345
```

### Older (L3 - Summary)
```
📦 [Solid Summary Box]
Bank Transfer Transaction
(Checking → Savings, 500 kr)
```

## Tool Calling in Funktioner

Tool calls are **central** and **visible**:

### Tool Call States

**Initiating**:
```
🔧 Bank API
⏳ Starting request...
```

**In Progress**:
```
🔧 Bank API: Execute Transfer
⏳ Processing transaction...
Est. 5 seconds remaining
```

**Success**:
```
🔧 Bank API: Execute Transfer
✓ Complete (4.2s)
Reference: TX-12345
New balance: 2,950 kr
[View Details]
```

**Failure**:
```
🔧 Bank API: Execute Transfer
✗ Failed
Error: Insufficient funds
Needed: 500 kr | Available: 450 kr
[Try Again] [Check Balance]
```

### Tool Call Categories

Different icons for different tool types:
- 🔍 **Search/Lookup**: Weather, facts, account info
- 💰 **Financial**: Transactions, balance checks
- 📅 **Calendar**: Event operations
- 🎨 **Generation**: Creating images, documents
- 📊 **Analysis**: Data processing
- 📱 **Communication**: Sending messages

### Chained Tool Calls

Some actions require multiple tools:

```
Action: International Transfer

🔧 Tool Chain (5 steps)
├─ 1. SWIFT Lookup → Verified ✓
├─ 2. Exchange Rate → 1 EUR = 11.45 kr ✓
├─ 3. Calculate Fees → 45 kr ✓
├─ 4. Verify Balance → 3,450 kr ✓
└─ 5. Execute Transfer → Success ✓

Total time: 8.3 seconds
[View Full Details]
```

## Transaction System

For operations that change state:

### Transaction Card

```
┌──────────────────────────────────────────────────┐
│ 💰 TRANSACTION: Bank Transfer            ✓      │
├──────────────────────────────────────────────────┤
│                                                   │
│ Amount: 500 kr                                   │
│ From: Checking Account                           │
│ To: Savings Account                              │
│                                                   │
│ Before:                                          │
│ • Checking: 3,450 kr                             │
│ • Savings: 5,200 kr                              │
│                                                   │
│ After:                                           │
│ • Checking: 2,950 kr (-500)                      │
│ • Savings: 5,700 kr (+500)                       │
│                                                   │
│ Reference: TX-12345                              │
│ Timestamp: Today at 14:23:15                     │
│ Status: Completed                                │
│                                                   │
│ [View Receipt] [Undo Transfer] [Export]         │
└──────────────────────────────────────────────────┘
```

### Transaction Properties

- **Clear before/after states**
- **Change tracking** (what changed, by how much)
- **Reference numbers** for external systems
- **Timestamps** for audit trail
- **Reversibility** (where applicable)
- **Confirmation requirements**
- **Export functionality**

## Branching in Funktioner

Funktioner can branch at specific points:

### Workflow-Defined Branches

```
[3] Make Transfer
     ├→ Domestic (Standard process)
     └→ International (Additional verification)
```

User's choice creates natural branch in both skeleton and timeline.

### User-Initiated Branches

At any point, user can:
- "Actually, try a different amount"
- "Let me compare two options"
- "What if I did it differently?"

Creates branch in timeline (like Issue #4) while maintaining workflow skeleton position.

## Accessibility Features

### For Elderly Users

**Always Know Where You Are**:
- Skeleton shows current position
- Progress indicator (3 of 5 steps complete)
- Can't get lost in complex workflows

**Guided but Flexible**:
- Skeleton suggests next steps
- Can skip steps if allowed by workflow
- Can use natural language instead of clicking buttons

**Clear Feedback**:
- Every tool call is visible
- Every state change is explicit
- Every transaction is summarized

**Error Recovery**:
- Clear error messages
- Suggestions for fixes
- Easy to go back and try again
- Undo for reversible operations

**No Cognitive Overload**:
- One action focus at a time
- Skeleton shows big picture
- Timeline shows details
- Progressive summarization keeps it clean

## Integration with Conversations

Funktioner and Conversations are **related but distinct**:

### Similarities
- Both use progressive summarization
- Both track tool calls
- Both support branching
- Both appear in Topics clusters

### When Funktioner Becomes Conversation

If user goes "off-script":
```
User is in Bank funktion, action "Check Balance"
User: "By the way, tell me about interest rates"

System can:
A) Answer within funktion context, stay in skeleton
B) Fork to freeform conversation, preserve funktion state
C) Suggest completing funktion first
```

**Recommended**: (A) for simple questions, (B) for complex divergence.

### Topics Page Integration

On Topics (Ämnen) page, funktioner sessions appear alongside conversations:

```
┌────────────────────────────────────────────┐
│ 💰 Banking & Finance                       │
├────────────────────────────────────────────┤
│                                             │
│ 📝 Conversation: Savings advice            │
│    Yesterday • 15 messages                 │
│                                             │
│ 🔧 Funktion: Bank transfer (completed)     │
│    Today • Transferred 500 kr              │
│                                             │
│ 📝 Conversation: Investment questions      │
│    2 days ago • 23 messages                │
│                                             │
└────────────────────────────────────────────┘
```

## Implementation Phases

### Phase 1: Basic Workflows
- Simple sequential funktioner (3-5 steps)
- Bank transfer example
- Calendar management example
- Tool integration
- Transaction tracking

### Phase 2: Advanced Workflows
- Branching workflows
- Conditional logic
- Parallel actions
- Loop support
- Non-linear navigation

### Phase 3: UX Polish
- Skeleton visualization refinement
- Timeline + skeleton hybrid layouts
- Mobile responsive design
- Accessibility audit

### Phase 4: Complex Funktioner
- AI image generation (long-running tools)
- Health tracking (data visualization)
- Shopping workflows
- Travel planning
- Multi-day funktioner (resume capability)

### Phase 5: Intelligence
- AI suggests funktioner based on user intent
- Workflow optimization based on user behavior
- Custom funktion creation (advanced users)
- Funktion templates library

## GitHub Issues Created

- **[Issue #6](https://github.com/aponomy/senior-ai-mvp/issues/6)**: UX Design - Funktioner interface, skeleton visualization, user flows
- **[Issue #7](https://github.com/aponomy/senior-ai-mvp/issues/7)**: Technical Backend - Workflow engine, transaction system, skeleton management

## Key Design Principles

1. **Structure without Rigidity**: Skeleton guides but doesn't constrain
2. **Visibility without Clutter**: Progressive summarization keeps timeline clean
3. **Control without Confusion**: Clear actions, clear outcomes
4. **Trust through Transparency**: Every tool call and transaction is visible
5. **Safety through Confirmation**: Reversible when possible, confirmed when critical

---

**Remember**: Funktioner aren't about restricting users - they're about **empowering** elderly users with clear structure and visible progress while completing important tasks confidently.
