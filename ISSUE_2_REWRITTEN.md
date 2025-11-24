# Technical: AI-Powered Conversation Summarization Backend (Three-Column Architecture)

## Overview

Develop the backend AI and algorithmic systems to support the **three-column progressive conversation interface**, enabling intelligent conversation segmentation, category-aware summarization, and context management with three-way separation (Regular/Function/Meta).

**Updated for Three-Column UX**: This issue has been adapted to support the three-column architecture with color-coded category separation (Blue=Regular, Green=Function, Amber=Meta) and progressive column reveal.

---

## Core Technical Requirements

### 1. Category-Aware Beat Detection System

Develop an algorithm to automatically identify natural conversation boundaries, group messages into logical "beats," **and classify them into one of three categories**.

#### Three-Way Category Classification

**PRIMARY REQUIREMENT**: Every beat must be classified into one category:

```typescript
type BeatCategory = 
  | 'regular'   // 🔵 Blue: Content discussions (recipes, shopping, general Q&A)
  | 'function'  // 🟢 Green: Action executions (payments, bookings, API calls)
  | 'meta';     // 🟡 Amber: Interface help (navigation, feature explanations)

interface ConversationBeat {
  id: string;
  category: BeatCategory;        // 🆕 REQUIRED for three-column UX
  beatType: BeatType;            // Secondary classification
  beatStatus: BeatStatus;        // Completion state
  messageIds: string[];
  startIndex: number;
  endIndex: number;
  timestamp: Date;
  topic?: string;
  toolCalls?: ToolCall[];        // Associated tool executions
  
  // Internal AI metadata (not user-facing)
  _internal?: {
    dominantMove?: 'add' | 'infer' | 'ask' | 'accept' | 'reject' | 'clarify';
    coordinationLevel?: 'basic' | 'description' | 'definition';
    confidenceScore?: number;
  };
}
```

#### Category Detection Algorithm

**Function Detection** (Highest Priority):
```typescript
function isFunctionBeat(messages: Message[]): boolean {
  // 1. Tool calls present
  if (messages.some(m => m.toolCalls?.length > 0)) return true;
  
  // 2. Action verbs with transactional intent
  const actionKeywords = [
    'pay', 'send', 'book', 'schedule', 'order', 'buy',
    'transfer', 'create', 'delete', 'update', 'submit'
  ];
  if (containsKeywords(messages, actionKeywords)) return true;
  
  // 3. API interaction or external system call
  if (hasExternalSystemInteraction(messages)) return true;
  
  return false;
}
```

**Meta Detection** (Second Priority):
```typescript
function isMetaBeat(messages: Message[]): boolean {
  // 1. Interface/navigation questions
  const metaKeywords = [
    'how do i', 'where can i find', 'what does this mean',
    'show me how', 'navigate', 'feature', 'button', 'where is',
    'how to use', 'what is this', 'explain this', 'help me find'
  ];
  if (containsKeywords(messages, metaKeywords)) return true;
  
  // 2. Questions about the AI assistant itself
  const assistantKeywords = [
    'what can you do', 'your capabilities', 'are you able to',
    'can you help with', 'do you support'
  ];
  if (containsKeywords(messages, assistantKeywords)) return true;
  
  return false;
}
```

**Regular Detection** (Default):
```typescript
function isBeat Regular(messages: Message[]): boolean {
  // Everything else is regular conversation
  // - General questions
  // - Information discussions
  // - Chitchat
  // - Topic exploration
  return true; // Default category
}
```

**Classification Priority**:
```typescript
function classifyBeat(messages: Message[]): BeatCategory {
  // Priority order matters!
  if (isFunctionBeat(messages)) return 'function';
  if (isMetaBeat(messages)) return 'meta';
  return 'regular'; // Default
}
```

#### Beat Type Classification

Secondary classification for richer context (user-facing in some UIs):

```typescript
type BeatType = 
  | 'question-answer'    // User asks, AI answers
  | 'task-execution'     // User requests action, AI performs
  | 'clarification'      // Back-and-forth clarifying questions
  | 'chitchat'           // Social conversation
  | 'topic-exploration'; // Deep dive into subject
```

#### Beat Status (Completion State)

Based on grounding theory research - tracks whether conversation reached fixpoint:

```typescript
type BeatStatus = 
  | 'complete'    // Fixpoint reached, mutual understanding confirmed
  | 'incomplete'  // Hanging question, no resolution yet
  | 'tentative';  // Implicit acceptance, can still be reopened
```

**Detection Heuristics**:

**Complete**:
- User says "thanks", "got it", "perfect", "okay"
- AI asks "Does that help?" and user confirms
- Task successfully executed with confirmation
- Both parties move to new topic

**Incomplete**:
- User asks question, no response yet
- AI asks clarifying question, no answer
- Task failed or error occurred
- Conversation interrupted mid-flow

**Tentative**:
- AI provided answer, user didn't explicitly confirm but continued
- Information shared without explicit acceptance
- Implicit agreement (grounding criterion)

**UX Benefits**:
- Incomplete beats show "Unfinished" badge in summary column
- AI can prompt: "You have 2 incomplete conversations - continue?"
- Complete beats can be summarized more aggressively
- Tentative beats can be reopened easily

#### Detection Signals

**Topic Shift Detection**:
- Analyze semantic similarity between consecutive messages
- Detect topic changes using embeddings (cosine similarity < 0.7)
- Category switches ALWAYS indicate new beat

**Intent Classification**:
- Identify when user switches from question → command → chitchat
- Use category classification to detect intent shifts

**Temporal Gaps**:
- Detect pauses in conversation (>2 minutes as threshold)
- >5 minutes = strong beat boundary signal

**Task Completion Markers**:
- Recognize phrases: "thanks", "got it", "what about...", "now let's..."
- Tool call completion indicates function beat end

**Conversation Depth**:
- Track nested topics (subtopic within topic)
- Maintain parent-child relationships for hierarchical summaries

#### Algorithm Requirements

