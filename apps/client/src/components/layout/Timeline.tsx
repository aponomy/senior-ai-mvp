import { differenceInDays, format, startOfDay, subDays } from 'date-fns';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/shadcn/button';

interface TimelineProps {
  conversations: Array<{ id: string; title: string; date: Date }>;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onClose?: () => void;
}

export default function Timeline({
  conversations,
  zoom,
  onZoomIn,
  onZoomOut,
  selectedDate,
  onDateSelect,
  onClose,
}: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const timelineOffset = useRef(0);

  // Calculate date range
  const oldestDate = conversations.length > 0 
    ? startOfDay(conversations[conversations.length - 1].date)
    : subDays(new Date(), 90);
  const newestDate = startOfDay(new Date());
  const totalDays = differenceInDays(newestDate, oldestDate);

  // Timeline drag handlers
  const handleTimelineMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = e.clientX - timelineOffset.current;
  };

  const handleTimelineMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newOffset = e.clientX - dragStart.current;
    timelineOffset.current = Math.max(Math.min(newOffset, 100), -100);
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

  return (
    <div 
      data-name="timeline"
      style={{
      background: 'rgba(10, 11, 15, 0.9)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '20px 40px',
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Close button - top right */}
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-md bg-white/8 hover:bg-white/12 text-white/60 hover:text-white/90 z-10"
        >
          ✕
        </Button>
      )}
      
      {/* Zoom Controls */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        justifyContent: 'center',
      }}>
        <Button
          variant="outline"
          onClick={onZoomOut}
          className="bg-white/10 hover:bg-white/15 border-white/20 text-white"
        >
          − Zoom Out
        </Button>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          minWidth: '100px',
          textAlign: 'center',
          color: 'white',
        }}>
          {zoom.toFixed(1)}x
        </div>
        <Button
          variant="outline"
          onClick={onZoomIn}
          className="bg-white/10 hover:bg-white/15 border-white/20 text-white"
        >
          + Zoom In
        </Button>
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
                onClick={() => onDateSelect(date)}
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
                    color: 'white',
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
        color: 'white',
      }}>
        {format(oldestDate, 'MMM d, yyyy')} — {format(newestDate, 'MMM d, yyyy')} 
        ({totalDays} days)
      </div>
    </div>
  );
}
