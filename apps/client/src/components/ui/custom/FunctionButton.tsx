import { cn } from '@/lib/utils';
import * as React from 'react';

export interface FunctionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string; // rgba color for the theme
}

const FunctionButton = React.forwardRef<HTMLButtonElement, FunctionButtonProps>(
  ({ className, children, color = 'rgba(74, 158, 255, 0.3)', ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Extract RGB and create lighter version for hover
    const getHoverColor = (rgba: string) => {
      return rgba.replace(/[\d.]+\)$/g, '0.5)'); // Change opacity to 0.5
    };

    const getBgColor = (rgba: string, opacity: number) => {
      return rgba.replace(/[\d.]+\)$/g, `${opacity})`);
    };

    return (
      <button
        ref={ref}
        data-name="function-button"
        className={cn(
          'p-5 rounded-xl font-semibold text-white text-base cursor-pointer',
          'transition-all duration-200 text-center h-[100px] flex items-center justify-center',
          className
        )}
        style={{
          border: `1px solid ${color}`,
          background: isHovered ? getBgColor(color, 0.25) : getBgColor(color, 0.15),
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          borderColor: isHovered ? getHoverColor(color) : color,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
FunctionButton.displayName = 'FunctionButton';

export { FunctionButton };