- **Real-time processing**: New messages analyzed immediately
- **Sliding window analysis**: Look at 3-5 message context
- **Configurable sensitivity**: Adjust grouping thresholds
- **Category-first approach**: Always classify category before other attributes
- **Output**: Conversation segments with start/end indices, category, beat type, and status

---

### 2. Separator Detection & Generation System

**NEW REQUIREMENT**: Detect when functions and meta conversations start/end within the current (building) conversation to insert visual separators.

#### Separator Types

```typescript
interface Separator {
  id: string;
  type: 'function-start' | 'function-end' | 'meta-start' | 'meta-end';
  position: number;           // Message index in conversation
  label: string;              // Display text (e.g., "Bank Transaction")
  category: 'function' | 'meta';
  beatId: string;             // Associated beat
  timestamp: Date;
}
```

#### Separator Generation Logic

```typescript
function generateSeparators(
  messages: Message[],
  beats: ConversationBeat[]
): Separator[] {
  const separators: Separator[] = [];
  
  // Only create separators for function and meta beats
  beats
    .filter(beat => beat.category === 'function' || beat.category === 'meta')
    .forEach(beat => {
      // Start separator
      separators.push({
        id: `${beat.id}-start`,
        type: `${beat.category}-start`,
        position: beat.startIndex,
        label: generateStartLabel(beat),
        category: beat.category,
        beatId: beat.id,
        timestamp: beat.timestamp
      });
      
      // End separator (returns to regular)
      separators.push({
        id: `${beat.id}-end`,
        type: `${beat.category}-end`,
        position: beat.endIndex + 1,
        label: 'Back to conversation',
        category: beat.category,
        beatId: beat.id,
        timestamp: beat.timestamp
      });
    });
  
  // Sort by position
  return separators.sort((a, b) => a.position - b.position);
}

function generateStartLabel(beat: ConversationBeat): string {
  if (beat.category === 'function') {
    // Extract action from tool calls or message content
    const action = extractActionVerb(beat);
    return `${action || 'Function'}`;
  } else {
    // Meta: What is user learning about?
    const topic = extractMetaTopic(beat);
    return `${topic || 'Navigation'}`;
  }
}
```

#### Separator Visual Rendering

Separators appear inline in the conversation column when viewing "Current":

```tsx
{messages.map((msg, idx) => {
  const separator = separators.find(s => s.position === idx);
  
  return (
    <React.Fragment key={msg.id}>
      {separator && (
        <SeparatorLine 
          type={separator.type}
          label={separator.label}
          category={separator.category}
        />
      )}
      
      <Message 
        content={msg}
        category={getBeatCategory(msg.beatId)}
      />
    </React.Fragment>
  );
})}
```

**Design Notes**:
- Function separators: Green color, solid line
- Meta separators: Amber color, solid line
- Regular messages: No separators needed (default conversation flow)
- Separators only appear in "Current" view, not in historical summaries

---

### 3. Multi-Level Category-Aware Summarization Engine

Create a summarization system that generates different levels of summary **with category-specific formatting and focus**.

#### Five Summary Levels

**L1 - Condensed (50-70% reduction)**
- For semi-transparent boxes in conversation view
- Remove filler words, redundancy
- Keep key information intact
- Example: "You asked about Italian recipes. I suggested three options: pasta carbonara, risotto, and lasagna."

**L2 - Abstract (75-85% reduction)**
- For solid summary boxes (conversation beats)
- High-level topic identification
- One sentence typically
- Example: "Discussion about Italian recipe options"

**L3 - Conversation Summary (95%+ reduction)**
- Entire conversation in 2-3 sentences
- Used on Topics page for conversation cards
- Example: "Recipe session covering Italian dishes and cooking techniques"

**L4 - Topic Label (98%+ reduction)**
- 2-5 word label for topic clusters
- Used on Topics page for grouping
- Example: "Cooking & Recipes"

**L5 - Meta Description (optional, future)**
- Cross-topic patterns and insights
- Example: "User frequently asks about food and enjoys Italian cuisine"

#### Category-Specific Summarization

**Function Beat Summaries** (Green):
```typescript
function summarizeFunctionBeat(
  beat: ConversationBeat,
  level: SummaryLevel
): string {
  switch (level) {
    case 'L1':
      // Detailed: What was done, parameters, result
      return `${beat.toolCalls[0].displayName}: ${beat.toolCalls[0].result.summary}`;
    
    case 'L2':
      // Abstract: Action + outcome
      const action = extractActionVerb(beat);
      const outcome = extractOutcome(beat);
      return `💳 ${action} - ${outcome}`;
    
    case 'L3':
      // Conversation level: Summarize all functions in conversation
      return `Completed ${countFunctions(beat)} transactions`;
    
    case 'L4':
      // Topic cluster: Category label
      return getFunctionCategory(beat); // e.g., "Banking", "Shopping"
  }
}

// Example outputs:
// L2: "💳 Paid electricity bill - 847 SEK"
// L2: "📅 Booked dentist appointment - June 15"
// L2: "🛒 Ordered groceries - Delivered tomorrow"
```

**Meta Beat Summaries** (Amber):
```typescript
function summarizeMetaBeat(
  beat: ConversationBeat,
  level: SummaryLevel
): string {
  switch (level) {
    case 'L1':
      // Detailed: Question and answer
      return `${extractQuestion(beat)} → ${extractAnswer(beat)}`;
    
    case 'L2':
      // Abstract: What was learned
      const learning = extractLearning(beat);
      return `🧭 ${learning}`;
    
    case 'L3':
      // Conversation level: Interface help provided
      return `Learned about ${getMetaTopics(beat).join(', ')}`;
    
    case 'L4':
      // Topic cluster: "Help & Navigation"
      return 'Interface Help';
  }
}

// Example outputs:
// L2: "🧭 How to view previous conversations"
// L2: "🧭 Understanding key points"
// L2: "🧭 Using the search feature"
```

