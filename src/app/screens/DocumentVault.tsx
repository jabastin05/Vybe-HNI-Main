import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Grid3x3,
  List,
  ChevronDown,
  Building2,
  Shield,
  Lock,
  CheckCircle2,
  Calendar,
  User,
  Upload,
  Star,
  X,
  FolderOpen,
  Clock,
  File,
  FileImage,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  propertyName: string;
  propertyLocation: string;
  category: 'Ownership' | 'Compliance' | 'Financial' | 'Land Records' | 'Utility' | 'Supporting';
  type: 'PDF' | 'DOC' | 'JPG' | 'PNG' | 'XLS';
  size: string;
  uploadDate: string;
  uploadedBy: string;
  verified: boolean;
  isStarred: boolean;
  lastAccessed?: string;
  isIndependent?: boolean;
}

const ALL_DOCUMENTS: Document[] = [
  {
    id: '1',
    name: 'Sale Deed - Original Copy.pdf',
    propertyName: 'Sterling Heights, Sector 47',
    propertyLocation: 'Gurgaon, Haryana',
    category: 'Ownership',
    type: 'PDF',
    size: '2.4 MB',
    uploadDate: 'Mar 10, 2026',
    uploadedBy: 'You',
    verified: true,
    isStarred: true,
    lastAccessed: '2 hours ago'
  },
  {
    id: '2',
    name: 'Property Tax Receipt 2025-26.pdf',
    propertyName: 'Sterling Heights, Sector 47',
    propertyLocation: 'Gurgaon, Haryana',
    category: 'Compliance',
    type: 'PDF',
    size: '856 KB',
    uploadDate: 'Mar 12, 2026',
    uploadedBy: 'You',
    verified: true,
    isStarred: false,
    lastAccessed: 'Yesterday'
  },
  {
    id: '3',
    name: 'Land Registry Certificate.pdf',
    propertyName: 'Sterling Heights, Sector 47',
    propertyLocation: 'Gurgaon, Haryana',
    category: 'Land Records',
    type: 'PDF',
    size: '1.2 MB',
    uploadDate: 'Feb 28, 2026',
    uploadedBy: 'CA Priya Sharma',
    verified: true,
    isStarred: false,
    lastAccessed: '3 days ago'
  },
  {
    id: '4',
    name: 'Valuation Report Q1 2026.pdf',
    propertyName: 'Sterling Heights, Sector 47',
    propertyLocation: 'Gurgaon, Haryana',
    category: 'Financial',
    type: 'PDF',
    size: '3.8 MB',
    uploadDate: 'Mar 05, 2026',
    uploadedBy: 'Valuation Partner',
    verified: true,
    isStarred: true,
    lastAccessed: 'Today'
  },
  {
    id: '5',
    name: 'Electricity Bill - February 2026.pdf',
    propertyName: 'Sterling Heights, Sector 47',
    propertyLocation: 'Gurgaon, Haryana',
    category: 'Utility',
    type: 'PDF',
    size: '245 KB',
    uploadDate: 'Feb 15, 2026',
    uploadedBy: 'You',
    verified: false,
    isStarred: false,
    lastAccessed: '1 week ago'
  },
  {
    id: '6',
    name: 'Ownership Title Deed.pdf',
    propertyName: 'Golden Meadows Estate',
    propertyLocation: 'Bangalore, Karnataka',
    category: 'Ownership',
    type: 'PDF',
    size: '3.1 MB',
    uploadDate: 'Jan 20, 2026',
    uploadedBy: 'You',
    verified: true,
    isStarred: true,
    lastAccessed: '5 days ago'
  },
  {
    id: '7',
    name: 'Building Plan Approval.pdf',
    propertyName: 'Golden Meadows Estate',
    propertyLocation: 'Bangalore, Karnataka',
    category: 'Compliance',
    type: 'PDF',
    size: '4.2 MB',
    uploadDate: 'Jan 22, 2026',
    uploadedBy: 'Architect Team',
    verified: true,
    isStarred: false,
    lastAccessed: '2 weeks ago'
  },
  {
    id: '8',
    name: 'Annual Maintenance Statement.xlsx',
    propertyName: 'Golden Meadows Estate',
    propertyLocation: 'Bangalore, Karnataka',
    category: 'Financial',
    type: 'XLS',
    size: '1.8 MB',
    uploadDate: 'Feb 10, 2026',
    uploadedBy: 'You',
    verified: false,
    isStarred: false,
    lastAccessed: '4 days ago'
  },
  {
    id: '9',
    name: 'Purchase Agreement - Original.pdf',
    propertyName: 'Riverside Enclave',
    propertyLocation: 'Pune, Maharashtra',
    category: 'Ownership',
    type: 'PDF',
    size: '2.9 MB',
    uploadDate: 'Dec 15, 2025',
    uploadedBy: 'Legal Team',
    verified: true,
    isStarred: true,
    lastAccessed: '1 week ago'
  },
  {
    id: '10',
    name: 'Fire Safety Certificate.pdf',
    propertyName: 'Riverside Enclave',
    propertyLocation: 'Pune, Maharashtra',
    category: 'Compliance',
    type: 'PDF',
    size: '680 KB',
    uploadDate: 'Jan 05, 2026',
    uploadedBy: 'Safety Inspector',
    verified: true,
    isStarred: false,
    lastAccessed: '2 weeks ago'
  },
  {
    id: '11',
    name: 'Loan Sanction Letter.pdf',
    propertyName: 'Riverside Enclave',
    propertyLocation: 'Pune, Maharashtra',
    category: 'Financial',
    type: 'PDF',
    size: '520 KB',
    uploadDate: 'Dec 20, 2025',
    uploadedBy: 'HDFC Bank',
    verified: true,
    isStarred: false,
    lastAccessed: '10 days ago'
  },
  {
    id: '12',
    name: 'Property Insurance Policy.pdf',
    propertyName: 'Emerald Gardens Complex',
    propertyLocation: 'Noida, Uttar Pradesh',
    category: 'Supporting',
    type: 'PDF',
    size: '1.4 MB',
    uploadDate: 'Feb 25, 2026',
    uploadedBy: 'ICICI Lombard',
    verified: true,
    isStarred: false,
    lastAccessed: '6 days ago'
  },
  {
    id: '13',
    name: 'Khata Extract & Certificate.pdf',
    propertyName: 'Emerald Gardens Complex',
    propertyLocation: 'Noida, Uttar Pradesh',
    category: 'Land Records',
    type: 'PDF',
    size: '890 KB',
    uploadDate: 'Mar 01, 2026',
    uploadedBy: 'Revenue Officer',
    verified: true,
    isStarred: true,
    lastAccessed: 'Today'
  },
  {
    id: '14',
    name: 'Water Bill - March 2026.pdf',
    propertyName: 'Emerald Gardens Complex',
    propertyLocation: 'Noida, Uttar Pradesh',
    category: 'Utility',
    type: 'PDF',
    size: '180 KB',
    uploadDate: 'Mar 15, 2026',
    uploadedBy: 'You',
    verified: false,
    isStarred: false,
    lastAccessed: 'Yesterday'
  },
  {
    id: '15',
    name: 'Floor Plan - All Levels.jpg',
    propertyName: 'Emerald Gardens Complex',
    propertyLocation: 'Noida, Uttar Pradesh',
    category: 'Supporting',
    type: 'JPG',
    size: '5.2 MB',
    uploadDate: 'Feb 18, 2026',
    uploadedBy: 'Architect',
    verified: false,
    isStarred: false,
    lastAccessed: '1 week ago'
  },
  {
    id: '16',
    name: 'Personal Identity Proof - Aadhaar.pdf',
    propertyName: 'Independent',
    propertyLocation: '',
    category: 'Supporting',
    type: 'PDF',
    size: '420 KB',
    uploadDate: 'Mar 08, 2026',
    uploadedBy: 'You',
    verified: true,
    isStarred: false,
    lastAccessed: '3 days ago',
    isIndependent: true
  },
  {
    id: '17',
    name: 'PAN Card Copy.pdf',
    propertyName: 'Independent',
    propertyLocation: '',
    category: 'Supporting',
    type: 'PDF',
    size: '310 KB',
    uploadDate: 'Mar 08, 2026',
    uploadedBy: 'You',
    verified: true,
    isStarred: false,
    lastAccessed: '3 days ago',
    isIndependent: true
  },
  {
    id: '18',
    name: 'Investment Strategy Portfolio.pdf',
    propertyName: 'Independent',
    propertyLocation: '',
    category: 'Financial',
    type: 'PDF',
    size: '2.8 MB',
    uploadDate: 'Feb 22, 2026',
    uploadedBy: 'Financial Advisor',
    verified: false,
    isStarred: true,
    lastAccessed: '1 week ago',
    isIndependent: true
  },
];

