import { Link, useLocation } from 'react-router';
import { Building2, Plus, FileText, Home, Layers } from 'lucide-react';
import { useProperties } from '../contexts/PropertiesContext';

export function BottomNav() {
 const location = useLocation();
 const { properties } = useProperties();

 const isActive = (path: string) => {
 if (path === '/my-properties')
 return location.pathname === '/my-properties' ||
 (location.pathname.startsWith('/property/') && location.pathname.includes('/detail'));
 if (path === '/properties')
 return (
 location.pathname === '/properties' ||
 location.pathname === '/cases' ||
 (location.pathname.startsWith('/property/') && !location.pathname.includes('/detail')) ||
 location.pathname.startsWith('/case')
 ) && !location.pathname.includes('/documents');
 if (path === '/documents')
 return location.pathname.startsWith('/documents') || location.pathname.includes('/documents');
 if (path === '/services')
 return location.pathname.startsWith('/services') || location.pathname.startsWith('/service/');
 return location.pathname === path;
 };

 const homePath = properties.length > 0 ? '/my-properties' : '/empty-dashboard';

 const tabs = [
 { path: homePath, activePath: '/my-properties', icon: Home, label: 'Portfolio' },
 { path: '/properties',activePath: '/properties', icon: Building2, label: 'Cases' },
 { path: '/services', activePath: '/services', icon: Layers, label: 'Services' },
 { path: '/documents', activePath: '/documents', icon: FileText, label: 'Docs' },
];

 return (
 /* Outer shell: pointer-events-none so the transparent gap above the pill
 doesn't block page scroll / taps on content behind the nav */
 <nav
 className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
 style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
 >
 <div className="px-4 pb-4 pointer-events-auto">

 {/* ── Floating pill ── */}
 <div className="
 flex items-center h-[62px] rounded-[28px]
 bg-white/96 dark:bg-card/96
 backdrop-blur-2xl
 border border-[#EEF2F7] dark:border-white/[0.07]
 px-2 gap-1
 ">

 {/* First 2 tabs */}
 {tabs.slice(0, 2).map(tab => (
 <TabItem
 key={tab.activePath}
 path={tab.path}
 icon={tab.icon}
 label={tab.label}
 active={isActive(tab.activePath)}
 />
 ))}

 {/* ── Central gold Add button ── */}
 <div className="flex-shrink-0 flex justify-center px-1">
 <Link
 to="/upload"
 className="group flex flex-col items-center gap-0.5"
 title="Add Property"
 >
 <div className="
 w-[48px] h-[48px] rounded-[20px]
 bg-brand-gold
 flex items-center justify-center
 group-active:scale-[0.93]
 transition-all duration-150
 ">
 <Plus className="w-[22px] h-[22px] text-brand-navy" strokeWidth={2.8} />
 </div>
 </Link>
 </div>

 {/* Last 2 tabs */}
 {tabs.slice(2).map(tab => (
 <TabItem
 key={tab.activePath}
 path={tab.path}
 icon={tab.icon}
 label={tab.label}
 active={isActive(tab.activePath)}
 />
 ))}
 </div>

 </div>
 </nav>
 );
}

/* ── Single tab item ── */
function TabItem({
 path, icon: Icon, label, active,
}: {
 path: string; icon: typeof Home; label: string; active: boolean;
}) {
 return (
 <Link
 to={path}
 className="flex-1 flex flex-col items-center justify-center gap-[3px] py-1
 rounded-2xl active:bg-brand-navy/[0.04] dark:active:bg-white/[0.06]
 transition-colors duration-100"
 >
 {/* Active indicator line */}
 <div className={`h-[2.5px] rounded-full mb-[1px] transition-all duration-200 ${
 active ? 'w-5 bg-brand-gold' : 'w-0 bg-transparent'
 }`} />

 <Icon
 className={`transition-colors duration-200 ${
 active
 ? 'w-[22px] h-[22px] text-brand-navy dark:text-white'
 : 'w-[20px] h-[20px] text-[#B0BAC9] dark:text-white/30'
 }`}
 strokeWidth={active ? 2.2 : 1.7}
 />
 <span className={`text-[10px] font-normal leading-none transition-colors duration-200 ${
 active
 ? 'text-brand-navy dark:text-white'
 : 'text-[#B0BAC9] dark:text-white/30'
 }`}>
 {label}
 </span>
 </Link>
 );
}
