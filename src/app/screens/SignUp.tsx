import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Mail, User, AlertCircle, Phone } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { VybeLogo } from '../components/VybeLogo';

export function SignUp() {
 const navigate = useNavigate();
 const [step, setStep] = useState<'details' | 'verification'>('details');
 const [formData, setFormData] = useState({
 name: '',
 email: '',
 phone: '',
 countryCode: '+91',
 });
 const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState('');
 const [canResend, setCanResend] = useState(false);
 const [resendTimer, setResendTimer] = useState(30);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const startResendTimer = () => {
 setCanResend(false);
 setResendTimer(30);
 const interval = setInterval(() => {
 setResendTimer((prev) => {
 if (prev <= 1) { clearInterval(interval); setCanResend(true); return 0; }
 return prev - 1;
 });
 }, 1000);
 };

 const handleSendVerification = async (e: React.FormEvent) => {
 e.preventDefault();
 setError('');
 if (!formData.name.trim()) { setError('Please enter your full name'); return; }
 if (formData.name.trim().length < 2) { setError('Name must be at least 2 characters'); return; }
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(formData.email)) { setError('Please enter a valid email address'); return; }
 if (!formData.phone.trim()) { setError('Please enter your phone number'); return; }
 if (formData.phone.trim().length < 8) { setError('Please enter a valid phone number'); return; }
 setIsLoading(true);
 setTimeout(() => { setIsLoading(false); setStep('verification'); startResendTimer(); }, 1500);
 };

 const handleCodeChange = (index: number, value: string) => {
 if (value.length > 1) return;
 const newCode = [...verificationCode];
 newCode[index] = value;
 setVerificationCode(newCode);
 if (value && index < 5) {
 document.getElementById(`code-${index + 1}`)?.focus();
 }
 };

 const handleVerify = () => {
 setIsLoading(true);
 setTimeout(() => {
 const userData = {
 name: formData.name,
 email: formData.email,
 phone: formData.phone,
 countryCode: formData.countryCode,
 createdAt: new Date().toISOString(),
 signupMethod: 'email',
 };
 localStorage.setItem('vybeUser', JSON.stringify(userData));
 localStorage.setItem('vybeUserName', formData.name);
 localStorage.setItem('vybeUserPhone', formData.phone);
 localStorage.setItem('vybeUserCountryCode', formData.countryCode);
 localStorage.removeItem('vybeOnboardingComplete');
 localStorage.removeItem('vybeOnboardingData');
 setIsLoading(false);
 navigate('/onboarding');
 }, 1500);
 };

 const handleResendCode = () => {
 setVerificationCode(['', '', '', '', '', '']);
 startResendTimer();
 };

 const handleSSOSignup = (provider: 'google' | 'microsoft' | 'linkedin') => {
 const userName = `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`;
 const userData = {
 name: userName,
 email: `user@${provider}.com`,
 createdAt: new Date().toISOString(),
 signupMethod: provider,
 };
 localStorage.setItem('vybeUser', JSON.stringify(userData));
 localStorage.setItem('vybeUserName', userName);
 localStorage.removeItem('vybeOnboardingComplete');
 localStorage.removeItem('vybeOnboardingData');
 navigate('/onboarding');
 };

 return (
 <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background">

 {/* Hero */}
 <div className="relative bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06] shadow-header px-5 pt-8 pb-6 flex-shrink-0">
 <div className="absolute top-4 right-4"><ThemeToggle /></div>
 <div className="flex justify-center mb-5">
 <VybeLogo width={64} height={40} />
 </div>
 {step === 'details' ? (
 <div className="text-center">
 <p className="text-caption tracking-[0.16em] uppercase text-brand-primary mb-2">Get Started</p>
 <h1 className="text-h2 font-semibold text-gray-900 dark:text-white tracking-tight leading-none mb-1.5">Join VYBE</h1>
 <p className="text-small text-gray-500 dark:text-white/50">Create your account to start analysing properties</p>
 </div>
 ) : (
 <div className="text-center">
 <button onClick={() => setStep('details')} className="flex items-center gap-2 text-gray-500 dark:text-white/50 active:text-gray-900 dark:active:text-white transition-colors mb-4 mx-auto">
 <ArrowRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
 <span className="text-small">Back</span>
 </button>
 <h1 className="text-h2 font-semibold text-gray-900 dark:text-white tracking-tight leading-none mb-1.5">Verify Email</h1>
 <p className="text-small text-gray-500 dark:text-white/50">Code sent to <span className="text-brand-primary">{formData.email}</span></p>
 </div>
 )}
 </div>

 {/* Form */}
 <div className="flex-1 bg-gray-50 dark:bg-background overflow-auto">
 <div className="px-6 pt-8 pb-10 max-w-[460px] mx-auto">

 {step === 'details' && (
 <>
 <button type="button" onClick={() => handleSSOSignup('google')}
 className="w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-3.5 mb-5 text-small text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200 flex items-center justify-center gap-2.5">
 <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
 </svg>
 Continue with Google
 </button>
 <div className="flex items-center gap-3 mb-5">
 <div className="flex-1 h-px bg-gray-100 dark:bg-white/[0.06]" />
 <span className="text-caption text-gray-400 dark:text-white/30 tracking-[0.08em] uppercase">or</span>
 <div className="flex-1 h-px bg-gray-100 dark:bg-white/[0.06]" />
 </div>
 <form onSubmit={handleSendVerification} className="space-y-4">
 <div>
 <label htmlFor="name" className="block text-caption tracking-[0.08em] uppercase text-gray-400 dark:text-white/40 mb-1.5">Full Name</label>
 <div className="relative">
 <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" strokeWidth={1.5} />
 <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="John Doe"
 className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-small text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200" required />
 </div>
 </div>
 <div>
 <label htmlFor="email" className="block text-caption tracking-[0.08em] uppercase text-gray-400 dark:text-white/40 mb-1.5">Email Address</label>
 <div className="relative">
 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" strokeWidth={1.5} />
 <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
 className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-small text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200" required />
 </div>
 </div>
 <div>
 <label htmlFor="phone" className="block text-caption tracking-[0.08em] uppercase text-gray-400 dark:text-white/40 mb-1.5">Phone Number</label>
 <div className="flex gap-2">
 <select name="countryCode" value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
 className="bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl px-3 py-3.5 text-small text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 w-[100px]">
 <option value="+91">+91</option><option value="+1">+1</option><option value="+44">+44</option>
 <option value="+971">+971</option><option value="+65">+65</option><option value="+61">+61</option>
 <option value="+852">+852</option><option value="+86">+86</option><option value="+81">+81</option><option value="+82">+82</option>
 </select>
 <div className="relative flex-1">
 <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" strokeWidth={1.5} />
 <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="9876543210"
 className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-small text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200" required />
 </div>
 </div>
 </div>
 {error && (
 <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-3 flex items-start gap-2.5">
 <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
 <p className="text-small text-red-600 dark:text-red-400">{error}</p>
 </div>
 )}
 <p className="text-caption text-gray-400 dark:text-white/30 text-center leading-relaxed">
 By continuing you agree to our <span className="text-brand-primary">Terms</span> and <span className="text-brand-primary">Privacy Policy</span>
 </p>
 <button type="submit" disabled={isLoading}
 className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-4 rounded-xl text-small font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
 {isLoading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending Code&hellip;</>) : (<>Continue<ArrowRight className="w-4 h-4" strokeWidth={1.5} /></>)}
 </button>
 </form>
 <p className="text-small text-gray-400 dark:text-white/40 text-center mt-6">
 Already have an account? <Link to="/signin" className="text-brand-primary font-normal">Sign In</Link>
 </p>
 </>
 )}

 {step === 'verification' && (
 <>
 <div className="flex gap-3 justify-center mb-8 mt-2">
 {verificationCode.map((digit, index) => (
 <input key={index} id={`code-${index}`} type="text" inputMode="numeric" maxLength={1} value={digit}
 onChange={(e) => handleCodeChange(index, e.target.value)}
 onKeyDown={(e) => { if (e.key === 'Backspace' && digit === '' && index > 0) document.getElementById(`code-${index - 1}`)?.focus(); }}
 className="w-12 h-14 text-center text-h3 font-normal bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all duration-200" />
 ))}
 </div>
 <div className="text-center mb-6">
 {canResend ? (
 <button onClick={handleResendCode} className="text-small text-brand-primary font-normal">Resend Code</button>
 ) : (
 <p className="text-small text-gray-400 dark:text-white/40">Resend in <span className="text-gray-600 dark:text-white/60">{resendTimer}s</span></p>
 )}
 </div>
 {error && (
 <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-3 flex items-start gap-2.5 mb-5">
 <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
 <p className="text-small text-red-600 dark:text-red-400">{error}</p>
 </div>
 )}
 <button onClick={handleVerify} disabled={isLoading || verificationCode.some(d => d === '')}
 className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-4 rounded-xl text-small font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
 {isLoading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying&hellip;</>) : (<>Verify & Continue<ArrowRight className="w-4 h-4" strokeWidth={1.5} /></>)}
 </button>
 <p className="text-small text-gray-400 dark:text-white/40 text-center mt-6">
 Already have an account? <Link to="/signin" className="text-brand-primary font-normal">Sign In</Link>
 </p>
 </>
 )}

 </div>
 </div>
 </div>
 );
}