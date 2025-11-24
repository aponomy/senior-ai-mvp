# Issue 7: Funktioner Workflow Engine - Three-Column Integration

## Overview

Implement the backend systems for Funktioner (structured workflows) with deep integration into the three-column architecture. This includes skeleton definition, workflow state management, tool orchestration, transaction handling, and automatic Function Summary generation.

**Related to**: Issue #5 (Backend), Issue #6 (Funktioner UX), Issue #2 (Three-Column UX)

---

## Key Integration Points with Three-Column System

### 1. Function Summaries are First-Class Citizens

Every Function execution creates a **Function Summary** in the left column:
- Shows workflow progress (which steps completed)
- Appears in "FUNCTIONS" section with green indicator
- Supports branching from summary or individual steps
- Contains key points for middle column navigation

### 2. Messages Flow Through Conversation Column

Function execution messages integrate seamlessly:
- Separator marks transition to Function category
- Tool calls visible with status updates
- AI guidance messages interspersed
- Separator marks return to regular conversation

### 3. Skeleton Canvas is Supplementary

The workflow skeleton appears as a fourth space:
- Overlays or sits beside conversation column
- Only visible during active execution or review
- Not a replacement for summary column navigation
- Contextual, not permanent

---

## Part 1: Enhanced Funktion Skeleton System

### Core Data Structures with Three-Column Support

```typescript
interface FunktionSkeleton {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: FunktionCategory;
  icon: string;
  
  // Workflow definition
  steps: SkeletonStep[];             // Renamed from 'actions' for clarity
  relationships: StepRelationship[]; // Renamed from 'ActionRelationship'
  
  // Entry and exit points
  initialStepId?: string;
  finalStepIds: string[];
  
  // UI Configuration for three-column system
  ui: {
    displayMode: 'inline' | 'overlay' | 'fourth-column';
    preferredMode: 'inline';         // Default for elderly users
    allowModeSwitch: boolean;
    primaryColor: string;            // For separators and skeleton
    compactSummary: boolean;         // Show compact workflow in summary card
  };
  
  // Branching support
  branchableSteps: string[];         // Which steps allow branching
  
  // Configuration
  allowNonLinear: boolean;
  requiresAuth: boolean;
  requiredPermissions: string[];
  
  // Metadata
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SkeletonStep {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  
  // Tool orchestration
  requiredTools: ToolDefinition[];
  optionalTools: ToolDefinition[];
  toolChainStrategy: 'sequential' | 'parallel' | 'conditional';
  
  // User interaction
  prompts: StepPrompt[];
  confirmationRequired: boolean;
  confirmationMessage?: string;
  
  // Timing
  estimatedDuration?: number;
  timeout?: number;
  
  // State
  isRepeatable: boolean;
  maxRepetitions?: number;
  
  // Branching (NEW for three-column)
  canBranchFrom: boolean;            // Can user branch from this step?
  branchPrompt?: string;             // "Try different amount?"
  
  // AI guidance (appears in conversation column)
  aiGuidance: {
    beforeStep: string;              // Renamed from beforeAction
    duringStep: string;              // Status updates
    afterSuccess: string;
    afterFailure: string;
  };
  
  // Key point generation (NEW for middle column)
  keyPointTemplate: string;          // How to format this step as key point
}

interface StepRelationship {
  id: string;
  fromStepId: string;
  toStepId: string;
  type: RelationType;
  condition?: Condition;
  label?: string;
}

type RelationType = 
  | 'sequential'   // A must complete before B
  | 'branch'       // A leads to B OR C (user choice)
  | 'parallel'     // A and B can happen in any order
  | 'loop'         // B can return to A
  | 'conditional'; // A → B only if condition met
```

### Example: Bank Transfer with Three-Column Integration

