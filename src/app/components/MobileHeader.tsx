import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { NotificationDropdown } from './NotificationDropdown';
import { ThemeToggle } from './ThemeToggle';
import { VybeLogo } from './VybeLogo';

function useProfileData() {
 const [profile, setProfile] = useState({ firstName: '', lastName: '', avatarUrl: '' });

 useEffect(() => {
 try {
 const saved = localStorage.getItem('vybeOnboardingData');
 if (saved) {
 const parsed = JSON.parse(saved);
 setProfile({
 firstName: parsed.firstName || '',
 lastName: parsed.lastName || '',
 avatarUrl: parsed.avatarUrl || '',
 });
 }
 } catch {}
 }, []);

 return profile;
}

export function MobileHeader() {
 const profile = useProfileData();
 const initial = profile.firstName.charAt(0).toUpperCase() || '?';
 const hasName = profile.firstName.length > 0;

 return (
 <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-16
 bg-white/95 dark:bg-background/95
 backdrop-blur-xl
 border-b border-gray-100 dark:border-white/[0.05]">

 <div className="flex items-center justify-between h-full px-5">

 {/* ── Left: avatar → Settings ── */}
 <Link to="/settings" className="flex-shrink-0" aria-label="Profile">
 <div className="w-9 h-9 rounded-full overflow-hidden
 ring-1 ring-brand-primary/20 dark:ring-white/10">
 {profile.avatarUrl ? (
 <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full bg-brand-primary/10 dark:bg-brand-primary/20
 flex items-center justify-center">
 <span className="text-sm font-normal text-brand-primary leading-none">
 {initial}
 </span>
 </div>
 )}
 </div>
 </Link>

 {/* ── Centre: VYBE logo ── */}
 <Link to="/my-properties" className="absolute left-1/2 -translate-x-1/2">
 <VybeLogo width={52} height={32} />
 </Link>

 {/* ── Right: actions ── */}
 <div className="flex items-center gap-0.5 flex-shrink-0">
 <ThemeToggle />
 <NotificationDropdown />
 </div>

 </div>
 </header>
 );
}
