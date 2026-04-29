import { Link, useNavigate } from 'react-router';
import { useCases } from '../contexts/CasesContext';
import {
 Search, FileText, MapPin, Clock, CheckCircle2,
 ArrowRight, Plus, Building2, MapPinned, MessageCircle, ChevronRight,
 Sparkles, Key, Wrench, TrendingUp,
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
 case 'HABU Report': return 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20';
 case 'Property Service': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20';
 case 'Lease & Rent': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-brand-gold/8 dark:text-emerald-300 dark:border-brand-gold/20';
 case 'Sell or Liquidate':return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/20';
 default: return 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-white/60 dark:border-white/10';
 }
 };

 const getServiceIcon = (service: string) => {
 switch (service) {
 case 'HABU Report': return { Icon: Sparkles, bg: 'bg-violet-50 dark:bg-violet-500/10', color: 'text-violet-600 dark:text-violet-400' };
 case 'Lease & Rent': return { Icon: Key, bg: 'bg-emerald-50 dark:bg-emerald-500/10', color: 'text-emerald-600 dark:text-emerald-400' };
 case 'Sell or Liquidate': return { Icon: TrendingUp, bg: 'bg-orange-50 dark:bg-orange-500/10', color: 'text-orange-600 dark:text-orange-400' };
 case 'Property Service': return { Icon: Wrench, bg: 'bg-blue-50 dark:bg-blue-500/10', color: 'text-blue-600 dark:text-blue-400' };
 default: return { Icon: FileText, bg: 'bg-gray-100 dark:bg-white/[0.06]', color: 'text-gray-500 dark:text-white/50' };
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
 const closedCount = cases.filter(c => c.status === 'Closed').length;

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-background">

 {/* ═══════════════════════════════════════════
 MOBILE layout
 ═══════════════════════════════════════════ */}
 <div className="md:hidden">

 {/* ── Hero ── */}
 <div className="relative bg-gradient-to-br from-[#0B3360] via-brand-navy to-brand-primary/75 dark:from-background dark:to-background px-5 pt-6 pb-6 overflow-hidden">
 <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-brand-secondary/[0.05] blur-3xl pointer-events-none" />
 <div className="relative">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-xs tracking-[0.16em] uppercase text-white/40 mb-2">Services</p>
 <h1 className="text-3xl font-normal text-white tracking-tight leading-none">Cases</h1>
 <p className="text-sm text-white/50 mt-2">
 {openCount} open · {closedCount} closed
 </p>
 </div>
 <div className="flex items-center gap-2">
 <RMAccess variant="dark" />
 <Link
 to="/services/catalog"
 className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl
 bg-white/15 active:bg-white/25 text-white
 text-xs font-normal transition-all duration-200"
 >
 <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
 New
 </Link>
 </div>
 </div>
 </div>
 </div>

 {/* ── Search + filter ── */}
 <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.05]">
 <div className="px-4 pt-3 pb-0">
 <div className="relative">
 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input
 type="text"
 value={searchQuery}
 onChange={e => setSearchQuery(e.target.value)}
 placeholder="Search cases…"
 className="w-full bg-gray-50 dark:bg-white/[0.04] rounded-xl
 pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white
 placeholder:text-gray-400 dark:placeholder:text-white/30
 focus:outline-none focus:ring-2 focus:ring-brand-primary/20
 transition-all duration-200"
 />
 </div>
 </div>
 <div className="flex overflow-x-auto scrollbar-hide">
 {(['All', 'Open', 'Closed'] as const).map(s => (
 <button
 key={s}
 onClick={() => setStatusFilter(s)}
 className={`flex-shrink-0 px-5 py-3.5 text-xs font-normal whitespace-nowrap transition-all duration-200 border-b-2 ${
 statusFilter === s
 ? 'text-brand-primary border-brand-primary'
 : 'text-gray-400 border-transparent'
 }`}
 >
 {s}
 </button>
 ))}
 </div>
 </div>

 {/* ── Cases list ── */}
 {filteredCases.length === 0 ? (
 <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
 <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
 <FileText className="w-7 h-7 text-gray-400" strokeWidth={1.5} />
 </div>
 <h3 className="text-base font-normal text-gray-900 dark:text-white mb-2">
 {searchQuery || statusFilter !== 'All' ? 'No cases found' : 'No cases yet'}
 </h3>
 <p className="text-sm text-gray-400 mb-6 max-w-[220px] leading-relaxed">
 {searchQuery || statusFilter !== 'All' ? 'Try adjusting your search or filter' : 'Request a service to create your first case'}
 </p>
 {!searchQuery && statusFilter === 'All' && (
 <Link to="/services/catalog" className="flex items-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-xl text-sm font-normal">
 <Plus className="w-4 h-4" strokeWidth={1.5} />
 Request Service
 </Link>
 )}
 </div>
 ) : (
 <div className="px-4 pt-5 pb-4">
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden">
 {filteredCases.map((caseItem, idx) => {
 const milestone = getCurrentMilestone(caseItem);
 const isOpen = caseItem.status === 'Open';
 return (
 <SwipeableCard
 key={caseItem.id}
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
 bgColor: 'bg-brand-primary',
 textColor: 'text-white',
 onClick: () => navigate(`/case/${caseItem.id}`),
 },
 ]}
 >
 <div
 className={`flex items-center gap-4 px-5 py-4 bg-white dark:bg-card active:bg-gray-50 dark:active:bg-white/[0.03] transition-colors duration-150 cursor-pointer ${
 idx < filteredCases.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''
 }`}
 onClick={() => navigate(`/case/${caseItem.id}`)}
 >
 {/* Service icon */}
 {(() => { const { Icon, bg, color } = getServiceIcon(caseItem.serviceRequested); return (
 <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
 <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.5} />
 </div>
 ); })()}
 {/* Content */}
 <div className="flex-1 min-w-0">
 <div className="flex items-start justify-between gap-2 mb-1">
 <h3 className="text-sm font-normal text-gray-900 dark:text-white truncate">{caseItem.propertyName}</h3>
 <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
 isOpen ? 'text-brand-primary bg-brand-primary/8' : 'text-gray-400 bg-gray-100 dark:bg-white/8 dark:text-white/40'
 }`}>
 {caseItem.status}
 </span>
 </div>
 <p className="text-xs text-gray-500 dark:text-white/40 truncate mb-1">{caseItem.subService || caseItem.serviceRequested}</p>
 <div className="flex items-center gap-1.5">
 <Clock className="w-3 h-3 text-gray-300 dark:text-white/20 flex-shrink-0" strokeWidth={1.5} />
 <p className="text-xs text-gray-400 dark:text-white/30 truncate">{milestone.title}</p>
 </div>
 </div>
 <ChevronRight className="w-4 h-4 text-gray-300 dark:text-white/20 flex-shrink-0 mt-1" strokeWidth={1.5} />
 </div>
 </SwipeableCard>
 );
 })}
 </div>
 </div>
 )}
 </div>

 {/* ═══════════════════════════════════════════
 DESKTOP layout (unchanged from before)
 ═══════════════════════════════════════════ */}
 <div className="hidden md:block">

 {/* Page header */}
 <div className="border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-gold mb-2">
 Service Tracking
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
 Case Management
 </h1>
 <p className="text-small text-gray-600 dark:text-white/50 mt-1">
 Track and manage all service requests across your property portfolio
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
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input
 type="text"
 value={searchQuery}
 onChange={e => setSearchQuery(e.target.value)}
 placeholder="Search by case ID, property, or service…"
 className="w-full bg-white dark:bg-card
 shadow-card
 rounded-xl pl-11 pr-4 py-3 text-small text-gray-900 dark:text-white
 placeholder:text-gray-400
 focus:outline-none focus:border-brand-navy/40 dark:focus:border-white/20
 focus:ring-2 focus:ring-brand-navy/[0.08] dark:focus:ring-white/[0.05]
 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
 />
 </div>
 <div className="flex items-center gap-1 bg-white dark:bg-card
 shadow-card
 rounded-xl p-1">
 {(['All', 'Open', 'Closed'] as const).map(s => (
 <button
 key={s}
 onClick={() => setStatusFilter(s)}
 className={`px-4 py-2.5 min-h-[44px] rounded-lg text-small font-normal transition-all ${
 statusFilter === s
 ? 'bg-brand-navy text-white'
 : 'text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white'
 }`}
 >
 {s}
 </button>
 ))}
 </div>
 </div>

 {/* Stats row */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 md:mt-5">
 <div className="bg-white dark:bg-card shadow-card rounded-2xl card-padding">
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-gray-400 mb-2">Total Cases</div>
 <div className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">{cases.length}</div>
 </div>
 <div className="bg-white dark:bg-card shadow-card rounded-2xl card-padding">
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-gray-400 mb-2">Open Cases</div>
 <div className="text-h1 font-normal tracking-tight text-brand-gold">{openCount}</div>
 </div>
 <div className="bg-white dark:bg-card shadow-card rounded-2xl card-padding">
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-gray-400 mb-2">Closed Cases</div>
 <div className="text-h1 font-normal tracking-tight text-gray-600 dark:text-white/50">{closedCount}</div>
 </div>
 </div>

 {/* Empty state */}
 {filteredCases.length === 0 ? (
 <div className="mt-6 bg-white dark:bg-card shadow-card rounded-2xl p-6 md:p-12 lg:p-16 text-center">
 <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
 <FileText className="w-8 h-8 text-gray-400" />
 </div>
 <h3 className="text-h2 font-normal text-gray-900 dark:text-white mb-2">
 {searchQuery || statusFilter !== 'All' ? 'No cases found' : 'No cases yet'}
 </h3>
 <p className="text-small text-gray-600 dark:text-white/50 mb-6">
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

 return (
 <div
 key={caseItem.id}
 className="group bg-white dark:bg-card
 shadow-card
 rounded-2xl card-padding
 hover:shadow-[0_8px_32px_rgba(var(--brand-navy-rgb),0.12)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
 hover:-translate-y-0.5 transition-all duration-200
 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
 >
 <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
 <div className="flex-1 min-w-0">
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-gray-400 mb-1">Case ID</div>
 <div className="text-body font-normal text-gray-900 dark:text-white tracking-tight">{caseItem.caseId}</div>
 </div>
 <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-normal max-w-[140px] ${
 caseItem.status === 'Open'
 ? 'bg-brand-gold/8 text-brand-gold border-brand-gold/25'
 : 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-white/40 dark:border-white/10'
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
 <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-normal bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-brand-gold/8 dark:text-emerald-300 dark:border-brand-gold/20">
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

 <div className="space-y-1.5 mb-5 pb-5 border-b border-gray-200 dark:border-white/[0.06]">
 <div className="text-body font-normal text-gray-900 dark:text-white truncate">{caseItem.propertyName}</div>
 <div className="flex items-center gap-2 text-small text-gray-600 dark:text-white/50 min-w-0">
 <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
 <span className="truncate">{caseItem.propertyLocation}</span>
 </div>
 </div>

 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
 <div className="text-xs text-gray-400 order-2 sm:order-1">
 Created {new Date(caseItem.dateCreated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
 </div>
 <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
 <button
 onClick={e => { e.stopPropagation(); navigate(`/case/${caseItem.id}/chat`); }}
 className="relative flex items-center justify-center gap-1.5
 px-3 py-2 rounded-xl border text-small font-normal
 bg-gray-50 dark:bg-white/5 text-brand-navy dark:text-white
 border-gray-200 dark:border-white/10
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
