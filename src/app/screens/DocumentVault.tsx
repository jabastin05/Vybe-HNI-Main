import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SideNav } from '../components/SideNav';
import { ThemeToggle } from '../components/ThemeToggle';
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
  FileSpreadsheet
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
  isIndependent?: boolean; // New property to mark independent documents
}

export function DocumentVault() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPropertyFilter, setShowPropertyFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

  // Mock data for documents across all properties
  const documents: Document[] = [
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
    // Independent documents (not tied to any property)
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

  // Get unique properties
  const properties = Array.from(new Set(documents.map(doc => doc.propertyName))).map(name => {
    const doc = documents.find(d => d.propertyName === name);
    return {
      name,
      location: doc?.propertyLocation || '',
      count: documents.filter(d => d.propertyName === name).length
    };
  });

  // Categories
  const categories = [
    { id: 'Ownership', label: 'Ownership', color: 'emerald', count: documents.filter(d => d.category === 'Ownership').length },
    { id: 'Compliance', label: 'Compliance', color: 'blue', count: documents.filter(d => d.category === 'Compliance').length },
    { id: 'Financial', label: 'Financial', color: 'purple', count: documents.filter(d => d.category === 'Financial').length },
    { id: 'Land Records', label: 'Land Records', color: 'orange', count: documents.filter(d => d.category === 'Land Records').length },
    { id: 'Utility', label: 'Utility', color: 'cyan', count: documents.filter(d => d.category === 'Utility').length },
    { id: 'Supporting', label: 'Supporting', color: 'gray', count: documents.filter(d => d.category === 'Supporting').length },
  ];

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = selectedProperty === 'all' || doc.propertyName === selectedProperty;
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesProperty && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'gray';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'DOC':
        return <File className="w-5 h-5 text-blue-500" />;
      case 'XLS':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
      case 'JPG':
      case 'PNG':
        return <FileImage className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-black/40 dark:text-white/40" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#0A0A0A] pt-[60px] md:pt-0">
      <SideNav />

      {/* Header */}
      <div className="border-b border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto container-padding py-4 md:py-6">
          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <div className="text-caption tracking-[0.05em] uppercase text-black/40 dark:text-white/50 mb-2">
                Secure Document Vault
              </div>
              <div className="text-h1 tracking-tight text-black dark:text-white">
                My Documents
              </div>
              <p className="text-small text-black/50 dark:text-white/60 mt-1">
                Store and manage all your property documents securely
              </p>
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-[0px] pb-24 md:pb-8">
        <div className="max-w-[1200px] mx-auto container-padding py-6 md:py-8">
          
          {/* Search and Filters */}
          <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40 z-10" />
                <input
                  type="text"
                  placeholder="Search documents or properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-white/80 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-xl text-small text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-black/20 dark:focus:border-white/20/30 backdrop-blur-xl transition-all"
                />
              </div>
              <button
                onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
                className="px-4 md:px-5 py-3 md:py-3.5 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 text-white rounded-lg transition-all shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 text-small font-medium"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Upload Document</span>
                <span className="sm:hidden">Upload</span>
              </button>
            </div>

            {/* Filters and View Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 overflow-x-auto">
                {/* Property Filter */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => {
                      setShowPropertyFilter(!showPropertyFilter);
                      setShowCategoryFilter(false);
                    }}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-small font-medium transition-all flex items-center justify-between sm:justify-start gap-2 ${
                      selectedProperty !== 'all'
                        ? 'bg-black dark:bg-white text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]'
                        : 'bg-white/80 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-black dark:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.05] active:bg-black/[0.04] dark:active:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="hidden sm:inline">{selectedProperty === 'all' ? 'All Properties' : properties.find(p => p.name === selectedProperty)?.name.substring(0, 20) + '...'}</span>
                      <span className="sm:hidden truncate max-w-[150px]">{selectedProperty === 'all' ? 'All' : properties.find(p => p.name === selectedProperty)?.name}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  </button>

                  {showPropertyFilter && (
                    <>
                      <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowPropertyFilter(false)} />
                      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden w-full max-w-[400px]">
                      <div className="p-3 border-b border-black/5 dark:border-white/10">
                        <div className="text-caption tracking-[0.1em] uppercase text-black/40 dark:text-white/40 font-medium mb-3 px-2">
                          Filter by Property
                        </div>
                        <button
                          onClick={() => {
                            setSelectedProperty('all');
                            setShowPropertyFilter(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all mb-1 ${
                            selectedProperty === 'all'
                              ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                              : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02] text-black dark:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <FolderOpen className="w-4 h-4" />
                            <span className="text-small font-medium">All Properties</span>
                          </div>
                          <span className="text-caption text-black/40 dark:text-white/40">{documents.length}</span>
                        </button>
                        {/* Independent Documents Option */}
                        <button
                          onClick={() => {
                            setSelectedProperty('Independent');
                            setShowPropertyFilter(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                            selectedProperty === 'Independent'
                              ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                              : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02] text-black dark:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4" />
                            <span className="text-small font-medium">Independent</span>
                          </div>
                          <span className="text-caption text-black/40 dark:text-white/40">{documents.filter(d => d.isIndependent).length}</span>
                        </button>
                      </div>
                      <div className="p-3 max-h-80 overflow-y-auto">
                        {properties.filter(p => p.name !== 'Independent').map((property) => (
                          <button
                            key={property.name}
                            onClick={() => {
                              setSelectedProperty(property.name);
                              setShowPropertyFilter(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all mb-1 ${
                              selectedProperty === property.name
                                ? 'bg-emerald-500/10 dark:bg-emerald-500/20'
                                : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                selectedProperty === property.name
                                  ? 'bg-emerald-500'
                                  : 'bg-black/[0.04] dark:bg-white/[0.04]'
                              }`}>
                                <Building2 className={`w-5 h-5 ${
                                  selectedProperty === property.name
                                    ? 'text-white'
                                    : 'text-black/60 dark:text-white/60'
                                }`} />
                              </div>
                              <div className="text-left min-w-0 flex-1">
                                <div className="text-small font-medium text-black dark:text-white truncate">
                                  {property.name}
                                </div>
                                <div className="text-caption text-black/60 dark:text-white/60 truncate">
                                  {property.location}
                                </div>
                              </div>
                            </div>
                            <span className="text-caption text-black/40 dark:text-white/40 ml-2 flex-shrink-0">
                              {property.count}
                            </span>
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
                    onClick={() => {
                      setShowCategoryFilter(!showCategoryFilter);
                      setShowPropertyFilter(false);
                    }}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-small font-medium transition-all flex items-center justify-between sm:justify-start gap-2 ${
                      selectedCategory !== 'all'
                        ? 'bg-black dark:bg-white text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]'
                        : 'bg-white/80 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] text-black dark:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.05] active:bg-black/[0.04] dark:active:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 flex-shrink-0" />
                      <span className="hidden sm:inline">{selectedCategory === 'all' ? 'All Categories' : selectedCategory}</span>
                      <span className="sm:hidden">{selectedCategory === 'all' ? 'All' : selectedCategory.substring(0, 10)}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  </button>

                  {showCategoryFilter && (
                    <>
                      <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowCategoryFilter(false)} />
                      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden w-full max-w-[400px]">
                      <div className="p-3">
                        <div className="text-caption tracking-[0.1em] uppercase text-black/40 dark:text-white/40 font-medium mb-3 px-2">
                          Filter by Category
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCategory('all');
                            setShowCategoryFilter(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all mb-1 ${
                            selectedCategory === 'all'
                              ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                              : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02] text-black dark:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4" />
                            <span className="text-small font-medium">All Categories</span>
                          </div>
                          <span className="text-caption text-black/40 dark:text-white/40">{documents.length}</span>
                        </button>
                        <div className="my-2 border-t border-black/5 dark:border-white/10" />
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setShowCategoryFilter(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all mb-1 ${
                              selectedCategory === category.id
                                ? 'bg-emerald-500/10 dark:bg-emerald-500/20'
                                : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full bg-${category.color}-500`} />
                              <span className="text-small font-medium text-black dark:text-white">{category.label}</span>
                            </div>
                            <span className="text-caption text-black/40 dark:text-white/40">{category.count}</span>
                          </button>
                        ))}
                      </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Active Filters Count */}
                {(selectedProperty !== 'all' || selectedCategory !== 'all') && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="hidden sm:block h-6 w-px bg-black/10 dark:bg-white/10" />
                    <button
                      onClick={() => {
                        setSelectedProperty('all');
                        setSelectedCategory('all');
                      }}
                      className="text-caption text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Clear Filters</span>
                      <span className="sm:hidden">Clear</span>
                    </button>
                  </div>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-small text-black/60 dark:text-white/60">
                  <span className="font-medium text-black dark:text-white">{filteredDocuments.length}</span> <span className="hidden sm:inline">documents</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'table'
                        ? 'bg-black dark:bg-white text-white shadow-sm'
                        : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all ${
                      viewMode === 'grid'
                        ? 'bg-black dark:bg-white text-white shadow-sm'
                        : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Display */}
          {viewMode === 'table' ? (
            /* Table View */
            <div className="bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-black/5 dark:border-white/[0.08] rounded-xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden md:block bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/5 dark:border-white/10 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                    Document Name
                  </div>
                  <div className="col-span-3 text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                    Property
                  </div>
                  <div className="col-span-2 text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                    Category
                  </div>
                  <div className="col-span-1 text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                    Type
                  </div>
                  <div className="col-span-1 text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93]">
                    Upload Date
                  </div>
                  <div className="col-span-1 text-caption tracking-[0.1em] uppercase font-medium text-[#8E8E93] text-right">
                    Actions
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="px-6 py-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors group"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center">
                      {/* Document Name */}
                      <div className="md:col-span-4 flex items-center gap-3 min-w-0">
                        <div className="flex-shrink-0">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-small font-medium text-black dark:text-white truncate">
                              {doc.name}
                            </div>
                            {doc.isStarred && (
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-caption text-black/60 dark:text-white/60">
                            {doc.size} • Uploaded by {doc.uploadedBy}
                          </div>
                        </div>
                      </div>

                      {/* Property */}
                      <div className="md:col-span-3 min-w-0">
                        <div className="text-small text-black dark:text-white truncate">
                          {doc.propertyName}
                        </div>
                        <div className="text-caption text-black/60 dark:text-white/60 truncate">
                          {doc.propertyLocation}
                        </div>
                      </div>

                      {/* Category */}
                      <div className="md:col-span-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-caption tracking-wide uppercase bg-${getCategoryColor(doc.category)}-500/10 text-${getCategoryColor(doc.category)}-600 dark:text-${getCategoryColor(doc.category)}-400 border border-${getCategoryColor(doc.category)}-500/20`}>
                          <div className={`w-1.5 h-1.5 rounded-full bg-${getCategoryColor(doc.category)}-500`} />
                          {doc.category}
                        </span>
                      </div>

                      {/* Type */}
                      <div className="md:col-span-1">
                        <span className="text-caption font-mono text-black/60 dark:text-white/60">
                          {doc.type}
                        </span>
                      </div>

                      {/* Upload Date */}
                      <div className="md:col-span-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#8E8E93]" />
                          <span className="text-caption text-black dark:text-white">
                            {doc.uploadDate}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-1 flex items-center justify-end md:justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setViewingDocument(doc)}
                          className="p-2 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 rounded-lg transition-all"
                        >
                          <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </button>
                        <button className="p-2 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 rounded-lg transition-all">
                          <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </button>
                      </div>
                    </div>

                    {/* Verification Badge */}
                    {doc.verified && (
                      <div className="mt-2 ml-8">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 dark:bg-emerald-500/20 rounded text-caption font-medium text-emerald-700 dark:text-emerald-400 tracking-wide">
                          <CheckCircle2 className="w-3 h-3" />
                          VERIFIED
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredDocuments.length === 0 && (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-black/40 dark:text-white/40" />
                  </div>
                  <p className="text-small text-black/60 dark:text-white/60 mb-1">
                    No documents found
                  </p>
                  <p className="text-caption text-[#8E8E93]">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="group bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl overflow-hidden hover:border-emerald-500/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-all duration-300"
                >
                  {/* Document Preview */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-black/[0.02] to-black/[0.04] dark:from-white/[0.02] dark:to-white/[0.04] relative flex items-center justify-center">
                    <div className="scale-150">
                      {getFileIcon(doc.type)}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setViewingDocument(doc)}
                        className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    {/* Star Badge */}
                    {doc.isStarred && (
                      <div className="absolute top-3 right-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    )}

                    {/* Verified Badge */}
                    {doc.verified && (
                      <div className="absolute top-3 left-3">
                        <div className="w-6 h-6 rounded-full bg-black dark:bg-white flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Document Info */}
                  <div className="p-4">
                    <div className="text-small font-medium text-black dark:text-white mb-2 truncate">
                      {doc.name}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-3.5 h-3.5 text-black/40 dark:text-white/40 flex-shrink-0" />
                      <div className="text-caption text-black/60 dark:text-white/60 truncate">
                        {doc.propertyName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-caption font-medium tracking-wide uppercase bg-${getCategoryColor(doc.category)}-500/10 text-${getCategoryColor(doc.category)}-600 dark:text-${getCategoryColor(doc.category)}-400`}>
                        <div className={`w-1 h-1 rounded-full bg-${getCategoryColor(doc.category)}-500`} />
                        {doc.category}
                      </span>
                      <span className="text-caption text-black/40 dark:text-white/40 font-mono">
                        {doc.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-caption text-black/60 dark:text-white/60 pt-3 border-t border-black/5 dark:border-white/10">
                      <span>{doc.size}</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {filteredDocuments.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <div className="w-16 h-16 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-black/40 dark:text-white/40" />
                  </div>
                  <p className="text-small text-black/60 dark:text-white/60 mb-1">
                    No documents found
                  </p>
                  <p className="text-caption text-[#8E8E93]">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showPropertyFilter || showCategoryFilter) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowPropertyFilter(false);
            setShowCategoryFilter(false);
          }}
        />
      )}

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-xl rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_80px_rgba(0,0,0,0.4)] border border-white/60 dark:border-white/10 flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 card-padding border-b border-black/5 dark:border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {getFileIcon(viewingDocument.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-small md:text-body font-medium text-black dark:text-white truncate">
                    {viewingDocument.name}
                  </div>
                  <div className="text-caption text-black/60 dark:text-white/60">
                    {viewingDocument.size} • {viewingDocument.uploadDate}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingDocument(null)}
                className="w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/[0.08] dark:active:bg-white/[0.08] flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-black/60 dark:text-white/60" />
              </button>
            </div>

            {/* Document Preview */}
            <div className="card-padding flex-1 overflow-y-auto">
              <div className="w-full aspect-[1.414/1] bg-gradient-to-br from-black/[0.02] to-black/[0.04] dark:from-white/[0.02] dark:to-white/[0.04] rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="scale-[2.5] mb-8">
                    {getFileIcon(viewingDocument.type)}
                  </div>
                  <div className="text-small text-black/60 dark:text-white/60 mb-4">
                    Document Preview
                  </div>
                  <div className="text-caption text-black/40 dark:text-white/40">
                    Full preview available after download
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="flex flex-col gap-3 card-padding border-t border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] flex-shrink-0 mt-auto">
              <div className="flex flex-wrap items-center gap-3">
                {viewingDocument.verified && (
                  <div className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-caption font-medium text-emerald-700 dark:text-emerald-400 tracking-wide">
                      VERIFIED
                    </span>
                  </div>
                )}
                <div className="text-caption text-black/60 dark:text-white/60 flex-1 min-w-0">
                  <span className="font-medium text-black dark:text-white">{viewingDocument.propertyName}</span>
                  {viewingDocument.propertyLocation && <span className="hidden sm:inline"> • {viewingDocument.propertyLocation}</span>}
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2">
                <button className="w-full sm:flex-1 px-4 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 active:bg-black/[0.15] dark:active:bg-white/[0.15] text-black dark:text-white rounded-xl transition-all text-small font-medium flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setViewingDocument(null)}
                  className="w-full sm:flex-1 px-4 py-2.5 bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 active:bg-black/80 dark:active:bg-white/80 text-white rounded-lg transition-all text-small font-medium"
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