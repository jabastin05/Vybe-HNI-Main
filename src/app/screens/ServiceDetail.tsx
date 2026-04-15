import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Clock, IndianRupee, CheckCircle, FileText, Sparkles, X, MapPin, Home, Building2 } from 'lucide-react';
import { SideNav } from '../components/SideNav';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { getServiceById } from '../data/servicesData';

interface ServiceAttribute {
  name: string;
  description: string;
  eta: string;
  priceRange: string;
  requirements: string[];
  deliverables: string[];
  executionPartnerRole: string;
  enabled: boolean;
}

interface ServiceDetailData {
  id: string;
  name: string;
  categoryName: string;
  description: string;
  icon: any;
  color: string;
  badge?: string;
  featured: boolean;
  attributes: ServiceAttribute[];
}

interface PropertyOption {
  id: string;
  name: string;
  address: string;
  type: string;
}

// Mock properties for the user
const mockProperties: PropertyOption[] = [
  {
    id: 'prop-1',
    name: 'Prestige Lake Ridge',
    address: 'Whitefield, Bangalore',
    type: 'Apartment',
  },
  {
    id: 'prop-2',
    name: 'Brigade Orchards',
    address: 'Devanahalli, Bangalore',
    type: 'Villa',
  },
  {
    id: 'prop-3',
    name: 'Sobha City',
    address: 'Thanisandra, Bangalore',
    type: 'Plot',
  },
];

