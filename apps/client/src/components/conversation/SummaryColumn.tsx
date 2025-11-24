import type { Summary } from '../../types/conversation';
import { GlassColumn } from '../ui/custom/GlassColumn';
import { SectionDivider } from '../ui/custom/SectionDivider';
import { Button } from '../ui/shadcn/button';
import FunctionSummaryCard from './FunctionSummaryCard';
import MetaSummaryCard from './MetaSummaryCard';
import SummaryCard from './SummaryCard';

interface SummaryColumnProps {
  summaries: Summary[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function SummaryColumn({
  summaries,
  selectedId,
  onSelect
}: SummaryColumnProps) {
  // Separate regular, function, and meta summaries
  const regularSummaries = summaries.filter(s => !s.isMeta && !s.isFunction);
  const functionSummaries = summaries.filter(s => s.isFunction);
  const metaSummaries = summaries.filter(s => s.isMeta);
  
  return (
    <GlassColumn data-name="summary-column">
      {/* [+ New] button */}
      <Button
        className="h-12 w-full bg-[#5ED0FF]/15 border-2 border-[#5ED0FF] text-[#5ED0FF] font-semibold hover:bg-[#5ED0FF]/25 hover:scale-[1.02]"
        onClick={() => {/* TODO: Start new conversation */}}
      >
        + New
      </Button>
      
      {/* Regular summary cards */}
      {regularSummaries.map(summary => (
        <SummaryCard
          key={summary.id}
          summary={summary}
          isSelected={summary.id === selectedId}
          onClick={() => onSelect(summary.id)}
        />
      ))}
      
      {/* Horizontal separator for Functions (only if function summaries exist) */}
      {functionSummaries.length > 0 && (
        <SectionDivider label="Functions" color="rgba(76,175,80,0.5)" />
      )}
      
      {/* Function summary cards */}
      {functionSummaries.map(summary => (
        <FunctionSummaryCard
          key={summary.id}
          summary={summary}
          isSelected={summary.id === selectedId}
          onClick={() => onSelect(summary.id)}
        />
      ))}
      
      {/* Horizontal separator for Meta (only if meta summaries exist) */}
      {metaSummaries.length > 0 && (
        <SectionDivider label="Navigation" color="rgba(255,193,7,0.5)" />
      )}
      
      {/* Meta summary cards */}
      {metaSummaries.map(summary => (
        <MetaSummaryCard
          key={summary.id}
          summary={summary}
          isSelected={summary.id === selectedId}
          onClick={() => onSelect(summary.id)}
        />
      ))}
    </GlassColumn>
  );
}

