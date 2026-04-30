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
 firstName: '',
 lastName: '',
 email: '',
 phone: '',
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
 <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">


 {/* ─────────────────────────────────────────
 MOBILE LAYOUT (< md)
 ───────────────────────────────────────── */}
 <div className="md:hidden">
 {mobileSection === null ? (
 /* ── Menu Home ── */
 <>
 {/* ── Hero ── */}
 <div className="relative bg-gradient-to-br from-[#0B3360] via-brand-navy to-brand-primary/75 dark:from-background dark:to-background border-b border-gray-100 dark:border-white/[0.06] overflow-hidden">
 <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-secondary/[0.05] blur-3xl pointer-events-none" />

 {/* Avatar + name — centred, editorial */}
 <div className="relative flex flex-col items-center pt-8 pb-6 px-5">
 {/* Avatar */}
 <div className="relative mb-4">
 <div className="w-20 h-20 rounded-full overflow-hidden border-[2px] border-white/20 flex-shrink-0 bg-white/10">
 {profileData.avatarUrl ? (
 <img src={profileData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full bg-white/10 flex items-center justify-center">
 <span className="text-3xl font-normal text-white">
 {(profileData.firstName || 'U').charAt(0).toUpperCase()}
 </span>
 </div>
 )}
 </div>
 {/* Upload trigger */}
 <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform border-2 border-white dark:border-background">
 <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
 <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
 </svg>
 </label>
 </div>

 {/* Name */}
 <h2 className="text-xl font-normal text-white tracking-tight mb-1">
 {profileData.firstName || profileData.lastName
 ? `${profileData.firstName} ${profileData.lastName}`.trim()
 : 'Your Name'}
 </h2>
 <p className="text-xs text-white/50 mb-3 truncate max-w-[240px]">
 {profileData.email || 'No email set'}
 </p>

 {/* Verified badge */}
 <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10">
 <CheckCircle2 className="w-3 h-3 text-brand-secondary" strokeWidth={1.5} />
 <span className="text-xs font-normal text-white/80 tracking-wide">
 {getRoleLabel(profileData.primaryRole)}
 </span>
 </div>
 </div>
 </div>

 {/* ── RM strip ── */}
 <div className="mx-4 mt-4">
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
 <div className="flex items-center gap-4 px-5 py-4">
 <div className="w-10 h-10 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
 <span className="text-sm font-normal text-brand-primary">PS</span>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white">Priya Sharma</p>
 <p className="text-xs text-gray-400 dark:text-white/40">Relationship Manager</p>
 </div>
 <RMAccess />
 </div>
 </div>
 </div>

 {/* ── Menu Groups ── */}
 <div className="px-4 pt-5 pb-6 space-y-5">
 {menuGroups.map((group) => (
 <div key={group.title}>
 <p className="text-xs font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-white/40 mb-2 px-1">
 {group.title}
 </p>
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
 {group.items.map((item, idx) => {
 const Icon = item.icon;
 return (
 <button
 key={item.id}
 onClick={() => setMobileSection(item.id)}
 className={`w-full flex items-center gap-4 px-5 py-4 text-left
 active:bg-gray-50 dark:active:bg-white/[0.03] transition-colors duration-150
 ${idx < group.items.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''}`}
 >
 <div className="w-9 h-9 rounded-xl bg-brand-primary/[0.08] dark:bg-brand-primary/[0.12] flex items-center justify-center flex-shrink-0">
 <Icon className="w-[18px] h-[18px] text-brand-primary" strokeWidth={1.5} />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white">{item.label}</p>
 <p className="text-xs text-gray-400 dark:text-white/40">{item.desc}</p>
 </div>
 <ChevronRight className="w-4 h-4 text-gray-300 dark:text-white/20 flex-shrink-0" strokeWidth={1.5} />
 </button>
 );
 })}
 </div>
 </div>
 ))}

 {/* Logout */}
 <button
 onClick={() => { window.location.href = '/'; }}
 className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl
 bg-white dark:bg-card border border-black/5 dark:border-white/5
 text-red-500 dark:text-red-400
 text-sm font-normal
 active:bg-red-50 dark:active:bg-red-500/10 transition-colors duration-150"
 >
 <LogOut className="w-4 h-4" strokeWidth={1.5} />
 Sign Out
 </button>
 </div>
 </>
 ) : (
 /* ── Section Detail View ── */
 <>
 {/* Back header */}
 <div className="relative bg-gradient-to-br from-[#0B3360] via-brand-navy to-brand-primary/75 dark:from-background dark:to-background px-5 pt-5 pb-5 flex items-center gap-3 overflow-hidden">
 <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-secondary/[0.05] blur-3xl pointer-events-none" />
 <button
 onClick={() => setMobileSection(null)}
 className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center active:scale-95 transition-transform flex-shrink-0"
 >
 <ChevronLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
 </button>
 <h2 className="text-base font-normal text-white">
 {menuGroups.flatMap(g => g.items).find(i => i.id === mobileSection)?.label ?? mobileSection}
 </h2>
 </div>

 {/* Section content */}
 <div className="px-4 py-5">
 {/* Success banner */}
 {showSaved && (
 <div className="mb-4 p-3.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-2.5">
 <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
 <span className="text-sm text-emerald-700 dark:text-emerald-400 font-normal">Saved successfully</span>
 </div>
 )}
 {mobileSection === 'profile' && renderProfileTab()}
 {mobileSection === 'notifications' && renderNotificationsTab()}
 {mobileSection === 'order-history' && renderOrderHistoryTab()}
 {mobileSection === 'help-support' && renderHelpTab()}
 {mobileSection === 'terms' && renderTermsTab()}
 {mobileSection === 'privacy' && renderPrivacyTab()}
 </div>
 </>
 )}
 </div>

 {/* ─────────────────────────────────────────
 DESKTOP LAYOUT (md+)
 ───────────────────────────────────────── */}
 <div className="hidden md:block">

 {/* Header - Hidden on inner tabs for mobile/tablet */}
 <div className={`bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06] ${
 activeTab === 'profile' ? '' : 'hidden lg:block'
 }`}>
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-primary mb-2">
 Account
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
 My Profile
 </h1>
 <p className="text-small text-gray-500 dark:text-white/50 mt-1">
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
 <div className="bg-white dark:bg-card border border-black/5 dark:border-white/5 rounded-2xl p-1 overflow-x-auto scrollbar-hide">
 <div className="flex gap-1 min-w-max">
 {tabs.map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg transition-all duration-200 min-w-[80px] ${
 activeTab === tab.id
 ? 'bg-brand-primary text-white'
 : 'text-gray-600 dark:text-white/50 active:bg-brand-navy/5 dark:active:bg-white/5'
 }`}
 >
 <tab.icon className="w-5 h-5 flex-shrink-0" strokeWidth={activeTab === tab.id ? 2 : 1.5} />
 <span className="text-xs tracking-tight whitespace-nowrap">{tab.label}</span>
 </button>
 ))}
 </div>
 </div>
 </div>

 <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
 {/* Desktop Sidebar Tabs */}
 <div className="hidden lg:block w-64 flex-shrink-0">
 <div className="bg-white dark:bg-card border border-black/5 dark:border-white/5 rounded-2xl p-2">
 {tabs.map((tab) => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`w-full flex items-center gap-4 px-5 py-2.5 rounded-xl text-left transition-all duration-200 ${
 activeTab === tab.id
 ? 'bg-brand-navy/[0.06] dark:bg-white/[0.06] text-gray-900 dark:text-white'
 : 'text-gray-600 dark:text-white/50 hover:bg-brand-navy/[0.02] dark:hover:bg-white/[0.02] hover:text-gray-900/80 dark:hover:text-white/80'
 }`}
 >
 <tab.icon className="w-4 h-4" />
 <span className="text-small">{tab.label}</span>
 </button>
 ))}

 {/* Divider */}
 <div className="my-2 border-t border-gray-200 dark:border-white/[0.06]" />

 {/* Logout Button */}
 <button
 onClick={() => {
 window.location.href = '/';
 }}
 className="w-full flex items-center gap-4 px-5 py-2.5 rounded-xl text-left transition-all duration-200 text-gray-900 dark:text-white hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300"
 >
 <LogOut className="w-4 h-4" />
 <span className="text-small">Logout</span>
 </button>
 </div>
 </div>

 {/* Main Content Area */}
 <div className="flex-1">
 <div className="bg-white dark:bg-card border border-black/5 dark:border-white/5 rounded-2xl p-5 md:p-6">
 {/* Success Message */}
 {showSaved && (
 <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center gap-3">
 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
 <span className="text-small text-emerald-700 dark:text-emerald-400 font-normal">Settings saved successfully</span>
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
 const fields = [
 { key: 'firstName', label: 'First Name', type: 'text' },
 { key: 'lastName', label: 'Last Name', type: 'text' },
 { key: 'email', label: 'Email', type: 'email' },
 { key: 'phone', label: 'Phone', type: 'tel' },
 ];
 return (
 <div className="space-y-5">
 {/* Personal Information */}
 <div>
 <div className="flex items-center justify-between px-1 mb-2">
 <p className="text-xs font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-white/40">Personal Information</p>
 {!isEditingPersonalInfo ? (
 <button
 onClick={() => { setIsEditingPersonalInfo(true); setTempProfileData({ firstName: profileData.firstName, lastName: profileData.lastName, email: profileData.email, phone: profileData.phone, primaryRole: profileData.primaryRole, portfolioSize: profileData.portfolioSize, referralCode: profileData.referralCode, country: profileData.country }); }}
 className="text-xs font-normal text-brand-primary"
 >Edit</button>
 ) : (
 <div className="flex items-center gap-3">
 <button onClick={() => { setIsEditingPersonalInfo(false); setValidationErrors({}); }} className="text-xs font-normal text-gray-400">Cancel</button>
 <button onClick={handleSaveProfile} disabled={isSaving} className="text-xs font-normal text-brand-primary flex items-center gap-1">
 {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
 {isSaving ? 'Saving…' : 'Save'}
 </button>
 </div>
 )}
 </div>
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
 {fields.map(({ key, label, type }, idx) => (
 <div key={key} className={`flex items-center gap-4 px-5 py-4 ${idx < fields.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''}`}>
 <div className="w-28 flex-shrink-0">
 <p className="text-xs text-gray-400 dark:text-white/40">{label}</p>
 </div>
 {isEditingPersonalInfo ? (
 <div className="flex-1">
 <input
 type={type}
 value={tempProfileData[key as keyof typeof tempProfileData]}
 onChange={(e) => setTempProfileData({ ...tempProfileData, [key]: e.target.value })}
 className="w-full bg-gray-50 dark:bg-white/[0.04] rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white shadow-none focus:shadow-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
 />
 {validationErrors[key] && <p className="text-xs text-red-500 mt-1">{validationErrors[key]}</p>}
 </div>
 ) : (
 <p className="flex-1 text-sm font-normal text-gray-900 dark:text-white truncate">{(profileData as any)[key] || <span className="text-gray-300 dark:text-white/20">Not set</span>}</p>
 )}
 </div>
 ))}
 {/* Role row */}
 <div className={`flex items-center gap-4 px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]`}>
 <div className="w-28 flex-shrink-0"><p className="text-xs text-gray-400 dark:text-white/40">Role</p></div>
 {isEditingPersonalInfo ? (
 <select value={tempProfileData.primaryRole} onChange={(e) => setTempProfileData({ ...tempProfileData, primaryRole: e.target.value })} className="flex-1 bg-gray-50 dark:bg-white/[0.04] rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white shadow-none focus:shadow-none focus:outline-none">
 <option value="land-owner">Land Owner</option>
 <option value="strategic-investor">Strategic Investor</option>
 <option value="both">Dual Mandate</option>
 </select>
 ) : (
 <p className="flex-1 text-sm font-normal text-gray-900 dark:text-white">{getRoleLabel(profileData.primaryRole)}</p>
 )}
 </div>
 {/* Portfolio size row */}
 <div className={`flex items-center gap-4 px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]`}>
 <div className="w-28 flex-shrink-0"><p className="text-xs text-gray-400 dark:text-white/40">Portfolio</p></div>
 {isEditingPersonalInfo ? (
 <select value={tempProfileData.portfolioSize} onChange={(e) => setTempProfileData({ ...tempProfileData, portfolioSize: e.target.value })} className="flex-1 bg-gray-50 dark:bg-white/[0.04] rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white shadow-none focus:shadow-none focus:outline-none">
 <option value="1">1 Property</option>
 <option value="2-5">2-5 Properties</option>
 <option value="6-20">6-20 Properties</option>
 <option value="20+">20+ Properties</option>
 </select>
 ) : (
 <p className="flex-1 text-sm font-normal text-gray-900 dark:text-white">{getPortfolioSizeLabel(profileData.portfolioSize)}</p>
 )}
 </div>
 </div>
 </div>

 {/* Relationship Manager */}
 <div>
 <p className="text-xs font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-white/40 mb-2 px-1">Relationship Manager</p>
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
 <div className="flex items-center gap-4 px-5 py-4">
 <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
 <span className="text-sm font-normal text-brand-primary">PS</span>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white">Priya Sharma</p>
 <p className="text-xs text-gray-400 dark:text-white/40">Mon–Sat, 9am–7pm IST</p>
 </div>
 <RMAccess />
 </div>
 </div>
 </div>

 {/* Identity Verification */}
 <div>
 <p className="text-xs font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-white/40 mb-2 px-1">Identity Verification</p>
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
 {profileData.documentType ? (
 <div className="flex items-center gap-4 px-5 py-4">
 <div className="w-10 h-10 rounded-xl bg-brand-primary/[0.08] flex items-center justify-center flex-shrink-0">
 <FileText className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white">
 {profileData.documentType === 'aadhaar' ? 'Aadhaar Card' : 'PAN Card'}
 </p>
 <p className="text-xs text-gray-400 dark:text-white/40">
 {profileData.documentNumber ? (profileData.documentType === 'aadhaar' ? `XXXX XXXX ${profileData.documentNumber.slice(-4)}` : `XXXXX${profileData.documentNumber.slice(-4)}`) : 'Not provided'}
 </p>
 </div>
 {profileData.documentVerified
 ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
 : <span className="text-xs text-amber-500 flex-shrink-0">Pending</span>}
 </div>
 ) : (
 <div className="flex items-center gap-4 px-5 py-4">
 <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center flex-shrink-0">
 <Shield className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white">Verification Required</p>
 <p className="text-xs text-gray-400 dark:text-white/40">Complete KYC to unlock all features</p>
 </div>
 <ChevronRight className="w-4 h-4 text-gray-300 dark:text-white/20" strokeWidth={1.5} />
 </div>
 )}
 </div>
 </div>

 {/* Refer & Earn */}
 <div>
 <p className="text-xs font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-white/40 mb-2 px-1">Refer & Earn</p>
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
 <div className="flex items-center gap-4 px-5 py-4">
 <div className="flex-1 min-w-0">
 <p className="text-xs text-gray-400 dark:text-white/40 mb-1">Your referral code</p>
 <p className="text-base font-normal text-brand-primary tracking-widest">
 {profileData.referralCode || `VYBE${profileData.firstName.substring(0, 4).toUpperCase() || 'USER'}`}
 </p>
 </div>
 <button onClick={() => copyToClipboard(profileData.referralCode)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-primary/[0.08] text-brand-primary rounded-xl text-xs font-normal active:scale-95 transition-transform flex-shrink-0">
 <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
 {copySuccess ? 'Copied!' : 'Copy'}
 </button>
 </div>
 <div className="border-t border-gray-100 dark:border-white/[0.05] px-5 py-3">
 <p className="text-xs text-gray-400 dark:text-white/40">12 referrals · Invite friends to VYBE</p>
 </div>
 </div>
 </div>
 </div>
 );
 }

 function renderNotificationsTab() {
 const items = [
 { key: 'emailReports', label: 'Email Reports', desc: 'Property analysis reports via email' },
 { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Important updates via text' },
 { key: 'partnerUpdates', label: 'Partner Updates', desc: 'Partner milestones & activities' },
 { key: 'marketInsights', label: 'Market Insights', desc: 'Weekly market trends' },
 { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Portfolio performance summary' },
 ];
 return (
 <div className="space-y-5">
 <div>
 <p className="text-xs font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-white/40 mb-2 px-1">Preferences</p>
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
 {items.map((item, idx) => (
 <div key={item.key} className={`flex items-center gap-4 px-5 py-4 ${idx < items.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''}`}>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white">{item.label}</p>
 <p className="text-xs text-gray-400 dark:text-white/40">{item.desc}</p>
 </div>
 <label className="relative inline-block w-11 h-6 flex-shrink-0 cursor-pointer">
 <input type="checkbox" checked={notificationSettings[item.key as keyof typeof notificationSettings]} onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })} className="sr-only peer" />
 <div className="w-11 h-6 bg-gray-200 dark:bg-white/20 rounded-full peer peer-checked:bg-brand-primary transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
 </label>
 </div>
 ))}
 </div>
 </div>
 <button onClick={() => { setShowSaved(true); setTimeout(() => setShowSaved(false), 3000); }} className="w-full py-4 bg-brand-primary text-white rounded-2xl text-sm font-normal active:scale-[0.98] transition-transform">
 Save Preferences
 </button>
 </div>
 );
 }

 function renderOrderHistoryTab() {
 const orders = [
 { id: 'ORD-2026-045', service: 'Property Valuation Report', property: 'Sterling Heights', date: 'Mar 12, 2026', status: 'Completed', dot: 'bg-emerald-500' },
 { id: 'ORD-2026-044', service: 'Legal Document Review', property: 'Sterling Heights', date: 'Mar 08, 2026', status: 'Completed', dot: 'bg-emerald-500' },
 { id: 'ORD-2026-043', service: 'Property Tax Consultation', property: 'Golden Meadows', date: 'Feb 28, 2026', status: 'Completed', dot: 'bg-emerald-500' },
 { id: 'ORD-2026-042', service: 'Site Inspection Service', property: 'Sterling Heights', date: 'Feb 22, 2026', status: 'Processing', dot: 'bg-brand-primary' },
 { id: 'ORD-2026-041', service: 'Architecture Consultation', property: 'Riverside Enclave', date: 'Feb 15, 2026', status: 'Completed', dot: 'bg-emerald-500' },
 { id: 'ORD-2026-040', service: 'Property Insurance Setup', property: 'Sterling Heights', date: 'Feb 10, 2026', status: 'Completed', dot: 'bg-emerald-500' },
 { id: 'ORD-2026-039', service: 'Market Analysis Report', property: 'Emerald Gardens', date: 'Jan 28, 2026', status: 'Pending', dot: 'bg-amber-500' },
 { id: 'ORD-2026-038', service: 'Interior Design Consultation', property: 'Golden Meadows', date: 'Jan 20, 2026', status: 'Completed', dot: 'bg-emerald-500' },
 ];
 return (
 <div className="space-y-5">
 <div>
 <p className="text-xs font-normal uppercase tracking-[0.12em] text-gray-400 dark:text-white/40 mb-2 px-1">{orders.length} orders</p>
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
 {orders.map((o, idx) => (
 <div key={o.id} className={`flex items-start gap-4 px-5 py-4 ${idx < orders.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''}`}>
 <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${o.dot}`} />
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white mb-0.5 leading-snug">{o.service}</p>
 <p className="text-xs text-gray-400 dark:text-white/40 truncate">{o.property} · {o.date}</p>
 </div>
 <span className={`text-xs flex-shrink-0 ${
 o.status === 'Completed' ? 'text-emerald-500' :
 o.status === 'Processing' ? 'text-brand-primary' : 'text-amber-500'
 }`}>{o.status}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
 }

 function renderHelpTab() {
 return (
 <div>
 <h2 className="text-h2 font-normal text-gray-900 dark:text-white mb-1">Help & Support</h2>
 <p className="text-small text-gray-600 dark:text-white/50 mb-5">We're here to assist you</p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
 <div className="p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
 <div className="w-10 h-10 rounded-xl bg-brand-gold/8 flex items-center justify-center mb-3">
 <HeadphonesIcon className="w-5 h-5 text-brand-gold" />
 </div>
 <p className="text-small font-normal text-gray-900 dark:text-white mb-1">Contact Support</p>
 <a href="mailto:support@vybe.app" className="text-caption text-brand-gold flex items-center gap-1">support@vybe.app <ArrowRight className="w-3 h-3" /></a>
 </div>
 <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
 <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
 <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
 </div>
 <p className="text-small font-normal text-gray-900 dark:text-white mb-1">Documentation</p>
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
 <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]">
 <p className="text-sm font-normal text-gray-900 dark:text-white mb-1.5">{faq.q}</p>
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
 <h2 className="text-h2 font-normal text-gray-900 dark:text-white mb-1">Terms of Service</h2>
 <p className="text-caption text-gray-400 dark:text-white/40 mb-5">Last updated: April 15, 2026</p>
 <div className="space-y-3">
 {sections.map((s, i) => (
 <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]">
 <p className="text-sm font-normal text-gray-900 dark:text-white mb-1.5">{s.title}</p>
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
 <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20 mb-5">
 <div className="w-10 h-10 rounded-xl bg-brand-gold/8 flex items-center justify-center flex-shrink-0">
 <ShieldCheck className="w-5 h-5 text-brand-gold" />
 </div>
 <div>
 <p className="text-sm font-normal text-gray-900 dark:text-white mb-0.5">Your Privacy Matters</p>
 <p className="text-xs text-[#64748B] dark:text-white/50">All data is encrypted with bank-grade security.</p>
 </div>
 </div>
 <p className="text-caption text-gray-400 dark:text-white/40 mb-4">Last updated: April 15, 2026</p>
 <div className="space-y-3">
 {sections.map((s, i) => (
 <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]">
 <p className="text-sm font-normal text-gray-900 dark:text-white mb-1.5">{s.title}</p>
 <p className="text-xs text-[#64748B] dark:text-white/50 leading-relaxed">{s.body}</p>
 </div>
 ))}
 </div>
 </div>
 );
 }
}
