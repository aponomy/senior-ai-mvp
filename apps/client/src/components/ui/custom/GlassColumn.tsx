import { cn } from '@/lib/utils';
import * as React from 'react';

export interface GlassColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassColumn = React.forwardRef<HTMLDivElement, GlassColumnProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-name="glass-column"
        className={cn(
          'flex flex-col gap-4 overflow-y-auto overflow-x-hidden p-5 bg-white/[0.02] rounded-xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassColumn.displayName = 'GlassColumn';

export { GlassColumn };
