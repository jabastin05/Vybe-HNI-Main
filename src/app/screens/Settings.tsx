import { useState, useEffect } from 'react';
import { SideNav } from '../components/SideNav';
import { ThemeToggle } from '../components/ThemeToggle';
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
  MessageCircle,
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

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'order-history' as const, label: 'Order History', icon: FileText },
    { id: 'help-support' as const, label: 'Help', icon: HeadphonesIcon },
    { id: 'terms' as const, label: 'Terms', icon: Scale },
    { id: 'privacy' as const, label: 'Privacy', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] transition-colors duration-300 pb-24 md:pb-8 pt-[60px] md:pt-0">
      <SideNav />

      {/* Header - Hidden on inner tabs for mobile/tablet */}
      <div className={`border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A] ${
        activeTab === 'profile' ? '' : 'hidden lg:block'
      }`}>
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
                Account
              </div>
              <div className="text-h1 tracking-tight text-black dark:text-white">
                My Profile
              </div>
              <p className="text-small text-black/50 dark:text-white/60 mt-1">
                Manage your profile and account preferences
              </p>
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8 lg:py-10">
        {/* Mobile Tab Bar */}
        <div className="lg:hidden mb-6">
          <div className="bg-white/80 dark:bg-[#1A1A1A] backdrop-blur-xl border border-black/5 dark:border-white/[0.08] rounded-xl p-1 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg transition-all duration-300 min-w-[80px] ${
                    activeTab === tab.id
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                      : 'text-black/60 dark:text-white/60 active:bg-black/5 dark:active:bg-white/5'
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
            <div className="bg-white/80 dark:bg-[#1A1A1A] backdrop-blur-xl border border-black/5 dark:border-white/[0.08] rounded-xl p-2 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-2.5 rounded-xl text-left transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-black/[0.06] dark:bg-white/[0.06] text-black dark:text-white shadow-sm'
                      : 'text-black/60 dark:text-white/60 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] hover:text-black/80 dark:hover:text-white/80'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-small">{tab.label}</span>
                </button>
              ))}

              {/* Divider */}
              <div className="my-2 border-t border-black/5 dark:border-white/10" />

              {/* Logout Button */}
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="w-full flex items-center gap-3 px-5 py-2.5 rounded-xl text-left transition-all duration-300 text-black dark:text-white hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-small">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white/80 dark:bg-[#1A1A1A] backdrop-blur-xl border border-black/5 dark:border-white/[0.08] rounded-xl card-padding shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              {/* Success Message */}
              {showSaved && (
                <div className="mb-8 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 backdrop-blur-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-small text-emerald-600 dark:text-emerald-400 font-medium">Settings saved successfully</span>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  {/* Profile Header - Compact */}
                  <div className="mb-8 card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                    <div className="flex items-center gap-4 md:gap-6">
                      {/* Profile Picture - Circular */}
                      <div className="relative group flex-shrink-0">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-emerald-500/20 shadow-lg">
                          {profileData.avatarUrl ? (
                            <img
                              src={profileData.avatarUrl}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                              <span className="text-h1 font-medium text-white">
                                {profileData.firstName.charAt(0).toUpperCase() || 'U'}
                              </span>
                            </div>
                          )}

                          {/* Upload Progress Overlay */}
                          {imageUploadProgress > 0 && imageUploadProgress < 100 && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                              <div className="text-center">
                                <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-1" />
                                <div className="text-caption text-white font-medium">{imageUploadProgress}%</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Camera Icon Button - Small */}
                        <label className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 active:bg-black/80 dark:active:bg-white/80 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </label>
                      </div>

                      {/* Profile Info - Simple */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-h2 font-medium text-black dark:text-white mb-1 truncate">
                          {profileData.firstName} {profileData.lastName}
                        </h3>

                        <p className="text-small text-[#8E8E93] mb-1.5">
                          {profileData.country === 'IN' ? 'India' : profileData.country}
                        </p>

                        <p className="text-caption text-black/40 dark:text-white/30 font-mono tracking-wide">
                          ID: VYBE-{profileData.firstName.substring(0, 2).toUpperCase()}2024
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Relationship Manager Section */}
                  <div className="mb-8 rounded-xl bg-white/85 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] card-padding backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    <div className="flex items-center gap-2 mb-6">
                      <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <div className="text-h2 tracking-tight font-light text-black dark:text-white">
                        Relationship Manager
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* RM Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-h2 font-medium text-white">
                          PS
                        </span>
                      </div>

                      {/* RM Info */}
                      <div className="flex-1">
                        <div className="text-body font-medium text-black dark:text-white mb-1">
                          Priya Sharma
                        </div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          Senior Relationship Manager
                        </div>
                        <div className="flex items-center gap-2 text-caption text-black/60 dark:text-white/60">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="break-all">priya.sharma@vybe.app</span>
                        </div>
                      </div>

                      {/* Reach Out Button */}
                      <button className="w-full sm:w-auto px-6 py-2.5 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 active:bg-black/80 dark:active:bg-white/80 text-white rounded-lg transition-all text-small font-medium flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)]">
                        <MessageCircle className="w-4 h-4" />
                        <span>Reach Out</span>
                      </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-black/5 dark:border-white/10">
                      <div className="text-center">
                        <div className="text-h2 tracking-tight font-light text-black dark:text-white mb-1">
                          48h
                        </div>
                        <div className="text-caption tracking-[0.05em] uppercase text-[#8E8E93]">
                          Avg Response Time
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-h2 tracking-tight font-light text-black dark:text-white mb-1">
                          24/7
                        </div>
                        <div className="text-caption tracking-[0.05em] uppercase text-[#8E8E93]">
                          Support Available
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information Section */}
                  <div className="mb-8 card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                    {/* Section Header with Edit/Save Button */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
                      <h2 className="text-h2 font-medium text-black dark:text-white">
                        Personal Information
                      </h2>
                      {!isEditingPersonalInfo ? (
                        <button
                          onClick={() => {
                            setIsEditingPersonalInfo(true);
                            setTempProfileData({
                              firstName: profileData.firstName,
                              lastName: profileData.lastName,
                              email: profileData.email,
                              phone: profileData.phone,
                              primaryRole: profileData.primaryRole,
                              portfolioSize: profileData.portfolioSize,
                              referralCode: profileData.referralCode,
                              country: profileData.country,
                            });
                          }}
                          className="w-full sm:w-auto px-5 py-2.5 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 active:bg-black/80 dark:active:bg-white/80 text-white rounded-lg transition-all text-small font-medium flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <button
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="px-5 py-2.5 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 active:bg-black/80 dark:active:bg-white/80 text-white rounded-lg transition-all text-small font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {isSaving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4" />
                            )}
                            {isSaving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => {
                              setIsEditingPersonalInfo(false);
                              setValidationErrors({});
                            }}
                            className="px-5 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 active:bg-black/[0.15] dark:active:bg-white/[0.15] text-black dark:text-white rounded-xl transition-all text-small font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Information Grid - 3 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* First Name */}
                      <div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          First Name
                        </div>
                        {isEditingPersonalInfo ? (
                          <div>
                            <input
                              type="text"
                              value={tempProfileData.firstName}
                              onChange={(e) => setTempProfileData({ ...tempProfileData, firstName: e.target.value })}
                              className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5 text-body text-black dark:text-white focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-all"
                            />
                            {validationErrors.firstName && (
                              <p className="text-caption text-red-500 mt-1">{validationErrors.firstName}</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-body text-black dark:text-white font-medium">
                            {profileData.firstName || 'Not set'}
                          </div>
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          Last Name
                        </div>
                        {isEditingPersonalInfo ? (
                          <div>
                            <input
                              type="text"
                              value={tempProfileData.lastName}
                              onChange={(e) => setTempProfileData({ ...tempProfileData, lastName: e.target.value })}
                              className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5 text-body text-black dark:text-white focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-all"
                            />
                            {validationErrors.lastName && (
                              <p className="text-caption text-red-500 mt-1">{validationErrors.lastName}</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-body text-black dark:text-white font-medium">
                            {profileData.lastName || 'Not set'}
                          </div>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          Email Address
                        </div>
                        {isEditingPersonalInfo ? (
                          <div>
                            <input
                              type="email"
                              value={tempProfileData.email}
                              onChange={(e) => setTempProfileData({ ...tempProfileData, email: e.target.value })}
                              className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5 text-body text-black dark:text-white focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-all"
                            />
                            {validationErrors.email && (
                              <p className="text-caption text-red-500 mt-1">{validationErrors.email}</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-body text-black dark:text-white font-medium">
                            {profileData.email}
                          </div>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          Phone Number
                        </div>
                        {isEditingPersonalInfo ? (
                          <div>
                            <input
                              type="tel"
                              value={tempProfileData.phone}
                              onChange={(e) => setTempProfileData({ ...tempProfileData, phone: e.target.value })}
                              className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5 text-body text-black dark:text-white focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-all"
                            />
                            {validationErrors.phone && (
                              <p className="text-caption text-red-500 mt-1">{validationErrors.phone}</p>
                            )}
                          </div>
                        ) : (
                          <div className="text-body text-black dark:text-white font-medium">
                            {profileData.phone || 'Not set'}
                          </div>
                        )}
                      </div>

                      {/* Operating Role */}
                      <div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          Operating Role
                        </div>
                        {isEditingPersonalInfo ? (
                          <select
                            value={tempProfileData.primaryRole}
                            onChange={(e) => setTempProfileData({ ...tempProfileData, primaryRole: e.target.value })}
                            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5  text-body text-black dark:text-white focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-all"
                          >
                            <option value="land-owner">Land Owner</option>
                            <option value="strategic-investor">Strategic Investor</option>
                            <option value="both">Dual Mandate</option>
                          </select>
                        ) : (
                          <div className="text-body text-black dark:text-white font-medium">
                            {getRoleLabel(profileData.primaryRole)}
                          </div>
                        )}
                      </div>

                      {/* Portfolio Size */}
                      <div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          Portfolio Size
                        </div>
                        {isEditingPersonalInfo ? (
                          <select
                            value={tempProfileData.portfolioSize}
                            onChange={(e) => setTempProfileData({ ...tempProfileData, portfolioSize: e.target.value })}
                            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5  text-body text-black dark:text-white focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-all"
                          >
                            <option value="1">1 Property</option>
                            <option value="2-5">2-5 Properties</option>
                            <option value="6-20">6-20 Properties</option>
                            <option value="20+">20+ Properties</option>
                          </select>
                        ) : (
                          <div className="text-body text-black dark:text-white font-medium">
                            {getPortfolioSizeLabel(profileData.portfolioSize)}
                          </div>
                        )}
                      </div>

                      {/* Referral Code */}
                      <div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          Referral Code
                        </div>
                        {isEditingPersonalInfo ? (
                          <input
                            type="text"
                            value={tempProfileData.referralCode}
                            onChange={(e) => setTempProfileData({ ...tempProfileData, referralCode: e.target.value })}
                            placeholder="Optional"
                            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5  text-body text-black dark:text-white focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-all"
                          />
                        ) : (
                          <div className="text-body text-black dark:text-white font-medium">
                            {profileData.referralCode || 'Not set'}
                          </div>
                        )}
                      </div>

                      {/* Country */}
                      <div>
                        <div className="text-caption text-[#8E8E93] mb-2">
                          Country
                        </div>
                        {isEditingPersonalInfo ? (
                          <select
                            value={tempProfileData.country}
                            onChange={(e) => setTempProfileData({ ...tempProfileData, country: e.target.value })}
                            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-lg px-3 py-2.5  text-body text-black dark:text-white focus:outline-none focus:border-black/20 dark:focus:border-white/20 transition-all"
                          >
                            <option value="IN">India</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="SG">Singapore</option>
                            <option value="AE">UAE</option>
                          </select>
                        ) : (
                          <div className="text-body text-black dark:text-white font-medium">
                            {profileData.country === 'IN' ? 'India' : profileData.country}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Identity Verification Section */}
                  <div className="mb-8 card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                    <h2 className="text-h2 font-medium text-black dark:text-white mb-6">
                      Identity Verification
                    </h2>

                    {profileData.documentType ? (
                      <div className="space-y-4">
                        {/* Verification Status Badge */}
                        <div className="flex items-center gap-3 mb-4">
                          {profileData.documentVerified ? (
                            <>
                              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              </div>
                              <div>
                                <div className="text-small font-medium text-emerald-600 dark:text-emerald-400">
                                  Verified
                                </div>
                                <div className="text-caption text-[#8E8E93]">
                                  Your identity has been verified
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-yellow-500" />
                              </div>
                              <div>
                                <div className="text-small font-medium text-yellow-600 dark:text-yellow-400">
                                  Pending Verification
                                </div>
                                <div className="text-caption text-[#8E8E93]">
                                  Your documents are under review
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Document Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                          <div>
                            <div className="text-caption text-[#8E8E93] mb-2">
                              Document Type
                            </div>
                            <div className="text-body text-black dark:text-white font-medium">
                              {profileData.documentType === 'aadhaar' ? 'Aadhaar Card' : 'PAN Card'}
                            </div>
                          </div>

                          <div>
                            <div className="text-caption text-[#8E8E93] mb-2">
                              Document Number
                            </div>
                            <div className="text-body text-black dark:text-white font-medium font-mono">
                              {profileData.documentNumber || 'Not provided'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                          <Shield className="w-8 h-8 text-black/40 dark:text-white/40" />
                        </div>
                        <p className="text-small text-black/60 dark:text-white/60 mb-1">
                          No identity verification documents submitted
                        </p>
                        <p className="text-caption text-[#8E8E93]">
                          Complete verification during onboarding to access all features
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Refer & Earn Card */}
                  <div className="mb-8 rounded-xl bg-white/85 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] p-7 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-h1">🎁</span>
                          <div className="text-h2 tracking-tight font-light text-black dark:text-white">
                            Refer & Earn
                          </div>
                        </div>
                      </div>

                      {/* Referral Code */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-500/10 dark:to-emerald-500/5 border border-emerald-200/50 dark:border-emerald-500/20">
                        <div className="flex items-center justify-between gap-4">
                          <div className="text-h1 font-medium tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                            {profileData.referralCode || `VYBE${profileData.firstName.substring(0, 4).toUpperCase()}`}
                          </div>
                          <div className="relative">
                            <button 
                              onClick={() => setShowShareMenu(!showShareMenu)}
                              className="px-3.5 py-2 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 text-white rounded-lg transition-all duration-200 text-caption font-medium uppercase tracking-wider shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] hover:scale-105 flex items-center gap-2"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              Share
                            </button>

                            {/* Share Menu Dropdown */}
                            {showShareMenu && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden z-50">
                              <div className="p-2">
                                {/* WhatsApp */}
                                <button
                                  onClick={() => {
                                    const referralCode = profileData.referralCode || `VYBE${profileData.firstName.substring(0, 4).toUpperCase()}`;
                                    const message = `Join VYBE - Premium Real Estate Intelligence Platform! Use my referral code: ${referralCode}`;
                                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                                    setShowShareMenu(false);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all text-left"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                                  </div>
                                  <div>
                                    <div className="text-small font-medium text-black dark:text-white">
                                      WhatsApp
                                    </div>
                                    <div className="text-caption text-black/60 dark:text-white/60">
                                      Share via WhatsApp
                                    </div>
                                  </div>
                                </button>

                                {/* Email */}
                                <button
                                  onClick={() => {
                                    const referralCode = profileData.referralCode || `VYBE${profileData.firstName.substring(0, 4).toUpperCase()}`;
                                    const subject = 'Join VYBE - Premium Real Estate Platform';
                                    const body = `Hi,\n\nI'd like to invite you to join VYBE, a premium intelligence-first real estate platform for UHNIs.\n\nUse my referral code: ${referralCode}\n\nBest regards,\n${profileData.firstName}`;
                                    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                                    setShowShareMenu(false);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all text-left"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <div className="text-small font-medium text-black dark:text-white">
                                      Email
                                    </div>
                                    <div className="text-caption text-black/60 dark:text-white/60">
                                      Share via email
                                    </div>
                                  </div>
                                </button>

                                {/* Copy Link */}
                                <button
                                  onClick={() => {
                                    const referralCode = profileData.referralCode || `VYBE${profileData.firstName.substring(0, 4).toUpperCase()}`;
                                    const referralLink = `https://vybe.app/signup?ref=${referralCode}`;
                                    copyToClipboard(referralLink);
                                    setShowShareMenu(false);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all text-left"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                    <Copy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <div>
                                    <div className="text-small font-medium text-black dark:text-white">
                                      Copy Link
                                    </div>
                                    <div className="text-caption text-black/60 dark:text-white/60">
                                      Copy referral link
                                    </div>
                                  </div>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* Stats */}
                    <div className="pt-6 border-t border-black/5 dark:border-white/10 text-center">
                      <div className="text-h1 tracking-tight font-light text-black dark:text-white">
                        12
                      </div>
                      <div className="text-caption text-[#8E8E93] font-medium">
                        Total Referrals
                      </div>
                    </div>
                  </div>

                  {/* Logout Button - Mobile/Tablet Only */}
                  <div className="lg:hidden mt-8">
                    <button
                      onClick={() => {
                        window.location.href = '/';
                      }}
                      className="w-full flex items-center justify-center gap-3 px-6 py-2.5 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/20 text-black dark:text-white hover:bg-red-500/20 dark:hover:bg-red-500/30 active:bg-red-500/30 dark:active:bg-red-500/40 transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-body font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-h1 tracking-tight text-black dark:text-white mb-2">
                    Notification Preferences
                  </h2>
                  <p className="text-small text-black/60 dark:text-white/60 mb-8">
                    Manage how you receive updates and alerts
                  </p>

                  <div className="space-y-5">
                    {[
                      { key: 'emailReports', label: 'Email Reports', desc: 'Receive detailed property analysis reports via email' },
                      { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Get important updates via text message' },
                      { key: 'partnerUpdates', label: 'Partner Updates', desc: 'Notifications about partner milestones and activities' },
                      { key: 'marketInsights', label: 'Market Insights', desc: 'Weekly market trends and investment opportunities' },
                      { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your portfolio performance' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start justify-between p-5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10">
                        <div className="flex-1">
                          <div className="text-small font-medium text-black dark:text-white mb-1">
                            {item.label}
                          </div>
                          <div className="text-small text-black/60 dark:text-white/60">
                            {item.desc}
                          </div>
                        </div>
                        <label className="relative inline-block w-12 h-6 ml-4 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={notificationSettings[item.key as keyof typeof notificationSettings]}
                            onChange={(e) =>
                              setNotificationSettings({
                                ...notificationSettings,
                                [item.key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-black/10 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:bg-white dark:peer-checked:bg-emerald-400"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10">
                    <button
                      onClick={() => {
                        setShowSaved(true);
                        setTimeout(() => setShowSaved(false), 3000);
                      }}
                      className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-all text-small font-medium"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Order History Tab */}
              {activeTab === 'order-history' && (
                <div>
                  <h2 className="text-h1 tracking-tight text-black dark:text-white mb-2 font-light">
                    Order History
                  </h2>
                  <p className="text-small text-black/60 dark:text-white/60 mb-8">
                    View all your service orders and transactions
                  </p>

                  {/* Orders Table */}
                  <div className="rounded-xl border border-black/5 dark:border-white/10 overflow-hidden">
                    {/* Table Header - Hidden on mobile */}
                    <div className="hidden md:block bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/5 dark:border-white/10 px-6 py-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                          Services
                        </div>
                        <div className="text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                          Property
                        </div>
                        <div className="text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                          Date
                        </div>
                        <div className="text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                          Status
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl">
                      {[
                        {
                          id: 'ORD-2026-045',
                          service: 'Property Valuation Report',
                          property: 'Sterling Heights, Sector 47',
                          date: 'Mar 12, 2026',
                          status: 'Completed',
                          statusColor: 'emerald'
                        },
                        {
                          id: 'ORD-2026-044',
                          service: 'Legal Document Review',
                          property: 'Sterling Heights, Sector 47',
                          date: 'Mar 08, 2026',
                          status: 'Completed',
                          statusColor: 'emerald'
                        },
                        {
                          id: 'ORD-2026-043',
                          service: 'Property Tax Consultation',
                          property: 'Golden Meadows Estate',
                          date: 'Feb 28, 2026',
                          status: 'Completed',
                          statusColor: 'emerald'
                        },
                        {
                          id: 'ORD-2026-042',
                          service: 'Site Inspection Service',
                          property: 'Sterling Heights, Sector 47',
                          date: 'Feb 22, 2026',
                          status: 'Processing',
                          statusColor: 'blue'
                        },
                        {
                          id: 'ORD-2026-041',
                          service: 'Architecture Consultation',
                          property: 'Riverside Enclave',
                          date: 'Feb 15, 2026',
                          status: 'Completed',
                          statusColor: 'emerald'
                        },
                        {
                          id: 'ORD-2026-040',
                          service: 'Property Insurance Setup',
                          property: 'Sterling Heights, Sector 47',
                          date: 'Feb 10, 2026',
                          status: 'Completed',
                          statusColor: 'emerald'
                        },
                        {
                          id: 'ORD-2026-039',
                          service: 'Market Analysis Report',
                          property: 'Emerald Gardens Complex',
                          date: 'Jan 28, 2026',
                          status: 'Pending',
                          statusColor: 'yellow'
                        },
                        {
                          id: 'ORD-2026-038',
                          service: 'Interior Design Consultation',
                          property: 'Golden Meadows Estate',
                          date: 'Jan 20, 2026',
                          status: 'Completed',
                          statusColor: 'emerald'
                        },
                      ].map((order, idx) => (
                        <div
                          key={idx}
                          className="border-b border-black/5 dark:border-white/10 last:border-b-0 px-6 py-5 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start md:items-center">
                            {/* Service */}
                            <div>
                              <div className="text-small font-medium text-black dark:text-white mb-1">
                                {order.service}
                              </div>
                              <div className="text-caption text-[#8E8E93] font-mono">
                                {order.id}
                              </div>
                            </div>

                            {/* Property */}
                            <div>
                              <div className="text-small text-black dark:text-white">
                                {order.property}
                              </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-[#8E8E93]" />
                              <span className="text-small text-black dark:text-white">
                                {order.date}
                              </span>
                            </div>

                            {/* Status */}
                            <div>
                              <span className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-caption font-medium tracking-wider uppercase ${
                                order.statusColor === 'emerald'
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : order.statusColor === 'blue'
                                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                  : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  order.statusColor === 'emerald'
                                    ? 'bg-emerald-500'
                                    : order.statusColor === 'blue'
                                    ? 'bg-black dark:bg-white animate-pulse'
                                    : 'bg-yellow-500'
                                }`} />
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <div className="text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93] mb-3">
                        Total Orders
                      </div>
                      <div className="text-h1 tracking-tight font-light text-black dark:text-white mb-1">
                        28
                      </div>
                      <div className="text-caption text-emerald-600 dark:text-emerald-400 font-medium">
                        +4 this month
                      </div>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <div className="text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93] mb-3">
                        Completed
                      </div>
                      <div className="text-h1 tracking-tight font-light text-black dark:text-white mb-1">
                        24
                      </div>
                      <div className="text-caption text-[#8E8E93]">
                        86% success rate
                      </div>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <div className="text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93] mb-3">
                        In Progress
                      </div>
                      <div className="text-h1 tracking-tight font-light text-black dark:text-white mb-1">
                        4
                      </div>
                      <div className="text-caption text-[#8E8E93]">
                        Active requests
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Tab */}
              {activeTab === 'help-support' && (
                <div>
                  <h2 className="text-h1 tracking-tight text-black dark:text-white mb-2 font-light">
                    Help
                  </h2>
                  <p className="text-small text-black/60 dark:text-white/60 mb-8">
                    Get assistance with your account and platform features
                  </p>

                  {/* Support Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Contact Support */}
                    <div className="card-padding rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-500/10 dark:to-emerald-500/5 border border-emerald-200/50 dark:border-emerald-500/20">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 dark:bg-emerald-500/30 flex items-center justify-center mb-4">
                        <HeadphonesIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-body font-medium text-black dark:text-white mb-2">
                        Contact Support
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 mb-4">
                        Reach out to our support team for assistance
                      </p>
                      <a
                        href="mailto:support@vybe.app"
                        className="inline-flex items-center gap-2 text-small font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                      >
                        support@vybe.app
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Documentation */}
                    <div className="card-padding rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-500/10 dark:to-blue-500/5 border border-blue-200/50 dark:border-blue-500/20">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-body font-medium text-black dark:text-white mb-2">
                        Documentation
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 mb-4">
                        Browse our comprehensive guides and FAQs
                      </p>
                      <button className="inline-flex items-center gap-2 text-small font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        View Docs
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div className="space-y-4">
                    <h3 className="text-body font-medium text-black dark:text-white mb-4">
                      Frequently Asked Questions
                    </h3>

                    {[
                      {
                        q: 'How do I upload property documents?',
                        a: 'Navigate to Document Vault, click "Upload Document", select your property, and upload the required files. All documents are encrypted with bank-grade security.'
                      },
                      {
                        q: 'What is the HABU Report?',
                        a: 'HABU (High-value Analysis & Best-use Understanding) is our comprehensive property intelligence report that provides actionable insights for optimal property utilization.'
                      },
                      {
                        q: 'How do I request a service?',
                        a: 'Go to Services Catalog, select the service you need, choose your property, and submit the request. Your Relationship Manager will be assigned immediately.'
                      },
                      {
                        q: 'How can I track my case progress?',
                        a: 'Visit Case Management to view all your active and closed cases. Each case shows real-time progress updates and milestones.'
                      }
                    ].map((faq, index) => (
                      <div key={index} className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                        <div className="text-small font-medium text-black dark:text-white mb-2">
                          {faq.q}
                        </div>
                        <div className="text-small text-black/60 dark:text-white/60 leading-relaxed">
                          {faq.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Terms Tab */}
              {activeTab === 'terms' && (
                <div>
                  <h2 className="text-h1 tracking-tight text-black dark:text-white mb-2 font-light">
                    Terms
                  </h2>
                  <p className="text-small text-black/60 dark:text-white/60 mb-8">
                    Last updated: April 15, 2026
                  </p>

                  <div className="space-y-6">
                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        1. Acceptance of Terms
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-4">
                        By accessing and using VYBE's intelligence-first capital platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                      </p>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        2. Service Description
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-4">
                        VYBE provides real estate intelligence, property management, and advisory services to UHNIs and institutional investors. Our platform includes HABU reports, document management, case tracking, and curated service partnerships.
                      </p>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        3. User Responsibilities
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-4">
                        Users are responsible for maintaining the confidentiality of their account credentials, ensuring accuracy of submitted information, and complying with all applicable laws and regulations regarding property transactions.
                      </p>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        4. Intellectual Property
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-4">
                        All content, features, and functionality on the VYBE platform are owned by VYBE and are protected by international copyright, trademark, and other intellectual property laws.
                      </p>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        5. Limitation of Liability
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-4">
                        VYBE shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                      <p className="text-caption text-black/60 dark:text-white/60 leading-relaxed">
                        <strong className="text-black dark:text-white">Note:</strong> These are abbreviated terms. For complete terms and conditions, please contact our legal team at legal@vybe.app
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-h1 tracking-tight text-black dark:text-white mb-2 font-light">
                    Privacy
                  </h2>
                  <p className="text-small text-black/60 dark:text-white/60 mb-8">
                    Last updated: April 15, 2026
                  </p>

                  <div className="space-y-6">
                    <div className="card-padding rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-500/10 dark:to-emerald-500/5 border border-emerald-200/50 dark:border-emerald-500/20">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 dark:bg-emerald-500/30 flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-body font-medium text-black dark:text-white mb-2">
                            Your Privacy Matters
                          </h3>
                          <p className="text-small text-black/60 dark:text-white/60 leading-relaxed">
                            At VYBE, we are committed to protecting your personal information and your right to privacy. All data is encrypted with bank-grade security.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        1. Information We Collect
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-3">
                        We collect information that you provide directly to us, including:
                      </p>
                      <ul className="space-y-2 text-small text-black/60 dark:text-white/60">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Personal identification information (name, email, phone number)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Property information and documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Financial information related to property transactions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Communication preferences and support interactions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        2. How We Use Your Information
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-3">
                        We use the information we collect to:
                      </p>
                      <ul className="space-y-2 text-small text-black/60 dark:text-white/60">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Provide, maintain, and improve our services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Process your property analysis requests</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Communicate with you about your account and services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Ensure platform security and prevent fraud</span>
                        </li>
                      </ul>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        3. Data Security
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed">
                        We implement industry-standard security measures including bank-grade encryption, secure data centers, regular security audits, and access controls to protect your personal information from unauthorized access, disclosure, or destruction.
                      </p>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        4. Data Retention
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed">
                        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                      </p>
                    </div>

                    <div className="card-padding rounded-xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 backdrop-blur-xl">
                      <h3 className="text-body font-medium text-black dark:text-white mb-3">
                        5. Your Rights
                      </h3>
                      <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-3">
                        You have the right to:
                      </p>
                      <ul className="space-y-2 text-small text-black/60 dark:text-white/60">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Access and receive a copy of your personal data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Request correction of inaccurate data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Request deletion of your personal data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>Object to processing of your personal data</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                      <p className="text-caption text-black/60 dark:text-white/60 leading-relaxed">
                        <strong className="text-black dark:text-white">Questions?</strong> If you have any questions about our privacy practices, please contact us at privacy@vybe.app
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}