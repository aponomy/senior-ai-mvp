// Core message display components for progressive summarization

import type { Message } from '../../types/conversation';
import { ToolCallDisplay } from './ToolCallDisplay';

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
          padding: isCompact ? '12px 14px' : '16px',
          borderRadius: '12px',
          background: isUser
            ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
            : 'rgba(255, 255, 255, 0.05)',
          color: '#ffffff',
          fontSize: isCompact ? '14px' : '16px',
          lineHeight: '1.6',
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
            <ToolCallDisplay key={toolCall.id} toolCall={toolCall} level="full" />
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
 */
export function CondensedMessage({ messages, condensedText, onClick }: CondensedMessageProps) {
  const messageCount = messages.length;
  const hasToolCalls = messages.some(m => m.toolCalls && m.toolCalls.length > 0);
  
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
        padding: '14px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px',
        lineHeight: '1.5',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        minHeight: '60px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {/* Blur overlay icon */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          fontSize: '16px',
          opacity: 0.5,
        }}
      >
        💭
      </div>
      
      {/* Condensed text */}
      <div style={{ marginBottom: hasToolCalls ? '8px' : '0' }}>
        {condensedText}
      </div>
      
      {/* Tool call indicators */}
      {hasToolCalls && (
        <div
          style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
          }}
        >
          <span>🔧</span>
          <span>Used {countToolCalls(messages)} tool{countToolCalls(messages) > 1 ? 's' : ''}</span>
        </div>
      )}
      
      {/* Message count badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.4)',
          fontWeight: 500,
        }}
      >
        {messageCount} message{messageCount > 1 ? 's' : ''}
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
 */
export function SummaryBox({ 
  beatId: _beatId, // Passed but not used in current implementation
  summary, 
  messageCount, 
  hasToolCalls = false,
  timestamp,
  isExpanded = false,
  onClick 
}: SummaryBoxProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${summary}. ${messageCount} messages. Click to expand.`}
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
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '1.5',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        minHeight: '70px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      }}
    >
      {/* Expand/collapse chevron */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '18px',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          opacity: 0.6,
        }}
      >
        ⌄
      </div>
      
      {/* Summary icon */}
      <div
        style={{
          fontSize: '20px',
          marginBottom: '8px',
          display: 'inline-block',
        }}
      >
        📦
      </div>
      
      {/* Summary text */}
      <div style={{ paddingRight: '32px', marginBottom: '12px' }}>
        {summary}
      </div>
      
      {/* Metadata footer */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          marginTop: '8px',
        }}
      >
        <span>{messageCount} messages</span>
        {hasToolCalls && <span>• 🔧 Tools used</span>}
        <span>• {formatRelativeTime(timestamp)}</span>
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

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diffMinutes = Math.floor((now - date.getTime()) / (1000 * 60));
  
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function countToolCalls(messages: Message[]): number {
  return messages.reduce((count, msg) => {
    return count + (msg.toolCalls?.length || 0);
  }, 0);
}
