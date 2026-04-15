import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { MobileHeader } from './components/MobileHeader';
import { BottomNav } from './components/BottomNav';
import { Toaster } from 'sonner';

export function Root() {
  const location = useLocation();

  // Routes where mobile navigation should not be shown
  const hideMobileNavRoutes = ['/', '/signin', '/signup', '/onboarding', '/waitlist'];
  const shouldHideMobileNav = hideMobileNavRoutes.some(route =>
    route === '/' ? location.pathname === route : location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] transition-colors duration-300">
      {!shouldHideMobileNav && (
        <MobileHeader />
      )}
      <Outlet />
      <ScrollRestoration />
      {!shouldHideMobileNav && (
        <BottomNav />
      )}
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
      />
    </div>
  );
}