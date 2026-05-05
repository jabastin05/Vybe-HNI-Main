import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationDropdown } from '../components/NotificationDropdown';
import {
  FileText,
  Search,
  Download,
  Eye,
  ChevronDown,
  Building2,
  CheckCircle2,
  Upload,
  Star,
  X,
  FolderOpen,
  File,
  FileImage,
  FileSpreadsheet,
  ChevronRight,
  Filter,
  Grid3x3,
  List,
  Shield,
  Lock,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Layers,
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
    lastAccessed: '2 hours ago',
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
    lastAccessed: 'Yesterday',
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
    lastAccessed: '3 days ago',
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
    lastAccessed: 'Today',
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
    lastAccessed: '1 week ago',
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
    lastAccessed: '5 days ago',
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
    lastAccessed: '2 weeks ago',
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
    lastAccessed: '4 days ago',
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
    lastAccessed: '1 week ago',
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
    lastAccessed: '2 weeks ago',
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
    lastAccessed: '10 days ago',
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
    lastAccessed: '6 days ago',
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
    lastAccessed: 'Today',
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
    lastAccessed: 'Yesterday',
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
    lastAccessed: '1 week ago',
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
    isIndependent: true,
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
    isIndependent: true,
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
    isIndependent: true,
  },
];

const CATEGORIES = [
  { id: 'all',         label: 'All',         color: 'gray' },
  { id: 'Ownership',   label: 'Ownership',   color: 'emerald' },
  { id: 'Compliance',  label: 'Compliance',  color: 'blue' },
  { id: 'Financial',   label: 'Financial',   color: 'purple' },
  { id: 'Land Records',label: 'Land Records',color: 'orange' },
  { id: 'Utility',     label: 'Utility',     color: 'cyan' },
  { id: 'Supporting',  label: 'Supporting',  color: 'gray' },
];

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'verified', label: 'Verified' },
  { id: 'review', label: 'Need Review' },
] as const;

