import { ReactNode, HTMLAttributes } from 'react';

interface ResponsiveCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function ResponsiveCard({ children, className = '', ...props }: ResponsiveCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-[#0d1b2e] rounded-xl border border-[#E2E8F0] dark:border-white/[0.06]
        card-padding shadow-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