**Regular Beat Summaries** (Blue):
```typescript
function summarizeRegularBeat(
  beat: ConversationBeat,
  level: SummaryLevel
): string {
  switch (level) {
    case 'L1':
      // Condensed: Main points
      return condenseConversation(beat);
    
    case 'L2':
      // Abstract: Topic + subtopics
      const topic = extractMainTopic(beat);
      return `${getTopicEmoji(topic)} ${topic}`;
    
    case 'L3':
      // Conversation level: Overview of discussion
      return `Discussed ${getTopics(beat).join(', ')}`;
    
    case 'L4':
      // Topic cluster: Domain label
      return categorizeConversationDomain(beat); // e.g., "Food & Cooking"
  }
}

// Example outputs:
// L2: "🍰 Baking tips and recipes"
// L2: "🌤️ Weather and outdoor activities"
// L2: "👨‍👩‍👧 Family updates"
```

#### Summary Card Structure

Summary cards appear in the left column with category-specific formatting:

```typescript
interface SummaryCard {
  id: string;
  category: BeatCategory;
  beatId: string;
  
  // Display content
  title: string;          // L2 or L3 summary
  emoji: string;          // Category-appropriate emoji
  timestamp: Date;
  timeAgo: string;        // "35 min ago"
  
  // Key points (bullet list)
  keyPoints: string[];    // 3-5 key points from beat
  
  // Visual
  color: 'blue' | 'green' | 'amber';
  icon: string;           // Category icon
  
  // State
  status: BeatStatus;     // complete | incomplete | tentative
  isSelected: boolean;
  hasBeenViewed: boolean;
}

function generateSummaryCard(beat: ConversationBeat): SummaryCard {
  return {
    id: beat.id,
    category: beat.category,
    beatId: beat.id,
    title: summarize(beat, 'L2'),
    emoji: getCategoryEmoji(beat),
    timestamp: beat.timestamp,
    timeAgo: formatTimeAgo(beat.timestamp),
    keyPoints: extractKeyPoints(beat),
    color: getCategoryColor(beat.category),
    icon: getCategoryIcon(beat.category),
    status: beat.beatStatus,
    isSelected: false,
    hasBeenViewed: false
  };
}
```

#### Technical Approach

**Recommended**: Hybrid approach using LLM API with category-specific prompts

```typescript
interface SummarizationPrompt {
  category: BeatCategory;
  level: SummaryLevel;
  beatType: BeatType;
  messages: Message[];
  toolCalls?: ToolCall[];
}

async function generateSummary(prompt: SummarizationPrompt): Promise<string> {
  const systemPrompt = buildCategoryPrompt(prompt.category, prompt.level);
  const userContent = formatMessagesForSummarization(prompt.messages);
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Fast and cheap for summaries
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent }
    ],
    max_tokens: getMaxTokensForLevel(prompt.level),
    temperature: 0.3 // Consistent, factual summaries
  });
  
  return response.choices[0].message.content;
}

function buildCategoryPrompt(
  category: BeatCategory,
  level: SummaryLevel
): string {
  const basePrompt = `You are summarizing a conversation beat for elderly users. 
Be clear, concise, and focus on what matters.`;
  
  const categoryGuidance = {
    function: 'Focus on: What action was taken, what was the result, any important details.',
    meta: 'Focus on: What did the user learn, what feature was explained, key takeaways.',
    regular: 'Focus on: What topic was discussed, main points covered, any conclusions.'
  };
  
  const levelGuidance = {
    L1: 'Condense to 50-70% of original. Keep all key information.',
    L2: 'Summarize in one sentence (15-25% of original). Topic + main point.',
    L3: 'Entire conversation in 2-3 sentences.',
    L4: 'Just 2-5 words as a label.',
    L5: 'Cross-conversation pattern (future feature).'
  };
  
  return `${basePrompt}\n\n${categoryGuidance[category]}\n\n${levelGuidance[level]}`;
}
```

**Performance Requirements**:
- L1 summary: <500ms per beat
- L2 summary: <300ms per beat
- Batch processing for efficiency
- Cache summaries (regenerate only when conversation changes)
- Progressive generation (show skeleton UI while processing)

---

### 4. Dynamic Threshold Management (Three-Column Aware)

Implement adaptive logic to determine when beats transition from current view to summary column, and when to reveal each column.

#### Three-Column Progressive Reveal Thresholds

```typescript
interface ThreeColumnThresholds {
  // Column visibility (what stage are we at?)
  minKeyPointsToShowColumn: 2;      // Stage 2: Show middle column
  minSummariesToShowColumn: 2;      // Stage 3: Show left column
  
  // When does current beat become a summary?
  messagesSinceLastActivity: 20;    // After 20 messages
  timeSinceLastMessage: 5 * 60 * 1000; // After 5 minutes
  
  // Category-specific thresholds (when to "complete" and summarize)
  functionCompleteThreshold: 1;     // Functions summarize immediately when done
  metaCompleteThreshold: 3;         // Meta after 3 exchanges
  regularCompleteThreshold: 10;     // Regular needs more messages
  
  // Keypoint promotion
  messageCountForKeyPoint: 5;       // 5+ messages = create key point
  importanceThresholdForKeyPoint: 0.7; // Semantic importance score
  
  // Conversation-level
  maxCurrentMessages: 50;           // Start aggressively summarizing after 50
  summaryCompressionFactor: 1.5;    // As conversation grows, compress more
}
```

#### Dynamic Calculation

```typescript
function calculateThresholds(
  state: ConversationState,
  userInteraction: InteractionMetrics
): ThreeColumnThresholds {
  const totalMessages = state.messages.length;
  const conversationAge = Date.now() - state.createdAt.getTime();
  
  // Adapt thresholds based on conversation maturity
  const base: ThreeColumnThresholds = getBaseThresholds();
  
  if (totalMessages > 100) {
    // Long conversation: More aggressive summarization
    base.messagesSinceLastActivity = 15;
    base.regularCompleteThreshold = 8;
  }
  
  if (userInteraction.expandsOften) {
    // Power user: Less summarization
    base.regularCompleteThreshold = 15;
    base.minSummariesToShowColumn = 3;
  }
  
  return base;
}
```

