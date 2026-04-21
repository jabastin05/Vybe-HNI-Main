import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { MobileHeader } from './components/MobileHeader';
import { BottomNav } from './components/BottomNav';
import { SideNav } from './components/SideNav';
import { Toaster } from 'sonner';

// Routes that use their own full-screen layout (no app shell)
const SHELL_EXCLUDED = ['/', '/signin', '/signup', '/onboarding', '/waitlist'];

function useShouldShowShell() {
  const location = useLocation();
  return !SHELL_EXCLUDED.some(route =>
    route === '/' ? location.pathname === route : location.pathname.startsWith(route)
  );
}

export function Root() {
  const showShell = useShouldShowShell();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0a0a0a] transition-colors duration-300">

      {/* ── Desktop sidebar (md+) ── */}
      {showShell && <SideNav />}

      {/* ── Mobile top bar (< md) ── */}
      {showShell && <MobileHeader />}

      {/* ── Page content ── */}
      {/*
        md:pl-[72px]  — offset for the fixed sidebar on tablet/desktop
        pt-14         — offset for MobileHeader (56px) on mobile
        md:pt-0       — no top offset needed on desktop (no top bar)
        pb-[72px]     — offset for BottomNav on mobile
        md:pb-0       — no bottom offset on desktop
      */}
      {/*
        pt-16         — offset for taller MobileHeader (64px) on mobile
        md:pt-0       — no top offset on desktop
        pb-[calc(88px+env(safe-area-inset-bottom))]
                      — clears floating pill nav (62px) + 16px gap + safe area
        md:pb-0       — no bottom offset on desktop
      */}
      <main className={showShell
        ? "md:pl-[72px] pt-16 md:pt-0 pb-[calc(88px+env(safe-area-inset-bottom))] md:pb-0"
        : ""
      }>
        <Outlet />
      </main>

      {/* ── Mobile bottom nav (< md) ── */}
      {showShell && <BottomNav />}

      <ScrollRestoration />
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
      />
    </div>
  );
}
