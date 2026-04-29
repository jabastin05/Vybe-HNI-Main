import { useState, useRef, useEffect } from 'react';
import {
 Bell, CheckCircle2, AlertTriangle, TrendingUp,
 Users, X, Check, Clock, Sparkles,
} from 'lucide-react';

interface Notification {
 id: string;
 type: 'milestone' | 'approval' | 'team' | 'budget' | 'case';
 title: string;
 message: string;
 time: string;
 read: boolean;
}

const INITIAL: Notification[] = [
 { id: '1', type: 'milestone', title: 'Milestone Completed', message: 'Environmental Clearance approved for Lodha Altamount', time: '5 min ago', read: false },
 { id: '2', type: 'approval', title: 'Action Required', message: 'Fire & Safety NOC requires your review', time: '2 hrs ago', read: false },
 { id: '3', type: 'case', title: 'Case Update', message: 'HABU Report is ready for Sterling Heights', time: '5 hrs ago', read: false },
 { id: '4', type: 'budget', title: 'Budget Alert', message: 'Construction phase budget utilization at 28%', time: '1 day ago', read: true },
 { id: '5', type: 'team', title: 'Team Update', message: 'Priya Sharma shared project timeline update', time: '2 days ago', read: true },
];

const TYPE_CONFIG: Record<string, { icon: any; bg: string; color: string }> = {
 milestone: { icon: CheckCircle2, bg: 'bg-emerald-50 dark:bg-emerald-500/10', color: 'text-emerald-600 dark:text-emerald-400' },
 approval:  { icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-500/10',   color: 'text-amber-600 dark:text-amber-400'   },
 case:      { icon: Sparkles,      bg: 'bg-violet-50 dark:bg-violet-500/10', color: 'text-violet-600 dark:text-violet-400' },
 budget:    { icon: TrendingUp,    bg: 'bg-blue-50 dark:bg-blue-500/10',     color: 'text-blue-600 dark:text-blue-400'     },
 team:      { icon: Users,         bg: 'bg-brand-primary/[0.08] dark:bg-brand-primary/[0.15]', color: 'text-brand-primary' },
};

export function NotificationDropdown() {
 const [isOpen, setIsOpen] = useState(false);
 const [notifications, setNotifications] = useState<Notification[]>(INITIAL);
 const dropdownRef = useRef<HTMLDivElement>(null);
 const unread = notifications.filter(n => !n.read).length;

 useEffect(() => {
   if (!isOpen) return;
   const handler = (e: MouseEvent) => {
     if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
   };
   document.addEventListener('mousedown', handler);
   return () => document.removeEventListener('mousedown', handler);
 }, [isOpen]);

 const markRead = (id: string) =>
   setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n));

 const markAllRead = () =>
   setNotifications(p => p.map(n => ({ ...n, read: true })));

 const dismiss = (id: string, e: React.MouseEvent) => {
   e.stopPropagation();
   setNotifications(p => p.filter(n => n.id === id ? false : true));
 };

 return (
   <div className="relative" ref={dropdownRef}>

     {/* Bell button */}
     <button
       onClick={() => setIsOpen(!isOpen)}
       aria-label="Notifications"
       className="relative flex items-center justify-center w-9 h-9 rounded-xl
         hover:bg-gray-100 dark:hover:bg-white/[0.06]
         transition-all duration-200 text-gray-500 dark:text-white/50"
     >
       <Bell className="w-4 h-4" strokeWidth={1.5} />
       {unread > 0 && (
         <span className="absolute top-1.5 right-1.5 flex items-center justify-center
           min-w-[14px] h-[14px] rounded-full bg-brand-primary
           text-white font-normal leading-none px-[3px]
           border-[1.5px] border-white dark:border-background"
           style={{ fontSize: '9px' }}
         >
           {unread > 9 ? '9+' : unread}
         </span>
       )}
     </button>

     {isOpen && (
       <>
         {/* Backdrop */}
         <div
           className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
           onClick={() => setIsOpen(false)}
         />

         {/* Panel */}
         <div className="fixed md:absolute inset-x-0 bottom-0 md:inset-x-auto md:bottom-auto md:top-11 md:right-0 md:w-[400px] z-50">

           {/* Mobile drag handle */}
           <div className="md:hidden flex justify-center pt-2.5 pb-1 bg-white dark:bg-card rounded-t-3xl">
             <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-white/20" />
           </div>

           <div className="bg-white dark:bg-card md:rounded-2xl shadow-float overflow-hidden max-h-[80vh] md:max-h-[520px] flex flex-col">

             {/* Header */}
             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.05] flex-shrink-0">
               <div>
                 <h3 className="text-sm font-normal text-gray-900 dark:text-white">Notifications</h3>
                 {unread > 0 && <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">{unread} unread</p>}
               </div>
               <div className="flex items-center gap-3">
                 {unread > 0 && (
                   <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-brand-primary hover:text-brand-primary-hover transition-colors">
                     <Check className="w-3 h-3" strokeWidth={1.5} />
                     Mark all read
                   </button>
                 )}
                 <button
                   onClick={() => setIsOpen(false)}
                   className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-white/30 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
                 >
                   <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                 </button>
               </div>
             </div>

             {/* List */}
             <div className="overflow-y-auto flex-1">
               {notifications.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                   <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-3">
                     <Bell className="w-5 h-5 text-gray-400 dark:text-white/30" strokeWidth={1.5} />
                   </div>
                   <p className="text-sm text-gray-500 dark:text-white/40">All caught up</p>
                   <p className="text-xs text-gray-400 dark:text-white/25 mt-1">No new notifications</p>
                 </div>
               ) : (
                 notifications.map((n, idx) => {
                   const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.team;
                   const Icon = cfg.icon;
                   return (
                     <div
                       key={n.id}
                       onClick={() => markRead(n.id)}
                       className={`group relative flex items-start gap-3.5 px-5 py-4 cursor-pointer transition-colors duration-150
                         ${!n.read ? 'bg-brand-primary/[0.03] dark:bg-brand-primary/[0.05]' : ''}
                         hover:bg-gray-50 dark:hover:bg-white/[0.02]
                         ${idx < notifications.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.04]' : ''}`}
                     >
                       {/* Unread accent */}
                       {!n.read && <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-brand-primary" />}

                       {/* Icon */}
                       <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                         <Icon className={`w-4 h-4 ${cfg.color}`} strokeWidth={1.5} />
                       </div>

                       {/* Content */}
                       <div className="flex-1 min-w-0">
                         <div className="flex items-start justify-between gap-2">
                           <p className={`text-sm leading-snug ${!n.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-white/60'}`}>
                             {n.title}
                           </p>
                           <button
                             onClick={(e) => dismiss(n.id, e)}
                             className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center
                               text-gray-300 dark:text-white/20 hover:text-gray-500 dark:hover:text-white/50
                               hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all
                               opacity-0 group-hover:opacity-100"
                           >
                             <X className="w-3 h-3" strokeWidth={1.5} />
                           </button>
                         </div>
                         <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5 leading-relaxed">{n.message}</p>
                         <div className="flex items-center gap-1 mt-1.5">
                           <Clock className="w-3 h-3 text-gray-300 dark:text-white/20" strokeWidth={1.5} />
                           <span className="text-xs text-gray-400 dark:text-white/30">{n.time}</span>
                         </div>
                       </div>

                       {/* Unread dot */}
                       {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0 mt-2" />}
                     </div>
                   );
                 })
               )}
             </div>

             {/* Footer */}
             {notifications.length > 0 && (
               <div className="px-5 py-3.5 border-t border-gray-100 dark:border-white/[0.05] flex-shrink-0">
                 <button className="w-full text-center text-xs text-brand-primary hover:text-brand-primary-hover transition-colors py-1">
                   View all notifications
                 </button>
               </div>
             )}
           </div>
         </div>
       </>
     )}
   </div>
 );
}
