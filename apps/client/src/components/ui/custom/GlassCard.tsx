import { cn } from '@/lib/utils';
import * as React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'selected' | 'building';
  hover?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, variant = 'default', hover = true, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white/[0.06] border-white/[0.12]',
      selected: 'bg-[#5ED0FF]/[0.15] border-[#5ED0FF] scale-[1.02]',
      building: 'bg-white/[0.03] border-white/[0.2] border-dashed opacity-70',
    };

    return (
      <div
        ref={ref}
        data-name="glass-card"
        className={cn(
          'min-h-[120px] p-4 rounded-xl border-2 transition-all duration-200',
          variantStyles[variant],
          hover && variant === 'default' && 'hover:bg-white/[0.10] hover:scale-[1.01] cursor-pointer',
          'overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

export { GlassCard };
