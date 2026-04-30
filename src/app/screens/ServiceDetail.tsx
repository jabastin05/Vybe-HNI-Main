import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Clock, IndianRupee, CheckCircle, FileText, Sparkles, X, MapPin, Home, Building2 } from 'lucide-react';

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
 <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center">
 <div className="text-center">
 <p className="text-body text-gray-600 dark:text-white/50">Service not found</p>
 <button
 onClick={() => navigate('/services/catalog')}
 className="mt-4 px-4 py-2.5 bg-brand-primary text-white rounded-xl text-small"
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
 <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">

 {/* Mobile Hero */}
 <div className="md:hidden bg-gradient-to-br from-[#0B3360] via-brand-navy to-brand-primary/75 dark:from-background dark:to-background px-5 pt-6 pb-6 overflow-hidden">
 {/* Top bar */}
 <div className="flex items-center mb-5">
 <button
 onClick={() => navigate('/services/catalog')}
 className="flex items-center gap-2 text-white/60 active:text-white transition-colors duration-200"
 >
 <ArrowLeft className="w-4 h-4" />
 <span className="text-sm">Catalog</span>
 </button>
 </div>

 {/* Title + subtitle */}
 <p className="text-xs tracking-[0.16em] uppercase text-white/40 mb-2">{serviceData.categoryName}</p>
 <h1 className="text-3xl font-normal tracking-tight text-white leading-none mb-2">
 {serviceData.name}
 </h1>
 <div className="flex items-center gap-2 text-sm text-white/50">
 <span className="flex items-center gap-1">
 <IndianRupee className="w-3 h-3" strokeWidth={1.5} />
 {attribute.priceRange.split(' - ')[0]}
 </span>
 <span className="text-white/20">·</span>
 <span className="flex items-center gap-1">
 <Clock className="w-3 h-3" strokeWidth={1.5} />
 {attribute.eta}
 </span>
 </div>
 </div>

 {/* Desktop Header */}
 <div className="hidden md:block bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06]">
 <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
 <div className="flex items-center justify-between mb-6">
 <button
 onClick={() => navigate('/services/catalog')}
 className="flex items-center gap-2 text-small text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition-colors"
 >
 <ArrowLeft className="w-4 h-4" />
 Back to Catalog
 </button>
 </div>

 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-primary mb-2">
 {serviceData.categoryName}
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white mb-2">
 {serviceData.name}
 </h1>
 <p className="text-body text-gray-600 dark:text-white/50 leading-relaxed">
 {serviceData.description}
 </p>
 </div>
 </div>
 </div>

 {/* Main Content */}
 <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-8 lg:py-10">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Left Column - Details */}
 <div className="lg:col-span-2 space-y-4 md:space-y-6">

 {/* Mobile description */}
 <p className="md:hidden text-sm text-gray-600 dark:text-white/50 leading-relaxed">
 {serviceData.description}
 </p>

 {/* Overview Cards */}
 <div className="grid grid-cols-2 gap-4 md:gap-4">
 {/* Price Card */}
 <div className="relative bg-white dark:bg-card rounded-2xl shadow-card p-5 md:p-5">
 <div className="flex items-center gap-4 mb-2">
 <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-gold/8 flex items-center justify-center">
 <IndianRupee className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" strokeWidth={1.5} />
 </div>
 <span className="text-caption font-normal tracking-[0.05em] uppercase text-gray-400 dark:text-white/40">
 Pricing
 </span>
 </div>
 <div className="text-base font-normal tracking-[-0.01em] text-gray-900 dark:text-white">
 {attribute.priceRange}
 </div>
 </div>

 {/* TAT Card */}
 <div className="relative bg-white dark:bg-card rounded-2xl shadow-card p-5 md:p-5">
 <div className="flex items-center gap-4 mb-2">
 <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-navy/[0.07] dark:bg-white/[0.06] flex items-center justify-center">
 <Clock className="w-4 h-4 md:w-5 md:h-5 text-brand-navy dark:text-white/70" strokeWidth={1.5} />
 </div>
 <span className="text-caption font-normal tracking-[0.05em] uppercase text-gray-400 dark:text-white/40">
 Turnaround
 </span>
 </div>
 <div className="text-base font-normal tracking-[-0.01em] text-gray-900 dark:text-white">
 {attribute.eta}
 </div>
 </div>
 </div>

 {/* What's Covered */}
 <div className="bg-white dark:bg-card rounded-2xl shadow-card p-5 md:p-6">
 <h2 className="text-base font-normal tracking-tight text-gray-900 dark:text-white mb-3">
 What's Covered
 </h2>
 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed">
 {attribute.description}
 </p>
 </div>

 {/* Deliverables */}
 <div className="bg-white dark:bg-card rounded-2xl shadow-card p-5 md:p-6">
 <div className="flex items-center gap-4 mb-5">
 <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-gold/8 flex items-center justify-center">
 <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" strokeWidth={1.5} />
 </div>
 <h2 className="text-base font-normal tracking-tight text-gray-900 dark:text-white">
 Deliverables
 </h2>
 </div>
 <div className="space-y-3">
 {attribute.deliverables.map((deliverable, index) => (
 <div key={index} className="flex items-start gap-3">
 <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
 <span className="text-small text-gray-900/80 dark:text-white/80 leading-relaxed">
 {deliverable}
 </span>
 </div>
 ))}
 </div>
 </div>

 {/* Requirements */}
 <div className="bg-white dark:bg-card rounded-2xl shadow-card p-5 md:p-6">
 <div className="flex items-center gap-4 mb-5">
 <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-navy/[0.07] dark:bg-white/[0.06] flex items-center justify-center">
 <FileText className="w-4 h-4 md:w-5 md:h-5 text-brand-navy dark:text-white/70" strokeWidth={1.5} />
 </div>
 <h2 className="text-base font-normal tracking-tight text-gray-900 dark:text-white">
 Requirements
 </h2>
 </div>
 <div className="space-y-3">
 {attribute.requirements.map((requirement, index) => (
 <div key={index} className="flex items-start gap-3">
 <div className="w-4 h-4 rounded-full border border-brand-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
 <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
 </div>
 <span className="text-small text-gray-900/80 dark:text-white/80 leading-relaxed">
 {requirement}
 </span>
 </div>
 ))}
 </div>
 </div>

 {/* Execution Partner */}
 <div className="bg-white dark:bg-card rounded-2xl shadow-card p-5 md:p-6">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-gold/8 flex items-center justify-center">
 <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" strokeWidth={1.5} />
 </div>
 <div>
 <div className="text-caption font-normal tracking-[0.05em] uppercase text-gray-400 dark:text-white/40 mb-0.5">
 Managed By
 </div>
 <div className="text-body font-normal text-gray-900 dark:text-white">
 {attribute.executionPartnerRole}
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Right Column - CTA */}
 <div className="lg:col-span-1">
 <div className="sticky top-8">
 <div className="bg-white dark:bg-card rounded-2xl shadow-card p-5 md:p-6">
 <div className="mb-5">
 <div className="text-caption font-normal tracking-[0.05em] uppercase text-gray-400 dark:text-white/40 mb-1.5">
 Starting from
 </div>
 <div className="text-base font-normal tracking-[-0.01em] text-gray-900 dark:text-white mb-1">
 {attribute.priceRange.split(' - ')[0]}
 </div>
 <div className="text-caption text-gray-600 dark:text-white/50">
 Delivered in {attribute.eta}
 </div>
 </div>

 <button
 onClick={handleRequestService}
 className="w-full py-2.5 bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-active text-white rounded-xl text-small font-normal transition-colors mb-4"
 >
 Request This Service
 </button>

 <div className="space-y-4 text-caption text-gray-600 dark:text-white/50">
 <div className="flex items-center gap-2">
 <CheckCircle className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
 <span>Instant RM assignment</span>
 </div>
 <div className="flex items-center gap-2">
 <CheckCircle className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
 <span>Expert execution partner</span>
 </div>
 <div className="flex items-center gap-2">
 <CheckCircle className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
 <span>Track progress in real-time</span>
 </div>
 <div className="flex items-center gap-2">
 <CheckCircle className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
 <span>Transparent pricing</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Mobile CTA sticky bottom */}
 <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-card border-t border-gray-100 dark:border-white/[0.06] px-4 py-3 z-30">
 <button
 onClick={handleRequestService}
 className="w-full py-2.5 bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-active text-white rounded-xl text-small font-normal transition-colors"
 >
 Request This Service
 </button>
 </div>
 {/* Spacer for mobile sticky CTA */}
 <div className="md:hidden h-20" />
 </div>

 {/* Service Request Modal */}
 {showRequestModal && (
 <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[60] p-0 sm:p-4">
 <div className="bg-white dark:bg-card rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto flex flex-col">
 {/* Modal Header */}
 <div className="sticky top-0 bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06] px-5 py-4 rounded-t-2xl">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-base font-normal tracking-tight text-gray-900 dark:text-white">
 Request Service
 </h2>
 <p className="text-small text-gray-600 dark:text-white/50 mt-0.5">
 {serviceData.name}
 </p>
 </div>
 <button
 onClick={() => setShowRequestModal(false)}
 className="w-9 h-9 rounded-xl bg-brand-navy/5 dark:bg-white/5 hover:bg-brand-navy/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
 >
 <X className="w-4 h-4 text-gray-900 dark:text-white" />
 </button>
 </div>
 </div>

 {/* Modal Content */}
 <div className="px-5 py-5 space-y-5">
 {/* Select Property */}
 <div>
 <label className="block text-caption font-normal tracking-[0.05em] uppercase text-gray-600 dark:text-white/50 mb-3">
 Select Property *
 </label>
 <div className="space-y-2.5">
 {mockProperties.map((property) => (
 <button
 key={property.id}
 onClick={() => setSelectedProperty(property.id)}
 className={`
 w-full text-left p-4 rounded-xl border transition-all
 ${selectedProperty === property.id
 ? 'border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/[0.04]'
 : 'border-gray-100 dark:border-white/[0.06] hover:border-brand-gold/15 bg-white dark:bg-white/[0.03]'
 }
 `}
 >
 <div className="flex items-start gap-3">
 <div className={`
 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
 ${property.type === 'Apartment' ? 'bg-brand-navy/[0.07] dark:bg-white/[0.06]' : property.type === 'Villa' ? 'bg-brand-gold/8' : 'bg-brand-navy/[0.07] dark:bg-white/[0.06]'}
 `}>
 {property.type === 'Apartment' ? (
 <Building2 className="w-4 h-4 text-brand-navy dark:text-white/70" strokeWidth={1.5} />
 ) : property.type === 'Villa' ? (
 <Home className="w-4 h-4 text-brand-gold" strokeWidth={1.5} />
 ) : (
 <MapPin className="w-4 h-4 text-brand-navy dark:text-white/70" strokeWidth={1.5} />
 )}
 </div>
 <div className="flex-1">
 <div className="text-small font-normal text-gray-900 dark:text-white mb-0.5">
 {property.name}
 </div>
 <div className="text-caption text-gray-600 dark:text-white/50">
 {property.address} · {property.type}
 </div>
 </div>
 {selectedProperty === property.id && (
 <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
 )}
 </div>
 </button>
 ))}
 </div>
 </div>

 {/* Additional Details */}
 <div>
 <label className="block text-caption font-normal tracking-[0.05em] uppercase text-gray-600 dark:text-white/50 mb-3">
 Additional Details (Optional)
 </label>
 <textarea
 value={requestDetails}
 onChange={(e) => setRequestDetails(e.target.value)}
 placeholder="Any specific requirements or notes..."
 rows={4}
 className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/[0.06] rounded-xl text-small text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:border-brand-gold/15 resize-none transition-colors"
 />
 </div>

 {/* Service Summary */}
 <div className="bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] rounded-xl p-4">
 <div className="text-caption font-normal tracking-[0.05em] uppercase text-gray-400 dark:text-white/40 mb-3">
 Service Summary
 </div>
 <div className="space-y-2 text-small">
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-white/50">Service</span>
 <span className="text-gray-900 dark:text-white font-normal">{serviceData.name}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-white/50">Turnaround Time</span>
 <span className="text-gray-900 dark:text-white font-normal">{attribute.eta}</span>
 </div>
 <div className="flex justify-between">
 <span className="text-gray-600 dark:text-white/50">Estimated Cost</span>
 <span className="text-brand-gold font-normal">{attribute.priceRange}</span>
 </div>
 </div>
 </div>

 {/* Info Note */}
 <div className="bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] rounded-xl p-4">
 <p className="text-caption text-gray-600 dark:text-white/50 leading-relaxed">
 <strong className="text-gray-900 dark:text-white">What happens next:</strong> Your dedicated Relationship Manager will review your request and assign an expert Execution Partner. You'll receive updates and can track progress in real-time.
 </p>
 </div>
 </div>

 {/* Modal Footer */}
 <div className="sticky bottom-0 bg-white dark:bg-card border-t border-gray-100 dark:border-white/[0.06] px-5 py-4 rounded-b-2xl mt-auto">
 <div className="flex gap-3">
 <button
 onClick={() => setShowRequestModal(false)}
 className="flex-1 py-2.5 border border-gray-100 dark:border-white/[0.06] rounded-xl text-small font-normal text-gray-900 dark:text-white hover:bg-brand-navy/5 dark:hover:bg-white/5 active:bg-brand-navy/[0.08] dark:active:bg-white/[0.08] transition-colors"
 >
 Cancel
 </button>
 <button
 onClick={handleSubmitRequest}
 disabled={!selectedProperty || isSubmitting}
 className="flex-1 py-2.5 bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-active text-white rounded-xl text-small font-normal transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
 >
 {isSubmitting ? 'Submitting…' : 'Submit Request'}
 </button>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Success Modal */}
 {showSuccessModal && (
 <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
 <div className="bg-white dark:bg-card rounded-2xl max-w-md w-full text-center overflow-hidden">
 <div className="px-6 pt-8 pb-6">
 <div className="w-16 h-16 rounded-full bg-brand-gold/8 flex items-center justify-center mx-auto mb-5">
 <CheckCircle className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
 </div>
 <h2 className="text-base font-normal tracking-tight text-gray-900 dark:text-white mb-2">
 Request Submitted!
 </h2>

 {/* Case ID Display */}
 <div className="bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] rounded-xl p-5 mb-4">
 <div className="text-caption font-normal tracking-[0.05em] uppercase text-gray-400 dark:text-white/40 mb-1.5">
 Case ID
 </div>
 <div className="text-small font-normal tracking-[0.02em] text-brand-gold tracking-wider">
 {generatedCaseId}
 </div>
 </div>

 <p className="text-small text-gray-600 dark:text-white/50 leading-relaxed mb-4">
 Your service request has been submitted. Your Relationship Manager will review it and assign an expert Execution Partner shortly.
 </p>

 <div className="bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] rounded-xl p-5 mb-6">
 <p className="text-caption text-gray-600 dark:text-white/50">
 You can track the status of your request in the <strong className="text-gray-900 dark:text-white">Cases</strong> section.
 </p>
 </div>

 <div className="flex gap-3">
 <button
 onClick={() => setShowSuccessModal(false)}
 className="flex-1 py-2.5 border border-gray-100 dark:border-white/[0.06] rounded-xl text-small font-normal text-gray-900 dark:text-white hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-colors"
 >
 Close
 </button>
 <button
 onClick={() => navigate('/cases')}
 className="flex-1 py-2.5 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-xl text-small font-normal transition-colors"
 >
 View Cases
 </button>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
