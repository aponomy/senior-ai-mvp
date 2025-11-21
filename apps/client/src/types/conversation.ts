// Message and conversation types for progressive summarization

export type MessageRole = 'user' | 'assistant' | 'system';
export type ToolCallStatus = 'pending' | 'success' | 'error';
export type ToolCategory = 'search' | 'transaction' | 'scheduling' | 'generation' | 'analysis' | 'communication';

/**
 * Tool call information for transparency
 */
export interface ToolCall {
  id: string;
  name: string;
  category: ToolCategory;
  status: ToolCallStatus;
  duration?: number; // in seconds
  parameters?: Record<string, unknown>;
  result?: unknown;
  error?: string;
  timestamp: Date;
}

/**
 * Individual message in a conversation
 */
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
}

/**
 * A conversation "beat" - a logical grouping of messages
 * Represents a cohesive exchange about a specific topic or task
 */
export interface ConversationBeat {
  id: string;
  messages: Message[];
  summary: string; // 1-2 sentence summary for Level 3 (solid boxes)
  condensedText: string; // 50-70% of original for Level 2 (blurred boxes)
  startTime: Date;
  endTime: Date;
  messageCount: number;
  topicKeywords?: string[]; // For future search/filtering
}

/**
 * Display level in the progressive summarization hierarchy
 */
export type DisplayLevel = 'full' | 'condensed' | 'abstract';

/**
 * Determines which display level a message/beat should use
 * based on its position in the conversation
 */
export interface DisplayThreshold {
  recentCount: number; // Number of recent messages to show at full detail
  nearRecentCount: number; // Number of messages to show condensed
  // Everything else shown as abstract summaries
}

/**
 * Default thresholds - can be adjusted based on conversation length
 */
export const DEFAULT_THRESHOLDS: DisplayThreshold = {
  recentCount: 5,
  nearRecentCount: 10,
};

/**
 * Expansion state for interactive elements
 */
export interface ExpansionState {
  expandedBeats: Set<string>; // Which summary boxes are expanded
  detailPanelBeatId: string | null; // Which beat is showing in detail panel
  detailPanelMessageId: string | null; // Which specific message in detail panel
}

/**
 * Props for conversation view components
 */
export interface ConversationViewProps {
  messages: Message[];
  beats: ConversationBeat[];
  thresholds?: DisplayThreshold;
  onMessageClick?: (messageId: string) => void;
  onBeatClick?: (beatId: string) => void;
}
