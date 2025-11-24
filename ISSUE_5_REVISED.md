# Backend for Three-Column Conversations, Branching, Topic Clustering, and Category Separation

## Overview

Implement the backend systems to support the three-column conversation architecture, including:
- **Simplified branching system** - "What-if" exploration without complexity
- **Three-category message separation** (Regular, Functions, Meta)
- **Summary-based navigation** within each branch
- **Topic clustering** for Ämnen page
- **Progressive summarization** at conversation level

**Related to**: Issue #2 (Three-Column UX), Issue #3 (Navigation), Issue #1 (Conversation UI)

---

## 🎯 Core Features

### 1. Simplified Branching System
Elderly-friendly conversation branching for exploring alternatives:
- Branch from any summary or key point in columns 1-2
- Visual branch indicators in UI (🔀 icons)
- Simple branch switching via dropdown
- "What-if" scenarios without losing main conversation
- **No merging** - branches stay independent

### 2. Three-Category Message System
Clear separation of conversation types:
- **Regular** messages (🔵 blue) - Content discussions
- **Function** messages (🟢 green) - Action executions  
- **Meta** messages (🟡 amber) - Interface help
- Categories work independently within each branch

### 3. Summary-Based Navigation
Time travel through conversation history:
- Multiple summaries per branch
- Each summary has key points
- Filter messages by summary selection
- Branch points visible in summary column

### 4. Topic Clustering
Organize conversations by theme:
- AI-powered automatic clustering
- Cluster-level metadata and statistics
- Cross-cluster search capabilities

---

## Part 1: Conversation Data Structure (Three-Column Model with Branching)

### Core Data Models

```typescript
// Main conversation structure - WITH SIMPLIFIED BRANCHING
interface Conversation {
  id: string;
  userId: string;
  
  // All branches in this conversation
  branches: Map<string, Branch>;
  
  // Root branch (main conversation path)
  rootBranchId: string;
  
  // Currently active branch
  activeBranchId: string;
  
  // Branch points for navigation
  branchPoints: BranchPoint[];
  
  // Clustering metadata
  metadata: ConversationMetadata;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
}

// Branch: Each "what-if" path through conversation
interface Branch {
  id: string;
  conversationId: string;
  name: string;                    // User-friendly name or auto-generated
  
  // Where this branch started (null for root)
  parentBranchId: string | null;
  branchPointSummaryId: string | null;  // Summary where branch started
  branchPointKeyPointId: string | null; // Or key point where branch started
  
  // Messages in this branch
  messages: Message[];
  
  // Summaries for time travel (left column)
  summaries: ConversationSummary[];
  
  // Current building summary (most recent)
  currentSummary: ConversationSummary | null;
  
  // Category breakdown for this branch
  categoryStats: {
    regularCount: number;
    functionCount: number;
    metaCount: number;
    totalMessages: number;
  };
  
  // Branch state
  isActive: boolean;
  isArchived: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
}

// Branch point: Where conversation splits
interface BranchPoint {
  id: string;
  conversationId: string;
  
  // Location of branch point
  summaryId: string | null;      // If branching from summary
  keyPointId: string | null;     // If branching from key point
  
  // Parent and child branches
  parentBranchId: string;
  childBranchIds: string[];      // All branches from this point
  
  // Display
  label: string;                 // e.g., "Try different recipe", "Alternative approach"
  
  createdAt: Date;
}

// Messages with category tags and branch
interface Message {
  id: string;
  conversationId: string;
  branchId: string;              // Which branch this message belongs to
  role: 'user' | 'assistant';
  content: string;
  
  // NEW: Category for three-way separation
  category: 'regular' | 'function' | 'meta';
  
  // Which summary this belongs to (null = current/building)
  summaryId: string | null;
  
  // Position in branch
  position: number;
  
  // Optional: Tool/function call data
  toolCall?: {
    toolName: string;
    arguments: Record<string, any>;
    result?: any;
  };
  
  createdAt: Date;
}

// Summaries for left column navigation (per branch)
interface ConversationSummary {
  id: string;
  conversationId: string;
  branchId: string;              // Which branch this summary belongs to
  
  // Category of this summary
  category: 'regular' | 'function' | 'meta';
  
  // Display info
  title: string;                 // e.g., "🍰 Baking Tips"
  icon: string;                  // e.g., "🍰"
  
  // Key points for middle column
  keyPoints: KeyPoint[];
  
  // Message range
  startMessageId: string;
  endMessageId: string;
  messageCount: number;
  
  // Summary text (for context building)
  summaryText: string;
  
  // Position in branch timeline
  position: number;
  
  // Branch indicator: Is this where branches split?
  isBranchPoint: boolean;
  branchPointId: string | null;
  
  createdAt: Date;
}

// Key points for middle column (can be branch points)
interface KeyPoint {
  id: string;
  summaryId: string;
  branchId: string;
  text: string;                  // e.g., "Recipe selection"
  messageIds: string[];          // Messages related to this point
  position: number;
  
  // Branch indicator: Can branch from this key point?
  isBranchPoint: boolean;
  branchPointId: string | null;
}

// Conversation metadata for clustering
interface ConversationMetadata {
  title: string;              // Auto-generated conversation title
  summary: string;            // Full conversation summary
  topicClusterId: string | null;
  
  // For embeddings and search
  embedding?: number[];
  
  // Statistics
  categoryBreakdown: {
    regular: number;
    function: number;
    meta: number;
  };
  
  // Display
  snippet: string;            // Preview text
  lastActivity: Date;
}
```

### Design Philosophy

**Intentional Branching**: Users can only branch from summaries or key points (columns 1-2), not from arbitrary messages. This makes branching a deliberate choice, not an accidental action.

**No Merging**: Each branch is a valid exploration path. There's no "correct" branch to merge into. Users can review all branches and choose which path to continue, or keep all for reference.

