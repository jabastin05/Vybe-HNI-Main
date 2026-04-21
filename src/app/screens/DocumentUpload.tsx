import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ThemeToggle } from '../components/ThemeToggle';
import { useProperties } from '../contexts/PropertiesContext';
import { 
  Shield, 
  ArrowLeft,
  UploadCloud,
  FileText,
  Building2,
  FolderOpen,
  CheckCircle2,
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
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
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

    // Simulate upload process
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0a0a0a]">


      {/* Header */}
      <div className="lg:ml-[72px] border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-[#0d1b2e] backdrop-blur-xl sticky top-[60px] md:top-0 z-40">
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={() => navigate(id ? `/property/${id}/documents` : '/documents')}
                className="w-10 h-10 rounded-xl bg-white dark:bg-[#0d1b2e] border border-[#E2E8F0] dark:border-white/[0.08] flex items-center justify-center hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.05] active:bg-[#0B1F3A]/[0.04] dark:active:bg-white/[0.08] transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5 text-[#475569] dark:text-white/50" />
              </button>
              <div>
                <div className="text-caption tracking-[0.05em] uppercase text-[#94A3B8] dark:text-white/50 mb-2">
                  Secure Document Upload
                </div>
                <h1 className="text-h1 tracking-tight text-[#0F172A] dark:text-white">
                  Upload Document
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-[72px]">
        <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Upload Type Toggle */}
            <div className="flex bg-[#0B1F3A]/[0.04] dark:bg-white/[0.04] p-1 rounded-xl w-full sm:w-fit mb-8">
              <button
                type="button"
                onClick={() => setUploadType('property')}
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-lg text-small font-normal transition-all flex items-center justify-center gap-2 ${
                  uploadType === 'property'
                    ? 'bg-white dark:bg-[#2A2A2A] text-[#0F172A] dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
                    : 'text-[#475569] dark:text-white/50 hover:text-[#0F172A] dark:hover:text-white'
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
                    ? 'bg-white dark:bg-[#2A2A2A] text-[#0F172A] dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]'
                    : 'text-[#475569] dark:text-white/50 hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                Independent
              </button>
            </div>

            {/* File Upload Area */}
            <div className="bg-white/80 dark:bg-[#0d1b2e]/80 backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl p-4 md:p-5 lg:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <h2 className="text-body font-normal text-[#0F172A] dark:text-white mb-6">File Selection</h2>
              
              <div 
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  isDragging 
                    ? 'border-emerald-500 bg-emerald-500/5 dark:bg-[#C9A75D]/10' 
                    : 'border-[#E2E8F0] dark:border-white/[0.08] hover:border-[#C9A75D]/50 hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.02]'
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
                <div className="w-16 h-16 rounded-xl bg-[#0B1F3A]/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <UploadCloud className="w-8 h-8 text-[#94A3B8] dark:text-white/40" />
                </div>
                <h3 className="text-body font-normal text-[#0F172A] dark:text-white mb-2">
                  Click or drag files to upload
                </h3>
                <p className="text-small text-[#94A3B8] dark:text-white/40 max-w-sm mx-auto">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG. Multiple files allowed. Maximum file size 50MB per file.
                </p>
              </div>

              {files.length > 0 && (
                <div className="space-y-3 mt-6">
                  {files.map((f, idx) => (
                    <div key={`${f.name}-${idx}`} className="bg-emerald-500/5 dark:bg-[#C9A75D]/10 border border-[#C9A75D]/20 dark:border-[#C9A75D]/20 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#C9A75D]/20 dark:bg-emerald-500/30 flex items-center justify-center">
                          <File className="w-5 h-5 text-[#C9A75D]" />
                        </div>
                        <div>
                          <h4 className="text-small font-normal text-[#0F172A] dark:text-white mb-0.5 truncate max-w-[200px] md:max-w-xs">
                            {f.name}
                          </h4>
                          <p className="text-caption text-[#94A3B8] dark:text-white/40">
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
                        className="w-8 h-8 rounded-lg hover:bg-[#0B1F3A]/5 dark:hover:bg-white/5 flex items-center justify-center transition-colors text-[#94A3B8] dark:text-white/40 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Document Details */}
            {uploadType === 'property' && (
              <div className="bg-white/80 dark:bg-[#0d1b2e]/80 backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl p-4 md:p-5 lg:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <h2 className="text-body font-normal text-[#0F172A] dark:text-white mb-6">Document Details</h2>
                
                <div className="space-y-6">
                  {/* Property Selection */}
                  <div>
                    <label className="block text-small font-normal text-[#475569] dark:text-white/50 mb-2">
                      Select Property
                    </label>
                    <select 
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white/50 dark:bg-[#0B1F3A]/20 border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl text-small text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#E2E8F0] dark:focus:border-white/20/30 transition-all appearance-none"
                    >
                      <option value="" disabled>Choose a property...</option>
                      {properties.map(prop => (
                        <option key={prop.id} value={prop.id}>
                          {prop.name} {prop.address ? `- ${prop.address}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selection */}
                <div>
                  <label className="block text-small font-normal text-[#475569] dark:text-white/50 mb-2">
                    Document Category
                  </label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white/50 dark:bg-[#0B1F3A]/20 border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl text-small text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#E2E8F0] dark:focus:border-white/20/30 transition-all appearance-none"
                  >
                    <option value="" disabled>Select category...</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-small font-normal text-[#475569] dark:text-white/50 mb-2">
                    Remarks / Notes (Optional)
                  </label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional context or details about this document..."
                    rows={4}
                    className="w-full px-4 py-3.5 bg-white/50 dark:bg-[#0B1F3A]/20 border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl text-small text-[#0F172A] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#E2E8F0] dark:focus:border-white/20/30 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 md:gap-4">
              <button
                type="button"
                onClick={() => navigate(id ? `/property/${id}/documents` : '/documents')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#E2E8F0] dark:border-white/[0.08] text-small font-normal text-[#0F172A] dark:text-white hover:bg-[#0B1F3A]/5 dark:hover:bg-white/5 active:bg-[#0B1F3A]/[0.08] dark:active:bg-white/[0.08] transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto container-padding py-3.5 bg-[#0B1F3A] dark:bg-white hover:bg-[#0B1F3A]/90 dark:hover:bg-white/90 active:bg-[#0B1F3A]/80 dark:active:bg-white/80 text-white rounded-lg transition-all shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 text-small font-normal"
              >
                <Shield className="w-4 h-4" />
                Upload Securely
              </button>
            </div>
            
            {/* Secure Upload Footer Note */}
            <div className="flex items-center justify-center gap-2 mt-8 text-caption text-[#94A3B8] dark:text-white/40">
              <Shield className="w-3.5 h-3.5" />
              <span>All documents are encrypted with bank-grade security before storage.</span>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}