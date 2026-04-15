import { useState } from 'react';
import { Search, Sparkles, ArrowRight, FileText, PenTool, DollarSign, Compass, HardHat, Clipboard, Flower2, Map, Home } from 'lucide-react';
import { useNavigate } from 'react-router';
import { SideNav } from '../components/SideNav';
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
    iconName: 'FileText',
    color: 'from-blue-500 to-cyan-500',
    serviceCount: 4,
  },
  {
    id: 'architect',
    name: 'Architect',
    description: 'Architectural design and planning services',
    iconName: 'PenTool',
    color: 'from-purple-500 to-pink-500',
    serviceCount: 3,
  },
  {
    id: 'valuation',
    name: 'Valuation',
    description: 'Property valuation and market analysis',
    iconName: 'DollarSign',
    color: 'from-emerald-500 to-green-500',
    serviceCount: 3,
  },
  {
    id: 'surveyor',
    name: 'Surveyor',
    description: 'Land survey and boundary demarcation',
    iconName: 'Compass',
    color: 'from-orange-500 to-amber-500',
    serviceCount: 3,
  },
  {
    id: 'contractor',
    name: 'Contractor',
    description: 'Construction and execution services',
    iconName: 'HardHat',
    color: 'from-red-500 to-orange-500',
    serviceCount: 3,
  },
  {
    id: 'property-management',
    name: 'Property Management',
    description: 'Property maintenance and facility management',
    iconName: 'Home',
    color: 'from-indigo-500 to-blue-500',
    serviceCount: 4,
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Property documentation and compliance filing',
    iconName: 'Clipboard',
    color: 'from-teal-500 to-cyan-500',
    serviceCount: 3,
  },
  {
    id: 'vastu',
    name: 'Vastu',
    description: 'Vastu consultation and correction',
    iconName: 'Flower2',
    color: 'from-pink-500 to-rose-500',
    serviceCount: 2,
  },
  {
    id: 'drone-gis',
    name: 'Drone + GIS',
    description: 'Drone surveys and GIS mapping',
    iconName: 'Map',
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
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] transition-colors duration-300 pb-24 md:pb-8 pt-[60px] md:pt-0">
      <SideNav />

      {/* Header */}
      <div className="border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3">
            <div>
              <div className="text-caption font-medium tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
                Service Catalog
              </div>
              <div className="text-h1 font-medium tracking-[-0.02em] text-black dark:text-white">
                Real Estate Services
              </div>
              <p className="text-small text-black/60 dark:text-white/60 mt-1">
                Comprehensive property services designed for UHNIs
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:block">
                <NotificationDropdown />
              </div>
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8 lg:py-10">
        {/* Service Categories - Horizontal Scroll */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-body md:text-body font-medium tracking-[-0.01em] text-black dark:text-white">
              Service Categories
            </h2>
            <div className="text-caption md:text-caption text-black/40 dark:text-white/40">
              {serviceCategories.length} categories
            </div>
          </div>

          {/* Horizontal Scrollable Categories */}
          <div className="relative -mx-4 md:-mx-8 px-4 md:px-8">
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {serviceCategories.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      flex-shrink-0 w-[280px] md:w-[340px] snap-start
                      bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px]
                      rounded-xl p-5 md:p-6 cursor-pointer
                      transition-all duration-300 text-left
                      ${isSelected
                        ? 'border-2 border-emerald-500 shadow-[0_8px_32px_rgba(16,185,129,0.25)]'
                        : 'border border-white/60 dark:border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_60px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1'
                      }
                    `}
                  >
                    {/* Top subtle highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

                    {/* Category Name - Stronger hierarchy */}
                    <h3 className="text-body md:text-h3 font-bold tracking-[-0.02em] text-black dark:text-white mb-3">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Service Count */}
                    <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
                      <span className="text-caption font-medium tracking-[0.05em] uppercase text-black/40 dark:text-white/40">
                        {category.serviceCount} services
                      </span>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
              <h2 className="text-h1 font-medium tracking-[-0.02em] text-black dark:text-white">
                {selectedCategoryData.name}
              </h2>
              <p className="text-small text-black/60 dark:text-white/60">
                {selectedCategoryData.description}
              </p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
            <input
              type="text"
              placeholder="Search services in this category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[12px] text-small text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/20 dark:focus:border-white/20 backdrop-blur-[40px]"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-small text-black/60 dark:text-white/60">
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
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-black/20 dark:text-white/20" />
            </div>
            <p className="text-body text-black/60 dark:text-white/60 mb-2">
              No services found
            </p>
            <p className="text-small text-black/40 dark:text-white/40">
              Try adjusting your search
            </p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-12 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-emerald-500/15 backdrop-blur-xl rounded-xl p-4 md:p-5 lg:p-6">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-body font-medium tracking-[-0.01em] text-black dark:text-white mb-2">
                Need help choosing the right service?
              </h3>
              <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Our AI-powered recommendation engine can analyze your property portfolio and suggest the most relevant services based on your investment goals, property type, and current requirements.
              </p>
              <button
                onClick={() => navigate('/help-support')}
                className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 text-white rounded-[12px] text-small font-medium transition-all shadow-sm"
              >
                Get Personalized Recommendations
                <ArrowRight className="w-4 h-4" />
              </button>
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
