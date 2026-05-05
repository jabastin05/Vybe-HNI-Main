import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useCases } from '../contexts/CasesContext';
import { ArrowLeft, Send, Paperclip, File, FileText, FileImage, X, Download, Clock, CheckCircle2 } from 'lucide-react';

interface Message {
 id: string;
 sender: 'user' | 'support';
 senderName: string;
 message: string;
 timestamp: Date;
 attachments?: {
 id: string;
 name: string;
 size: string;
 type: string;
 }[];
}

export function CaseChat() {
 const { id } = useParams<{ id: string }>();
 const navigate = useNavigate();
 const { getCase, updateCase } = useCases();
 const fileInputRef = useRef<HTMLInputElement>(null);
 
 const caseItem = getCase(id || '');
 const [messageText, setMessageText] = useState('');
 const [attachments, setAttachments] = useState<File[]>([]);
 
 // Clear unread messages when the user opens the chat
 useEffect(() => {
 if (caseItem && caseItem.unreadMessages && caseItem.unreadMessages > 0) {
 updateCase(caseItem.id, { unreadMessages: 0 });
 }
 }, [caseItem?.id]);
 
 // Mock messages - initial data
 const initialMessages: Message[] = [
 {
 id: '1',
 sender: 'support',
 senderName: 'Priya Sharma',
 message: 'Hello! I am Priya, your dedicated relationship manager for case ' + (caseItem?.caseId || '') + '. How can I assist you today?',
 timestamp: new Date('2026-03-18T10:30:00'),
 },
 {
 id: '2',
 sender: 'user',
 senderName: 'You',
 message: 'Hi Priya! I wanted to check on the status of my property tax filing.',
 timestamp: new Date('2026-03-18T10:35:00'),
 },
 {
 id: '3',
 sender: 'support',
 senderName: 'Priya Sharma',
 message: 'Great question! Your property tax filing is currently in progress. We have collected all necessary documents and are preparing the submission. Expected completion is within 3-5 business days.',
 timestamp: new Date('2026-03-18T10:40:00'),
 attachments: [
 {
 id: 'att1',
 name: 'Tax_Filing_Progress_Report.pdf',
 size: '2.4 MB',
 type: 'PDF'
 }
 ]
 },
 ];
 
 const [messages, setMessages] = useState<Message[]>(initialMessages);

 if (!caseItem) {
 return (
 <div className="flex min-h-screen bg-gray-50 dark:bg-background">

 <div className="flex-1 flex items-center justify-center">
 <div className="text-center">
 <h2 className="text-h1 text-gray-900 dark:text-white mb-4">Case not found</h2>
 <Link 
 to="/cases"
 className="text-brand-gold hover:text-emerald-400 text-small font-semibold"
 >
 Back to Case Management
 </Link>
 </div>
 </div>
 </div>
 );
 }

 const handleSendMessage = () => {
 if (!messageText.trim() && attachments.length === 0) return;

 const newMessage: Message = {
 id: Date.now().toString(),
 sender: 'user',
 senderName: 'You',
 message: messageText,
 timestamp: new Date(),
 attachments: attachments.map((file, idx) => ({
 id: `att-${Date.now()}-${idx}`,
 name: file.name,
 size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
 type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'File'
 }))
 };

 setMessages([...messages, newMessage]);
 setMessageText('');
 setAttachments([]);
 };

 const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
 const files = Array.from(e.target.files || []);
 setAttachments([...attachments, ...files]);
 };

 const removeAttachment = (index: number) => {
 setAttachments(attachments.filter((_, i) => i !== index));
 };

 const getFileIcon = (type: string) => {
 if (type === 'PDF') return <FileText className="w-5 h-5 text-red-500" />;
 if (type === 'Image') return <FileImage className="w-5 h-5 text-purple-500" />;
 return <File className="w-5 h-5 text-blue-500" />;
 };

 return (
 <div className="fixed left-0 right-0 top-16 bottom-[calc(78px+env(safe-area-inset-bottom))] md:left-[220px] md:top-0 md:bottom-0 lg:left-[72px] overflow-hidden bg-gray-50 dark:bg-background">


 <div className="flex h-full min-h-0 flex-col overflow-hidden" >
 {/* Spacer for mobile bottom nav on non-flex content above */}
 {/* Header */}
 <div className="bg-white dark:bg-card border-b border-gray-200 dark:border-white/[0.06] container-padding py-3 md:py-5 flex-shrink-0 shadow-header">
 <div className="max-w-[1120px] mx-auto">
 <div className="flex items-start md:items-center gap-4">
 <button
 onClick={() => navigate(`/case/${id}`)}
 className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-navy/[0.04] dark:bg-white/[0.04] hover:bg-brand-navy/[0.08] dark:hover:bg-white/[0.08] flex-shrink-0 transition-colors"
 >
 <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-white/50" />
 </button>
 <div>
 <div className="text-caption font-medium tracking-[0.05em] uppercase text-gray-400 dark:text-white/40 mb-2">
 Case Chat
 </div>
 <h1 className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white leading-none mb-2">
 {caseItem.caseId}
 </h1>
 <p className="text-small text-gray-600 dark:text-white/50">
 {caseItem.subService || caseItem.serviceRequested} • {caseItem.propertyName}
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Chat Messages */}
 <div className="flex-1 min-h-0 overflow-y-auto container-padding py-4 md:py-6">
 <div className="max-w-[920px] mx-auto flex min-h-full flex-col justify-end gap-4 md:gap-6">
 {messages.map((msg) => (
 <div
 key={msg.id}
 className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
 >
 <div className={`max-w-[86%] sm:max-w-[78%] lg:max-w-[68%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
 {/* Sender Name and Timestamp */}
 <div className={`flex items-center gap-2 mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
 <span className="text-caption font-semibold text-gray-600 dark:text-white/50">
 {msg.senderName}
 </span>
 <span className="text-caption text-gray-400 dark:text-white/40">
 {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
 </span>
 </div>

 {/* Message Bubble */}
 <div
 className={`rounded-2xl px-4 py-3 md:px-5 ${
 msg.sender === 'user'
 ? 'bg-brand-primary text-white'
 : 'bg-white dark:bg-card shadow-card text-gray-900 dark:text-white'
 }`}
 >
 <p className="text-small leading-relaxed whitespace-pre-wrap">{msg.message}</p>
 
 {/* Attachments */}
 {msg.attachments && msg.attachments.length > 0 && (
 <div className="mt-3 space-y-2">
 {msg.attachments.map((att) => (
 <div
 key={att.id}
 className={`flex items-center gap-4 p-3 rounded-xl ${
 msg.sender === 'user'
 ? 'bg-white/10'
 : 'bg-white dark:bg-white/[0.04]'
 }`}
 >
 {getFileIcon(att.type)}
 <div className="flex-1 min-w-0">
 <div className={`text-small font-semibold truncate ${
 msg.sender === 'user' ? 'text-white' : 'text-gray-900 dark:text-white'
 }`}>
 {att.name}
 </div>
 <div className={`text-caption ${
 msg.sender === 'user' ? 'text-white/70' : 'text-gray-600 dark:text-white/50'
 }`}>
 {att.size}
 </div>
 </div>
 <button className={`p-2 rounded-lg transition-colors ${
 msg.sender === 'user'
 ? 'hover:bg-white/10'
 : 'hover:bg-brand-navy/5 dark:hover:bg-white/5'
 }`}>
 <Download className={`w-4 h-4 ${
 msg.sender === 'user' ? 'text-white' : 'text-gray-600 dark:text-white/50'
 }`} />
 </button>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Message Input */}
 <div className="flex-shrink-0 bg-white dark:bg-card border-t border-gray-200 dark:border-white/[0.06] container-padding py-3 md:py-4 shadow-[0_-8px_24px_rgba(15,23,42,0.04)]">
 <div className="max-w-[920px] mx-auto">
 {/* Attachments Preview */}
 {attachments.length > 0 && (
 <div className="mb-3 md:mb-4 flex flex-wrap gap-2">
 {attachments.map((file, idx) => (
 <div
 key={idx}
 className="flex items-center gap-2 px-3 py-2.5 bg-brand-gold/8 dark:bg-brand-gold/8 
 border border-brand-gold/20 rounded-lg"
 >
 <File className="w-4 h-4 text-brand-gold" />
 <span className="text-caption text-emerald-700 dark:text-emerald-400 font-normal max-w-[200px] truncate">
 {file.name}
 </span>
 <button
 onClick={() => removeAttachment(idx)}
 className="p-0.5 hover:bg-brand-gold/8 rounded transition-colors"
 >
 <X className="w-3.5 h-3.5 text-brand-gold" />
 </button>
 </div>
 ))}
 </div>
 )}

 {/* Input Area */}
 <div className="flex items-end gap-2 md:gap-3">
 <input
 type="file"
 ref={fileInputRef}
 onChange={handleFileSelect}
 multiple
 className="hidden"
 />

 <button
 onClick={() => fileInputRef.current?.click()}
 className="p-2 md:p-3 bg-brand-navy/5 dark:bg-white/5 hover:bg-brand-navy/10 dark:hover:bg-white/10
 rounded-lg md:rounded-xl transition-colors text-gray-600 dark:text-white/50
 hover:text-gray-900 dark:hover:text-white flex-shrink-0"
 >
 <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
 </button>

 <div className="flex-1 bg-white dark:bg-white/[0.04] shadow-card
 rounded-lg md:rounded-xl overflow-hidden focus-within:border-emerald-500/50 transition-colors">
 <textarea
 value={messageText}
 onChange={(e) => setMessageText(e.target.value)}
 onKeyDown={(e) => {
 if (e.key === 'Enter' && !e.shiftKey) {
 e.preventDefault();
 handleSendMessage();
 }
 }}
 placeholder="Type message..."
 rows={1}
 className="w-full px-3 md:px-4 py-2.5 bg-transparent text-small text-gray-900 dark:text-white
 placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none
 resize-none max-h-32"
 />
 </div>

 <button
 onClick={handleSendMessage}
 disabled={!messageText.trim() && attachments.length === 0}
 className="p-2 md:p-3 bg-brand-primary hover:bg-brand-primary-hover disabled:bg-brand-primary/20
 disabled:text-white/40 text-white rounded-lg
 transition-all shadow-[0_4px_12px_rgba(var(--brand-primary-rgb),0.3)]
 hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)] disabled:shadow-none
 disabled:cursor-not-allowed flex-shrink-0"
 >
 <Send className="w-4 h-4 md:w-5 md:h-5" />
 </button>
 </div>

 <div className="mt-2 md:mt-3 text-caption text-gray-400 dark:text-white/40 text-center hidden md:block">
 Press Enter to send • Shift + Enter for new line
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
