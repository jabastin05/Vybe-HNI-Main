import { Link, useLocation } from 'react-router';
import { Building2, Plus, User, Briefcase, Home, FileText, LayoutDashboard } from 'lucide-react';
import { useProperties } from '../contexts/PropertiesContext';
import { VybeLogo } from './VybeLogo';

interface NavItem {
 icon: typeof Building2;
 label: string;
 path: string;
}

const navItems: NavItem[] = [
 { icon: Home, label: 'My Properties', path: '/my-properties' },
 { icon: Building2, label: 'Case Management', path: '/properties' },
 { icon: Briefcase, label: 'Services', path: '/services' },
 { icon: FileText, label: 'Documents', path: '/documents' },
 { icon: User, label: 'Profile', path: '/settings' },
];

export function SideNav() {
 const location = useLocation();
 const { properties } = useProperties();

 const isActive = (path: string) => {
 if (path === '/properties')
 return location.pathname === '/properties' || location.pathname === '/cases';
 if (path === '/my-properties')
 return location.pathname === '/my-properties' ||
 (location.pathname.startsWith('/property/') && location.pathname.includes('/detail'));
 if (path === '/documents')
 return location.pathname.startsWith('/documents') ||
 location.pathname.includes('/documents');
 if (path === '/services/catalog')
 return location.pathname.startsWith('/services') ||
 location.pathname.startsWith('/service/');
 return location.pathname === path;
 };

 const displayItems = properties.length > 0
 ? navItems
 : navItems.filter(item => item.path !== '/my-properties');

 return (
 <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-50
 flex-col w-[72px] overflow-visible
 bg-sidebar
 border-r border-white/[0.06]">

 {/* ── Brand ── */}
 <div className="flex items-center justify-center h-16 flex-shrink-0
 border-b border-white/[0.06]">
 <Link to="/" className="flex items-center justify-center group">
 <VybeLogo
           width={44}
           height={27}
           className="opacity-90 group-hover:opacity-100 transition-opacity"
           style={{ '--brand-primary': '#ffffff', '--brand-teal': '#ffffff' } as React.CSSProperties}
         />
 </Link>
 </div>

 {/* ── Add Property CTA ── */}
 <div className="px-3 pt-4 pb-2 flex-shrink-0">
 <NavTip label="Add Property">
 <Link
 to="/upload"
 className="group relative flex items-center justify-center
 w-full h-11 rounded-xl
 bg-brand-gold hover:bg-brand-gold-hover
 transition-all duration-200 hover:-translate-y-0.5"
 >
 <Plus className="w-5 h-5 text-brand-navy" strokeWidth={2.5} />
 </Link>
 </NavTip>
 </div>

 <div className="h-px mx-4 bg-white/[0.06] mb-2" />

 {/* ── Nav Items ── */}
 <nav className="flex-1 flex flex-col gap-1 px-3 py-1">
 {displayItems.map((item) => (
 <NavTip key={item.path} label={item.label}>
 <Link
 to={item.path}
 className={`
 relative group flex items-center justify-center
 w-full h-11 rounded-xl
 transition-all duration-200
 ${isActive(item.path)
 ? 'bg-white text-brand-navy'
 : 'text-white/50 hover:text-white hover:bg-white/[0.08]'}
 `}
 >
 {isActive(item.path) && (
 <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5
 rounded-r-full bg-brand-gold" />
 )}
 <item.icon
 className={`w-[20px] h-[20px] transition-all ${
 isActive(item.path) ? 'text-brand-navy' : 'text-white/50 group-hover:text-white'
 }`}
 strokeWidth={isActive(item.path) ? 2.2 : 1.6}
 />
 </Link>
 </NavTip>
 ))}
 </nav>

 </aside>
 );
}

/* ── Tooltip wrapper ─────────────────────────────────── */
function NavTip({ children, label }: { children: React.ReactNode; label: string }) {
 return (
 <div className="relative group/tip w-full">
 {children}
 {/* Tooltip */}
 <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2
 pointer-events-none z-[60]
 opacity-0 group-hover/tip:opacity-100
 -translate-x-1 group-hover/tip:translate-x-0
 transition-all duration-150 whitespace-nowrap">
 <div className="px-3 py-2 bg-sidebar border border-white/10 rounded-xl">
 <span className="text-xs font-normal text-white tracking-wide">
 {label}
 </span>
 {/* Arrow */}
 <div className="absolute right-full top-1/2 -translate-y-1/2
 border-t-[5px] border-b-[5px] border-r-[6px]
 border-t-transparent border-b-transparent border-r-sidebar" />
 </div>
 </div>
 </div>
 );
}
