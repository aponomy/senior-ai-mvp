import type { ReactNode } from 'react';
import { useDashboard } from '../context/DashboardContext';

interface PageContainerProps {
  label: string;
  tools?: ReactNode;
  children: ReactNode;
}

export default function PageContainer({ label, tools, children }: PageContainerProps) {
  const { isTimelineActive } = useDashboard();

  return (
    <div 
      data-name="cluster-card"
      style={{
        width: '100%',
        height: 'calc(100vh - 80px)', // Full height minus footer
        background: 'rgba(10, 11, 15, 0.98)',
        backdropFilter: 'blur(20px)',
        overflow: 'auto',
        padding: '20px',
        paddingBottom: isTimelineActive ? '180px' : '20px', // Extra padding when timeline is visible
      }}
    >
      {/* Header with tools */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(10, 11, 15, 0.98)',
        backdropFilter: 'blur(20px)',
        padding: '12px 0',
        marginLeft: '-20px',
        marginRight: '-20px',
        paddingLeft: '20px',
        paddingRight: '20px',
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