export function DocumentVault() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<(typeof STATUS_FILTERS)[number]['id']>('all');
  const [showPropertyFilter, setShowPropertyFilter] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

  const [documents, setDocuments] = useState(ALL_DOCUMENTS);

  const toggleStar = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, isStarred: !d.isStarred } : d));
  };

  const properties = Array.from(new Set(documents.map(doc => doc.propertyName))).map(name => {
    const doc = documents.find(d => d.propertyName === name);
    return {
      name,
      location: doc?.propertyLocation || '',
      count: documents.filter(d => d.propertyName === name).length,
    };
  });

  const propertyOptions = [{ name: 'all', location: '', count: documents.length }, ...properties];

  const categories = CATEGORIES.map(c => ({
    ...c,
    count: c.id === 'all'
      ? documents.length
      : documents.filter(d => d.category === c.id).length,
  }));

  const totalDocuments = documents.length;
  const verifiedDocuments = documents.filter(d => d.verified).length;
  const needReviewDocuments = documents.filter(d => !d.verified).length;

  const statusCounts = {
    all: documents.length,
    verified: verifiedDocuments,
    review: needReviewDocuments,
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = selectedProperty === 'all' || doc.propertyName === selectedProperty;
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'verified' && doc.verified) ||
      (selectedStatus === 'review' && !doc.verified);
    return matchesSearch && matchesProperty && matchesCategory && matchesStatus;
  });

  const getFileIcon = (type: string, size = 'md') => {
    const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    switch (type) {
      case 'PDF': return <FileText className={`${cls} text-red-500`} />;
      case 'DOC': return <File className={`${cls} text-blue-500`} />;
      case 'XLS': return <FileSpreadsheet className={`${cls} text-brand-gold`} />;
      case 'JPG':
      case 'PNG': return <FileImage className={`${cls} text-purple-500`} />;
      default:    return <FileText className={`${cls} text-gray-400`} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">

      {/* ─────────────────────────────────────────
          MOBILE LAYOUT (< md)
      ───────────────────────────────────────── */}
      <div className="md:hidden">

        {/* ── Hero ── */}
        <div className="relative bg-gradient-to-br from-[#0B3360] via-brand-navy to-brand-primary/75 dark:from-background dark:to-background px-5 pt-6 pb-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-secondary/[0.05] blur-3xl pointer-events-none" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-caption font-medium tracking-[0.16em] uppercase text-white/50 mb-2">Vault</p>
              <h1 className="text-h1 font-semibold text-white tracking-tight leading-none">Documents</h1>
              <p className="text-small text-white/50 mt-2">{documents.length} files · encrypted & secure</p>
            </div>
            <button
              onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl
                bg-white/15 active:bg-white/25 text-white
                text-caption font-semibold transition-all duration-200 mt-1"
            >
              <Upload className="w-3.5 h-3.5" strokeWidth={1.5} />
              Upload
            </button>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div className="px-4 pt-5 pb-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-card rounded-2xl p-3.5 border border-black/5 dark:border-white/5 min-w-0">
              <div className="text-caption font-normal tracking-[0.12em] uppercase text-gray-400 dark:text-white/40 mb-3 leading-tight">
                Total Docs
              </div>
              <div className="text-h2 font-semibold tracking-tight text-gray-900 dark:text-white mb-1">{totalDocuments}</div>
              <div className="text-caption text-gray-400 dark:text-white/40 leading-tight">stored securely</div>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl p-3.5 border border-black/5 dark:border-white/5 min-w-0">
              <div className="text-caption font-normal tracking-[0.12em] uppercase text-gray-400 dark:text-white/40 mb-3 leading-tight">
                Verified
              </div>
              <div className="text-h2 font-semibold tracking-tight text-gray-900 dark:text-white mb-1">{verifiedDocuments}</div>
              <div className="text-caption text-gray-400 dark:text-white/40 leading-tight">files cleared</div>
            </div>
            <button
              onClick={() => setSelectedStatus('review')}
              className="bg-white dark:bg-card rounded-2xl p-3.5 border border-black/5 dark:border-white/5 text-left active:bg-amber-50 dark:active:bg-amber-500/5 transition-colors min-w-0"
            >
              <div className="text-caption font-normal tracking-[0.12em] uppercase text-gray-400 dark:text-white/40 mb-3 leading-tight">
                Review
              </div>
              <div className="text-h2 font-semibold tracking-tight text-gray-900 dark:text-white mb-1">{needReviewDocuments}</div>
              <div className="text-caption text-amber-500 dark:text-amber-400 leading-tight">{needReviewDocuments > 0 ? 'tap to review' : 'all clear'}</div>
            </button>
          </div>
        </div>

        {/* ── Portfolio Readiness ── */}
        <div className="px-4 pt-2 pb-4">
          <div className="bg-white dark:bg-card rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-card">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-3.5 h-3.5 text-brand-primary" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-small font-semibold text-gray-900 dark:text-white truncate">Portfolio Readiness</h3>
                  <p className="text-caption text-gray-400 dark:text-white/40 leading-tight">Document completeness status</p>
                </div>
              </div>
              <span className="flex-shrink-0 rounded-full bg-brand-primary/10 px-2.5 py-1 text-small font-semibold uppercase tracking-[0.06em] text-brand-primary leading-none">
                HABU
              </span>
            </div>
            <div className="space-y-3">
              {properties.slice(0, 3).map((property) => {
                const propertyDocs = documents.filter(d => d.propertyName === property.name);
                const verifiedCount = propertyDocs.filter(d => d.verified).length;
                const missingCount = propertyDocs.length - verifiedCount;
                const completeness = propertyDocs.length > 0 ? Math.round((verifiedCount / propertyDocs.length) * 100) : 0;
                return (
                  <button
                    key={property.name}
                    onClick={() => setSelectedProperty(property.name)}
                    className="w-full flex items-center justify-between text-left active:bg-gray-50 dark:active:bg-white/[0.03] rounded-lg px-1 -mx-1 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-caption font-semibold text-gray-900 dark:text-white truncate">{property.name}</div>
                      <div className="text-caption text-gray-400 dark:text-white/40">
                        {missingCount > 0 ? `${missingCount} unverified` : 'all verified'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${completeness}%` }}
                        />
                      </div>
                      <span className="text-caption text-gray-400 dark:text-white/40 w-8 text-right">{completeness}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Search + filters ── */}
        <div className="bg-white dark:bg-card border-b border-black/5 dark:border-white/5 shadow-header">
          <div className="px-4 pt-3 pb-0">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-white/[0.04] rounded-xl
                  pl-10 pr-4 py-3 text-small text-gray-900 dark:text-white
                  placeholder:text-gray-400 dark:placeholder:text-white/30
                  focus:outline-none focus:ring-2 focus:ring-brand-primary/20
                  transition-all duration-200"
              />
            </div>
          </div>
          <div className="px-4 pt-3">
            <div className="grid grid-cols-3 gap-2">
              {STATUS_FILTERS.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`min-h-10 rounded-xl px-2 text-caption transition-all duration-200 ${
                    selectedStatus === status.id
                      ? 'bg-brand-primary text-white font-semibold'
                      : 'bg-gray-50 text-gray-500 dark:bg-white/[0.04] dark:text-white/50'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-3.5 text-caption whitespace-nowrap transition-all duration-200 border-b-2 ${
                    selectedCategory === cat.id
                      ? 'text-brand-primary border-brand-primary font-semibold'
                      : 'text-gray-400 border-transparent'
                  }`}
                >
                  {cat.label}{' '}
                  <span className="ml-0.5 text-gray-300 dark:text-white/20">{cat.count}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPropertyFilter(true)}
              className="flex items-center gap-1 px-4 py-3.5 text-caption text-gray-400 flex-shrink-0 border-b-2 border-transparent"
            >
              <Building2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              {selectedProperty === 'all' ? 'All' : selectedProperty.split(' ')[0]}
              <ChevronDown className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ── Document list ── */}
        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
              {documents.length === 0
                ? <Upload className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                : <FileText className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
              }
            </div>
            <p className="text-body font-semibold text-gray-900 dark:text-white mb-1">
              {documents.length === 0 ? 'No documents yet' : 'No documents found'}
            </p>
            <p className="text-small text-gray-400 mb-5">
              {documents.length === 0
                ? 'Upload your property documents to keep them secure and organised'
                : 'Try adjusting your search or filters'}
            </p>
            {documents.length === 0 && (
              <button
                onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
                className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl text-small font-semibold"
              >
                <Upload className="w-4 h-4" strokeWidth={1.5} />
                Upload Document
              </button>
            )}
          </div>
        ) : (
          <div className="px-4 pt-5 pb-4">
            <div className="bg-white dark:bg-card rounded-2xl overflow-hidden">
              {filteredDocuments.map((doc, idx) => (
                <div
                  key={doc.id}
                  className={`flex items-center gap-4 px-5 py-4 bg-white dark:bg-card transition-colors duration-150 ${
                    idx < filteredDocuments.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''
                  }`}
                >
                  <button onClick={() => setViewingDocument(doc)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform">
                    {getFileIcon(doc.type)}
                  </button>
                  <button onClick={() => setViewingDocument(doc)} className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-small font-semibold text-gray-900 dark:text-white truncate">{doc.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-caption text-gray-400 dark:text-white/40">
                      <span className="truncate">{doc.propertyName || doc.category}</span>
                      <span className="flex-shrink-0">·</span>
                      <span className="flex-shrink-0">{doc.size}</span>
                      {doc.verified && (
                        <>
                          <span className="flex-shrink-0">·</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
                        </>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={(e) => toggleStar(doc.id, e)}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-white/[0.06] active:scale-90"
                    title={doc.isStarred ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <Star className={`w-4 h-4 transition-colors ${doc.isStarred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-white/20'}`} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Property filter bottom sheet ── */}
        {showPropertyFilter && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowPropertyFilter(false)} />
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-card rounded-t-3xl pb-[env(safe-area-inset-bottom)]">
              <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-white/20 mx-auto mt-3 mb-4" />
              <p className="text-caption font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-white/40 px-5 mb-3">
                Filter by Property
              </p>
              <div className="px-3 pb-4 space-y-1 max-h-[60vh] overflow-y-auto">
                {propertyOptions.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => { setSelectedProperty(p.name); setShowPropertyFilter(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      selectedProperty === p.name
                        ? 'bg-brand-primary text-white'
                        : 'text-gray-900 dark:text-white active:bg-gray-50 dark:active:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        selectedProperty === p.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/5'
                      }`}>
                        {p.name === 'all'
                          ? <FolderOpen className="w-4 h-4" strokeWidth={1.5} />
                          : <Building2 className="w-4 h-4" strokeWidth={1.5} />
                        }
                      </div>
                      <div className="text-left">
                        <p className="text-small font-semibold">{p.name === 'all' ? 'All Properties' : p.name}</p>
                        {p.location && (
                          <p className={`text-caption ${selectedProperty === p.name ? 'text-white/60' : 'text-gray-400 dark:text-white/40'}`}>
                            {p.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`text-caption font-normal ${selectedProperty === p.name ? 'text-white/70' : 'text-gray-400 dark:text-white/40'}`}>
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
          DESKTOP LAYOUT (md+)
      ───────────────────────────────────────── */}
      <div className="hidden md:block">

        {/* Header */}
        <div className="bg-white dark:bg-card border-b border-black/5 dark:border-white/5 shadow-header">
          <div className="max-w-[1500px] mx-auto container-padding py-5 md:py-6">
            <div className="flex items-center justify-between gap-4">
              <div>
              <div className="text-caption font-medium tracking-[0.12em] uppercase text-brand-primary mb-2">
                  Secure Document Vault
                </div>
                <h1 className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white">
                  My Documents
                </h1>
                <p className="text-small text-gray-500 dark:text-white/50 mt-1">
                  Store and manage all your property documents securely
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
                  className="inline-flex items-center justify-center gap-2
                    bg-brand-primary hover:bg-brand-primary-hover text-white
                    px-5 py-2.5 rounded-xl text-small font-semibold
                    transition-all duration-200"
                >
                  <Upload className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  <span>Add Document</span>
                </button>
                <NotificationDropdown />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="max-w-[1500px] mx-auto container-padding pt-6 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-card rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-brand-primary" strokeWidth={1.5} />
              </div>
              <div className="text-caption font-medium tracking-[0.12em] uppercase text-gray-400 dark:text-white/40 mb-4">
                Total Documents
              </div>
              <div className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white mb-2">{totalDocuments}</div>
              <div className="text-small text-gray-500 dark:text-white/50">encrypted files stored</div>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
              </div>
              <div className="text-caption font-medium tracking-[0.12em] uppercase text-gray-400 dark:text-white/40 mb-4">
                Verified Files
              </div>
              <div className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white mb-2">{verifiedDocuments}</div>
              <div className="text-small text-gray-500 dark:text-white/50">
                {totalDocuments > 0 ? `${Math.round((verifiedDocuments / totalDocuments) * 100)}% vault readiness` : 'vault readiness pending'}
              </div>
            </div>
            <button
              onClick={() => setSelectedStatus('review')}
              className="bg-white dark:bg-card rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-card text-left hover:bg-amber-50/50 dark:hover:bg-amber-500/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
              </div>
              <div className="text-caption font-medium tracking-[0.12em] uppercase text-gray-400 dark:text-white/40 mb-4">
                Need Review
              </div>
              <div className="text-h1 font-semibold tracking-tight text-gray-900 dark:text-white mb-2">{needReviewDocuments}</div>
              <div className="text-small text-amber-500 dark:text-amber-400">
                {needReviewDocuments === 0 ? 'no pending checks' : 'click to review'}
              </div>
            </button>
          </div>

          {/* Portfolio Readiness */}
          <div className="bg-white dark:bg-card rounded-2xl p-6 border border-black/5 dark:border-white/5 shadow-card">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-brand-primary" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-body font-semibold text-gray-900 dark:text-white">Portfolio Readiness</h3>
                  <p className="text-small text-gray-500 dark:text-white/50">Document completeness status across your properties</p>
                </div>
              </div>
              <span className="flex-shrink-0 rounded-full bg-brand-primary/10 px-3 py-1.5 text-caption font-semibold uppercase tracking-[0.12em] text-brand-primary">
                HABU
              </span>
            </div>
            <div className="space-y-4">
              {properties.map((property) => {
                const propertyDocs = documents.filter(d => d.propertyName === property.name);
                const verifiedCount = propertyDocs.filter(d => d.verified).length;
                const completeness = propertyDocs.length > 0 ? Math.round((verifiedCount / propertyDocs.length) * 100) : 0;
                return (
                  <button
                    key={property.name}
                    onClick={() => setSelectedProperty(property.name)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/[0.02] rounded-xl text-left hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-small font-semibold text-gray-900 dark:text-white truncate mb-1">{property.name}</div>
                      <div className="text-caption text-gray-500 dark:text-white/50">
                        {propertyDocs.length - verifiedCount > 0
                          ? `${propertyDocs.length - verifiedCount} unverified`
                          : 'all verified'}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${completeness}%` }}
                        />
                      </div>
                      <span className="text-small font-semibold text-gray-900 dark:text-white w-10 text-right">{completeness}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1500px] mx-auto container-padding pt-4 pb-6 md:pt-4 md:pb-8">
          <div className="bg-white dark:bg-card rounded-2xl overflow-hidden mb-5 border border-black/5 dark:border-white/5 shadow-card">

            {/* Category tabs */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-black/5 dark:border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-5 py-3.5 text-small whitespace-nowrap transition-all duration-200 border-b-2 ${
                    selectedCategory === cat.id
                      ? 'text-brand-primary border-brand-primary font-semibold'
                      : 'text-gray-400 dark:text-white/40 border-transparent hover:text-gray-600 dark:hover:text-white/60'
                  }`}
                >
                  {cat.label}{' '}
                  <span className={`ml-1 text-caption ${selectedCategory === cat.id ? 'text-brand-primary/60' : 'text-gray-300 dark:text-white/20'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search + filters */}
            <div className="px-4 py-3 border-b border-black/5 dark:border-white/5">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/[0.04] rounded-xl text-small text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200"
                  />
                </div>
                <div className="flex items-center rounded-xl bg-gray-50 dark:bg-white/[0.04] p-1">
                  {STATUS_FILTERS.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setSelectedStatus(status.id)}
                      className={`h-9 px-3 rounded-lg text-caption whitespace-nowrap transition-all duration-200 ${
                        selectedStatus === status.id
                          ? 'bg-white text-brand-primary font-semibold shadow-sm dark:bg-white/10 dark:text-white'
                          : 'text-gray-500 hover:text-gray-700 dark:text-white/50 dark:hover:text-white/70'
                      }`}
                    >
                      {status.label}
                      <span className={`ml-1 ${selectedStatus === status.id ? 'text-brand-primary/60 dark:text-white/60' : 'text-gray-300 dark:text-white/20'}`}>
                        {statusCounts[status.id]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
                {propertyOptions.map((property) => (
                  <button
                    key={property.name}
                    onClick={() => setSelectedProperty(property.name)}
                    className={`flex-shrink-0 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-caption font-medium transition-all duration-200 ${
                      selectedProperty === property.name
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-black/5 bg-white text-gray-500 hover:text-gray-700 dark:border-white/5 dark:bg-white/[0.03] dark:text-white/50 dark:hover:text-white/70'
                    }`}
                  >
                    {property.name === 'all' ? (
                      <FolderOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
                    ) : (
                      <Building2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    )}
                    <span>{property.name === 'all' ? 'All Properties' : property.name}</span>
                    <span className={selectedProperty === property.name ? 'text-white/60' : 'text-gray-300 dark:text-white/20'}>
                      {property.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Document rows */}
            {filteredDocuments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
                  {documents.length === 0
                    ? <Upload className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                    : <FileText className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                  }
                </div>
                <p className="text-body text-gray-900 dark:text-white mb-1">
                  {documents.length === 0 ? 'No documents yet' : 'No documents found'}
                </p>
                <p className="text-small text-gray-400 mb-5">
                  {documents.length === 0
                    ? 'Upload your property documents to keep them secure and organised'
                    : 'Try adjusting your search or filters'}
                </p>
                {documents.length === 0 && (
                  <button
                    onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
                    className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl text-small font-semibold"
                  >
                    <Upload className="w-4 h-4" strokeWidth={1.5} />
                    Upload Document
                  </button>
                )}
              </div>
            ) : (
              filteredDocuments.map((doc, idx) => (
                <div
                  key={doc.id}
                  className={`flex items-center gap-4 px-5 py-4 bg-white dark:bg-card transition-colors duration-150 ${
                    idx < filteredDocuments.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''
                  }`}
                >
                  <button onClick={() => setViewingDocument(doc)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0 hover:bg-gray-200 dark:hover:bg-white/[0.10] transition-colors">
                    {getFileIcon(doc.type)}
                  </button>
                  <button onClick={() => setViewingDocument(doc)} className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-small font-semibold text-gray-900 dark:text-white truncate">{doc.name}</p>
                    </div>
                    <div className="flex items-center gap-2 text-caption text-gray-400 dark:text-white/40">
                      <span className="truncate">{doc.propertyName}</span>
                      <span className="flex-shrink-0">·</span>
                      <span className="flex-shrink-0">{doc.size}</span>
                      <span className="flex-shrink-0">·</span>
                      <span className="flex-shrink-0">{doc.category}</span>
                      {doc.verified && (
                        <>
                          <span className="flex-shrink-0">·</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
                        </>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={(e) => toggleStar(doc.id, e)}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-white/[0.06] active:scale-90"
                    title={doc.isStarred ? 'Remove bookmark' : 'Bookmark'}
                  >
                    <Star className={`w-4 h-4 transition-colors ${doc.isStarred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-white/20 hover:text-yellow-400'}`} strokeWidth={1.5} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Document Viewer Modal (shared mobile + desktop) ── */}
      {viewingDocument && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:p-4 bg-brand-navy/80 backdrop-blur-md">
          <div className="relative bg-white/95 dark:bg-card/95 backdrop-blur-xl
            rounded-t-3xl md:rounded-xl
            w-full md:max-w-5xl
            max-h-[90vh] overflow-y-auto
            shadow-[0_-8px_40px_rgba(0,0,0,0.3)] md:shadow-[0_20px_80px_rgba(0,0,0,0.4)]
            border-t border-white/60 dark:border-white/10 md:border
            flex flex-col
            pb-[env(safe-area-inset-bottom)]"
          >
            {/* Drag handle (mobile) */}
            <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-white/20 mx-auto mt-3 mb-1 md:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-200 dark:border-white/[0.06] flex-shrink-0">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">{getFileIcon(viewingDocument.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-small font-semibold text-gray-900 dark:text-white truncate">{viewingDocument.name}</div>
                  <div className="text-caption text-gray-600 dark:text-white/50">{viewingDocument.size} • {viewingDocument.uploadDate}</div>
                </div>
              </div>
              <button
                onClick={() => setViewingDocument(null)}
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
              >
                <X className="w-4 h-4 text-[#64748B] dark:text-white/60" />
              </button>
            </div>

            {/* Document Details */}
            <div className="px-5 py-5 flex-1 overflow-y-auto">
              {/* Type icon + category + property */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <div className="scale-[1.6]">{getFileIcon(viewingDocument.type)}</div>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-brand-primary/[0.06] dark:bg-brand-primary/[0.12] text-brand-primary text-caption font-semibold mb-2">
                    {viewingDocument.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-caption text-gray-500 dark:text-white/40">
                    <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{viewingDocument.propertyName}</span>
                  </div>
                </div>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="bg-gray-50 dark:bg-white/[0.03] rounded-xl p-3">
                  <div className="text-caption text-gray-400 dark:text-white/40 mb-1">Uploaded</div>
                  <div className="text-small text-gray-900 dark:text-white">{viewingDocument.uploadDate}</div>
                </div>
                <div className="bg-gray-50 dark:bg-white/[0.03] rounded-xl p-3">
                  <div className="text-caption text-gray-400 dark:text-white/40 mb-1">File Size</div>
                  <div className="text-small text-gray-900 dark:text-white">{viewingDocument.size}</div>
                </div>
                <div className="bg-gray-50 dark:bg-white/[0.03] rounded-xl p-3">
                  <div className="text-caption text-gray-400 dark:text-white/40 mb-1">Uploaded By</div>
                  <div className="text-small text-gray-900 dark:text-white">{viewingDocument.uploadedBy}</div>
                </div>
                <div className="bg-gray-50 dark:bg-white/[0.03] rounded-xl p-3">
                  <div className="text-caption text-gray-400 dark:text-white/40 mb-1">Format</div>
                  <div className="text-small text-gray-900 dark:text-white">{viewingDocument.type}</div>
                </div>
              </div>

              {viewingDocument.lastAccessed && (
                <div className="flex items-center gap-2 text-caption text-gray-400 dark:text-white/40">
                  <Clock className="w-3.5 h-3.5" />
                  Last accessed {viewingDocument.lastAccessed}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 px-5 py-4 border-t border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.01] flex-shrink-0">
              {viewingDocument.verified && (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl w-fit">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-caption font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.06em]">
                    Verified Document
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-white/[0.05] shadow-card text-gray-900 dark:text-white rounded-2xl text-small font-semibold active:scale-[0.98] transition-transform">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setViewingDocument(null)}
                  className="flex-1 flex items-center justify-center py-3 bg-brand-navy dark:bg-white text-white dark:text-brand-navy rounded-2xl text-small font-semibold active:scale-[0.98] transition-transform"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
