import { cn } from '@/lib/utils';
import * as React from 'react';

export interface BulletListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[];
  maxLines?: number;
}

const BulletList = React.forwardRef<HTMLDivElement, BulletListProps>(
  ({ className, items, maxLines = 2, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-name="bullet-list"
        className={cn('text-base text-white/85', className)}
        {...props}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="mb-1.5 overflow-hidden text-ellipsis"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.4',
            }}
          >
            • {item}
          </div>
        ))}
      </div>
    );
  }
);
BulletList.displayName = 'BulletList';

export { BulletList };