```typescript
const bankTransferSkeleton: FunktionSkeleton = {
  id: 'bank-transfer',
  name: 'bank_transfer',
  displayName: 'Bank Transfer',
  description: 'Transfer money between accounts',
  category: 'finance',
  icon: '💰',
  
  // UI optimized for three-column
  ui: {
    displayMode: 'inline',
    preferredMode: 'inline',
    allowModeSwitch: true,
    primaryColor: '#10b981',  // Green for functions
    compactSummary: true
  },
  
  steps: [
    {
      id: 'check-balance',
      name: 'check_balance',
      displayName: 'Check Balance',
      description: 'Verify available funds',
      icon: '🏦',
      
      requiredTools: [bankAPITool],
      optionalTools: [],
      toolChainStrategy: 'sequential',
      
      prompts: [
        {
          id: 'account-select',
          type: 'choice',
          question: 'Which account?',
          options: [
            { value: 'checking', label: 'Checking Account' },
            { value: 'savings', label: 'Savings Account' }
          ],
          required: true
        }
      ],
      
      confirmationRequired: false,
      estimatedDuration: 2000,
      isRepeatable: true,
      
      // Branching support
      canBranchFrom: false,  // Don't branch from balance check
      
      // Conversation column guidance
      aiGuidance: {
        beforeStep: "Let me check your balance...",
        duringStep: "Connecting to bank...",
        afterSuccess: "Your balance is {{amount}} kr",
        afterFailure: "I couldn't retrieve your balance. {{error}}"
      },
      
      // Middle column key point
      keyPointTemplate: "• Check Balance\\n  ✓ {{amount}} kr"
    },
    {
      id: 'specify-transfer',
      name: 'specify_transfer',
      displayName: 'Specify Transfer',
      description: 'Enter transfer details',
      icon: '✏️',
      
      requiredTools: [],
      optionalTools: [contactLookupTool],
      toolChainStrategy: 'sequential',
      
      prompts: [
        {
          id: 'recipient',
          type: 'text',
          question: 'Who do you want to send money to?',
          placeholder: 'Account number or contact name',
          required: true
        },
        {
          id: 'amount',
          type: 'number',
          question: 'How much?',
          placeholder: '0 kr',
          validation: {
            min: 1,
            max: 100000,
            message: 'Amount must be between 1 and 100,000 kr'
          },
          required: true
        },
        {
          id: 'message',
          type: 'text',
          question: 'Payment message (optional)',
          placeholder: 'e.g., Rent, groceries',
          required: false
        }
      ],
      
      confirmationRequired: false,
      estimatedDuration: 0,
      isRepeatable: false,
      
      // This is a good branch point
      canBranchFrom: true,
      branchPrompt: "Try different amount?",
      
      aiGuidance: {
        beforeStep: "Let's set up your transfer",
        duringStep: "",
        afterSuccess: "Transfer details recorded",
        afterFailure: ""
      },
      
      keyPointTemplate: "• Transfer {{amount}} kr\\n  to {{recipient}}"
    },
    {
      id: 'verify-transfer',
      name: 'verify_transfer',
      displayName: 'Verify Transfer',
      description: 'Confirm transfer details',
      icon: '🔍',
      
      requiredTools: [bankAPITool],
      optionalTools: [],
      toolChainStrategy: 'sequential',
      
      prompts: [
        {
          id: 'confirm',
          type: 'confirmation',
          question: 'Please confirm this transfer:\\n{{summary}}',
          required: true
        }
      ],
      
      confirmationRequired: true,
      confirmationMessage: 'Transfer {{amount}} kr to {{recipient}}?',
      estimatedDuration: 3000,
      isRepeatable: false,
      
      canBranchFrom: true,
      branchPrompt: "What if I cancel?",
      
      aiGuidance: {
        beforeStep: "Let me verify the details...",
        duringStep: "Checking recipient account...",
        afterSuccess: "Everything looks good!",
        afterFailure: "Verification failed: {{error}}"
      },
      
      keyPointTemplate: "• Verify Details\\n  ✓ {{status}}"
    },
    {
      id: 'execute-transfer',
      name: 'execute_transfer',
      displayName: 'Execute Transfer',
      description: 'Complete the transaction',
      icon: '✅',
      
      requiredTools: [bankAPITool],
      optionalTools: [notificationTool],
      toolChainStrategy: 'sequential',
      
      prompts: [],
      confirmationRequired: false,
      estimatedDuration: 5000,
      timeout: 30000,
      isRepeatable: false,
      
      canBranchFrom: false,  // Can't branch after execution
      
      aiGuidance: {
        beforeStep: "Processing your transfer...",
        duringStep: "Transaction in progress...",
        afterSuccess: "Transfer complete! Ref: {{transactionId}}",
        afterFailure: "Transfer failed: {{error}}"
      },
      
      keyPointTemplate: "• Transfer Complete\\n  ✓ TX-{{transactionId}}"
    }
  ],
  
  relationships: [
    { id: 'r1', fromStepId: 'check-balance', toStepId: 'specify-transfer', type: 'sequential' },
    { id: 'r2', fromStepId: 'specify-transfer', toStepId: 'verify-transfer', type: 'sequential' },
    {
      id: 'r3',
      fromStepId: 'verify-transfer',
      toStepId: 'execute-transfer',
      type: 'conditional',
      condition: { type: 'user_input', expression: 'confirm === true' }
    },
    {
      id: 'r4',
      fromStepId: 'verify-transfer',
      toStepId: 'specify-transfer',
      type: 'loop',
      condition: { type: 'user_input', expression: 'confirm === false' },
      label: 'Edit details'
    }
  ],
  
  initialStepId: 'check-balance',
  finalStepIds: ['execute-transfer'],
  branchableSteps: ['specify-transfer', 'verify-transfer'],
  
  allowNonLinear: false,
  requiresAuth: true,
  requiredPermissions: ['bank_access'],
  
  version: '1.0.0',
  createdAt: new Date(),
  updatedAt: new Date()
};
```

