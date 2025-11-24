import { useEffect, useRef } from 'react';
import type { Message } from '../../types/conversation';
import ChatInput from '../ChatInput';
import { MessageBubble } from './MessageComponents';

interface ConversationColumnProps {
  messages: Message[];
  selectedKeyPointId: number | null;
  isCurrentContext: boolean;
  onBackToCurrent: () => void;
  showNavigationHint?: boolean;
}

export default function ConversationColumn({
  messages,
  selectedKeyPointId: _selectedKeyPointId, // TODO: Use for message filtering
  isCurrentContext,
  onBackToCurrent,
  showNavigationHint = false
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
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(94,208,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(94,208,255,0.1)';
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
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {messages.map((message, index) => {
          const prevMessage = index > 0 ? messages[index - 1] : null;
          
          // Detect meta transitions
          const showMetaSeparator = message.isMeta && (!prevMessage || !prevMessage.isMeta);
          const showReturnFromMeta = !message.isMeta && prevMessage && prevMessage.isMeta;
          
          // Detect function transitions
          const showFunctionSeparator = message.isFunction && (!prevMessage || !prevMessage.isFunction);
          const showReturnFromFunction = !message.isFunction && prevMessage && prevMessage.isFunction;
          
          // Function type colors
          const functionColors = {
            bank: { primary: '#4CAF50', label: 'Bank Transaction' },
            booking: { primary: '#2196F3', label: 'Booking' },
            shopping: { primary: '#FF9800', label: 'Shopping' },
            health: { primary: '#F44336', label: 'Health' },
            communication: { primary: '#9C27B0', label: 'Communication' }
          };
          
          const functionColor = functionColors[message.functionType || 'bank'];
          
          return (
            <div key={message.id}>
              {/* Separator when entering meta conversation */}
              {showMetaSeparator && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '8px 0 16px 0'
                }}>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.6) 50%, transparent)'
                  }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'rgba(255,193,7,0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontStyle: 'italic'
                  }}>
                    Navigation
                  </span>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.6) 50%, transparent)'
                  }} />
                </div>
              )}
              
              {/* Separator when returning from meta conversation */}
              {showReturnFromMeta && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '8px 0 16px 0'
                }}>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(94,208,255,0.6) 50%, transparent)'
                  }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'rgba(94,208,255,0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Back to conversation
                  </span>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(94,208,255,0.6) 50%, transparent)'
                  }} />
                </div>
              )}
              
              {/* Separator when entering function execution */}
              {showFunctionSeparator && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '8px 0 16px 0'
                }}>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${functionColor.primary}99 50%, transparent)`
                  }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: functionColor.primary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {functionColor.label}
                  </span>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${functionColor.primary}99 50%, transparent)`
                  }} />
                </div>
              )}
              
              {/* Separator when returning from function execution */}
              {showReturnFromFunction && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  margin: '8px 0 16px 0'
                }}>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(94,208,255,0.6) 50%, transparent)'
                  }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'rgba(94,208,255,0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Back to conversation
                  </span>
                  <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(94,208,255,0.6) 50%, transparent)'
                  }} />
                </div>
              )}
              
              <MessageBubble message={message} />
            </div>
          );
        })}
        
        {/* Navigation hint for Stage 1 */}
        {showNavigationHint && messages.length === 0 && (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic'
          }}>
            Start a conversation to see key points appear
          </div>
        )}
      </div>
      
      {/* Chat input (only active in current context) */}
      <div style={{
        padding: '16px',
        borderTop: '2px solid rgba(255,255,255,0.1)'
      }}>
        {isCurrentContext ? (
          <ChatInput onSend={(text) => {
            // TODO: Phase 2 - Send message handler
            console.log('Sending message:', text);
          }} />
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
