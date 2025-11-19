import type { ReactNode } from 'react';

interface PageContainerProps {
  label: string;
  tools?: ReactNode;
  children: ReactNode;
}

export default function PageContainer({ label, tools, children }: PageContainerProps) {
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
        paddingBottom: '80px', // Space for footer
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(10, 11, 15, 0.7)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
          {label}
        </h1>
        {tools && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {tools}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
