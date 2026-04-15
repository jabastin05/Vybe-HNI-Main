import { useParams, Link } from 'react-router';
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, Upload, FileText, MessageSquare } from 'lucide-react';
import { mockPropertyCases, mockMilestones, mockPartner } from '../data/mock-data';
import { SideNav } from '../components/SideNav';
import { ThemeToggle } from '../components/ThemeToggle';

export function ExecutionDashboard() {
  const { id } = useParams();
  const property = mockPropertyCases.find(p => p.id === id);

  if (!property) {
    return <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] flex items-center justify-center text-black/40 dark:text-white/40">Property not found</div>;
  }

  const activities = [
    { date: '2026-02-18', time: '14:32', type: 'document', message: 'Site survey report uploaded', user: mockPartner.name },
    { date: '2026-02-17', time: '10:15', message: 'Initial site assessment completed', user: mockPartner.name },
    { date: '2026-02-15', time: '16:45', type: 'milestone', message: 'Milestone: Partner Assignment - Completed', user: 'System' },
    { date: '2026-02-14', time: '09:20', message: 'Case status updated to In Execution', user: 'System' },
    { date: '2026-02-12', time: '11:30', type: 'document', message: 'HABU report finalized', user: 'AI Engine' },
  ];

  const documents = [
    { name: 'Site Survey Report.pdf', date: '2026-02-18', size: '2.4 MB', status: 'verified' },
    { name: 'Initial Assessment.pdf', date: '2026-02-17', size: '1.8 MB', status: 'verified' },
    { name: 'HABU Analysis Report.pdf', date: '2026-02-12', size: '5.2 MB', status: 'verified' },
  ];

  const completedMilestones = mockMilestones.filter(m => m.status === 'completed').length;
  const totalMilestones = mockMilestones.length;
  const progressPercentage = (completedMilestones / totalMilestones) * 100;

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0a0a0a] transition-colors duration-300">
      <SideNav />
      
      {/* Header - Full Width */}
      <div className="border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <Link to="/properties" className="flex items-center gap-2 text-small text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Cases
          </Link>
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
                Execution Dashboard
              </div>
              <div className="text-h1 tracking-tight text-black dark:text-white mb-2">
                {property.name}
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-lg text-caption border border-purple-500/20">
                In Execution
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-caption text-black/40 dark:text-white/40 mb-1 tracking-wide uppercase">Overall Progress</div>
                <div className="text-h1 tracking-tight text-black dark:text-white/95">{Math.round(progressPercentage)}%</div>
              </div>
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8 lg:py-10">
        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6 md:mb-8 lg:mb-10">
          <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-lg p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-caption text-black/40 dark:text-white/40 tracking-wide uppercase">Completed</div>
            </div>
            <div className="text-h1 tracking-tight text-black dark:text-white/95">
              {completedMilestones}/{totalMilestones}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-lg p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-caption text-black/40 dark:text-white/40 tracking-wide uppercase">In Progress</div>
            </div>
            <div className="text-h1 tracking-tight text-black dark:text-white/95">
              {mockMilestones.filter(m => m.status === 'in-progress').length}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-lg p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-yellow-500/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-caption text-black/40 dark:text-white/40 tracking-wide uppercase">Risk Alerts</div>
            </div>
            <div className="text-h1 tracking-tight text-black dark:text-white/95">0</div>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-lg p-4 md:p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-purple-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-caption text-black/40 dark:text-white/40 tracking-wide uppercase">Documents</div>
            </div>
            <div className="text-h1 tracking-tight text-black dark:text-white/95">{documents.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Milestone Tracker */}
          <div className="col-span-2 bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-lg p-10">
            <h3 className="text-small tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-8">
              Milestone Timeline
            </h3>
            
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="h-2 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-6">
              {mockMilestones.map((milestone, index) => {
                const isCompleted = milestone.status === 'completed';
                const isInProgress = milestone.status === 'in-progress';
                
                return (
                  <div key={milestone.id} className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted 
                          ? 'bg-emerald-500/20 border-2 border-emerald-500' 
                          : isInProgress 
                          ? 'bg-blue-500/20 border-2 border-blue-500 animate-pulse' 
                          : 'bg-white/5 border-2 border-white/10'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <span className={`text-caption ${isInProgress ? 'text-blue-400' : 'text-black/40 dark:text-white/40'}`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      {index < mockMilestones.length - 1 && (
                        <div className={`w-0.5 h-12 ${isCompleted ? 'bg-emerald-500/30' : 'bg-white/5'}`} />
                      )}
                    </div>

                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className={`text-body tracking-tight mb-1 ${
                            isCompleted || isInProgress ? 'text-black/95 dark:text-white/95' : 'text-black/50 dark:text-white/50'
                          }`}>
                            {milestone.title}
                          </h4>
                          <p className="text-caption text-black/40 dark:text-white/40">
                            Due: {new Date(milestone.dueDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                        {isCompleted && milestone.completedDate && (
                          <span className="text-caption text-emerald-400 bg-emerald-500/10 px-6 py-2.5 rounded">
                            Completed {new Date(milestone.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        {isInProgress && (
                          <span className="text-caption text-blue-400 bg-blue-500/10 px-6 py-2.5 rounded">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-lg p-4 md:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-small tracking-[0.05em] uppercase text-black/40 dark:text-white/50">
                  Documents
                </h3>
                <button className="p-2 bg-black/5 dark:bg-white/5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                  <Upload className="w-4 h-4 text-black/60 dark:text-white/60" />
                </button>
              </div>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 rounded-md p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-black/40 dark:text-white/40 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-caption text-black dark:text-white mb-1 truncate">{doc.name}</div>
                        <div className="text-caption text-black/40 dark:text-white/40">{doc.size} • {doc.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Contact */}
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-lg p-4 md:p-5 lg:p-6">
              <h3 className="text-small tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-6">
                Your Partner
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={mockPartner.photo}
                  alt={mockPartner.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="text-small text-black dark:text-white/95">{mockPartner.name}</div>
                  <div className="text-caption text-black/40 dark:text-white/40">{mockPartner.role}</div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-black/5 dark:bg-white/5 text-black dark:text-white/95 px-4 py-2.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-small tracking-wide border border-black/10 dark:border-white/10">
                <MessageSquare className="w-4 h-4" />
                Send Message
              </button>
            </div>

            {/* Risk Alerts */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4 md:p-5 lg:p-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div className="text-small text-black dark:text-white/95">All Clear</div>
              </div>
              <p className="text-caption text-black/50 dark:text-white/50">
                No active risk alerts. Project is progressing as planned.
              </p>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="mt-6 bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 rounded-lg p-10">
          <h3 className="text-small tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-8">
            Activity Log
          </h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 py-2.5 border-b border-black/5 dark:border-white/10 last:border-0">
                <div className="text-caption text-black/40 dark:text-white/40 w-32 flex-shrink-0">
                  {activity.date}
                  <br />
                  {activity.time}
                </div>
                <div className="flex-1">
                  <p className="text-small text-black dark:text-white mb-1">{activity.message}</p>
                  <p className="text-caption text-black/40 dark:text-white/40">by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}