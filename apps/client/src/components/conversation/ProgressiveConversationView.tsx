// Main progressive conversation view component

import { useState } from 'react';
import type { ConversationBeat, Message } from '../../types/conversation';
import { DetailPanel } from './DetailPanel';
import { CondensedMessage, MessageBubble, SummaryBox } from './MessageComponents';

interface ProgressiveConversationViewProps {
  messages: Message[];
  beats: ConversationBeat[];
  recentThreshold?: number; // How many messages to show in full (default: 5)
  nearRecentThreshold?: number; // How many to show condensed (default: 10)
}

/**
 * Progressive Conversation View
 * 
 * Implements the 3-level information hierarchy:
 * - Level 1 (Full): Recent messages (last 5)
 * - Level 2 (Condensed): Near-recent as blurred boxes (next 10)
 * - Level 3 (Abstract): Older messages as summary boxes
 */
export function ProgressiveConversationView({
  messages,
  beats,
  recentThreshold = 5,
  nearRecentThreshold = 10,
}: ProgressiveConversationViewProps) {
  const [expandedBeats, setExpandedBeats] = useState<Set<string>>(new Set());
  const [detailPanelData, setDetailPanelData] = useState<{
    beatId: string | null;
    messages: Message[];
  }>({ beatId: null, messages: [] });
  
  // Split messages by display level
  const totalMessages = messages.length;
  const recentStartIndex = Math.max(0, totalMessages - recentThreshold);
  const nearRecentStartIndex = Math.max(0, recentStartIndex - nearRecentThreshold);
  
  const recentMessages = messages.slice(recentStartIndex);
  const nearRecentMessages = messages.slice(nearRecentStartIndex, recentStartIndex);
  
  // Filter beats that fall into older messages range
  const olderBeats = beats.filter((beat) => {
    // Check if beat's last message is in the older range
    const lastMessageTime = beat.endTime.getTime();
    const nearRecentStartTime = nearRecentMessages[0]?.timestamp.getTime() || Infinity;
    return lastMessageTime < nearRecentStartTime;
  });
  
  // Handle beat expansion (summary box click)
  const handleBeatExpand = (beatId: string) => {
    setExpandedBeats((prev) => {
      const next = new Set(prev);
      if (next.has(beatId)) {
        next.delete(beatId);
      } else {
        next.add(beatId);
      }
      return next;
    });
  };
  
  // Handle condensed message click (open detail panel)
  const handleCondensedClick = (beatId: string, messages: Message[]) => {
    setDetailPanelData({ beatId, messages });
  };
  
  // Handle message click from expanded beat
  const handleMessageClick = (beatId: string, messages: Message[]) => {
    setDetailPanelData({ beatId, messages });
  };
  
  // Close detail panel
  const handleCloseDetailPanel = () => {
    setDetailPanelData({ beatId: null, messages: [] });
  };
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Main conversation area */}
      <div
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Level 3: Older messages as summary boxes */}
        {olderBeats.map((beat) => {
          const isExpanded = expandedBeats.has(beat.id);
          const hasToolCalls = beat.messages.some((m) => m.toolCalls && m.toolCalls.length > 0);
          
          return (
            <div key={beat.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <SummaryBox
                beatId={beat.id}
                summary={beat.summary}
                messageCount={beat.messageCount}
                hasToolCalls={hasToolCalls}
                timestamp={beat.startTime}
                isExpanded={isExpanded}
                onClick={() => handleBeatExpand(beat.id)}
              />
              
              {/* Expanded condensed messages */}
              {isExpanded && (
                <div
                  style={{
                    marginLeft: '20px',
                    paddingLeft: '20px',
                    borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    animation: 'slideDown 0.3s ease-out',
                  }}
                >
                  <CondensedMessage
                    messages={beat.messages}
                    condensedText={beat.condensedText}
                    onClick={() => handleCondensedClick(beat.id, beat.messages)}
                  />
                </div>
              )}
            </div>
          );
        })}
        
        {/* Level 2: Near-recent messages as condensed/blurred boxes */}
        {nearRecentMessages.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Group near-recent messages into a single condensed view */}
            <CondensedMessage
              messages={nearRecentMessages}
              condensedText={generateCondensedText(nearRecentMessages)}
              onClick={() => handleMessageClick('near-recent', nearRecentMessages)}
            />
          </div>
        )}
        
        {/* Separator between condensed and full messages */}
        {(olderBeats.length > 0 || nearRecentMessages.length > 0) && recentMessages.length > 0 && (
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
              margin: '8px 0',
            }}
          />
        )}
        
        {/* Level 1: Recent messages in full detail */}
        {recentMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      
      {/* Detail panel overlay */}
      {detailPanelData.beatId && (
        <DetailPanel
          messages={detailPanelData.messages}
          onClose={handleCloseDetailPanel}
        />
      )}
      
      {/* CSS animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Generate condensed text from messages
 * In a real implementation, this would use AI to summarize
 * For now, we'll create a simple summary
 */
function generateCondensedText(messages: Message[]): string {
  const userMessages = messages.filter(m => m.role === 'user');
  const assistantMessages = messages.filter(m => m.role === 'assistant');
  
  if (messages.length === 0) return 'No messages';
  if (messages.length === 1) return messages[0].content.substring(0, 100) + '...';
  
  // Simple template-based condensing
  const firstUserMsg = userMessages[0]?.content.substring(0, 50) || 'conversation';
  return `Discussion covering ${messages.length} messages: "${firstUserMsg}..." and ${assistantMessages.length} response${assistantMessages.length !== 1 ? 's' : ''}.`;
}
