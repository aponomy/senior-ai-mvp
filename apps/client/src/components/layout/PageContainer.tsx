import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useDashboard } from '../../context/DashboardContext';

interface PageContainerProps {
  label: string;
  tools?: ReactNode;
  children: ReactNode;
}

export default function PageContainer({ label, tools, children }: PageContainerProps) {
  const { isTimelineActive } = useDashboard();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const initialOffsetRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    if (!container || !header) return;

    // Store the initial offset position before any scrolling
    initialOffsetRef.current = header.offsetTop;

    const handleScroll = () => {
      // Use the stored initial offset position
      const threshold = initialOffsetRef.current;
      
      // If we've scrolled past the header's initial natural position, make it sticky
      if (container.scrollTop >= threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      data-name="cluster-card"
      style={{
        width: '100%',
        height: 'calc(100vh - 80px)', // Full height minus footer
        overflow: 'auto',
        padding: '20px',
        paddingBottom: isTimelineActive ? '180px' : '20px', // Extra padding when timeline is visible
      }}
    >
      {/* Header with tools */}
      <div 
        ref={headerRef}
        style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        position: isSticky ? 'sticky' : 'static',
        top: isSticky ? '-21px' : 'auto',
        zIndex: 10,
        background: 'linear-gradient(rgb(10 11 15) 0%, rgb(13 17 21) 100%)',
        padding: '12px 0',
        marginLeft: '-20px',
        marginRight: '-20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        transition: 'all 0.2s ease',
      }}>
        <h2 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: 600,
          margin: 0,
        }}>
          {label}
        </h2>
        
        {tools && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {tools}
          </div>
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
