import { useState } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Link } from 'react-router';
import { 
  Mail, 
  Phone,
  HeadphonesIcon,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  BookOpen,
  Search,
  ArrowLeft
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'property' | 'documents' | 'billing' | 'security';
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I upload a new property to VYBE?',
    answer: 'Navigate to the Dashboard and click on "Add Property" or use the Upload button in the navigation menu. You can upload property documents (land records, sale deeds, etc.) and our AI will analyze the property details. The HABU intelligence engine will then provide comprehensive insights and recommendations.',
    category: 'property'
  },
  {
    id: '2',
    question: 'What types of documents can I upload to the Document Vault?',
    answer: 'You can upload various property-related documents including Land Records, Title Deeds, Sale Deeds, Tax Documents, Survey Maps, Approvals & Permits, Legal Documents, and Financial Records. Supported formats include PDF, JPG, PNG, and TIFF files up to 10MB each.',
    category: 'documents'
  },
  {
    id: '3',
    question: 'How does the HABU Report work?',
    answer: 'HABU (Highest and Best Use) is our proprietary AI-powered analysis engine that evaluates your property across multiple dimensions including market potential, zoning possibilities, financial projections, and development opportunities. The report provides actionable strategies ranked by potential ROI and feasibility.',
    category: 'property'
  },
  {
    id: '4',
    question: 'Is my data secure on VYBE?',
    answer: 'Yes. We employ bank-grade encryption (AES-256) for all data at rest and in transit. Your documents are stored in ISO 27001 certified data centers with redundant backups. We never share your data with third parties without explicit consent. Access logs are maintained for all sensitive operations.',
    category: 'security'
  },
];

const categories = [
  { id: 'all', label: 'All Topics' },
  { id: 'general', label: 'General' },
  { id: 'property', label: 'Properties' },
  { id: 'documents', label: 'Documents' },
  { id: 'billing', label: 'Billing' },
  { id: 'security', label: 'Security' },
];

