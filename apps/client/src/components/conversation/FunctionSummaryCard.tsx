import type { Summary } from '../../types/conversation';
import { BulletList } from '../ui/custom/BulletList';
import { GlassCard } from '../ui/custom/GlassCard';
import { RelativeTime } from '../ui/custom/RelativeTime';
import { TextWithIcon } from '../ui/custom/TextWithIcon';

interface FunctionSummaryCardProps {
  summary: Summary;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Function Summary Card - Used for function executions (bank, booking, etc.)
 * Visually distinct from regular summaries with themed colors
 */
export default function FunctionSummaryCard({
  summary,
  isSelected,
  onClick
}: FunctionSummaryCardProps) {
  const isBuilding = summary.isBuilding;
  
    // Color scheme based on function type
  const colors = {
    bank: { primary: '#4CAF50', light: 'rgba(76,175,80,0.15)', border: 'rgba(76,175,80,0.4)' },
    booking: { primary: '#2196F3', light: 'rgba(33,150,243,0.15)', border: 'rgba(33,150,243,0.4)' },
    shopping: { primary: '#FF9800', light: 'rgba(255,152,0,0.15)', border: 'rgba(255,152,0,0.4)' },
    health: { primary: '#F44336', light: 'rgba(244,67,54,0.15)', border: 'rgba(244,67,54,0.4)' },
    communication: { primary: '#9C27B0', light: 'rgba(156,39,176,0.15)', border: 'rgba(156,39,176,0.4)' }
  };
  
  const color = colors[summary.functionType || 'bank'];
  
  return (
    <GlassCard
      data-name="function-summary-card"
      variant={isSelected ? 'selected' : isBuilding ? 'building' : 'default'}
      hover={!isBuilding}
      onClick={isBuilding ? undefined : onClick}
      className="min-h-[100px]"
      style={{
        backgroundColor: isSelected ? color.light : isBuilding ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
        borderColor: isSelected ? color.primary : color.border,
      }}
    >
      <TextWithIcon icon={summary.icon} size="md" className="mb-1.5" style={{ color: color.primary }}>
        {summary.title}
      </TextWithIcon>
      
      <RelativeTime className="mb-2 text-[13px]" color={`${color.primary}CC`}>
        {summary.relativeTime}
      </RelativeTime>
      
      {!isBuilding && (
        <BulletList items={summary.bulletPoints} maxLines={2} className="text-sm text-white/75" />
      )}
      
      {isBuilding && (
        <div className="text-sm italic" style={{ color: `${color.primary}99` }}>
          Building...
        </div>
      )}
    </GlassCard>
  );
}

