// Detail panel for expanded message view

import type { Message } from '../../types/conversation';
import { MessageBubble } from './MessageComponents';

interface DetailPanelProps {
  messages: Message[];
  onClose: () => void;
}

/**
 * Detail Panel - slides in from right
 * Shows full conversation details when user clicks condensed/blurred messages
 */
export function DetailPanel({ messages, onClose }: DetailPanelProps) {
  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 99,
          animation: 'fadeIn 0.3s ease-out',
        }}
      />
      
      {/* Side panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Conversation details"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '45%',
          minWidth: '400px',
          maxWidth: '600px',
          background: 'rgba(10, 11, 15, 0.98)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px',
          overflowY: 'auto',
          zIndex: 100,
          animation: 'slideInRight 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              Conversation Details
            </h3>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <button
            onClick={onClose}
            aria-label="Close detail panel"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            ✕
          </button>
        </div>
        
        {/* Messages */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} isCompact={false} />
          ))}
        </div>
      </div>
      
      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
