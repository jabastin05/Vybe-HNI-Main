import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { NotificationDropdown } from './NotificationDropdown';
import { ThemeToggle } from './ThemeToggle';

export function MobileHeader() {

  // Mock user data - would come from context in real app
  const user = {
    firstName: 'Alexander',
    lastName: 'Sterling',
    initials: 'AS',
    avatarUrl: '',
  };

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-[40px] border-b border-black/[0.08] dark:border-white/[0.08] shadow-sm">
      {/* Top Highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent" />

      <div className="flex items-center justify-between px-4 py-3 safe-area-inset-top">
        {/* Left: Profile Avatar and Name */}
        <Link
          to="/settings"
          className="flex items-center gap-3 active:bg-black/5 dark:active:bg-white/5 rounded-xl px-2 py-1.5 transition-colors -ml-2"
        >
          {/* Avatar */}
          <div className="relative">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/30"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-[0_4px_16px_rgba(16,185,129,0.25)]">
                <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                <span className="text-[14px] font-bold text-white relative z-10">
                  {user.initials}
                </span>
              </div>
            )}
            {/* Active indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#1A1A1A] rounded-full" />
          </div>

          {/* Name */}
          <div className="flex items-center gap-1.5">
            <div className="text-left">
              <div className="text-[14px] font-bold text-black dark:text-white leading-tight">
                {user.firstName}
              </div>
              <div className="text-[11px] text-black/50 dark:text-white/50 leading-tight">
                View Profile
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-black/40 dark:text-white/40" />
          </div>
        </Link>

        {/* Right: Theme Toggle and Notification Dropdown */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationDropdown />
        </div>
      </div>
    </div>
  );
}
