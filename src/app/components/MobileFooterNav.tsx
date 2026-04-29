import { Link, useLocation } from 'react-router';
import { Building2, Plus, User, Briefcase, Home, FileText } from 'lucide-react';
import { useProperties } from '../contexts/PropertiesContext';

interface NavItem {
 icon: typeof Building2;
 label: string;
 path: string;
}

const navItems: NavItem[] = [
 { icon: Home, label: 'My Properties', path: '/my-properties' },
 { icon: Building2, label: 'Cases', path: '/properties' },
 { icon: FileText, label: 'Documents', path: '/documents' },
 { icon: Briefcase, label: 'Services', path: '/services/catalog' },
 { icon: User, label: 'Profile', path: '/settings' },
];

export function MobileFooterNav() {
 const location = useLocation();
 const { properties } = useProperties();

 const isActive = (path: string) => {
 if (path === '/properties')
 return location.pathname === '/properties';
 if (path === '/my-properties')
 return location.pathname === '/my-properties' ||
 (location.pathname.startsWith('/property/') && location.pathname.includes('/detail'));
 if (path === '/documents')
 return location.pathname.startsWith('/documents') || location.pathname.includes('/documents');
 return location.pathname === path;
 };

 return (
 <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50
 bg-white dark:bg-brand-navy
 border-t border-gray-200 dark:border-white/[0.08]
 backdrop-blur-xl">
 <div className="max-w-[1200px] mx-auto container-padding py-3">
 <div className="flex items-center justify-between gap-1">

 {/* Gold Add Property FAB */}
 <Link to="/upload" className="relative group flex-shrink-0" title="Add Property">
 <div className="relative w-13 h-13 rounded-2xl flex items-center justify-center
 bg-brand-primary hover:bg-brand-primary-hover
 transition-all duration-200 hover:scale-110"
 style={{ width: '52px', height: '52px' }}>
 <Plus className="w-6 h-6 text-white" strokeWidth={1.5} />
 </div>
 </Link>

 {/* Nav items */}
 <div className="flex items-center gap-1 flex-1 justify-evenly overflow-x-auto scrollbar-hide">
 {navItems.map((item) => {
 const Icon = item.icon;
 const active = isActive(item.path);

 return (
 <Link
 key={item.path}
 to={item.path}
 className="relative group flex-shrink-0"
 title={item.label}
 >
 <div className={`
 relative flex flex-col items-center justify-center gap-1
 w-12 h-12 rounded-2xl transition-all duration-200
 ${active
 ? 'bg-brand-navy dark:bg-white text-white dark:text-brand-navy scale-110'
 : 'text-gray-400 dark:text-white/40 hover:text-brand-navy dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-105'}
 `}>
 <Icon
 className="w-5 h-5 transition-all"
 strokeWidth={active ? 2.2 : 1.5}
 />
 </div>

 {/* Active gold underline dot */}
 {active && (
 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold" />
 )}

 {/* Tooltip */}
 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
 opacity-0 group-hover:opacity-100 pointer-events-none
 transition-all duration-200 whitespace-nowrap z-50">
 <div className="px-2.5 py-1.5 bg-brand-navy text-white rounded-lg
 text-xs font-normal tracking-wide">
 {item.label}
 </div>
 </div>
 </Link>
 );
 })}
 </div>

 {/* Spacer */}
 <div style={{ width: '52px' }} className="flex-shrink-0" />
 </div>
 </div>
 </nav>
 );
}
