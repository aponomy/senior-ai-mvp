import { cn } from '@/lib/utils';
import * as React from 'react';

export interface TextWithIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const TextWithIcon = React.forwardRef<HTMLDivElement, TextWithIconProps>(
  ({ className, icon, children, size = 'md', ...props }, ref) => {
    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    return (
      <div
        ref={ref}
        data-name="text-with-icon"
        className={cn(
          'font-semibold text-white overflow-hidden text-ellipsis whitespace-nowrap',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </div>
    );
  }
);
TextWithIcon.displayName = 'TextWithIcon';

export { TextWithIcon };