**Simple Mental Model**: "What if I try something different from here?" - Natural thinking pattern that maps to everyday decision-making.

---

## Part 1B: Branching Operations (Elderly-Friendly)

### Creating a Branch

**User Journey:**

```
User is viewing conversation
    ↓
Sees interesting summary or key point in column 1 or 2
    ↓
Right-clicks or long-presses
    ↓
Menu appears: "Try different approach from here"
    ↓
User clicks → Branch created
    ↓
New branch starts with copied context up to that point
    ↓
User continues conversation in new direction
```

**Implementation:**

```typescript
async function createBranch(
  conversationId: string,
  branchFrom: {
    summaryId?: string;
    keyPointId?: string;
  },
  branchName?: string
): Promise<Branch> {
  
  const conversation = await loadConversation(conversationId);
  const currentBranch = conversation.branches.get(conversation.activeBranchId);
  
  // Determine branch point location
  let branchPoint: BranchPoint;
  if (branchFrom.summaryId) {
    const summary = currentBranch.summaries.find(s => s.id === branchFrom.summaryId);
    branchPoint = {
      id: generateId(),
      conversationId,
      summaryId: branchFrom.summaryId,
      keyPointId: null,
      parentBranchId: currentBranch.id,
      childBranchIds: [],
      label: branchName || `Alternative from ${summary.title}`,
      createdAt: new Date()
    };
  } else if (branchFrom.keyPointId) {
    const keyPoint = findKeyPointInBranch(currentBranch, branchFrom.keyPointId);
    const summary = currentBranch.summaries.find(s => 
      s.keyPoints.some(kp => kp.id === branchFrom.keyPointId)
    );
    branchPoint = {
      id: generateId(),
      conversationId,
      summaryId: summary.id,
      keyPointId: branchFrom.keyPointId,
      parentBranchId: currentBranch.id,
      childBranchIds: [],
      label: branchName || `Alternative: ${keyPoint.text}`,
      createdAt: new Date()
    };
  }
  
  // Create new branch
  const newBranch: Branch = {
    id: generateId(),
    conversationId,
    name: branchPoint.label,
    parentBranchId: currentBranch.id,
    branchPointSummaryId: branchPoint.summaryId,
    branchPointKeyPointId: branchPoint.keyPointId,
    
    // Copy context up to branch point
    messages: copyMessagesUpToBranchPoint(currentBranch, branchPoint),
    summaries: copySummariesUpToBranchPoint(currentBranch, branchPoint),
    currentSummary: null,
    
    categoryStats: calculateStats(copiedMessages),
    isActive: true,
    isArchived: false,
    
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActiveAt: new Date()
  };
  
  // Update conversation
  conversation.branches.set(newBranch.id, newBranch);
  conversation.branchPoints.push(branchPoint);
  conversation.activeBranchId = newBranch.id;
  
  // Update parent branch summary/keypoint to mark as branch point
  markAsBranchPoint(currentBranch, branchPoint);
  
  await saveConversation(conversation);
  
  return newBranch;
}

// Copy messages up to branch point
function copyMessagesUpToBranchPoint(
  branch: Branch,
  branchPoint: BranchPoint
): Message[] {
  
  if (branchPoint.summaryId) {
    // Branch from summary - copy all messages up to that summary
    const summary = branch.summaries.find(s => s.id === branchPoint.summaryId);
    return branch.messages.filter(m => 
      m.position <= getMessagePosition(summary.endMessageId, branch.messages)
    ).map(m => ({
      ...m,
      id: generateId(), // New IDs for new branch
      branchId: '' // Will be set by caller
    }));
  }
  
  if (branchPoint.keyPointId) {
    // Branch from key point - copy messages up to last message in that key point
    const keyPoint = findKeyPointInBranch(branch, branchPoint.keyPointId);
    const lastMessageId = keyPoint.messageIds[keyPoint.messageIds.length - 1];
    return branch.messages.filter(m => 
      m.position <= getMessagePosition(lastMessageId, branch.messages)
    ).map(m => ({
      ...m,
      id: generateId(),
      branchId: ''
    }));
  }
  
  return [];
}
```

### Switching Between Branches

**UI Pattern in Summary Column:**

```
┌──────────────────┐
│  SUMMARY COLUMN  │
│                  │
│  Branch: Main ▼  │ ← Dropdown to switch branches
│  ┌────────────┐  │
│  │ Other:     │  │
│  │ • Alternative approach │
│  │ • Try vegan option    │
│  └────────────┘  │
│                  │
│  [+ New]         │
│                  │
│  ═══REGULAR══    │
│  ┌────────────┐  │
│  │ 🍰 Recipe  │ 🔀│ ← Branch indicator
│  │ 35m ago    │  │
│  └────────────┘  │
```

**Implementation:**

```typescript
async function switchBranch(
  conversationId: string,
  targetBranchId: string
): Promise<BranchContext> {
  
  const conversation = await loadConversation(conversationId);
  
  // Validate target branch exists
  const targetBranch = conversation.branches.get(targetBranchId);
  if (!targetBranch) {
    throw new Error('Branch not found');
  }
  
  // Save current branch state (auto-save already done)
  const currentBranch = conversation.branches.get(conversation.activeBranchId);
  currentBranch.lastActiveAt = new Date();
  
  // Switch active branch
  conversation.activeBranchId = targetBranchId;
  targetBranch.lastActiveAt = new Date();
  
  await saveConversation(conversation);
  
  // Return branch context for rendering
  return {
    branch: targetBranch,
    summaries: targetBranch.summaries,
    currentMessages: targetBranch.messages.filter(m => m.summaryId === null),
    branchPoint: findBranchPointForBranch(conversation, targetBranchId),
    siblingBranches: getSiblingBranches(conversation, targetBranchId)
  };
}
```