const CATEGORIES = [
  { id: 'all',          label: 'All',          color: 'gray'    },
  { id: 'Ownership',    label: 'Ownership',    color: 'emerald' },
  { id: 'Compliance',   label: 'Compliance',   color: 'blue'    },
  { id: 'Financial',    label: 'Financial',    color: 'purple'  },
  { id: 'Land Records', label: 'Land Records', color: 'orange'  },
  { id: 'Utility',      label: 'Utility',      color: 'cyan'    },
  { id: 'Supporting',   label: 'Supporting',   color: 'gray'    },
];

export function DocumentVault() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery]       = useState('');
  const [viewMode, setViewMode]             = useState<'table' | 'grid'>('table');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPropertyFilter, setShowPropertyFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

  const documents = ALL_DOCUMENTS;

  // Get unique properties
  const properties = Array.from(new Set(documents.map(doc => doc.propertyName))).map(name => {
    const doc = documents.find(d => d.propertyName === name);
    return {
      name,
      location: doc?.propertyLocation || '',
      count: documents.filter(d => d.propertyName === name).length
    };
  });

  const categories = CATEGORIES.map(c => ({
    ...c,
    count: c.id === 'all'
      ? documents.length
      : documents.filter(d => d.category === c.id).length
  }));

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch    = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             doc.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty  = selectedProperty === 'all' || doc.propertyName === selectedProperty;
    const matchesCategory  = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesProperty && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'gray';
  };

  const getFileIcon = (type: string, size = 'md') => {
    const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    switch (type) {
      case 'PDF': return <FileText className={`${cls} text-red-500`} />;
      case 'DOC': return <File className={`${cls} text-blue-500`} />;
      case 'XLS': return <FileSpreadsheet className={`${cls} text-[#C9A75D]`} />;
      case 'JPG':
      case 'PNG': return <FileImage className={`${cls} text-purple-500`} />;
      default:    return <FileText className={`${cls} text-[#94A3B8]`} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0a0a0a]">

      {/* ─────────────────────────────────────────
          MOBILE LAYOUT  (< md)
      ───────────────────────────────────────── */}
      <div className="md:hidden">

        {/* Navy Hero */}
        <div className="bg-[#0B1F3A] px-4 pt-5 pb-0 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#C9A75D]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-4 w-20 h-20 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          {/* Title + Upload */}
          <div className="flex items-start justify-between mb-4 relative">
            <div>
              <p className="text-[10px] font-normal tracking-[0.14em] uppercase text-[#C9A75D] mb-1">
                Vault
              </p>
              <h1 className="text-2xl font-normal tracking-tight text-white leading-tight">
                Documents
              </h1>
              <p className="text-sm text-white/50 mt-0.5">
                {documents.length} files · encrypted & secure
              </p>
            </div>
            <button
              onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#C9A75D] text-[#0B1F3A]
                         rounded-xl text-xs font-normal mt-1
                         shadow-[0_2px_12px_rgba(201,167,93,0.4)]
                         active:scale-95 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search documents…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.08] border border-white/[0.12] rounded-2xl
                         text-sm text-white placeholder:text-white/40
                         focus:outline-none focus:border-[#C9A75D]/50
                         transition-all"
            />
          </div>

          {/* Category chip rail */}
          <div className="relative -mx-4">
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10
                            bg-gradient-to-l from-[#0B1F3A] to-transparent" />
            <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`
                      flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full
                      text-xs font-normal transition-all duration-200 whitespace-nowrap
                      ${isActive
                        ? 'bg-[#C9A75D] text-[#0B1F3A] shadow-[0_2px_10px_rgba(201,167,93,0.4)]'
                        : 'bg-white/[0.08] text-white/60 border border-white/[0.12]'
                      }
                    `}
                  >
                    {cat.label}
                    <span className={`text-[10px] ${isActive ? 'text-[#0B1F3A]/60' : 'text-white/30'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Property filter strip */}
        <div className="px-4 py-2.5 bg-white dark:bg-[#0d1b2e] border-b border-[#F1F5F9] dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowPropertyFilter(true)}
              className="flex items-center gap-1.5 text-xs font-normal text-[#64748B] dark:text-white/50"
            >
              <Building2 className="w-3.5 h-3.5" />
              {selectedProperty === 'all' ? 'All Properties' : selectedProperty}
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-3">
              {(selectedProperty !== 'all' || selectedCategory !== 'all') && (
                <button
                  onClick={() => { setSelectedProperty('all'); setSelectedCategory('all'); }}
                  className="text-xs font-normal text-[#C9A75D]"
                >
                  Clear
                </button>
              )}
              <span className="text-xs font-normal text-[#C9A75D]">
                {filteredDocuments.length} docs
              </span>
            </div>
          </div>
        </div>

        {/* Document list */}
        <div className="px-4 py-4 space-y-3">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-[#0d1b2e] rounded-2xl overflow-hidden
                           border border-[#F1F5F9] dark:border-white/[0.06]
                           shadow-[0_2px_12px_rgba(11,31,58,0.06)]
                           active:scale-[0.99] transition-transform duration-100"
              >
                <div className="flex">
                  {/* Gold left accent */}
                  <div className={`w-[3px] flex-shrink-0 ${
                    doc.verified ? 'bg-[#C9A75D]' : 'bg-[#E2E8F0] dark:bg-white/10'
                  }`} />

                  <div className="flex-1 p-4">
                    {/* Top row: icon + name + star */}
                    <div className="flex items-start gap-2.5 mb-2">
                      <div className="flex-shrink-0 mt-0.5">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-normal text-[#0F172A] dark:text-white truncate leading-tight">
                            {doc.name}
                          </p>
                          {doc.isStarred && (
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-[#94A3B8] dark:text-white/40 mt-0.5 truncate">
                          {doc.propertyName}{doc.propertyLocation ? ` · ${doc.propertyLocation}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Meta row: category + size + date */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`text-[10px] font-normal uppercase tracking-[0.06em]
                                        px-2.5 py-1 rounded-lg
                                        bg-${getCategoryColor(doc.category)}-500/10
                                        text-${getCategoryColor(doc.category)}-600 dark:text-${getCategoryColor(doc.category)}-400`}>
                        {doc.category}
                      </span>
                      <span className="text-xs text-[#94A3B8] dark:text-white/40">
                        {doc.size}
                      </span>
                      <span className="text-xs text-[#94A3B8] dark:text-white/40">
                        {doc.uploadDate}
                      </span>
                      {doc.verified && (
                        <div className="flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.05em]">Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Action row */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewingDocument(doc)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                                   bg-[#0B1F3A]/[0.05] dark:bg-white/[0.05]
                                   text-[#0B1F3A] dark:text-white
                                   text-xs font-normal
                                   active:bg-[#0B1F3A]/10 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                      <button
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                                   bg-[#C9A75D]/[0.08] dark:bg-[#C9A75D]/[0.12]
                                   text-[#C9A75D]
                                   text-xs font-normal
                                   active:bg-[#C9A75D]/15 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-14 h-14 rounded-full bg-[#F1F5F9] dark:bg-white/5 flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-[#94A3B8] dark:text-white/30" />
              </div>
              <p className="text-sm font-normal text-[#64748B] dark:text-white/50 mb-1">No documents found</p>
              <p className="text-xs text-[#94A3B8] dark:text-white/30">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Property filter bottom sheet */}
        {showPropertyFilter && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowPropertyFilter(false)} />
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0d1b2e] rounded-t-3xl
                            shadow-[0_-8px_32px_rgba(11,31,58,0.15)]
                            pb-[env(safe-area-inset-bottom)]">
              <div className="w-10 h-1 rounded-full bg-[#E2E8F0] dark:bg-white/20 mx-auto mt-3 mb-4" />
              <p className="text-xs font-normal uppercase tracking-[0.12em] text-[#94A3B8] dark:text-white/40 px-5 mb-3">
                Filter by Property
              </p>
              <div className="px-3 pb-4 space-y-1 max-h-[60vh] overflow-y-auto">
                {[{ name: 'all', location: '', count: documents.length }, ...properties].map((p) => (
                  <button
                    key={p.name}
                    onClick={() => { setSelectedProperty(p.name); setShowPropertyFilter(false); }}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all
                                ${selectedProperty === p.name
                                  ? 'bg-[#0B1F3A] text-white'
                                  : 'text-[#0F172A] dark:text-white active:bg-[#F8FAFC] dark:active:bg-white/5'
                                }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        selectedProperty === p.name ? 'bg-white/20' : 'bg-[#F1F5F9] dark:bg-white/5'
                      }`}>
                        {p.name === 'all'
                          ? <FolderOpen className="w-4 h-4" />
                          : <Building2 className="w-4 h-4" />
                        }
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-normal">
                          {p.name === 'all' ? 'All Properties' : p.name}
                        </p>
                        {p.location && (
                          <p className={`text-xs ${selectedProperty === p.name ? 'text-white/60' : 'text-[#94A3B8] dark:text-white/40'}`}>
                            {p.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-normal ${selectedProperty === p.name ? 'text-[#C9A75D]' : 'text-[#94A3B8] dark:text-white/40'}`}>
                      {p.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* ─────────────────────────────────────────
          DESKTOP LAYOUT  (md+)
      ───────────────────────────────────────── */}
      <div className="hidden md:block">

        {/* Header */}
        <div className="border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-[#0d1b2e]">
          <div className="max-w-[1200px] mx-auto container-padding py-5 md:py-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-normal tracking-[0.12em] uppercase text-[#C9A75D] mb-2">
                  Secure Document Vault
                </div>
                <h1 className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">
                  My Documents
                </h1>
                <p className="text-small text-[#475569] dark:text-white/50 mt-1">
                  Store and manage all your property documents securely
                </p>
              </div>
              <div className="flex items-center gap-3">
                <NotificationDropdown />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8">

          {/* Search and Filters */}
          <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] dark:text-white/40 z-10" />
                <input
                  type="text"
                  placeholder="Search documents or properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-white/80 dark:bg-white/[0.03] border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl text-small text-[#0F172A] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/20 backdrop-blur-xl transition-all"
                />
              </div>
              <button
                onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
                className="px-4 md:px-5 py-3 md:py-3.5 bg-[#0B1F3A] dark:bg-white hover:bg-[#0f2a50] dark:hover:bg-white/90 text-white dark:text-[#0B1F3A] rounded-xl transition-all shadow-[0_4px_16px_rgba(11,31,58,0.3)] flex items-center justify-center gap-2 text-small font-normal"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>

            {/* Filters and View Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Property Filter */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => { setShowPropertyFilter(!showPropertyFilter); setShowCategoryFilter(false); }}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-small font-normal transition-all flex items-center justify-between sm:justify-start gap-2 ${
                      selectedProperty !== 'all'
                        ? 'bg-[#0B1F3A] dark:bg-white text-white dark:text-[#0B1F3A]'
                        : 'bg-white/80 dark:bg-white/[0.03] border border-[#E2E8F0] dark:border-white/[0.08] text-[#0F172A] dark:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span>{selectedProperty === 'all' ? 'All Properties' : selectedProperty.substring(0, 20)}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  </button>

                  {showPropertyFilter && (
                    <>
                      <div className="fixed inset-0 bg-[#0B1F3A]/40 z-40" onClick={() => setShowPropertyFilter(false)} />
                      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white/95 dark:bg-[#0d1b2e]/95 backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden w-full max-w-[400px]">
                          <div className="p-3 border-b border-[#E2E8F0] dark:border-white/[0.06]">
                            <div className="text-caption tracking-[0.1em] uppercase text-[#94A3B8] dark:text-white/40 font-normal mb-3 px-2">
                              Filter by Property
                            </div>
                            <button
                              onClick={() => { setSelectedProperty('all'); setShowPropertyFilter(false); }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all mb-1 ${selectedProperty === 'all' ? 'bg-[#C9A75D]/10' : 'hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.02] text-[#0F172A] dark:text-white'}`}
                            >
                              <div className="flex items-center gap-3">
                                <FolderOpen className="w-4 h-4" />
                                <span className="text-small font-normal">All Properties</span>
                              </div>
                              <span className="text-caption text-[#94A3B8]">{documents.length}</span>
                            </button>
                          </div>
                          <div className="p-3 max-h-80 overflow-y-auto">
                            {properties.map((property) => (
                              <button
                                key={property.name}
                                onClick={() => { setSelectedProperty(property.name); setShowPropertyFilter(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all mb-1 ${selectedProperty === property.name ? 'bg-[#C9A75D]/10' : 'hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.02]'}`}
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedProperty === property.name ? 'bg-[#0B1F3A]' : 'bg-[#0B1F3A]/[0.04] dark:bg-white/[0.04]'}`}>
                                    <Building2 className={`w-5 h-5 ${selectedProperty === property.name ? 'text-white' : 'text-[#475569] dark:text-white/50'}`} />
                                  </div>
                                  <div className="text-left min-w-0 flex-1">
                                    <div className="text-small font-normal text-[#0F172A] dark:text-white truncate">{property.name}</div>
                                    <div className="text-caption text-[#475569] dark:text-white/50 truncate">{property.location}</div>
                                  </div>
                                </div>
                                <span className="text-caption text-[#94A3B8] ml-2 flex-shrink-0">{property.count}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Category Filter */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => { setShowCategoryFilter(!showCategoryFilter); setShowPropertyFilter(false); }}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-small font-normal transition-all flex items-center gap-2 ${
                      selectedCategory !== 'all'
                        ? 'bg-[#0B1F3A] dark:bg-white text-white dark:text-[#0B1F3A]'
                        : 'bg-white/80 dark:bg-white/[0.03] border border-[#E2E8F0] dark:border-white/[0.08] text-[#0F172A] dark:text-white'
                    }`}
                  >
                    <Filter className="w-4 h-4 flex-shrink-0" />
                    <span>{selectedCategory === 'all' ? 'All Categories' : selectedCategory}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  </button>

                  {showCategoryFilter && (
                    <>
                      <div className="fixed inset-0 bg-[#0B1F3A]/40 z-40" onClick={() => setShowCategoryFilter(false)} />
                      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white/95 dark:bg-[#0d1b2e]/95 backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden w-full max-w-[400px]">
                          <div className="p-3">
                            <div className="text-caption tracking-[0.1em] uppercase text-[#94A3B8] dark:text-white/40 font-normal mb-3 px-2">
                              Filter by Category
                            </div>
                            <button
                              onClick={() => { setSelectedCategory('all'); setShowCategoryFilter(false); }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all mb-1 ${selectedCategory === 'all' ? 'bg-[#C9A75D]/10' : 'hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.02] text-[#0F172A] dark:text-white'}`}
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-4 h-4" />
                                <span className="text-small font-normal">All Categories</span>
                              </div>
                              <span className="text-caption text-[#94A3B8]">{documents.length}</span>
                            </button>
                            <div className="my-2 border-t border-[#E2E8F0] dark:border-white/[0.06]" />
                            {categories.filter(c => c.id !== 'all').map((category) => (
                              <button
                                key={category.id}
                                onClick={() => { setSelectedCategory(category.id); setShowCategoryFilter(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all mb-1 ${selectedCategory === category.id ? 'bg-[#C9A75D]/10' : 'hover:bg-[#0B1F3A]/[0.02] dark:hover:bg-white/[0.02]'}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full bg-${category.color}-500`} />
                                  <span className="text-small font-normal text-[#0F172A] dark:text-white">{category.label}</span>
                                </div>
                                <span className="text-caption text-[#94A3B8]">{category.count}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Clear Filters */}
                {(selectedProperty !== 'all' || selectedCategory !== 'all') && (
                  <button
                    onClick={() => { setSelectedProperty('all'); setSelectedCategory('all'); }}
                    className="text-caption text-[#C9A75D] font-normal flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-end gap-4">
                <div className="text-small text-[#475569] dark:text-white/50">
                  <span className="font-normal text-[#0F172A] dark:text-white">{filteredDocuments.length}</span> documents
                </div>
                <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.03] border border-[#E2E8F0] dark:border-white/[0.08] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded transition-all ${viewMode === 'table' ? 'bg-[#0B1F3A] dark:bg-white text-white shadow-sm' : 'text-[#475569] dark:text-white/50 hover:text-[#0F172A] dark:hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-[#0B1F3A] dark:bg-white text-white shadow-sm' : 'text-[#475569] dark:text-white/50 hover:text-[#0F172A] dark:hover:text-white'}`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Display */}
          {viewMode === 'table' ? (
            <div className="bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              {/* Table Header */}
              <div className="hidden md:block bg-[#0B1F3A]/[0.02] dark:bg-white/[0.02] border-b border-[#E2E8F0] dark:border-white/[0.06] px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 text-caption tracking-[0.1em] uppercase font-normal text-[#8E8E93]">Document Name</div>
                  <div className="col-span-3 text-caption tracking-[0.1em] uppercase font-normal text-[#8E8E93]">Property</div>
                  <div className="col-span-2 text-caption tracking-[0.1em] uppercase font-normal text-[#8E8E93]">Category</div>
                  <div className="col-span-1 text-caption tracking-[0.1em] uppercase font-normal text-[#8E8E93]">Type</div>
                  <div className="col-span-1 text-caption tracking-[0.1em] uppercase font-normal text-[#8E8E93]">Upload Date</div>
                  <div className="col-span-1 text-caption tracking-[0.1em] uppercase font-normal text-[#8E8E93] text-right">Actions</div>
                </div>
              </div>

              <div className="divide-y divide-black/5 dark:divide-white/5">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="px-6 py-4 hover:bg-[#0B1F3A]/[0.01] dark:hover:bg-white/[0.01] transition-colors group"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center">
                      <div className="md:col-span-4 flex items-center gap-3 min-w-0">
                        <div className="flex-shrink-0">{getFileIcon(doc.type)}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-small font-normal text-[#0F172A] dark:text-white truncate">{doc.name}</div>
                            {doc.isStarred && <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                          </div>
                          <div className="text-caption text-[#475569] dark:text-white/50">{doc.size} • {doc.type} • {doc.uploadDate}</div>
                        </div>
                      </div>

                      <div className="md:col-span-3 min-w-0">
                        <div className="text-small text-[#0F172A] dark:text-white truncate">{doc.propertyName}</div>
                        <div className="text-caption text-[#475569] dark:text-white/50 truncate">{doc.propertyLocation}</div>
                      </div>

                      <div className="md:col-span-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-caption tracking-wide uppercase bg-${getCategoryColor(doc.category)}-500/10 text-${getCategoryColor(doc.category)}-600 dark:text-${getCategoryColor(doc.category)}-400 border border-${getCategoryColor(doc.category)}-500/20`}>
                          <div className={`w-1.5 h-1.5 rounded-full bg-${getCategoryColor(doc.category)}-500`} />
                          {doc.category}
                        </span>
                      </div>

                      <div className="hidden md:block md:col-span-1">
                        <span className="text-caption font-mono text-[#475569] dark:text-white/50">{doc.type}</span>
                      </div>

                      <div className="hidden md:block md:col-span-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#8E8E93]" />
                          <span className="text-caption text-[#0F172A] dark:text-white">{doc.uploadDate}</span>
                        </div>
                      </div>

                      <div className="md:col-span-1 flex items-center justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setViewingDocument(doc)} className="p-2 hover:bg-[#C9A75D]/10 dark:hover:bg-[#C9A75D]/20 rounded-lg transition-all">
                          <Eye className="w-4 h-4 text-[#C9A75D]" />
                        </button>
                        <button className="p-2 hover:bg-[#C9A75D]/10 dark:hover:bg-[#C9A75D]/20 rounded-lg transition-all">
                          <Download className="w-4 h-4 text-[#C9A75D]" />
                        </button>
                      </div>
                    </div>

                    {doc.verified && (
                      <div className="mt-2 ml-8">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#C9A75D]/10 dark:bg-[#C9A75D]/20 rounded text-caption font-normal text-emerald-700 dark:text-emerald-400 tracking-wide">
                          <CheckCircle2 className="w-3 h-3" />
                          VERIFIED
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredDocuments.length === 0 && (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 rounded-xl bg-[#0B1F3A]/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-[#94A3B8] dark:text-white/40" />
                  </div>
                  <p className="text-small text-[#475569] dark:text-white/50 mb-1">No documents found</p>
                  <p className="text-caption text-[#8E8E93]">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="group bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-[#E2E8F0] dark:border-white/[0.08] rounded-xl overflow-hidden hover:border-[#C9A75D]/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-black/[0.02] to-black/[0.04] dark:from-white/[0.02] dark:to-white/[0.04] relative flex items-center justify-center">
                    <div className="scale-150">{getFileIcon(doc.type)}</div>
                    <div className="absolute inset-0 bg-[#0B1F3A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => setViewingDocument(doc)} className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110">
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    {doc.isStarred && (
                      <div className="absolute top-3 right-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    )}
                    {doc.verified && (
                      <div className="absolute top-3 left-3">
                        <div className="w-6 h-6 rounded-full bg-[#0B1F3A] dark:bg-white flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white dark:text-[#0B1F3A]" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="text-small font-normal text-[#0F172A] dark:text-white mb-2 truncate">{doc.name}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-3.5 h-3.5 text-[#94A3B8] dark:text-white/40 flex-shrink-0" />
                      <div className="text-caption text-[#475569] dark:text-white/50 truncate">{doc.propertyName}</div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-caption font-normal tracking-wide uppercase bg-${getCategoryColor(doc.category)}-500/10 text-${getCategoryColor(doc.category)}-600 dark:text-${getCategoryColor(doc.category)}-400`}>
                        <div className={`w-1 h-1 rounded-full bg-${getCategoryColor(doc.category)}-500`} />
                        {doc.category}
                      </span>
                      <span className="text-caption text-[#94A3B8] dark:text-white/40 font-mono">{doc.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-caption text-[#475569] dark:text-white/50 pt-3 border-t border-[#E2E8F0] dark:border-white/[0.06]">
                      <span>{doc.size}</span>
                      <span>{doc.uploadDate}</span>
                    </div>

                    {/* Mobile-only persistent actions */}
                    <div className="flex items-center gap-2 pt-3 mt-1 md:hidden">
                      <button
                        onClick={() => setViewingDocument(doc)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
                                   bg-[#0B1F3A]/[0.05] dark:bg-white/[0.05]
                                   text-[#0B1F3A] dark:text-white text-caption font-normal
                                   active:bg-[#0B1F3A]/10"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
                                         bg-[#0B1F3A]/[0.05] dark:bg-white/[0.05]
                                         text-[#0B1F3A] dark:text-white text-caption font-normal
                                         active:bg-[#0B1F3A]/10">
                        <Download className="w-3.5 h-3.5" />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredDocuments.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <div className="w-16 h-16 rounded-xl bg-[#0B1F3A]/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-[#94A3B8] dark:text-white/40" />
                  </div>
                  <p className="text-small text-[#475569] dark:text-white/50 mb-1">No documents found</p>
                  <p className="text-caption text-[#8E8E93]">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Document Viewer Modal (shared) */}
      {viewingDocument && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-[#0B1F3A]/80 backdrop-blur-md">
          <div className="relative bg-white/95 dark:bg-[#0d1b2e]/95 backdrop-blur-xl
                          rounded-t-3xl md:rounded-xl
                          w-full md:max-w-5xl
                          max-h-[90vh] overflow-y-auto
                          shadow-[0_-8px_40px_rgba(0,0,0,0.3)] md:shadow-[0_20px_80px_rgba(0,0,0,0.4)]
                          border-t border-white/60 dark:border-white/10 md:border
                          flex flex-col
                          pb-[env(safe-area-inset-bottom)]">
            {/* Drag handle (mobile) */}
            <div className="w-10 h-1 rounded-full bg-[#E2E8F0] dark:bg-white/20 mx-auto mt-3 mb-1 md:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#E2E8F0] dark:border-white/[0.06] flex-shrink-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">{getFileIcon(viewingDocument.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-small font-normal text-[#0F172A] dark:text-white truncate">{viewingDocument.name}</div>
                  <div className="text-caption text-[#475569] dark:text-white/50">{viewingDocument.size} • {viewingDocument.uploadDate}</div>
                </div>
              </div>
              <button
                onClick={() => setViewingDocument(null)}
                className="w-9 h-9 rounded-full bg-[#F1F5F9] dark:bg-white/10 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
              >
                <X className="w-4 h-4 text-[#64748B] dark:text-white/60" />
              </button>
            </div>

            {/* Preview */}
            <div className="px-5 py-5 flex-1 overflow-y-auto">
              <div className="w-full aspect-[1.414/1] bg-gradient-to-br from-black/[0.02] to-black/[0.04] dark:from-white/[0.02] dark:to-white/[0.04] rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="scale-[2.5] mb-8">{getFileIcon(viewingDocument.type)}</div>
                  <div className="text-small text-[#475569] dark:text-white/50 mb-2">Document Preview</div>
                  <div className="text-caption text-[#94A3B8] dark:text-white/40">Full preview available after download</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 px-5 py-4 border-t border-[#E2E8F0] dark:border-white/[0.06] bg-[#F8FAFC] dark:bg-white/[0.01] flex-shrink-0">
              {viewingDocument.verified && (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl w-fit">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-caption font-normal text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.06em]">Verified Document</span>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-white/[0.05] border border-[#E2E8F0] dark:border-white/[0.08] text-[#0F172A] dark:text-white rounded-2xl text-sm font-normal active:scale-[0.98] transition-transform">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setViewingDocument(null)}
                  className="flex-1 flex items-center justify-center py-3 bg-[#0B1F3A] dark:bg-white text-white dark:text-[#0B1F3A] rounded-2xl text-sm font-normal active:scale-[0.98] transition-transform"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
