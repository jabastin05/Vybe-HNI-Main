import { Link, useNavigate } from 'react-router';
import { useCases } from '../contexts/CasesContext';
import {
 Search, FileText, MapPin, Clock, CheckCircle2,
 ArrowRight, Plus, Building2, MapPinned, MessageCircle,
} from 'lucide-react';
import { useState } from 'react';
import { RMAccess } from '../components/RMAccess';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { SwipeableCard } from '../components/SwipeableCard';

export function CaseManagement() {
 const { cases } = useCases();
 const navigate = useNavigate();
 const [searchQuery, setSearchQuery] = useState('');
 const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Closed'>('All');

 const filteredCases = cases.filter(c => {
 const matchSearch =
 c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
 c.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
 c.serviceRequested.toLowerCase().includes(searchQuery.toLowerCase());
 const matchStatus = statusFilter === 'All' || c.status === statusFilter;
 return matchSearch && matchStatus;
 });

 const getServiceColor = (service: string) => {
 switch (service) {
 case 'HABU Report': return 'bg-brand-primary/[0.08] text-brand-primary border-brand-primary/15 dark:bg-brand-primary/15 dark:text-white dark:border-brand-primary/20';
 case 'Property Service': return 'bg-brand-accent/[0.10] text-[#0C7F86] border-brand-accent/20 dark:bg-brand-accent/15 dark:text-brand-accent dark:border-brand-accent/20';
 case 'Lease & Rent': return 'bg-[#EEF6FF] text-[#215A93] border-[#CFE4F8] dark:bg-white/[0.06] dark:text-white/80 dark:border-white/10';
 case 'Sell or Liquidate':return 'bg-[#F3F8FC] text-[#3B5B76] border-[#D9E8F4] dark:bg-white/[0.06] dark:text-white/70 dark:border-white/10';
 default: return 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] dark:bg-white/5 dark:text-white/60 dark:border-white/10';
 }
 };

 const getCurrentMilestone = (caseItem: any) => {
 if (!caseItem.milestones?.length) return { title: 'Case submitted', status: 'completed' };
 const firstPending = caseItem.milestones.find((m: any) => m.status === 'pending');
 const lastDone = caseItem.milestones.filter((m: any) => m.status === 'completed').pop();
 return firstPending || lastDone || caseItem.milestones[caseItem.milestones.length - 1];
 };

 const isOwnProperty = (c: any) => c.serviceRequested === 'HABU Report' && !!c.propertyId;
 const isNonOwnProperty = (c: any) => c.serviceRequested === 'HABU Report' && !c.propertyId;

 const openCount = cases.filter(c => c.status === 'Open').length;
 const attentionCases = cases
 .filter(c => c.status === 'Open' && ((c.unreadMessages ?? 0) > 0 || (c.progress ?? 0) < 50))
 .sort((a, b) => (b.unreadMessages ?? 0) - (a.unreadMessages ?? 0) || (a.progress ?? 0) - (b.progress ?? 0));
 const attentionLead = attentionCases[0];

 const getNextStep = (caseItem: any, milestone: any) => {
 if ((caseItem.unreadMessages ?? 0) > 0) {
 return `${caseItem.unreadMessages} unread update${caseItem.unreadMessages > 1 ? 's' : ''}`;
 }
 if (milestone?.status === 'pending') {
 return milestone.title;
 }
 if ((caseItem.progress ?? 0) < 100) {
 return `${caseItem.progress ?? 0}% complete`;
 }
 return 'Review final deliverable';
 };

 return (
 <div className="min-h-screen bg-[#F8FAFC] dark:bg-background">

 {/* ═══════════════════════════════════════════
 MOBILE layout
 ═══════════════════════════════════════════ */}
 <div className="md:hidden">

 {/* Navy hero */}
 <div className="relative bg-brand-navy dark:bg-background px-4 pt-5 pb-0 overflow-hidden">
 <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-brand-gold/[0.06] blur-2xl pointer-events-none" />

 <div className="relative">
 {/* Title row */}
 <div className="flex items-start justify-between mb-4">
 <div>
 <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-brand-gold mb-1">Execution</p>
 <h1 className="text-2xl font-normal text-white tracking-tight leading-none">Cases</h1>
 <p className="text-sm text-white/50 mt-1">Active mandates, status, and next steps</p>
 </div>
 <div className="flex items-center gap-2 mt-0.5">
 <RMAccess variant="dark" />
 <Link
 to="/services/catalog"
 className="flex items-center gap-1.5 px-3.5 py-2 rounded-[14px]
 bg-brand-gold active:bg-brand-gold-active text-brand-navy
 text-xs font-normal
 shadow-[0_4px_12px_rgba(var(--brand-gold-rgb),0.4)]
 active:scale-[0.97] transition-all duration-100"
 >
 <Plus className="w-3.5 h-3.5" strokeWidth={2.8} />
 New
 </Link>
 </div>
 </div>

 {/* Stats row */}
 <div className="grid grid-cols-3 gap-2 mb-4">
 {[
 { value: cases.length, label: 'Total', highlight: false },
 { value: openCount, label: 'Open', highlight: true },
 { value: attentionCases.length, label: 'Attention', highlight: false },
 ].map((s, i) => (
 <div key={i} className="bg-white/[0.08] rounded-2xl py-3 text-center">
 <div className={`text-2xl font-normal leading-none mb-0.5 ${
 s.highlight ? 'text-brand-gold' : 'text-white'
 }`}>{s.value}</div>
 <div className="text-[10px] text-white/45 font-normal">{s.label}</div>
 </div>
 ))}
 </div>

 {attentionLead && (
 <div className="mb-4 rounded-2xl border border-white/[0.12] bg-white/[0.08] p-4">
 <div className="flex items-center justify-between gap-3">
 <div className="min-w-0">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-brand-gold mb-1">
 Priority Queue
 </div>
 <div className="text-sm text-white truncate">{attentionLead.propertyName}</div>
 <div className="text-xs text-white/55 truncate mt-1">
 {attentionLead.subService || attentionLead.serviceRequested} · {getNextStep(attentionLead, getCurrentMilestone(attentionLead))}
 </div>
 </div>
 <Link
 to={`/case/${attentionLead.id}`}
 className="inline-flex items-center gap-1.5 rounded-xl bg-brand-gold px-3 py-2 text-xs font-normal text-brand-navy"
 >
 Open
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>
 )}

 {/* Hero search */}
 <div className="relative mb-4">
 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
 <input
 type="text"
 value={searchQuery}
 onChange={e => setSearchQuery(e.target.value)}
 placeholder="Search cases, properties, or services…"
 className="w-full bg-white/[0.08] border border-white/[0.12] rounded-2xl
 pl-10 pr-4 py-3
 text-sm text-white placeholder:text-white/35
 focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.12]
 transition-colors"
 />
 </div>

 {/* Filter chip rail */}
 <div className="relative -mx-4">
 <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10/12 bg-gradient-to-l from-brand-navy z-10" />
 <div className="flex gap-2 overflow-x-auto pb-4 px-4 scrollbar-hide">
 {(['All', 'Open', 'Closed'] as const).map(s => (
 <button
 key={s}
 onClick={() => setStatusFilter(s)}
 className={`
 flex-shrink-0 px-3.5 py-2 rounded-full
 text-xs font-normal transition-all duration-200 whitespace-nowrap
 ${statusFilter === s
 ? 'bg-brand-gold text-brand-navy'
 : 'bg-white/[0.08] text-white/60 border border-white/[0.12]'
 }
 `}
 >
 {s}
 </button>
 ))}
 </div>
 </div>
 </div>{/* /relative inner */}
 </div>{/* /hero */}

 {/* Cases list */}
 <div className="px-4 pt-4 space-y-3 pb-2">

 {filteredCases.length === 0 ? (
 <div className="flex flex-col items-center justify-center py-12 text-center">
 <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] dark:bg-white/5
 flex items-center justify-center mb-4">
 <FileText className="w-7 h-7 text-[#94A3B8]" />
 </div>
 <h3 className="text-base font-normal text-[#0F172A] dark:text-white mb-1.5">
 {searchQuery || statusFilter !== 'All' ? 'No cases found' : 'No cases yet'}
 </h3>
 <p className="text-sm text-[#94A3B8] mb-5 max-w-[220px]">
 {searchQuery || statusFilter !== 'All'
 ? 'Try adjusting your search or filter'
 : 'Request a service to create your first case'}
 </p>
 {!searchQuery && statusFilter === 'All' && (
 <Link
 to="/services/catalog"
 className="flex items-center gap-2 bg-brand-navy text-white
 px-5 py-3 rounded-xl text-sm font-normal"
 >
 <Plus className="w-4 h-4" />
 Request Service
 </Link>
 )}
 </div>
 ) : (
 <>
 <p className="text-[10px] font-normal tracking-[0.08em] uppercase text-[#B0BAC9] dark:text-white/25 px-1 pb-1">
 {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} · swipe left for actions
 </p>

 {filteredCases.map(caseItem => {
 const milestone = getCurrentMilestone(caseItem);
 const isOpen = caseItem.status === 'Open';
 const nextStep = getNextStep(caseItem, milestone);

 return (
 <SwipeableCard
 key={caseItem.id}
 className="rounded-2xl overflow-hidden"
 onTap={() => navigate(`/case/${caseItem.id}`)}
 actions={[
 {
 icon: <MessageCircle className="w-5 h-5" strokeWidth={1.5} />,
 label: 'Chat',
 bgColor: 'bg-brand-navy',
 textColor: 'text-white',
 onClick: () => navigate(`/case/${caseItem.id}/chat`),
 },
 {
 icon: <ArrowRight className="w-5 h-5" strokeWidth={1.5} />,
 label: 'Details',
 bgColor: 'bg-brand-gold',
 textColor: 'text-brand-navy',
 onClick: () => navigate(`/case/${caseItem.id}`),
 },
 ]}
 >
 <div className="flex bg-white dark:bg-card
 border border-[#F1F5F9] dark:border-white/[0.06]
 rounded-2xl overflow-hidden
 shadow-[0_2px_12px_rgba(var(--brand-navy-rgb),0.06)]
 active:scale-[0.99] transition-transform duration-100">

 {/* Left accent bar — gold if open, muted if closed */}
 <div className={`w-[3px] flex-shrink-0 ${isOpen ? 'bg-brand-gold' : 'bg-[#94A3B8]/40'}`} />

 <div className="flex-1 p-4">

 {/* Row 1: Case ID eyebrow + status badge */}
 <div className="flex items-center justify-between gap-2 mb-2">
 <span className="text-[10px] font-normal tracking-[0.08em] uppercase text-[#94A3B8] dark:text-white/35">
 {caseItem.caseId}
 </span>
 <span className={`text-[10px] font-normal tracking-[0.06em] uppercase px-2.5 py-1 rounded-full ${
 isOpen
 ? 'bg-brand-gold/15 text-brand-gold'
 : 'bg-[#94A3B8]/10 text-[#94A3B8] dark:text-white/35'
 }`}>
 {caseItem.status}
 </span>
 </div>

 {/* Row 2: Property name */}
 <h3 className="text-sm font-normal text-[#0F172A] dark:text-white truncate mb-2
 tracking-[-0.01em]">
 {caseItem.propertyName}
 </h3>

 {/* Row 3: Service type + ownership badges */}
 <div className="flex items-center gap-2 flex-wrap mb-3">
 <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-normal ${
 getServiceColor(caseItem.serviceRequested)
 }`}>
 <FileText className="w-2.5 h-2.5 flex-shrink-0" />
 <span className="truncate max-w-[120px]">{caseItem.subService || caseItem.serviceRequested}</span>
 </span>
 {isOwnProperty(caseItem) && (
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-normal bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-brand-gold/10 dark:text-emerald-300 dark:border-brand-gold/20">
 <Building2 className="w-2.5 h-2.5 flex-shrink-0" />
 Own
 </span>
 )}
 {isNonOwnProperty(caseItem) && (
 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-normal bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20">
 <MapPinned className="w-2.5 h-2.5 flex-shrink-0" />
 Non-Owned
 </span>
 )}
 </div>

 {/* Footer: next step + location */}
 <div className="flex items-center justify-between pt-3
 border-t border-[#F1F5F9] dark:border-white/[0.05]">
 <div className="flex items-center gap-1.5 min-w-0">
 {milestone.status === 'completed' && milestone.title.toLowerCase().includes('closed')
 ? <CheckCircle2 className="w-3 h-3 text-brand-gold flex-shrink-0" />
 : <Clock className="w-3 h-3 text-[#94A3B8] flex-shrink-0" />
 }
 <div className="min-w-0">
 <div className="text-[10px] font-normal tracking-[0.08em] uppercase text-[#B0BAC9] dark:text-white/25">
 Next Step
 </div>
 <span className="text-xs text-[#94A3B8] dark:text-white/40 truncate block">
 {nextStep}
 </span>
 </div>
 </div>
 <div className="flex items-center gap-1 flex-shrink-0 ml-2 text-[#94A3B8] dark:text-white/30">
 <MapPin className="w-3 h-3 flex-shrink-0" />
 <span className="text-[10px] truncate max-w-[80px]">{caseItem.propertyLocation}</span>
 </div>
 </div>
 </div>
 </div>
 </SwipeableCard>
 );
 })}
 </>
 )}
 </div>
 </div>

 {/* ═══════════════════════════════════════════
 DESKTOP layout (unchanged from before)
 ═══════════════════════════════════════════ */}
 <div className="hidden md:block">

 {/* Page header */}
 <div className="border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-gold mb-2">
 Execution
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">
 Cases
 </h1>
 <p className="text-small text-[#475569] dark:text-white/50 mt-1">
 Active mandates, progress, and next actions across your portfolio
 </p>
 </div>
 <div className="flex items-center gap-3">
 <Link
 to="/services/catalog"
 className="bg-brand-navy hover:bg-brand-navy-hover text-white
 px-5 py-2.5 rounded-xl text-small font-normal transition-all
 hover:shadow-[0_4px_16px_rgba(var(--brand-navy-rgb),0.35)] hover:-translate-y-0.5
 flex items-center justify-center gap-2"
 >
 <Plus className="w-4 h-4" />
 <span>Request Service</span>
 </Link>
 <RMAccess />
 <NotificationDropdown />
 <ThemeToggle />
 </div>
 </div>
 </div>
 </div>

 <div className="max-w-[1200px] mx-auto container-padding pt-5 md:pt-6">

 {/* Search & Filters */}
 <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
 <div className="flex-1 relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
 <input
 type="text"
 value={searchQuery}
 onChange={e => setSearchQuery(e.target.value)}
 placeholder="Search by case ID, property, or service…"
 className="w-full bg-white dark:bg-card
 border border-[#E2E8F0] dark:border-white/[0.08]
 rounded-xl pl-11 pr-4 py-3 text-small text-[#0F172A] dark:text-white
 placeholder:text-[#94A3B8]
 focus:outline-none focus:border-brand-navy/40 dark:focus:border-white/20
 focus:ring-2 focus:ring-brand-navy/[0.08] dark:focus:ring-white/[0.05]
 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
 />
 </div>
 <div className="flex items-center gap-1 bg-white dark:bg-card
 border border-[#E2E8F0] dark:border-white/[0.08]
 rounded-xl p-1">
 {(['All', 'Open', 'Closed'] as const).map(s => (
 <button
 key={s}
 onClick={() => setStatusFilter(s)}
 className={`px-4 py-2.5 min-h-[44px] rounded-lg text-small font-normal transition-all ${
 statusFilter === s
 ? 'bg-brand-navy text-white'
 : 'text-[#475569] dark:text-white/50 hover:text-[#0F172A] dark:hover:text-white'
 }`}
 >
 {s}
 </button>
 ))}
 </div>
 </div>

 {/* Stats row */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 md:mt-5">
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-2xl card-padding">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-2">Total Cases</div>
 <div className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">{cases.length}</div>
 </div>
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-2xl card-padding">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-2">Open Cases</div>
 <div className="text-h1 font-normal tracking-tight text-brand-gold">{openCount}</div>
 </div>
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-2xl card-padding">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-2">Needs Attention</div>
 <div className="text-h1 font-normal tracking-tight text-[#475569] dark:text-white/50">{attentionCases.length}</div>
 </div>
 </div>

 {attentionLead && (
 <div className="mt-4 md:mt-5 rounded-2xl border border-[#D9E8F4] dark:border-white/[0.08] bg-white dark:bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
 <div className="min-w-0">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-brand-primary mb-2">Priority Queue</div>
 <div className="text-h3 font-normal tracking-tight text-[#0F172A] dark:text-white truncate">
 {attentionLead.propertyName}
 </div>
 <div className="text-small text-[#475569] dark:text-white/50 mt-1">
 {attentionLead.subService || attentionLead.serviceRequested} · {attentionLead.propertyLocation}
 </div>
 <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-primary/[0.08] px-3 py-2 text-small text-brand-primary dark:bg-white/[0.06] dark:text-white/80">
 <Clock className="w-3.5 h-3.5" />
 <span>Next step: {getNextStep(attentionLead, getCurrentMilestone(attentionLead))}</span>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <button
 onClick={() => navigate(`/case/${attentionLead.id}/chat`)}
 className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#D9E8F4] dark:border-white/10 px-4 py-2.5 text-small text-brand-navy dark:text-white"
 >
 <MessageCircle className="w-3.5 h-3.5" />
 Chat
 </button>
 <Link
 to={`/case/${attentionLead.id}`}
 className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-navy px-4 py-2.5 text-small font-normal text-white"
 >
 Open Case
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>
 </div>
 )}

 {/* Empty state */}
 {filteredCases.length === 0 ? (
 <div className="mt-6 bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-2xl p-6 md:p-12 lg:p-16 text-center">
 <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
 <FileText className="w-8 h-8 text-[#94A3B8]" />
 </div>
 <h3 className="text-h2 font-normal text-[#0F172A] dark:text-white mb-2">
 {searchQuery || statusFilter !== 'All' ? 'No cases found' : 'No cases yet'}
 </h3>
 <p className="text-small text-[#475569] dark:text-white/50 mb-6">
 {searchQuery || statusFilter !== 'All'
 ? 'Try adjusting your search or filters'
 : 'Request a service to create your first case'}
 </p>
 {!searchQuery && statusFilter === 'All' && (
 <Link to="/services/catalog" className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-hover text-white px-6 py-2.5 rounded-xl text-small font-normal transition-all">
 <Plus className="w-4 h-4" />Request Service
 </Link>
 )}
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-5 md:mt-6">
 {filteredCases.map(caseItem => {
 const milestone = getCurrentMilestone(caseItem);
 const MilestoneIcon = milestone.status === 'completed' && milestone.title.toLowerCase().includes('closed')
 ? CheckCircle2 : Clock;
 const nextStep = getNextStep(caseItem, milestone);

 return (
 <div
 key={caseItem.id}
 className="group bg-white dark:bg-card
 border border-[#E2E8F0] dark:border-white/[0.06]
 rounded-2xl card-padding
 hover:shadow-[0_8px_32px_rgba(var(--brand-navy-rgb),0.12)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
 hover:-translate-y-0.5 transition-all duration-[250ms]
 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
 >
 <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
 <div className="flex-1 min-w-0">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-1">Case ID</div>
 <div className="text-body font-normal text-[#0F172A] dark:text-white tracking-tight">{caseItem.caseId}</div>
 </div>
 <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-normal max-w-[140px] ${
 caseItem.status === 'Open'
 ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/25'
 : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] dark:bg-white/5 dark:text-white/40 dark:border-white/10'
 }`}>
 <MilestoneIcon className="w-3 h-3 flex-shrink-0" />
 <span className="truncate">{milestone.title}</span>
 </div>
 </div>

 <div className="flex flex-wrap items-center gap-2 mb-4">
 <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-normal max-w-[200px] ${getServiceColor(caseItem.serviceRequested)}`}>
 <FileText className="w-3 h-3 flex-shrink-0" />
 <span className="truncate">{caseItem.subService || caseItem.serviceRequested}</span>
 </div>
 {isOwnProperty(caseItem) && (
 <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-normal bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-brand-gold/10 dark:text-emerald-300 dark:border-brand-gold/20">
 <Building2 className="w-3 h-3 flex-shrink-0" />
 <span className="truncate">Own Property</span>
 </div>
 )}
 {isNonOwnProperty(caseItem) && (
 <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-normal bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20">
 <MapPinned className="w-3 h-3 flex-shrink-0" />
 <span className="truncate">Non-Owned</span>
 </div>
 )}
 </div>

 <div className="space-y-1.5 mb-5 pb-5 border-b border-[#E2E8F0] dark:border-white/[0.06]">
 <div className="text-body font-normal text-[#0F172A] dark:text-white truncate">{caseItem.propertyName}</div>
 <div className="flex items-center gap-2 text-small text-[#475569] dark:text-white/50 min-w-0">
 <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
 <span className="truncate">{caseItem.propertyLocation}</span>
 </div>
 </div>

 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
 <div className="order-2 sm:order-1">
 <div className="text-[10px] font-normal tracking-[0.08em] uppercase text-[#B0BAC9] dark:text-white/25 mb-1">
 Next Step
 </div>
 <div className="text-xs text-[#94A3B8]">
 {nextStep}
 </div>
 </div>
 <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
 <button
 onClick={e => { e.stopPropagation(); navigate(`/case/${caseItem.id}/chat`); }}
 className="relative flex items-center justify-center gap-1.5
 px-3 py-2 rounded-xl border text-small font-normal
 bg-[#F8FAFC] dark:bg-white/5 text-brand-navy dark:text-white
 border-[#E2E8F0] dark:border-white/10
 hover:bg-brand-navy hover:text-white hover:border-brand-navy
 transition-all flex-1 sm:flex-initial"
 >
 <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
 Chat
 </button>
 <Link
 to={`/case/${caseItem.id}`}
 className="flex items-center justify-center gap-1.5
 px-3 py-2 rounded-xl text-small font-normal
 bg-brand-navy text-white hover:bg-brand-navy-hover
 hover:shadow-[0_4px_12px_rgba(var(--brand-navy-rgb),0.3)]
 transition-all flex-1 sm:flex-initial"
 >
 <span className="hidden sm:inline">View Details</span>
 <span className="sm:hidden">Details</span>
 <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
 </Link>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
