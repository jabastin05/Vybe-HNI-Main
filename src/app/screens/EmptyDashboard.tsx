import { useNavigate } from 'react-router';
import { Plus, Building2, FileText, Users, Sparkles } from 'lucide-react';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { ThemeToggle } from '../components/ThemeToggle';
import { useEffect, useState } from 'react';

const capabilities = [
 {
 icon: Sparkles,
 title: 'HABU Engine',
 description: 'AI-driven Highest & Best Use analysis',
 iconBg: 'bg-brand-gold/15 dark:bg-brand-gold/10',
 iconColor: 'text-brand-gold',
 },
 {
 icon: FileText,
 title: 'Document Vault',
 description: 'Deeds, CADs and compliance docs secured',
 iconBg: 'bg-amber-500/10',
 iconColor: 'text-amber-500',
 },
 {
 icon: Users,
 title: 'Deal Room',
 description: 'Institutional off-market land assets',
 iconBg: 'bg-violet-500/10',
 iconColor: 'text-violet-500',
 },
];

export function EmptyDashboard() {
 const navigate = useNavigate();
 const [firstName, setFirstName] = useState("");

 useEffect(() => {
 const saved = localStorage.getItem("vybeUser");
 if (saved) {
 const data = JSON.parse(saved);
 setFirstName((data.name || "").split(" ")[0]);
 } else {
 setFirstName((localStorage.getItem("vybeUserName") || "").split(" ")[0]);
 }
 }, []);

 return (
 <div className="min-h-screen bg-[#F8FAFC] dark:bg-background transition-colors duration-300">

 {/* Desktop header */}
 <header className="hidden md:block border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-5">
 <div className="flex items-center justify-between">
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-brand-gold mb-1">
 Command Centre
 </div>
 <h1 className="text-h2 font-normal tracking-tight text-[#0F172A] dark:text-white leading-none">
 Welcome{firstName ? `, ${firstName}` : ""}
 </h1>
 </div>
 <div className="flex items-center gap-3">
 <NotificationDropdown />
 <ThemeToggle />
 </div>
 </div>
 </div>
 </header>

 {/* Mobile: immersive hero */}
 <div className="md:hidden">

 {/* Navy hero */}
 <div className="relative bg-brand-navy dark:bg-background px-5 pt-6 pb-8 overflow-hidden">
 <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-gold/[0.06] blur-2xl pointer-events-none" />
 <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-brand-gold/[0.04] blur-xl pointer-events-none" />

 <div className="relative">
 <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/25 mb-4">
 <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
 <span className="text-[10px] font-normal tracking-[0.1em] uppercase text-brand-gold">Portfolio Ready</span>
 </div>

 <h1 className="text-3xl font-normal text-white tracking-tight leading-[1.2] mb-2">
 {firstName ? `Welcome,
${firstName}` : "Welcome"}
 </h1>
 <p className="text-sm text-white/50 leading-relaxed mb-7 max-w-[280px]">
 Add your first property to unlock HABU analysis, document vault, and premium services.
 </p>

 <button
 onClick={() => navigate("/upload")}
 className="flex items-center gap-2 bg-brand-gold active:bg-brand-gold-active text-brand-navy font-normal px-6 py-3.5 rounded-2xl text-sm active:scale-[0.98] transition-all duration-150"
 >
 <Plus className="w-4 h-4" strokeWidth={2.8} />
 Add Property to VYBE
 </button>
 </div>
 </div>

 {/* Capability list */}
 <div className="px-4 pt-5">
 <p className="text-xs font-normal tracking-[0.1em] uppercase text-[#94A3B8] mb-3 px-1">
 Unlocks when you add a property
 </p>
 <div className="flex flex-col gap-3">
 {capabilities.map((f, i) => (
 <div key={i} className="flex items-center gap-4 bg-white dark:bg-card border border-[#F1F5F9] dark:border-white/[0.06] rounded-2xl px-4 py-4 opacity-60">
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${f.iconBg}`}>
 <f.icon className={`w-5 h-5 ${f.iconColor}`} strokeWidth={1.6} />
 </div>
 <div className="flex-1 min-w-0">
 <div className="text-sm font-normal text-[#0F172A] dark:text-white">{f.title}</div>
 <div className="text-xs text-[#94A3B8] dark:text-white/40 mt-0.5">{f.description}</div>
 </div>
 <svg className="w-4 h-4 text-[#CBD5E1] dark:text-white/20 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
 <rect x="5" y="11" width="14" height="10" rx="2" />
 <path d="M7 11V7a5 5 0 0 1 10 0v4" />
 </svg>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Desktop layout */}
 <main className="hidden md:block py-8 container-padding">
 <div className="max-w-[860px] mx-auto">
 <div className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-2xl p-10 md:p-14 text-center mb-8 relative overflow-hidden">
 <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-navy/0 via-brand-gold/60 to-brand-navy/0" />
 <div className="w-20 h-20 rounded-2xl bg-brand-navy dark:bg-brand-gold/20 flex items-center justify-center mx-auto mb-6">
 <Building2 className="w-10 h-10 text-white dark:text-brand-gold" strokeWidth={1.5} />
 </div>
 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-xs font-normal tracking-[0.08em] text-brand-gold uppercase mb-5">
 <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
 Portfolio Ready
 </div>
 <h2 className="text-h1 font-normal tracking-[-0.02em] text-[#0F172A] dark:text-white mb-3">Add Your First Property</h2>
 <p className="text-body text-[#475569] dark:text-white/50 max-w-lg mx-auto leading-relaxed mb-8">
 Unlock the full power of the VYBE platform — HABU analysis, document vault, and execution services tailored to your asset.
 </p>
 <button onClick={() => navigate("/upload")} className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-hover text-white px-7 py-3.5 rounded-xl text-small font-normal transition-all hover: hover:-translate-y-0.5">
 <Plus className="w-4 h-4" strokeWidth={2.5} />
 Add Property to VYBE
 </button>
 </div>

 <div className="mb-5 text-center">
 <div className="text-xs font-normal tracking-[0.1em] uppercase text-[#94A3B8]">Unlocks these capabilities</div>
 </div>
 <div className="grid grid-cols-3 gap-4">
 {capabilities.map((f, i) => (
 <div key={i} className="bg-white dark:bg-card border border-[#E2E8F0] dark:border-white/[0.06] rounded-2xl p-5 md:p-6 text-center opacity-55 relative overflow-hidden">
 <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-[#F1F5F9] dark:bg-white/10 flex items-center justify-center">
 <svg className="w-3 h-3 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
 </div>
 <div className={`w-14 h-14 rounded-xl ${f.iconBg} flex items-center justify-center mx-auto mb-4`}>
 <f.icon className={`w-7 h-7 ${f.iconColor}`} strokeWidth={1.5} />
 </div>
 <h3 className="text-body font-normal tracking-tight text-[#0F172A] dark:text-white mb-1.5">{f.title}</h3>
 <p className="text-caption text-[#475569] dark:text-white/40 leading-relaxed">{f.description}</p>
 </div>
 ))}
 </div>
 </div>
 </main>
 </div>
 );
}
