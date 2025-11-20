import { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import topicsData from '../../data/topics.json';
import DynamicCard from '../cards/DynamicCard';

type Topic = {
  id: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  count: number;
  lastActivity: string;
};

type PositionedTopic = Topic & {
  gridColumn: number;
  gridRow: number;
  span: number;
};

const sizeConfig = {
  small: { span: 9, accent: '#9d4eff', lightIntensity: 0.25, fontSize: '16px' },   // 180px = 9 * 20px
  medium: { span: 14, accent: '#4a9eff', lightIntensity: 0.35, fontSize: '22px' }, // 280px = 14 * 20px
  large: { span: 20, accent: '#4effc8', lightIntensity: 0.45, fontSize: '32px' },  // 400px = 20 * 20px
};

/**
 * Discrete Skyline Algorithm (Jylänki 2010)
 * Packs rectangles on a grid by always choosing the position with the lowest "skyline"
 */
function packTopicsWithSkyline(topics: Topic[], containerWidth: number): PositionedTopic[] {
  const cellSize = 20;
  const gap = 0;
  const columns = Math.floor(containerWidth / cellSize);
  
  // Sort by size descending (largest first) for better packing
  const sortedTopics = [...topics].sort((a, b) => {
    const spanA = sizeConfig[a.size].span;
    const spanB = sizeConfig[b.size].span;
    return spanB - spanA;
  });
  
  // Skyline: track the current height at each column
  const heights = new Array(columns).fill(0);
  const positionedTopics: PositionedTopic[] = [];
  
  sortedTopics.forEach((topic) => {
    const span = sizeConfig[topic.size].span + gap;
    
    // Find the best position (lowest skyline height)
    let bestColumn = 0;
    let bestHeight = Infinity;
    
    for (let col = 0; col <= columns - span; col++) {
      let maxHeight = 0;
      for (let i = col; i < col + span; i++) {
        maxHeight = Math.max(maxHeight, heights[i]);
      }
      
      if (maxHeight < bestHeight) {
        bestHeight = maxHeight;
        bestColumn = col;
      }
    }
    
    const gridRow = bestHeight;
    
    // Update the skyline heights
    for (let i = bestColumn; i < bestColumn + span; i++) {
      heights[i] = bestHeight + span;
    }
    
    positionedTopics.push({
      ...topic,
      gridColumn: bestColumn + 1,
      gridRow: gridRow + 1,
      span: sizeConfig[topic.size].span,
    });
  });
  
  return positionedTopics;
}

interface TopicClusterProps {
  onClose?: () => void;
}

export default function TopicCluster({ onClose }: TopicClusterProps) {
  const topics = topicsData.topics as Topic[];
  const { activeObjects, toggleObject } = useDashboard();
  const [viewMode, setViewMode] = useState<'clustered' | 'skyline'>('clustered');
  const [positionedTopics, setPositionedTopics] = useState<PositionedTopic[]>([]);
  const [columns, setColumns] = useState(60);
  const [searchQuery, setSearchQuery] = useState('');

  const isTimelineActive = activeObjects.some(obj => obj.id === 'timeline');

  useEffect(() => {
    if (viewMode === 'skyline') {
    const updateLayout = () => {
        const containerWidth = window.innerWidth - 40; // Full width minus padding
        const cols = Math.floor(containerWidth / 20);
        setColumns(cols);
        setPositionedTopics(packTopicsWithSkyline(topics, containerWidth));
      };
      
      updateLayout();
      window.addEventListener('resize', updateLayout);
      return () => window.removeEventListener('resize', updateLayout);
    }
  }, [viewMode, topics]);

  return (
    <div 
      data-name="cluster-card"
      style={{
      width: '100%',
      height: '100%',
      background: 'rgba(10, 11, 15, 0.95)',
      backdropFilter: 'blur(20px)',
      overflow: 'auto',
      padding: '20px',
    }}>
      {/* Header with toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(10, 11, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '12px 0',
      }}>
        <h2 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: 600,
          margin: 0,
        }}>
          Ämnen
        </h2>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Search Field */}
          <div style={{ position: 'relative', marginRight: '12px' }}>
            <input
              type="text"
              placeholder="Sök konversation"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '200px',
                padding: '8px 36px 8px 12px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.5)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          {/* View Mode Toggle - Round Buttons */}
          <button
            onClick={() => setViewMode('clustered')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: viewMode === 'clustered' 
                ? '2px solid rgba(157, 78, 255, 0.8)' 
                : '1px solid rgba(255, 255, 255, 0.2)',
              background: viewMode === 'clustered' 
                ? 'rgba(157, 78, 255, 0.3)' 
                : 'rgba(255, 255, 255, 0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'clustered') {
                e.currentTarget.style.background = 'rgba(157, 78, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'clustered') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }
            }}
            aria-label="Lista view"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={viewMode === 'clustered' ? '#9d4eff' : 'rgba(255, 255, 255, 0.6)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          
          <button
            onClick={() => setViewMode('skyline')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: viewMode === 'skyline' 
                ? '2px solid rgba(157, 78, 255, 0.8)' 
                : '1px solid rgba(255, 255, 255, 0.2)',
              background: viewMode === 'skyline' 
                ? 'rgba(157, 78, 255, 0.3)' 
                : 'rgba(255, 255, 255, 0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'skyline') {
                e.currentTarget.style.background = 'rgba(157, 78, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'skyline') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }
            }}
            aria-label="Skyline view"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={viewMode === 'skyline' ? '#9d4eff' : 'rgba(255, 255, 255, 0.6)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
          </button>

          {/* Timeline Toggle Button */}
          <button
            onClick={() => toggleObject('timeline')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isTimelineActive 
                ? 'rgba(96, 165, 250, 0.4)' 
                : 'rgba(96, 165, 250, 0.15)',
              border: isTimelineActive 
                ? '2px solid rgba(96, 165, 250, 0.8)' 
                : '2px solid rgba(96, 165, 250, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isTimelineActive 
                ? '0 0 20px rgba(96, 165, 250, 0.5)' 
                : 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              if (!isTimelineActive) {
                e.currentTarget.style.background = 'rgba(96, 165, 250, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              if (!isTimelineActive) {
                e.currentTarget.style.background = 'rgba(96, 165, 250, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
              }
            }}
            aria-label="Toggle timeline"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Clustered List View */}
      {viewMode === 'clustered' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {topics
            .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
            .map((topic) => {
              const config = sizeConfig[topic.size];
              
              return (
                <div
                  key={topic.id}
                  style={{
                    background: 'rgba(26, 27, 47, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    border: `1px solid ${config.accent}40`,
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${config.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => {
                    console.log(`Clicked topic: ${topic.title}`);
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: config.accent,
                      boxShadow: `0 0 12px ${config.accent}`,
                    }}/>
                    <span style={{
                      fontSize: '12px',
                      color: config.accent,
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                    }}>
                      {topic.size}
                    </span>
                  </div>
                  
                  <h3 style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 600,
                    margin: '0 0 8px 0',
                  }}>
                    {topic.title}
                  </h3>
                  
                  <div style={{
                    fontSize: '14px',
                    opacity: 0.7,
                    color: 'white',
                  }}>
                    {topic.count} konversationer
                  </div>
                  
                  <div style={{
                    fontSize: '12px',
                    opacity: 0.5,
                    marginTop: '8px',
                    color: 'white',
                  }}>
                    {new Date(topic.lastActivity).toLocaleDateString('sv-SE')}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Skyline View */}
      {viewMode === 'skyline' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 20px)`,
            gridAutoRows: '20px',
            gridAutoFlow: 'dense',
            gap: '0px',
          }}
        >
          {positionedTopics.map((topic) => {
            const config = sizeConfig[topic.size];
            
            return (
              <div
                key={topic.id}
                style={{
                  gridColumn: `${topic.gridColumn} / span ${topic.span}`,
                  gridRow: `${topic.gridRow} / span ${topic.span}`,
                  padding: '5px',
                }}
              >
                <DynamicCard
                  width={topic.span * 20 - 10}
                  height={topic.span * 20 - 10}
                  accent={config.accent}
                  showBorder={true}
                  borderColor={config.accent}
                  borderOpacity={0.4}
                  lightIntensity={config.lightIntensity}
                  showClouds={true}
                  rippleEnabled={true}
                  label={topic.title}
                  labelFontSize={config.fontSize}
                  footer={
                    <div style={{ fontSize: '14px', opacity: 0.7, marginTop: '8px' }}>
                      {topic.count} konversationer
                    </div>
                  }
                  onClick={() => {
                    console.log(`Clicked topic: ${topic.title}`);
                  }}
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