#### Column Visibility Logic

```typescript
function calculateColumnVisibility(
  state: ThreeColumnState,
  thresholds: ThreeColumnThresholds
): ColumnVisibility {
  const summaryCount = getSummaryCards(state).length;
  const keyPointCount = getCurrentKeyPoints(state).length;
  
  return {
    summary: summaryCount >= thresholds.minSummariesToShowColumn,
    keypoint: keyPointCount >= thresholds.minKeyPointsToShowColumn,
    conversation: true // Always visible
  };
}

// Stage detection
function getConversationStage(visibility: ColumnVisibility): 1 | 2 | 3 {
  if (visibility.summary) return 3; // All three columns
  if (visibility.keypoint) return 2; // Two columns
  return 1; // One column
}
```

#### Beat Transition Logic

```typescript
function shouldTransitionToSummary(
  beat: ConversationBeat,
  currentState: ConversationState,
  thresholds: ThreeColumnThresholds
): boolean {
  // 1. Check completion status
  if (beat.beatStatus !== 'complete' && beat.beatStatus !== 'tentative') {
    return false; // Don't summarize incomplete beats
  }
  
  // 2. Check category-specific thresholds
  const messagesSinceLastActivity = 
    currentState.messages.length - beat.endIndex;
  
  switch (beat.category) {
    case 'function':
      // Functions summarize immediately when complete
      return beat.beatStatus === 'complete';
    
    case 'meta':
      // Meta after a few more exchanges
      return messagesSinceLastActivity >= thresholds.metaCompleteThreshold;
    
    case 'regular':
      // Regular needs more distance
      return messagesSinceLastActivity >= thresholds.regularCompleteThreshold;
  }
}
```

---

### 5. Conversation State Management (Three-Column Extended)

Build a robust state management system to track conversation structure, categories, summaries, and user interactions.

#### Core State Structure

```typescript
interface ThreeColumnConversationState {
  // Core conversation data
  conversationId: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Messages
  messages: Message[];
  
  // Beats (conversation segments)
  beats: ConversationBeat[];
  
  // Summaries (generated from beats)
  summaries: Map<string, SummaryLevels>;
  summaryCards: SummaryCard[];
  
  // Category indices (for fast filtering)
  categoryIndex: {
    regular: Set<string>;    // Message IDs
    function: Set<string>;
    meta: Set<string>;
  };
  
  // Separators (for current view)
  separators: Separator[];
  
  // Navigation state
  viewMode: 'current' | 'historical';
  selectedSummaryId: string | null;
  activeCategory: BeatCategory | 'current';
  
  // Column visibility
  columnVisibility: {
    summary: boolean;
    keypoint: boolean;
    conversation: boolean;
  };
  
  // UI state
  expansionState: Map<string, boolean>;  // Which summaries are expanded
  scrollPosition: number;
  
  // Metadata
  metadata: ConversationMetadata;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  
  // Three-column specific
  beatId?: string;
  category?: BeatCategory;
  
  // Tool calls (for functions)
  toolCalls?: ToolCall[];
  referencesToolCalls?: string[];
  
  // Metadata
  metadata?: any;
}

interface SummaryLevels {
  l1: string;  // Condensed
  l2: string;  // Abstract
  l3: string;  // Conversation summary
  l4?: string; // Topic label
  l5?: string; // Meta description
  generatedAt: Date;
  category: BeatCategory;
}

interface ConversationMetadata {
  totalBeats: number;
  totalMessages: number;
  categoryBreakdown: {
    regular: number;
    function: number;
    meta: number;
  };
  lastActivity: Date;
  conversationStage: 1 | 2 | 3;
}
```

#### State Operations

```typescript
class ConversationStateManager {
  // Add new message
  async addMessage(message: Message): Promise<void> {
    // 1. Add to messages array
    this.state.messages.push(message);
    
    // 2. Run beat detection
    const newBeat = await this.detectBeat(message);
    if (newBeat) {
      this.state.beats.push(newBeat);
      
      // 3. Classify category
      newBeat.category = classifyBeat(newBeat);
      
      // 4. Update category index
      this.updateCategoryIndex(message, newBeat.category);
      
      // 5. Check if previous beat should transition to summary
      const previousBeat = this.state.beats[this.state.beats.length - 2];
      if (previousBeat && shouldTransitionToSummary(previousBeat, this.state)) {
        await this.createSummaryCard(previousBeat);
      }
      
      // 6. Update separators
      this.state.separators = generateSeparators(
        this.state.messages,
        this.state.beats
      );
    }
    
    // 7. Update column visibility
    this.updateColumnVisibility();
    
    // 8. Persist state
    await this.persistState();
  }
  
  // Select summary (navigate to historical view)
  selectSummary(summaryId: string): void {
    const card = this.state.summaryCards.find(c => c.id === summaryId);
    if (!card) return;
    
    this.state.viewMode = 'historical';
    this.state.selectedSummaryId = summaryId;
    this.state.activeCategory = card.category;
    
    // Mark as viewed
    card.hasBeenViewed = true;
  }
  
  // Return to current conversation
  returnToCurrent(): void {
    this.state.viewMode = 'current';
    this.state.selectedSummaryId = null;
    this.state.activeCategory = 'current';
  }
  
  // Get messages for current view
  getVisibleMessages(): Message[] {
    if (this.state.viewMode === 'current') {
      // Show all messages (separators added in render)
      return this.state.messages;
    } else {
      // Show only messages from selected category
      const beat = this.state.beats.find(
        b => b.id === this.state.selectedSummaryId
      );
      if (!beat) return [];
      
      return this.state.messages.filter(
        m => m.beatId === beat.id
      );
    }
  }
  
  // Get key points for middle column
  getCurrentKeyPoints(): KeyPoint[] {
    if (this.state.viewMode === 'historical') {
      const beat = this.state.beats.find(
        b => b.id === this.state.selectedSummaryId
      );
      return beat ? extractKeyPoints(beat) : [];
    } else {
      // Current view: Extract from recent messages
      const recentMessages = this.state.messages.slice(-20);
      return extractKeyPointsFromMessages(recentMessages);
    }
  }
}
```

