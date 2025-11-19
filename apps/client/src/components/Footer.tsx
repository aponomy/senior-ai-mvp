import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

export default function Footer() {
  const { activeObjects, toggleObject } = useDashboard();
  const [isListening, setIsListening] = useState(false);

  const isChatActive = activeObjects.some(obj => obj.id === 'chatWindow');
  const isClusterActive = activeObjects.some(obj => obj.id === 'clusterCard');
  const isSettingsActive = activeObjects.some(obj => obj.id === 'settings');
  const isFunctionsActive = activeObjects.some(obj => obj.id === 'functions');

  const toggleListening = () => {
    setIsListening(prev => !prev);
    console.log(isListening ? 'Stopped listening' : 'Started listening');
  };

  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'rgba(10, 11, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        gap: '24px',
      }}
    >
      {/* Topics/Cluster Button */}
      <button
        onClick={() => toggleObject('clusterCard')}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: isClusterActive 
            ? 'rgba(78, 255, 200, 0.4)' 
            : 'rgba(78, 255, 200, 0.15)',
          border: isClusterActive 
            ? '2px solid rgba(78, 255, 200, 0.8)' 
            : '2px solid rgba(78, 255, 200, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isClusterActive 
            ? '0 0 20px rgba(78, 255, 200, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          if (!isClusterActive) {
            e.currentTarget.style.background = 'rgba(78, 255, 200, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(78, 255, 200, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          if (!isClusterActive) {
            e.currentTarget.style.background = 'rgba(78, 255, 200, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(78, 255, 200, 0.3)';
          }
        }}
        aria-label="Toggle cluster view"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4effc8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </button>

      {/* Settings Button */}
      <button
        onClick={() => toggleObject('settings')}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: isSettingsActive 
            ? 'rgba(251, 191, 36, 0.4)' 
            : 'rgba(251, 191, 36, 0.15)',
          border: isSettingsActive 
            ? '2px solid rgba(251, 191, 36, 0.8)' 
            : '2px solid rgba(251, 191, 36, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isSettingsActive 
            ? '0 0 20px rgba(251, 191, 36, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          if (!isSettingsActive) {
            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          if (!isSettingsActive) {
            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.3)';
          }
        }}
        aria-label="Toggle settings"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m-2 2l-4.2 4.2M1 12h6m6 0h6m-13.2 5.2l4.2-4.2m2-2l4.2-4.2" />
        </svg>
      </button>

      {/* Functions Button */}
      <button
        onClick={() => toggleObject('functions')}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: isFunctionsActive 
            ? 'rgba(34, 197, 94, 0.4)' 
            : 'rgba(34, 197, 94, 0.15)',
          border: isFunctionsActive 
            ? '2px solid rgba(34, 197, 94, 0.8)' 
            : '2px solid rgba(34, 197, 94, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isFunctionsActive 
            ? '0 0 20px rgba(34, 197, 94, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          if (!isFunctionsActive) {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          if (!isFunctionsActive) {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
          }
        }}
        aria-label="Toggle functions"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>

      {/* Microphone Button - Center */}
      <button
        onClick={toggleListening}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: isListening 
            ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            : 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
          border: isListening 
            ? '3px solid rgba(239, 68, 68, 0.5)' 
            : '3px solid rgba(127, 29, 29, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isListening 
            ? '0 0 30px rgba(239, 68, 68, 0.6), 0 8px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label={isListening ? 'Stop listening' : 'Start listening'}
      >
        {/* Pulse animation when listening */}
        {isListening && (
          <>
            <div
              style={{
                position: 'absolute',
                inset: '-3px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.4)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '-3px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.4)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s',
              }}
            />
          </>
        )}

        {/* Microphone Icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
          }}
        >
          {isListening ? (
            <>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </>
          ) : (
            <>
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </>
          )}
        </svg>
      </button>

      {/* Chat Button */}
      <button
        onClick={() => toggleObject('chatWindow')}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: isChatActive 
            ? 'rgba(255, 78, 157, 0.4)' 
            : 'rgba(255, 78, 157, 0.15)',
          border: isChatActive 
            ? '2px solid rgba(255, 78, 157, 0.8)' 
            : '2px solid rgba(255, 78, 157, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isChatActive 
            ? '0 0 20px rgba(255, 78, 157, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          if (!isChatActive) {
            e.currentTarget.style.background = 'rgba(255, 78, 157, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 78, 157, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          if (!isChatActive) {
            e.currentTarget.style.background = 'rgba(255, 78, 157, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 78, 157, 0.3)';
          }
        }}
        aria-label="Toggle chat"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff4e9d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Add keyframe animation for pulse */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `}
      </style>
    </footer>
  );
}
