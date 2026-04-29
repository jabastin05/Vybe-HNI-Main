import { Link, useNavigate } from 'react-router';
import { Building2, Plus, MapPin, ArrowRight, Layers, Sparkles, Briefcase, ChevronRight } from 'lucide-react';
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
 <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">

 {/* ═══════════════════════════════════════════
 MOBILE layout (hidden on md+)
 ═══════════════════════════════════════════ */}
 <div className="md:hidden">

 {/* ── Hero ── */}
 <div className="relative bg-gradient-to-br from-[#0B3360] via-brand-navy to-brand-primary/75 dark:from-background dark:to-background px-5 pt-6 pb-6 overflow-hidden">
 <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand-secondary/[0.06] blur-3xl pointer-events-none" />
 <div className="relative">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-xs tracking-[0.16em] uppercase text-white/40 mb-2">Portfolio</p>
 <h1 className="text-3xl font-normal text-white tracking-tight leading-none">
 My Properties
 </h1>
 {properties.length > 0 && (
 <p className="text-sm text-white/50 mt-2">
 {properties.length} {properties.length === 1 ? 'property' : 'properties'} · {totalCities} {totalCities === 1 ? 'city' : 'cities'}
 </p>
 )}
 </div>
 <div className="flex items-center gap-2">
 <RMAccess variant="dark" />
 <Link
 to="/upload"
 className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl
 bg-white/15 active:bg-white/25 text-white
 text-xs font-normal transition-all duration-200"
 >
 <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
 Add
 </Link>
 </div>
 </div>
 </div>
 </div>

 {/* ── Filter tabs ── */}
 {properties.length > 0 && propertyTypes.length > 1 && (
 <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.05]">
 <div className="flex gap-0 overflow-x-auto scrollbar-hide">
 {propertyTypes.map((type) => (
 <button
 key={type}
 onClick={() => setTypeFilter(type)}
 className={`flex-shrink-0 px-5 py-3.5 text-xs font-normal whitespace-nowrap transition-all duration-200 border-b-2 ${
 typeFilter === type
 ? 'text-brand-primary border-brand-primary'
 : 'text-gray-400 border-transparent'
 }`}
 >
 {type}
 </button>
 ))}
 </div>
 </div>
 )}

 {/* ── Property list ── */}
 {properties.length === 0 ? (
 <div className="flex flex-col items-center justify-center pt-16 pb-8 px-6 text-center">
 <div className="w-16 h-16 rounded-2xl bg-brand-primary/[0.06] flex items-center justify-center mb-5">
 <Building2 className="w-8 h-8 text-brand-primary" strokeWidth={1.5} />
 </div>
 <h2 className="text-lg font-normal text-gray-900 dark:text-white mb-2">No Properties Yet</h2>
 <p className="text-sm text-gray-400 max-w-[240px] leading-relaxed mb-8">
 Start building your portfolio. Add your first property to unlock HABU analysis and services.
 </p>
 <Link to="/upload" className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl text-sm font-normal active:scale-[0.98] transition-transform">
 <Plus className="w-4 h-4" strokeWidth={1.5} />
 Add First Property
 </Link>
 </div>
 ) : (
 <div className="px-4 pt-5 pb-4">
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden">
 {filteredProperties.map((property, idx) => (
 <SwipeableCard
 key={property.id}
 actions={[
 {
 icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} />,
 label: 'HABU',
 bgColor: 'bg-brand-navy',
 textColor: 'text-white',
 onClick: () => navigate(`/property/${property.id}/habu`),
 },
 {
 icon: <Briefcase className="w-5 h-5" strokeWidth={1.5} />,
 label: 'Service',
 bgColor: 'bg-brand-primary',
 textColor: 'text-white',
 onClick: () => navigate('/services/catalog'),
 },
 ]}
 >
 <Link
 to={`/property/${property.id}/detail`}
 className={`flex items-center gap-4 px-5 py-4 bg-white dark:bg-card active:bg-gray-50 dark:active:bg-white/[0.03] transition-colors duration-150 ${
 idx < filteredProperties.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''
 }`}
 >
 {/* Icon */}
 <div className="w-10 h-10 rounded-xl bg-brand-primary/[0.08] dark:bg-brand-primary/[0.15] flex items-center justify-center flex-shrink-0">
 <Building2 className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
 </div>

 {/* Content */}
 <div className="flex-1 min-w-0">
 <h3 className="text-sm font-normal text-gray-900 dark:text-white truncate mb-1">
 {property.name}
 </h3>
 <div className="flex items-center gap-2">
 <span className="text-xs text-gray-400 dark:text-white/40 truncate">{locationLabel(property)}</span>
 {property.type && (
 <>
 <span className="text-gray-200 dark:text-white/10 flex-shrink-0">·</span>
 <span className="text-xs text-gray-400 dark:text-white/30 flex-shrink-0">{property.type}</span>
 </>
 )}
 </div>
 </div>

 <ChevronRight className="w-4 h-4 text-gray-300 dark:text-white/20 flex-shrink-0" strokeWidth={1.5} />
 </Link>
 </SwipeableCard>
 ))}
 </div>

 {/* Add another */}
 <Link
 to="/upload"
 className="flex items-center gap-4 px-5 py-4 mt-3 rounded-2xl
 border border-dashed border-gray-200 dark:border-white/[0.08]
 active:bg-gray-50 transition-colors duration-150"
 >
 <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
 <Plus className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
 </div>
 <span className="text-sm font-normal text-gray-400 dark:text-white/40">Add Another Property</span>
 </Link>
 </div>
 )}
 </div>

 {/* ═══════════════════════════════════════════
 DESKTOP layout (hidden on mobile)
 ═══════════════════════════════════════════ */}
 <div className="hidden md:block">

 {/* Page header */}
 <div className="border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-gold mb-2">
 Portfolio
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
 My Properties
 </h1>
 <p className="text-small text-gray-600 dark:text-white/50 mt-1">
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
 shadow-card
 rounded-2xl p-12 md:p-16 text-center
 shadow-[0_4px_24px_rgba(var(--brand-navy-rgb),0.06)]">
 <div className="w-20 h-20 rounded-2xl bg-brand-navy/[0.06] dark:bg-brand-gold/8
 flex items-center justify-center mx-auto mb-6">
 <Building2 className="w-10 h-10 text-brand-navy dark:text-brand-gold" strokeWidth={1.5} />
 </div>
 <h2 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white mb-3">
 No Properties Yet
 </h2>
 <p className="text-body text-gray-600 dark:text-white/50 max-w-md mx-auto mb-8 leading-relaxed">
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
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-4">
 <div className="bg-white dark:bg-card
 shadow-card
 rounded-2xl p-5 md:p-5
 shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden">
 <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-brand-gold" />
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-gray-400 mb-2 pl-2">Total</div>
 <div className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white pl-2">
 {properties.length}
 </div>
 </div>
 <div className="bg-white dark:bg-card shadow-card rounded-2xl p-5 md:p-5">
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-gray-400 mb-2">Types</div>
 <div className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">{totalTypes}</div>
 </div>
 <div className="bg-white dark:bg-card shadow-card rounded-2xl p-5 md:p-5">
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-gray-400 mb-2">Locations</div>
 <div className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">{totalCities}</div>
 </div>
 </div>

 {/* Property grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
 {properties.map(property => (
 <div
 key={property.id}
 className="group bg-white dark:bg-card
 shadow-card
 rounded-2xl p-5 md:p-7 flex flex-col
 shadow-[0_1px_3px_rgba(0,0,0,0.04)]
 hover:shadow-[0_8px_32px_rgba(var(--brand-navy-rgb),0.10)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
 hover:-translate-y-0.5 hover:border-brand-navy/20 dark:hover:border-brand-gold/20
 transition-all duration-200"
 >
 <div className="flex items-start justify-between gap-4 mb-4">
 <div className="flex-1 min-w-0">
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-gray-400 mb-1.5">
 ID · {property.id}
 </div>
 <h3 className="text-h3 font-normal tracking-tight text-gray-900 dark:text-white leading-tight line-clamp-2">
 {property.name}
 </h3>
 </div>
 <div className="flex-shrink-0 px-2.5 py-1.5 rounded-xl
 bg-brand-navy/[0.06] dark:bg-brand-gold/8
 border border-brand-navy/10 dark:border-brand-gold/20
 text-xs font-normal text-brand-navy dark:text-brand-gold">
 {property.type}
 </div>
 </div>
 {property.buildingType && (
 <div className="mb-4">
 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
 bg-gray-50 dark:bg-white/5
 shadow-card
 text-xs font-normal text-gray-600 dark:text-white/50">
 <Layers className="w-3 h-3" />
 {property.buildingType}
 </span>
 </div>
 )}
 <div className="flex items-center gap-2 text-small text-gray-600 dark:text-white/50 mb-5 pb-5 border-b border-gray-100 dark:border-white/[0.05] flex-1">
 <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
 <span>{locationLabel(property)}</span>
 </div>
 <div className="flex items-center justify-between gap-3">
 <span className="text-xs text-gray-400">
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
 border-2 border-dashed border-gray-200 dark:border-white/[0.10]
 rounded-2xl p-8 min-h-[200px]
 hover:border-brand-gold/15 dark:hover:border-brand-gold/15
 hover:bg-brand-gold/[0.03] transition-all duration-200"
 >
 <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5
 border border-gray-200 dark:border-white/10
 flex items-center justify-center
 group-hover:bg-brand-gold/8 group-hover:border-brand-gold/12
 transition-all">
 <Plus className="w-5 h-5 text-gray-400 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
 </div>
 <span className="text-small font-normal text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white/60 transition-colors">
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
