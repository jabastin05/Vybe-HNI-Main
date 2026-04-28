import { ReactNode } from 'react';

interface PageContainerProps {
 children: ReactNode;
 maxWidth?: string;
 className?: string;
}

export function PageContainer({ children, maxWidth = '1200px', className = '' }: PageContainerProps) {
 return (
 <div className={`container-padding py-6 md:py-8 lg:py-10 ${className}`}>
 <div className="mx-auto" style={{ maxWidth }}>
 {children}
 </div>
 </div>
 );
}
