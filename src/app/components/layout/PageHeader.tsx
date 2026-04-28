import { ReactNode } from 'react';

interface PageHeaderProps {
 label?: string;
 title: string | ReactNode;
 subtitle?: string | ReactNode;
 className?: string;
 action?: ReactNode;
}

export function PageHeader({ label, title, subtitle, className = '', action }: PageHeaderProps) {
 return (
 <div className={`section-spacing ${className}`}>
 <div className="flex items-start justify-between gap-4">
 <div className="flex-1">
 {label && (
 <div className="text-[10px] tracking-[0.05em] uppercase font-normal text-[#0F172A]/40 dark:text-white/40 mb-2">
 {label}
 </div>
 )}
 <h1 className="text-h1 mb-2">{title}</h1>
 {subtitle && (
 <p className="text-body text-[#0F172A]/60 dark:text-white/60">{subtitle}</p>
 )}
 </div>
 {action && (
 <div className="flex-shrink-0">{action}</div>
 )}
 </div>
 </div>
 );
}
