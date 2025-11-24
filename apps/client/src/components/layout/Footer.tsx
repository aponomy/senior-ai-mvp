import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeObjects, toggleObject, hideObject } = useDashboard();
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isChatActive = activeObjects.some(obj => obj.id === 'chatWindow');
  const isClusterActive = location.pathname === '/topics';
  const isSettingsActive = location.pathname === '/settings';
  const isFunctionsActive = location.pathname === '/functions';

  // Helper to handle button clicks - closes settings if open
  const handleButtonClick = (objectId: string) => {
    if (isSettingsActive && objectId !== 'settings') {
      hideObject('settings');
    }
    
    // Make clusterCard and functions mutually exclusive
    if (objectId === 'clusterCard' && isFunctionsActive) {
      hideObject('functions');
    } else if (objectId === 'functions' && isClusterActive) {
      hideObject('clusterCard');
    }
    
    toggleObject(objectId);
  };

  const toggleListening = () => {
    if (isSettingsActive) {
      hideObject('settings');
    }
    setIsListening(prev => !prev);
    console.log(isListening ? 'Stopped listening' : 'Started listening');
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(prev => !prev);
    console.log(isVoiceEnabled ? 'Voice output disabled' : 'Voice output enabled');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <footer
      data-name="footer"
      style={{
        height: '80px',
        background: 'rgba(10, 11, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2100,
        gap: '24px',
        position: 'relative',
      }}
    >
      {/* Three-dot menu dropdown */}
      {showMenu && (
        <div
          ref={menuRef}
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '20px',
            marginBottom: '8px',
            background: 'rgba(26, 27, 47, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '8px',
            zIndex: 2200,
            minWidth: '200px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <button
            onClick={() => {
              setShowMenu(false);
              if (onNavigate) {
                onNavigate('/settings');
              } else {
                navigate('/settings');
              }
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '14px',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m-2 2l-4.2 4.2M1 12h6m6 0h6m-13.2 5.2l4.2-4.2m2-2l4.2-4.2" />
            </svg>
            Inställningar
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              console.log('Show about dialog');
              // TODO: Show about dialog
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '14px',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Om Senior AI
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              console.log('Show account settings');
              // TODO: Show account settings
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '14px',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Konto...
          </button>
        </div>
      )}

      {/* Three-dot Menu Button - Left Side */}
      <button
        onClick={() => setShowMenu(prev => !prev)}
        style={{
          position: 'absolute',
          left: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: showMenu ? 1 : 0.6,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          if (!showMenu) {
            e.currentTarget.style.opacity = '0.6';
          }
        }}
        aria-label="Menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>

      {/* Topics/Cluster Button */}
      <button
        onClick={() => {
          if (onNavigate) {
            onNavigate('/topics');
          } else {
            navigate('/topics');
          }
        }}
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

      {/* Functions Button */}
      <button
        onClick={() => {
          if (onNavigate) {
            onNavigate('/functions');
          } else {
            navigate('/functions');
          }
        }}
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

      {/* Voice Toggle Button */}
      <button
        onClick={toggleVoice}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: isVoiceEnabled 
            ? 'rgba(34, 197, 94, 0.4)' 
            : 'rgba(127, 29, 29, 0.4)',
          border: isVoiceEnabled 
            ? '2px solid rgba(34, 197, 94, 0.8)' 
            : '2px solid rgba(127, 29, 29, 0.8)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isVoiceEnabled ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isVoiceEnabled 
            ? '0 0 20px rgba(34, 197, 94, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          if (isVoiceEnabled) {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.9)';
          } else {
            e.currentTarget.style.background = 'rgba(127, 29, 29, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(127, 29, 29, 0.9)';
          }
        }}
        onMouseLeave={(e) => {
          if (isVoiceEnabled) {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.4)';
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.8)';
          } else {
            e.currentTarget.style.background = 'rgba(127, 29, 29, 0.4)';
            e.currentTarget.style.borderColor = 'rgba(127, 29, 29, 0.8)';
          }
        }}
        aria-label={isVoiceEnabled ? 'Disable voice output' : 'Enable voice output'}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isVoiceEnabled ? '#22c55e' : '#7f1d1d'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isVoiceEnabled ? (
            <>
              {/* Volume/Speaker icon when enabled */}
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          ) : (
            <>
              {/* Muted volume icon when disabled */}
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          )}
        </svg>
      </button>

      {/* Chat Button */}
      <button
        onClick={() => handleButtonClick('chatWindow')}
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
          transform: isChatActive ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isChatActive 
            ? '0 0 20px rgba(255, 78, 157, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          if (!isChatActive) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = 'rgba(255, 78, 157, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 78, 157, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isChatActive) {
            e.currentTarget.style.transform = 'scale(1)';
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

      {/* Add keyframe animations */}
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
          @keyframes slideUp {
            from {
              transform: translateX(-50%) translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </footer>
  );
}
