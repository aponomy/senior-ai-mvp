import { useState } from 'react';
import ConversationNavigator from '../components/conversation/ConversationNavigator';
import { mockMessages, mockSummaries } from '../data/mockConversation';

interface ConversationProps {
  size: 'small' | 'medium' | 'large';
  onClose?: () => void;
  onResize?: (size: 'small' | 'medium' | 'large') => void;
}

export default function Conversation({ size, onClose, onResize }: ConversationProps) {
  // Use mock data for testing Conversation Atlas layout
  const [summaries] = useState(mockSummaries);
  const [messages] = useState(mockMessages);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'rgba(10, 11, 15, 0.98)',
        backdropFilter: 'blur(20px)',
        borderLeft: size !== 'large' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: 600,
            margin: 0,
          }}
        >
          Conversation
        </h2>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Size toggle buttons */}
          {size !== 'small' && (
            <button
              onClick={() => onResize?.('small')}
              title="Small (250px)"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="14" y="4" width="6" height="16" />
              </svg>
            </button>
          )}
          
          {size !== 'medium' && (
            <button
              onClick={() => onResize?.('medium')}
              title="Medium (50%)"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="11" y="4" width="9" height="16" />
              </svg>
            </button>
          )}
          
          {size !== 'large' && (
            <button
              onClick={() => onResize?.('large')}
              title="Large (Full width)"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" />
              </svg>
            </button>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
      </div>

      {/* Conversation Atlas Navigator */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <ConversationNavigator
          summaries={summaries}
          messages={messages}
        />
      </div>
    </div>
  );
}
