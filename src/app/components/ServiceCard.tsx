import { Clock, IndianRupee, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export interface ServiceAttribute {
 name: string;
 description: string;
 eta: string;
 priceRange: string;
 requirements?: string[];
 deliverables?: string[];
 executionPartnerRole?: string;
 enabled: boolean;
}

export interface ServiceCardProps {
 id: string;
 name: string;
 description: string;
 color: string;
 badge?: string;
 attributes: ServiceAttribute[];
 onClick?: () => void;
 isSelected?: boolean;
 featured?: boolean;
 categoryName?: string;
}

export function ServiceCard({
 id,
 name,
 description,
 color,
 badge,
 attributes,
 onClick,
 isSelected = false,
 featured = false,
 categoryName,
}: ServiceCardProps) {
 const hasMultipleOptions = attributes.length > 1;
 const primaryAttribute = attributes[0];

 return (
 <div
 onClick={onClick}
 className={`
 relative bg-white/95 dark:bg-card/95 backdrop-blur-[40px] rounded-xl p-5 md:p-5 cursor-pointer
 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]
 transition-all duration-200 overflow-hidden group flex flex-col
 ${isSelected
 ? 'border-2 border-emerald-500 shadow-[0_8px_32px_rgba(16,185,129,0.25)]'
 : 'border border-white/60 dark:border-white/10 hover:shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_60px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1'
 }
 `}
 >
 {/* Top highlight */}
 <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

 {/* Header with Category and Badge */}
 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:gap-4 mb-4 md:mb-5 relative z-10">
 <div className="flex-1 min-w-0">
 {categoryName && (
 <div className="text-caption font-normal tracking-[0.05em] uppercase text-gray-400 dark:text-white/50 mb-1.5">
 {categoryName}
 </div>
 )}
 <h3 className="text-h2 md:text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
 {name}
 </h3>
 </div>
 {badge && (
 <div className="flex-shrink-0 px-3 py-1.5 bg-amber-500/20 rounded-lg border border-amber-500/30">
 <span className="text-caption font-normal tracking-[0.05em] uppercase text-amber-600 dark:text-amber-400 whitespace-nowrap">
 {badge}
 </span>
 </div>
 )}
 </div>

 {/* Description */}
 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed mb-4 md:mb-5">
 {description}
 </p>

 {/* ETA and Price Badges */}
 {primaryAttribute && (
 <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-5 flex-wrap">
 <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg border border-blue-500/20">
 <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
 <span className="text-caption font-normal tracking-[0.05em] uppercase text-blue-700 dark:text-blue-400">
 {primaryAttribute.eta}
 </span>
 </div>
 <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg border border-emerald-500/20">
 <IndianRupee className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
 <span className="text-caption font-normal tracking-[0.05em] uppercase text-emerald-700 dark:text-emerald-400">
 {primaryAttribute.priceRange}
 </span>
 </div>
 </div>
 )}

 {/* Deliverables */}
 {primaryAttribute && primaryAttribute.deliverables && primaryAttribute.deliverables.length > 0 && (
 <div className="space-y-1.5 md:space-y-2 mb-4 md:mb-5 pb-4 md:pb-5 border-b border-gray-200 dark:border-white/[0.06] flex-1">
 {primaryAttribute.deliverables.slice(0, 2).map((deliverable, index) => (
 <div key={index} className="flex items-start gap-2">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
 <span className="text-small text-gray-900/70 dark:text-white/70 font-normal">
 {deliverable}
 </span>
 </div>
 ))}
 </div>
 )}

 {/* Multiple Options Badge */}
 {hasMultipleOptions && (
 <div className="mb-4 md:mb-5 pb-4 md:pb-5 border-b border-gray-200 dark:border-white/[0.06]">
 <span className="text-small font-normal text-emerald-600 dark:text-emerald-400">
 <span className="font-normal">{attributes.length}</span> options available
 </span>
 </div>
 )}

 {/* Action - View Details Button */}
 <div className="mt-auto">
 <Link
 to={`/service/${id}`}
 onClick={(e) => e.stopPropagation()}
 className="flex items-center justify-center gap-2 text-small font-normal
 text-gray-900 dark:text-white
 px-4 md:px-5 py-2.5 rounded-xl
 hover:bg-brand-navy/5 dark:hover:bg-white/5
 transition-all border border-transparent"
 >
 <span>View Details</span>
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 </div>
 );
}
