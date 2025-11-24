import { useState } from 'react';
import type { Message, Summary } from '../../types/conversation';
import ConversationColumn from './ConversationColumn';
import KeyPointColumn from './KeyPointColumn';
import SummaryColumn from './SummaryColumn';

interface ConversationNavigatorProps {
  summaries: Summary[];
  messages: Message[];
}

export default function ConversationNavigator({
  summaries,
  messages
}: ConversationNavigatorProps) {
  const [selectedSummaryId, setSelectedSummaryId] = useState<number | null>(null);
  const [selectedKeyPointId, setSelectedKeyPointId] = useState<number | null>(null);
  
  // Calculate visibility (PROGRESSIVE REVEAL)
  const completedSummaries = summaries.filter(s => !s.isBuilding);
  const currentSummary = summaries.find(s => s.isBuilding);
  const allKeyPoints = summaries.flatMap(s => s.keyPoints);
  const completedKeyPoints = allKeyPoints.filter(k => !k.isBuilding);
  
  const shouldShowSummaries = completedSummaries.length >= 2;
  const shouldShowKeyPoints = completedKeyPoints.length >= 2;
  
  // Grid template based on stage
  const gridTemplate = shouldShowSummaries
    ? '240px 280px 1fr'
    : shouldShowKeyPoints
      ? '280px 1fr'
      : '1fr';
  
  const selectedSummary = selectedSummaryId 
    ? summaries.find(s => s.id === selectedSummaryId)
    : currentSummary;
  
  const keyPoints = selectedSummary?.keyPoints || [];
  
  const handleSummaryClick = (id: number) => {
    setSelectedSummaryId(id);
    setSelectedKeyPointId(null); // Reset keypoint selection
  };
  
  const handleKeyPointClick = (id: number) => {
    setSelectedKeyPointId(id);
    // Scroll to messages related to this keypoint (will be implemented in Phase 2)
  };
  
  const handleBackToCurrent = () => {
    setSelectedSummaryId(null);
    setSelectedKeyPointId(null);
  };
  
  const isCurrentContext = selectedSummaryId === null;
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: gridTemplate,
      gap: shouldShowKeyPoints ? '16px' : '0',
      height: '100%',
      width: '100%',
      padding: '16px',
      overflow: 'hidden',
      transition: 'grid-template-columns 0.3s ease'
    }}>
      {/* Only show if 2+ summaries (STAGE 3) */}
      {shouldShowSummaries && (
        <SummaryColumn
          summaries={summaries}
          selectedId={selectedSummaryId}
          onSelect={handleSummaryClick}
        />
      )}
      
      {/* Only show if 2+ keypoints (STAGE 2+) */}
      {shouldShowKeyPoints && (
        <KeyPointColumn
          keyPoints={keyPoints}
          selectedId={selectedKeyPointId}
          onSelect={handleKeyPointClick}
          isCurrentContext={isCurrentContext}
        />
      )}
      
      {/* Always show conversation (ALL STAGES) */}
      <ConversationColumn
        messages={messages}
        selectedKeyPointId={selectedKeyPointId}
        isCurrentContext={isCurrentContext}
        onBackToCurrent={handleBackToCurrent}
        showNavigationHint={!shouldShowKeyPoints}
      />
    </div>
  );
}
