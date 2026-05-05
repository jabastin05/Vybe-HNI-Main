import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Mail, AlertCircle } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { VybeLogo } from '../components/VybeLogo';

export function SignIn() {
 const navigate = useNavigate();
 const [step, setStep] = useState<'email' | 'verification'>('email');
 const [email, setEmail] = useState('');
 const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState('');
 const [canResend, setCanResend] = useState(false);
 const [resendTimer, setResendTimer] = useState(30);

 const startResendTimer = () => {
 setCanResend(false);
 setResendTimer(30);
 const interval = setInterval(() => {
 setResendTimer(prev => {
 if (prev <= 1) { clearInterval(interval); setCanResend(true); return 0; }
 return prev - 1;
 });
 }, 1000);
 };

 const handleSendCode = async (e: React.FormEvent) => {
 e.preventDefault();
 setError('');
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(email)) { setError('Please enter a valid email address'); return; }
 setIsLoading(true);
 setTimeout(() => { setIsLoading(false); setStep('verification'); startResendTimer(); }, 1000);
 };

 const handleCodeChange = (index: number, value: string) => {
 if (value.length > 1) return;
 const newCode = [...verificationCode];
 newCode[index] = value;
 setVerificationCode(newCode);
 if (value && index < 5) document.getElementById(`code-${index + 1}`)?.focus();
 };

 const handleVerify = () => {
 setIsLoading(true);
 setTimeout(() => {
 const emailName = email.split('@')[0];
 const userName = emailName.split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
 localStorage.setItem('vybeUser', JSON.stringify({ name: userName, email, createdAt: new Date().toISOString(), signupMethod: 'email' }));
 localStorage.setItem('vybeUserName', userName);
 setIsLoading(false);
 const hasOnboarding = localStorage.getItem('vybeOnboardingComplete') === 'true';
 navigate(hasOnboarding ? '/my-properties' : '/onboarding');
 }, 1000);
 };

 const handleResendCode = () => { setVerificationCode(['', '', '', '', '', '']); startResendTimer(); };

 const handleSSOSignIn = (provider: 'google' | 'microsoft' | 'linkedin') => {
 const userName = `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`;
 localStorage.setItem('vybeUserName', userName);
 const hasOnboarding = localStorage.getItem('vybeOnboardingComplete') === 'true';
 navigate(hasOnboarding ? '/my-properties' : '/onboarding');
 };

 return (
 <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background">

 {/* ── Hero ── */}
 <div className="relative bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06] shadow-header px-5 pt-8 pb-6 flex-shrink-0">
 <div className="absolute top-4 right-4"><ThemeToggle /></div>
 <div className="flex justify-center mb-5">
 <VybeLogo width={64} height={40} />
 </div>
 {step === 'email' ? (
 <div className="text-center">
 <p className="text-caption tracking-[0.16em] uppercase text-brand-primary mb-2">Sign In</p>
 <h1 className="text-h2 font-semibold text-gray-900 dark:text-white tracking-tight leading-none mb-1.5">Welcome Back</h1>
 <p className="text-small text-gray-500 dark:text-white/50">Sign in to your VYBE account</p>
 </div>
 ) : (
 <div className="text-center">
 <button onClick={() => setStep('email')} className="flex items-center gap-2 text-gray-500 dark:text-white/50 active:text-gray-900 dark:active:text-white transition-colors mb-4 mx-auto">
 <ArrowRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
 <span className="text-small">Back</span>
 </button>
 <h1 className="text-h2 font-semibold text-gray-900 dark:text-white tracking-tight leading-none mb-1.5">Verify Email</h1>
 <p className="text-small text-gray-500 dark:text-white/50">Code sent to <span className="text-brand-primary">{email}</span></p>
 </div>
 )}
 </div>

 {/* ── Form area ── */}
 <div className="flex-1 bg-gray-50 dark:bg-background overflow-auto">
 <div className="px-6 pt-8 pb-10 max-w-[460px] mx-auto">

 {/* ════════ EMAIL STEP ════════ */}
 {step === 'email' && (
 <>
 {/* Google SSO */}
 <button
 type="button"
 onClick={() => handleSSOSignIn('google')}
 className="w-full bg-gray-50 dark:bg-white/[0.04]
 border border-gray-200 dark:border-white/[0.08]
 rounded-xl px-4 py-3.5 mb-5
 text-small text-gray-900 dark:text-white
 hover:bg-gray-100 dark:hover:bg-white/[0.06]
 transition-all duration-200 flex items-center justify-center gap-2.5"
 >
 <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
 </svg>
 Continue with Google
 </button>

 {/* Divider */}
 <div className="flex items-center gap-3 mb-5">
 <div className="flex-1 h-px bg-gray-100 dark:bg-white/[0.06]" />
 <span className="text-caption text-gray-400 dark:text-white/30 tracking-[0.08em] uppercase">or</span>
 <div className="flex-1 h-px bg-gray-100 dark:bg-white/[0.06]" />
 </div>

 <form onSubmit={handleSendCode} className="space-y-4">
 <div>
 <label htmlFor="email" className="block text-caption tracking-[0.08em] uppercase text-gray-400 dark:text-white/40 mb-1.5">
 Email Address
 </label>
 <div className="relative">
 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" strokeWidth={1.5} />
 <input
 id="email" type="email"
 value={email}
 onChange={e => setEmail(e.target.value)}
 placeholder="your@email.com"
 className="w-full bg-white dark:bg-white/[0.04]
 border border-gray-200 dark:border-white/[0.08]
 rounded-xl pl-10 pr-4 py-3.5
 text-small text-gray-900 dark:text-white
 placeholder:text-gray-400 dark:placeholder:text-white/30
 focus:outline-none focus:ring-2 focus:ring-brand-primary/20
 transition-all duration-200"
 required
 />
 </div>
 </div>

 {error && (
 <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-3 flex items-start gap-2.5">
 <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
 <p className="text-small text-red-600 dark:text-red-400">{error}</p>
 </div>
 )}

 <button
 type="submit"
 disabled={isLoading}
 className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white
 px-6 py-4 rounded-xl text-small font-semibold
 transition-all duration-200
 disabled:opacity-50 disabled:cursor-not-allowed
 flex items-center justify-center gap-2"
 >
 {isLoading ? (
 <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending Code…</>
 ) : (
 <>Continue <ArrowRight className="w-4 h-4" strokeWidth={1.5} /></>
 )}
 </button>
 </form>

 <p className="text-small text-gray-400 dark:text-white/40 text-center mt-6">
 Don't have an account?{' '}
 <Link to="/signup" className="text-brand-primary font-normal">Sign Up</Link>
 </p>
 </>
 )}

 {/* ════════ VERIFICATION STEP ════════ */}
 {step === 'verification' && (
 <>
 <div className="flex gap-3 justify-center mb-8 mt-2">
 {verificationCode.map((digit, index) => (
 <input
 key={index}
 id={`code-${index}`}
 type="text"
 maxLength={1}
 value={digit}
 onChange={e => handleCodeChange(index, e.target.value)}
 onKeyDown={e => {
 if (e.key === 'Backspace' && !digit && index > 0)
 document.getElementById(`code-${index - 1}`)?.focus();
 }}
 className="w-12 h-14 text-center text-h3 font-normal
 bg-white dark:bg-white/[0.04]
 border border-gray-200 dark:border-white/[0.08]
 rounded-xl text-gray-900 dark:text-white
 focus:outline-none focus:ring-2 focus:ring-brand-primary/30
 transition-all duration-200"
 />
 ))}
 </div>

 <div className="text-center mb-6">
 {canResend ? (
 <button onClick={handleResendCode} className="text-small text-brand-primary font-normal">
 Resend Code
 </button>
 ) : (
 <p className="text-small text-gray-400 dark:text-white/40">
 Resend in <span className="text-gray-600 dark:text-white/60">{resendTimer}s</span>
 </p>
 )}
 </div>

 {error && (
 <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-3 flex items-start gap-2.5 mb-5">
 <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
 <p className="text-small text-red-600 dark:text-red-400">{error}</p>
 </div>
 )}

 <button
 onClick={handleVerify}
 disabled={isLoading || verificationCode.some(d => !d)}
 className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white
 px-6 py-4 rounded-xl text-small font-semibold
 transition-all duration-200
 disabled:opacity-50 disabled:cursor-not-allowed
 flex items-center justify-center gap-2"
 >
 {isLoading ? (
 <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying…</>
 ) : (
 <>Verify & Continue <ArrowRight className="w-4 h-4" strokeWidth={1.5} /></>
 )}
 </button>

 <p className="text-small text-gray-400 dark:text-white/40 text-center mt-6">
 Don't have an account?{' '}
 <Link to="/signup" className="text-brand-primary font-normal">Sign Up</Link>
 </p>
 </>
 )}

 </div>
 </div>
 </div>
 );
}
