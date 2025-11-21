// Tool call visualization component for all display levels

import type { ToolCall, ToolCategory } from '../../types/conversation';

interface ToolCallDisplayProps {
  toolCall: ToolCall;
  level: 'full' | 'condensed' | 'abstract';
}

/**
 * Get icon for tool category
 */
function getToolIcon(category: ToolCategory): string {
  const icons: Record<ToolCategory, string> = {
    search: '🔍',
    transaction: '💰',
    scheduling: '📅',
    generation: '🎨',
    analysis: '📊',
    communication: '📱',
  };
  return icons[category] || '🔧';
}

/**
 * Get status icon
 */
function getStatusIcon(status: 'pending' | 'success' | 'error'): string {
  const icons = {
    pending: '⏳',
    success: '✓',
    error: '✗',
  };
  return icons[status];
}

/**
 * Tool call display component
 * Adapts visual style based on display level
 */
export function ToolCallDisplay({ toolCall, level }: ToolCallDisplayProps) {
  const icon = getToolIcon(toolCall.category);
  const statusIcon = getStatusIcon(toolCall.status);
  
  if (level === 'full') {
    return (
      <div
        style={{
          padding: '12px 14px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>{icon}</span>
            <span style={{ fontWeight: 500 }}>Tool Used: {toolCall.name}</span>
          </div>
          <span
            style={{
              fontSize: '16px',
              color: toolCall.status === 'success' ? '#10b981' : toolCall.status === 'error' ? '#ef4444' : '#fbbf24',
            }}
          >
            {statusIcon}
          </span>
        </div>
        
        {/* Details */}
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.6' }}>
          {toolCall.status === 'success' && (
            <>
              <div>└─ Status: Success{toolCall.duration && ` (${toolCall.duration}s)`}</div>
              {toolCall.result && <div>└─ Data retrieved successfully</div>}
            </>
          )}
          {toolCall.status === 'error' && toolCall.error && (
            <div style={{ color: '#ef4444' }}>└─ Error: {toolCall.error}</div>
          )}
          {toolCall.status === 'pending' && <div>└─ Requesting data...</div>}
        </div>
      </div>
    );
  }
  
  if (level === 'condensed') {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '6px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <span>{icon}</span>
        <span>{toolCall.name}</span>
        <span style={{ color: toolCall.status === 'success' ? '#10b981' : '#ef4444' }}>
          {statusIcon}
        </span>
      </div>
    );
  }
  
  // Abstract level - minimal display
  return (
    <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
      {icon} {statusIcon}
    </span>
  );
}

/**
 * Tool call chain display for multiple sequential tool calls
 */
interface ToolChainProps {
  toolCalls: ToolCall[];
  level: 'full' | 'condensed';
}

export function ToolChain({ toolCalls, level }: ToolChainProps) {
  if (toolCalls.length === 0) return null;
  
  if (level === 'full') {
    return (
      <div
        style={{
          padding: '14px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '16px' }}>🔧</span>
          <span style={{ fontWeight: 500 }}>Tool Chain ({toolCalls.length} steps)</span>
        </div>
        
        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.8' }}>
          {toolCalls.map((tc, index) => (
            <div key={tc.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>├─ {index + 1}.</span>
              <span>{getToolIcon(tc.category)}</span>
              <span>{tc.name}</span>
              <span style={{ color: tc.status === 'success' ? '#10b981' : '#ef4444' }}>
                {getStatusIcon(tc.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Condensed level
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginTop: '8px',
      }}
    >
      {toolCalls.map((tc) => (
        <ToolCallDisplay key={tc.id} toolCall={tc} level="condensed" />
      ))}
    </div>
  );
}