---

## Part 2: Function Session with Summary Generation

### Enhanced Session State

```typescript
interface FunktionSession {
  id: string;
  userId: string;
  funktionId: string;
  
  // Workflow state
  currentStepId: string;
  stepHistory: StepHistoryEntry[];
  completedStepIds: Set<string>;
  availableStepIds: Set<string>;
  
  // Data collected
  stepData: Map<string, any>;
  variables: Map<string, any>;
  
  // Three-column integration (NEW)
  conversationId: string;
  branchId: string;
  
  // Function Summary creation (NEW)
  summaryGeneration: {
    startMessageId: string | null;     // First message in function
    endMessageId: string | null;       // Last message in function
    functionsMessages: string[];       // All function category messages
    separatorPositions: number[];      // Where separators appear
  };
  
  // Tool execution
  toolCalls: ToolCall[];
  pendingToolCalls: ToolCall[];
  
  // Transactions
  transactions: Transaction[];
  
  // Progress tracking
  progress: {
    totalSteps: number;
    completedSteps: number;
    currentStepNumber: number;
    estimatedTimeRemaining?: number;
  };
  
  // Status
  status: 'active' | 'paused' | 'completed' | 'failed' | 'cancelled';
  startedAt: Date;
  lastActiveAt: Date;
  completedAt?: Date;
  
  // Error handling
  errors: SessionError[];
  lastError?: SessionError;
}

interface StepHistoryEntry {
  stepId: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'pending' | 'active' | 'completed' | 'failed' | 'skipped';
  toolCalls: string[];
  result?: any;
  error?: string;
  
  // Message tracking (NEW for summary generation)
  messageIds: string[];              // Messages created during this step
}
```

---

## Part 3: Workflow Engine with Three-Column Integration

### Enhanced Workflow Engine

