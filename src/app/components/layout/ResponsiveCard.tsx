import { ReactNode, HTMLAttributes } from 'react';

interface ResponsiveCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function ResponsiveCard({ children, className = '', ...props }: ResponsiveCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-[#111111] rounded-xl border border-black/5 dark:border-white/5
        card-padding shadow-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
