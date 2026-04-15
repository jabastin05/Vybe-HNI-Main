import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, Users, FileText, Calendar, TrendingUp, Phone, Mail, MessageCircle, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useState } from 'react';
import { SideNav } from '../components/SideNav';
import { ThemeToggle } from '../components/ThemeToggle';
import { mockPropertyCases, mockPartner } from '../data/mock-data';

export function ExecutionTracker() {
  const { id } = useParams();

  // Get property case data
  const propertyCase = mockPropertyCases.find(p => p.id === id);
  const caseId = propertyCase?.caseId || 'VYBE-2026-001';

  // Track expanded phases - only active phase is expanded by default
  const [expandedPhases, setExpandedPhases] = useState<number[]>([2]);

  const togglePhase = (phaseId: number) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  // Mock execution data
  const phases = [
    {
      id: 1,
      name: 'Pre-Development',
      status: 'completed',
      progress: 100,
      timeline: '0–4 Months',
      startDate: 'Jan 2024',
      endDate: 'Apr 2024',
      milestones: [
        { name: 'Legal Due Diligence', status: 'completed', completedDate: 'Feb 15, 2024' },
        { name: 'Concept Design Freeze', status: 'completed', completedDate: 'Mar 10, 2024' },
        { name: 'Financial Feasibility', status: 'completed', completedDate: 'Mar 25, 2024' },
        { name: 'Partner Assignment', status: 'completed', completedDate: 'Apr 5, 2024' },
      ],
    },
    {
      id: 2,
      name: 'Regulatory Approvals',
      status: 'active',
      progress: 60,
      timeline: '4–8 Months',
      startDate: 'May 2024',
      endDate: 'Aug 2024',
      milestones: [
        { name: 'Plan Submission', status: 'completed', completedDate: 'May 12, 2024' },
        { name: 'Fire & Safety NOC', status: 'completed', completedDate: 'Jun 18, 2024' },
        { name: 'Environmental Clearance', status: 'active', completedDate: null },
        { name: 'Utility Approvals', status: 'pending', completedDate: null },
        { name: 'Building Permit', status: 'pending', completedDate: null },
      ],
    },
    {
      id: 3,
      name: 'Construction',
      status: 'pending',
      progress: 0,
      timeline: '8–30 Months',
      startDate: 'Sep 2024',
      endDate: 'Feb 2027',
      milestones: [
        { name: 'Site Mobilization', status: 'pending', completedDate: null },
        { name: 'Foundation Complete', status: 'pending', completedDate: null },
        { name: 'Structural Completion', status: 'pending', completedDate: null },
        { name: 'MEP & Finishing', status: 'pending', completedDate: null },
        { name: 'OC & Handover', status: 'pending', completedDate: null },
      ],
    },
    {
      id: 4,
      name: 'Monetization & Exit',
      status: 'pending',
      progress: 0,
      timeline: 'Ongoing',
      startDate: 'Dec 2026',
      endDate: 'Jun 2027',
      milestones: [
        { name: 'Pre-Launch Marketing', status: 'pending', completedDate: null },
        { name: 'Sales/Leasing', status: 'pending', completedDate: null },
        { name: 'Revenue Realization', status: 'pending', completedDate: null },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20', icon: CheckCircle2 };
      case 'active':
        return { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20', icon: Clock };
      case 'pending':
        return { bg: 'bg-black/5 dark:bg-white/5', text: 'text-black/40 dark:text-white/40', border: 'border-black/10 dark:border-white/10', icon: Clock };
      default:
        return { bg: 'bg-black/5 dark:bg-white/5', text: 'text-black/40 dark:text-white/40', border: 'border-black/10 dark:border-white/10', icon: Clock };
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] transition-colors duration-300">
      <SideNav />
      
      {/* Header - Full Width */}
      <div className="border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <div className="flex items-center justify-between">
            {/* Left: Back Button + Page Title */}
            <div className="flex items-center gap-4">
              <Link 
                to="/properties"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-black/60 dark:text-white/60"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <div className="text-caption tracking-wider uppercase text-black/40 dark:text-white/50 mb-2">
                  {caseId}
                </div>
                <div className="text-h1 tracking-tight text-black dark:text-white">
                  {propertyCase?.location || 'Property Location'}
                </div>
                <p className="text-small text-black/50 dark:text-white/60 mt-1">
                  {propertyCase?.parcelSize ? `${propertyCase.parcelSize} • ` : ''}Real-time phase tracking and milestone completion status
                  {propertyCase?.surveyNumber && ` • Survey No. ${propertyCase.surveyNumber}`}
                </p>
              </div>
            </div>

            {/* Right: Notification + Theme Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8 lg:py-10">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {/* Overall Progress */}
          <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
            <div className="text-caption tracking-widest uppercase text-black/40 dark:text-white/40 mb-3">
              Overall Progress
            </div>
            <div className="text-h1 tracking-tight text-black dark:text-white/95 font-light mb-3">
              40%
            </div>
            <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>

          {/* Current Phase */}
          <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <div className="text-caption tracking-widest uppercase text-black/40 dark:text-white/40">
                Current Phase
              </div>
            </div>
            <div className="text-body tracking-tight text-black dark:text-white/95 font-medium">
              Regulatory Approvals
            </div>
            <div className="text-caption text-black/50 dark:text-white/50 mt-1">
              60% complete
            </div>
          </div>

          {/* Days Elapsed */}
          <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-purple-500" />
              <div className="text-caption tracking-widest uppercase text-black/40 dark:text-white/40">
                Days Elapsed
              </div>
            </div>
            <div className="text-h1 tracking-tight text-black dark:text-white/95 font-light">
              178
            </div>
            <div className="text-caption text-black/50 dark:text-white/50 mt-1">
              of 1,260 days
            </div>
          </div>

          {/* Active Milestones */}
          <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-orange-500" />
              <div className="text-caption tracking-widest uppercase text-black/40 dark:text-white/40">
                Active Tasks
              </div>
            </div>
            <div className="text-h1 tracking-tight text-black dark:text-white/95 font-light">
              3
            </div>
            <div className="text-caption text-black/50 dark:text-white/50 mt-1">
              in progress
            </div>
          </div>
        </div>

        {/* Two Column Layout: Timeline (Left) + Sticky Sidebar (Right) */}
        <div className="grid grid-cols-[1fr_380px] gap-8">
          {/* Left Column: Timeline Overview */}
          <div>
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <div className="container-padding py-4 md:py-6 border-b border-black/5 dark:border-white/10">
                <h3 className="text-body tracking-tight text-black dark:text-white/95 font-medium">
                  Execution Timeline
                </h3>
                <p className="text-small text-black/40 dark:text-white/40 mt-1">
                  Track phase completion and milestone progress
                </p>
              </div>

              {/* Phase Timeline */}
              <div className="p-4 md:p-5 lg:p-6">
                {phases.map((phase, index) => {
                  const statusColors = getStatusColor(phase.status);
                  const StatusIcon = statusColors.icon;
                  const isExpanded = expandedPhases.includes(phase.id);

                  return (
                    <div key={phase.id} className="mb-8 last:mb-0">
                      {/* Phase Header - Now Clickable */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl ${statusColors.bg} ${statusColors.text} border ${statusColors.border} flex items-center justify-center flex-shrink-0`}>
                          {phase.status === 'completed' ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <div className="text-body font-medium">{phase.id}</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <button
                            onClick={() => togglePhase(phase.id)}
                            className="w-full flex items-center justify-between mb-2 text-left hover:opacity-80 transition-opacity"
                          >
                            <div>
                              <h4 className="text-body font-medium text-black dark:text-white mb-1">
                                Phase {phase.id}: {phase.name}
                              </h4>
                              <div className="text-caption text-black/40 dark:text-white/40">
                                {phase.startDate} - {phase.endDate} · {phase.timeline}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={`px-6 py-2.5 rounded-lg text-caption font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border} capitalize`}>
                                {phase.status}
                              </div>
                              <ChevronDown 
                                className={`w-5 h-5 text-black/40 dark:text-white/40 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </button>

                          {/* Collapsible Content */}
                          {isExpanded && (
                            <>
                              {/* Progress Bar */}
                              <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="text-caption text-black/50 dark:text-white/50">Progress</div>
                                  <div className="text-caption font-medium text-black dark:text-white/95">{phase.progress}%</div>
                                </div>
                                <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      phase.status === 'completed' ? 'bg-emerald-500' :
                                      phase.status === 'active' ? 'bg-blue-500' :
                                      'bg-black/10 dark:bg-white/10'
                                    }`}
                                    style={{ width: `${phase.progress}%` }}
                                  />
                                </div>
                              </div>

                              {/* Milestones */}
                              <div className="space-y-2">
                                {phase.milestones.map((milestone, mIndex) => {
                                  const milestoneColors = getStatusColor(milestone.status);
                                  return (
                                    <div 
                                      key={mIndex}
                                      className={`flex items-center justify-between p-3 rounded-lg ${milestoneColors.bg} border ${milestoneColors.border}`}
                                    >
                                      <div className="flex items-center gap-3">
                                        {milestone.status === 'completed' ? (
                                          <CheckCircle2 className={`w-4 h-4 ${milestoneColors.text}`} />
                                        ) : milestone.status === 'active' ? (
                                          <Clock className={`w-4 h-4 ${milestoneColors.text}`} />
                                        ) : (
                                          <div className={`w-4 h-4 rounded-full border-2 ${milestoneColors.border}`}></div>
                                        )}
                                        <div>
                                          <div className={`text-small font-medium ${milestone.status === 'pending' ? 'text-black/40 dark:text-white/40' : 'text-black dark:text-white/95'}`}>
                                            {milestone.name}
                                          </div>
                                          {milestone.completedDate && (
                                            <div className="text-caption text-black/40 dark:text-white/40">
                                              Completed: {milestone.completedDate}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      {milestone.status === 'active' && (
                                        <div className="text-caption font-medium text-blue-600 dark:text-blue-400">
                                          In Progress
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Connector Line */}
                      {index < phases.length - 1 && (
                        <div className="ml-6 h-8 w-0.5 bg-black/10 dark:bg-white/10"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="space-y-6 sticky top-8 self-start">
            {/* Core Team */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-black/40 dark:text-white/40" />
                  <h3 className="text-body tracking-tight text-black dark:text-white/95 font-medium">
                    Core Team
                  </h3>
                </div>
              </div>
              <div className="p-4 md:p-5 lg:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-small text-black/60 dark:text-white/60">Project Manager</div>
                  <div className="text-small font-medium text-black dark:text-white/95">Rajesh Malhotra</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-small text-black/60 dark:text-white/60">Architect</div>
                  <div className="text-small font-medium text-black dark:text-white/95">Assigned</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-small text-black/60 dark:text-white/60">Legal Counsel</div>
                  <div className="text-small font-medium text-black dark:text-white/95">Assigned</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-small text-black/60 dark:text-white/60">Contractor</div>
                  <div className="text-small font-medium text-black/40 dark:text-white/40">Pending</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-black/5 dark:border-white/10">
                <h3 className="text-body tracking-tight text-black dark:text-white/95 font-medium">
                  Performance Metrics
                </h3>
              </div>
              <div className="p-4 md:p-5 lg:p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-caption text-black/60 dark:text-white/60">Budget Utilization</div>
                    <div className="text-small font-medium text-black dark:text-white/95">28%</div>
                  </div>
                  <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-black dark:bg-white rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-caption text-black/60 dark:text-white/60">Timeline Adherence</div>
                    <div className="text-small font-medium text-emerald-600 dark:text-emerald-400">98%</div>
                  </div>
                  <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-black dark:bg-white rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-caption text-black/60 dark:text-white/60">Quality Score</div>
                    <div className="text-small font-medium text-black dark:text-white/95">4.8/5</div>
                  </div>
                  <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-black dark:bg-white rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Execution Partner Contact Card */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-xl overflow-hidden">
              <div className="p-4 md:p-5 lg:p-6">
                {/* Support Label - Glass-Data Label/Micro Style */}
                <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/40 mb-3 font-medium">
                  Need Support?
                </div>
                
                {/* Heading - Glass-Data Heading/H1 Style */}
                <h4 className="text-body font-medium text-black dark:text-white mb-6 tracking-tight">
                  Contact Execution Partner
                </h4>

                {/* Contact Info - Glass-Data Body/Main Style */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-black/40 dark:text-white/40" />
                    <span className="text-small text-black/60 dark:text-white/60">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-black/40 dark:text-white/40" />
                    <span className="text-small text-black/60 dark:text-white/60">partner@vybe.in</span>
                  </div>
                </div>

                {/* Send Message Button - Institutional Style */}
                <button className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg text-small font-medium tracking-wide transition-all hover:bg-black/90 dark:hover:bg-white/90 inline-flex items-center justify-center gap-2 shadow-sm">
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}