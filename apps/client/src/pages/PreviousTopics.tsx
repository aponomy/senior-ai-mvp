import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicCard from '../components/cards/DynamicCard';
import PageContainer from '../components/PageContainer';
import topicsData from '../data/topics.json';

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
 * This is a well-researched bin-packing heuristic that maximizes space usage
 */
function packTopicsWithSkyline(topics: Topic[], containerWidth: number): PositionedTopic[] {
  const cellSize = 20; // Base grid cell size in pixels
  const gap = 0; // No gap - items will have internal padding
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
    
    // Scan all possible starting columns
    for (let col = 0; col <= columns - span; col++) {
      // Find the max height in this span
      let maxHeight = 0;
      for (let i = col; i < col + span; i++) {
        maxHeight = Math.max(maxHeight, heights[i]);
      }
      
      // Choose the position with lowest max height
      if (maxHeight < bestHeight) {
        bestHeight = maxHeight;
        bestColumn = col;
      }
    }
    
    // Place the item
    const gridRow = bestHeight;
    
    // Update the skyline heights for this span
    for (let i = bestColumn; i < bestColumn + span; i++) {
      heights[i] = bestHeight + span;
    }
    
    positionedTopics.push({
      ...topic,
      gridColumn: bestColumn + 1, // CSS Grid is 1-indexed
      gridRow: gridRow + 1,
      span: sizeConfig[topic.size].span,
    });
  });
  
  return positionedTopics;
}

export default function PreviousTopics() {
  const navigate = useNavigate();
  const topics = topicsData.topics as Topic[];
  const [positionedTopics, setPositionedTopics] = useState<PositionedTopic[]>([]);
  const [columns, setColumns] = useState(60);
  
  useEffect(() => {
    // Calculate layout based on container width
    const updateLayout = () => {
      const containerWidth = Math.min(window.innerWidth - 80, 1600);
      const cols = Math.floor(containerWidth / 20);
      setColumns(cols);
      setPositionedTopics(packTopicsWithSkyline(topics, containerWidth));
    };
    
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [topics]);

  return (
    <PageContainer
      label="Tidigare Ämnen"
      tools={
        <button
          onClick={() => navigate('/')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          ✕
        </button>
      }
    >
      <div style={{ padding: '40px' }}>
        {/* Topics Grid - CSS Grid with Skyline Algorithm Placement */}
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
                    // TODO: Navigate to topic details or conversations
                  }}
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
