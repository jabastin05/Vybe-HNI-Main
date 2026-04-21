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
    { path: homePath,     activePath: '/my-properties', icon: Home,      label: 'Home'     },
    { path: '/properties',activePath: '/properties',    icon: Building2, label: 'Cases'    },
    { path: '/services',  activePath: '/services',      icon: Layers,    label: 'Services' },
    { path: '/documents', activePath: '/documents',     icon: FileText,  label: 'Docs'     },
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
          bg-white/96 dark:bg-[#0d1b2e]/96
          backdrop-blur-2xl
          shadow-[0_8px_32px_rgba(11,31,58,0.14),0_1px_0_rgba(255,255,255,0.9)_inset]
          dark:shadow-[0_8px_40px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.04)_inset]
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
                bg-[#C9A75D]
                flex items-center justify-center
                shadow-[0_4px_18px_rgba(201,167,93,0.55)]
                group-active:scale-[0.93] group-active:shadow-[0_2px_8px_rgba(201,167,93,0.4)]
                transition-all duration-150
              ">
                <Plus className="w-[22px] h-[22px] text-[#0B1F3A]" strokeWidth={2.8} />
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
                 rounded-2xl active:bg-[#0B1F3A]/[0.04] dark:active:bg-white/[0.06]
                 transition-colors duration-100"
    >
      {/* Active indicator line */}
      <div className={`h-[2.5px] rounded-full mb-[1px] transition-all duration-200 ${
        active ? 'w-5 bg-[#C9A75D]' : 'w-0 bg-transparent'
      }`} />

      <Icon
        className={`transition-colors duration-200 ${
          active
            ? 'w-[22px] h-[22px] text-[#0B1F3A] dark:text-white'
            : 'w-[20px] h-[20px] text-[#B0BAC9] dark:text-white/30'
        }`}
        strokeWidth={active ? 2.2 : 1.7}
      />
      <span className={`text-[10px] font-normal leading-none transition-colors duration-200 ${
        active
          ? 'text-[#0B1F3A] dark:text-white'
          : 'text-[#B0BAC9] dark:text-white/30'
      }`}>
        {label}
      </span>
    </Link>
  );
}
