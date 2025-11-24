import { cn } from '@/lib/utils';
import type { KeyPoint } from '../../types/conversation';

interface KeyPointItemProps {
  keyPoint: KeyPoint;
  isSelected: boolean;
  onClick: () => void;
}

export default function KeyPointItem({
  keyPoint,
  isSelected,
  onClick
}: KeyPointItemProps) {
  return (
    <div
      data-name="keypoint-item"
      onClick={onClick}
      className={cn(
        'min-h-[48px] p-3 rounded-lg cursor-pointer text-[17px] text-white transition-all duration-200',
        'overflow-hidden text-ellipsis line-clamp-3 leading-relaxed',
        isSelected 
          ? 'bg-[#5ED0FF]/[0.12] border-l-[3px] border-l-[#5ED0FF]'
          : 'bg-white/[0.04] border-l-[3px] border-l-transparent hover:bg-white/[0.08] hover:translate-x-1'
      )}
    >
      • {keyPoint.text}
    </div>
  );
}