#### Persistence

```typescript
// Local storage for web app
async function persistState(state: ThreeColumnConversationState) {
  const serialized = JSON.stringify({
    conversationId: state.conversationId,
    messages: state.messages,
    beats: state.beats,
    summaries: Array.from(state.summaries.entries()),
    // ... other fields
  });
  
  localStorage.setItem(
    `conversation-${state.conversationId}`,
    serialized
  );
}

// IndexedDB for larger conversations
async function persistToIndexedDB(state: ThreeColumnConversationState) {
  const db = await openDB('senior-ai-conversations', 1);
  await db.put('conversations', {
    id: state.conversationId,
    ...state,
    updatedAt: new Date()
  });
}
```

---

### 6. Context Window Management (Category-Aware)

Implement smart context management for the AI assistant to handle long conversations efficiently while respecting the three-category system.

#### Context Building Strategy

```typescript
function buildThreeColumnContext(
  state: ThreeColumnConversationState,
  currentMessage: string
): AIContext {
  const currentCategory = detectMessageCategory(currentMessage);
  
  return {
    // 1. Always include recent full messages (last 10)
    recentMessages: state.messages.slice(-10),
    
    // 2. Include L2 summaries from current category
    categorySummaries: getSummariesByCategory(state, currentCategory)
      .map(s => s.l2),
    
    // 3. Include L3 summaries from other categories (for context)
    otherCategorySummaries: getSummariesExcept(state, currentCategory)
      .map(s => s.l3),
    
    // 4. Current category metadata
    categoryMetadata: {
      type: currentCategory,
      inProgress: state.viewMode === 'current',
      relatedBeats: findRelatedBeats(state, currentMessage)
    },
    
    // 5. Incomplete beats (always include for continuity)
    incompleteBeats: state.beats
      .filter(b => b.beatStatus === 'incomplete')
      .map(b => ({
        category: b.category,
        summary: state.summaries.get(b.id)?.l2,
        lastMessage: getLastMessage(b)
      })),
    
    // 6. Overall conversation summary (L3)
    conversationSummary: generateOverallSummary(state)
  };
}

function detectMessageCategory(message: string): BeatCategory {
  // Quick classification based on message content
  if (containsActionVerbs(message)) return 'function';
  if (containsMetaKeywords(message)) return 'meta';
  return 'regular';
}
```

#### Token Budget Management

```typescript
interface TokenBudget {
  total: 128000;           // GPT-4 context window
  reserved: {
    recentMessages: 4000,   // Full text of recent messages
    systemPrompt: 1000,     // Instructions to AI
    response: 2000,         // Space for AI response
  };
  available: 121000;        // For summaries and context
}

function buildContextWithinBudget(
  state: ThreeColumnConversationState,
  budget: TokenBudget
): AIContext {
  const context: AIContext = {
    recentMessages: [],
    categorySummaries: [],
    // ...
  };
  
  let tokensUsed = 0;
  
  // 1. Recent messages (highest priority)
  const recent = state.messages.slice(-10);
  tokensUsed += estimateTokens(recent);
  context.recentMessages = recent;
  
  // 2. Current category summaries (L2)
  const currentCatSummaries = getSummariesByCategory(
    state,
    state.activeCategory
  );
  const summaryTokens = estimateTokens(currentCatSummaries);
  
  if (tokensUsed + summaryTokens < budget.available) {
    tokensUsed += summaryTokens;
    context.categorySummaries = currentCatSummaries.map(s => s.l2);
  } else {
    // Use L3 if L2 doesn't fit
    context.categorySummaries = currentCatSummaries.map(s => s.l3);
  }
  
  // 3. Other categories (L3 only)
  // ... fill remaining budget
  
  return context;
}
```

#### Semantic Search for Cross-Category References

```typescript
async function findRelatedBeats(
  state: ThreeColumnConversationState,
  currentMessage: string
): Promise<ConversationBeat[]> {
  // Generate embedding for current message
  const currentEmbedding = await generateEmbedding(currentMessage);
  
  // Compare with beat embeddings
  const similarities = state.beats.map(beat => ({
    beat,
    similarity: cosineSimilarity(
      currentEmbedding,
      beat.embedding
    )
  }));
  
  // Return top 3 most similar beats (above threshold)
  return similarities
    .filter(s => s.similarity > 0.75)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3)
    .map(s => s.beat);
}
```

---

### 7. Tool Calling Backend Architecture

Handle function executions (green category) with proper tracking, error handling, and summarization.

#### Tool Call Data Structure

```typescript
interface ToolCall {
  id: string;
  messageId: string;           // Associated with which message
  beatId: string;              // Part of which beat (for categorization)
  
  // Tool information
  toolName: string;             // e.g., "weather_api", "bank_transfer"
  displayName: string;          // e.g., "Weather Check", "Bank Payment"
  category: ToolCategory;
  icon: string;
  
  // Execution details
  parameters: Record<string, any>;
  result: ToolResult;
  
  // Status tracking
  status: 'pending' | 'running' | 'success' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  duration?: number;            // milliseconds
  
  // Error handling
  error?: {
    code: string;
    message: string;
    userFriendlyMessage: string;
    isRetryable: boolean;
  };
  
  // Privacy & permissions
  requiresPermission: boolean;
  permissionGranted?: boolean;
  dataAccessed: string[];       // What data was read/modified
}

interface ToolResult {
  success: boolean;
  data: any;
  summary: string;              // User-friendly summary
  metadata?: Record<string, any>;
}

type ToolCategory = 
  | 'search'        // Information lookup
  | 'transaction'   // Financial operations
  | 'scheduling'    // Calendar/appointment
  | 'generation'    // Create content (images, docs)
  | 'analysis'      // Process data
  | 'communication' // Send messages
  | 'system';       // System operations
```

