import { useState } from 'react';
import { Search, Sparkles, ArrowRight, FileText, PenTool, DollarSign, Compass, HardHat, Clipboard, Flower2, Map, Home, Clock, IndianRupee } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { ServiceCard } from '../components/ServiceCard';
import { servicesData } from '../data/servicesData';

// Service Categories for horizontal scroll
const serviceCategories = [
 {
 id: 'legal',
 name: 'Legal',
 description: 'Legal compliance, documentation and clearance',
 icon: FileText,
 color: 'from-blue-500 to-cyan-500',
 serviceCount: 4,
 },
 {
 id: 'architect',
 name: 'Architect',
 description: 'Architectural design and planning services',
 icon: PenTool,
 color: 'from-purple-500 to-pink-500',
 serviceCount: 3,
 },
 {
 id: 'valuation',
 name: 'Valuation',
 description: 'Property valuation and market analysis',
 icon: DollarSign,
 color: 'from-emerald-500 to-green-500',
 serviceCount: 3,
 },
 {
 id: 'surveyor',
 name: 'Surveyor',
 description: 'Land survey and boundary demarcation',
 icon: Compass,
 color: 'from-orange-500 to-amber-500',
 serviceCount: 3,
 },
 {
 id: 'contractor',
 name: 'Contractor',
 description: 'Construction and execution services',
 icon: HardHat,
 color: 'from-red-500 to-orange-500',
 serviceCount: 3,
 },
 {
 id: 'property-management',
 name: 'Property Mgmt',
 description: 'Property maintenance and facility management',
 icon: Home,
 color: 'from-indigo-500 to-blue-500',
 serviceCount: 4,
 },
 {
 id: 'documentation',
 name: 'Documentation',
 description: 'Property documentation and compliance filing',
 icon: Clipboard,
 color: 'from-teal-500 to-cyan-500',
 serviceCount: 3,
 },
 {
 id: 'vastu',
 name: 'Vastu',
 description: 'Vastu consultation and correction',
 icon: Flower2,
 color: 'from-pink-500 to-rose-500',
 serviceCount: 2,
 },
 {
 id: 'drone-gis',
 name: 'Drone + GIS',
 description: 'Drone surveys and GIS mapping',
 icon: Map,
 color: 'from-violet-500 to-purple-500',
 serviceCount: 3,
 },
];

