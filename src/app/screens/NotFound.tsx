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
 <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center px-8">
 <div className="max-w-md w-full text-center">
 <div className="bg-white dark:bg-card rounded-xl p-12 shadow-card">
 <div className="text-h1 font-normal text-gray-900/10 dark:text-white/10 mb-4">
 404
 </div>
 <h1 className="text-h1 font-semibold text-gray-900 dark:text-white mb-3">
 Page Not Found
 </h1>
 <p className="text-small text-gray-600 dark:text-white/50 mb-8">
 The page you're looking for doesn't exist. Redirecting to my properties in 3 seconds...
 </p>
 
 <div className="flex flex-col gap-3">
 <button
 onClick={() => navigate('/dashboard')}
 className="w-full px-6 py-2.5 rounded-xl bg-brand-navy dark:bg-card text-white text-small font-semibold hover:bg-brand-navy-hover dark:hover:bg-brand-navy-hover transition-all flex items-center justify-center gap-2"
 >
 <Home className="w-4 h-4" />
 Go to My Properties
 </button>
 <button
 onClick={() => navigate(-1)}
 className="w-full px-6 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] text-gray-600 dark:text-white/50 text-small font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
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