```typescript
class FunktionWorkflowEngine {
  private skeleton: FunktionSkeleton;
  private session: FunktionSession;
  private conversationBridge: FunktionConversationBridge;
  
  async startSession(
    userId: string,
    funktionId: string,
    conversationId: string,
    branchId: string
  ): Promise<FunktionSession> {
    // Load skeleton
    this.skeleton = await this.loadSkeleton(funktionId);
    
    // Create session linked to conversation
    this.session = this.createNewSession(
      userId,
      funktionId,
      conversationId,
      branchId
    );
    
    // Add function separator to conversation
    const separatorMsg = await this.conversationBridge.addSeparator(
      conversationId,
      branchId,
      'function',
      this.skeleton.displayName,
      this.skeleton.icon
    );
    
    this.session.summaryGeneration.startMessageId = separatorMsg.id;
    this.session.summaryGeneration.separatorPositions.push(separatorMsg.position);
    
    // Start with initial step
    if (this.skeleton.initialStepId) {
      await this.activateStep(this.skeleton.initialStepId);
    } else {
      this.session.availableStepIds = this.getAllRootSteps();
    }
    
    return this.session;
  }
  
  private async completeStep(
    stepId: string,
    data?: any
  ): Promise<WorkflowResult> {
    const step = this.getStep(stepId);
    
    // Mark step complete
    const historyEntry = this.session.stepHistory.find(
      e => e.stepId === stepId && !e.completedAt
    );
    
    if (historyEntry) {
      historyEntry.completedAt = new Date();
      historyEntry.status = 'completed';
      historyEntry.result = data;
    }
    
    this.session.completedStepIds.add(stepId);
    
    // Store step data
    if (data) {
      this.session.stepData.set(stepId, data);
    }
    
    // Add completion message to conversation
    const message = await this.conversationBridge.addStepMessage(
      this.session,
      step,
      'complete',
      data
    );
    
    if (historyEntry) {
      historyEntry.messageIds.push(message.id);
    }
    
    this.session.summaryGeneration.functionsMessages.push(message.id);
    
    // Calculate next available steps
    const nextSteps = this.calculateNextSteps(stepId);
    this.session.availableStepIds = new Set(nextSteps);
    
    // Check if workflow complete
    if (this.isWorkflowComplete()) {
      return await this.completeWorkflow();
    }
    
    return {
      type: 'step_completed',
      completedStep: stepId,
      availableSteps: Array.from(this.session.availableStepIds),
      progress: this.calculateProgress()
    };
  }
  
  private async completeWorkflow(): Promise<WorkflowResult> {
    this.session.status = 'completed';
    this.session.completedAt = new Date();
    
    // Add closing separator
    const separatorMsg = await this.conversationBridge.addSeparator(
      this.session.conversationId,
      this.session.branchId,
      'function-end',
      'Back to conversation'
    );
    
    this.session.summaryGeneration.endMessageId = separatorMsg.id;
    this.session.summaryGeneration.separatorPositions.push(separatorMsg.position);
    
    // Generate Function Summary (NEW - core three-column integration)
    const functionSummary = await this.generateFunctionSummary();
    
    // Save session
    await this.saveSession(this.session);
    
    return {
      type: 'workflow_completed',
      session: this.session,
      summary: functionSummary,
      transactions: this.session.transactions
    };
  }
  
  // NEW: Generate Function Summary for left column
  private async generateFunctionSummary(): Promise<FunctionSummary> {
    const skeleton = this.skeleton;
    const session = this.session;
    
    // Generate title with icon
    const title = this.generateSummaryTitle(session);
    
    // Generate key points from completed steps
    const keyPoints = this.generateKeyPoints(session);
    
    // Extract transaction data if any
    const transaction = session.transactions.length > 0
      ? this.extractTransactionSummary(session.transactions)
      : undefined;
    
    // Create Function Summary
    const functionSummary: FunctionSummary = {
      id: generateId(),
      conversationId: session.conversationId,
      branchId: session.branchId,
      category: 'function',
      
      // Display
      title,
      icon: skeleton.icon,
      
      // Link to skeleton
      funktionId: skeleton.id,
      skeletonId: skeleton.id,
      
      // Workflow state
      workflow: {
        status: 'completed',
        currentStepId: null,
        completedSteps: Array.from(session.completedStepIds),
        failedStepId: null,
        stepResults: Object.fromEntries(session.stepData),
        startedAt: session.startedAt,
        completedAt: session.completedAt!,
        duration: session.completedAt!.getTime() - session.startedAt.getTime()
      },
      
      // Transaction (if applicable)
      transaction,
      
      // Key points for middle column
      keyPoints,
      
      // Message range
      startMessageId: session.summaryGeneration.startMessageId!,
      endMessageId: session.summaryGeneration.endMessageId!,
      messageCount: session.summaryGeneration.functionsMessages.length,
      
      // Summary text
      summaryText: this.generateSummaryText(session),
      
      // Position
      position: await this.calculateSummaryPosition(session),
      
      // Branching support
      isBranchPoint: true,
      branchPointId: null,
      branchableSteps: skeleton.branchableSteps,
      
      createdAt: new Date()
    };
    
    // Save Function Summary to database
    await this.saveFunctionSummary(functionSummary);
    
    return functionSummary;
  }
  
  private generateSummaryTitle(session: FunktionSession): string {
    // Use skeleton name + key detail
    const skeleton = this.skeleton;
    const stepData = session.stepData;
    
    // Extract key detail from step data
    let detail = '';
    
    if (skeleton.id === 'bank-transfer') {
      const amount = stepData.get('specify-transfer')?.amount;
      detail = amount ? `${amount} kr` : '';
    } else if (skeleton.id === 'image-generation') {
      const style = stepData.get('choose-style')?.style;
      detail = style || '';
    }
    
    return detail
      ? `${skeleton.icon} ${skeleton.displayName} • ${detail}`
      : `${skeleton.icon} ${skeleton.displayName}`;
  }
  
  private generateKeyPoints(session: FunktionSession): KeyPoint[] {
    const keyPoints: KeyPoint[] = [];
    
    for (const historyEntry of session.stepHistory) {
      if (historyEntry.status !== 'completed') continue;
      
      const step = this.getStep(historyEntry.stepId);
      const stepData = session.stepData.get(historyEntry.stepId);
      
      // Use step's key point template
      const text = this.interpolate(
        step.keyPointTemplate,
        stepData || {}
      );
      
      keyPoints.push({
        id: generateId(),
        summaryId: '', // Set by caller
        branchId: session.branchId,
        text,
        messageIds: historyEntry.messageIds,
        position: keyPoints.length,
        
        // Branching support
        isBranchPoint: step.canBranchFrom,
        branchPointId: null
      });
    }
    
    return keyPoints;
  }
  
  private generateSummaryText(session: FunktionSession): string {
    const skeleton = this.skeleton;
    const completedSteps = Array.from(session.completedStepIds);
    const totalSteps = skeleton.steps.length;
    
    const stepNames = completedSteps
      .map(id => this.getStep(id).displayName)
      .join(', ');
    
    return `Completed ${skeleton.displayName}: ${stepNames}. ` +
           `Duration: ${this.formatDuration(session.completedAt!.getTime() - session.startedAt.getTime())}.`;
  }
}
```

