import { useState } from 'react';
import Footer from './components/Footer';
import ChatWindow from './components/objects/ChatWindow';
import TopicCluster from './components/objects/ClusterCard';
import LargeButtons from './components/objects/LargeButtons';
import SearchField from './components/objects/SearchField';
import Timeline from './components/objects/Timeline';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import type { Conversation } from './data/conversationHelpers';
import {
    generateMockConversations,
    getTimeBuckets,
} from './data/conversationHelpers';

function DashboardContent() {
  const { activeObjects, layouts, showObject, hideObject } = useDashboard();

  // State for conversations data
  const [conversations] = useState<Conversation[]>(generateMockConversations());
  const [zoom, setZoom] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate buckets for search field result count
  const buckets = getTimeBuckets(conversations, zoom, searchQuery);

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.25));

  const handleButtonClick = (action: string) => {
    switch (action) {
      case 'previous-topics':
        // TODO: Implement topics view
        console.log('Show topics');
        break;
      case 'previous-conversations':
        // Hide large buttons, show timeline
        hideObject('largeButtons');
        showObject('timeline');
        break;
      case 'functions':
        // TODO: Implement functions view
        console.log('Show functions');
        break;
      case 'new-conversation':
        // Hide large buttons, show chat window
        hideObject('largeButtons');
        showObject('chatWindow');
        break;
    }
  };

  const handleChatClose = () => {
    hideObject('chatWindow');
    showObject('largeButtons');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0b0f 0%, #1a1b2f 100%)',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Render all active objects with calculated positions */}
      {layouts.map((layout) => {
        const isActive = activeObjects.find(obj => obj.id === layout.id);
        if (!isActive) return null;

        return (
          <div
            key={layout.id}
            style={{
              position: 'absolute',
              top: `${layout.top}px`,
              left: `${layout.left}px`,
              width: `${layout.width}px`,
              height: `${layout.height}px`,
              zIndex: layout.zIndex,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {layout.id === 'largeButtons' && (
              <LargeButtons onButtonClick={handleButtonClick} />
            )}
            {layout.id === 'chatWindow' && (
              <ChatWindow onClose={handleChatClose} />
            )}
            {layout.id === 'timeline' && (
              <Timeline
                conversations={conversations}
                zoom={zoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            )}
            {layout.id === 'searchField' && (
              <SearchField
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDate={selectedDate}
                resultCount={buckets.reduce((acc, b) => acc + b.conversations.length, 0)}
              />
            )}
            {layout.id === 'clusterCard' && (
              <TopicCluster />
            )}
          </div>
        );
      })}

      <Footer />
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

export default App;
