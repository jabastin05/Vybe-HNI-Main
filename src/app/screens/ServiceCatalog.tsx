import { useState } from 'react';
import { Search, Sparkles, ArrowRight, FileText, PenTool, DollarSign, Compass, HardHat, Clipboard, Flower2, Map, Home, Clock, IndianRupee, ChevronRight } from 'lucide-react';
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
 <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">

 {/* ─────────────────────────────────────────
 MOBILE LAYOUT (< md)
 ───────────────────────────────────────── */}
 <div className="md:hidden">

 {/* ── Hero ── */}
 <div className="relative bg-gradient-to-br from-[#0B3360] via-brand-navy to-brand-primary/75 dark:from-background dark:to-background px-5 pt-6 pb-6 overflow-hidden">
 <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-secondary/[0.05] blur-3xl pointer-events-none" />
 <div className="relative">
 <p className="text-xs tracking-[0.16em] uppercase text-white/40 mb-2">Marketplace</p>
 <h1 className="text-3xl font-normal text-white tracking-tight leading-none">Services</h1>
 <p className="text-sm text-white/50 mt-2">
 {serviceCategories.reduce((a, c) => a + c.serviceCount, 0)} services · {serviceCategories.length} categories
 </p>
 </div>
 </div>

 {/* ── Search + category tabs ── */}
 <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.05]">
 <div className="px-4 pt-3 pb-0">
 <div className="relative">
 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input
 type="text"
 placeholder="Search services…"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full bg-gray-50 dark:bg-white/[0.04] rounded-xl
 pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white
 placeholder:text-gray-400 dark:placeholder:text-white/30
 focus:outline-none focus:ring-2 focus:ring-brand-primary/20
 transition-all duration-200"
 />
 </div>
 </div>
 <div className="flex overflow-x-auto scrollbar-hide">
 {serviceCategories.map((cat) => {
 const isActive = selectedCategory === cat.id;
 const Icon = cat.icon;
 return (
 <button
 key={cat.id}
 onClick={() => setSelectedCategory(cat.id)}
 className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3.5 text-xs font-normal whitespace-nowrap transition-all duration-200 border-b-2 ${
 isActive ? 'text-brand-primary border-brand-primary' : 'text-gray-400 border-transparent'
 }`}
 >
 <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
 {cat.name}
 </button>
 );
 })}
 </div>
 </div>

 {/* ── Service list ── */}
 {filteredServices.length === 0 ? (
 <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
 <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
 <Search className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
 </div>
 <p className="text-base font-normal text-gray-900 dark:text-white mb-1">No services found</p>
 <p className="text-sm text-gray-400">Try adjusting your search</p>
 </div>
 ) : (
 <div className="px-4 pt-5 pb-4">
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden">
 {filteredServices.map((service, idx) => {
 const primaryAttr = service.attributes[0];
 const Icon = serviceCategories.find(c => c.id === service.categoryId)?.icon || FileText;
 return (
 <button
 key={service.id}
 onClick={() => handleServiceClick(service.id)}
 className={`w-full flex items-center gap-4 px-5 py-4 bg-white dark:bg-card active:bg-gray-50 dark:active:bg-white/[0.03] transition-colors duration-150 text-left ${
 idx < filteredServices.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''
 }`}
 >
 {/* Icon */}
 <div className="w-10 h-10 rounded-xl bg-brand-primary/[0.08] dark:bg-brand-primary/[0.15] flex items-center justify-center flex-shrink-0">
 <Icon className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
 </div>
 {/* Content */}
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 mb-0.5">
 <h3 className="text-sm font-normal text-gray-900 dark:text-white truncate">{service.name}</h3>
 {service.badge && (
 <span className="flex-shrink-0 text-xs text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400 px-1.5 py-0.5 rounded-md">{service.badge}</span>
 )}
 </div>
 <div className="flex items-center gap-2">
 <span className="text-xs text-gray-400 dark:text-white/40 truncate">{service.categoryName}</span>
 {primaryAttr && (
 <>
 <span className="text-gray-200 dark:text-white/10 flex-shrink-0">·</span>
 <span className="text-xs text-gray-400 dark:text-white/30 flex-shrink-0 flex items-center gap-1">
 <Clock className="w-3 h-3" strokeWidth={1.5} />{primaryAttr.eta}
 </span>
 </>
 )}
 </div>
 </div>
 <ChevronRight className="w-4 h-4 text-gray-300 dark:text-white/20 flex-shrink-0" strokeWidth={1.5} />
 </button>
 );
 })}
 </div>

 {/* AI nudge */}
 <div className="mt-4 bg-brand-primary/[0.05] dark:bg-brand-primary/[0.08] rounded-2xl p-4 flex items-center gap-3">
 <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
 <Sparkles className="w-4.5 h-4.5 text-brand-primary" strokeWidth={1.5} />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white">Not sure which service?</p>
 <p className="text-xs text-gray-500 dark:text-white/40">Get AI-powered recommendations</p>
 </div>
 <button onClick={() => navigate('/help-support')} className="flex-shrink-0 flex items-center gap-1 text-xs text-brand-primary font-normal">
 Ask <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
 </button>
 </div>
 </div>
 )}

 </div>

 {/* ─────────────────────────────────────────
 DESKTOP LAYOUT (md+)
 ───────────────────────────────────────── */}
 <div className="hidden md:block">

 {/* Header */}
 <div className="border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-gold mb-2">
 Service Catalog
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
 Real Estate Services
 </h1>
 <p className="text-small text-gray-600 dark:text-white/50 mt-1">
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
 <h2 className="text-body md:text-body font-normal tracking-[-0.01em] text-gray-900 dark:text-white">
 Service Categories
 </h2>
 <div className="text-caption md:text-caption text-gray-900/40 dark:text-white/40">
 {serviceCategories.length} categories
 </div>
 </div>

 {/* Horizontal Scrollable Categories */}
 <div className="relative -mx-4 md:-mx-8 px-4 md:px-8">
 {/* Right fade-edge scroll hint */}
 <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 z-10
 bg-gradient-to-l from-gray-50 dark:from-[#0a0a0a] to-transparent" />
 <div className="flex gap-4 md:gap-4 overflow-x-auto scrollbar-hide pb-4 scrollbar-hide snap-x snap-mandatory">
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
 rounded-2xl p-5 md:p-7 cursor-pointer
 transition-all duration-200 text-left relative overflow-hidden
 ${isSelected
 ? 'border-2 border-brand-navy shadow-[0_8px_32px_rgba(var(--brand-navy-rgb),0.20)] dark:border-brand-gold dark:shadow-[0_8px_32px_rgba(var(--brand-gold-rgb),0.20)]'
 : 'shadow-card shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_60px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1'
 }
 `}
 >
 {/* Top subtle highlight */}
 <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

 {/* Category Name - Stronger hierarchy */}
 <h3 className="text-body md:text-h3 font-normal tracking-[-0.02em] text-gray-900 dark:text-white mb-3">
 {category.name}
 </h3>

 {/* Description */}
 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed mb-4 line-clamp-2">
 {category.description}
 </p>

 {/* Service Count */}
 <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
 <span className="text-caption font-normal tracking-[0.05em] uppercase text-gray-900/40 dark:text-white/40">
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
 <h2 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
 {selectedCategoryData.name}
 </h2>
 <p className="text-small text-gray-600 dark:text-white/50">
 {selectedCategoryData.description}
 </p>
 </div>
 </div>
 )}

 {/* Search Bar */}
 <div className="mb-6">
 <div className="relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900/40 dark:text-white/40" />
 <input
 type="text"
 placeholder="Search services in this category..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-12 pr-4 py-4 bg-white dark:bg-card shadow-card rounded-xl text-small text-gray-900 dark:text-white placeholder:text-gray-900/40 dark:placeholder:text-white/40 focus:outline-none focus:border-brand-navy/30 dark:focus:border-brand-gold/12"
 />
 </div>
 </div>

 {/* Results Count */}
 <div className="mb-6">
 <p className="text-small text-gray-600 dark:text-white/50">
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
 <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-4">
 <Search className="w-8 h-8 text-gray-900/20 dark:text-white/20" />
 </div>
 <p className="text-body text-gray-900/60 dark:text-white/60 mb-2">
 No services found
 </p>
 <p className="text-small text-gray-900/40 dark:text-white/40">
 Try adjusting your search
 </p>
 </div>
 )}

 {/* Info Card */}
 <div className="mt-12 bg-gradient-to-br from-brand-navy/[0.04] to-brand-gold/[0.04] border border-brand-navy/10 dark:border-brand-gold/20 backdrop-blur-xl rounded-xl p-5 md:p-5 lg:p-6">
 <div className="flex items-start gap-6">
 <div className="w-14 h-14 rounded-xl bg-brand-navy/[0.08] dark:bg-brand-gold/8 flex items-center justify-center flex-shrink-0">
 <Sparkles className="w-7 h-7 text-brand-navy dark:text-brand-gold" />
 </div>
 <div className="flex-1">
 <h3 className="text-body font-normal tracking-[-0.01em] text-gray-900 dark:text-white mb-2">
 Need help choosing the right service?
 </h3>
 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed mb-4">
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