---

## Part 4: Transaction System

### Transaction Management

```typescript
interface Transaction {
  id: string;
  type: string;
  stepId: string;
  
  // Before/after state
  before: Record<string, any>;
  after: Record<string, any>;
  changes: Change[];
  
  // Status
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'reversed';
  reference?: string;
  
  // Metadata
  timestamp: Date;
  confirmations: Confirmation[];
  isReversible: boolean;
}

interface Change {
  field: string;
  oldValue: any;
  newValue: any;
  unit?: string;
}

class TransactionManager {
  async createTransaction(
    session: FunktionSession,
    stepId: string,
    type: string,
    data: TransactionData
  ): Promise<Transaction> {
    const transaction: Transaction = {
      id: generateId(),
      type,
      stepId,
      before: data.before,
      after: data.after,
      changes: this.calculateChanges(data.before, data.after),
      status: 'pending',
      timestamp: new Date(),
      confirmations: [],
      isReversible: data.isReversible ?? true
    };
    
    // Add to session
    session.transactions.push(transaction);
    
    // Persist to database
    await this.saveTransaction(transaction);
    
    // Add transaction message to conversation
    await this.addTransactionMessage(session, transaction);
    
    return transaction;
  }
  
  async executeTransaction(
    transaction: Transaction
  ): Promise<TransactionResult> {
    transaction.status = 'processing';
    
    try {
      const result = await this.performTransaction(transaction);
      
      transaction.status = 'completed';
      transaction.reference = result.reference;
      
      return {
        success: true,
        transaction,
        reference: result.reference
      };
    } catch (error) {
      transaction.status = 'failed';
      
      return {
        success: false,
        transaction,
        error: error.message
      };
    } finally {
      await this.updateTransaction(transaction);
    }
  }
  
  private calculateChanges(
    before: Record<string, any>,
    after: Record<string, any>
  ): Change[] {
    const changes: Change[] = [];
    
    for (const key of Object.keys(after)) {
      if (before[key] !== after[key]) {
        changes.push({
          field: key,
          oldValue: before[key],
          newValue: after[key]
        });
      }
    }
    
    return changes;
  }
}
```

---

## Part 5: Three-Column Conversation Bridge

### Integration Layer

