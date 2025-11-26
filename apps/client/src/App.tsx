import { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ChatInput from './components/ChatInput';
import Footer from './components/layout/Footer';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Conversation from './pages/Conversation';
import Functions from './pages/Functions';
import Settings from './pages/Settings';
import Topics from './pages/Topics';
import ThreePanelLayout from './pages/ThreePanel';

type ConversationSize = 'small' | 'medium' | 'large' | null;

function AppContent() {
  const refTimeline = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { activeObjects } = useDashboard();
  const isTopicsRoute = location.pathname === '/topics';
  const isChatActive = activeObjects.some(obj => obj.id === 'chatWindow');
  const isThreePanelRoute = location.pathname === '/';
  
  const [showConversation, setShowConversation] = useState<ConversationSize>('large'); // null

  // If ThreePanel route, render it fullscreen
  if (isThreePanelRoute) {
    return <ThreePanelLayout />;
  }

  // When navigation happens and conversation is large, resize to medium
  const handleNavigation = (path: string) => {
    if (showConversation === 'large') {
      setShowConversation('medium');
    }
    navigate(path);
  };

  const handleSendMessage = (message: string) => {
    console.log('Send message:', message);
    // TODO: Send message to backend
    // Open conversation panel if not already open
    if (!showConversation) {
      setShowConversation('small');
    }
  };

  const getConversationWidth = () => {
    if (showConversation === 'small') return '250px';
    if (showConversation === 'medium') return '50%';
    if (showConversation === 'large') return '100%';
    return '0px';
  };

  const getDashboardWidth = () => {
    if (!showConversation) return '100%';
    if (showConversation === 'small') return 'calc(100% - 250px)';
    if (showConversation === 'medium') return '50%';
    if (showConversation === 'large') return '0px'; // Still in DOM, just no width
    return '100%';
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Main content area - takes remaining space after chat input and footer */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 0, // Important for flex children to shrink
        }}
      >
        {/* Dashboard content - includes timeline portal target */}
        <div
          data-name="dashboard-content"
          style={{
            width: getDashboardWidth(),
            height: '100%',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: showConversation === 'large' ? 0 : 1,
            pointerEvents: showConversation === 'large' ? 'none' : 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Routes */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Routes>
              <Route path="/" element={<ThreePanelLayout />} />
              <Route path="/topics" element={<Topics timelineRef={refTimeline} conversationWidth={getConversationWidth()} />} />
              <Route path="/functions" element={<Functions />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>

          {/* Timeline portal target */}
          {isTopicsRoute && <div ref={refTimeline} />}
        </div>

        {/* Conversation panel */}
        {showConversation && (
          <div
            style={{
              width: getConversationWidth(),
              height: '100%',
              transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
            }}
          >
            <Conversation
              size={showConversation}
              onClose={() => setShowConversation(null)}
              onResize={(size) => {
                setShowConversation(size);
              }}
            />
          </div>
        )}
      </div>

      {/* Chat input */}
      {isChatActive && <ChatInput onSend={handleSendMessage} />}

      {/* Footer */}
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </DashboardProvider>
  );
}

export default App;
