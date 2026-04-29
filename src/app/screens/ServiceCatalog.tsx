import { useState } from 'react';
import { Sparkles, ArrowRight, FileText, PenTool, Compass, Clipboard, Flower2, Home, Clock, IndianRupee, Brain, BarChart3, BriefcaseBusiness } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { ServiceCard } from '../components/ServiceCard';
import { servicesData } from '../data/servicesData';

// Service Categories
const serviceCategories = [
 {
 id: 'advisory-intelligence',
 name: 'Advisory & Intelligence',
 shortName: 'Advisory',
 description: 'Flagship strategy, HABU, deal and exit advisory',
 icon: Brain,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 6,
 },
 {
 id: 'valuation-financial-intelligence',
 name: 'Valuation & Financial Intelligence',
 shortName: 'Valuation',
 description: 'Valuation, market, yield and benchmark intelligence',
 icon: BarChart3,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 5,
 },
 {
 id: 'legal-compliance',
 name: 'Legal & Compliance',
 shortName: 'Legal',
 description: 'Title, documentation, NOCs and investor due diligence',
 icon: FileText,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 5,
 },
 {
 id: 'development-design',
 name: 'Development & Design',
 shortName: 'Development',
 description: 'Planning, design, construction and redevelopment lifecycle',
 icon: PenTool,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 6,
 },
 {
 id: 'land-intelligence',
 name: 'Land Intelligence',
 shortName: 'Land Intel',
 description: 'Survey, GIS, drone, soil and zoning data layer',
 icon: Compass,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 6,
 },
 {
 id: 'documentation-government-interface',
 name: 'Documentation & Government Interface',
 shortName: 'Govt Docs',
 description: 'Tax, approvals, verification and registration support',
 icon: Clipboard,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 4,
 },
 {
 id: 'property-lifecycle-services',
 name: 'Property Lifecycle Services',
 shortName: 'Lifecycle',
 description: 'Rental, tenant, facility and maintenance operations',
 icon: Home,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 4,
 },
 {
 id: 'specialized-services',
 name: 'Specialized Services',
 shortName: 'Specialized',
 description: 'Vastu consultation and correction',
 icon: Flower2,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 2,
 },
 {
 id: 'investor-services',
 name: 'Investor Services',
 shortName: 'Investors',
 description: 'Curated opportunities, deal evaluation and portfolio advisory',
 icon: BriefcaseBusiness,
 color: 'from-brand-primary to-brand-teal',
 serviceCount: 5,
 },
];

