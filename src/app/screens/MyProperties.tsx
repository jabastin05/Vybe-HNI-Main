import { Link } from 'react-router';
import { Building2, Plus, TrendingUp, ExternalLink } from 'lucide-react';
import { SideNav } from '../components/SideNav';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { RMAccess } from '../components/RMAccess';
import { useProperties } from '../contexts/PropertiesContext';

export function MyProperties() {
  const { properties } = useProperties();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] transition-colors duration-300 pb-24 md:pb-8 pt-[60px] md:pt-0">
      <SideNav />

      {/* Header */}
      <div className="border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
                Portfolio
              </div>
              <div className="text-h1 tracking-tight text-black dark:text-white">
                My Properties
              </div>
              <p className="text-small text-black/50 dark:text-white/60 mt-1">
                Manage all your properties in one place
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
              <Link
                to="/upload"
                className="flex md:inline-flex items-center justify-center gap-2 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 text-white px-4 md:px-5 py-2.5 rounded-lg transition-all text-small shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(255,199,0,0.4)] hover:-translate-y-0.5 flex-1 md:flex-initial"
              >
                <Plus className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                <span className="hidden sm:inline">Add Property</span>
                <span className="sm:hidden">Add</span>
              </Link>
              <RMAccess />
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
        {properties.length === 0 ? (
          /* Empty State */
          <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl rounded-xl border border-black/5 dark:border-white/10 p-4 md:p-5 lg:p-6 md:p-10 lg:p-12 text-center shadow-lg">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 md:w-10 md:h-10 text-black/30 dark:text-white/30" />
            </div>
            <h2 className="text-h1 tracking-tight text-black dark:text-white mb-2">
              No Properties Yet
            </h2>
            <p className="text-body text-black/60 dark:text-white/60 max-w-md mx-auto mb-8">
              Start building your property portfolio by adding your first property. Get comprehensive HABU analysis and unlock premium features.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 text-black container-padding py-3 md:py-2.5 rounded-lg transition-all text-small font-medium shadow-[0_8px_24px_rgba(255,199,0,0.25)] hover:shadow-[0_8px_32px_rgba(255,199,0,0.4)] hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Your First Property
            </Link>
          </div>
        ) : (
          /* Properties Grid */
          <div className="space-y-6 md:space-y-8">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] rounded-xl border border-white/60 dark:border-white/10 p-4 md:p-5 lg:p-4 md:p-5 lg:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
                <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
                  Total Properties
                </div>
                <div className="text-h1 font-medium tracking-[-0.02em] text-black dark:text-white">
                  {properties.length}
                </div>
              </div>

              <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] rounded-xl border border-white/60 dark:border-white/10 p-4 md:p-5 lg:p-4 md:p-5 lg:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
                <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
                  Property Types
                </div>
                <div className="text-h1 font-medium tracking-[-0.02em] text-black dark:text-white">
                  {new Set(properties.map(p => p.type)).size}
                </div>
              </div>

              <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] rounded-xl border border-white/60 dark:border-white/10 p-4 md:p-5 lg:p-4 md:p-5 lg:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
                <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
                  Locations
                </div>
                <div className="text-h1 font-medium tracking-[-0.02em] text-black dark:text-white">
                  {new Set(properties.map(p => p.city || p.district || p.state).filter(Boolean)).size}
                </div>
              </div>
            </div>

            {/* Properties List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-[40px] rounded-xl border border-white/40 dark:border-white/10 p-4 md:p-5
                             shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]
                             hover:shadow-[0_2px_4px_rgba(0,0,0,0.03),0_24px_48px_-5px_rgba(0,0,0,0.1)]
                             transition-all duration-300 group relative overflow-hidden
                             hover:border-emerald-500/20 dark:hover:border-emerald-500/30
                             hover:-translate-y-1 flex flex-col"
                >
                  {/* Top highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

                  {/* Header with ID and Type */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:gap-3 mb-4 md:mb-5 relative z-10">
                    <div className="flex-1">
                      <div className="text-caption font-bold tracking-[0.05em] uppercase text-black/40 dark:text-white/40 mb-1.5">
                        Property ID: {property.id}
                      </div>
                      <h3 className="text-h2 md:text-h1 font-semibold tracking-tight text-black dark:text-white">
                        {property.name}
                      </h3>
                    </div>
                  </div>

                  {/* Type Badges */}
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
                    <div className="inline-flex items-center px-2.5 py-1.5 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10">
                      <span className="text-caption font-semibold text-black dark:text-white capitalize">
                        {property.buildingType || 'N/A'}
                      </span>
                    </div>
                    <div className="inline-flex items-center px-2.5 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg border border-emerald-500/20">
                      <span className="text-caption font-semibold text-emerald-600 dark:text-emerald-400">
                        {property.type}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4 md:mb-5 pb-4 md:pb-5 border-b border-black/5 dark:border-white/10 flex-1">
                    <div className="text-small font-medium text-black dark:text-white">
                      {property.city && property.state
                        ? `${property.city}, ${property.state}`
                        : property.district && property.state
                        ? `${property.district}, ${property.state}`
                        : property.state || 'N/A'}
                    </div>
                  </div>

                  {/* Footer with Date and CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-caption text-black/40 dark:text-white/40 order-2 sm:order-1">
                      Added {formatDate(property.dateAdded)}
                    </div>
                    <Link
                      to={`/property/${property.id}/detail`}
                      className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2 text-small font-medium
                               text-black dark:text-white
                               px-4 md:px-5 py-2.5 rounded-xl
                               hover:bg-black/5 dark:hover:bg-white/5
                               transition-all border border-transparent"
                    >
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}