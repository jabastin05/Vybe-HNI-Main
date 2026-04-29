import { useState } from 'react';
import { Phone, X, Calendar, Clock } from 'lucide-react';

export function RMAccess({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedDate, setSelectedDate] = useState('');
 const [selectedTime, setSelectedTime] = useState('');
 const [notes, setNotes] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 // Mock RM data - this would come from user context in a real app
 const rm = {
 name: 'Priya Sharma',
 initials: 'PS',
 phone: '+91 98765 43210',
 };

 const handleSubmitRequest = async () => {
 setIsSubmitting(true);
 
 // Simulate API call
 await new Promise(resolve => setTimeout(resolve, 1000));
 
 setIsSubmitting(false);
 setIsSuccess(true);
 
 // Close modal after success
 setTimeout(() => {
 setIsModalOpen(false);
 setIsSuccess(false);
 setSelectedDate('');
 setSelectedTime('');
 setNotes('');
 }, 2000);
 };

 return (
 <>
 {/* Request Call Button */}
 <button
 onClick={() => setIsModalOpen(true)}
 className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl border transition-all duration-200 group ${
 variant === 'dark'
 ? 'border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50'
 : 'border-brand-primary/30 bg-brand-primary/10 hover:bg-brand-primary/20 hover:border-brand-primary/50'
 }`}
 >
 <Phone className={`w-3.5 h-3.5 md:w-4 md:h-4 ${variant === 'dark' ? 'text-white' : 'text-brand-primary'}`} />
 <span className={`text-xs md:text-sm font-normal hidden sm:inline ${variant === 'dark' ? 'text-white' : 'text-brand-primary'}`}>
 Request a Call
 </span>
 <span className={`text-xs font-normal sm:hidden ${variant === 'dark' ? 'text-white' : 'text-brand-primary'}`}>
 Call
 </span>
 </button>

 {/* Modal */}
 {isModalOpen && (
 <div className="fixed inset-0 bg-brand-navy/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
 <div className="bg-white dark:bg-card rounded-[24px] shadow-card w-full max-w-md
 animate-in fade-in duration-200">
 
 {/* Modal Header */}
 <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-white/[0.05]">
 <div>
 <h2 className="text-xl font-normal text-gray-900 dark:text-white mb-1">
 Request a Call Back
 </h2>
 <p className="text-sm text-gray-600 dark:text-white/50">
 Your RM {rm.name} will reach out to you
 </p>
 </div>
 <button
 onClick={() => setIsModalOpen(false)}
 className="w-8 h-8 rounded-lg hover:bg-brand-navy/5 dark:hover:bg-white/5 flex items-center justify-center transition-colors"
 >
 <X className="w-5 h-5 text-gray-400 dark:text-white/40" />
 </button>
 </div>

 {/* Modal Content */}
 <div className="p-6 space-y-5">
 {/* RM Info Card */}
 <div className="flex items-center gap-4 p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-xl">
 <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center flex-shrink-0">
 <span className="text-base font-normal text-white">
 {rm.initials}
 </span>
 </div>
 <div className="flex-1">
 <div className="text-sm font-normal text-gray-900 dark:text-white leading-tight mb-0.5">
 {rm.name}
 </div>
 <div className="text-xs text-gray-600 dark:text-white/50 leading-tight">
 Relationship Manager
 </div>
 </div>
 <div className="flex items-center gap-1.5">
 <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
 <span className="text-xs text-brand-teal font-normal">
 Available
 </span>
 </div>
 </div>

 {/* Availability Section (Optional) */}
 <div>
 <label className="text-xs font-normal text-gray-900/70 dark:text-white/70 mb-2 block uppercase tracking-wide">
 Preferred Availability <span className="text-gray-400 dark:text-white/40 normal-case">(Optional)</span>
 </label>
 
 <div className="grid grid-cols-2 gap-3">
 {/* Date Picker */}
 <div className="relative">
 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/40" />
 <input
 type="date"
 value={selectedDate}
 onChange={(e) => setSelectedDate(e.target.value)}
 min={new Date().toISOString().split('T')[0]}
 className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-card shadow-card
 rounded-xl text-sm text-gray-900 dark:text-white
 focus:outline-none focus:border-brand-gold/15 transition-all"
 />
 </div>

 {/* Time Picker */}
 <div className="relative">
 <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/40" />
 <input
 type="time"
 value={selectedTime}
 onChange={(e) => setSelectedTime(e.target.value)}
 className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-card shadow-card
 rounded-xl text-sm text-gray-900 dark:text-white
 focus:outline-none focus:border-brand-gold/15 transition-all"
 />
 </div>
 </div>
 </div>

 {/* Notes */}
 <div>
 <label className="text-xs font-normal text-gray-900/70 dark:text-white/70 mb-2 block uppercase tracking-wide">
 Notes <span className="text-gray-400 dark:text-white/40 normal-case">(Optional)</span>
 </label>
 <textarea
 value={notes}
 onChange={(e) => setNotes(e.target.value)}
 placeholder="Add any specific topics you'd like to discuss..."
 rows={3}
 className="w-full px-4 py-3 bg-white dark:bg-card shadow-card
 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40
 focus:outline-none focus:border-brand-gold/15 transition-all resize-none"
 />
 </div>

 {/* Info Message */}
 <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
 <p className="text-xs text-gray-900/70 dark:text-white/70 leading-relaxed">
 {selectedDate && selectedTime 
 ? `Your RM will call you on ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${selectedTime}`
 : 'Your RM will reach out to you within 2 business hours'}
 </p>
 </div>
 </div>

 {/* Modal Footer */}
 <div className="flex items-center gap-4 p-6 border-t border-gray-200 dark:border-white/[0.05]">
 <button
 onClick={() => setIsModalOpen(false)}
 className="flex-1 px-4 py-2.5 bg-white dark:bg-card shadow-card
 rounded-xl text-sm font-normal text-gray-900 dark:text-white
 hover:bg-brand-navy/5 dark:hover:bg-white/5 transition-all"
 >
 Cancel
 </button>
 <button
 onClick={handleSubmitRequest}
 disabled={isSubmitting || isSuccess}
 className="flex-1 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary-hover
 rounded-xl text-sm font-normal text-white
 disabled:opacity-50 disabled:cursor-not-allowed
 transition-all flex items-center justify-center gap-2"
 >
 {isSubmitting ? (
 <>
 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 Requesting...
 </>
 ) : isSuccess ? (
 <>
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
 </svg>
 Request Sent!
 </>
 ) : (
 'Submit Request'
 )}
 </button>
 </div>
 </div>
 </div>
 )}
 </>
 );
}