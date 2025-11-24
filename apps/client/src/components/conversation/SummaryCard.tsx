import type { Summary } from '../../types/conversation';
import { BulletList } from '../ui/custom/BulletList';
import { GlassCard } from '../ui/custom/GlassCard';
import { RelativeTime } from '../ui/custom/RelativeTime';
import { TextWithIcon } from '../ui/custom/TextWithIcon';

interface SummaryCardProps {
  summary: Summary;
  isSelected: boolean;
  onClick: () => void;
}

export default function SummaryCard({
  summary,
  isSelected,
  onClick
}: SummaryCardProps) {
  const isBuilding = summary.isBuilding;
  
  return (
    <GlassCard
      data-name="summary-card"
      variant={isSelected ? 'selected' : isBuilding ? 'building' : 'default'}
      hover={!isBuilding}
      onClick={isBuilding ? undefined : onClick}
    >
      <TextWithIcon icon={summary.icon} size="lg" className="mb-2">
        {summary.title}
      </TextWithIcon>
      
      <RelativeTime className="mb-3">
        {summary.relativeTime}
      </RelativeTime>
      
      {!isBuilding && (
        <BulletList items={summary.bulletPoints} />
      )}
      
      {isBuilding && (
        <div className="text-base text-white/50 italic">
          Building...
        </div>
      )}
    </GlassCard>
  );
}

