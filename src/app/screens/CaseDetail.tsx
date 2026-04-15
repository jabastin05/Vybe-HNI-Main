import { Link, useParams, useNavigate } from 'react-router';
import { useCases, CaseMilestone } from '../contexts/CasesContext';
import { useProperties } from '../contexts/PropertiesContext';
import { ArrowLeft, FileText, MapPin, Calendar, Download, ExternalLink, CheckCircle2, Clock, Building2, TrendingUp, Users, DollarSign, Eye, FileDown, MessageCircle, Upload, CheckCircle, Plus, ArrowRight, Zap } from 'lucide-react';
import { SideNav } from '../components/SideNav';
import { useState, useEffect } from 'react';
import { servicesData } from '../data/servicesData';

export function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCase, updateCase } = useCases();
  const { getProperty } = useProperties();
  const [isUpdating, setIsUpdating] = useState(false);

  const backUrl = '/properties';
  const backLabel = 'Back to Case Management';

  const caseItem = getCase(id || '');

  // Auto-migrate old cases without milestones
  useEffect(() => {
    if (caseItem && (!caseItem.milestones || caseItem.milestones.length === 0)) {
      console.log('Migrating case to add milestones:', caseItem.caseId);
      const defaultMilestones = [
        { id: '1', title: 'Case submitted', status: 'completed' as const, date: new Date(caseItem.dateCreated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) },
        { id: '2', title: 'Documents reviewed', status: 'pending' as const },
        { id: '3', title: 'Partner assigned', status: 'pending' as const },
        { id: '4', title: 'Application filing', status: 'pending' as const },
        { id: '5', title: 'Authority follow-up', status: 'pending' as const },
        { id: '6', title: 'Case closed', status: caseItem.status === 'Closed' ? 'completed' as const : 'pending' as const, date: caseItem.dateClosed ? new Date(caseItem.dateClosed).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : undefined },
      ];

      const completedCount = defaultMilestones.filter(m => m.status === 'completed').length;
      const progress = Math.round((completedCount / defaultMilestones.length) * 100);

      updateCase(caseItem.id, {
        milestones: defaultMilestones,
        progress,
      });
    }
  }, [caseItem?.id]);

  if (!caseItem) {
    return (
      <div className="flex min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] pt-[60px] md:pt-0">
        <SideNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-h1 text-black dark:text-white mb-4">Case not found</h2>
            <Link 
              to="/properties"
              className="text-emerald-500 hover:text-emerald-400 text-small font-medium"
            >
              Back to Case Management
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get the actual property from PropertiesContext if propertyId exists
  const property = caseItem.propertyId ? getProperty(caseItem.propertyId) : null;
  const isHABU = caseItem.serviceRequested === 'HABU Report';
  const hasDocuments = property && property.documents && property.documents.length > 0;

  // Get service data to show required documents
  const serviceData = servicesData.find(
    service => service.name === caseItem.serviceRequested || 
               service.name === caseItem.subService ||
               service.categoryName === caseItem.serviceRequested
  );
  const serviceRequirements = serviceData?.attributes[0]?.requirements || [];
  const serviceDeliverables = serviceData?.attributes[0]?.deliverables || [];

  // Debug logging
  console.log('CaseDetail - Case:', caseItem);
  console.log('CaseDetail - Has milestones:', caseItem?.milestones);
  console.log('CaseDetail - Property:', property);
  console.log('CaseDetail - Has documents:', hasDocuments);
  console.log('CaseDetail - Service data:', serviceData);

  const handleMilestoneToggle = async (milestoneId: string) => {
    if (!caseItem || isUpdating) return;
    
    setIsUpdating(true);
    
    const updatedMilestones = caseItem.milestones?.map(milestone => {
      if (milestone.id === milestoneId) {
        // Toggle the milestone status
        const newStatus = milestone.status === 'pending' ? 'completed' : 'pending';
        const newDate = newStatus === 'completed' 
          ? new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : undefined;
        
        return {
          ...milestone,
          status: newStatus,
          date: newDate,
        };
      }
      return milestone;
    }) || [];

    // Calculate new progress
    const completedCount = updatedMilestones.filter(m => m.status === 'completed').length;
    const totalCount = updatedMilestones.length;
    const newProgress = Math.round((completedCount / totalCount) * 100);

    // Check if "Case closed" milestone is completed
    const caseClosedMilestone = updatedMilestones.find(m => m.title === 'Case closed');
    const newStatus = caseClosedMilestone?.status === 'completed' ? 'Closed' : 'Open';
    const dateClosed = newStatus === 'Closed' ? new Date().toISOString() : undefined;

    // Update the case
    updateCase(caseItem.id, {
      milestones: updatedMilestones,
      progress: newProgress,
      status: newStatus as 'Open' | 'Closed',
      dateClosed,
    });

    setTimeout(() => setIsUpdating(false), 300);
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'HABU Report':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Property Service':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Lease & Rent':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Sell or Liquidate':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      default:
        return 'bg-[#F2F2F2] dark:bg-[#0a0a0a]0/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] pt-[60px] md:pt-0">
      <SideNav />

      {/* Header */}
      <div className="flex-1 border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto container-padding py-3 md:py-4">
          {/* Back Button */}
          <Link
            to={backUrl}
            className="flex items-center gap-2 text-small text-black/60 dark:text-white/60
                       hover:text-black dark:hover:text-white transition-colors mb-3 md:mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{backLabel}</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Header Content - Horizontal Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
            {/* Left: Case Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h1 className="text-h3 md:text-h2 tracking-tight text-black dark:text-white leading-none">
                    {caseItem.caseId}
                  </h1>
                  <div className={`inline-flex items-center gap-2 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg border text-caption font-medium flex-shrink-0 ${
                    getServiceColor(caseItem.serviceRequested)
                  }`}>
                    <FileText className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    <span className="text-xs md:text-caption">{caseItem.subService || caseItem.serviceRequested}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-row items-center gap-2 md:gap-3 flex-shrink-0">
              {/* Chat Button */}
              <button
                onClick={() => navigate(`/case/${id}/chat`)}
                className="flex items-center justify-center gap-2 px-2.5 md:px-3 py-1.5 md:py-2 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 active:bg-black/80 dark:active:bg-white/80
                           text-white rounded-lg transition-all text-xs md:text-small font-medium
                           shadow-[0_2px_8px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]
                           relative"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Chat</span>
                {/* Notification Badge */}
                {caseItem.unreadMessages && caseItem.unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold
                                 rounded-full w-5 h-5 flex items-center justify-center
                                 shadow-lg animate-pulse">
                    {caseItem.unreadMessages}
                  </span>
                )}
              </button>

              {/* Status Badge */}
              <div className={`flex items-center justify-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg border text-xs md:text-small font-medium ${
                caseItem.status === 'Open'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 border-black/10 dark:border-white/10'
              }`}>
                {caseItem.status === 'Open' ? (
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                )}
                <span className="hidden sm:inline">{caseItem.status}</span>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="flex-1 pt-6 md:pt-8 pb-20 md:pb-8 container-padding">
        <div className="max-w-[1200px] mx-auto">
          {/* Case Progress */}
          {caseItem.milestones && caseItem.milestones.length > 0 && (
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-3 md:p-5 lg:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
                <h2 className="text-small font-medium text-black dark:text-white">
                  Case progress
                </h2>
                <div className="text-small text-black/60 dark:text-white/60">
                  {caseItem.progress || 0}% complete
                </div>
              </div>

              {/* Horizontal Progress Tracker */}
              <div className="relative">
                {/* Desktop: Horizontal Layout */}
                <div className="hidden lg:block">
                  <div className="relative flex items-start justify-between mb-4">
                    {/* Background Line */}
                    <div className="absolute top-[12px] left-0 right-0 h-[2px] bg-black/5 dark:bg-white/5" />
                    
                    {/* Progress Line */}
                    <div 
                      className="absolute top-[12px] left-0 h-[2px] bg-black dark:bg-white transition-all duration-500"
                      style={{ width: `${caseItem.progress || 0}%` }}
                    />

                    {/* Milestones */}
                    {caseItem.milestones.map((milestone, index) => (
                      <div 
                        key={milestone.id} 
                        className="relative flex flex-col items-center"
                        style={{ width: `${100 / caseItem.milestones!.length}%` }}
                      >
                        {/* Status Circle */}
                        <button
                          onClick={() => handleMilestoneToggle(milestone.id)}
                          disabled={isUpdating}
                          className={`
                            relative z-10 w-6 h-6 rounded-full flex-shrink-0 transition-all duration-300 mb-3
                            ${milestone.status === 'completed'
                              ? 'bg-black dark:bg-white cursor-pointer hover:scale-125 shadow-lg'
                              : 'bg-white dark:bg-[#0a0a0a] border-2 border-black/10 dark:border-white/10 cursor-pointer hover:border-black/30 dark:hover:border-white/30 hover:scale-110'
                            }
                            ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          {milestone.status === 'completed' && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2.5 h-2.5 bg-white dark:bg-black rounded-full" />
                            </div>
                          )}
                        </button>

                        {/* Milestone Info */}
                        <div className="text-center max-w-[120px]">
                          <div className={`text-caption mb-1 transition-colors leading-tight ${ 
                            milestone.status === 'completed'
                              ? 'text-black dark:text-white font-medium'
                              : 'text-black/40 dark:text-white/40'
                          }`}>
                            {milestone.title}
                          </div>
                          <div className="text-caption text-black/40 dark:text-white/40">
                            {milestone.date || 'Pending'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile/Tablet: Compact Grid */}
                <div className="lg:hidden">
                  {/* Progress Bar */}
                  <div className="relative w-full h-1 bg-black/5 dark:bg-white/5 rounded-full mb-6 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-black dark:bg-white rounded-full transition-all duration-500"
                      style={{ width: `${caseItem.progress || 0}%` }}
                    />
                  </div>

                  {/* Grid Layout */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {caseItem.milestones.map((milestone) => (
                      <button
                        key={milestone.id}
                        onClick={() => handleMilestoneToggle(milestone.id)}
                        disabled={isUpdating}
                        className={`
                          flex items-start gap-3 p-3 rounded-xl border transition-all
                          ${milestone.status === 'completed'
                            ? 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10'
                            : 'border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'
                          }
                          ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        <div className={`
                          w-5 h-5 rounded-full flex-shrink-0 transition-all mt-0.5
                          ${milestone.status === 'completed'
                            ? 'bg-black dark:bg-white'
                            : 'bg-white dark:bg-[#0a0a0a] border-2 border-black/10 dark:border-white/10'
                          }
                        `}>
                          {milestone.status === 'completed' && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white dark:bg-black rounded-full" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-left">
                          <div className={`text-caption mb-0.5 transition-colors leading-tight ${
                            milestone.status === 'completed'
                              ? 'text-black dark:text-white font-medium'
                              : 'text-black/40 dark:text-white/40'
                          }`}>
                            {milestone.title}
                          </div>
                          <div className="text-caption text-black/40 dark:text-white/40">
                            {milestone.date || 'Pending'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info Message */}
              <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/10">
                <p className="text-caption text-black/40 dark:text-white/40">
                  💡 Click on any milestone to update its status
                </p>
              </div>
            </div>
          )}

          {/* HABU Report Preview Section (Only for closed HABU cases) */}
          {isHABU && caseItem.status === 'Closed' && caseItem.habuPlans && caseItem.habuPlans.length > 0 && (
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6 mb-6">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h2 className="text-body font-medium text-black dark:text-white mb-1">
                    HABU Report Ready
                  </h2>
                  <p className="text-small text-black/50 dark:text-white/50">
                    Your High-value Analysis & Best-use Understanding report analysis is now available below
                  </p>
                </div>
                <Link
                  to="/report/habu"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white hover:bg-black/70 dark:bg-white/70 text-white rounded-lg text-small font-medium transition-all whitespace-nowrap shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(16,185,129,0.2)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_40px_-5px_rgba(16,185,129,0.4)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-xl" />
                  <ExternalLink className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">Open Full Report</span>
                </Link>
              </div>

              {/* HABU Plan Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {caseItem.habuPlans.map((plan) => {
                  const getThemeStyles = (theme: string) => {
                    switch (theme) {
                      case 'green':
                        return {
                          bg: 'bg-emerald-50/80 dark:bg-emerald-950/20',
                          border: 'border-emerald-200/50 dark:border-emerald-800/30',
                          iconBg: 'bg-emerald-500/10',
                          iconColor: 'text-emerald-600 dark:text-emerald-400',
                          insightBg: 'bg-emerald-100/80 dark:bg-emerald-900/20',
                          insightBorder: 'border-emerald-200/50 dark:border-emerald-800/30',
                          insightText: 'text-emerald-900 dark:text-emerald-100',
                          highlightBg: 'bg-emerald-500/10',
                          highlightText: 'text-emerald-700 dark:text-emerald-300'
                        };
                      case 'pink':
                        return {
                          bg: 'bg-pink-50/80 dark:bg-pink-950/20',
                          border: 'border-pink-200/50 dark:border-pink-800/30',
                          iconBg: 'bg-pink-500/10',
                          iconColor: 'text-pink-600 dark:text-pink-400',
                          insightBg: 'bg-pink-100/80 dark:bg-pink-900/20',
                          insightBorder: 'border-pink-200/50 dark:border-pink-800/30',
                          insightText: 'text-pink-900 dark:text-pink-100',
                          highlightBg: 'bg-pink-500/10',
                          highlightText: 'text-pink-700 dark:text-pink-300'
                        };
                      case 'yellow':
                        return {
                          bg: 'bg-yellow-50/80 dark:bg-yellow-950/20',
                          border: 'border-yellow-200/50 dark:border-yellow-800/30',
                          iconBg: 'bg-yellow-500/10',
                          iconColor: 'text-yellow-600 dark:text-yellow-400',
                          insightBg: 'bg-yellow-100/80 dark:bg-yellow-900/20',
                          insightBorder: 'border-yellow-200/50 dark:border-yellow-800/30',
                          insightText: 'text-yellow-900 dark:text-yellow-100',
                          highlightBg: 'bg-yellow-500/10',
                          highlightText: 'text-yellow-700 dark:text-yellow-300'
                        };
                      default:
                        return {
                          bg: 'bg-[#F2F2F2] dark:bg-[#0a0a0a]/80 dark:bg-black/[0.02] dark:bg-white/[0.02]/20',
                          border: 'border-gray-200/50 dark:border-gray-800/30',
                          iconBg: 'bg-[#F2F2F2] dark:bg-[#0a0a0a]0/10',
                          iconColor: 'text-gray-600 dark:text-gray-400',
                          insightBg: 'bg-[#F2F2F2] dark:bg-[#0a0a0a]/80 dark:bg-black/[0.02] dark:bg-white/[0.02]/20',
                          insightBorder: 'border-gray-200/50 dark:border-gray-800/30',
                          insightText: 'text-gray-900 dark:text-gray-100',
                          highlightBg: 'bg-[#F2F2F2] dark:bg-[#0a0a0a]0/10',
                          highlightText: 'text-gray-700 dark:text-gray-300'
                        };
                    }
                  };

                  const themeStyles = getThemeStyles(plan.theme);

                  const getIcon = (iconType: string) => {
                    switch (iconType) {
                      case 'clock':
                        return <Clock className={`w-5 h-5 ${themeStyles.iconColor}`} />;
                      case 'building':
                        return <Building2 className={`w-5 h-5 ${themeStyles.iconColor}`} />;
                      case 'trending':
                        return <TrendingUp className={`w-5 h-5 ${themeStyles.iconColor}`} />;
                      default:
                        return <FileText className={`w-5 h-5 ${themeStyles.iconColor}`} />;
                    }
                  };

                  return (
                    <div
                      key={plan.id}
                      className={`border rounded-xl p-5 ${themeStyles.bg} ${themeStyles.border} relative`}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-xl ${themeStyles.iconBg} flex items-center justify-center flex-shrink-0`}>
                          {getIcon(plan.icon)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] tracking-[0.05em] uppercase font-medium text-black/40 dark:text-white/40">
                              OPTION {plan.optionNumber}
                            </span>
                            {plan.badge === 'recommended' && (
                              <span className="px-1.5 py-0.5 bg-black dark:bg-white text-white text-[9px] font-medium tracking-wider uppercase rounded">
                                RECOMMENDED
                              </span>
                            )}
                          </div>
                          <h3 className="text-body font-medium text-black dark:text-white leading-tight">
                            {plan.title}
                          </h3>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {plan.metrics?.map((metric, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-xl ${
                              metric.highlight 
                                ? `${themeStyles.highlightBg} border ${themeStyles.border}` 
                                : 'bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10'
                            }`}
                          >
                            <div className="text-[9px] tracking-[0.05em] uppercase font-medium text-black/40 dark:text-white/40 mb-1">
                              {metric.label}
                            </div>
                            <div className={`text-body font-medium tracking-tight ${
                              metric.highlight 
                                ? themeStyles.highlightText 
                                : 'text-black dark:text-white'
                            }`}>
                              {metric.value}
                            </div>
                            {metric.subtext && (
                              <div className="text-caption text-black/50 dark:text-white/50 mt-0.5">
                                {metric.subtext}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Insights Section */}
                      <div className={`rounded-xl p-4 border ${themeStyles.insightBg} ${themeStyles.insightBorder}`}>
                        <div className="text-[9px] tracking-[0.05em] uppercase font-medium mb-2"
                             style={{ color: plan.insights?.type === 'why' ? '#16a34a' : '#dc2626' }}>
                          {plan.insights?.type === 'why' ? 'WHY THIS WORKS' : 'FOR MORE DETAILS DOWNLOAD HABU REPORT'}
                        </div>
                        <ul className={`space-y-1.5 ${themeStyles.insightText}`}>
                          {plan.insights?.points?.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-caption">
                              <span className="text-black/40 dark:text-white/40 mt-0.5">•</span>
                              <span className="flex-1">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Property Information */}
              <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
                <h2 className="text-caption uppercase tracking-wider text-black/40 dark:text-white/40 mb-6">
                  Property Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-caption text-black/40 dark:text-white/40 mb-1">Property Name</div>
                    <div className="text-body font-medium text-black dark:text-white">
                      {caseItem.propertyName}
                    </div>
                  </div>

                  <div>
                    <div className="text-caption text-black/40 dark:text-white/40 mb-1">Location</div>
                    <div className="flex items-center gap-2 text-small text-black/80 dark:text-white/80">
                      <MapPin className="w-4 h-4 text-black/40 dark:text-white/40" />
                      {caseItem.propertyLocation}
                    </div>
                  </div>

                  {property && (
                    <Link
                      to={`/property/${property.id}/detail`}
                      className="inline-flex items-center gap-2 text-small text-emerald-500 hover:text-emerald-400
                                 font-medium transition-colors mt-2"
                    >
                      View Property Details
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Documents (Only for owned properties) */}
              {property && hasDocuments && (
                <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-caption uppercase tracking-wider text-black/40 dark:text-white/40">
                      Linked Documents
                    </h2>
                    <Link
                      to={`/property/${property.id}/documents`}
                      className="text-small text-emerald-500 hover:text-emerald-400 font-medium"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {property.documents?.slice(0, 5).map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-black/5 dark:border-white/10
                                   hover:border-emerald-500/30 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <div className="text-small font-medium text-black dark:text-white">
                              {doc.name}
                            </div>
                            <div className="text-caption text-black/40 dark:text-white/40">
                              {doc.size}
                            </div>
                          </div>
                        </div>

                        <div className={`px-6 py-2.5 rounded-lg text-caption font-medium ${
                          doc.status === 'verified'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {doc.status === 'verified' ? 'Verified' : 'Processing'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Documents (Documents attached directly to the case) */}
              {caseItem.documents && caseItem.documents.length > 0 && (
                <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-caption uppercase tracking-wider text-black/40 dark:text-white/40">
                      Case Documents
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {caseItem.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-black/5 dark:border-white/10
                                   hover:border-emerald-500/30 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all group cursor-pointer"
                        onClick={() => {
                          // Trigger download
                          const link = document.createElement('a');
                          link.href = `/case-documents/${doc.name}`;
                          link.download = doc.name;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <div className="text-small font-medium text-black dark:text-white">
                              {doc.name}
                            </div>
                            <div className="text-caption text-black/40 dark:text-white/40">
                              {doc.size} • {doc.uploadedDate}
                            </div>
                          </div>
                        </div>

                        <Download className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message when documents not available */}
              {!property && (
                <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
                  <div className="text-center py-6">
                    <FileText className="w-12 h-12 text-black/20 dark:text-white/20 mx-auto mb-3" />
                    <p className="text-small text-black/50 dark:text-white/60">
                      Documents not available for non-owned properties
                    </p>
                  </div>
                </div>
              )}

              {/* Required Documents for Service */}
              {serviceRequirements.length > 0 && (
                <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
                  <h2 className="text-caption uppercase tracking-wider text-black/40 dark:text-white/40 mb-6">
                    Required Documents for Service
                  </h2>
                  
                  <div className="space-y-3">
                    {serviceRequirements.map((requirement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl border border-black/5 dark:border-white/10
                                   bg-gradient-to-br from-orange-500/5 to-red-500/5"
                      >
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                          <Upload className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-small font-medium text-black dark:text-white mb-1">
                            {requirement}
                          </div>
                          <div className="text-caption text-black/60 dark:text-white/60">
                            Required for case processing
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="mt-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <p className="text-caption text-black/60 dark:text-white/60 leading-relaxed">
                      <strong className="text-black dark:text-white">Note:</strong> Please ensure all required documents are uploaded to expedite the case processing. Contact your RM if you need assistance.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Timeline & Metadata */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
                <h2 className="text-caption uppercase tracking-wider text-black/40 dark:text-white/40 mb-4">
                  Quick Actions
                </h2>

                <div className="space-y-2">
                  {/* Chat with RM - Featured Action */}
                  <button
                    onClick={() => navigate(`/case/${id}/chat`)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-emerald-500/50 dark:border-emerald-500/30
                               bg-gradient-to-br from-emerald-500/10 to-green-500/10
                               hover:border-emerald-500 hover:bg-emerald-500/15 transition-all group relative"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500" strokeWidth={2} />
                      <span className="text-small text-emerald-700 dark:text-emerald-300 font-medium">Chat with RM</span>
                    </div>
                    {caseItem.unreadMessages && caseItem.unreadMessages > 0 && (
                      <span className="bg-black dark:bg-white text-white text-caption font-medium 
                                     rounded-full w-5 h-5 flex items-center justify-center">
                        {caseItem.unreadMessages}
                      </span>
                    )}
                  </button>

                  {property && (
                    <Link
                      to={`/property/${property.id}/detail`}
                      className="flex items-center justify-between p-3 rounded-lg border border-black/5 dark:border-white/10
                                 hover:border-emerald-500/30 hover:bg-black dark:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-emerald-500" />
                        <span className="text-small text-black dark:text-white">View Property</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-black/20 dark:text-white/20 group-hover:text-emerald-500" />
                    </Link>
                  )}

                  {property && (
                    <Link
                      to={`/property/${property.id}/documents`}
                      className="flex items-center justify-between p-3 rounded-lg border border-black/5 dark:border-white/10
                                 hover:border-emerald-500/30 hover:bg-black dark:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-emerald-500" />
                        <span className="text-small text-black dark:text-white">View Documents</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-black/20 dark:text-white/20 group-hover:text-emerald-500" />
                    </Link>
                  )}

                  <Link
                    to="/services/catalog"
                    className="flex items-center justify-between p-3 rounded-lg border border-black/5 dark:border-white/10
                              hover:border-emerald-500/30 hover:bg-black dark:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-emerald-500" />
                      <span className="text-small text-black dark:text-white">Request New Service</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-black/20 dark:text-white/20 group-hover:text-emerald-500" />
                  </Link>
                </div>
              </div>

              {/* Add Service Card */}
              <Link
                to="/services/catalog"
                className="block bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 
                           rounded-xl p-4 md:p-5 lg:p-6 relative overflow-hidden group
                           shadow-[0_8px_24px_rgba(16,185,129,0.25)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.4)]
                           transition-all hover:-translate-y-1"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-body font-medium text-white mb-2 tracking-tight">
                    Add Service
                  </h3>
                  <p className="text-small text-white/90 leading-relaxed">
                    Explore our comprehensive suite of real estate services tailored for your portfolio
                  </p>

                  {/* Stats */}
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/90">
                      <Zap className="w-4 h-4" />
                      <span className="text-caption font-medium">9 Service Categories Available</span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-700/30 rounded-full blur-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}