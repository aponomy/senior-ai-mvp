import { useState } from 'react';
import Footer from '../components/Footer';
import PageContainer from '../components/PageContainer';
import Timeline from '../components/Timeline';
import { useDashboard } from '../context/DashboardContext';
import type { Conversation } from '../data/conversationHelpers';
import { generateMockConversations } from '../data/conversationHelpers';

export default function Functions() {
  const { isTimelineActive, toggleTimeline } = useDashboard();
  
  // Timeline state
  const [conversations] = useState<Conversation[]>(generateMockConversations());
  const [zoom, setZoom] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.25));

  return (
    <>
      <PageContainer
        label="Funktioner"
      >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <button
          onClick={() => console.log('Bank clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(74, 158, 255, 0.3)',
            background: 'rgba(74, 158, 255, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(74, 158, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(74, 158, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Bank
        </button>

        <button
          onClick={() => console.log('Post och Bud clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(157, 78, 255, 0.3)',
            background: 'rgba(157, 78, 255, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(157, 78, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(157, 78, 255, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(157, 78, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(157, 78, 255, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Post och Bud
        </button>

        <button
          onClick={() => console.log('Sjukvård clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 78, 157, 0.3)',
            background: 'rgba(255, 78, 157, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 78, 157, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 78, 157, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 78, 157, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 78, 157, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Sjukvård
        </button>

        <button
          onClick={() => console.log('Transport clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(78, 255, 200, 0.3)',
            background: 'rgba(78, 255, 200, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(78, 255, 200, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(78, 255, 200, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(78, 255, 200, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(78, 255, 200, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Transport
        </button>

        <button
          onClick={() => console.log('Säkerhet clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 165, 0, 0.3)',
            background: 'rgba(255, 165, 0, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 165, 0, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 165, 0, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 165, 0, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 165, 0, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Säkerhet
        </button>

        <button
          onClick={() => console.log('Meddelanden clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(100, 200, 255, 0.3)',
            background: 'rgba(100, 200, 255, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(100, 200, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(100, 200, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Meddelanden
        </button>

        <button
          onClick={() => console.log('Video clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            background: 'rgba(220, 38, 38, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Video
        </button>

        <button
          onClick={() => console.log('Foto clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            background: 'rgba(236, 72, 153, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Foto
        </button>

        <button
          onClick={() => console.log('Konst clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            background: 'rgba(168, 85, 247, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Konst
        </button>

        <button
          onClick={() => console.log('Musik clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            background: 'rgba(52, 211, 153, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(52, 211, 153, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(52, 211, 153, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Musik
        </button>

        <button
          onClick={() => console.log('Evenemang clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(251, 146, 60, 0.3)',
            background: 'rgba(251, 146, 60, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(251, 146, 60, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(251, 146, 60, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(251, 146, 60, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(251, 146, 60, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Evenemang
        </button>

        <button
          onClick={() => console.log('Sällskap clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(244, 114, 182, 0.3)',
            background: 'rgba(244, 114, 182, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(244, 114, 182, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(244, 114, 182, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Sällskap
        </button>

        <button
          onClick={() => console.log('Spel clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            background: 'rgba(59, 130, 246, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Spel
        </button>

        <button
          onClick={() => console.log('Demokrati clicked')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            background: 'rgba(34, 197, 94, 0.15)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Demokrati
        </button>
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
