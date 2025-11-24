import type { KeyPoint } from '../../types/conversation';
import { GlassColumn } from '../ui/custom/GlassColumn';
import KeyPointItem from './KeyPointItem';

interface KeyPointColumnProps {
  keyPoints: KeyPoint[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  isCurrentContext: boolean;
}

export default function KeyPointColumn({
  keyPoints,
  selectedId,
  onSelect,
  isCurrentContext
}: KeyPointColumnProps) {
  return (
    <GlassColumn data-name="keypoint-column" className="gap-2">
      {/* Sticky label */}
      <div className="text-sm font-semibold text-white/60 mb-2 uppercase tracking-wider">
        {isCurrentContext ? 'Current' : 'Key Points'}
      </div>
      
      {/* Key point items */}
      {keyPoints.map(keyPoint => (
        <KeyPointItem
          key={keyPoint.id}
          keyPoint={keyPoint}
          isSelected={keyPoint.id === selectedId}
          onClick={() => onSelect(keyPoint.id)}
        />
      ))}
      
      {/* Building indicator for current context */}
      {isCurrentContext && keyPoints.length === 0 && (
        <div className="min-h-[48px] p-3 bg-white/[0.03] border-2 border-dashed border-white/20 rounded-lg text-base text-white/50 italic">
          Building...
        </div>
      )}
    </GlassColumn>
  );
}
