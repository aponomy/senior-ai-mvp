import { cn } from '@/lib/utils';
import * as React from 'react';

export interface RelativeTimeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
}

const RelativeTime = React.forwardRef<HTMLDivElement, RelativeTimeProps>(
  ({ className, children, color = 'rgba(255,255,255,0.6)', ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-name="relative-time"
        className={cn(
          'text-sm overflow-hidden text-ellipsis whitespace-nowrap',
          className
        )}
        style={{ color }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
RelativeTime.displayName = 'RelativeTime';

export { RelativeTime };