### Visual Branch Indicators

**In Summary Column (Left):**

```typescript
// Show branch icon next to summaries that have branches
interface SummaryDisplay {
  summary: ConversationSummary;
  hasBranches: boolean;        // Show 🔀 icon
  branchCount: number;         // How many branches from here
  isCurrentBranchPoint: boolean; // Highlight if this is where current branch started
}
```

**Visual Design:**

```
┌──────────────────┐
│  SUMMARY COLUMN  │
│                  │
│  Branch: Main ▼  │
│                  │
│  [+ New]         │
│                  │
│  ═══REGULAR══    │
│  ┌────────────┐  │
│  │ 🍰 Recipe  │🔀│ ← Has 2 branches
│  │ (Main)     │  │   "Main path"
│  └────────────┘  │
│                  │
│  ┌────────────┐  │
│  │ 🛒 Shopping│  │
│  └────────────┘  │
│                  │
│  When viewing "Alternative" branch:
│                  │
│  Branch: Alternative ▼
│                  │
│  [+ New]         │
│                  │
│  ═══REGULAR══    │
│  ┌────────────┐  │
│  │ 🍰 Recipe  │✨│ ← Branch point (where this started)
│  │ (Shared)   │  │   "Shared with main"
│  └────────────┘  │
│                  │
│  ┌────────────┐  │
│  │ 🥗 Vegan   │  │ ← Only in this branch
│  │ (Branch)   │  │
│  └────────────┘  │
```

### Context Menu for Branching

**Right-click on Summary:**

```
┌────────────────────────────┐
│ View this summary          │
│ ───────────────────────── │
│ 🔀 Try different approach  │ ← Create branch
│    from here               │
│ ───────────────────────── │
│ Edit summary title         │
│ Archive this summary       │
└────────────────────────────┘
```

**Right-click on Key Point:**

```
┌────────────────────────────┐
│ Jump to these messages     │
│ ───────────────────────── │
│ 🔀 Explore different option│ ← Create branch
│    from this point         │
└────────────────────────────┘
```

---

## Part 2: Category Detection & Assignment

### Automatic Category Detection

**AI classifies each message exchange into one of three categories:**

```typescript
async function detectMessageCategory(
  userMessage: string,
  assistantResponse: string,
  conversationContext: Message[]
): Promise<'regular' | 'function' | 'meta'> {
  
  // Use AI to classify the exchange
  const classification = await aiClassify({
    userMessage,
    assistantResponse,
    recentContext: conversationContext.slice(-5),
    
    categories: {
      regular: {
        description: "Content discussions, information seeking, advice",
        examples: [
          "Recipe discussion",
          "Health questions",
          "Planning conversations",
          "General chat"
        ]
      },
      function: {
        description: "Action execution, tool usage, transactions",
        examples: [
          "Bank payment",
          "Calendar booking",
          "Shopping list creation",
          "Timer setting"
        ],
        indicators: [
          "Tool calls present",
          "Action verbs: 'pay', 'book', 'set', 'add'",
          "Confirmation of completed action"
        ]
      },
      meta: {
        description: "Interface help, navigation assistance, app usage",
        examples: [
          "How to find previous conversations",
          "Understanding features",
          "Troubleshooting interface",
          "Explaining app functionality"
        ],
        indicators: [
          "Questions about app itself",
          "Navigation help",
          "Feature explanations"
        ]
      }
    }
  });
  
  return classification.category;
}
```

### Category Assignment Rules

```typescript
// Rules for automatic category detection
const CATEGORY_RULES = {
  function: {
    // If any tool/function was called → function
    hasToolCall: true,
    
    // Keywords that indicate actions
    actionKeywords: [
      'pay', 'send', 'book', 'schedule', 'set', 'add',
      'create', 'confirm', 'purchase', 'transfer'
    ],
    
    // System indicators
    confirmationPattern: /✓|completed|done|success/i
  },
  
  meta: {
    // Questions about the app itself
    appQuestions: [
      'how do i', 'how can i', 'where is', 'where can i find',
      'show me', 'explain', 'what does', 'help me'
    ],
    
    // Mentions of app features
    featureKeywords: [
      'conversation', 'message', 'topic', 'search',
      'timeline', 'history', 'previous', 'back'
    ],
    
    // Interface-related
    interfacePattern: /navigation|interface|button|menu|page/i
  },
  
  regular: {
    // Default if not function or meta
    isDefault: true
  }
};
```

### Handling Category Transitions

**Visual separators in conversation flow:**

```typescript
interface CategorySeparator {
  type: 'separator';
  fromCategory: 'regular' | 'function' | 'meta';
  toCategory: 'regular' | 'function' | 'meta';
  label: string;              // e.g., "Bank Transaction", "Navigation"
  position: number;           // Where in message list
}

// Generate separators when category changes
function generateSeparators(messages: Message[]): CategorySeparator[] {
  const separators: CategorySeparator[] = [];
  
  for (let i = 1; i < messages.length; i++) {
    const prev = messages[i - 1];
    const curr = messages[i];
    
    if (prev.category !== curr.category) {
      separators.push({
        type: 'separator',
        fromCategory: prev.category,
        toCategory: curr.category,
        label: generateSeparatorLabel(curr.category),
        position: i
      });
    }
  }
  
  return separators;
}

function generateSeparatorLabel(category: string): string {
  // Extract topic from recent messages for label
  switch (category) {
    case 'function':
      return 'Function Call'; // Or specific: "Bank Payment"
    case 'meta':
      return 'Navigation';     // Or specific: "Interface Help"
    case 'regular':
      return 'Back to conversation';
    default:
      return '';
  }
}
```

---

## Part 3: Summary Generation System

### Progressive Summarization

**As conversation grows, create summaries for left column:**

