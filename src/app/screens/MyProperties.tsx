import { Link, useNavigate } from 'react-router';
import { Building2, Plus, ArrowRight, Sparkles, Briefcase, ChevronRight, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const locationLabel = (p: any) =>
    p.city && p.state       ? `${p.city}, ${p.state}`
    : p.district && p.state ? `${p.district}, ${p.state}`
    : p.state               ? p.state
    : 'N/A';

  const totalCities = new Set(
    properties.map(p => p.city || p.district || p.state).filter(Boolean)
  ).size;

  const propertyTypes = ['All', ...Array.from(new Set(properties.map(p => p.type).filter(Boolean)))];

  const typeFilteredProperties =
    typeFilter === 'All' ? properties : properties.filter(p => p.type === typeFilter);

  const filteredProperties = searchQuery.trim()
    ? typeFilteredProperties.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locationLabel(p).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.type || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : typeFilteredProperties;

  const typeCount = (type: string) =>
    type === 'All' ? properties.length : properties.filter(p => p.type === type).length;

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
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl text-sm font-normal active:scale-[0.98] transition-transform"
            >
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
                      idx < filteredProperties.length - 1
                        ? 'border-b border-gray-100 dark:border-white/[0.05]'
                        : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/[0.08] dark:bg-brand-primary/[0.15] flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
                    </div>
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
        <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06]">
          <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-primary mb-2">
                  Portfolio
                </div>
                <h1 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
                  My Properties
                </h1>
                <p className="text-small text-gray-500 dark:text-white/50 mt-1">
                  Manage your entire property portfolio in one place
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center gap-2
                    bg-brand-primary hover:bg-brand-primary-hover text-white
                    px-5 py-2.5 rounded-xl text-small font-normal
                    transition-all duration-200"
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
            <div className="bg-white dark:bg-card rounded-2xl shadow-card p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/[0.06] flex items-center justify-center mx-auto mb-5">
                <Building2 className="w-8 h-8 text-brand-primary" strokeWidth={1.5} />
              </div>
              <h2 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white mb-3">No Properties Yet</h2>
              <p className="text-body text-gray-600 dark:text-white/50 max-w-md mx-auto mb-8 leading-relaxed">
                Add your first property to unlock HABU analysis, document storage, and premium services.
              </p>
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-xl text-small font-normal transition-all"
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} />
                Add Your First Property
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-card rounded-2xl overflow-hidden">
              {/* Filter tabs */}
              <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100 dark:border-white/[0.05]">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-5 py-3.5 text-sm font-normal whitespace-nowrap transition-all duration-200 border-b-2 ${
                      typeFilter === type
                        ? 'text-brand-primary border-brand-primary'
                        : 'text-gray-400 dark:text-white/40 border-transparent hover:text-gray-600 dark:hover:text-white/60'
                    }`}
                  >
                    {type}
                    <span className={`text-xs ${typeFilter === type ? 'text-brand-primary/60' : 'text-gray-300 dark:text-white/20'}`}>
                      {typeCount(type)}
                    </span>
                  </button>
                ))}
              </div>
              {/* Search row */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-white/[0.05]">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Search by name, location or type…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/[0.04] rounded-xl
                      text-sm text-gray-900 dark:text-white
                      placeholder:text-gray-400 dark:placeholder:text-white/30
                      focus:outline-none focus:ring-2 focus:ring-brand-primary/20
                      transition-all duration-200"
                  />
                </div>
              </div>

              {/* Property rows */}
              {filteredProperties.map((property, idx) => (
                <Link
                  key={property.id}
                  to={`/property/${property.id}/detail`}
                  className={`flex items-center gap-4 px-5 py-4 bg-white dark:bg-card hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors duration-150 ${
                    idx < filteredProperties.length - 1
                      ? 'border-b border-gray-100 dark:border-white/[0.05]'
                      : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/[0.08] dark:bg-brand-primary/[0.15] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-normal text-gray-900 dark:text-white truncate mb-0.5">
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-white/40">
                      <span className="truncate">{locationLabel(property)}</span>
                      {property.type && (
                        <>
                          <span className="text-gray-200 dark:text-white/10">·</span>
                          <span className="flex-shrink-0">{property.type}</span>
                        </>
                      )}
                      {property.buildingType && (
                        <>
                          <span className="text-gray-200 dark:text-white/10">·</span>
                          <span className="flex-shrink-0 capitalize">{property.buildingType}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-white/30 flex-shrink-0">
                    {formatDate(property.dateAdded)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 dark:text-white/20 flex-shrink-0" strokeWidth={1.5} />
                </Link>
              ))}

              {/* Add another row */}
              <Link
                to="/upload"
                className="flex items-center gap-4 px-5 py-4 border-t border-dashed border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors duration-150"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-gray-400 dark:text-white/40">Add Another Property</span>
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}