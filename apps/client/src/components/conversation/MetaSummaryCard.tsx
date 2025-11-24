import type { Summary } from '../../types/conversation';
import { BulletList } from '../ui/custom/BulletList';
import { GlassCard } from '../ui/custom/GlassCard';
import { RelativeTime } from '../ui/custom/RelativeTime';
import { TextWithIcon } from '../ui/custom/TextWithIcon';

interface MetaSummaryCardProps {
  summary: Summary;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Meta Summary Card - Used for conversations about navigation/interface
 * Visually distinct from regular summaries with amber styling
 */
export default function MetaSummaryCard({
  summary,
  isSelected,
  onClick
}: MetaSummaryCardProps) {
  const isBuilding = summary.isBuilding;
  const amberPrimary = '#FFC107';
  const amberBorder = 'rgba(255,193,7,0.3)';
  const amberLight = 'rgba(255,193,7,0.15)';
  
  return (
    <GlassCard
      data-name="meta-summary-card"
      variant={isSelected ? 'selected' : isBuilding ? 'building' : 'default'}
      hover={!isBuilding}
      onClick={isBuilding ? undefined : onClick}
      className="min-h-[100px] opacity-90"
      style={{
        backgroundColor: isSelected ? amberLight : isBuilding ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
        borderColor: isSelected ? amberPrimary : amberBorder,
      }}
    >
      <TextWithIcon 
        icon={summary.icon} 
        size="md" 
        className="mb-1.5 italic" 
        style={{ color: amberPrimary }}
      >
        {summary.title}
      </TextWithIcon>
      
      <RelativeTime className="mb-2 text-[13px]" color="rgba(255,193,7,0.7)">
        {summary.relativeTime}
      </RelativeTime>
      
      {!isBuilding && (
        <BulletList items={summary.bulletPoints} maxLines={2} className="text-sm text-white/75" />
      )}
      
      {isBuilding && (
        <div className="text-sm text-[#FFC107]/60 italic">
          Building...
        </div>
      )}
    </GlassCard>
  );
}