export function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const serviceData = getServiceById(serviceId as string) as ServiceDetailData;

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedCaseId, setGeneratedCaseId] = useState('');

  if (!serviceData) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-body text-black/60 dark:text-white/60">Service not found</p>
          <button
            onClick={() => navigate('/services/catalog')}
            className="mt-4 px-4 py-2.5  bg-black dark:bg-white text-white rounded-[12px] text-small"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const attribute = serviceData.attributes[0]; // Using first attribute as main service details

  const handleRequestService = () => {
    setShowRequestModal(true);
  };

  const handleSubmitRequest = async () => {
    if (!selectedProperty) {
      alert('Please select a property');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a case ID
    const caseId = `CASE-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setGeneratedCaseId(caseId);

    setIsSubmitting(false);
    setShowRequestModal(false);
    setShowSuccessModal(true);

    // Reset form
    setTimeout(() => {
      setSelectedProperty('');
      setRequestDetails('');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] transition-colors duration-300 pb-24 md:pb-8 pt-[60px] md:pt-0">
      <SideNav />

      {/* Header */}
      <div className="border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/services/catalog')}
              className="flex items-center gap-2 text-small text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <NotificationDropdown />
              </div>
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            </div>
          </div>

          <div>
            <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
              {serviceData.categoryName}
            </div>
            <h1 className="text-h1 font-medium tracking-[-0.02em] text-black dark:text-white mb-2">
              {serviceData.name}
            </h1>
            <p className="text-body text-black/60 dark:text-white/60 leading-relaxed">
              {serviceData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Price Card */}
              <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] border border-white/60 dark:border-white/10 rounded-xl card-padding shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-[12px] bg-emerald-500/10 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                  </div>
                  <span className="text-caption font-medium tracking-[0.05em] uppercase text-black/40 dark:text-white/40">
                    Pricing
                  </span>
                </div>
                <div className="text-h2 font-medium tracking-[-0.02em] text-black dark:text-white">
                  {attribute.priceRange}
                </div>
              </div>

              {/* TAT Card */}
              <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] border border-white/60 dark:border-white/10 rounded-xl card-padding shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-[12px] bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                  </div>
                  <span className="text-caption font-medium tracking-[0.05em] uppercase text-black/40 dark:text-white/40">
                    Turnaround Time
                  </span>
                </div>
                <div className="text-h2 font-medium tracking-[-0.02em] text-black dark:text-white">
                  {attribute.eta}
                </div>
              </div>
            </div>

            {/* What's Covered */}
            <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] border border-white/60 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
              <h2 className="text-body font-medium tracking-[-0.01em] text-black dark:text-white mb-4">
                What's Covered
              </h2>
              <p className="text-small text-black/60 dark:text-white/60 leading-relaxed">
                {attribute.description}
              </p>
            </div>

            {/* Deliverables */}
            <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] border border-white/60 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-[12px] bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                </div>
                <h2 className="text-body font-medium tracking-[-0.01em] text-black dark:text-white">
                  Deliverables
                </h2>
              </div>
              <div className="space-y-3">
                {attribute.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-small text-black/80 dark:text-white/80 leading-relaxed">
                      {deliverable}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] border border-white/60 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-[12px] bg-orange-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" strokeWidth={2} />
                </div>
                <h2 className="text-body font-medium tracking-[-0.01em] text-black dark:text-white">
                  Requirements
                </h2>
              </div>
              <div className="space-y-3">
                {attribute.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                    <span className="text-small text-black/80 dark:text-white/80 leading-relaxed">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Partner */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-blue-500/15 backdrop-blur-xl rounded-xl card-padding">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[12px] bg-blue-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-caption font-medium tracking-[0.05em] uppercase text-black/40 dark:text-white/40 mb-1">
                    Managed By
                  </div>
                  <div className="text-body font-medium text-black dark:text-white">
                    {attribute.executionPartnerRole}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-[40px] border border-white/60 dark:border-white/10 rounded-xl card-padding shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(0,0,0,0.05)]">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />
                
                <div className="mb-6">
                  <div className="text-caption font-medium tracking-[0.05em] uppercase text-black/40 dark:text-white/40 mb-2">
                    Starting from
                  </div>
                  <div className="text-h2 font-medium tracking-[-0.02em] text-black dark:text-white mb-1">
                    {attribute.priceRange.split(' - ')[0]}
                  </div>
                  <div className="text-caption text-black/60 dark:text-white/60">
                    Delivered in {attribute.eta}
                  </div>
                </div>

                <button
                  onClick={handleRequestService}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-[12px] text-body font-medium transition-all shadow-[0_8px_24px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 mb-4"
                >
                  Request This Service
                </button>

                <div className="space-y-3 text-caption text-black/60 dark:text-white/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" strokeWidth={2} />
                    <span>Instant RM assignment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" strokeWidth={2} />
                    <span>Expert execution partner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" strokeWidth={2} />
                    <span>Track progress in real-time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" strokeWidth={2} />
                    <span>Transparent pricing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-[#1A1A1A] border-b border-black/5 dark:border-white/10 card-padding rounded-t-[24px]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-h1 font-medium tracking-[-0.02em] text-black dark:text-white">
                    Request Service
                  </h2>
                  <p className="text-small text-black/60 dark:text-white/60 mt-1">
                    {serviceData.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="w-10 h-10 rounded-[12px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-black dark:text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="card-padding space-y-6">
              {/* Select Property */}
              <div>
                <label className="block text-caption font-medium tracking-[0.05em] uppercase text-black/60 dark:text-white/60 mb-3">
                  Select Property *
                </label>
                <div className="space-y-3">
                  {mockProperties.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => setSelectedProperty(property.id)}
                      className={`
                        w-full text-left p-4 rounded-[12px] border transition-all
                        ${selectedProperty === property.id
                          ? 'border-emerald-500 bg-emerald-500/5'
                          : 'border-black/10 dark:border-white/10 hover:border-emerald-500/50 bg-white/50 dark:bg-white/5'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0
                          ${property.type === 'Apartment' ? 'bg-blue-500/10' : property.type === 'Villa' ? 'bg-purple-500/10' : 'bg-orange-500/10'}
                        `}>
                          {property.type === 'Apartment' ? (
                            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                          ) : property.type === 'Villa' ? (
                            <Home className="w-5 h-5 text-purple-600 dark:text-purple-400" strokeWidth={2} />
                          ) : (
                            <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" strokeWidth={2} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-small font-medium text-black dark:text-white mb-1">
                            {property.name}
                          </div>
                          <div className="text-caption text-black/60 dark:text-white/60">
                            {property.address} • {property.type}
                          </div>
                        </div>
                        {selectedProperty === property.id && (
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" strokeWidth={2} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-caption font-medium tracking-[0.05em] uppercase text-black/60 dark:text-white/60 mb-3">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                  placeholder="Any specific requirements or notes..."
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[12px] text-small text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/20 dark:focus:border-white/20 resize-none"
                />
              </div>

              {/* Service Summary */}
              <div className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border border-emerald-500/20 dark:border-emerald-500/15 rounded-xl p-4">
                <div className="text-caption font-medium tracking-[0.05em] uppercase text-black/40 dark:text-white/40 mb-3">
                  Service Summary
                </div>
                <div className="space-y-2 text-small">
                  <div className="flex justify-between">
                    <span className="text-black/60 dark:text-white/60">Service</span>
                    <span className="text-black dark:text-white font-medium">{serviceData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60 dark:text-white/60">Turnaround Time</span>
                    <span className="text-black dark:text-white font-medium">{attribute.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60 dark:text-white/60">Estimated Cost</span>
                    <span className="text-black dark:text-white font-medium">{attribute.priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-[12px] p-4">
                <p className="text-caption text-black/60 dark:text-white/60 leading-relaxed">
                  <strong className="text-black dark:text-white">What happens next:</strong> Your dedicated Relationship Manager will review your request and assign an expert Execution Partner. You'll receive updates and can track progress in real-time.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-[#1A1A1A] border-t border-black/5 dark:border-white/10 card-padding rounded-b-[24px] mt-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="w-full sm:flex-1 py-2.5 border border-black/10 dark:border-white/10 rounded-xl text-small font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/[0.08] dark:active:bg-white/[0.08] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRequest}
                  disabled={!selectedProperty || isSubmitting}
                  className="w-full sm:flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 active:from-emerald-700 active:to-green-700 text-white rounded-xl text-small font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_24px_rgba(16,185,129,0.25)]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl max-w-md w-full card-padding shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-500" strokeWidth={2} />
            </div>
            <h2 className="text-h1 font-medium tracking-[-0.02em] text-black dark:text-white mb-3">
              Request Submitted!
            </h2>
            
            {/* Case ID Display */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-2 border-emerald-500/30 dark:border-emerald-500/20 rounded-xl p-4 mb-4">
              <div className="text-caption font-medium tracking-[0.05em] uppercase text-black/40 dark:text-white/40 mb-2">
                Case ID
              </div>
              <div className="text-h2 font-medium tracking-[-0.01em] text-emerald-600 dark:text-emerald-400 font-mono">
                {generatedCaseId}
              </div>
            </div>

            <p className="text-small text-black/60 dark:text-white/60 leading-relaxed mb-6">
              Your service request has been successfully submitted. Your Relationship Manager will review it and assign an expert Execution Partner shortly.
            </p>
            <div className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border border-emerald-500/20 dark:border-emerald-500/15 rounded-xl p-4 mb-6">
              <p className="text-caption text-black/60 dark:text-white/60">
                You can track the status of your request in the <strong className="text-black dark:text-white">Cases</strong> section.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-2.5 border border-black/10 dark:border-white/10 rounded-[12px] text-small font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => navigate('/cases')}
                className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-[12px] text-small font-medium transition-all shadow-[0_8px_24px_rgba(16,185,129,0.25)]"
              >
                View Cases
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}