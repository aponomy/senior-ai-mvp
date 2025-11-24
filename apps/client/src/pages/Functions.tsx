import { useState } from 'react';
import Footer from '../components/layout/Footer';
import PageContainer from '../components/layout/PageContainer';
import Timeline from '../components/layout/Timeline';
import { FunctionButton } from '../components/ui/custom/FunctionButton';
import { useDashboard } from '../context/DashboardContext';
import type { Conversation } from '../data/conversationHelpers';
import { generateMockConversations } from '../data/conversationHelpers';

// Define function apps with their colors
const functionApps = [
  { name: 'Bank', color: 'rgba(74, 158, 255, 0.3)' },
  { name: 'Post och Bud', color: 'rgba(157, 78, 255, 0.3)' },
  { name: 'Sjukvård', color: 'rgba(255, 78, 157, 0.3)' },
  { name: 'Transport', color: 'rgba(78, 255, 200, 0.3)' },
  { name: 'Säkerhet', color: 'rgba(255, 165, 0, 0.3)' },
  { name: 'Meddelanden', color: 'rgba(100, 200, 255, 0.3)' },
  { name: 'Video', color: 'rgba(220, 38, 38, 0.3)' },
  { name: 'Foto', color: 'rgba(236, 72, 153, 0.3)' },
  { name: 'Konst', color: 'rgba(168, 85, 247, 0.3)' },
  { name: 'Musik', color: 'rgba(52, 211, 153, 0.3)' },
  { name: 'Evenemang', color: 'rgba(251, 146, 60, 0.3)' },
  { name: 'Sällskap', color: 'rgba(244, 114, 182, 0.3)' },
  { name: 'Spel', color: 'rgba(59, 130, 246, 0.3)' },
  { name: 'Demokrati', color: 'rgba(34, 197, 94, 0.3)' },
];

export default function Functions() {
  const { isTimelineActive, toggleTimeline } = useDashboard();
  
  // Timeline state
  const [conversations] = useState<Conversation[]>(generateMockConversations());
  const [zoom, setZoom] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.25));

  const handleFunctionClick = (name: string) => {
    console.log(`${name} clicked`);
  };

  return (
    <>
      <PageContainer label="Funktioner (Appar)">
        <div
          data-name="functions-grid"
          className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 max-w-[1600px] mx-auto"
        >
          {functionApps.map((app) => (
            <FunctionButton
              key={app.name}
              color={app.color}
              onClick={() => handleFunctionClick(app.name)}
            >
              {app.name}
            </FunctionButton>
          ))}
        </div>
      </PageContainer>
    
    {/* Timeline fixed above footer */}
    {isTimelineActive && (
      <div style={{ 
        position: 'fixed',
        bottom: '80px', // Above footer
        left: 0,
        right: 0,
        height: '160px',
        zIndex: 1000,
        background: 'rgba(10, 11, 15, 0.98)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Timeline
          conversations={conversations}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onClose={() => toggleTimeline()}
        />
      </div>
    )}
    
    <Footer />
    </>
  );
}