export function HelpSupport() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0a0a0a] transition-colors duration-300">

      
      {/* Header */}
      <div className="border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-[#0d1b2e]">
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/settings"
                className="flex items-center gap-2 text-small text-[#475569] dark:text-white/50 hover:text-[#0F172A] dark:hover:text-white mb-3 md:mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Settings
              </Link>
              <div className="text-h1 tracking-tight text-[#0F172A] dark:text-white">
                Help & Support
              </div>
              <p className="text-small text-[#475569] dark:text-white/50 mt-1">
                Get help and find answers to common questions
              </p>
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Us Card */}
            <div className="rounded-xl bg-white/80 dark:bg-[#0d1b2e] backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] p-4 md:p-5 lg:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#C9A75D]/20 dark:bg-[#C9A75D]/10 flex items-center justify-center">
                  <HeadphonesIcon className="w-6 h-6 text-[#C9A75D]" />
                </div>
                <div>
                  <div className="text-h2 tracking-tight font-normal text-[#0F172A] dark:text-white">
                    Contact Us
                  </div>
                  <div className="text-small text-[#475569] dark:text-white/50">
                    We're here to help
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-4 p-4 rounded-xl bg-white/60 dark:bg-white/[0.05] border border-[#E2E8F0] dark:border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C9A75D]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C9A75D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-caption tracking-[0.05em] uppercase text-[#8E8E93] mb-1">
                      Email Support
                    </div>
                    <a 
                      href="mailto:support@vybe.in"
                      className="text-small font-normal text-[#C9A75D] hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors break-all"
                    >
                      support@vybe.in
                    </a>
                    <div className="text-caption text-[#475569] dark:text-white/50 mt-1">
                      24-48 hour response time
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.05] border border-[#E2E8F0] dark:border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C9A75D]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C9A75D]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-caption tracking-[0.05em] uppercase text-[#8E8E93] mb-1">
                      Phone Support
                    </div>
                    <a 
                      href="tel:+918047182000"
                      className="text-small font-normal text-[#C9A75D] hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors font-mono"
                    >
                      +91 80471 82000
                    </a>
                    <div className="text-caption text-[#475569] dark:text-white/50 mt-1">
                      Mon-Fri, 9:00 AM - 6:00 PM IST
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Card */}
            <div className="rounded-xl bg-white/80 dark:bg-[#0d1b2e] backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] p-4 md:p-5 lg:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-[#C9A75D]" />
                <div className="text-body font-normal text-[#0F172A] dark:text-white">
                  Helpful Resources
                </div>
              </div>
              <div className="space-y-2">
                <a 
                  href="#" 
                  className="block p-3 rounded-lg hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="text-small font-normal text-[#0F172A] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Getting Started Guide
                  </div>
                  <div className="text-caption text-[#475569] dark:text-white/50 mt-0.5">
                    Learn the basics of VYBE
                  </div>
                </a>
                <a 
                  href="#" 
                  className="block p-3 rounded-lg hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="text-small font-normal text-[#0F172A] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Video Tutorials
                  </div>
                  <div className="text-caption text-[#475569] dark:text-white/50 mt-0.5">
                    Watch step-by-step guides
                  </div>
                </a>
                <a 
                  href="#" 
                  className="block p-3 rounded-lg hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="text-small font-normal text-[#0F172A] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    API Documentation
                  </div>
                  <div className="text-caption text-[#475569] dark:text-white/50 mt-0.5">
                    For developers
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section - Right Column */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white/80 dark:bg-[#0d1b2e] backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] p-4 md:p-5 lg:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              {/* FAQ Header */}
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-[#C9A75D]" />
                <div className="text-h1 tracking-tight font-normal text-[#0F172A] dark:text-white">
                  Frequently Asked Questions
                </div>
              </div>

              {/* Search Bar */}
              <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] dark:text-white/40" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-white/[0.02] border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-2.5 text-small text-[#0F172A] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-white/40 focus:outline-none focus:border-[#E2E8F0] dark:focus:border-white/20 transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-[#E2E8F0] dark:border-white/[0.06]">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2.5  rounded-lg text-small font-normal transition-all ${
                      selectedCategory === category.id
                        ? 'bg-[#0B1F3A] dark:bg-white text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                        : 'bg-[#0B1F3A]/[0.02] dark:bg-white/[0.02] text-[#475569] dark:text-white/50 hover:bg-[#0B1F3A]/[0.04] dark:hover:bg-white/[0.04] hover:text-[#0F172A] dark:hover:text-white'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              {filteredFAQs.length > 0 ? (
                <div className="space-y-3">
                  {filteredFAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className="rounded-xl bg-white/60 dark:bg-white/[0.02] border border-[#E2E8F0] dark:border-white/[0.06] overflow-hidden transition-all hover:border-emerald-500/30"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-[#0B1F3A]/[0.01] dark:hover:bg-white/[0.01]"
                      >
                        <div className="flex-1">
                          <div className="text-small font-normal text-[#0F172A] dark:text-white">
                            {faq.question}
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C9A75D]/10 flex items-center justify-center">
                          {expandedFAQ === faq.id ? (
                            <ChevronUp className="w-4 h-4 text-[#C9A75D]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#C9A75D]" />
                          )}
                        </div>
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <div className="px-5 pb-5 pt-0">
                          <div className="text-small text-[#0F172A]/70 dark:text-white/70 leading-relaxed border-t border-[#E2E8F0] dark:border-white/[0.06] pt-4">
                            {faq.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#0B1F3A]/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-[#94A3B8] dark:text-white/40" />
                  </div>
                  <p className="text-small text-[#475569] dark:text-white/50">
                    No questions found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 px-4 py-2.5  text-small font-normal text-[#C9A75D] hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {/* Still Need Help */}
              <div className="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-white/[0.06]">
                <div className="text-center">
                  <div className="text-small text-[#475569] dark:text-white/50 mb-3">
                    Still need help? We're here for you.
                  </div>
                  <a
                    href="mailto:support@vybe.in"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B1F3A] dark:bg-white hover:bg-[#0B1F3A]/90 dark:hover:bg-white/90 text-white rounded-lg transition-all text-small font-normal shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)]"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}