```typescript
async function generateConversationSummary(
  messages: Message[],
  category: 'regular' | 'function' | 'meta'
): Promise<ConversationSummary> {
  
  // Filter messages by category
  const categoryMessages = messages.filter(m => m.category === category);
  
  // Generate summary with AI
  const aiResult = await aiSummarize({
    messages: categoryMessages,
    format: {
      title: "Short descriptive title with emoji",
      keyPoints: "3-5 main points discussed",
      summary: "Paragraph summarizing the discussion"
    }
  });
  
  // Extract key points with message associations
  const keyPoints = await extractKeyPoints(categoryMessages, aiResult.keyPoints);
  
  return {
    id: generateId(),
    conversationId: messages[0].conversationId,
    category,
    title: aiResult.title,
    icon: extractEmoji(aiResult.title),
    keyPoints,
    startMessageId: categoryMessages[0].id,
    endMessageId: categoryMessages[categoryMessages.length - 1].id,
    messageCount: categoryMessages.length,
    summaryText: aiResult.summary,
    position: calculatePosition(messages),
    createdAt: new Date()
  };
}

// Extract key points with message references
async function extractKeyPoints(
  messages: Message[],
  keyPointTexts: string[]
): Promise<KeyPoint[]> {
  
  return Promise.all(keyPointTexts.map(async (text, index) => {
    // Find which messages discuss this point
    const relevantMessageIds = await findRelevantMessages(text, messages);
    
    return {
      id: generateId(),
      summaryId: '', // Set by parent
      text,
      messageIds: relevantMessageIds,
      position: index
    };
  }));
}
```

### Trigger Points for Summarization

```typescript
const SUMMARIZATION_TRIGGERS = {
  // Minimum messages before creating summary
  minMessages: 5,
  
  // Maximum messages in "current" before summarizing
  maxCurrentMessages: 15,
  
  // Time-based: Summarize after inactivity
  inactivityThreshold: 24 * 60 * 60 * 1000, // 24 hours
  
  // Category-based: Summarize when switching categories
  onCategorySwitch: true,
  
  // User-initiated: Manual summary creation
  allowManual: true
};

async function checkSummarizationTrigger(
  conversation: Conversation
): Promise<boolean> {
  
  const currentMessages = conversation.messages.filter(
    m => m.summaryId === null
  );
  
  // Check message count
  if (currentMessages.length >= SUMMARIZATION_TRIGGERS.maxCurrentMessages) {
    return true;
  }
  
  // Check inactivity
  const lastMessage = currentMessages[currentMessages.length - 1];
  const inactiveTime = Date.now() - lastMessage.createdAt.getTime();
  if (inactiveTime >= SUMMARIZATION_TRIGGERS.inactivityThreshold) {
    return true;
  }
  
  // Check category switch
  if (SUMMARIZATION_TRIGGERS.onCategorySwitch) {
    const lastTwo = currentMessages.slice(-2);
    if (lastTwo.length === 2 && lastTwo[0].category !== lastTwo[1].category) {
      return true;
    }
  }
  
  return false;
}
```

---

## Part 4: Topic Clustering System

### Cluster Data Structure

```typescript
interface TopicCluster {
  id: string;
  userId: string;
  name: string;                   // Auto-generated or user-defined
  description: string;            // Cluster-level summary
  icon: string;                   // Auto-assigned emoji/icon
  color: string;                  // Theme color
  
  conversationIds: string[];      // All conversations in cluster
  embedding: number[];            // Cluster centroid embedding
  
  // Category breakdown across cluster
  categoryBreakdown: {
    regular: number;
    function: number;
    meta: number;
  };
  
  metadata: {
    conversationCount: number;
    messageCount: number;
    lastActive: Date;
    autoGenerated: boolean;
  };
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Clustering Algorithm

```typescript
async function clusterConversations(
  userId: string,
  conversations: Conversation[]
): Promise<TopicCluster[]> {
  
  // 1. Generate embeddings for each conversation
  const embeddings = await Promise.all(
    conversations.map(c => generateConversationEmbedding(c.metadata.summary))
  );
  
  // 2. Perform clustering (HDBSCAN or K-means)
  const clusters = performClustering(embeddings, {
    minClusterSize: 2,
    maxClusters: 10,
    similarityThreshold: 0.7
  });
  
  // 3. Generate cluster metadata
  const topicClusters = await Promise.all(
    clusters.map(async (cluster) => {
      const clusterConvos = cluster.conversationIds.map(id =>
        conversations.find(c => c.id === id)
      );
      
      // NEW: Calculate category breakdown
      const categoryBreakdown = calculateCategoryBreakdown(clusterConvos);
      
      return {
        ...cluster,
        name: await generateClusterName(clusterConvos),
        description: await generateClusterSummary(clusterConvos),
        icon: await assignClusterIcon(clusterConvos),
        color: generateClusterColor(cluster.id),
        categoryBreakdown
      };
    })
  );
  
  return topicClusters;
}

// Category breakdown for cluster
function calculateCategoryBreakdown(
  conversations: Conversation[]
): { regular: number; function: number; meta: number } {
  
  return conversations.reduce((acc, conv) => ({
    regular: acc.regular + conv.categoryStats.regularCount,
    function: acc.function + conv.categoryStats.functionCount,
    meta: acc.meta + conv.categoryStats.metaCount
  }), { regular: 0, function: 0, meta: 0 });
}
```

---

## Part 5: Database Schema

### PostgreSQL Schema with Branching Support

```sql
-- Main conversations table
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  root_branch_id TEXT NOT NULL,
  active_branch_id TEXT NOT NULL,
  title TEXT,
  summary TEXT,
  snippet TEXT,
  topic_cluster_id TEXT,
  
  -- Overall statistics (across all branches)
  branch_count INTEGER DEFAULT 1,
  message_count INTEGER DEFAULT 0,
  
  -- Embeddings for clustering/search
  embedding BLOB,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (topic_cluster_id) REFERENCES topic_clusters(id),
  FOREIGN KEY (root_branch_id) REFERENCES branches(id),
  FOREIGN KEY (active_branch_id) REFERENCES branches(id)
);

