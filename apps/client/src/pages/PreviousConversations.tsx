import { differenceInDays, format, startOfDay, subDays } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

interface Conversation {
  id: string;
  title: string;
  date: Date;
  messages: number;
  preview: string;
}

// Mock data generator
const generateMockConversations = (): Conversation[] => {
  const conversations: Conversation[] = [];
  const titles = [
    'Project Planning Discussion',
    'Code Review Session',
    'Architecture Design',
    'Bug Fix Strategy',
    'Feature Implementation',
    'Performance Optimization',
    'Database Schema Design',
    'API Endpoint Planning',
    'UI/UX Improvements',
    'Testing Strategy',
  ];
  
  const previews = [
    'Discussed the main objectives and timeline...',
    'Reviewed the pull request and suggested improvements...',
    'Designed the system architecture for the new feature...',
    'Identified the root cause and planned fixes...',
    'Implemented the new functionality with tests...',
  ];

  // Generate conversations for the last 90 days
  for (let i = 0; i < 150; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = subDays(new Date(), daysAgo);
    
    conversations.push({
      id: `conv-${i}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      date,
      messages: Math.floor(Math.random() * 50) + 5,
      preview: previews[Math.floor(Math.random() * previews.length)],
    });
  }

  return conversations.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export default function PreviousConversations() {
  const [conversations] = useState<Conversation[]>(generateMockConversations());
  const [zoom, setZoom] = useState(1); // 0.5 = very zoomed out, 2 = very zoomed in
  const [timelineOffset, setTimelineOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hoveredConversation, setHoveredConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef(0);

  // Calculate date range
  const oldestDate = conversations.length > 0 
    ? startOfDay(conversations[conversations.length - 1].date)
    : subDays(new Date(), 90);
  const newestDate = startOfDay(new Date());
  const totalDays = differenceInDays(newestDate, oldestDate);

  // Filter conversations by search query
  const filteredConversations = searchQuery.trim()
    ? conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  // Group conversations by time buckets based on zoom level
  const getTimeBuckets = () => {
    const bucketSize = Math.max(1, Math.floor(30 / zoom)); // days per bucket
    const buckets = new Map<string, Conversation[]>();

    filteredConversations.forEach(conv => {
      const daysSinceOldest = differenceInDays(startOfDay(conv.date), oldestDate);
      const bucketIndex = Math.floor(daysSinceOldest / bucketSize);
      const bucketKey = `bucket-${bucketIndex}`;
      
      if (!buckets.has(bucketKey)) {
        buckets.set(bucketKey, []);
      }
      buckets.get(bucketKey)!.push(conv);
    });

    return Array.from(buckets.entries()).map(([key, convs]) => ({
      key,
      conversations: convs,
      date: convs[0].date,
      startDay: Math.floor(differenceInDays(startOfDay(convs[0].date), oldestDate) / bucketSize) * bucketSize,
    }));
  };

  const buckets = getTimeBuckets();

  // Filter buckets based on selected date
  const getVisibleBuckets = () => {
    const selectedDay = differenceInDays(startOfDay(selectedDate), oldestDate);
    const visibleRange = Math.floor(30 / zoom);
    
    return buckets.filter(bucket => {
      const bucketDay = differenceInDays(startOfDay(bucket.date), oldestDate);
      return Math.abs(bucketDay - selectedDay) <= visibleRange;
    }).sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const visibleBuckets = getVisibleBuckets();

  // Timeline drag handlers
  const handleTimelineMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = e.clientX - timelineOffset;
  };

  const handleTimelineMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newOffset = e.clientX - dragStart.current;
    setTimelineOffset(Math.max(Math.min(newOffset, 100), -100));
  };

  const handleTimelineMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleTimelineMouseMove);
    document.addEventListener('mouseup', handleTimelineMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleTimelineMouseMove);
      document.removeEventListener('mouseup', handleTimelineMouseUp);
    };
  }, []);

  // Zoom handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.25));

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
        perspective: '2000px',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(10, 11, 15, 0.7)',
        zIndex: 10,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}>
          <div style={{ flex: isSearchFocused ? '0 0 auto' : '1' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>Time Machine</h1>
            <p style={{ margin: '8px 0 0', opacity: 0.6, fontSize: '14px' }}>
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              {searchQuery && (
                <span style={{ marginLeft: '12px', color: '#60a5fa' }}>
                  • {filteredConversations.length} result{filteredConversations.length !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>

          {/* Expandable Search Field */}
          <div style={{
            position: 'relative',
            width: isSearchFocused ? '400px' : '200px',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}>
              {/* Search Icon */}
              <svg
                style={{
                  position: 'absolute',
                  left: '12px',
                  width: '18px',
                  height: '18px',
                  opacity: 0.5,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search conversations..."
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: isSearchFocused 
                    ? '1px solid rgba(96, 165, 250, 0.5)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isSearchFocused 
                    ? '0 0 0 3px rgba(96, 165, 250, 0.1)' 
                    : 'none',
                }}
              />

              {/* Clear Button */}
              {searchQuery && (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchQuery('');
                  }}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    opacity: 0.6,
                    transition: 'all 0.2s ease',
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.6';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Hint */}
            {isSearchFocused && !searchQuery && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                padding: '8px 12px',
                background: 'rgba(26, 27, 47, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                fontSize: '12px',
                opacity: 0.7,
                animation: 'fadeIn 0.2s ease',
              }}>
                Search by title or content
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D Stacked Conversations View */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          height: '500px',
          transformStyle: 'preserve-3d',
        }}>
          {visibleBuckets.map((bucket, index) => {
            const distance = index;
            const scale = Math.max(0.5, 1 - distance * 0.1);
            const zOffset = -distance * 80;
            const yOffset = distance * 20;
            const opacity = Math.max(0.3, 1 - distance * 0.2);
            const isHovered = bucket.conversations.some(c => c.id === hoveredConversation);

            return (
              <div
                key={bucket.key}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  maxWidth: '800px',
                  transform: `
                    translate(-50%, calc(-50% + ${yOffset}px))
                    translateZ(${zOffset}px)
                    scale(${scale})
                    ${isHovered ? 'translateZ(20px) scale(1.02)' : ''}
                  `,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity,
                  transformStyle: 'preserve-3d',
                  pointerEvents: index === 0 ? 'auto' : 'none',
                }}
              >
                {/* Cluster Card */}
                <div
                  style={{
                    background: 'rgba(26, 27, 47, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    padding: '24px',
                    cursor: index === 0 ? 'pointer' : 'default',
                  }}
                  onClick={() => {
                    if (index === 0 && bucket.conversations.length === 1) {
                      console.log('Open conversation:', bucket.conversations[0].id);
                    }
                  }}
                >
                  {/* Date Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 600 }}>
                        {format(bucket.date, 'MMMM d, yyyy')}
                      </div>
                      <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
                        {bucket.conversations.length} conversation{bucket.conversations.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    {bucket.conversations.length > 1 && (
                      <div style={{
                        background: 'rgba(59, 130, 246, 0.2)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        color: '#60a5fa',
                      }}>
                        Clustered
                      </div>
                    )}
                  </div>

                  {/* Conversations List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {bucket.conversations.slice(0, zoom > 1.5 ? 10 : 3).map((conv) => (
                      <div
                        key={conv.id}
                        onMouseEnter={() => setHoveredConversation(conv.id)}
                        onMouseLeave={() => setHoveredConversation(null)}
                        style={{
                          background: hoveredConversation === conv.id 
                            ? 'rgba(59, 130, 246, 0.1)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          gap: '12px',
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              fontSize: '14px', 
                              fontWeight: 500,
                              marginBottom: '4px',
                            }}>
                              {conv.title}
                            </div>
                            {zoom > 1.5 && (
                              <div style={{ 
                                fontSize: '12px', 
                                opacity: 0.6,
                                marginBottom: '4px',
                              }}>
                                {conv.preview}
                              </div>
                            )}
                            <div style={{ 
                              fontSize: '11px', 
                              opacity: 0.5,
                            }}>
                              {format(conv.date, 'HH:mm')} • {conv.messages} messages
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {bucket.conversations.length > (zoom > 1.5 ? 10 : 3) && (
                      <div style={{
                        textAlign: 'center',
                        fontSize: '12px',
                        opacity: 0.5,
                        padding: '8px',
                      }}>
                        +{bucket.conversations.length - (zoom > 1.5 ? 10 : 3)} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline at Bottom */}
      <div style={{
        background: 'rgba(10, 11, 15, 0.9)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px 40px',
        position: 'relative',
      }}>
        {/* Zoom Controls */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          justifyContent: 'center',
        }}>
          <button
            onClick={handleZoomOut}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            − Zoom Out
          </button>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            minWidth: '100px',
            textAlign: 'center',
          }}>
            {zoom.toFixed(1)}x
          </div>
          <button
            onClick={handleZoomIn}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            + Zoom In
          </button>
        </div>

        {/* Timeline Slider */}
        <div
          ref={timelineRef}
          onMouseDown={handleTimelineMouseDown}
          style={{
            position: 'relative',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            cursor: 'grab',
            userSelect: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Timeline Markers */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
          }}>
            {Array.from({ length: totalDays + 1 }).map((_, dayIndex) => {
              const date = subDays(newestDate, totalDays - dayIndex);
              const position = (dayIndex / totalDays) * 100;
              const isSelected = Math.abs(differenceInDays(date, selectedDate)) === 0;
              const hasConversations = conversations.some(c => 
                differenceInDays(startOfDay(c.date), startOfDay(date)) === 0
              );

              // Show markers based on zoom level
              const showMarker = zoom > 1 ? dayIndex % 1 === 0 : dayIndex % 7 === 0;

              return showMarker && (
                <div
                  key={dayIndex}
                  onClick={() => setSelectedDate(date)}
                  style={{
                    position: 'absolute',
                    left: `${position}%`,
                    transform: 'translateX(-50%)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: isSelected ? '12px' : '6px',
                    height: hasConversations ? '30px' : '15px',
                    background: isSelected 
                      ? '#60a5fa' 
                      : hasConversations 
                        ? 'rgba(96, 165, 250, 0.5)' 
                        : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px',
                    transition: 'all 0.2s ease',
                  }} />
                  {(zoom > 1.5 || dayIndex % 14 === 0) && (
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px',
                      whiteSpace: 'nowrap',
                      opacity: 0.6,
                    }}>
                      {format(date, zoom > 2 ? 'MMM d' : 'MMM')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Info */}
        <div style={{
          marginTop: '12px',
          fontSize: '12px',
          opacity: 0.6,
          textAlign: 'center',
        }}>
          {format(oldestDate, 'MMM d, yyyy')} — {format(newestDate, 'MMM d, yyyy')} 
          ({totalDays} days)
        </div>
      </div>
    </div>
  );
}
