import { useState, useEffect } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { RMAccess } from '../components/RMAccess';
import { Link } from 'react-router';
import {
 User,
 Mail,
 Building2,
 Bell,
 Lock,
 Globe,
 Shield,
 CheckCircle2,
 ArrowRight,
 ChevronRight,
 ChevronLeft,
 Phone,
 Loader2,
 FileText,
 Calendar,
 Briefcase,
 Layers,
 Ticket,
 HeadphonesIcon,
 Share2,
 Copy,
 LogOut,
 Scale,
 ShieldCheck
} from 'lucide-react';

export function Settings() {
 const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'order-history' | 'help-support' | 'terms' | 'privacy'>('profile');
 const [showSaved, setShowSaved] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const [imageUploadProgress, setImageUploadProgress] = useState(0);
 const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
 const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
 const [showShareMenu, setShowShareMenu] = useState(false);
 const [copySuccess, setCopySuccess] = useState(false);
 const [tempProfileData, setTempProfileData] = useState({
 firstName: '',
 lastName: '',
 email: '',
 phone: '',
 primaryRole: '',
 portfolioSize: '',
 referralCode: '',
 country: '',
 });

 const [profileData, setProfileData] = useState({
 firstName: 'Alexander',
 lastName: 'Sterling',
 email: 'alexander.sterling@example.com',
 phone: '+91 98765 43210',
 primaryRole: 'both',
 portfolioSize: '6-20',
 referralCode: 'VYBEALEX',
 country: 'IN',
 avatarUrl: '', // Add avatarUrl to store the profile picture URL
 documentType: null as 'aadhaar' | 'pan' | null,
 documentNumber: '',
 documentVerified: false,
 });

 const [notificationSettings, setNotificationSettings] = useState({
 emailReports: true,
 smsAlerts: true,
 partnerUpdates: true,
 marketInsights: false,
 weeklyDigest: true,
 });

 // Load data from localStorage on mount
 useEffect(() => {
 const savedData = localStorage.getItem('vybeOnboardingData');
 if (savedData) {
 try {
 const parsed = JSON.parse(savedData);
 setProfileData(prev => ({
 ...prev,
 firstName: parsed.firstName || prev.firstName,
 lastName: parsed.lastName || prev.lastName,
 email: parsed.email || prev.email,
 phone: parsed.phone || prev.phone,
 primaryRole: parsed.primaryRole || prev.primaryRole,
 portfolioSize: parsed.portfolioSize || prev.portfolioSize,
 referralCode: parsed.referralCode || prev.referralCode,
 country: parsed.country || prev.country,
 documentType: parsed.documentType || prev.documentType,
 documentNumber: parsed.documentNumber || prev.documentNumber,
 documentVerified: parsed.documentVerified || prev.documentVerified,
 }));
 } catch (e) {
 console.error('Failed to parse onboarding data:', e);
 }
 }
 }, []);

 // Validation functions
 const validateEmail = (email: string) => {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(email);
 };

 const validatePhone = (phone: string) => {
 const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
 return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
 };

 const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
 const file = event.target.files?.[0];
 if (file) {
 // Check file size (max 5MB)
 if (file.size > 5 * 1024 * 1024) {
 setValidationErrors({ ...validationErrors, avatar: 'Image size must be less than 5MB' });
 return;
 }

 // Check file type
 if (!file.type.startsWith('image/')) {
 setValidationErrors({ ...validationErrors, avatar: 'Please upload a valid image file' });
 return;
 }

 // Simulate upload progress
 setImageUploadProgress(0);
 const interval = setInterval(() => {
 setImageUploadProgress((prev) => {
 if (prev >= 100) {
 clearInterval(interval);
 return 100;
 }
 return prev + 10;
 });
 }, 100);

 // Create preview URL
 const reader = new FileReader();
 reader.onloadend = () => {
 setTimeout(() => {
 setProfileData({ ...profileData, avatarUrl: reader.result as string });
 setImageUploadProgress(0);
 }, 1200);
 };
 reader.readAsDataURL(file);
 }
 };

 const handleSaveProfile = () => {
 // Validate all fields
 const errors: Record<string, string> = {};
 
 if (!tempProfileData.firstName.trim()) {
 errors.firstName = 'First name is required';
 }
 
 if (!tempProfileData.lastName.trim()) {
 errors.lastName = 'Last name is required';
 }
 
 if (!validateEmail(tempProfileData.email)) {
 errors.email = 'Please enter a valid email address';
 }
 
 if (tempProfileData.phone && !validatePhone(tempProfileData.phone)) {
 errors.phone = 'Please enter a valid phone number';
 }

 if (Object.keys(errors).length > 0) {
 setValidationErrors(errors);
 return;
 }

 setIsSaving(true);
 
 // Simulate API call
 setTimeout(() => {
 setProfileData({
 ...profileData,
 firstName: tempProfileData.firstName,
 lastName: tempProfileData.lastName,
 email: tempProfileData.email,
 phone: tempProfileData.phone,
 primaryRole: tempProfileData.primaryRole,
 portfolioSize: tempProfileData.portfolioSize,
 referralCode: tempProfileData.referralCode,
 country: tempProfileData.country,
 });
 
 // Update localStorage
 localStorage.setItem('vybeOnboardingData', JSON.stringify({
 firstName: tempProfileData.firstName,
 lastName: tempProfileData.lastName,
 email: tempProfileData.email,
 phone: tempProfileData.phone,
 primaryRole: tempProfileData.primaryRole,
 portfolioSize: tempProfileData.portfolioSize,
 referralCode: tempProfileData.referralCode,
 country: tempProfileData.country,
 }));
 
 setIsEditingPersonalInfo(false);
 setIsSaving(false);
 setShowSaved(true);
 setTimeout(() => setShowSaved(false), 3000);
 }, 1000);
 };

 const getRoleLabel = (role: string) => {
 switch (role) {
 case 'land-owner':
 return 'Land Owner';
 case 'strategic-investor':
 return 'Strategic Investor';
 case 'both':
 return 'Dual Mandate';
 default:
 return 'Not set';
 }
 };

 const getPortfolioSizeLabel = (size: string) => {
 switch (size) {
 case '1':
 return '1 Property';
 case '2-5':
 return '2-5 Properties';
 case '6-20':
 return '6-20 Properties';
 case '20+':
 return '20+ Properties';
 default:
 return 'Not set';
 }
 };

 // Copy to clipboard function with fallback
 const copyToClipboard = (text: string) => {
 try {
 // Try modern clipboard API first if not in an iframe
 const isIframe = window !== window.parent;
 if (!isIframe && navigator.clipboard && window.isSecureContext) {
 navigator.clipboard.writeText(text).then(() => {
 setCopySuccess(true);
 setTimeout(() => setCopySuccess(false), 2000);
 }).catch(() => {
 // Fallback to older method silently
 fallbackCopyTextToClipboard(text);
 });
 } else {
 // Use fallback
 fallbackCopyTextToClipboard(text);
 }
 } catch (err) {
 fallbackCopyTextToClipboard(text);
 }
 };

 // Fallback copy method
 const fallbackCopyTextToClipboard = (text: string) => {
 const textArea = document.createElement('textarea');
 textArea.value = text;
 textArea.style.position = 'fixed';
 textArea.style.left = '-999999px';
 textArea.style.top = '-999999px';
 document.body.appendChild(textArea);
 textArea.focus();
 textArea.select();
 
 try {
 const successful = document.execCommand('copy');
 if (successful) {
 setCopySuccess(true);
 setTimeout(() => setCopySuccess(false), 2000);
 }
 } catch (err) {
 console.error('Failed to copy text: ', err);
 }
 
 document.body.removeChild(textArea);
 };

 const [mobileSection, setMobileSection] = useState<string | null>(null);

 const tabs = [
 { id: 'profile' as const, label: 'Profile', icon: User },
 { id: 'notifications' as const, label: 'Notifications', icon: Bell },
 { id: 'order-history' as const, label: 'Order History', icon: FileText },
 { id: 'help-support' as const, label: 'Help', icon: HeadphonesIcon },
 { id: 'terms' as const, label: 'Terms', icon: Scale },
 { id: 'privacy' as const, label: 'Privacy', icon: ShieldCheck },
 ];

 const menuGroups = [
 {
 title: 'Account',
 items: [
 { id: 'profile', label: 'My Profile', icon: User, desc: 'Edit personal info' },
 { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts & preferences' },
 ]
 },
 {
 title: 'Activity',
 items: [
 { id: 'order-history', label: 'Order History', icon: FileText, desc: 'Past service orders' },
 ]
 },
 {
 title: 'Support',
 items: [
 { id: 'help-support', label: 'Help & Support', icon: HeadphonesIcon,desc: 'Get assistance' },
 { id: 'terms', label: 'Terms of Service',icon: Scale, desc: 'Legal terms' },
 { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck, desc: 'Your data rights' },
 ]
 },
 ];

 return (
 <div className="min-h-screen bg-[#F8FAFC] dark:bg-background transition-colors duration-300">


 {/* ─────────────────────────────────────────
 MOBILE LAYOUT (< md)
 ───────────────────────────────────────── */}
 <div className="md:hidden">
 {mobileSection === null ? (
 /* ── Menu Home ── */
 <>
 {/* Navy Hero */}
 <div className="bg-brand-navy dark:bg-background px-4 pt-5 pb-6 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
 <div className="absolute bottom-0 left-8 w-20 h-20 rounded-full bg-white/5 blur-2xl pointer-events-none" />

 {/* Profile Card */}
 <div className="flex items-center gap-4 relative">
 {/* Avatar */}
 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold/40 flex-shrink-0">
 {profileData.avatarUrl ? (
 <img src={profileData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full bg-gradient-to-br from-brand-navy-hover to-brand-navy flex items-center justify-center">
 <span className="text-2xl font-normal text-brand-gold">
 {profileData.firstName.charAt(0).toUpperCase()}
 </span>
 </div>
 )}
 </div>

 {/* Name + meta */}
 <div className="flex-1 min-w-0">
 <h2 className="text-lg font-normal text-white truncate">
 {profileData.firstName} {profileData.lastName}
 </h2>
 <p className="text-xs text-white/50 mt-0.5 truncate">{profileData.email}</p>
 <div className="flex items-center gap-1.5 mt-1.5">
 <CheckCircle2 className="w-3 h-3 text-brand-gold" />
 <span className="text-[10px] font-normal uppercase tracking-[0.08em] text-brand-gold">Verified Member</span>
 </div>
 </div>

 {/* Edit button */}
 <button
 onClick={() => setMobileSection('profile')}
 className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/[0.1] border border-white/[0.12]
 flex items-center justify-center active:scale-95 transition-transform"
 >
 <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
 </svg>
 </button>
 </div>
 </div>

 {/* RM mini card */}
 <div className="mx-4 -mt-3 mb-4">
 <div className="bg-white dark:bg-card rounded-2xl p-3.5
 border border-[#F1F5F9] dark:border-white/[0.07]
 shadow-[0_4px_16px_rgba(var(--brand-navy-rgb),0.08)]
 flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-navy to-brand-navy-hover flex items-center justify-center flex-shrink-0">
 <span className="text-sm font-normal text-brand-gold">PS</span>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-[#0F172A] dark:text-white truncate">Priya Sharma</p>
 <p className="text-xs text-[#94A3B8] dark:text-white/40">Your Relationship Manager</p>
 </div>
 <RMAccess />
 </div>
 </div>

 {/* Menu Groups */}
 <div className="px-4 space-y-4 pb-4">
 {menuGroups.map((group) => (
 <div key={group.title}>
 <p className="text-xs font-normal uppercase tracking-[0.12em] text-[#94A3B8] dark:text-white/40 mb-2 px-1">
 {group.title}
 </p>
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden
 border border-[#F1F5F9] dark:border-white/[0.07]
 shadow-[0_2px_12px_rgba(var(--brand-navy-rgb),0.05)]">
 {group.items.map((item, idx) => {
 const Icon = item.icon;
 return (
 <button
 key={item.id}
 onClick={() => setMobileSection(item.id)}
 className={`w-full flex items-center gap-3 px-4 py-3.5 text-left
 active:bg-[#F8FAFC] dark:active:bg-white/5 transition-colors
 ${idx < group.items.length - 1 ? 'border-b border-[#F1F5F9] dark:border-white/[0.06]' : ''}`}
 >
 <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0">
 <Icon className="w-4.5 h-4.5 text-brand-navy dark:text-white/70 w-[18px] h-[18px]" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-[#0F172A] dark:text-white">{item.label}</p>
 <p className="text-xs text-[#94A3B8] dark:text-white/40">{item.desc}</p>
 </div>
 <ChevronRight className="w-4 h-4 text-brand-gold flex-shrink-0" />
 </button>
 );
 })}
 </div>
 </div>
 ))}

 {/* Logout */}
 <button
 onClick={() => { window.location.href = '/'; }}
 className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl
 bg-red-50 dark:bg-red-500/10
 border border-red-100 dark:border-red-500/20
 text-red-600 dark:text-red-400
 text-sm font-normal
 active:scale-[0.98] transition-transform"
 >
 <LogOut className="w-4 h-4" />
 Log Out
 </button>
 </div>
 </>
 ) : (
 /* ── Section Detail View ── */
 <>
 {/* Back header */}
 <div className="bg-brand-navy dark:bg-background px-4 pt-4 pb-4 flex items-center gap-3">
 <button
 onClick={() => setMobileSection(null)}
 className="w-9 h-9 rounded-xl bg-white/[0.1] border border-white/[0.12]
 flex items-center justify-center active:scale-95 transition-transform"
 >
 <ChevronLeft className="w-5 h-5 text-white" />
 </button>
 <h2 className="text-base font-normal text-white">
 {menuGroups.flatMap(g => g.items).find(i => i.id === mobileSection)?.label ?? mobileSection}
 </h2>
 </div>

 {/* Section content */}
 <div className="px-4 py-4">
 {/* Inject the appropriate tab content — wrap in a white card */}
 <div className="bg-white dark:bg-card rounded-2xl border border-[#F1F5F9] dark:border-white/[0.07]
 shadow-[0_2px_12px_rgba(var(--brand-navy-rgb),0.06)] p-4">
 {/* Success banner */}
 {showSaved && (
 <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
 <span className="text-sm text-emerald-700 dark:text-emerald-400 font-normal">Saved successfully</span>
 </div>
 )}
 {/* Render same content as desktop tabs */}
 {(() => {
 const sec = mobileSection as typeof activeTab;
 if (sec !== activeTab) {
 // Sync activeTab for shared content rendering below
 }
 return null;
 })()}
 {/* We re-use the exact same content blocks by temporarily switching activeTab */}
 {mobileSection === 'profile' && renderProfileTab()}
 {mobileSection === 'notifications' && renderNotificationsTab()}
 {mobileSection === 'order-history' && renderOrderHistoryTab()}
 {mobileSection === 'help-support' && renderHelpTab()}
 {mobileSection === 'terms' && renderTermsTab()}
 {mobileSection === 'privacy' && renderPrivacyTab()}
 </div>
 </div>
 </>
 )}
 </div>

 {/* ─────────────────────────────────────────
 DESKTOP LAYOUT (md+)
 ───────────────────────────────────────── */}
 <div className="hidden md:block">

 {/* Header - Hidden on inner tabs for mobile/tablet */}
 <div className={`border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-card ${
 activeTab === 'profile' ? '' : 'hidden lg:block'
 }`}>
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-gold mb-2">
 Account
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">
 My Profile
 </h1>
 <p className="text-small text-[#475569] dark:text-white/50 mt-1">
 Manage your profile and account preferences
 </p>
 </div>
 <div className="flex items-center gap-3">
 <NotificationDropdown />
 <ThemeToggle />
 </div>
 </div>
 </div>
 </div>

 {/* Settings Content */}
 <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8 lg:py-10">
 {/* Tab Bar - desktop/tablet only */}
 <div className="lg:hidden mb-6">
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-xl p-1 overflow-x-auto">
 <div className="flex gap-1 min-w-max">
 {tabs.map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg transition-all duration-300 min-w-[80px] ${
 activeTab === tab.id
 ? 'bg-brand-primary text-white'
 : 'text-[#475569] dark:text-white/50 active:bg-brand-navy/5 dark:active:bg-white/5'
 }`}
 >
 <tab.icon className="w-5 h-5 flex-shrink-0" strokeWidth={activeTab === tab.id ? 2 : 1.5} />
 <span className="text-[10px] tracking-tight whitespace-nowrap">{tab.label}</span>
 </button>
 ))}
 </div>
 </div>
 </div>

 <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
 {/* Desktop Sidebar Tabs */}
 <div className="hidden lg:block w-64 flex-shrink-0">
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-xl p-2">
 {tabs.map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`w-full flex items-center gap-3 px-5 py-2.5 rounded-xl text-left transition-all duration-300 ${
 activeTab === tab.id
 ? 'bg-brand-navy/[0.06] dark:bg-white/[0.06] text-[#0F172A] dark:text-white'
 : 'text-[#475569] dark:text-white/50 hover:bg-brand-navy/[0.02] dark:hover:bg-white/[0.02] hover:text-[#0F172A]/80 dark:hover:text-white/80'
 }`}
 >
 <tab.icon className="w-4 h-4" />
 <span className="text-small">{tab.label}</span>
 </button>
 ))}

 {/* Divider */}
 <div className="my-2 border-t border-[#E2E8F0] dark:border-white/[0.06]" />

 {/* Logout Button */}
 <button
 onClick={() => {
 window.location.href = '/';
 }}
 className="w-full flex items-center gap-3 px-5 py-2.5 rounded-xl text-left transition-all duration-300 text-[#0F172A] dark:text-white hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300"
 >
 <LogOut className="w-4 h-4" />
 <span className="text-small">Logout</span>
 </button>
 </div>
 </div>

 {/* Main Content Area */}
 <div className="flex-1">
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-xl card-padding">
 {/* Success Message */}
 {showSaved && (
 <div className="mb-8 p-5 bg-brand-gold/10 border border-brand-gold/20 rounded-xl flex items-center gap-3 backdrop-blur-sm">
 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
 <span className="text-small text-brand-gold dark:text-brand-gold font-normal">Settings saved successfully</span>
 </div>
 )}

 {/* Tab content via render helpers */}
 {activeTab === 'profile' && renderProfileTab()}
 {activeTab === 'notifications' && renderNotificationsTab()}
 {activeTab === 'order-history' && renderOrderHistoryTab()}
 {activeTab === 'help-support' && renderHelpTab()}
 {activeTab === 'terms' && renderTermsTab()}
 {activeTab === 'privacy' && renderPrivacyTab()}
 </div>
 </div>
 </div>
 </div>

 </div>{/* end md:block desktop wrapper */}
 </div>
 );

 // ── render helpers reused by both mobile detail view and desktop tabs ──

 function renderProfileTab() {
 return (
 <div>
 {/* Profile Header - Compact */}
 <div className="mb-6 p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-[#E2E8F0] dark:border-white/[0.06]">
 <div className="flex items-center gap-4">
 <div className="relative group flex-shrink-0">
 <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold/30">
 {profileData.avatarUrl ? (
 <img src={profileData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-navy-hover flex items-center justify-center">
 <span className="text-h1 font-normal text-white">{profileData.firstName.charAt(0).toUpperCase() || 'U'}</span>
 </div>
 )}
 {imageUploadProgress > 0 && imageUploadProgress < 100 && (
 <div className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm flex items-center justify-center">
 <Loader2 className="w-6 h-6 text-white animate-spin" />
 </div>
 )}
 </div>
 <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand-primary rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
 <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
 <svg className="w-3.5 h-3.5 text-white dark:text-brand-navy pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
 </label>
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-1 truncate">{profileData.firstName} {profileData.lastName}</h3>
 <p className="text-small text-[#8E8E93] mb-1">{profileData.country === 'IN' ? 'India' : profileData.country}</p>
 <p className="text-caption text-[#94A3B8] dark:text-white/30 tracking-wider">ID: VYBE-{profileData.firstName.substring(0, 2).toUpperCase()}2024</p>
 </div>
 </div>
 </div>

 {/* Personal Information */}
 <div className="mb-6 p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-[#E2E8F0] dark:border-white/[0.06]">
 <div className="flex items-center justify-between mb-5">
 <h2 className="text-base font-normal text-[#0F172A] dark:text-white">Personal Information</h2>
 {!isEditingPersonalInfo ? (
 <button
 onClick={() => { setIsEditingPersonalInfo(true); setTempProfileData({ firstName: profileData.firstName, lastName: profileData.lastName, email: profileData.email, phone: profileData.phone, primaryRole: profileData.primaryRole, portfolioSize: profileData.portfolioSize, referralCode: profileData.referralCode, country: profileData.country }); }}
 className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl text-small font-normal flex items-center gap-2 active:scale-95 transition-transform"
 >
 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
 Edit
 </button>
 ) : (
 <div className="flex gap-2">
 <button onClick={handleSaveProfile} disabled={isSaving} className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl text-small font-normal flex items-center gap-1.5 disabled:opacity-50 active:scale-95 transition-transform">
 {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
 {isSaving ? 'Saving…' : 'Save'}
 </button>
 <button onClick={() => { setIsEditingPersonalInfo(false); setValidationErrors({}); }} className="px-4 py-2 bg-brand-navy/5 dark:bg-white/5 text-[#0F172A] dark:text-white rounded-xl text-small font-normal active:scale-95 transition-transform">Cancel</button>
 </div>
 )}
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 { key: 'firstName', label: 'First Name', type: 'text' },
 { key: 'lastName', label: 'Last Name', type: 'text' },
 { key: 'email', label: 'Email', type: 'email' },
 { key: 'phone', label: 'Phone', type: 'tel' },
 ].map(({ key, label, type }) => (
 <div key={key}>
 <p className="text-caption text-[#8E8E93] mb-1.5">{label}</p>
 {isEditingPersonalInfo ? (
 <div>
 <input
 type={type}
 value={tempProfileData[key as keyof typeof tempProfileData]}
 onChange={(e) => setTempProfileData({ ...tempProfileData, [key]: e.target.value })}
 className="w-full bg-white dark:bg-brand-navy/10 border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl px-3 py-2.5 text-small text-[#0F172A] dark:text-white focus:outline-none focus:border-brand-gold/40"
 />
 {validationErrors[key] && <p className="text-caption text-red-500 mt-1">{validationErrors[key]}</p>}
 </div>
 ) : (
 <p className="text-small font-normal text-[#0F172A] dark:text-white">{(profileData as any)[key] || 'Not set'}</p>
 )}
 </div>
 ))}

 <div>
 <p className="text-caption text-[#8E8E93] mb-1.5">Operating Role</p>
 {isEditingPersonalInfo ? (
 <select value={tempProfileData.primaryRole} onChange={(e) => setTempProfileData({ ...tempProfileData, primaryRole: e.target.value })} className="w-full bg-white dark:bg-brand-navy/10 border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl px-3 py-2.5 text-small text-[#0F172A] dark:text-white focus:outline-none">
 <option value="land-owner">Land Owner</option>
 <option value="strategic-investor">Strategic Investor</option>
 <option value="both">Dual Mandate</option>
 </select>
 ) : (
 <p className="text-small font-normal text-[#0F172A] dark:text-white">{getRoleLabel(profileData.primaryRole)}</p>
 )}
 </div>

 <div>
 <p className="text-caption text-[#8E8E93] mb-1.5">Portfolio Size</p>
 {isEditingPersonalInfo ? (
 <select value={tempProfileData.portfolioSize} onChange={(e) => setTempProfileData({ ...tempProfileData, portfolioSize: e.target.value })} className="w-full bg-white dark:bg-brand-navy/10 border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl px-3 py-2.5 text-small text-[#0F172A] dark:text-white focus:outline-none">
 <option value="1">1 Property</option>
 <option value="2-5">2-5 Properties</option>
 <option value="6-20">6-20 Properties</option>
 <option value="20+">20+ Properties</option>
 </select>
 ) : (
 <p className="text-small font-normal text-[#0F172A] dark:text-white">{getPortfolioSizeLabel(profileData.portfolioSize)}</p>
 )}
 </div>
 </div>
 </div>

 {/* Relationship Manager */}
 <div className="mb-6 p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-[#E2E8F0] dark:border-white/[0.06]">
 <h2 className="text-base font-normal text-[#0F172A] dark:text-white mb-4">Relationship Manager</h2>
 <div className="flex items-center gap-3 mb-4">
 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-navy to-brand-navy-hover flex items-center justify-center flex-shrink-0 border-2 border-brand-gold/30">
 <span className="text-sm font-normal text-brand-gold">PS</span>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-small font-normal text-[#0F172A] dark:text-white">Priya Sharma</p>
 <p className="text-caption text-[#94A3B8] dark:text-white/40">Relationship Manager</p>
 <p className="text-caption text-[#94A3B8] dark:text-white/40 mt-0.5">Available Mon–Sat, 9am–7pm IST</p>
 </div>
 <RMAccess />
 </div>
 </div>

 {/* Identity Verification */}
 <div className="mb-6 p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-[#E2E8F0] dark:border-white/[0.06]">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-base font-normal text-[#0F172A] dark:text-white">Identity Verification</h2>
 {profileData.documentVerified ? (
 <span className="flex items-center gap-1.5 text-[10px] font-normal uppercase tracking-[0.08em] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-full">
 <CheckCircle2 className="w-3 h-3" />
 Verified
 </span>
 ) : (
 <span className="text-[10px] font-normal uppercase tracking-[0.08em] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-2.5 py-1 rounded-full">
 Pending
 </span>
 )}
 </div>

 {profileData.documentType ? (
 <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-white/[0.03] border border-[#F1F5F9] dark:border-white/[0.06]">
 <div className="w-9 h-9 rounded-xl bg-brand-navy/[0.07] dark:bg-white/[0.07] flex items-center justify-center flex-shrink-0">
 <FileText className="w-4 h-4 text-brand-navy dark:text-white/70" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-[10px] font-normal tracking-[0.08em] uppercase text-[#94A3B8] dark:text-white/40 mb-0.5">
 {profileData.documentType === 'aadhaar' ? 'Aadhaar Card' : 'PAN Card'}
 </p>
 <p className="text-small font-normal text-[#0F172A] dark:text-white tracking-wider">
 {profileData.documentNumber
 ? profileData.documentType === 'aadhaar'
 ? `XXXX XXXX ${profileData.documentNumber.slice(-4)}`
 : `XXXXX${profileData.documentNumber.slice(-4)}`
 : 'Not provided'}
 </p>
 </div>
 {profileData.documentVerified && (
 <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
 )}
 </div>
 ) : (
 <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-500/[0.05] border border-amber-200 dark:border-amber-500/20">
 <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
 <div>
 <p className="text-small font-normal text-[#0F172A] dark:text-white mb-0.5">Verification required</p>
 <p className="text-caption text-[#64748B] dark:text-white/50">Complete KYC to unlock all platform features</p>
 </div>
 </div>
 )}
 </div>

 {/* Refer & Earn */}
 <div className="mb-6 p-4 rounded-xl bg-white/50 dark:bg-white/[0.02] border border-[#E2E8F0] dark:border-white/[0.06]">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-lg">🎁</span>
 <h3 className="text-base font-normal text-[#0F172A] dark:text-white">Refer & Earn</h3>
 </div>
 <div className="flex items-center justify-between p-3 rounded-xl bg-brand-gold/10 border border-brand-gold/20 mb-3">
 <span className="text-lg font-normal text-brand-gold tracking-wider tracking-wider">
 {profileData.referralCode || `VYBE${profileData.firstName.substring(0, 4).toUpperCase()}`}
 </span>
 <button onClick={() => copyToClipboard(profileData.referralCode)} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-navy text-white rounded-xl text-xs font-normal active:scale-95 transition-transform">
 <Copy className="w-3 h-3" />
 {copySuccess ? 'Copied!' : 'Copy'}
 </button>
 </div>
 <p className="text-xs text-[#94A3B8] dark:text-white/40 text-center">12 referrals · Invite friends to VYBE</p>
 </div>
 </div>
 );
 }

 function renderNotificationsTab() {
 return (
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-1">Notifications</h2>
 <p className="text-small text-[#475569] dark:text-white/50 mb-5">Manage how you receive updates</p>
 <div className="space-y-3">
 {[
 { key: 'emailReports', label: 'Email Reports', desc: 'Property analysis reports via email' },
 { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Important updates via text' },
 { key: 'partnerUpdates', label: 'Partner Updates', desc: 'Partner milestones & activities' },
 { key: 'marketInsights', label: 'Market Insights', desc: 'Weekly market trends' },
 { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Portfolio performance summary' },
 ].map((item) => (
 <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-brand-navy/[0.02] dark:bg-white/[0.02] border border-[#E2E8F0] dark:border-white/[0.06]">
 <div className="flex-1 mr-4">
 <p className="text-small font-normal text-[#0F172A] dark:text-white mb-0.5">{item.label}</p>
 <p className="text-caption text-[#64748B] dark:text-white/40">{item.desc}</p>
 </div>
 <label className="relative inline-block w-12 h-6 flex-shrink-0">
 <input type="checkbox" checked={notificationSettings[item.key as keyof typeof notificationSettings]} onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })} className="sr-only peer" />
 <div className="w-12 h-6 bg-brand-navy/10 dark:bg-white/10 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
 </label>
 </div>
 ))}
 </div>
 <button onClick={() => { setShowSaved(true); setTimeout(() => setShowSaved(false), 3000); }} className="mt-5 w-full py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-2xl text-small font-normal active:scale-[0.98] transition-transform">
 Save Preferences
 </button>
 </div>
 );
 }

 function renderOrderHistoryTab() {
 const orders = [
 { id: 'ORD-2026-045', service: 'Property Valuation Report', property: 'Sterling Heights', date: 'Mar 12, 2026', status: 'Completed', color: 'emerald' },
 { id: 'ORD-2026-044', service: 'Legal Document Review', property: 'Sterling Heights', date: 'Mar 08, 2026', status: 'Completed', color: 'emerald' },
 { id: 'ORD-2026-043', service: 'Property Tax Consultation', property: 'Golden Meadows', date: 'Feb 28, 2026', status: 'Completed', color: 'emerald' },
 { id: 'ORD-2026-042', service: 'Site Inspection Service', property: 'Sterling Heights', date: 'Feb 22, 2026', status: 'Processing', color: 'blue' },
 { id: 'ORD-2026-041', service: 'Architecture Consultation', property: 'Riverside Enclave',date: 'Feb 15, 2026', status: 'Completed', color: 'emerald' },
 { id: 'ORD-2026-040', service: 'Property Insurance Setup', property: 'Sterling Heights', date: 'Feb 10, 2026', status: 'Completed', color: 'emerald' },
 { id: 'ORD-2026-039', service: 'Market Analysis Report', property: 'Emerald Gardens', date: 'Jan 28, 2026', status: 'Pending', color: 'yellow' },
 { id: 'ORD-2026-038', service: 'Interior Design Consultation', property: 'Golden Meadows', date: 'Jan 20, 2026', status: 'Completed', color: 'emerald' },
 ];
 return (
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-1">Order History</h2>
 <p className="text-small text-[#475569] dark:text-white/50 mb-5">All service orders and transactions</p>
 <div className="space-y-2.5">
 {orders.map((o) => (
 <div key={o.id} className="p-3.5 rounded-xl border border-[#F1F5F9] dark:border-white/[0.07] bg-[#F8FAFC] dark:bg-white/[0.02]">
 <div className="flex items-start justify-between gap-2 mb-1.5">
 <p className="text-sm font-normal text-[#0F172A] dark:text-white leading-tight flex-1">{o.service}</p>
 <span className={`flex-shrink-0 text-[10px] font-normal uppercase tracking-[0.06em] px-2 py-0.5 rounded-lg ${
 o.color === 'emerald' ? 'bg-brand-gold/10 text-brand-gold' :
 o.color === 'blue' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' :
 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
 }`}>{o.status}</span>
 </div>
 <div className="flex items-center gap-3 text-xs text-[#94A3B8] dark:text-white/40">
 <span className="tracking-wider">{o.id}</span>
 <span>·</span>
 <span>{o.property}</span>
 <span>·</span>
 <span>{o.date}</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 function renderHelpTab() {
 return (
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-1">Help & Support</h2>
 <p className="text-small text-[#475569] dark:text-white/50 mb-5">We're here to assist you</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
 <div className="p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
 <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center mb-3">
 <HeadphonesIcon className="w-5 h-5 text-brand-gold" />
 </div>
 <p className="text-small font-normal text-[#0F172A] dark:text-white mb-1">Contact Support</p>
 <a href="mailto:support@vybe.app" className="text-caption text-brand-gold flex items-center gap-1">support@vybe.app <ArrowRight className="w-3 h-3" /></a>
 </div>
 <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
 <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
 <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
 </div>
 <p className="text-small font-normal text-[#0F172A] dark:text-white mb-1">Documentation</p>
 <button className="text-caption text-blue-600 dark:text-blue-400 flex items-center gap-1">View Docs <ArrowRight className="w-3 h-3" /></button>
 </div>
 </div>
 <div className="space-y-3">
 {[
 { q: 'How do I upload property documents?', a: 'Navigate to Document Vault, click "Upload Document", select your property, and upload the required files.' },
 { q: 'What is the HABU Report?', a: 'HABU provides high-value analysis and best-use insights for optimal property utilization.' },
 { q: 'How do I request a service?', a: 'Go to Services Catalog, select the service, choose your property, and submit the request.' },
 { q: 'How can I track my case progress?', a: 'Visit Case Management to view all your active and closed cases with real-time updates.' },
 ].map((faq, i) => (
 <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/[0.02] border border-[#F1F5F9] dark:border-white/[0.06]">
 <p className="text-sm font-normal text-[#0F172A] dark:text-white mb-1.5">{faq.q}</p>
 <p className="text-xs text-[#64748B] dark:text-white/50 leading-relaxed">{faq.a}</p>
 </div>
 ))}
 </div>
 </div>
 );
 }

 function renderTermsTab() {
 const sections = [
 { title: '1. Acceptance of Terms', body: "By accessing and using VYBE's intelligence-first capital platform, you agree to be bound by these Terms and Conditions." },
 { title: '2. Service Description', body: 'VYBE provides real estate intelligence, property management, and advisory services to UHNIs and institutional investors.' },
 { title: '3. User Responsibilities', body: 'Users are responsible for maintaining confidentiality of credentials, ensuring accuracy of submitted information, and complying with applicable laws.' },
 { title: '4. Intellectual Property', body: 'All content on the VYBE platform is owned by VYBE and protected by international copyright and trademark laws.' },
 { title: '5. Limitation of Liability', body: 'VYBE shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the service.' },
 ];
 return (
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-1">Terms of Service</h2>
 <p className="text-caption text-[#94A3B8] dark:text-white/40 mb-5">Last updated: April 15, 2026</p>
 <div className="space-y-3">
 {sections.map((s, i) => (
 <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/[0.02] border border-[#F1F5F9] dark:border-white/[0.06]">
 <p className="text-sm font-normal text-[#0F172A] dark:text-white mb-1.5">{s.title}</p>
 <p className="text-xs text-[#64748B] dark:text-white/50 leading-relaxed">{s.body}</p>
 </div>
 ))}
 <div className="p-3 bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl">
 <p className="text-caption text-[#64748B] dark:text-white/50">Full terms available at legal@vybe.app</p>
 </div>
 </div>
 </div>
 );
 }

 function renderPrivacyTab() {
 const sections = [
 { title: '1. Information We Collect', body: 'We collect personal identification (name, email, phone), property information, financial data, and communication preferences.' },
 { title: '2. How We Use Your Information', body: 'We use your data to provide services, process property analysis requests, communicate about your account, and ensure platform security.' },
 { title: '3. Data Security', body: 'Bank-grade encryption, secure data centers, regular audits, and access controls protect your personal information.' },
 { title: '4. Data Retention', body: 'We retain personal information only as long as necessary to fulfill the purposes outlined in this privacy policy.' },
 { title: '5. Your Rights', body: 'You may access, correct, delete, or object to processing of your personal data. Contact privacy@vybe.app for requests.' },
 ];
 return (
 <div>
 <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20 mb-5">
 <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
 <ShieldCheck className="w-5 h-5 text-brand-gold" />
 </div>
 <div>
 <p className="text-sm font-normal text-[#0F172A] dark:text-white mb-0.5">Your Privacy Matters</p>
 <p className="text-xs text-[#64748B] dark:text-white/50">All data is encrypted with bank-grade security.</p>
 </div>
 </div>
 <p className="text-caption text-[#94A3B8] dark:text-white/40 mb-4">Last updated: April 15, 2026</p>
 <div className="space-y-3">
 {sections.map((s, i) => (
 <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-white/[0.02] border border-[#F1F5F9] dark:border-white/[0.06]">
 <p className="text-sm font-normal text-[#0F172A] dark:text-white mb-1.5">{s.title}</p>
 <p className="text-xs text-[#64748B] dark:text-white/50 leading-relaxed">{s.body}</p>
 </div>
 ))}
 </div>
 </div>
 );
 }
}