```typescript
class FunktionConversationBridge {
  async addSeparator(
    conversationId: string,
    branchId: string,
    type: 'function' | 'function-end',
    label: string,
    icon?: string
  ): Promise<Message> {
    const content = type === 'function'
      ? `─────── ${icon} ${label} ───────`
      : `─────── Back to conversation ───────`;
    
    return await addMessage({
      conversationId,
      branchId,
      role: 'system',
      content,
      category: 'function',
      metadata: {
        isSeparator: true,
        separatorType: type,
        label
      }
    });
  }
  
  async addStepMessage(
    session: FunktionSession,
    step: SkeletonStep,
    type: 'start' | 'complete' | 'fail',
    data?: any
  ): Promise<Message> {
    let content = '';
    
    switch (type) {
      case 'start':
        content = step.aiGuidance.beforeStep;
        break;
      case 'complete':
        content = this.interpolate(
          step.aiGuidance.afterSuccess,
          data
        );
        break;
      case 'fail':
        content = this.interpolate(
          step.aiGuidance.afterFailure,
          data
        );
        break;
    }
    
    return await addMessage({
      conversationId: session.conversationId,
      branchId: session.branchId,
      role: 'assistant',
      content,
      category: 'function',
      metadata: {
        funktionId: session.funktionId,
        stepId: step.id,
        stepType: type
      }
    });
  }
  
  async addToolCallMessage(
    session: FunktionSession,
    toolCall: ToolCall
  ): Promise<Message> {
    const content = `🔧 ${toolCall.toolName}: ${toolCall.status}`;
    
    return await addMessage({
      conversationId: session.conversationId,
      branchId: session.branchId,
      role: 'assistant',
      content,
      category: 'function',
      toolCall: toolCall,
      metadata: {
        funktionId: session.funktionId,
        isToolCall: true
      }
    });
  }
}
```

---

## Part 6: Database Schema

### Tables for Funktioner

```sql
-- Funktion skeletons
CREATE TABLE funktion_skeletons (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  icon TEXT,
  
  -- Serialized skeleton
  skeleton_json JSON NOT NULL,
  
  -- UI configuration
  ui_config JSON NOT NULL,
  
  -- Branching
  branchable_steps JSON,
  
  -- Configuration
  allow_non_linear BOOLEAN DEFAULT false,
  requires_auth BOOLEAN DEFAULT true,
  required_permissions JSON,
  
  -- Metadata
  version TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Funktion sessions
CREATE TABLE funktion_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  funktion_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  
  -- State
  current_step_id TEXT,
  completed_step_ids JSON,
  available_step_ids JSON,
  step_data JSON,
  variables JSON,
  
  -- Summary generation tracking
  start_message_id TEXT,
  end_message_id TEXT,
  function_messages JSON,
  
  -- Status
  status TEXT CHECK(status IN ('active', 'paused', 'completed', 'failed', 'cancelled')),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  
  FOREIGN KEY (funktion_id) REFERENCES funktion_skeletons(id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (branch_id) REFERENCES branches(id),
  FOREIGN KEY (start_message_id) REFERENCES messages(id),
  FOREIGN KEY (end_message_id) REFERENCES messages(id)
);

-- Transactions
CREATE TABLE funktion_transactions (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  step_id TEXT NOT NULL,
  type TEXT NOT NULL,
  
  before_state JSON,
  after_state JSON,
  changes JSON,
  
  status TEXT CHECK(status IN ('pending', 'processing', 'completed', 'failed', 'reversed')),
  reference TEXT,
  is_reversible BOOLEAN DEFAULT true,
  
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES funktion_sessions(id)
);

-- Function Summaries (extends conversation_summaries)
-- Already handled in conversation_summaries table with category='function'
-- Additional fields stored in summary metadata JSON

-- Indexes
CREATE INDEX idx_funktion_sessions_user ON funktion_sessions(user_id, status);
CREATE INDEX idx_funktion_sessions_conversation ON funktion_sessions(conversation_id, branch_id);
CREATE INDEX idx_funktion_transactions_session ON funktion_transactions(session_id, status);
CREATE INDEX idx_funktion_skeletons_category ON funktion_skeletons(category, is_active);
```

---

## Part 7: Implementation Phases

### Phase 1: Foundation (Week 1-2)
**Goal**: Basic workflow engine with conversation integration

