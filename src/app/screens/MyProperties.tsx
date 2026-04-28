import { Link, useNavigate } from 'react-router';
import { Building2, Plus, MapPin, ArrowRight, Layers, Sparkles, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { RMAccess } from '../components/RMAccess';
import { SwipeableCard } from '../components/SwipeableCard';
import { useProperties } from '../contexts/PropertiesContext';

export function MyProperties() {
 const { properties } = useProperties();
 const navigate = useNavigate();
 const [typeFilter, setTypeFilter] = useState('All');

 const formatDate = (d: string) =>
 new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

 const locationLabel = (p: any) =>
 p.city && p.state ? `${p.city}, ${p.state}`
 : p.district && p.state ? `${p.district}, ${p.state}`
 : p.state ? p.state
 : 'N/A';

 const totalTypes = new Set(properties.map(p => p.type)).size;
 const totalCities = new Set(properties.map(p => p.city || p.district || p.state).filter(Boolean)).size;
 const propertyTypes = ['All', ...Array.from(new Set(properties.map(p => p.type).filter(Boolean)))];
 const filteredProperties = typeFilter === 'All'
 ? properties
 : properties.filter(p => p.type === typeFilter);

 return (
 <div className="min-h-screen bg-[#F8FAFC] dark:bg-background transition-colors duration-300">

 {/* ═══════════════════════════════════════════
 MOBILE layout (hidden on md+)
 ═══════════════════════════════════════════ */}
 <div className="md:hidden">

 {/* Navy hero header */}
 <div className="relative bg-brand-navy dark:bg-background px-4 pt-5 pb-0 overflow-hidden">
 {/* decorative glow */}
 <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full
 bg-brand-gold/[0.07] blur-2xl pointer-events-none" />

 <div className="relative">
 <div className="flex items-start justify-between mb-4">
 <div>
 <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-brand-gold mb-1">
 Portfolio
 </p>
 <h1 className="text-2xl font-normal text-white tracking-tight leading-none">
 My Properties
 </h1>
 </div>
 <div className="flex items-center gap-2 mt-0.5">
 <RMAccess variant="dark" />
 <Link
 to="/upload"
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
 {properties.length > 0 && (
 <div className="grid grid-cols-3 gap-2 mb-4">
 {[
 { value: properties.length, label: 'Properties' },
 { value: totalTypes, label: 'Types' },
 { value: totalCities, label: 'Cities' },
 ].map((s, i) => (
 <div key={i} className="bg-white/[0.08] rounded-2xl py-3 text-center">
 <div className={`text-2xl font-normal leading-none mb-0.5 ${
 i === 0 ? 'text-brand-gold' : 'text-white'
 }`}>
 {s.value}
 </div>
 <div className="text-[10px] text-white/45 font-normal">{s.label}</div>
 </div>
 ))}
 </div>
 )}

 {/* Type filter chip rail */}
 {properties.length > 0 && propertyTypes.length > 1 && (
 <div className="relative -mx-4">
 <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10
 bg-gradient-to-l from-brand-navy to-transparent" />
 <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
 {propertyTypes.map((type) => (
 <button
 key={type}
 onClick={() => setTypeFilter(type)}
 className={`
 flex-shrink-0 px-3.5 py-2 rounded-full
 text-xs font-normal transition-all duration-200 whitespace-nowrap
 ${typeFilter === type
 ? 'bg-brand-gold text-brand-navy'
 : 'bg-white/[0.08] text-white/60 border border-white/[0.12]'
 }
 `}
 >
 {type}
 </button>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>

 {/* Property list */}
 <div className="px-4 pt-4 space-y-3">

 {properties.length === 0 ? (
 /* Mobile empty state */
 <div className="flex flex-col items-center justify-center pt-12 pb-8 px-4 text-center">
 <div className="w-16 h-16 rounded-2xl bg-brand-navy/[0.06] dark:bg-brand-gold/10
 flex items-center justify-center mb-4">
 <Building2 className="w-8 h-8 text-brand-navy dark:text-brand-gold" strokeWidth={1.5} />
 </div>
 <h2 className="text-lg font-normal text-[#0F172A] dark:text-white mb-2">No Properties Yet</h2>
 <p className="text-sm text-[#94A3B8] max-w-[240px] leading-relaxed mb-6">
 Start building your portfolio. Add your first property to unlock HABU analysis and services.
 </p>
 <Link
 to="/upload"
 className="inline-flex items-center gap-2 bg-brand-navy text-white
 px-5 py-3 rounded-xl text-sm font-normal
 shadow-[0_4px_16px_rgba(var(--brand-navy-rgb),0.3)]
 active:scale-[0.98] transition-transform"
 >
 <Plus className="w-4 h-4" strokeWidth={2.5} />
 Add First Property
 </Link>
 </div>
 ) : (
 <>
 {/* Hint label */}
 <p className="text-[10px] font-normal tracking-[0.08em] uppercase text-[#B0BAC9] dark:text-white/25 px-1 pb-1">
 Swipe left for quick actions
 </p>

 {filteredProperties.map(property => (
 <SwipeableCard
 key={property.id}
 className="rounded-2xl overflow-hidden"
 actions={[
 {
 icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} />,
 label: 'HABU',
 bgColor: 'bg-brand-navy',
 textColor: 'text-brand-gold',
 onClick: () => navigate(`/property/${property.id}/habu`),
 },
 {
 icon: <Briefcase className="w-5 h-5" strokeWidth={1.5} />,
 label: 'Service',
 bgColor: 'bg-brand-gold',
 textColor: 'text-brand-navy',
 onClick: () => navigate('/services/catalog'),
 },
 ]}
 >
 <Link
 to={`/property/${property.id}/detail`}
 className="flex bg-white dark:bg-card
 border border-[#F1F5F9] dark:border-white/[0.06]
 rounded-2xl overflow-hidden
 shadow-[0_2px_12px_rgba(var(--brand-navy-rgb),0.06)]
 active:scale-[0.99] transition-transform duration-100"
 >
 {/* Gold left accent bar */}
 <div className="w-[3px] self-stretch bg-brand-gold flex-shrink-0" />

 <div className="flex-1 p-4">
 {/* Eyebrow: type + building type */}
 <div className="flex items-center gap-2 mb-2">
 <span className="text-[10px] font-normal tracking-[0.08em] uppercase
 text-[#94A3B8] dark:text-white/40">
 {property.type}
 </span>
 {property.buildingType && (
 <>
 <span className="text-[#E2E8F0] dark:text-white/10">·</span>
 <span className="text-[10px] text-[#94A3B8] dark:text-white/30 flex items-center gap-1">
 <Layers className="w-2.5 h-2.5" />
 {property.buildingType}
 </span>
 </>
 )}
 </div>

 {/* Property name */}
 <h3 className="text-sm font-normal text-[#0F172A] dark:text-white
 truncate tracking-[-0.01em] mb-2">
 {property.name}
 </h3>

 {/* Location */}
 <div className="flex items-center gap-1 mb-3">
 <MapPin className="w-3 h-3 text-[#94A3B8] flex-shrink-0" />
 <span className="text-xs text-[#94A3B8] dark:text-white/40 truncate">
 {locationLabel(property)}
 </span>
 </div>

 {/* Footer: date + View link */}
 <div className="flex items-center justify-between pt-3
 border-t border-[#F1F5F9] dark:border-white/[0.05]">
 <span className="text-[10px] font-normal text-[#B0BAC9] dark:text-white/25">
 Added {formatDate(property.dateAdded)}
 </span>
 <div className="flex items-center gap-1 text-brand-gold">
 <span className="text-xs font-normal">View</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </div>
 </div>
 </div>
 </Link>
 </SwipeableCard>
 ))}

 {/* Add property row */}
 <Link
 to="/upload"
 className="flex items-center gap-4
 border-2 border-dashed border-[#E2E8F0] dark:border-white/[0.08]
 rounded-2xl px-4 py-4
 active:border-brand-gold/40 active:bg-brand-gold/[0.03]
 transition-colors duration-150"
 >
 <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] dark:bg-white/5
 border border-[#E2E8F0] dark:border-white/10
 flex items-center justify-center flex-shrink-0">
 <Plus className="w-4 h-4 text-[#94A3B8]" strokeWidth={2} />
 </div>
 <span className="text-sm font-normal text-[#94A3B8] dark:text-white/40">
 Add Another Property
 </span>
 </Link>
 </>
 )}
 </div>
 </div>

 {/* ═══════════════════════════════════════════
 DESKTOP layout (hidden on mobile)
 ═══════════════════════════════════════════ */}
 <div className="hidden md:block">

 {/* Page header */}
 <div className="border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-gold mb-2">
 Portfolio
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">
 My Properties
 </h1>
 <p className="text-small text-[#475569] dark:text-white/50 mt-1">
 Manage your entire property portfolio in one place
 </p>
 </div>
 <div className="flex items-center gap-3">
 <Link
 to="/upload"
 className="inline-flex items-center justify-center gap-2
 bg-brand-navy hover:bg-brand-navy-hover text-white
 px-5 py-2.5 rounded-xl text-small font-normal
 transition-all hover:shadow-[0_4px_16px_rgba(var(--brand-navy-rgb),0.35)] hover:-translate-y-0.5"
 >
 <Plus className="w-4 h-4 flex-shrink-0" />
 <span>Add Property</span>
 </Link>
 <RMAccess />
 <NotificationDropdown />
 <ThemeToggle />
 </div>
 </div>
 </div>
 </div>

 {/* Desktop content */}
 <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8">

 {properties.length === 0 ? (
 <div className="bg-white dark:bg-card
 border border-[#E2E8F0] dark:border-white/[0.06]
 rounded-2xl p-12 md:p-16 text-center
 shadow-[0_4px_24px_rgba(var(--brand-navy-rgb),0.06)]">
 <div className="w-20 h-20 rounded-2xl bg-brand-navy/[0.06] dark:bg-brand-gold/10
 flex items-center justify-center mx-auto mb-6">
 <Building2 className="w-10 h-10 text-brand-navy dark:text-brand-gold" strokeWidth={1.5} />
 </div>
 <h2 className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white mb-3">
 No Properties Yet
 </h2>
 <p className="text-body text-[#475569] dark:text-white/50 max-w-md mx-auto mb-8 leading-relaxed">
 Start building your portfolio. Add your first property to unlock HABU analysis, document storage, and premium execution services.
 </p>
 <Link
 to="/upload"
 className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-hover text-white
 px-6 py-3 rounded-xl text-small font-normal
 transition-all hover:shadow-[0_4px_20px_rgba(var(--brand-navy-rgb),0.4)] hover:-translate-y-0.5"
 >
 <Plus className="w-4 h-4" />
 Add Your First Property
 </Link>
 </div>
 ) : (
 <div className="space-y-6 md:space-y-8">

 {/* Stats bar */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
 <div className="bg-white dark:bg-card
 border border-[#E2E8F0] dark:border-white/[0.06]
 rounded-2xl p-4 md:p-5
 shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden">
 <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-brand-gold" />
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-2 pl-2">Total</div>
 <div className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white pl-2">
 {properties.length}
 </div>
 </div>
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-2xl p-4 md:p-5">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-2">Types</div>
 <div className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">{totalTypes}</div>
 </div>
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-2xl p-4 md:p-5">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-2">Locations</div>
 <div className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">{totalCities}</div>
 </div>
 </div>

 {/* Property grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
 {properties.map(property => (
 <div
 key={property.id}
 className="group bg-white dark:bg-card
 border border-[#E2E8F0] dark:border-white/[0.06]
 rounded-2xl p-5 md:p-6 flex flex-col
 shadow-[0_1px_3px_rgba(0,0,0,0.04)]
 hover:shadow-[0_8px_32px_rgba(var(--brand-navy-rgb),0.10)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
 hover:-translate-y-0.5 hover:border-brand-navy/20 dark:hover:border-brand-gold/20
 transition-all duration-[250ms]"
 >
 <div className="flex items-start justify-between gap-3 mb-4">
 <div className="flex-1 min-w-0">
 <div className="text-[10px] font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-1.5">
 ID · {property.id}
 </div>
 <h3 className="text-h3 font-normal tracking-tight text-[#0F172A] dark:text-white leading-tight line-clamp-2">
 {property.name}
 </h3>
 </div>
 <div className="flex-shrink-0 px-2.5 py-1.5 rounded-xl
 bg-brand-navy/[0.06] dark:bg-brand-gold/10
 border border-brand-navy/10 dark:border-brand-gold/20
 text-xs font-normal text-brand-navy dark:text-brand-gold">
 {property.type}
 </div>
 </div>
 {property.buildingType && (
 <div className="mb-4">
 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
 bg-[#F8FAFC] dark:bg-white/5
 border border-[#E2E8F0] dark:border-white/[0.06]
 text-xs font-normal text-[#475569] dark:text-white/50">
 <Layers className="w-3 h-3" />
 {property.buildingType}
 </span>
 </div>
 )}
 <div className="flex items-center gap-2 text-small text-[#475569] dark:text-white/50 mb-5 pb-5 border-b border-[#F1F5F9] dark:border-white/[0.05] flex-1">
 <MapPin className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
 <span>{locationLabel(property)}</span>
 </div>
 <div className="flex items-center justify-between gap-3">
 <span className="text-xs text-[#94A3B8]">
 Added {formatDate(property.dateAdded)}
 </span>
 <Link
 to={`/property/${property.id}/detail`}
 className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl
 bg-brand-navy text-white text-small font-normal
 hover:bg-brand-navy-hover hover:
 transition-all group-hover:gap-2.5"
 >
 View
 <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
 </Link>
 </div>
 </div>
 ))}
 {/* Add property dashed card */}
 <Link
 to="/upload"
 className="group flex flex-col items-center justify-center gap-3
 border-2 border-dashed border-[#E2E8F0] dark:border-white/[0.10]
 rounded-2xl p-8 min-h-[200px]
 hover:border-brand-gold/50 dark:hover:border-brand-gold/40
 hover:bg-brand-gold/[0.03] transition-all duration-[250ms]"
 >
 <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] dark:bg-white/5
 border border-[#E2E8F0] dark:border-white/10
 flex items-center justify-center
 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/30
 transition-all">
 <Plus className="w-5 h-5 text-[#94A3B8] group-hover:text-brand-gold transition-colors" strokeWidth={2} />
 </div>
 <span className="text-small font-normal text-[#94A3B8] group-hover:text-[#475569] dark:group-hover:text-white/60 transition-colors">
 Add Property
 </span>
 </Link>
 </div>
 </div>
 )}
 </div>
 </div>

 </div>
 );
}
