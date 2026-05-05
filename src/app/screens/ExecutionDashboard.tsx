import { useParams, Link } from 'react-router';
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, Upload, FileText, MessageSquare } from 'lucide-react';
import { mockPropertyCases, mockMilestones, mockPartner } from '../data/mock-data';
import { ThemeToggle } from '../components/ThemeToggle';

export function ExecutionDashboard() {
 const { id } = useParams();
 const property = mockPropertyCases.find(p => p.id === id);

 if (!property) {
 return <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center text-gray-400 dark:text-white/40">Property not found</div>;
 }

 const activities = [
 { date: '2026-02-18', time: '14:32', type: 'document', message: 'Site survey report uploaded', user: mockPartner.name },
 { date: '2026-02-17', time: '10:15', message: 'Initial site assessment completed', user: mockPartner.name },
 { date: '2026-02-15', time: '16:45', type: 'milestone', message: 'Milestone: Partner Assignment - Completed', user: 'System' },
 { date: '2026-02-14', time: '09:20', message: 'Case status updated to In Progress', user: 'System' },
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
 <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">

 
 {/* Header - Full Width */}
 <div className="bg-white dark:bg-card border-b border-gray-100 dark:border-white/[0.06] shadow-header">
 <div className="max-w-[1500px] mx-auto container-padding py-4 md:py-6">
 <Link
 to="/cases"
 className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-navy/[0.04] dark:bg-white/[0.04] hover:bg-brand-navy/[0.08] dark:hover:bg-white/[0.08] flex-shrink-0 transition-colors mb-4"
 >
 <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-white/50" />
 </Link>
 <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
 <div>
 <div className="text-caption tracking-[0.05em] uppercase text-gray-400 dark:text-white/50 mb-2">
 Project Tracker
 </div>
 <div className="text-h1 tracking-tight md:font-semibold text-gray-900 dark:text-white mb-2">
 {property.name}
 </div>
 <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-lg text-caption border border-purple-500/20">
 In Progress
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-right">
 <div className="text-caption text-gray-400 dark:text-white/40 mb-1 tracking-wide uppercase">Overall Progress</div>
 <div className="text-h1 tracking-tight text-gray-900 dark:text-white/95">{Math.round(progressPercentage)}%</div>
 </div>
 <div className="hidden md:block">
 <ThemeToggle />
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="max-w-[1500px] mx-auto container-padding py-6 md:py-8 lg:py-10">
 {/* Status Cards */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8 lg:mb-10">
 {/* Completed */}
 <div className="bg-white dark:bg-card rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-card">
 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
 <CheckCircle2 className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
 </div>
 <div className="text-caption font-medium tracking-[0.14em] uppercase text-gray-400 dark:text-white/40 mb-4">Completed</div>
 <div className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
 {completedMilestones}/{totalMilestones}
 </div>
 <div className="text-small text-gray-500 dark:text-white/50">milestones done</div>
 </div>

 {/* In Progress */}
 <div className="bg-white dark:bg-card rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-card">
 <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
 <Clock className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
 </div>
 <div className="text-caption font-medium tracking-[0.14em] uppercase text-gray-400 dark:text-white/40 mb-4">In Progress</div>
 <div className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
 {mockMilestones.filter(m => m.status === 'in-progress').length}
 </div>
 <div className="text-small text-gray-500 dark:text-white/50">active milestones</div>
 </div>

 {/* Risk Alerts */}
 <div className="bg-white dark:bg-card rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-card">
 <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
 <AlertCircle className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
 </div>
 <div className="text-caption font-medium tracking-[0.14em] uppercase text-gray-400 dark:text-white/40 mb-4">Risk Alerts</div>
 <div className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white mb-2">0</div>
 <div className="text-small text-gray-500 dark:text-white/50">no flags raised</div>
 </div>

 {/* Documents */}
 <div className="bg-white dark:bg-card rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-card">
 <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
 <FileText className="w-5 h-5 text-purple-500" strokeWidth={1.5} />
 </div>
 <div className="text-caption font-medium tracking-[0.14em] uppercase text-gray-400 dark:text-white/40 mb-4">Documents</div>
 <div className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white mb-2">{documents.length}</div>
 <div className="text-small text-gray-500 dark:text-white/50">files uploaded</div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
 {/* Milestone Tracker */}
 <div className="col-span-2 bg-white dark:bg-card shadow-card rounded-lg p-10">
 <h3 className="text-small tracking-[0.05em] uppercase text-gray-400 dark:text-white/50 mb-8">
 Milestone Timeline
 </h3>
 
 {/* Progress Bar */}
 <div className="mb-10">
 <div className="h-2 rounded-full bg-brand-navy/5 dark:bg-white/5 overflow-hidden">
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
 <span className={`text-caption ${isInProgress ? 'text-blue-400' : 'text-gray-400 dark:text-white/40'}`}>
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
 <h4 className={`text-body tracking-tight md:font-medium mb-1 ${
 isCompleted || isInProgress ? 'text-gray-900/95 dark:text-white/95' : 'text-gray-600 dark:text-white/50'
 }`}>
 {milestone.title}
 </h4>
 <p className="text-caption text-gray-400 dark:text-white/40">
 Due: {new Date(milestone.dueDate).toLocaleDateString('en-US', { 
 month: 'short', 
 day: 'numeric', 
 year: 'numeric' 
 })}
 </p>
 </div>
 {isCompleted && milestone.completedDate && (
 <span className="text-caption text-emerald-400 bg-brand-gold/8 px-6 py-2.5 rounded">
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
 <div className="bg-white dark:bg-card shadow-card rounded-lg p-4 md:p-5 lg:p-6">
 <div className="flex items-center justify-between mb-6">
 <h3 className="text-small tracking-[0.05em] uppercase text-gray-400 dark:text-white/50">
 Documents
 </h3>
 <button className="p-2 bg-brand-navy/5 dark:bg-white/5 rounded-md hover:bg-brand-navy/10 dark:hover:bg-white/10 transition-colors">
 <Upload className="w-4 h-4 text-gray-600 dark:text-white/50" />
 </button>
 </div>
 <div className="space-y-3">
 {documents.map((doc, index) => (
 <div key={index} className="bg-brand-navy/[0.02] dark:bg-white/[0.02] shadow-card rounded-md p-4">
 <div className="flex items-start gap-3">
 <FileText className="w-4 h-4 text-gray-400 dark:text-white/40 mt-0.5 flex-shrink-0" />
 <div className="flex-1 min-w-0">
 <div className="text-caption text-gray-900 dark:text-white mb-1 truncate">{doc.name}</div>
 <div className="text-caption text-gray-400 dark:text-white/40">{doc.size} • {doc.date}</div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Partner Contact */}
 <div className="bg-white dark:bg-card shadow-card rounded-lg p-4 md:p-5 lg:p-6">
 <h3 className="text-small tracking-[0.05em] uppercase text-gray-400 dark:text-white/50 mb-6">
 Your Expert
 </h3>
 <div className="flex items-center gap-4 mb-4">
 <img
 src={mockPartner.photo}
 alt={mockPartner.name}
 className="w-12 h-12 rounded-lg object-cover"
 />
 <div>
 <div className="text-small text-gray-900 dark:text-white/95">{mockPartner.name}</div>
 <div className="text-caption text-gray-400 dark:text-white/40">{mockPartner.role}</div>
 </div>
 </div>
 <button className="w-full flex items-center justify-center gap-2 bg-brand-navy/5 dark:bg-white/5 text-gray-900 dark:text-white/95 px-4 py-2.5 rounded-md hover:bg-brand-navy/10 dark:hover:bg-white/10 transition-colors text-small tracking-wide shadow-card">
 <MessageSquare className="w-4 h-4" />
 Send Message
 </button>
 </div>

 {/* Risk Alerts */}
 <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4 md:p-5 lg:p-6">
 <div className="flex items-center gap-2 mb-2">
 <CheckCircle2 className="w-5 h-5 text-emerald-400" />
 <div className="text-small text-gray-900 dark:text-white/95">All Clear</div>
 </div>
 <p className="text-caption text-gray-600 dark:text-white/50">
 No active risk alerts. Project is progressing as planned.
 </p>
 </div>
 </div>
 </div>

 {/* Activity Log */}
 <div className="mt-6 bg-white dark:bg-card shadow-card rounded-lg p-10">
 <h3 className="text-small tracking-[0.05em] uppercase text-gray-400 dark:text-white/50 mb-8">
 Activity Log
 </h3>
 <div className="space-y-4">
 {activities.map((activity, index) => (
 <div key={index} className="flex items-start gap-4 py-2.5 border-b border-gray-200 dark:border-white/[0.06] last:border-0">
 <div className="text-caption text-gray-400 dark:text-white/40 w-32 flex-shrink-0">
 {activity.date}
 <br />
 {activity.time}
 </div>
 <div className="flex-1">
 <p className="text-small text-gray-900 dark:text-white mb-1">{activity.message}</p>
 <p className="text-caption text-gray-400 dark:text-white/40">by {activity.user}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
}
