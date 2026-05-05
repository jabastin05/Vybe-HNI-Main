import { ArrowLeft, CheckCircle2, Clock, ArrowRight, Briefcase, Star, Target } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';
import { ThemeToggle } from '../components/ThemeToggle';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function PartnerAssignment() {
 const { id, strategyId } = useParams();
 const navigate = useNavigate();

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">

 
 {/* Main Content with responsive padding for side nav */}
 <div className="lg:pl-[88px]">
 {/* Header - Full Width */}
 <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06] shadow-header">
 <div className="max-w-[1500px] mx-auto container-padding py-4 md:py-6">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 {/* Left: Back Button + Page Title */}
 <div className="flex items-start md:items-center gap-4 md:gap-4">
 <Link 
 to={`/property/${id}/habu`}
 className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-navy/[0.04] dark:bg-white/[0.04] hover:bg-brand-navy/[0.08] dark:hover:bg-white/[0.08] flex-shrink-0 transition-colors touch-manipulation"
 >
 <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-white/50" />
 </Link>
 <div className="flex-1 min-w-0">
 <div className="text-caption md:text-caption tracking-wider uppercase text-gray-400 dark:text-white/50 mb-1 md:mb-2">
 Expert Assignment
 </div>
 <div className="text-h2 text-h1 text-h1 tracking-tight text-gray-900 dark:text-white leading-tight">
 Your Expert
 </div>
 <p className="text-small text-gray-600 dark:text-white/60 mt-1 hidden md:block">
 AI-matched senior specialist for your strategy execution
 </p>
 </div>
 </div>

 {/* Right: Theme Toggle */}
 <div className="flex items-center gap-4 md:self-start">
 <div className="hidden md:block">
 <ThemeToggle />
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="max-w-[1500px] mx-auto container-padding py-6 md:py-8 lg:py-10">
 {/* Intro Text */}
 <div className="mb-6 md:mb-8 lg:mb-10">
 <p className="text-small md:text-body text-gray-600 dark:text-white/50 leading-relaxed">
 Based on your strategy selection and property requirements, we've matched you with a senior execution specialist
 </p>
 </div>

 {/* Partner Card */}
 <div className="bg-white dark:bg-card shadow-card rounded-xl overflow-hidden mb-6 md:mb-8">
 <div className="p-4 md:p-4 md:p-5 lg:p-6 lg:p-4 md:p-5 lg:p-6">
 {/* Partner Profile */}
 <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
 {/* Profile Image */}
 <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-brand-navy/5 dark:bg-white/5 flex-shrink-0 mx-auto md:mx-0">
 <ImageWithFallback 
 src="https://images.unsplash.com/photo-1584940120505-117038d90b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMGluZGlhbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkyMzg5OXww&ixlib=rb-4.1.0&q=80&w=1080" 
 alt="Rajesh Malhotra"
 className="w-full h-full object-cover"
 />
 </div>

 {/* Partner Info */}
 <div className="flex-1 w-full text-center md:text-left">
 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
 <div className="flex-1 min-w-0">
 <h2 className="text-h2 md:text-h2 text-h1 tracking-tight text-gray-900 dark:text-white/95 font-semibold mb-2">
 Rajesh Malhotra
 </h2>
 <p className="text-small md:text-body text-gray-600 dark:text-white/50 mb-1">
 Senior Real Estate Strategist
 </p>
 <p className="text-caption md:text-small text-gray-400 dark:text-white/40">
 18 years in commercial development
 </p>
 </div>
 <div className="bg-brand-gold/8 border border-brand-gold/20 text-brand-gold px-3 md:px-4 py-2.5 rounded-lg text-caption md:text-caption font-medium tracking-wide mx-auto md:mx-0 inline-flex items-center justify-center">
 Verified Expert
 </div>
 </div>
 </div>
 </div>

 {/* Stats Grid - Responsive: 1 col mobile, 3 cols tablet+ */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 mb-6 md:mb-8">
 {/* Projects Led */}
 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-xl p-5 md:p-5 lg:p-4 md:p-5 lg:p-6">
 <div className="flex items-center gap-2 mb-2 md:mb-3">
 <Briefcase className="w-4 h-4 text-blue-500" />
 <div className="text-caption md:text-caption tracking-widest uppercase text-gray-400 dark:text-white/40 font-normal">
 Projects Led
 </div>
 </div>
 <div className="text-h1 tracking-tight text-gray-900 dark:text-white/95 font-semibold">
 42
 </div>
 </div>

 {/* Client Rating */}
 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-xl p-5 md:p-5 lg:p-4 md:p-5 lg:p-6">
 <div className="flex items-center gap-2 mb-2 md:mb-3">
 <Star className="w-4 h-4 text-yellow-500" />
 <div className="text-caption md:text-caption tracking-widest uppercase text-gray-400 dark:text-white/40 font-normal">
 Client Rating
 </div>
 </div>
 <div className="text-h1 tracking-tight text-gray-900 dark:text-white/95 font-semibold">
 4.9<span className="text-body md:text-h2 text-gray-400 dark:text-white/40">/5</span>
 </div>
 </div>

 {/* Success Rate */}
 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-xl p-5 md:p-5 lg:p-4 md:p-5 lg:p-6">
 <div className="flex items-center gap-2 mb-2 md:mb-3">
 <Target className="w-4 h-4 text-brand-gold" />
 <div className="text-caption md:text-caption tracking-widest uppercase text-gray-400 dark:text-white/40 font-normal">
 Success Rate
 </div>
 </div>
 <div className="text-h1 tracking-tight text-gray-900 dark:text-white/95 font-semibold">
 96%
 </div>
 </div>
 </div>

 {/* Service Level Agreement */}
 <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-5 md:p-5 flex items-center gap-4 md:gap-4">
 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
 <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
 </div>
 <div className="flex-1 min-w-0">
 <div className="text-caption md:text-small text-gray-900 dark:text-white/95 font-normal mb-1">
 Service Level Agreement
 </div>
 <div className="text-caption md:text-small text-gray-600 dark:text-white/50">
 72 hours for initial consultation
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Why This Match Section */}
 <div className="bg-white dark:bg-card shadow-card rounded-xl overflow-hidden mb-6 md:mb-8">
 <div className="container-padding py-4 md:py-5 lg:py-6 border-b border-gray-200 dark:border-white/[0.06]">
 <h3 className="text-caption md:text-caption tracking-widest uppercase text-gray-400 dark:text-white/40 font-semibold">
 Why This Match?
 </h3>
 </div>
 <div className="p-4 md:p-4 md:p-5 lg:p-6 lg:p-4 md:p-5 lg:p-6">
 <div className="space-y-5 md:space-y-6">
 {/* Relevant Expertise */}
 <div className="flex gap-4 md:gap-4">
 <div className="w-6 h-6 rounded-full bg-brand-gold/8 flex items-center justify-center flex-shrink-0 mt-0.5">
 <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-gold" />
 </div>
 <div className="flex-1 min-w-0">
 <h4 className="text-small md:text-body text-gray-900 dark:text-white/95 font-semibold mb-1.5 md:mb-2">
 Relevant Expertise
 </h4>
 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed">
 Specialized in commercial office developments with 15+ successful projects in similar markets
 </p>
 </div>
 </div>

 {/* Geographic Knowledge */}
 <div className="flex gap-4 md:gap-4">
 <div className="w-6 h-6 rounded-full bg-brand-gold/8 flex items-center justify-center flex-shrink-0 mt-0.5">
 <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-gold" />
 </div>
 <div className="flex-1 min-w-0">
 <h4 className="text-small md:text-body text-gray-900 dark:text-white/95 font-semibold mb-1.5 md:mb-2">
 Geographic Knowledge
 </h4>
 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed">
 Deep understanding of Mumbai, Maharashtra regulatory environment and market dynamics
 </p>
 </div>
 </div>

 {/* Track Record */}
 <div className="flex gap-4 md:gap-4">
 <div className="w-6 h-6 rounded-full bg-brand-gold/8 flex items-center justify-center flex-shrink-0 mt-0.5">
 <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-gold" />
 </div>
 <div className="flex-1 min-w-0">
 <h4 className="text-small md:text-body text-gray-900 dark:text-white/95 font-semibold mb-1.5 md:mb-2">
 Track Record
 </h4>
 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed">
 Consistently delivered projects on time and within budget, with average ROI exceeding projections by 8%
 </p>
 </div>
 </div>

 {/* Network Access */}
 <div className="flex gap-4 md:gap-4">
 <div className="w-6 h-6 rounded-full bg-brand-gold/8 flex items-center justify-center flex-shrink-0 mt-0.5">
 <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-gold" />
 </div>
 <div className="flex-1 min-w-0">
 <h4 className="text-small md:text-body text-gray-900 dark:text-white/95 font-semibold mb-1.5 md:mb-2">
 Network Access
 </h4>
 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed">
 Established relationships with key municipal authorities, contractors, and institutional investors in the region
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Execution Blueprint */}
 <div className="bg-white dark:bg-card shadow-card rounded-xl overflow-hidden mb-6 md:mb-8">
 <div className="container-padding py-4 md:py-5 lg:py-6 border-b border-gray-200 dark:border-white/[0.06]">
 <h3 className="text-small md:text-body tracking-tight text-gray-900 dark:text-white/95 font-semibold">
 Execution Blueprint
 </h3>
 <p className="text-caption md:text-small text-gray-400 dark:text-white/40 mt-1">
 Structured phased execution program with milestone tracking
 </p>
 </div>
 <div className="p-4 md:p-4 md:p-5 lg:p-6 lg:p-4 md:p-5 lg:p-6">
 {/* Timeline Overview */}
 <div className="mb-6 md:mb-8">
 <div className="flex items-center justify-between mb-3">
 <div className="text-caption md:text-caption text-gray-400 dark:text-white/40 uppercase tracking-wider font-normal">Total Timeline</div>
 <div className="text-small md:text-body font-semibold text-gray-900 dark:text-white/95">30-42 Months</div>
 </div>
 <div className="h-2 bg-brand-navy/5 dark:bg-white/5 rounded-full overflow-hidden">
 <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 via-emerald-500 to-cyan-500 rounded-full" style={{ width: '100%' }}></div>
 </div>
 </div>

 {/* Phase 1: Pre-Development */}
 <div className="mb-6">
 <div className="flex items-start gap-4 md:gap-4 mb-4">
 <div className="w-10 h-10 rounded-xl bg-brand-navy dark:bg-white text-white flex items-center justify-center text-small font-semibold flex-shrink-0">
 1
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 mb-3 md:mb-2">
 <h4 className="text-body md:text-body font-semibold text-gray-900 dark:text-white/95">Phase 1: Pre-Development</h4>
 <div className="text-caption md:text-small text-gray-400 dark:text-white/40">0–4 Months</div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
 <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Legal Due Diligence</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Title verification & clearances</div>
 </div>
 <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Concept Design Freeze</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Architectural plans & layouts</div>
 </div>
 <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Financial Feasibility</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Budget & funding structure</div>
 </div>
 <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Expert Assignment</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Core team & consultants</div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Phase 2: Regulatory Approvals */}
 <div className="mb-6">
 <div className="flex items-start gap-4 md:gap-4 mb-4">
 <div className="w-10 h-10 rounded-xl bg-brand-navy dark:bg-white text-white flex items-center justify-center text-small font-semibold flex-shrink-0">
 2
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 mb-3 md:mb-2">
 <h4 className="text-body md:text-body font-semibold text-gray-900 dark:text-white/95">Phase 2: Regulatory Approvals</h4>
 <div className="text-caption md:text-small text-gray-400 dark:text-white/40">4–8 Months</div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
 <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Plan Submission</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Municipal approval</div>
 </div>
 <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Fire & Safety NOC</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Fire department clearance</div>
 </div>
 <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Environmental</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">EC if required</div>
 </div>
 <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Utility Approvals</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Water, power, sewage</div>
 </div>
 <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Building Permit</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Final construction approval</div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Phase 3: Construction */}
 <div className="mb-6">
 <div className="flex items-start gap-4 md:gap-4 mb-4">
 <div className="w-10 h-10 rounded-xl bg-brand-navy dark:bg-white text-white flex items-center justify-center text-small font-semibold flex-shrink-0">
 3
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 mb-3 md:mb-2">
 <h4 className="text-body md:text-body font-semibold text-gray-900 dark:text-white/95">Phase 3: Construction</h4>
 <div className="text-caption md:text-small text-gray-400 dark:text-white/40">8–30 Months</div>
 </div>
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
 <div>
 <div className="text-caption md:text-caption text-gray-400 dark:text-white/40 uppercase tracking-wider mb-3 font-normal">Key Milestones</div>
 <div className="space-y-2">
 <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-lg p-3">
 <div className="flex items-center gap-2 mb-1">
 <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Site Mobilization</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Month 1</div>
 </div>
 <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-lg p-3">
 <div className="flex items-center gap-2 mb-1">
 <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Foundation Complete</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Month 4</div>
 </div>
 <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-lg p-3">
 <div className="flex items-center gap-2 mb-1">
 <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Structural Completion</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Month 16</div>
 </div>
 <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-lg p-3">
 <div className="flex items-center gap-2 mb-1">
 <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">MEP & Finishing</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Month 20-28</div>
 </div>
 <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-lg p-3">
 <div className="flex items-center gap-2 mb-1">
 <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">OC & Handover</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Month 30</div>
 </div>
 </div>
 </div>
 <div>
 <div className="text-caption md:text-caption text-gray-400 dark:text-white/40 uppercase tracking-wider mb-3 font-normal">Monitoring KPIs</div>
 <div className="space-y-3">
 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-lg p-4">
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50 mb-2">Budget Variance</div>
 <div className="flex items-baseline gap-1">
 <div className="text-body md:text-h2 font-semibold text-brand-gold dark:text-emerald-400">±3</div>
 <div className="text-caption md:text-small text-gray-400 dark:text-white/40">%</div>
 </div>
 </div>
 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-lg p-4">
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50 mb-2">Timeline Adherence</div>
 <div className="flex items-baseline gap-1">
 <div className="text-body md:text-h2 font-semibold text-brand-gold dark:text-emerald-400">95</div>
 <div className="text-caption md:text-small text-gray-400 dark:text-white/40">%</div>
 </div>
 </div>
 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-lg p-4">
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50 mb-2">Quality Score</div>
 <div className="flex items-baseline gap-1">
 <div className="text-body md:text-h2 font-semibold text-brand-gold dark:text-emerald-400">4.8</div>
 <div className="text-caption md:text-small text-gray-400 dark:text-white/40">/5</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Phase 4: Monetization */}
 <div className="mb-6">
 <div className="flex items-start gap-4 md:gap-4 mb-4">
 <div className="w-10 h-10 rounded-xl bg-brand-navy dark:bg-white text-white flex items-center justify-center text-small font-semibold flex-shrink-0">
 4
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 mb-3 md:mb-2">
 <h4 className="text-body md:text-body font-semibold text-gray-900 dark:text-white/95">Phase 4: Monetization & Exit</h4>
 <div className="text-caption md:text-small text-gray-400 dark:text-white/40">Ongoing</div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
 <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Pre-Launch Marketing</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Brand positioning</div>
 </div>
 <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Sales/Leasing</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Absorption targets</div>
 </div>
 <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 md:p-4">
 <div className="flex items-center gap-2 mb-2">
 <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
 <div className="text-caption md:text-small font-semibold text-gray-900 dark:text-white/95">Revenue Realization</div>
 </div>
 <div className="text-caption md:text-caption text-gray-600 dark:text-white/50">Exit execution</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Action Buttons - Touch-friendly on mobile */}
 <div className="flex items-center gap-4">
 <Link
 to="/cases"
 className="flex-1 bg-brand-navy dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-lg text-small font-semibold tracking-wide transition-all hover:bg-brand-navy/90 dark:hover:bg-white/90 text-center touch-manipulation active:scale-[0.98]"
 >
 Continue with the Blueprint
 </Link>
 </div>
 </div>
 </div>
 </div>
 );
}
