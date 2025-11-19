import { useEffect, useState } from 'react';
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
  const [viewMode, setViewMode] = useState<'clustered' | 'skyline'>('clustered');
  const [positionedTopics, setPositionedTopics] = useState<PositionedTopic[]>([]);
  const [columns, setColumns] = useState(60);

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
    <div style={{
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
          {/* View Mode Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '4px',
            gap: '4px',
          }}>
            <button
              onClick={() => setViewMode('clustered')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'clustered' 
                  ? 'rgba(157, 78, 255, 0.3)' 
                  : 'transparent',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              📋 Lista
            </button>
            <button
              onClick={() => setViewMode('skyline')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: viewMode === 'skyline' 
                  ? 'rgba(157, 78, 255, 0.3)' 
                  : 'transparent',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              🏙️ Skyline
            </button>
          </div>

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
