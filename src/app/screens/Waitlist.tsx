import { CheckCircle, Sparkles, Users, TrendingUp, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import vybeLogoImage from 'figma:asset/34582dcf9f86202dc7291352c31dcbccf4aff8ac.png';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function Waitlist() {
  const navigate = useNavigate();

  useEffect(() => {
    // Show approval toast after 2 seconds
    const approvalTimer = setTimeout(() => {
      toast.success('Application Approved!', {
        description: 'Welcome to VYBE. Redirecting to your dashboard...',
        duration: 3000,
      });
    }, 2000);

    // Redirect to empty dashboard after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/empty-dashboard');
    }, 5000);

    return () => {
      clearTimeout(approvalTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen h-screen w-full flex items-center justify-center container-padding py-8 bg-[#F8FAFC] dark:bg-[#0a0a0a] font-sans overflow-y-auto">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
          alt="Premium Architecture"
          className="w-full h-full object-cover opacity-20 dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-[#F2F2F2]/90 dark:from-black/80 dark:to-[#0a0a0a]/95 backdrop-blur-2xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-3xl my-auto">
        {/* Header / Logo */}
        <div className="flex justify-center items-center mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.85] dark:bg-black/[0.85] backdrop-blur-[20px] border border-white/40 dark:border-white/10 flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <img src={vybeLogoImage} alt="VYBE" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </div>
            <div>
              <h1 className="text-h2 md:text-h1 tracking-[-0.01em] font-normal text-[#1A1A1A] dark:text-white leading-none mb-1">VYBE</h1>
              <p className="text-caption uppercase tracking-[0.05em] font-normal text-[#8E8E93]">Intelligence-First Capital</p>
            </div>
          </div>
        </div>

        {/* The Glass Card */}
        <div
          className="bg-white/[0.90] dark:bg-[#0d1b2e]/[0.85] backdrop-blur-[40px] rounded-xl card-padding
                     shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]
                     border border-white/60 dark:border-white/10 relative overflow-hidden transition-all duration-500"
        >
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
          
          <div className="text-center">
            {/* Success State Badge */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[20px]" />
                <div className="relative w-20 h-20 rounded-full bg-[#0B1F3A] dark:bg-[#C9A75D]/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Status Label */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.05em] font-normal text-emerald-500">
                <Sparkles className="w-3.5 h-3.5" />
                Application Received
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-h1 font-normal tracking-[-0.02em] text-[#1A1A1A] dark:text-white leading-tight mb-3">
              You're on the list!
            </h2>
            
            <p className="text-small font-normal text-[#8E8E93] max-w-xl mx-auto mb-10 leading-relaxed">
              Your application is under review by our team. We're carefully curating our community of UHNIs and institutional investors to ensure exceptional platform quality.
            </p>

            {/* What Happens Next Section */}
            <div className="mb-8">
              <h3 className="text-small font-normal text-[#1A1A1A] dark:text-white mb-5 tracking-tight">
                What Happens Next
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="bg-[#F8FAFC] dark:bg-white/[0.03] border-[0.5px] border-[#E2E8F0] dark:border-white/[0.06] rounded-[12px] p-5 text-center">
                  <div className="w-10 h-10 rounded-[8px] bg-blue-500/10 flex items-center justify-center mb-3 mx-auto">
                    <Users className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
                  </div>
                  <div className="text-small font-normal text-[#1A1A1A] dark:text-white mb-1">
                    Review Process
                  </div>
                  <div className="text-caption text-[#8E8E93] leading-snug">
                    48-72 hours
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-[#F8FAFC] dark:bg-white/[0.03] border-[0.5px] border-[#E2E8F0] dark:border-white/[0.06] rounded-[12px] p-5 text-center">
                  <div className="w-10 h-10 rounded-[8px] bg-[#28FF6E]/10 flex items-center justify-center mb-3 mx-auto">
                    <Shield className="w-5 h-5 text-[#28FF6E]" strokeWidth={1.5} />
                  </div>
                  <div className="text-small font-normal text-[#1A1A1A] dark:text-white mb-1">
                    Verification
                  </div>
                  <div className="text-caption text-[#8E8E93] leading-snug">
                    If required
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-[#F8FAFC] dark:bg-white/[0.03] border-[0.5px] border-[#E2E8F0] dark:border-white/[0.06] rounded-[12px] p-5 text-center">
                  <div className="w-10 h-10 rounded-[8px] bg-emerald-500/10 flex items-center justify-center mb-3 mx-auto">
                    <TrendingUp className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
                  </div>
                  <div className="text-small font-normal text-[#1A1A1A] dark:text-white mb-1">
                    Activation
                  </div>
                  <div className="text-caption text-[#8E8E93] leading-snug">
                    Full access
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notification Banner */}
            <div className="bg-emerald-500/5 border-[0.5px] border-emerald-500/20 rounded-[12px] p-4 mb-8">
              <p className="text-small text-[#1A1A1A] dark:text-white">
                We'll notify you via email as soon as your account is approved.
              </p>
            </div>

            {/* Support Contact */}
            <p className="text-caption text-[#8E8E93] mt-6">
              Questions? <a href="mailto:support@vybe.com" className="text-[#FFC700] hover:underline font-normal">support@vybe.com</a>
            </p>
          </div>
        </div>
        
        {/* Footer Privacy Note */}
        <div className="text-center mt-6">
          <p className="text-caption text-[#8E8E93] tracking-wide">
            End-to-End Encrypted • Institutional Grade Privacy
          </p>
        </div>
      </div>
    </div>
  );
}