import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useProperties } from '../contexts/PropertiesContext';
import {
 Shield,
 ArrowLeft,
 UploadCloud,
 Building2,
 FolderOpen,
 X,
 File
} from 'lucide-react';
import { toast } from 'sonner';

export function DocumentUpload() {
 const navigate = useNavigate();
 const { id } = useParams();
 const { properties } = useProperties();
 const fileInputRef = useRef<HTMLInputElement>(null);
 const [files, setFiles] = useState<File[]>([]);
 const [isDragging, setIsDragging] = useState(false);

 const [uploadType, setUploadType] = useState<'property' | 'independent'>(id ? 'property' : 'property');
 const [selectedProperty, setSelectedProperty] = useState(id || '');
 const [selectedCategory, setSelectedCategory] = useState('');
 const [notes, setNotes] = useState('');

 const categories = [
 'Ownership',
 'Compliance',
 'Financial',
 'Land Records',
 'Utility',
 'Supporting'
 ];

 const handleDragOver = (e: React.DragEvent) => {
 e.preventDefault();
 setIsDragging(true);
 };

 const handleDragLeave = (e: React.DragEvent) => {
 e.preventDefault();
 setIsDragging(false);
 };

 const handleDrop = (e: React.DragEvent) => {
 e.preventDefault();
 setIsDragging(false);
 if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
 setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
 }
 };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files && e.target.files.length > 0) {
 setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
 }
 if (e.target) {
 e.target.value = '';
 }
 };

 const handleRemoveFile = (indexToRemove: number) => {
 setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
 };

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();

 if (files.length === 0) {
 toast.error('Please select at least one file to upload');
 return;
 }

 if (uploadType === 'property') {
 if (!selectedProperty) {
 toast.error('Please select a property');
 return;
 }
 if (!selectedCategory) {
 toast.error('Please select a document category');
 return;
 }
 }

 toast.success(`${files.length > 1 ? 'Documents' : 'Document'} uploaded successfully!`, {
 description: `Your ${files.length > 1 ? 'documents have' : 'document has'} been securely stored in the vault.`
 });

 setTimeout(() => {
 if (id) {
 navigate(`/property/${id}/documents`);
 } else {
 navigate('/documents');
 }
 }, 1500);
 };

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">

 {/* ── Mobile Hero ── */}
 <div className="md:hidden bg-gradient-to-br from-[#0B3360] via-brand-navy to-brand-primary/75 dark:from-background dark:to-background px-5 pt-6 pb-6 overflow-hidden relative">
 {/* Subtle background orb */}
 <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-brand-secondary/[0.05] blur-3xl pointer-events-none" />

 {/* Back button */}
 <button
 onClick={() => navigate(id ? `/property/${id}/documents` : '/documents')}
 className="flex items-center gap-2 text-white/60 active:text-white transition-colors duration-200 mb-5"
 >
 <ArrowLeft className="w-4 h-4" />
 <span className="text-sm">Documents</span>
 </button>

 <p className="text-xs tracking-[0.16em] uppercase text-white/40 mb-2">Document Vault</p>
 <h1 className="text-3xl font-normal tracking-tight text-white leading-none">
 Upload Document
 </h1>
 </div>

 {/* ── Desktop Header ── */}
 <div className="hidden md:block border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-card">
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
 <div className="flex items-center justify-between gap-4">
 <div className="flex items-center gap-4">
 <button
 onClick={() => navigate(id ? `/property/${id}/documents` : '/documents')}
 className="w-9 h-9 rounded-xl bg-brand-navy/[0.04] dark:bg-white/[0.04] hover:bg-brand-navy/[0.08] dark:hover:bg-white/[0.08] flex items-center justify-center transition-colors"
 >
 <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-white/50" />
 </button>
 <div>
 <div className="text-xs font-normal tracking-[0.12em] uppercase text-white/40 mb-2">
 Document Vault
 </div>
 <h1 className="text-h1 font-normal tracking-tight text-gray-900 dark:text-white">
 Upload Document
 </h1>
 </div>
 </div>

 {/* Security badge */}
 <div className="flex items-center gap-2 text-caption text-gray-400 dark:text-white/40">
 <Shield className="w-3.5 h-3.5" />
 <span>Bank-grade encryption</span>
 </div>
 </div>
 </div>
 </div>

 {/* ── Main Content ── */}
 <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-8">
 <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">

 {/* Upload Type Toggle */}
 <div className="flex bg-brand-navy/[0.04] dark:bg-white/[0.04] p-1 rounded-xl w-full sm:w-fit">
 <button
 type="button"
 onClick={() => setUploadType('property')}
 className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-lg text-small font-normal transition-all flex items-center justify-center gap-2 ${
 uploadType === 'property'
 ? 'bg-white dark:bg-card text-gray-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
 : 'text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white'
 }`}
 >
 <Building2 className="w-4 h-4" />
 <span className="hidden sm:inline">Property Specific</span>
 <span className="sm:hidden">Property</span>
 </button>
 <button
 type="button"
 onClick={() => setUploadType('independent')}
 className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-lg text-small font-normal transition-all flex items-center justify-center gap-2 ${
 uploadType === 'independent'
 ? 'bg-white dark:bg-card text-gray-900 dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
 : 'text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white'
 }`}
 >
 <FolderOpen className="w-4 h-4" />
 Independent
 </button>
 </div>

 {/* File Upload Card */}
 <div className="bg-white dark:bg-card border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 md:p-6">
 <h2 className="text-base font-normal tracking-tight text-gray-900 dark:text-white mb-5">
 File Selection
 </h2>

 {/* Drop zone */}
 <div
 className={`border-2 border-dashed rounded-xl p-10 md:p-12 text-center transition-all cursor-pointer ${
 isDragging
 ? 'border-brand-gold bg-brand-navy/[0.04] dark:bg-brand-gold/[0.04]'
 : 'border-gray-200 dark:border-white/[0.08] hover:border-brand-gold/15 hover:bg-brand-navy/[0.02] dark:hover:bg-brand-gold/[0.03]'
 }`}
 onDragOver={handleDragOver}
 onDragLeave={handleDragLeave}
 onDrop={handleDrop}
 onClick={() => fileInputRef.current?.click()}
 >
 <input
 type="file"
 ref={fileInputRef}
 className="hidden"
 onChange={handleFileChange}
 accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
 multiple
 />
 <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${
 isDragging ? 'bg-brand-gold/8' : 'bg-brand-navy/[0.04] dark:bg-white/[0.04]'
 }`}>
 <UploadCloud className={`w-7 h-7 transition-colors ${isDragging ? 'text-brand-gold' : 'text-gray-400 dark:text-white/40'}`} />
 </div>
 <h3 className="text-body font-normal text-gray-900 dark:text-white mb-1.5">
 Click or drag files to upload
 </h3>
 <p className="text-small text-gray-400 dark:text-white/40 max-w-sm mx-auto">
 PDF, DOC, DOCX, XLS, XLSX, JPG, PNG · Multiple files · Max 50MB each
 </p>
 </div>

 {/* Selected files list */}
 {files.length > 0 && (
 <div className="space-y-2.5 mt-5">
 {files.map((f, idx) => (
 <div
 key={`${f.name}-${idx}`}
 className="bg-brand-navy/[0.03] dark:bg-brand-gold/[0.06] border border-brand-gold/20 dark:border-brand-gold/20 rounded-xl p-5 flex items-center justify-between"
 >
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-brand-gold/8 flex items-center justify-center flex-shrink-0">
 <File className="w-5 h-5 text-brand-gold" />
 </div>
 <div>
 <p className="text-small font-normal text-gray-900 dark:text-white mb-0.5 truncate max-w-[200px] md:max-w-xs">
 {f.name}
 </p>
 <p className="text-caption text-gray-400 dark:text-white/40">
 {(f.size / 1024 / 1024).toFixed(2)} MB
 </p>
 </div>
 </div>
 <button
 type="button"
 onClick={(e) => {
 e.stopPropagation();
 handleRemoveFile(idx);
 }}
 className="w-8 h-8 rounded-lg hover:bg-brand-navy/[0.06] dark:hover:bg-white/[0.06] flex items-center justify-center transition-colors text-gray-400 dark:text-white/40 hover:text-red-500"
 >
 <X className="w-4 h-4" />
 </button>
 </div>
 ))}
 </div>
 )}
 </div>

 {/* Document Details Card */}
 {uploadType === 'property' && (
 <div className="bg-white dark:bg-card border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 md:p-6">
 <h2 className="text-base font-normal tracking-tight text-gray-900 dark:text-white mb-5">
 Document Details
 </h2>

 <div className="space-y-5">
 {/* Property Selection */}
 <div>
 <label className="block text-caption font-normal tracking-[0.05em] uppercase text-gray-600 dark:text-white/50 mb-2.5">
 Select Property *
 </label>
 <select
 value={selectedProperty}
 onChange={(e) => setSelectedProperty(e.target.value)}
 className="w-full px-4 py-3 bg-white dark:bg-white/[0.04] shadow-card rounded-xl text-small text-gray-900 dark:text-white focus:outline-none focus:border-brand-gold/15 transition-all appearance-none"
 >
 <option value="" disabled>Choose a property…</option>
 {properties.map(prop => (
 <option key={prop.id} value={prop.id}>
 {prop.name} {prop.address ? `– ${prop.address}` : ''}
 </option>
 ))}
 </select>
 </div>

 {/* Category Selection */}
 <div>
 <label className="block text-caption font-normal tracking-[0.05em] uppercase text-gray-600 dark:text-white/50 mb-2.5">
 Document Category *
 </label>
 <select
 value={selectedCategory}
 onChange={(e) => setSelectedCategory(e.target.value)}
 className="w-full px-4 py-3 bg-white dark:bg-white/[0.04] shadow-card rounded-xl text-small text-gray-900 dark:text-white focus:outline-none focus:border-brand-gold/15 transition-all appearance-none"
 >
 <option value="" disabled>Select category…</option>
 {categories.map(cat => (
 <option key={cat} value={cat}>{cat}</option>
 ))}
 </select>
 </div>

 {/* Notes */}
 <div>
 <label className="block text-caption font-normal tracking-[0.05em] uppercase text-gray-600 dark:text-white/50 mb-2.5">
 Remarks / Notes <span className="normal-case">(Optional)</span>
 </label>
 <textarea
 value={notes}
 onChange={(e) => setNotes(e.target.value)}
 placeholder="Add any additional context or details about this document…"
 rows={4}
 className="w-full px-4 py-3 bg-white dark:bg-white/[0.04] shadow-card rounded-xl text-small text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-brand-gold/15 transition-all resize-none"
 />
 </div>
 </div>
 </div>
 )}

 {/* Action Buttons */}
 <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
 <button
 type="button"
 onClick={() => navigate(id ? `/property/${id}/documents` : '/documents')}
 className="w-full sm:w-auto px-6 py-3 rounded-xl shadow-card text-small font-normal text-gray-900 dark:text-white hover:bg-brand-navy/[0.04] dark:hover:bg-white/[0.04] active:bg-brand-navy/[0.07] dark:active:bg-white/[0.07] transition-all"
 >
 Cancel
 </button>
 <button
 type="submit"
 className="w-full sm:w-auto px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-active active:scale-[0.98] text-white rounded-xl text-small font-normal transition-all flex items-center justify-center gap-2"
 >
 <Shield className="w-4 h-4" />
 Upload Securely
 </button>
 </div>

 {/* Security footnote */}
 <div className="flex items-center justify-center gap-2 pb-2 text-caption text-gray-400 dark:text-white/40">
 <Shield className="w-3.5 h-3.5" />
 <span>All documents are encrypted with bank-grade security before storage.</span>
 </div>

 </form>
 </div>
 </div>
 );
}