#### Tool Execution Engine

```typescript
class ToolExecutor {
  async executeToolChain(
    tools: ToolDefinition[],
    context: ConversationContext
  ): Promise<ToolCall[]> {
    const results: ToolCall[] = [];
    
    for (const tool of tools) {
      // Check permissions
      if (tool.requiresPermission && !await this.hasPermission(tool)) {
        results.push(this.createPermissionDeniedResult(tool));
        continue;
      }
      
      // Execute with timeout and retry
      const result = await this.executeWithRetry(tool, {
        timeout: 30000,
        retries: 2,
        exponentialBackoff: true
      });
      
      results.push(result);
      
      // If critical tool fails, stop chain
      if (!result.result.success && tool.isCritical) {
        break;
      }
    }
    
    return results;
  }
  
  private async executeWithRetry(
    tool: ToolDefinition,
    options: RetryOptions
  ): Promise<ToolCall> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= options.retries; attempt++) {
      try {
        const startTime = Date.now();
        
        const result = await Promise.race([
          tool.execute(tool.parameters, this.context),
          this.timeout(options.timeout)
        ]);
        
        return {
          id: generateId(),
          messageId: this.currentMessageId,
          beatId: this.currentBeatId,
          toolName: tool.name,
          displayName: tool.displayName,
          category: tool.category,
          icon: tool.icon,
          parameters: tool.parameters,
          result: result,
          status: 'success',
          startedAt: new Date(startTime),
          completedAt: new Date(),
          duration: Date.now() - startTime,
          requiresPermission: tool.requiresPermission,
          dataAccessed: result.metadata?.dataAccessed || []
        };
      } catch (error) {
        lastError = error;
        
        if (attempt < options.retries && tool.isRetryable) {
          await this.wait(options.exponentialBackoff 
            ? Math.pow(2, attempt) * 1000 
            : 1000
          );
          continue;
        }
      }
    }
    
    // All retries failed
    return this.createFailedResult(tool, lastError);
  }
}
```

#### Tool Integration with Beat Detection

```typescript
function detectBeatsWithTools(
  messages: Message[]
): ConversationBeat[] {
  const beats: ConversationBeat[] = [];
  let currentBeat: Message[] = [];
  
  for (const message of messages) {
    currentBeat.push(message);
    
    // Tool call presence indicates function beat
    if (message.toolCalls && message.toolCalls.length > 0) {
      // Check if all tools completed
      const allComplete = message.toolCalls.every(
        tc => tc.status === 'success' || tc.status === 'failed'
      );
      
      if (allComplete) {
        // Create function beat
        const beat = createBeat(currentBeat, 'task-execution');
        beat.category = 'function'; // Always function if tools present
        beat.toolCalls = message.toolCalls;
        beat.beatStatus = message.toolCalls.some(tc => tc.status === 'failed')
          ? 'incomplete'
          : 'complete';
        
        beats.push(beat);
        currentBeat = [];
      }
    }
  }
  
  return beats;
}
```

#### Tool Call Summarization

```typescript
function summarizeToolCalls(
  toolCalls: ToolCall[],
  level: SummaryLevel
): string {
  if (level === 'L1') {
    // Detailed: List all tool calls
    return toolCalls.map(tc => 
      `${tc.displayName}: ${tc.result.summary}`
    ).join('\n');
  } else if (level === 'L2') {
    // Abstract: Main action + outcome
    const primary = toolCalls[0]; // First/main tool
    return `${primary.icon} ${primary.displayName} - ${primary.result.summary}`;
  } else {
    // L3+: Incorporated into conversation summary
    return `Completed ${toolCalls.length} action${toolCalls.length > 1 ? 's' : ''}`;
  }
}
```

---

### 8. Performance Optimization (Three-Column Specific)

Ensure the system runs smoothly even with very long conversations across three columns.

#### Optimization Strategies

**1. Column-Based Lazy Loading**:
```typescript
// Only render visible column contents
function ConversationView({ state }: Props) {
  const visibility = state.columnVisibility;
  
  return (
    <div className="three-column-layout">
      {visibility.summary && (
        <SummaryColumn cards={state.summaryCards} />
      )}
      
      {visibility.keypoint && (
        <KeyPointColumn 
          keyPoints={getCurrentKeyPoints(state)}
        />
      )}
      
      <ConversationColumn 
        messages={getVisibleMessages(state)}
        separators={state.separators}
      />
    </div>
  );
}
```

