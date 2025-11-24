// Core message display components for progressive summarization

import type { Message } from '../../types/conversation';

interface MessageBubbleProps {
  message: Message;
  isCompact?: boolean;
  onClick?: () => void;
}

/**
 * Level 1: Full Detail Message Display
 * Shows complete message with full tool call details
 */
export function MessageBubble({ message, isCompact = false, onClick }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '70%',
        gap: '8px',
      }}
    >
      {/* Main message bubble */}
      <div
        onClick={onClick}
        style={{
          padding: isCompact ? '10px 12px' : '12px 14px',
          borderRadius: '12px',
          background: isUser
            ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
            : 'rgba(255, 255, 255, 0.05)',
          color: '#ffffff',
          fontSize: '14px',
          lineHeight: '1.5',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        onMouseEnter={(e) => {
          if (onClick) {
            e.currentTarget.style.background = isUser
              ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
              : 'rgba(255, 255, 255, 0.08)';
          }
        }}
        onMouseLeave={(e) => {
          if (onClick) {
            e.currentTarget.style.background = isUser
              ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
              : 'rgba(255, 255, 255, 0.05)';
          }
        }}
      >
        {message.content}
      </div>
      
      {/* Tool calls if present */}
      {message.toolCalls && message.toolCalls.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {message.toolCalls.map((toolCall) => (
            <div key={toolCall.id} style={{ fontSize: '12px', color: '#888' }}>
              Tool: {toolCall.name}
            </div>
          ))}
        </div>
      )}
      
      {/* Timestamp (optional, subtle) */}
      {!isCompact && (
        <div
          style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.4)',
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            marginTop: '-4px',
          }}
        >
          {formatMessageTime(message.timestamp)}
        </div>
      )}
    </div>
  );
}

interface CondensedMessageProps {
  messages: Message[];
  condensedText: string;
  onClick?: () => void;
}

/**
 * Level 2: Condensed/Blurred Message Display
 * Shows 50-70% condensed version with blur effect
 * Narrower box design for horizontal layout
 */
export function CondensedMessage({ messages, condensedText, onClick }: CondensedMessageProps) {
  const messageCount = messages.length;
  
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${messageCount} condensed messages. Click to expand.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '13px',
        lineHeight: '1.5',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        height: '140px',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Condensed text */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        {condensedText}
      </div>
    </div>
  );
}

interface SummaryBoxProps {
  beatId: string;
  summary: string;
  messageCount: number;
  hasToolCalls?: boolean;
  timestamp: Date;
  isExpanded?: boolean;
  onClick?: () => void;
}

/**
 * Level 3: Abstract Summary Box Display
 * Shows high-level summary of conversation beat
 * Compact box design for horizontal layout
 */
export function SummaryBox({ 
  beatId: _beatId,
  summary, 
  messageCount: _messageCount,
  hasToolCalls: _hasToolCalls,
  timestamp: _timestamp,
  isExpanded = false,
  onClick 
}: SummaryBoxProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${summary}. Click to expand.`}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        padding: '16px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.12)',
        border: '2px solid rgba(255, 255, 255, 0.25)',
        color: '#ffffff',
        fontSize: '13px',
        fontWeight: 500,
        lineHeight: '1.5',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        height: '140px',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Expand/collapse indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          fontSize: '16px',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          opacity: 0.7,
        }}
      >
        ⌄
      </div>
      
      {/* Summary text */}
      <div style={{ paddingRight: '24px', paddingLeft: '8px' }}>
        {summary}
      </div>
    </div>
  );
}

// Helper functions
function formatMessageTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