export function ServiceCatalog() {
 const navigate = useNavigate();
 const [searchQuery, setSearchQuery] = useState('');
 const [selectedCategory, setSelectedCategory] = useState<string>('legal');
 const [selectedService, setSelectedService] = useState<string | null>(null);

 // Filter services based on selected category and search
 const filteredServices = servicesData.filter((service) => {
 const matchesCategory = service.categoryId === selectedCategory;
 const matchesSearch =
 service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 service.description.toLowerCase().includes(searchQuery.toLowerCase());

 return matchesCategory && (searchQuery === '' || matchesSearch);
 });

 const handleServiceClick = (serviceId: string) => {
 setSelectedService(serviceId);
 navigate(`/service/${serviceId}`);
 };

 const selectedCategoryData = serviceCategories.find(cat => cat.id === selectedCategory);

 return (
 <div className="min-h-screen bg-[#F8FAFC] dark:bg-background transition-colors duration-300">

 {/* ─────────────────────────────────────────
 MOBILE LAYOUT (< md)
 ───────────────────────────────────────── */}
 <div className="md:hidden">

 {/* Navy Hero Header */}
 <div className="bg-brand-navy dark:bg-background px-4 pt-5 pb-0">
 {/* Decorative blur circles */}
 <div className="absolute top-16 right-4 w-24 h-24 rounded-full bg-brand-gold/10 blur-2xl pointer-events-none" />
 <div className="absolute top-24 left-8 w-16 h-16 rounded-full bg-white/5 blur-xl pointer-events-none" />

 {/* Title row */}
 <div className="flex items-start justify-between mb-4">
 <div>
 <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-brand-gold mb-1">
 Marketplace
 </p>
 <h1 className="text-2xl font-normal tracking-tight text-white leading-tight">
 Services
 </h1>
 <p className="text-sm text-white/50 mt-0.5">
 {serviceCategories.reduce((a, c) => a + c.serviceCount, 0)} services across {serviceCategories.length} categories
 </p>
 </div>
 </div>

 {/* Search bar inside hero */}
 <div className="relative mb-4">
 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
 <input
 type="text"
 placeholder="Search services…"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-10 pr-4 py-3 bg-white/[0.08] border border-white/[0.12] rounded-2xl
 text-sm text-white placeholder:text-white/40
 focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.12]
 transition-all"
 />
 </div>

 {/* Category chip rail — overlaps hero bottom */}
 <div className="relative -mx-4">
 {/* Right fade hint */}
 <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10
 bg-gradient-to-l from-brand-navy to-transparent" />
 <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
 {serviceCategories.map((cat) => {
 const isActive = selectedCategory === cat.id;
 const Icon = cat.icon;
 return (
 <button
 key={cat.id}
 onClick={() => setSelectedCategory(cat.id)}
 className={`
 flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full
 text-xs font-normal transition-all duration-200 whitespace-nowrap
 ${isActive
 ? 'bg-brand-gold text-brand-navy'
 : 'bg-white/[0.08] text-white/60 border border-white/[0.12]'
 }
 `}
 >
 <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-brand-navy' : 'text-white/50'}`} />
 {cat.name}
 </button>
 );
 })}
 </div>
 </div>
 </div>

 {/* Category context strip */}
 {selectedCategoryData && (
 <div className="px-4 py-3 bg-white dark:bg-card border-b border-[#F1F5F9] dark:border-white/[0.06]">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-sm font-normal text-[#0F172A] dark:text-white">
 {selectedCategoryData.name}
 </p>
 <p className="text-xs text-[#94A3B8] dark:text-white/40 mt-0.5">
 {selectedCategoryData.description}
 </p>
 </div>
 <span className="text-xs font-normal text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full">
 {filteredServices.length} services
 </span>
 </div>
 </div>
 )}

 {/* Service Cards — mobile */}
 <div className="px-4 py-4 space-y-3">
 {filteredServices.length > 0 ? (
 filteredServices.map((service) => {
 const primaryAttr = service.attributes[0];
 return (
 <button
 key={service.id}
 onClick={() => handleServiceClick(service.id)}
 className="w-full text-left"
 >
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden
 border border-[#F1F5F9] dark:border-white/[0.06]
 shadow-[0_2px_12px_rgba(var(--brand-navy-rgb),0.06)]
 active:scale-[0.99] transition-transform duration-100">
 <div className="flex">
 {/* Gold left accent */}
 <div className="w-[3px] bg-brand-gold flex-shrink-0" />

 <div className="flex-1 p-4">
 {/* Top: name + badge */}
 <div className="flex items-start justify-between gap-2 mb-2">
 <div className="flex-1 min-w-0">
 <p className="text-xs font-normal tracking-[0.1em] uppercase text-[#94A3B8] dark:text-white/40 mb-1">
 {service.categoryName}
 </p>
 <h3 className="text-sm font-normal text-[#0F172A] dark:text-white tracking-[-0.01em] leading-tight">
 {service.name}
 </h3>
 </div>
 {service.badge && (
 <span className="flex-shrink-0 text-[10px] font-normal tracking-[0.06em] uppercase
 text-amber-600 dark:text-amber-400
 bg-amber-500/10 border border-amber-500/20
 px-2 py-0.5 rounded-lg">
 {service.badge}
 </span>
 )}
 </div>

 {/* Description */}
 <p className="text-xs text-[#64748B] dark:text-white/50 leading-relaxed mb-3 line-clamp-2">
 {service.description}
 </p>

 {/* ETA + Price */}
 {primaryAttr && (
 <div className="flex items-center gap-2 mb-3">
 <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
 <Clock className="w-3 h-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
 <span className="text-[10px] font-normal text-blue-600 dark:text-blue-400 uppercase tracking-[0.05em]">
 {primaryAttr.eta}
 </span>
 </div>
 <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
 <IndianRupee className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
 <span className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.05em]">
 {primaryAttr.priceRange}
 </span>
 </div>
 {service.attributes.length > 1 && (
 <span className="text-[10px] font-normal text-brand-gold">
 +{service.attributes.length - 1} options
 </span>
 )}
 </div>
 )}

 {/* Footer: deliverables + arrow */}
 <div className="flex items-center justify-between">
 {primaryAttr?.deliverables && primaryAttr.deliverables.length > 0 ? (
 <div className="flex items-center gap-1">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
 <span className="text-xs text-[#64748B] dark:text-white/40 truncate max-w-[180px]">
 {primaryAttr.deliverables[0]}
 </span>
 </div>
 ) : (
 <div />
 )}
 <div className="flex items-center gap-1 text-brand-gold flex-shrink-0">
 <span className="text-xs font-normal">View</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </div>
 </div>
 </div>
 </div>
 </div>
 </button>
 );
 })
 ) : (
 <div className="flex flex-col items-center justify-center py-16">
 <div className="w-14 h-14 rounded-full bg-[#F1F5F9] dark:bg-white/5 flex items-center justify-center mb-3">
 <Search className="w-6 h-6 text-[#94A3B8] dark:text-white/30" />
 </div>
 <p className="text-sm font-normal text-[#64748B] dark:text-white/50 mb-1">
 No services found
 </p>
 <p className="text-xs text-[#94A3B8] dark:text-white/30">
 Try adjusting your search
 </p>
 </div>
 )}
 </div>

 {/* AI Recommendation Card */}
 <div className="px-4 pb-6">
 <div className="bg-gradient-to-br from-brand-navy to-brand-navy-hover rounded-2xl p-4
 border border-[#1a3a5c]
 shadow-[0_4px_24px_rgba(var(--brand-navy-rgb),0.20)]">
 <div className="flex items-start gap-3">
 <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
 <Sparkles className="w-5 h-5 text-brand-gold" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-white mb-1">
 Not sure which service?
 </p>
 <p className="text-xs text-white/50 leading-relaxed mb-3">
 Get AI-powered recommendations based on your portfolio.
 </p>
 <button
 onClick={() => navigate('/help-support')}
 className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-gold text-brand-navy
 rounded-xl text-xs font-normal transition-all
 active:scale-95 shadow-[0_2px_12px_rgba(var(--brand-gold-rgb),0.4)]"
 >
 Get Recommendations
 <ArrowRight className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>
 </div>
 </div>

 </div>

 {/* ─────────────────────────────────────────
 DESKTOP LAYOUT (md+)
 ───────────────────────────────────────── */}
 <div className="hidden md:block">

 {/* Header */}
 <div className="border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-gold mb-2">
 Service Catalog
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">
 Real Estate Services
 </h1>
 <p className="text-small text-[#475569] dark:text-white/50 mt-1">
 Comprehensive property services designed for UHNIs
 </p>
 </div>
 <div className="flex items-center gap-3">
 <NotificationDropdown />
 <ThemeToggle />
 </div>
 </div>
 </div>
 </div>

 {/* Main Content */}
 <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8 lg:py-10">
 {/* Service Categories - Horizontal Scroll */}
 <div className="mb-6 md:mb-8">
 <div className="flex items-center justify-between mb-3 md:mb-4">
 <h2 className="text-body md:text-body font-normal tracking-[-0.01em] text-[#0F172A] dark:text-white">
 Service Categories
 </h2>
 <div className="text-caption md:text-caption text-[#0F172A]/40 dark:text-white/40">
 {serviceCategories.length} categories
 </div>
 </div>

 {/* Horizontal Scrollable Categories */}
 <div className="relative -mx-4 md:-mx-8 px-4 md:px-8">
 {/* Right fade-edge scroll hint */}
 <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 z-10
 bg-gradient-to-l from-[#F8FAFC] dark:from-[#0a0a0a] to-transparent" />
 <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
 {serviceCategories.map((category) => {
 const isSelected = selectedCategory === category.id;
 const Icon = category.icon;

 return (
 <button
 key={category.id}
 onClick={() => setSelectedCategory(category.id)}
 className={`
 flex-shrink-0 w-[280px] md:w-[340px] snap-start
 bg-white dark:bg-card
 rounded-2xl p-5 md:p-6 cursor-pointer
 transition-all duration-300 text-left relative overflow-hidden
 ${isSelected
 ? 'border-2 border-brand-navy shadow-[0_8px_32px_rgba(var(--brand-navy-rgb),0.20)] dark:border-brand-gold dark:shadow-[0_8px_32px_rgba(var(--brand-gold-rgb),0.20)]'
 : 'border border-[#E2E8F0] dark:border-white/[0.06] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_60px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1'
 }
 `}
 >
 {/* Top subtle highlight */}
 <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

 {/* Category Name - Stronger hierarchy */}
 <h3 className="text-body md:text-h3 font-normal tracking-[-0.02em] text-[#0F172A] dark:text-white mb-3">
 {category.name}
 </h3>

 {/* Description */}
 <p className="text-small text-[#475569] dark:text-white/50 leading-relaxed mb-4 line-clamp-2">
 {category.description}
 </p>

 {/* Service Count */}
 <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] dark:border-white/5">
 <span className="text-caption font-normal tracking-[0.05em] uppercase text-[#0F172A]/40 dark:text-white/40">
 {category.serviceCount} services
 </span>
 {isSelected && (
 <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
 )}
 </div>
 </button>
 );
 })}
 </div>
 </div>
 </div>

 {/* Selected Category Header */}
 {selectedCategoryData && (
 <div className="mb-6">
 <div className="mb-2">
 <h2 className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">
 {selectedCategoryData.name}
 </h2>
 <p className="text-small text-[#475569] dark:text-white/50">
 {selectedCategoryData.description}
 </p>
 </div>
 </div>
 )}

 {/* Search Bar */}
 <div className="mb-6">
 <div className="relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F172A]/40 dark:text-white/40" />
 <input
 type="text"
 placeholder="Search services in this category..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-12 pr-4 py-4 bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-xl text-small text-[#0F172A] dark:text-white placeholder:text-[#0F172A]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-brand-navy/30 dark:focus:border-brand-gold/30"
 />
 </div>
 </div>

 {/* Results Count */}
 <div className="mb-6">
 <p className="text-small text-[#475569] dark:text-white/50">
 {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
 </p>
 </div>

 {/* Services Grid */}
 {filteredServices.length > 0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
 {filteredServices.map((service) => {
 return (
 <ServiceCard
 key={service.id}
 id={service.id}
 name={service.name}
 description={service.description}
 color={service.color}
 badge={service.badge}
 attributes={service.attributes}
 onClick={() => handleServiceClick(service.id)}
 isSelected={selectedService === service.id}
 featured={service.featured}
 categoryName={service.categoryName}
 />
 );
 })}
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center py-8 md:py-16">
 <div className="w-16 h-16 rounded-full bg-[#F8FAFC] dark:bg-white/5 flex items-center justify-center mb-4">
 <Search className="w-8 h-8 text-[#0F172A]/20 dark:text-white/20" />
 </div>
 <p className="text-body text-[#0F172A]/60 dark:text-white/60 mb-2">
 No services found
 </p>
 <p className="text-small text-[#0F172A]/40 dark:text-white/40">
 Try adjusting your search
 </p>
 </div>
 )}

 {/* Info Card */}
 <div className="mt-12 bg-gradient-to-br from-brand-navy/[0.04] to-brand-gold/[0.04] border border-brand-navy/10 dark:border-brand-gold/20 backdrop-blur-xl rounded-xl p-4 md:p-5 lg:p-6">
 <div className="flex items-start gap-6">
 <div className="w-14 h-14 rounded-xl bg-brand-navy/[0.08] dark:bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
 <Sparkles className="w-7 h-7 text-brand-navy dark:text-brand-gold" />
 </div>
 <div className="flex-1">
 <h3 className="text-body font-normal tracking-[-0.01em] text-[#0F172A] dark:text-white mb-2">
 Need help choosing the right service?
 </h3>
 <p className="text-small text-[#475569] dark:text-white/50 leading-relaxed mb-4">
 Our AI-powered recommendation engine can analyze your property portfolio and suggest the most relevant services based on your investment goals, property type, and current requirements.
 </p>
 <button
 onClick={() => navigate('/help-support')}
 className="flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-hover text-white rounded-xl text-small font-normal transition-all"
 >
 Get Personalized Recommendations
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 </div>
 </div>
 </div>

 </div>

 <style>{`
 .scrollbar-hide::-webkit-scrollbar {
 display: none;
 }
 .scrollbar-hide {
 -ms-overflow-style: none;
 scrollbar-width: none;
 }
 `}</style>
 </div>
 );
}
