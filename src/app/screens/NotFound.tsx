import { useNavigate } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export function NotFound() {
 const navigate = useNavigate();

 // Auto-redirect to dashboard after a short delay
 useEffect(() => {
 const timer = setTimeout(() => {
 navigate('/my-properties');
 }, 3000);

 return () => clearTimeout(timer);
 }, [navigate]);

 return (
 <div className="min-h-screen bg-[#F8FAFC] dark:bg-background flex items-center justify-center px-8">
 <div className="max-w-md w-full text-center">
 <div className="bg-white dark:bg-card rounded-xl p-12 border border-[#E2E8F0] dark:border-white/[0.08]">
 <div className="text-[72px] font-normal text-[#0F172A]/10 dark:text-white/10 mb-4">
 404
 </div>
 <h1 className="text-h1 font-normal text-[#0F172A] dark:text-white mb-3">
 Page Not Found
 </h1>
 <p className="text-small text-[#475569] dark:text-white/50 mb-8">
 The page you're looking for doesn't exist. Redirecting to my properties in 3 seconds...
 </p>
 
 <div className="flex flex-col gap-3">
 <button
 onClick={() => navigate('/dashboard')}
 className="w-full px-6 py-2.5 rounded-xl bg-brand-navy dark:bg-card text-white text-small font-normal hover:bg-brand-navy-hover dark:hover:bg-brand-navy-hover transition-all flex items-center justify-center gap-2"
 >
 <Home className="w-4 h-4" />
 Go to My Properties
 </button>
 <button
 onClick={() => navigate(-1)}
 className="w-full px-6 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-white/[0.04] text-[#475569] dark:text-white/50 text-small font-normal hover:bg-[#F1F5F9] dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
 >
 <ArrowLeft className="w-4 h-4" />
 Go Back
 </button>
 </div>
 </div>
 </div>
 </div>
 );
}