export function ServiceCatalog() {
 const navigate = useNavigate();
 const [selectedCategory, setSelectedCategory] = useState<string>('advisory-intelligence');
 const [selectedService, setSelectedService] = useState<string | null>(null);

 // Filter services based on selected category
 const filteredServices = servicesData.filter((service) => {
 return service.categoryId === selectedCategory;
 });

 const handleServiceClick = (serviceId: string) => {
 setSelectedService(serviceId);
 navigate(`/service/${serviceId}`);
 };

 const selectedCategoryData = serviceCategories.find(cat => cat.id === selectedCategory);

 return (
 <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">

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

 {/* Category grid */}
 <div className="-mx-1 pb-4">
 <div className="grid grid-cols-3 gap-2">
 {serviceCategories.map((cat) => {
 const isActive = selectedCategory === cat.id;
 const Icon = cat.icon;
 return (
 <button
 key={cat.id}
 onClick={() => setSelectedCategory(cat.id)}
 className={`
 min-h-[78px] flex flex-col items-start justify-between gap-2 p-2.5 rounded-xl
 text-left transition-all duration-200
 ${isActive
 ? 'bg-white text-brand-primary shadow-[0_8px_22px_rgba(0,0,0,0.14)]'
 : 'bg-white/[0.08] text-white/60 border border-white/[0.12]'
 }
 `}
 >
 <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-brand-teal' : 'text-white/50'}`} />
 <span className="text-[11px] font-normal leading-tight">{cat.shortName}</span>
 <span className={`text-[10px] font-normal uppercase tracking-[0.05em] ${isActive ? 'text-brand-primary/50' : 'text-white/35'}`}>
 {cat.serviceCount} services
 </span>
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
 <span className="text-xs font-normal text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full">
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
 text-brand-teal
 bg-brand-teal/10 border border-brand-teal/20
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
 <div className="flex items-center gap-1 px-2 py-1 bg-brand-teal/10 rounded-lg">
 <IndianRupee className="w-3 h-3 text-brand-teal flex-shrink-0" />
 <span className="text-[10px] font-normal text-brand-teal uppercase tracking-[0.05em]">
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
 <div className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0" />
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
 <Sparkles className="w-6 h-6 text-[#94A3B8] dark:text-white/30" />
 </div>
 <p className="text-sm font-normal text-[#64748B] dark:text-white/50 mb-1">
 No services found
 </p>
 <p className="text-xs text-[#94A3B8] dark:text-white/30">
 Try another category
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
 {/* Service Categories */}
 <div className="mb-6 md:mb-8">
 <div className="flex items-center justify-between mb-3 md:mb-4">
 <h2 className="text-body md:text-body font-normal tracking-[-0.01em] text-[#0F172A] dark:text-white">
 Service Categories
 </h2>
 <div className="text-caption md:text-caption text-[#0F172A]/40 dark:text-white/40">
 {serviceCategories.length} categories
 </div>
 </div>

 {/* Compact Category Grid */}
 <div className="grid grid-cols-3 xl:grid-cols-9 gap-3">
 {serviceCategories.map((category) => {
 const isSelected = selectedCategory === category.id;
 const Icon = category.icon;

 return (
 <button
 key={category.id}
 onClick={() => setSelectedCategory(category.id)}
 className={`
 min-h-[124px] bg-white dark:bg-card
 rounded-xl p-3 cursor-pointer
 transition-all duration-300 text-left relative overflow-hidden
 ${isSelected
 ? 'border-2 border-brand-primary shadow-[0_8px_32px_rgba(var(--brand-primary-rgb),0.18)] dark:border-brand-teal dark:shadow-[0_8px_32px_rgba(var(--brand-teal-rgb),0.18)]'
 : 'border border-[#DDEAF1] dark:border-white/[0.06] shadow-[0_1px_2px_rgba(var(--brand-navy-rgb),0.04)] hover:shadow-[0_10px_26px_-18px_rgba(var(--brand-navy-rgb),0.45)] hover:-translate-y-0.5'
 }
 `}
 >
 {/* Top subtle highlight */}
 <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

 <div className="flex items-start justify-between gap-2 mb-3">
 <h3 className="text-sm font-normal tracking-[-0.01em] leading-tight text-[#0F172A] dark:text-white">
 {category.shortName}
 </h3>
 <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-brand-primary text-white' : 'bg-brand-primary/10 text-brand-primary dark:bg-brand-teal/10 dark:text-brand-teal'}`}>
 <Icon className="w-4 h-4" strokeWidth={1.8} />
 </div>
 </div>

 {/* Description */}
 <p className="text-[11px] leading-snug text-[#475569] dark:text-white/50 mb-3 line-clamp-2">
 {category.description}
 </p>

 {/* Service Count */}
 <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] dark:border-white/5">
 <span className="text-[10px] font-normal tracking-[0.05em] uppercase text-[#0F172A]/40 dark:text-white/40">
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
 <div className="w-16 h-16 rounded-full bg-brand-primary/5 dark:bg-white/5 flex items-center justify-center mb-4">
 <Sparkles className="w-8 h-8 text-[#0F172A]/20 dark:text-white/20" />
 </div>
 <p className="text-body text-[#0F172A]/60 dark:text-white/60 mb-2">
 No services found
 </p>
 <p className="text-small text-[#0F172A]/40 dark:text-white/40">
 Try another category
 </p>
 </div>
 )}

 {/* Info Card */}
 <div className="mt-12 bg-gradient-to-br from-brand-primary/[0.05] to-brand-teal/[0.06] border border-brand-primary/10 dark:border-brand-teal/20 backdrop-blur-xl rounded-xl p-4 md:p-5 lg:p-6">
 <div className="flex items-start gap-6">
 <div className="w-14 h-14 rounded-xl bg-brand-primary/10 dark:bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
 <Sparkles className="w-7 h-7 text-brand-primary dark:text-brand-teal" />
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
 className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl text-small font-normal transition-all"
 >
 Get Personalized Recommendations
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 </div>
 </div>
 </div>

 </div>
 </div>
 );
}
