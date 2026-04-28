import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { NotificationDropdown } from './NotificationDropdown';
import { ThemeToggle } from './ThemeToggle';

function useProfileData() {
 const [profile, setProfile] = useState({ firstName: 'Alexander', lastName: 'Sterling', avatarUrl: '' });

 useEffect(() => {
 try {
 const saved = localStorage.getItem('vybeOnboardingData');
 if (saved) {
 const parsed = JSON.parse(saved);
 setProfile({
 firstName: parsed.firstName || 'Alexander',
 lastName: parsed.lastName || 'Sterling',
 avatarUrl: parsed.avatarUrl || '',
 });
 }
 } catch {}
 }, []);

 return profile;
}

export function MobileHeader() {
 const { pathname } = useLocation();
 const profile = useProfileData();

 // Derive a short display name (first name only, max 12 chars)
 const displayName = profile.firstName.length > 12
 ? profile.firstName.substring(0, 12)
 : profile.firstName;

 const initial = profile.firstName.charAt(0).toUpperCase() || 'A';

 return (
 <header className="
 md:hidden fixed top-0 left-0 right-0 z-40 h-16
 bg-white/96 dark:bg-background/96
 backdrop-blur-xl
 border-b border-[#F1F5F9] dark:border-white/[0.05]
 ">
 <div className="flex items-center justify-between h-full px-4">

 {/* Left: user profile → taps to Settings */}
 <Link to="/settings" className="flex items-center gap-2.5 min-w-0">
 {/* Avatar */}
 <div className="relative flex-shrink-0">
 <div className="w-9 h-9 rounded-full overflow-hidden border-[1.5px] border-brand-gold/50">
 {profile.avatarUrl ? (
 <img
 src={profile.avatarUrl}
 alt={displayName}
 className="w-full h-full object-cover"
 />
 ) : (
 <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-navy-hover flex items-center justify-center">
 <span className="text-sm font-normal text-brand-gold leading-none">
 {initial}
 </span>
 </div>
 )}
 </div>
 {/* Online / verified dot */}
 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-gold border-2 border-white dark:border-[#0a0a0a]" />
 </div>

 {/* Name + greeting */}
 <div className="flex flex-col justify-center gap-[2px] min-w-0">
 <span className="text-[10px] font-normal tracking-[0.12em] uppercase text-brand-gold leading-none">
 Welcome back
 </span>
 <span className="text-sm font-normal text-[#0F172A] dark:text-white tracking-[-0.02em] leading-none truncate">
 {displayName}
 </span>
 </div>
 </Link>

 {/* Right: actions */}
 <div className="flex items-center gap-1">
 <ThemeToggle />
 <NotificationDropdown />
 </div>

 </div>
 </header>
 );
}
