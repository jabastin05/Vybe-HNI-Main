import { Link, useLocation } from 'react-router';
import { Building2, Briefcase, Plus, FileText } from 'lucide-react';
import { useProperties } from '../contexts/PropertiesContext';

export function BottomNav() {
  const location = useLocation();
  const { properties } = useProperties();

  const isActive = (path: string) => {
    if (path === '/my-properties') {
      return location.pathname === '/my-properties';
    }
    if (path === '/properties') {
      return (location.pathname === '/properties' || location.pathname.startsWith('/property/') || location.pathname.startsWith('/case')) && !location.pathname.includes('/documents');
    }
    if (path === '/services') {
      return location.pathname.startsWith('/services') || location.pathname.startsWith('/service');
    }
    if (path === '/documents') {
      return location.pathname.startsWith('/documents') || location.pathname.includes('/documents');
    }
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glass Background */}
      <div className="bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-[40px] border-t border-black/[0.08] dark:border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
        {/* Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent" />

        <div className="flex items-center justify-around px-4 py-3 safe-area-inset-bottom">
          {/* My Properties */}
          <Link
            to={properties.length > 0 ? '/my-properties' : '/upload'}
            className="flex flex-col items-center gap-1 flex-1 group"
          >
            <div
              className={`
                w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-300
                ${isActive('/my-properties')
                  ? 'bg-black dark:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] scale-105'
                  : 'bg-transparent group-active:bg-black/5 dark:group-active:bg-white/5'
                }
              `}
            >
              <Building2
                className={`
                  w-5 h-5 transition-colors duration-300
                  ${isActive('/my-properties')
                    ? 'text-white dark:text-black'
                    : 'text-black/50 dark:text-white/50 group-active:text-black/70 dark:group-active:text-white/70'
                  }
                `}
                strokeWidth={isActive('/my-properties') ? 2 : 1.5}
              />
            </div>
            <span
              className={`
                text-[10px] font-bold tracking-tight transition-colors duration-300
                ${isActive('/my-properties')
                  ? 'text-black dark:text-white'
                  : 'text-black/50 dark:text-white/50'
                }
              `}
            >
              My Property
            </span>
          </Link>

          {/* Case Management */}
          <Link
            to="/properties"
            className="flex flex-col items-center gap-1 flex-1 group"
          >
            <div
              className={`
                w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-300
                ${isActive('/properties')
                  ? 'bg-black dark:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] scale-105'
                  : 'bg-transparent group-active:bg-black/5 dark:group-active:bg-white/5'
                }
              `}
            >
              <Building2
                className={`
                  w-5 h-5 transition-colors duration-300
                  ${isActive('/properties')
                    ? 'text-white dark:text-black'
                    : 'text-black/50 dark:text-white/50 group-active:text-black/70 dark:group-active:text-white/70'
                  }
                `}
                strokeWidth={isActive('/properties') ? 2 : 1.5}
              />
            </div>
            <span
              className={`
                text-[10px] font-bold tracking-tight transition-colors duration-300
                ${isActive('/properties')
                  ? 'text-black dark:text-white'
                  : 'text-black/50 dark:text-white/50'
                }
              `}
            >
              Cases
            </span>
          </Link>

          {/* Add New Property - Center CTA */}
          <Link
            to="/upload"
            className="flex flex-col items-center gap-1 flex-1 -mt-6 group"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-emerald-500 rounded-[18px] blur-xl opacity-40 group-active:opacity-60 transition-opacity" />

              {/* Button */}
              <div className="relative w-14 h-14 rounded-[18px] bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.35)] group-active:shadow-[0_12px_32px_rgba(16,185,129,0.5)] group-active:scale-95 transition-all duration-300">
                {/* Inner highlight */}
                <div className="absolute inset-[1px] rounded-[17px] bg-gradient-to-b from-white/25 to-transparent" />
                <Plus className="w-7 h-7 text-white relative z-10" strokeWidth={2.5} />
              </div>
            </div>
            <span className="text-[10px] font-bold tracking-tight text-black dark:text-white mt-1">
              Add New
            </span>
          </Link>

          {/* Services */}
          <Link
            to="/services/catalog"
            className="flex flex-col items-center gap-1 flex-1 group"
          >
            <div
              className={`
                w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-300
                ${isActive('/services')
                  ? 'bg-black dark:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] scale-105'
                  : 'bg-transparent group-active:bg-black/5 dark:group-active:bg-white/5'
                }
              `}
            >
              <Briefcase
                className={`
                  w-5 h-5 transition-colors duration-300
                  ${isActive('/services')
                    ? 'text-white dark:text-black'
                    : 'text-black/50 dark:text-white/50 group-active:text-black/70 dark:group-active:text-white/70'
                  }
                `}
                strokeWidth={isActive('/services') ? 2 : 1.5}
              />
            </div>
            <span
              className={`
                text-[10px] font-bold tracking-tight transition-colors duration-300
                ${isActive('/services')
                  ? 'text-black dark:text-white'
                  : 'text-black/50 dark:text-white/50'
                }
              `}
            >
              Service
            </span>
          </Link>

          {/* My Documents */}
          <Link
            to="/documents"
            className="flex flex-col items-center gap-1 flex-1 group"
          >
            <div
              className={`
                w-11 h-11 rounded-[14px] flex items-center justify-center transition-all duration-300
                ${isActive('/documents')
                  ? 'bg-black dark:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] scale-105'
                  : 'bg-transparent group-active:bg-black/5 dark:group-active:bg-white/5'
                }
              `}
            >
              <FileText
                className={`
                  w-5 h-5 transition-colors duration-300
                  ${isActive('/documents')
                    ? 'text-white dark:text-black'
                    : 'text-black/50 dark:text-white/50 group-active:text-black/70 dark:group-active:text-white/70'
                  }
                `}
                strokeWidth={isActive('/documents') ? 2 : 1.5}
              />
            </div>
            <span
              className={`
                text-[10px] font-bold tracking-tight transition-colors duration-300
                ${isActive('/documents')
                  ? 'text-black dark:text-white'
                  : 'text-black/50 dark:text-white/50'
                }
              `}
            >
              My Document
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
