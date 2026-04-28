import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export function TermsAndConditions() {
 return (
 <div className="min-h-screen bg-[#F8FAFC] dark:bg-background transition-colors duration-300">

 
 {/* Header */}
 <div className="border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-4">
 <Link 
 to="/settings" 
 className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-white/[0.04] hover:bg-[#F1F5F9] dark:hover:bg-white/10 transition-colors text-[#475569] dark:text-white/50"
 >
 <ArrowLeft className="w-4 h-4" />
 </Link>
 <div>
 <h1 className="text-caption tracking-[0.05em] uppercase text-[#94A3B8] dark:text-white/40 mb-2">
 Legal
 </h1>
 <div className="text-h1 tracking-tight text-[#0F172A] dark:text-white/95">
 Terms & Conditions
 </div>
 <p className="text-small text-[#475569] dark:text-white/50 mt-1">
 Last updated: March 17, 2026
 </p>
 </div>
 </div>
 <div className="hidden md:block">
 <ThemeToggle />
 </div>
 </div>
 </div>
 </div>

 {/* Content */}
 <div className="max-w-4xl mx-auto px-6 py-2.5">
 <div className="bg-white/80 dark:bg-card backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.06] rounded-xl p-10 dark:">
 <div className="prose dark:prose-invert max-w-none">
 <div className="space-y-8 text-[#0F172A] dark:text-white/80">
 {/* Section 1 */}
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-4">1. Acceptance of Terms</h2>
 <p className="text-small leading-relaxed mb-3">
 By accessing and using VYBE's property intelligence platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms and Conditions, please do not use this service.
 </p>
 </div>

 {/* Section 2 */}
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-4">2. Use of Services</h2>
 <p className="text-small leading-relaxed mb-3">
 VYBE provides property analysis, valuation, and intelligence services to high-net-worth individuals and investors. Our platform is intended for professional use in real estate investment and portfolio management.
 </p>
 <p className="text-small leading-relaxed">
 You agree to use the service only for lawful purposes and in accordance with these Terms and Conditions.
 </p>
 </div>

 {/* Section 3 */}
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-4">3. User Accounts</h2>
 <p className="text-small leading-relaxed mb-3">
 When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
 </p>
 </div>

 {/* Section 4 */}
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-4">4. Data Privacy</h2>
 <p className="text-small leading-relaxed mb-3">
 We are committed to protecting your privacy. All property data, personal information, and transaction details are handled in accordance with our Privacy Policy and applicable data protection laws.
 </p>
 </div>

 {/* Section 5 */}
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-4">5. Intellectual Property</h2>
 <p className="text-small leading-relaxed mb-3">
 The service and its original content, features, and functionality are and will remain the exclusive property of VYBE and its licensors. Our trademarks and trade dress may not be used without our prior written consent.
 </p>
 </div>

 {/* Section 6 */}
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-4">6. Limitation of Liability</h2>
 <p className="text-small leading-relaxed mb-3">
 VYBE provides property intelligence and analysis for informational purposes. Investment decisions should be made after consulting with qualified professionals. We are not liable for any investment losses or damages arising from the use of our services.
 </p>
 </div>

 {/* Section 7 */}
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-4">7. Modifications to Terms</h2>
 <p className="text-small leading-relaxed mb-3">
 We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page. Your continued use of the service after any such changes constitutes acceptance of the new Terms.
 </p>
 </div>

 {/* Section 8 */}
 <div>
 <h2 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-4">8. Contact Information</h2>
 <p className="text-small leading-relaxed">
 If you have any questions about these Terms and Conditions, please contact us at legal@vybe.com
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