**2. Virtual Scrolling** (for long conversations):
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function MessageList({ messages }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Average message height
    overscan: 5
  });
  
  return (
    <div ref={parentRef} className="message-list">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(item => (
          <div key={item.key} style={{ height: item.size }}>
            <Message data={messages[item.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

**3. Memoization** (for expensive computations):
```typescript
// Cache category filtering
const visibleMessages = useMemo(() => {
  if (viewMode === 'current') return allMessages;
  return allMessages.filter(m => m.category === activeCategory);
}, [allMessages, viewMode, activeCategory]);

// Cache summary card generation
const summaryCards = useMemo(() => {
  return beats
    .filter(b => shouldTransitionToSummary(b, state))
    .map(b => generateSummaryCard(b));
}, [beats, state.messages.length]);
```

**4. Web Workers** (for background processing):
```typescript
// Beat detection in background
const beatDetectionWorker = new Worker('./beat-detection-worker.ts');

async function detectBeatInBackground(
  messages: Message[]
): Promise<ConversationBeat> {
  return new Promise((resolve) => {
    beatDetectionWorker.postMessage({ messages });
    beatDetectionWorker.onmessage = (e) => resolve(e.data);
  });
}
```

**5. Batch Summarization**:
```typescript
// Generate multiple summaries in one API call
async function batchSummarize(
  beats: ConversationBeat[]
): Promise<Map<string, SummaryLevels>> {
  const summaries = new Map();
  
  // Process in batches of 5
  for (let i = 0; i < beats.length; i += 5) {
    const batch = beats.slice(i, i + 5);
    
    const results = await Promise.all(
      batch.map(beat => generateSummary({
        category: beat.category,
        level: 'L2',
        beatType: beat.beatType,
        messages: getMessagesForBeat(beat)
      }))
    );
    
    results.forEach((summary, idx) => {
      summaries.set(batch[idx].id, { l2: summary });
    });
  }
  
  return summaries;
}
```

**Performance Targets**:
- New message processing: <100ms
- Beat detection: <200ms per message
- Summary generation: <500ms per beat (batch mode)
- Category filtering: <50ms
- Column show/hide animation: 60fps
- UI rendering: 60fps during scroll
- Memory usage: <100MB for 1000 messages

---

### 9. Error Handling & Fallbacks

Build resilient system with graceful degradation for elderly users.

#### Error Scenarios

**Summarization API Failure**:
```typescript
async function generateSummaryWithFallback(
  beat: ConversationBeat,
  level: SummaryLevel
): Promise<string> {
  try {
    // Try AI-generated summary
    return await generateSummary({ beat, level });
  } catch (error) {
    console.error('AI summarization failed:', error);
    
    // Fallback 1: Extractive summarization
    try {
      return extractiveSummary(beat, level);
    } catch (error2) {
      // Fallback 2: Simple truncation
      return simpleTruncation(beat, level);
    }
  }
}
```

**Beat Detection Failure**:
```typescript
function detectBeatWithFallback(
  messages: Message[]
): ConversationBeat {
  try {
    // Try semantic analysis
    return detectBeatSemantic(messages);
  } catch (error) {
    // Fallback: Time-based grouping
    return detectBeatByTime(messages, 5 * 60 * 1000); // 5 min threshold
  }
}
```

**Category Classification Failure**:
```typescript
function classifyBeatSafe(beat: ConversationBeat): BeatCategory {
  try {
    return classifyBeat(beat);
  } catch (error) {
    // Safe default: Regular
    console.warn('Category classification failed, defaulting to regular');
    return 'regular';
  }
}
```

**Tool Execution Failure**:
```typescript
async function executeToolSafely(
  tool: ToolDefinition
): Promise<ToolCall> {
  try {
    return await executeWithRetry(tool);
  } catch (error) {
    // Return failed result with user-friendly message
    return {
      // ... tool metadata
      status: 'failed',
      error: {
        code: error.code || 'UNKNOWN',
        message: error.message,
        userFriendlyMessage: tool.errorMessage(error) || 
          'Something went wrong. Please try again.',
        isRetryable: tool.isRetryable
      }
    };
  }
}
```

#### User-Facing Error Messages

```typescript
interface ErrorMessage {
  title: string;
  message: string;
  action?: {
    label: string;
    handler: () => void;
  };
}

function getErrorMessage(error: Error): ErrorMessage {
  if (error instanceof NetworkError) {
    return {
      title: 'Connection problem',
      message: 'Please check your internet connection and try again.',
      action: {
        label: 'Retry',
        handler: () => retryLastAction()
      }
    };
  }
  
  // Default error
  return {
    title: 'Something went wrong',
    message: 'Please try again or contact support if the problem continues.',
    action: {
      label: 'Try Again',
      handler: () => retryLastAction()
    }
  };
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
**Goal**: Basic three-column UX with manual categorization

- ✅ Message and beat data structures with `category` field
- ✅ Basic beat detection (time-based + keyword triggers)
- ✅ Simple category classification (keyword-based)
- ✅ Separator generation for functions and meta
- ✅ State management setup (ThreeColumnConversationState)
- ✅ In-memory storage
- ✅ Basic UI: Three columns with progressive reveal

**Deliverable**: Working three-column interface with manual/simple categorization

### Phase 2: AI Integration (Week 3-4)
**Goal**: Smart categorization and summarization

- 🔄 Integrate LLM API for summarization (L1, L2)
- 🔄 Improve beat detection with semantic analysis
- 🔄 Category-specific summarization templates
- 🔄 Auto-generate summary cards
- 🔄 Dynamic threshold management
- 🔄 Caching layer for summaries
- 🔄 Persistent storage (localStorage + IndexedDB)

**Deliverable**: Intelligent summarization with category-aware AI

### Phase 3: Tool Calling (Week 5)
**Goal**: Function category with real tool executions

- 🔄 Tool registry and execution engine
- 🔄 Tool call tracking and status updates
- 🔄 Permission management
- 🔄 Error handling and retries
- 🔄 Tool call summarization
- 🔄 Real-time execution updates

**Deliverable**: Working function executions with green separators

### Phase 4: Optimization (Week 6-7)
**Goal**: Production-ready performance

- 🔄 Web Worker for background processing
- 🔄 Virtual scrolling implementation
- 🔄 Performance profiling and optimization
- 🔄 Memory management
- 🔄 Batch API operations
- 🔄 Error handling and fallbacks

**Deliverable**: Smooth 60fps experience with 1000+ messages

### Phase 5: Advanced Features (Week 8+)
**Goal**: Polished experience with smart features

- 🔄 L3/L4 summarization (conversation and topic level)
- 🔄 Semantic search across conversation
- 🔄 Context-aware summary regeneration
- 🔄 Incomplete beat tracking and recovery
- 🔄 User preference learning
- 🔄 Export/import conversation state

**Deliverable**: Production-ready with advanced elderly-friendly features

---

## Technology Stack

### Beat Detection & Classification
- **TensorFlow.js** (optional): Client-side ML for semantic analysis
- **Natural NLP library**: Basic text analysis and keyword matching
- **Custom heuristics**: Pattern matching for category detection
- **Embeddings API**: OpenAI embeddings for semantic similarity

### Summarization
- **OpenAI GPT-4o-mini API**: Fast, cheap, high-quality summaries
- **Category-specific prompts**: Different templates per category
- **Extractive fallback**: Custom algorithm when API unavailable
- **Caching**: Redis or in-memory for frequent summaries

### State Management
- **Zustand**: Lightweight state management for React
- **IndexedDB** (via Dexie.js): Persistent storage for conversations
- **React Query**: API caching and synchronization
- **Immer**: Immutable state updates

### Performance
- **React Virtual** (@tanstack/react-virtual): Virtual scrolling
- **Comlink**: Web Worker communication
- **React.memo & useMemo**: Component and computation memoization
- **Debounce/Throttle**: Rate limiting for expensive operations

### Tool Calling
- **Axios**: HTTP requests for external APIs
- **Retry library**: Exponential backoff for failed requests
- **WebSocket**: Real-time updates for long-running tools
- **Permission API**: Browser permissions management

---

## Database Schema

### Messages Table
```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  beat_id TEXT,
  role TEXT CHECK(role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  category TEXT CHECK(category IN ('regular', 'function', 'meta')),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSON,
  
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (beat_id) REFERENCES beats(id)
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_category ON messages(conversation_id, category);
CREATE INDEX idx_messages_beat ON messages(beat_id);
```

### Beats Table
```sql
CREATE TABLE beats (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('regular', 'function', 'meta')),
  beat_type TEXT,
  beat_status TEXT CHECK(beat_status IN ('complete', 'incomplete', 'tentative')),
  start_index INTEGER NOT NULL,
  end_index INTEGER NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  topic TEXT,
  embedding BLOB,  -- For semantic search
  
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE INDEX idx_beats_conversation ON beats(conversation_id);
CREATE INDEX idx_beats_category ON beats(conversation_id, category);
CREATE INDEX idx_beats_status ON beats(beat_status);
```

### Summaries Table
```sql
CREATE TABLE summaries (
  id TEXT PRIMARY KEY,
  beat_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  category TEXT NOT NULL,
  l1_summary TEXT,
  l2_summary TEXT,
  l3_summary TEXT,
  l4_label TEXT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (beat_id) REFERENCES beats(id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE INDEX idx_summaries_beat ON summaries(beat_id);
CREATE INDEX idx_summaries_conversation ON summaries(conversation_id, category);
```

### Tool Calls Table
```sql
CREATE TABLE tool_calls (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  beat_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  parameters JSON,
  result JSON,
  status TEXT CHECK(status IN ('pending', 'running', 'success', 'failed')),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  duration INTEGER,
  error_code TEXT,
  error_message TEXT,
  user_friendly_message TEXT,
  is_retryable BOOLEAN,
  requires_permission BOOLEAN DEFAULT false,
  permission_granted BOOLEAN,
  data_accessed JSON,
  
  FOREIGN KEY (message_id) REFERENCES messages(id),
  FOREIGN KEY (beat_id) REFERENCES beats(id)
);

CREATE INDEX idx_tool_calls_message ON tool_calls(message_id);
CREATE INDEX idx_tool_calls_status ON tool_calls(status);
CREATE INDEX idx_tool_calls_category ON tool_calls(conversation_id, category);
```

---

## Open Technical Questions

1. ✅ **Category detection accuracy**: How to ensure 95%+ accuracy in classifying Regular/Function/Meta?
   - **Answer**: Hybrid approach - tool calls = function, meta keywords = meta, else regular. Manual override option in UI.

2. ⏳ **Local ML models vs cloud API**: What's the right balance for elderly users (privacy vs. performance)?
   - **Research needed**: Test local summarization quality vs. API cost/latency.

3. ✅ **Separator timing**: Should separators appear immediately or with slight delay?
   - **Answer**: Immediate for function start, after completion for function end.

4. ⏳ **Optimal storage format**: IndexedDB vs. localStorage vs. server-side for very long conversations?
   - **Recommendation**: IndexedDB for 1000+ messages, localStorage for quick access, server-side for backup.

5. ⏳ **Vector database**: Should we use Pinecone/Weaviate for semantic search?
   - **Decision pending**: Start with simple similarity, upgrade if needed.

6. ⏳ **Multi-language support**: How to handle conversations in multiple languages?
   - **Future feature**: Focus on English/Swedish first, expand later.

7. ✅ **Privacy considerations**: Should summaries be generated locally?
   - **Answer**: API-based for quality, with clear privacy policy. Local fallback optional.

8. ✅ **Incomplete beat UI**: How to make incomplete beats stand out without overwhelming?
   - **Answer**: Subtle dotted border + small badge. Not intrusive.

---

## Success Criteria

### Functional Requirements
- ✅ Beat detection accuracy >90% (human evaluation)
- ✅ Category classification accuracy >95%
- ✅ Summary quality score >4/5 (user ratings)
- ✅ Separator placement accuracy 100% (deterministic)
- ✅ No perceptible lag when adding new messages (<100ms)
- ✅ Support for 1000+ message conversations
- ✅ <2 second cold start for loading conversation

### UX Requirements (Elderly-Focused)
- ✅ Progressive column reveal feels natural (user testing)
- ✅ Color coding is immediately understandable (>90% user comprehension)
- ✅ Category filtering is fast and smooth (<50ms)
- ✅ Error messages are clear and actionable
- ✅ No data loss on browser refresh
- ✅ Works offline with cached summaries

### Performance Requirements
- ✅ 60fps UI during all interactions
- ✅ <500ms beat detection per message
- ✅ <500ms summary generation per beat (batch mode)
- ✅ <50ms category filtering
- ✅ <100MB memory for 1000 messages
- ✅ <2MB storage per conversation (compressed)

---

## Labels

- `enhancement`
- `backend`
- `ai-ml`
- `performance`
- `three-column-architecture`

## Priority

**High** - Required for core conversation interface feature (Issue #1) with three-column UX support.

---

## Related Issues

- **Issue #1**: Progressive Conversation Summarization UI (Frontend)
- **Issue #3**: Conversation Topic Clustering & Navigation
- **VISUAL_ARCHITECTURE_DIAGRAM.md**: Three-Column System Documentation
- **ISSUE_2_THREE_COLUMN_ANALYSIS.md**: Analysis of changes needed for three-column UX
