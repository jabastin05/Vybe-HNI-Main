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
 <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06]">
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-primary mb-2">
 Service Catalog
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
 Real Estate Services
 </h1>
 <p className="text-small text-gray-500 dark:text-white/50 mt-1">
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
 <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8">

 {/* ── Category tabs + search ── */}
 <div className="bg-white dark:bg-card rounded-2xl overflow-hidden mb-5">
 {/* Tabs row */}
 <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100 dark:border-white/[0.05]">
 {serviceCategories.map((category) => {
 const isSelected = selectedCategory === category.id;
 const Icon = category.icon;
 return (
 <button
 key={category.id}
 onClick={() => setSelectedCategory(category.id)}
 className={`flex-shrink-0 flex items-center gap-2 px-4 py-3.5 text-sm font-normal whitespace-nowrap transition-all duration-200 border-b-2 ${
 isSelected
 ? 'text-brand-primary border-brand-primary'
 : 'text-gray-400 dark:text-white/40 border-transparent hover:text-gray-600 dark:hover:text-white/60'
 }`}
 >
 <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
 {category.name}
 <span className={`text-xs ml-0.5 ${isSelected ? 'text-brand-primary/60' : 'text-gray-300 dark:text-white/20'}`}>
 {category.serviceCount}
 </span>
 </button>
 );
 })}
 </div>
 {/* Search row — clearly visible below tabs */}
 <div className="px-4 py-3 border-b border-gray-100 dark:border-white/[0.05]">
 <div className="relative">
 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" strokeWidth={1.5} />
 <input
 type="text"
 placeholder={`Search ${serviceCategories.find(c => c.id === selectedCategory)?.name ?? ''} services…`}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/[0.04]
 rounded-xl text-sm text-gray-900 dark:text-white
 placeholder:text-gray-400 dark:placeholder:text-white/30
 focus:outline-none focus:ring-2 focus:ring-brand-primary/20
 transition-all duration-200"
 />
 </div>
 </div>

 {/* ── Service rows — same pattern as Cases/Properties ── */}
 {filteredServices.length > 0 ? (
 filteredServices.map((service, idx) => {
 const CatIcon = serviceCategories.find(c => c.id === service.categoryId)?.icon || FileText;
 const primaryAttr = service.attributes[0];
 return (
 <button
 key={service.id}
 onClick={() => handleServiceClick(service.id)}
 className={`w-full flex items-center gap-4 px-5 py-4 text-left
 bg-white dark:bg-card active:bg-gray-50 dark:active:bg-white/[0.03]
 hover:bg-gray-50 dark:hover:bg-white/[0.02]
 transition-colors duration-150
 ${idx < filteredServices.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''}
 `}
 >
 {/* Category icon */}
 <div className="w-10 h-10 rounded-xl bg-brand-primary/[0.08] dark:bg-brand-primary/[0.15] flex items-center justify-center flex-shrink-0">
 <CatIcon className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
 </div>

 {/* Content */}
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 mb-0.5">
 <h3 className="text-sm font-normal text-gray-900 dark:text-white truncate">
 {service.name}
 </h3>
 {service.badge && (
 <span className="flex-shrink-0 text-xs text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400 px-1.5 py-0.5 rounded-md">
 {service.badge}
 </span>
 )}
 </div>
 <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-white/40">
 <span className="truncate">{service.description}</span>
 </div>
 </div>

 {/* Meta */}
 {primaryAttr && (
 <div className="flex items-center gap-3 flex-shrink-0 text-xs text-gray-400 dark:text-white/40">
 <span className="flex items-center gap-1">
 <Clock className="w-3 h-3" strokeWidth={1.5} />
 {primaryAttr.eta}
 </span>
 <span className="flex items-center gap-1">
 <IndianRupee className="w-3 h-3" strokeWidth={1.5} />
 {primaryAttr.priceRange.split(' - ')[0]}
 </span>
 </div>
 )}

 <ChevronRight className="w-4 h-4 text-gray-300 dark:text-white/20 flex-shrink-0 ml-2" strokeWidth={1.5} />
 </button>
 );
 })
 ) : (
 <div className="flex flex-col items-center justify-center py-20 text-center">
 <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
 <Search className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
 </div>
 <p className="text-base text-gray-900 dark:text-white mb-1">No services found</p>
 <p className="text-sm text-gray-400">Try adjusting your search</p>
 </div>
 )}
 </div>

 {/* AI nudge */}
 <div className="bg-brand-primary/[0.04] dark:bg-brand-primary/[0.08] rounded-2xl p-5 flex items-center gap-4">
 <div className="w-10 h-10 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
 <Sparkles className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-normal text-gray-900 dark:text-white">Not sure which service?</p>
 <p className="text-xs text-gray-500 dark:text-white/40">Get AI-powered recommendations based on your portfolio</p>
 </div>
 <button onClick={() => navigate('/help-support')} className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-normal hover:bg-brand-primary-hover transition-all">
 Get Recommendations <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
 </button>
 </div>

 </div>{/* end max-w container */}
 </div>{/* end hidden md:block */}
 </div>
 );
}
