import { useParams, Link } from 'react-router';
import { ArrowLeft, Clock, CheckCircle2, User, Award, ArrowRight } from 'lucide-react';
import { mockPropertyCases, mockPartner } from '../data/mock-data';
import { ThemeToggle } from '../components/ThemeToggle';

export function PartnerRouting() {
 const { id } = useParams();
 const property = mockPropertyCases.find(p => p.id === id);

 if (!property) {
 return <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center text-gray-400 dark:text-white/40">Property not found</div>;
 }

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">

 
 {/* Main Content with equal padding for side nav */}
 <div className="px-8">
 {/* Header */}
 <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06]">
 <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
 <Link to={`/property/${id}/habu`} className="flex items-center gap-2 text-small text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors">
 <ArrowLeft className="w-4 h-4" />
 Back to HABU Report
 </Link>
 <div className="flex items-start justify-between">
 <div>
 <div className="text-caption tracking-[0.05em] uppercase text-gray-400 dark:text-white/50 mb-2">
 Partner Assignment
 </div>
 <div className="text-h1 tracking-tight text-gray-900 dark:text-white mb-2">
 Your Execution Partner
 </div>
 <p className="text-small text-gray-600 dark:text-white/50 max-w-2xl">
 Based on your strategy selection and property requirements, we've matched you with a senior execution specialist
 </p>
 </div>
 <div className="hidden md:block">
 <ThemeToggle />
 </div>
 </div>
 </div>
 </div>

 <div className="max-w-5xl mx-auto px-6 py-2.5">
 {/* Partner Card */}
 <div className="bg-white dark:bg-card shadow-card rounded-lg overflow-hidden mb-6">
 <div className="p-12">
 <div className="flex items-start gap-8">
 {/* Partner Photo */}
 <div className="flex-shrink-0">
 <img
 src={mockPartner.photo}
 alt={mockPartner.name}
 className="w-32 h-32 rounded-lg object-cover"
 />
 </div>

 {/* Partner Details */}
 <div className="flex-1">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h2 className="text-h1 tracking-tight text-gray-900 dark:text-white mb-2">
 {mockPartner.name}
 </h2>
 <p className="text-small text-gray-600 dark:text-white/50 mb-1">
 {mockPartner.role}
 </p>
 <p className="text-small text-gray-400 dark:text-white/40">
 {mockPartner.experience}
 </p>
 </div>
 <div className="bg-emerald-500/10 text-emerald-400 px-6 py-2.5 rounded-md text-caption tracking-wide border border-emerald-500/20">
 Verified Expert
 </div>
 </div>

 {/* Expertise Areas */}
 <div className="grid grid-cols-3 gap-4 mt-8">
 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-lg p-5">
 <div className="flex items-center gap-2 mb-2">
 <Award className="w-4 h-4 text-blue-400" />
 <div className="text-caption text-gray-400 dark:text-white/40 tracking-wide uppercase">Projects Led</div>
 </div>
 <div className="text-h2 tracking-tight text-gray-900 dark:text-white/95">42</div>
 </div>

 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-lg p-5">
 <div className="flex items-center gap-2 mb-2">
 <User className="w-4 h-4 text-blue-400" />
 <div className="text-caption text-gray-400 dark:text-white/40 tracking-wide uppercase">Client Rating</div>
 </div>
 <div className="text-h2 tracking-tight text-gray-900 dark:text-white/95">4.9/5</div>
 </div>

 <div className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-lg p-5">
 <div className="flex items-center gap-2 mb-2">
 <CheckCircle2 className="w-4 h-4 text-blue-400" />
 <div className="text-caption text-gray-400 dark:text-white/40 tracking-wide uppercase">Success Rate</div>
 </div>
 <div className="text-h2 tracking-tight text-gray-900 dark:text-white/95">96%</div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* SLA Information */}
 <div className="border-t border-gray-200 dark:border-white/[0.06] bg-brand-navy/[0.02] dark:bg-white/[0.02] p-4 md:p-5 lg:p-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-md bg-blue-500/10 flex items-center justify-center">
 <Clock className="w-5 h-5 text-blue-400" />
 </div>
 <div>
 <div className="text-small text-gray-900 dark:text-white mb-1">Service Level Agreement</div>
 <div className="text-caption text-gray-600 dark:text-white/50">
 {mockPartner.slaTimeline}
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Why This Match */}
 <div className="bg-white dark:bg-card shadow-card rounded-lg p-10 mb-6">
 <h3 className="text-small tracking-[0.05em] uppercase text-gray-400 dark:text-white/50 mb-6">
 Why This Match?
 </h3>
 <div className="space-y-4">
 <div className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
 <div>
 <div className="text-small text-gray-900 dark:text-white mb-1">Relevant Expertise</div>
 <div className="text-small text-gray-600 dark:text-white/50">
 Specialized in commercial office developments with 15+ successful projects in similar markets
 </div>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
 <div>
 <div className="text-small text-gray-900 dark:text-white mb-1">Geographic Knowledge</div>
 <div className="text-small text-gray-600 dark:text-white/50">
 Deep understanding of {property.location} regulatory environment and market dynamics
 </div>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
 <div>
 <div className="text-small text-gray-900 dark:text-white mb-1">Track Record</div>
 <div className="text-small text-gray-600 dark:text-white/50">
 Consistently delivered projects on time and within budget, with average ROI exceeding projections by 8%
 </div>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
 <div>
 <div className="text-small text-gray-900 dark:text-white mb-1">Network Access</div>
 <div className="text-small text-gray-600 dark:text-white/50">
 Strong relationships with local authorities, contractors, and institutional investors
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Action Buttons */}
 <div className="flex items-center gap-4">
 <Link
 to={`/property/${id}/execution`}
 className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-navy dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-md hover:bg-brand-navy/90 dark:hover:bg-white/90 transition-colors text-small tracking-wide"
 >
 Accept & Begin Execution
 <ArrowRight className="w-4 h-4" />
 </Link>
 <button className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-navy/5 dark:bg-white/5 text-gray-900/95 dark:text-white/95 px-6 py-2.5 rounded-md hover:bg-brand-navy/10 dark:hover:bg-white/10 transition-colors text-small tracking-wide shadow-card">
 Request Different Partner
 </button>
 </div>

 {/* Additional Information */}
 <div className="mt-8 bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 md:p-5 lg:p-6">
 <p className="text-caption text-gray-600 dark:text-white/50 leading-relaxed">
 Partner assignments are made by our AI system based on expertise match, availability, and historical performance. 
 All partners are vetted professionals with verified credentials and track records.
 </p>
 </div>
 </div>
 </div>
 </div>
 );
}