-- Branches table
CREATE TABLE branches (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  name TEXT NOT NULL,
  
  -- Branch hierarchy
  parent_branch_id TEXT,
  branch_point_summary_id TEXT,
  branch_point_keypoint_id TEXT,
  
  -- Category statistics for this branch
  regular_count INTEGER DEFAULT 0,
  function_count INTEGER DEFAULT 0,
  meta_count INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  
  -- State
  is_active BOOLEAN DEFAULT true,
  is_archived BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (parent_branch_id) REFERENCES branches(id)
);

-- Branch points table
CREATE TABLE branch_points (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  
  -- Location of branch point
  summary_id TEXT,
  keypoint_id TEXT,
  
  -- Branch relationships
  parent_branch_id TEXT NOT NULL,
  
  label TEXT NOT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (summary_id) REFERENCES conversation_summaries(id),
  FOREIGN KEY (parent_branch_id) REFERENCES branches(id)
);

-- Junction table for branch point children
CREATE TABLE branch_point_children (
  branch_point_id TEXT NOT NULL,
  child_branch_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  
  PRIMARY KEY (branch_point_id, child_branch_id),
  FOREIGN KEY (branch_point_id) REFERENCES branch_points(id),
  FOREIGN KEY (child_branch_id) REFERENCES branches(id)
);

-- Messages table with branch and category
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  
  -- Category for three-way separation
  category TEXT NOT NULL CHECK(category IN ('regular', 'function', 'meta')),
  
  -- Which summary this belongs to (null = current/building)
  summary_id TEXT,
  
  -- Position in branch
  position INTEGER NOT NULL,
  
  -- Optional tool call data
  tool_call_name TEXT,
  tool_call_args TEXT,  -- JSON
  tool_call_result TEXT, -- JSON
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  FOREIGN KEY (summary_id) REFERENCES conversation_summaries(id)
);

-- Summaries table per branch with branch point indicators
CREATE TABLE conversation_summaries (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  
  category TEXT NOT NULL CHECK(category IN ('regular', 'function', 'meta')),
  
  title TEXT NOT NULL,
  icon TEXT,
  summary_text TEXT,
  
  start_message_id TEXT NOT NULL,
  end_message_id TEXT NOT NULL,
  message_count INTEGER DEFAULT 0,
  
  position INTEGER NOT NULL,
  
  -- Branch point indicators
  is_branch_point BOOLEAN DEFAULT false,
  branch_point_id TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  FOREIGN KEY (start_message_id) REFERENCES messages(id),
  FOREIGN KEY (end_message_id) REFERENCES messages(id),
  FOREIGN KEY (branch_point_id) REFERENCES branch_points(id)
);

-- Key points table with branch point indicators
CREATE TABLE key_points (
  id TEXT PRIMARY KEY,
  summary_id TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  text TEXT NOT NULL,
  message_ids TEXT NOT NULL,  -- JSON array
  position INTEGER NOT NULL,
  
  -- Branch point indicators
  is_branch_point BOOLEAN DEFAULT false,
  branch_point_id TEXT,
  
  FOREIGN KEY (summary_id) REFERENCES conversation_summaries(id),
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  FOREIGN KEY (branch_point_id) REFERENCES branch_points(id)
);

