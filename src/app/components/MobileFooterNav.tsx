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
  { icon: Building2, label: 'Case Management', path: '/properties' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: Briefcase, label: 'Services', path: '/services/catalog' },
  { icon: User, label: 'Profile', path: '/settings' },
];

export function MobileFooterNav() {
  const location = useLocation();
  const { properties } = useProperties();

  const isActive = (path: string) => {
    if (path === '/properties') {
      return location.pathname === '/properties';
    }
    if (path === '/my-properties') {
      return location.pathname === '/my-properties' || (location.pathname.startsWith('/property/') && location.pathname.includes('/detail'));
    }
    if (path === '/upload') {
      return location.pathname === '/upload';
    }
    if (path === '/documents') {
      return location.pathname.startsWith('/documents') || location.pathname.includes('/documents');
    }
    return location.pathname === path;
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1A1A1A] border-t border-black/5 dark:border-white/10 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto container-padding py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Add Property Button */}
          <Link
            to="/upload"
            className="relative group flex-shrink-0"
            title="Add Property"
          >
            <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-110">
              <Plus className="w-6 h-6 transition-transform" strokeWidth={2.5} />
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-2 flex-1 justify-center overflow-x-auto">
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
                  <div
                    className={`
                      relative w-12 h-12 rounded-2xl flex items-center justify-center
                      transition-all duration-300
                      ${active
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-md scale-110'
                        : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105'
                      }
                    `}
                  >
                    <Icon
                      className="w-5 h-5 transition-all"
                      strokeWidth={active ? 2 : 1.5}
                    />
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap z-50">
                    <div className="relative px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-caption font-medium shadow-lg">
                      {item.label}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Spacer for balance */}
          <div className="w-14 flex-shrink-0" />
        </div>
      </div>
    </nav>
  );
}
