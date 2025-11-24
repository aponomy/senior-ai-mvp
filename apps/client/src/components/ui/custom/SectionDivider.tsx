import { cn } from '@/lib/utils';
import * as React from 'react';

export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  color?: string;
}

const SectionDivider = React.forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ className, label, color = 'rgba(76,175,80,0.5)', ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-name="section-divider"
        className={cn('relative h-px my-2', className)}
        style={{
          background: `linear-gradient(90deg, transparent, ${color} 20%, ${color} 80%, transparent)`,
        }}
        {...props}
      >
        <div
          className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 px-2 text-[11px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: 'rgba(10, 11, 15, 0.98)',
            color: color.replace('0.5', '0.9'),
          }}
        >
          {label}
        </div>
      </div>
    );
  }
);
SectionDivider.displayName = 'SectionDivider';

export { SectionDivider };