-- Topic clusters table
CREATE TABLE topic_clusters (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  embedding BLOB,
  
  -- Category breakdown (across all conversations)
  regular_count INTEGER DEFAULT 0,
  function_count INTEGER DEFAULT 0,
  meta_count INTEGER DEFAULT 0,
  
  conversation_count INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  is_auto_generated BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Full-text search index
CREATE VIRTUAL TABLE messages_fts USING fts5(
  message_id,
  content,
  category,
  branch_id,
  content=messages,
  content_rowid=rowid
);

-- Essential indexes
CREATE INDEX idx_messages_branch ON messages(branch_id, position);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_category ON messages(category);
CREATE INDEX idx_messages_summary ON messages(summary_id);
CREATE INDEX idx_summaries_branch ON conversation_summaries(branch_id, position);
CREATE INDEX idx_summaries_conversation ON conversation_summaries(conversation_id);
CREATE INDEX idx_keypoints_summary ON key_points(summary_id, position);
CREATE INDEX idx_keypoints_branch ON key_points(branch_id);
CREATE INDEX idx_branches_conversation ON branches(conversation_id);
CREATE INDEX idx_branches_parent ON branches(parent_branch_id);
CREATE INDEX idx_branch_points_conversation ON branch_points(conversation_id);
CREATE INDEX idx_branch_points_summary ON branch_points(summary_id);
CREATE INDEX idx_conversations_user ON conversations(user_id, last_active_at DESC);
CREATE INDEX idx_conversations_cluster ON conversations(topic_cluster_id);
```

### Key Tables for Branching

| Table | Purpose |
|-------|---------|
| `branches` | Store all branches per conversation |
| `branch_points` | Track where conversations split |
| `branch_point_children` | Junction table for branch relationships |
| `messages.branch_id` | Associate messages with specific branch |
| `summaries.branch_id` | Associate summaries with specific branch |
| `summaries.is_branch_point` | Mark summaries where branching occurs |
| `key_points.is_branch_point` | Mark key points where branching occurs |

---

## Part 6: API Endpoints

### REST API for Frontend

```typescript
// Get conversation with branches
GET /api/conversations/:id
Response: {
  conversation: Conversation,
  activeBranch: Branch,
  allBranches: BranchSummary[],        // List of all branches
  branchPoints: BranchPoint[]          // Where branches split
}

// Get specific branch with summaries and messages
GET /api/conversations/:id/branches/:branchId
Response: {
  branch: Branch,
  summaries: ConversationSummary[],    // For left column
  currentMessages: Message[],           // Unsummarized messages
  separators: CategorySeparator[],      // For visual breaks
  branchPoint: BranchPoint | null       // Where this branch started
}

// Get messages filtered by summary (in specific branch)
GET /api/conversations/:id/branches/:branchId/summaries/:summaryId/messages
Response: {
  summary: ConversationSummary,
  keyPoints: KeyPoint[],                // For middle column
  messages: Message[],                  // For right column (filtered)
  hasBranches: boolean,                 // Can branch from this summary?
  branchCount: number                   // How many branches exist from here
}

// Get key point details (in specific branch)
GET /api/branches/:branchId/keypoints/:keypointId
Response: {
  keyPoint: KeyPoint,
  messages: Message[],                  // Messages related to this point
  canBranch: boolean                    // Can branch from this key point?
}

// Create new branch
POST /api/conversations/:id/branches
Request: {
  fromSummaryId?: string,
  fromKeyPointId?: string,
  branchName?: string
}
Response: {
  newBranch: Branch,
  branchPoint: BranchPoint,
  switchedToNewBranch: boolean
}

// Switch to different branch
POST /api/conversations/:id/branches/:branchId/activate
Response: {
  activeBranch: Branch,
  summaries: ConversationSummary[],
  currentMessages: Message[]
}

// Add new message to active branch (auto-categorized)
POST /api/conversations/:id/messages
Request: {
  role: 'user' | 'assistant',
  content: string,
  toolCall?: ToolCall
}
Response: {
  message: Message,                     // With category assigned
  branchId: string,                     // Which branch it was added to
  separator?: CategorySeparator,        // If category changed
  shouldSummarize: boolean              // If trigger hit
}

// Get topic clusters for Ämnen page
GET /api/clusters
Response: {
  clusters: TopicCluster[]
}

// Get conversations in cluster
GET /api/clusters/:id/conversations
Response: {
  cluster: TopicCluster,
  conversations: ConversationPreview[]  // Includes branch count
}

// Search across all conversations (all branches)
GET /api/search?q=:query
Response: {
  results: SearchResult[]               // Includes branch context
}
```

---

## Part 7: Context Building for AI

### Building AI Context with Branches

```typescript
function buildAIContext(
  conversation: Conversation,
  branchId: string,
  currentSummaryId?: string
): AIContext {
  
  const branch = conversation.branches.get(branchId);
  
  // If viewing old summary, load only that context
  if (currentSummaryId) {
    const summary = branch.summaries.find(s => s.id === currentSummaryId);
    const messages = branch.messages.filter(m => m.summaryId === currentSummaryId);
    
    return {
      mode: 'historical',
      branchName: branch.name,
      summary: summary.summaryText,
      keyPoints: summary.keyPoints.map(kp => kp.text),
      messages: messages,
      canSendMessage: false
    };
  }
  
  // If in current mode, provide full context efficiently
  return {
    mode: 'current',
    branchName: branch.name,
    
    // Branch context - if not root, include parent context
    branchContext: branch.parentBranchId ? 
      getBranchAncestorContext(conversation, branch) : null,
    
    // Recent messages in this branch (last 10-15)
    recentMessages: branch.messages.slice(-15),
    
    // Summaries of older content in this branch (compressed context)
    historicalSummaries: branch.summaries.map(s => ({
      category: s.category,
      title: s.title,
      summary: s.summaryText,
      keyPoints: s.keyPoints.map(kp => kp.text)
    })),
    
    // Conversation metadata
    conversationTitle: conversation.metadata.title,
    conversationSummary: conversation.metadata.summary,
    
    // Category awareness for this branch
    categoryBreakdown: branch.categoryStats,
    
    // Branch awareness
    isMainBranch: branch.id === conversation.rootBranchId,
    siblingBranches: getSiblingBranchSummaries(conversation, branch.id),
    
    // Allow new messages
    canSendMessage: true
  };
}

// Get ancestor context when in a branch
function getBranchAncestorContext(
  conversation: Conversation,
  branch: Branch
): BranchAncestorContext {
  
  const parentBranch = conversation.branches.get(branch.parentBranchId);
  const branchPoint = conversation.branchPoints.find(bp => 
    bp.childBranchIds.includes(branch.id)
  );
  
  return {
    parentBranchName: parentBranch.name,
    branchedFrom: {
      summaryTitle: branchPoint.summaryId ? 
        parentBranch.summaries.find(s => s.id === branchPoint.summaryId).title : 
        null,
      keyPointText: branchPoint.keyPointId ?
        findKeyPointInBranch(parentBranch, branchPoint.keyPointId).text :
        null
    },
    // Include parent branch summary for context
    parentSummary: parentBranch.summaries.map(s => s.summaryText).join('\n')
  };
}
```

---

### Category-Aware AI Prompting

```typescript
const SYSTEM_PROMPTS = {
  base: `You are a helpful AI assistant for elderly users. Be clear, patient, and kind.`,
  
  categoryAwareness: `
    You can engage in three types of conversations:
    
    1. REGULAR: Normal discussions, questions, advice, information
    2. FUNCTION: When executing actions (payments, bookings, etc.)
       - Always confirm before executing
       - Provide clear success/failure feedback
       - Use simple language for confirmations
    3. META: When helping users understand the interface
       - Explain features clearly
       - Use simple, non-technical language
       - Provide step-by-step guidance
    
    Current conversation contains:
    - ${stats.regular} regular messages
    - ${stats.function} function executions
    - ${stats.meta} interface help exchanges
  `,
  
  contextCompression: `
    Previous topics discussed (summaries):
    ${summaries.map(s => `- [${s.category.toUpperCase()}] ${s.title}: ${s.summary}`).join('\n')}
    
    Recent messages:
    ${recentMessages.map(m => `${m.role}: ${m.content}`).join('\n')}
  `
};
```

---

## Part 8: Search Implementation

### Category-Aware Search

```typescript
async function searchConversations(
  userId: string,
  query: string,
  options?: {
    categories?: ('regular' | 'function' | 'meta')[];
    clusterIds?: string[];
    dateRange?: { start: Date; end: Date };
  }
): Promise<SearchResult[]> {
  
  // 1. Generate query embedding
  const queryEmbedding = await generateEmbedding(query);
  
  // 2. Full-text search + vector search
  const textResults = await fullTextSearch(userId, query, options);
  const vectorResults = await vectorSearch(userId, queryEmbedding, options);
  
  // 3. Merge and rank results
  const merged = mergeSearchResults(textResults, vectorResults);
  
  // 4. Group by conversation and summary
  const grouped = groupResultsBySummary(merged);
  
  return grouped;
}

interface SearchResult {
  conversationId: string;
  conversationTitle: string;
  clusterName: string;
  
  // Which summary the result is in
  summaryId: string | null;
  summaryTitle: string | null;
  category: 'regular' | 'function' | 'meta';
  
  // Matching messages
  messages: {
    id: string;
    content: string;
    relevanceScore: number;
    timestamp: Date;
  }[];
  
  // Display
  snippet: string;
  highlightedText: string;
}
```

---

## Part 9: Performance Optimization

### Caching Strategy

```typescript
interface CacheStrategy {
  // Conversation summaries
  summaryCache: LRUCache<string, ConversationSummary[]>;
  
  // Full conversations (with messages)
  conversationCache: LRUCache<string, Conversation>;
  
  // Cluster assignments
  clusterCache: Map<string, TopicCluster>;
  
  // Search embeddings
  embeddingCache: LRUCache<string, number[]>;
}

// Cache invalidation triggers
const CACHE_INVALIDATION = {
  // When new message added
  onNewMessage: ['conversationCache'],
  
  // When summary created
  onSummaryCreated: ['conversationCache', 'summaryCache'],
  
  // When conversation clustered
  onClusterAssigned: ['clusterCache'],
  
  // When conversation title changes
  onTitleUpdate: ['conversationCache', 'embeddingCache']
};
```

### Lazy Loading Strategy

```typescript
// Load conversation progressively
async function loadConversation(
  conversationId: string,
  mode: 'full' | 'current-only' | 'summary-only'
): Promise<ConversationData> {
  
  switch (mode) {
    case 'current-only':
      // For active chatting - only current messages
      return {
        conversation: await loadConversationMetadata(conversationId),
        currentMessages: await loadCurrentMessages(conversationId),
        summaries: await loadSummaryTitles(conversationId), // Titles only
      };
    
    case 'summary-only':
      // For summary selection - load that summary's messages
      return {
        conversation: await loadConversationMetadata(conversationId),
        summaries: await loadAllSummaries(conversationId),
        // Messages loaded on demand when summary selected
      };
    
    case 'full':
      // For search/export - load everything
      return {
        conversation: await loadConversationFull(conversationId),
        summaries: await loadAllSummaries(conversationId),
        allMessages: await loadAllMessages(conversationId),
      };
  }
}
```

---

## Part 10: Implementation Phases

### Phase 1: Basic Three-Category System (Week 1-2)
- [ ] Implement conversation data structure with single branch (root)
- [ ] Message model with category field
- [ ] Basic category detection (rule-based)
- [ ] Database schema implementation (branches table, single branch support)
- [ ] API endpoints for messages

### Phase 2: Summary System (Week 3-4)
- [ ] Summary data structure per branch
- [ ] Key points extraction
- [ ] Summarization triggers
- [ ] Summary generation with AI
- [ ] API endpoints for summaries

### Phase 3: Category Separators (Week 4)
- [ ] Separator generation logic
- [ ] Category transition detection
- [ ] Separator labels
- [ ] Frontend integration points

### Phase 4: Branching Foundation (Week 5-6)
- [ ] Branch creation from summary
- [ ] Branch creation from key point
- [ ] Context copying up to branch point
- [ ] Branch point markers in UI data
- [ ] Branch switching API endpoint

### Phase 5: Branching UI Integration (Week 6-7)
- [ ] Branch dropdown in summary column
- [ ] Branch indicators (🔀 icons)
- [ ] Right-click/long-press menu for branching
- [ ] Visual distinction between branches
- [ ] "Currently viewing branch X" indicator

### Phase 6: Topic Clustering (Week 7-8)
- [ ] Cluster data structure
- [ ] Embedding generation
- [ ] Basic clustering algorithm
- [ ] Cluster metadata generation
- [ ] Cluster API endpoints

### Phase 7: Advanced Clustering (Week 9)
- [ ] Incremental cluster updates
- [ ] Cluster optimization
- [ ] Manual cluster assignment
- [ ] Category breakdown per cluster

### Phase 8: Search (Week 10)
- [ ] Full-text search implementation
- [ ] Vector search setup
- [ ] Category-aware filtering
- [ ] Branch-aware search (search within branch or all branches)
- [ ] Result ranking and grouping
- [ ] Search API endpoints

### Phase 9: Optimization (Week 11-12)
- [ ] Caching implementation (branch-aware)
- [ ] Lazy loading (load branches on demand)
- [ ] Database indexing
- [ ] Performance monitoring
- [ ] Load testing with multiple branches

### Phase 10: Polish (Week 13)
- [ ] Branch naming/renaming
- [ ] Branch archiving
- [ ] Branch statistics
- [ ] "Jump to branch point" navigation
- [ ] Export conversation with branches

---

## Technology Stack

### Database
**Recommendation: PostgreSQL with pgvector**
- Supports vector embeddings natively
- Excellent full-text search (tsvector)
- Good performance for 100+ conversations
- Easy to scale

**Alternative: SQLite with custom vector table**
- Simpler for MVP
- Good enough for single-user
- Easier deployment

### Embeddings
**Recommendation: OpenAI text-embedding-3-small**
- High quality: 1536 dimensions
- Low cost: ~$0.0001 per conversation
- Fast: <100ms per request
- Easy integration

**Alternative: sentence-transformers**
- Free, runs locally
- Good quality: 384-768 dimensions
- No API dependency

### Clustering
**Recommendation: HDBSCAN**
- Automatic cluster count determination
- Handles noise well
- Works well with conversation data

**Alternative: K-means**
- Simpler, faster
- Requires preset cluster count
- Good enough for MVP

### Caching
**Recommendation: Redis**
- Fast distributed cache
- Good for multi-device sync
- Built-in expiration

**Alternative: In-memory LRU**
- Simpler for MVP
- No extra infrastructure
- Fast enough for single user

### State Management
**Recommendation: React Query + Zustand**
- React Query: Server state caching
- Zustand: Client state management
- Good TypeScript support
- Simple API

---

## Success Metrics

### Performance Targets
- Message categorization: <50ms
- Summary generation: <3s
- Category switch: <100ms
- Branch creation: <200ms
- Branch switch: <100ms
- Search results: <500ms
- Conversation load: <200ms
- Cache hit rate: >90%

### Accuracy Targets
- Category detection accuracy: >90%
- Summary quality: >85% (user feedback)
- Clustering accuracy: >80%
- Search relevance: >85%

### Scalability Targets
- Support 500+ conversations per user
- Support 50+ messages per conversation
- Support 20+ summaries per conversation
- Support 5+ branches per conversation
- Support 10+ clusters per user

### Usability Targets (Elderly Users)
- Can create branch in < 3 clicks
- Can switch branches in < 2 clicks
- Understand branch concept without explanation: >80%
- Can find old summary in < 10 seconds
- Never confused about which branch they're in

---

## Open Questions

1. **Summary Frequency**: How many messages before forcing summarization? (Current: 15)
2. **Category Ambiguity**: How to handle messages that could be multiple categories?
3. **Summary Editing**: Should users be able to edit/rename summaries?
4. **Category Colors**: Fixed colors or theme customization?
5. **Cluster Size**: Max conversations per cluster? (Current: unlimited)
6. **Search Scope**: Default to all categories or current category only?
7. **Context Window**: How many historical summaries to include in AI context?
8. **Branch Naming**: Auto-generate branch names or always ask user?
9. **Branch Limit**: Maximum branches per conversation? (Suggest: 5-10)
10. **Branch Archiving**: Allow archiving old branches to reduce clutter?
11. **Search in Branches**: Search only active branch or all branches by default?

---

## Why Branching is Elderly-Friendly

### Mental Model: "What If" Thinking

Branching maps naturally to how people think:

**Example Scenario:**
```
User: "I want to bake a cake"
AI: "Great! Here's a vanilla recipe..."
[After discussing vanilla cake]

User sees in summary column:
┌────────────────┐
│ 🍰 Vanilla     │ 🔀  ← Branch indicator
│ Cake Recipe    │
└────────────────┘

User thinks: "Actually, what about chocolate?"

Right-clicks summary → "Try different approach from here"
→ Creates "Chocolate Alternative" branch
→ Continues from same starting point, different direction
```

### Benefits for Elderly Users:

1. **Non-Destructive Exploration**
   - "What if I try something else?" without losing original
   - Safe experimentation
   - Can always go back to "main" path

2. **Clear Visual Feedback**
   - Branch dropdown shows where you are
   - 🔀 icon shows where you can branch
   - "Shared" vs "Branch" labels show context

3. **Simple Language**
   - "Try different approach" (not "create branch")
   - "Main conversation" (not "root branch")
   - "Alternative" (not "branch node")

4. **Intentional Branching**
   - Only from summaries/key points (columns 1-2)
   - Not accidental (requires explicit action)
   - Clear branch points

5. **No Merging Confusion**
   - Branches stay separate
   - No "which version is correct?"
   - Each path is independent and valid

### Real-World Use Cases:

**Use Case 1: Recipe Alternatives**
```
Main: Vanilla cake recipe
Branch: Chocolate alternative
Branch: Gluten-free option
→ Can compare all three side-by-side
```

**Use Case 2: Financial Decisions**
```
Main: Pay electricity bill now
Branch: What if I wait until payday?
→ Explore consequences without committing
```

**Use Case 3: Health Advice**
```
Main: Medication schedule option A
Branch: Alternative schedule option B
→ Discuss both with doctor, decide later
```

---

## Labels
- `enhancement`
- `backend`
- `database`
- `ai-ml`
- `three-column`
- `elderly-friendly`

## Priority
**High** - Core backend infrastructure for three-column architecture

## Dependencies
- Requires three-column UI (Issue #2) ✓
- Supports navigation (Issue #3) ✓
- Builds on conversation UI (Issue #1) ✓

---

## Notes

This backend design supports the three-column architecture by:

1. **Enabling thoughtful exploration** - Simplified branching from summaries/key points
2. **Maintaining clarity** - Three categories work within each branch
3. **Supporting time travel** - Filter messages by summary selection in any branch
4. **Preventing information loss** - Branches preserve alternative explorations
5. **Optimizing for elderly users** - Simple "what if" mental model without merging complexity

**Key Innovation**: Branch only from summaries or key points (columns 1-2), not from arbitrary messages. This makes branching intentional and clear, not accidental.

**No Merging Philosophy**: Each branch is a valid exploration path. There's no "correct" branch to merge into. User can review all branches and choose which path to continue, or keep all for reference.