- [ ] Skeleton data structures with three-column metadata
- [ ] Simple sequential workflows
- [ ] Session state management
- [ ] Conversation bridge (separators, messages)
- [ ] Basic Function Summary generation

**Deliverable**: Bank transfer skeleton works, creates summary in left column

### Phase 2: Key Points & Middle Column (Week 2-3)
**Goal**: Function key points appear in middle column

- [ ] Key point generation from steps
- [ ] Key point templates in skeleton
- [ ] Message ID tracking per step
- [ ] Key point → message filtering
- [ ] Step results display

**Deliverable**: Clicking function summary shows key points in middle column

### Phase 3: Tool Execution (Week 3-4)
**Goal**: Real tool calls during workflow

- [ ] Tool orchestration (sequential/parallel)
- [ ] Tool call message creation
- [ ] Tool result handling
- [ ] Error recovery
- [ ] Timeout handling

**Deliverable**: Real bank API integration works in workflow

### Phase 4: Transaction System (Week 4-5)
**Goal**: Transaction tracking and display

- [ ] Transaction creation and tracking
- [ ] Before/after state capture
- [ ] Transaction confirmation
- [ ] Receipt generation
- [ ] Transaction in summary metadata

**Deliverable**: Bank transfer creates transaction record

### Phase 5: Branching Support (Week 5-6)
**Goal**: Branch from function steps

- [ ] Mark branchable steps in skeleton
- [ ] Branch creation from function summary
- [ ] Branch creation from key point
- [ ] Copy session state up to branch point
- [ ] Branch indicator in UI data

**Deliverable**: Can branch from "specify amount" step

### Phase 6: Advanced Workflows (Week 6-7)
**Goal**: Conditional and loop relationships

- [ ] Conditional step transitions
- [ ] Loop support (edit and retry)
- [ ] Parallel step execution
- [ ] Non-linear navigation
- [ ] User choice branching

**Deliverable**: Complex workflows work (image generation with regeneration loop)

### Phase 7: Additional Funktioner (Week 7-10)
**Goal**: Implement multiple skeleton types

**Image Generation** (Week 7-8):
- [ ] Skeleton definition
- [ ] Long-running process handling
- [ ] Progress updates
- [ ] Preview display
- [ ] Regeneration loop

**Calendar** (Week 8-9):
- [ ] Skeleton definition
- [ ] Calendar API integration
- [ ] Event CRUD operations
- [ ] Reminder setup

**Health Tracker** (Week 9-10):
- [ ] Skeleton definition
- [ ] Measurement recording
- [ ] Data visualization
- [ ] Export functionality

### Phase 8: Optimization (Week 10-12)
**Goal**: Performance and UX refinement

- [ ] Skeleton caching
- [ ] Session state optimization
- [ ] Workflow analytics
- [ ] Error recovery improvements
- [ ] Elderly-user testing and refinement

---

## Success Metrics

### Technical Performance
- Workflow completion rate: >85%
- Average step duration: <30s
- Tool execution success: >95%
- Transaction success: >99%
- Function Summary generation: <3s

### User Experience (Elderly Users)
- Can complete bank transfer without help: >80%
- Understand workflow progress: >85%
- Find past function execution: <15s
- Confidence in function execution: >90%
- Would use functions again: >85%

### System Capacity
- Support 20+ different funktioner
- Handle 100+ concurrent sessions
- Function Summary display: <200ms
- Skeleton render: <100ms

---

## Key Integration Points Summary

1. **Function Summaries**: Every workflow creates summary in left column with category='function'
2. **Messages**: All function messages have category='function', appear with green separators
3. **Key Points**: Generated from step templates, appear in middle column when selected
4. **Branching**: Steps marked as branchable, integrate with branch system
5. **Skeleton Canvas**: Fourth space, contextual, not permanent
6. **Transaction Records**: Captured in summary metadata, before/after states preserved

---

## Labels
- `enhancement`
- `backend`
- `funktioner`
- `three-column`
- `workflow-engine`
- `transactions`

## Priority
**High** - Core backend for structured task functionality

## Related Issues
- #5 (Backend) ✅
- #6 (Funktioner UX) ✅
- #2 (Three-Column UX) ✅
