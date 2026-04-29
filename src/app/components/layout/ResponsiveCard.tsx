import { ReactNode, HTMLAttributes } from 'react';

interface ResponsiveCardProps extends HTMLAttributes<HTMLDivElement> {
 children: ReactNode;
 className?: string;
}

export function ResponsiveCard({ children, className = '', ...props }: ResponsiveCardProps) {
 return (
 <div
 className={`
 bg-white dark:bg-card rounded-xl shadow-card
 card-padding shadow-sm
 ${className}
 `}
 {...props}
 >
 {children}
 </div>
 );
}
