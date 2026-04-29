import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileImage,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderOpen,
  Lock,
  Search,
  Shield,
  Upload,
} from 'lucide-react';
import { NotificationDropdown } from '../components/NotificationDropdown';
import { ThemeToggle } from '../components/ThemeToggle';
import { useProperties } from '../contexts/PropertiesContext';

interface DocumentRecord {
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

const ALL_DOCUMENTS: DocumentRecord[] = [
  { id: '1', name: 'Sale Deed - Original Copy.pdf', propertyName: 'Sterling Heights, Sector 47', propertyLocation: 'Gurgaon, Haryana', category: 'Ownership', type: 'PDF', size: '2.4 MB', uploadDate: 'Mar 10, 2026', uploadedBy: 'You', verified: true, isStarred: true, lastAccessed: '2 hours ago' },
  { id: '2', name: 'Property Tax Receipt 2025-26.pdf', propertyName: 'Sterling Heights, Sector 47', propertyLocation: 'Gurgaon, Haryana', category: 'Compliance', type: 'PDF', size: '856 KB', uploadDate: 'Mar 12, 2026', uploadedBy: 'You', verified: true, isStarred: false, lastAccessed: 'Yesterday' },
  { id: '3', name: 'Land Registry Certificate.pdf', propertyName: 'Sterling Heights, Sector 47', propertyLocation: 'Gurgaon, Haryana', category: 'Land Records', type: 'PDF', size: '1.2 MB', uploadDate: 'Feb 28, 2026', uploadedBy: 'CA Priya Sharma', verified: true, isStarred: false, lastAccessed: '3 days ago' },
  { id: '4', name: 'Valuation Report Q1 2026.pdf', propertyName: 'Sterling Heights, Sector 47', propertyLocation: 'Gurgaon, Haryana', category: 'Financial', type: 'PDF', size: '3.8 MB', uploadDate: 'Mar 05, 2026', uploadedBy: 'Valuation Partner', verified: true, isStarred: true, lastAccessed: 'Today' },
  { id: '5', name: 'Electricity Bill - February 2026.pdf', propertyName: 'Sterling Heights, Sector 47', propertyLocation: 'Gurgaon, Haryana', category: 'Utility', type: 'PDF', size: '245 KB', uploadDate: 'Feb 15, 2026', uploadedBy: 'You', verified: false, isStarred: false, lastAccessed: '1 week ago' },
  { id: '6', name: 'Ownership Title Deed.pdf', propertyName: 'Golden Meadows Estate', propertyLocation: 'Bangalore, Karnataka', category: 'Ownership', type: 'PDF', size: '3.1 MB', uploadDate: 'Jan 20, 2026', uploadedBy: 'You', verified: true, isStarred: true, lastAccessed: '5 days ago' },
  { id: '7', name: 'Building Plan Approval.pdf', propertyName: 'Golden Meadows Estate', propertyLocation: 'Bangalore, Karnataka', category: 'Compliance', type: 'PDF', size: '4.2 MB', uploadDate: 'Jan 22, 2026', uploadedBy: 'Architect Team', verified: true, isStarred: false, lastAccessed: '2 weeks ago' },
  { id: '8', name: 'Annual Maintenance Statement.xlsx', propertyName: 'Golden Meadows Estate', propertyLocation: 'Bangalore, Karnataka', category: 'Financial', type: 'XLS', size: '1.8 MB', uploadDate: 'Feb 10, 2026', uploadedBy: 'You', verified: false, isStarred: false, lastAccessed: '4 days ago' },
  { id: '9', name: 'Purchase Agreement - Original.pdf', propertyName: 'Riverside Enclave', propertyLocation: 'Pune, Maharashtra', category: 'Ownership', type: 'PDF', size: '2.9 MB', uploadDate: 'Dec 15, 2025', uploadedBy: 'Legal Team', verified: true, isStarred: true, lastAccessed: '1 week ago' },
  { id: '10', name: 'Fire Safety Certificate.pdf', propertyName: 'Riverside Enclave', propertyLocation: 'Pune, Maharashtra', category: 'Compliance', type: 'PDF', size: '680 KB', uploadDate: 'Jan 05, 2026', uploadedBy: 'Safety Inspector', verified: true, isStarred: false, lastAccessed: '2 weeks ago' },
  { id: '11', name: 'Loan Sanction Letter.pdf', propertyName: 'Riverside Enclave', propertyLocation: 'Pune, Maharashtra', category: 'Financial', type: 'PDF', size: '520 KB', uploadDate: 'Dec 20, 2025', uploadedBy: 'HDFC Bank', verified: true, isStarred: false, lastAccessed: '10 days ago' },
  { id: '12', name: 'Property Insurance Policy.pdf', propertyName: 'Emerald Gardens Complex', propertyLocation: 'Noida, Uttar Pradesh', category: 'Supporting', type: 'PDF', size: '1.4 MB', uploadDate: 'Feb 25, 2026', uploadedBy: 'ICICI Lombard', verified: true, isStarred: false, lastAccessed: '6 days ago' },
  { id: '13', name: 'Khata Extract & Certificate.pdf', propertyName: 'Emerald Gardens Complex', propertyLocation: 'Noida, Uttar Pradesh', category: 'Land Records', type: 'PDF', size: '890 KB', uploadDate: 'Mar 01, 2026', uploadedBy: 'Revenue Officer', verified: true, isStarred: true, lastAccessed: 'Today' },
  { id: '14', name: 'Water Bill - March 2026.pdf', propertyName: 'Emerald Gardens Complex', propertyLocation: 'Noida, Uttar Pradesh', category: 'Utility', type: 'PDF', size: '180 KB', uploadDate: 'Mar 15, 2026', uploadedBy: 'You', verified: false, isStarred: false, lastAccessed: 'Yesterday' },
  { id: '15', name: 'Floor Plan - All Levels.jpg', propertyName: 'Emerald Gardens Complex', propertyLocation: 'Noida, Uttar Pradesh', category: 'Supporting', type: 'JPG', size: '5.2 MB', uploadDate: 'Feb 18, 2026', uploadedBy: 'Architect', verified: false, isStarred: false, lastAccessed: '1 week ago' },
  { id: '16', name: 'Personal Identity Proof - Aadhaar.pdf', propertyName: 'Independent', propertyLocation: '', category: 'Supporting', type: 'PDF', size: '420 KB', uploadDate: 'Mar 08, 2026', uploadedBy: 'You', verified: true, isStarred: false, lastAccessed: '3 days ago', isIndependent: true },
  { id: '17', name: 'PAN Card Copy.pdf', propertyName: 'Independent', propertyLocation: '', category: 'Supporting', type: 'PDF', size: '310 KB', uploadDate: 'Mar 08, 2026', uploadedBy: 'You', verified: true, isStarred: false, lastAccessed: '3 days ago', isIndependent: true },
  { id: '18', name: 'Investment Strategy Portfolio.pdf', propertyName: 'Independent', propertyLocation: '', category: 'Financial', type: 'PDF', size: '2.8 MB', uploadDate: 'Feb 22, 2026', uploadedBy: 'Financial Advisor', verified: false, isStarred: true, lastAccessed: '1 week ago', isIndependent: true },
];

const REQUIRED_CATEGORIES = ['Ownership', 'Compliance', 'Land Records', 'Financial'] as const;
const CATEGORY_META: Record<DocumentRecord['category'], { tone: string; border: string }> = {
  Ownership: { tone: 'text-brand-primary bg-brand-primary/[0.08] dark:text-white dark:bg-brand-primary/15', border: 'border-brand-primary/15 dark:border-brand-primary/20' },
  Compliance: { tone: 'text-[#0C7F86] bg-brand-accent/[0.10] dark:text-brand-accent dark:bg-brand-accent/15', border: 'border-brand-accent/20 dark:border-brand-accent/20' },
  Financial: { tone: 'text-[#215A93] bg-[#EEF6FF] dark:text-white/80 dark:bg-white/[0.06]', border: 'border-[#CFE4F8] dark:border-white/10' },
  'Land Records': { tone: 'text-[#3B5B76] bg-[#F3F8FC] dark:text-white/80 dark:bg-white/[0.06]', border: 'border-[#D9E8F4] dark:border-white/10' },
  Utility: { tone: 'text-[#5B7285] bg-[#F8FAFC] dark:text-white/70 dark:bg-white/[0.06]', border: 'border-[#E2E8F0] dark:border-white/10' },
  Supporting: { tone: 'text-[#5B7285] bg-[#F8FAFC] dark:text-white/70 dark:bg-white/[0.06]', border: 'border-[#E2E8F0] dark:border-white/10' },
};

type FocusMode = 'all' | 'required' | 'needs-review' | 'verified' | 'independent';

function getFileIcon(type: DocumentRecord['type']) {
  switch (type) {
    case 'PDF':
      return <FileText className="h-4 w-4 text-[#DA3D3D]" />;
    case 'DOC':
      return <FileText className="h-4 w-4 text-brand-primary" />;
    case 'XLS':
      return <FileSpreadsheet className="h-4 w-4 text-brand-accent" />;
    case 'JPG':
    case 'PNG':
      return <FileImage className="h-4 w-4 text-brand-primary" />;
    default:
      return <FileText className="h-4 w-4 text-[#94A3B8]" />;
  }
}

export function DocumentVault() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProperty } = useProperties();
  const routeProperty = id ? getProperty(id) : undefined;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(routeProperty?.name || 'all');
  const [focusMode, setFocusMode] = useState<FocusMode>('all');
  const [selectedDocument, setSelectedDocument] = useState<DocumentRecord | null>(null);

  const documents = ALL_DOCUMENTS;

  const propertySummaries = useMemo(() => {
    const source = documents.filter(doc => !doc.isIndependent);
    const names = Array.from(new Set(source.map(doc => doc.propertyName)));

    return names.map((name) => {
      const docs = source.filter(doc => doc.propertyName === name);
      const verifiedCount = docs.filter(doc => doc.verified).length;
      const requiredPresent = REQUIRED_CATEGORIES.filter(category =>
        docs.some(doc => doc.category === category && doc.verified)
      );
      const missingRequired = REQUIRED_CATEGORIES.filter(category => !requiredPresent.includes(category));

      return {
        name,
        location: docs[0]?.propertyLocation || '',
        total: docs.length,
        verifiedCount,
        missingRequired,
        readiness: Math.round((requiredPresent.length / REQUIRED_CATEGORIES.length) * 100),
      };
    });
  }, [documents]);

  const propertyFilterOptions = useMemo(() => {
    const base = propertySummaries.map(summary => ({
      label: summary.name,
      value: summary.name,
      count: summary.total,
    }));

    return [{ label: 'All Properties', value: 'all', count: documents.length }, ...base];
  }, [documents.length, propertySummaries]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProperty = selectedProperty === 'all' || doc.propertyName === selectedProperty;
      const matchesFocus =
        focusMode === 'all' ||
        (focusMode === 'required' && REQUIRED_CATEGORIES.includes(doc.category)) ||
        (focusMode === 'needs-review' && !doc.verified) ||
        (focusMode === 'verified' && doc.verified) ||
        (focusMode === 'independent' && doc.isIndependent);

      return matchesSearch && matchesProperty && matchesFocus;
    });
  }, [documents, focusMode, searchQuery, selectedProperty]);

  const readinessMetrics = useMemo(() => {
    const verified = documents.filter(doc => doc.verified).length;
    const needsReview = documents.filter(doc => !doc.verified).length;
    const missingRequired = propertySummaries.reduce((sum, property) => sum + property.missingRequired.length, 0);

    return {
      total: documents.length,
      verified,
      needsReview,
      missingRequired,
    };
  }, [documents, propertySummaries]);

  const requirementRows = useMemo(() => {
    return propertySummaries.flatMap((property) =>
      property.missingRequired.map((category) => ({
        propertyName: property.name,
        location: property.location,
        category,
      }))
    );
  }, [propertySummaries]);

  const recentDocuments = useMemo(() => {
    return [...filteredDocuments].sort((a, b) => Date.parse(b.uploadDate) - Date.parse(a.uploadDate)).slice(0, 6);
  }, [filteredDocuments]);

  const pageTitle = routeProperty ? `${routeProperty.name} Documents` : 'Documents';
  const pageSubtitle = routeProperty
    ? 'Readiness, missing requirements, and recent uploads for this asset'
    : 'Readiness, missing requirements, and verified records across your portfolio';

  return (
    <div className="min-h-screen bg-[#F6FAFC] dark:bg-background">
      <div className="border-b border-[#E2E8F0] dark:border-white/[0.06] bg-white dark:bg-card">
        <div className="mx-auto max-w-[1200px] container-padding py-5 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 text-xs font-normal uppercase tracking-[0.12em] text-brand-accent">
                Document Readiness
              </div>
              <h1 className="text-h1 font-normal tracking-tight text-[#0F172A] dark:text-white">
                {pageTitle}
              </h1>
              <p className="mt-1 text-small text-[#475569] dark:text-white/50">
                {pageSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-small font-normal text-white transition-all hover:bg-brand-primary-hover"
              >
                <Upload className="h-4 w-4" />
                Upload Document
              </button>
              <NotificationDropdown />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] container-padding py-6 md:py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { label: 'Total Files', value: readinessMetrics.total, note: 'across vault', accent: 'text-[#0F172A] dark:text-white' },
            { label: 'Verified', value: readinessMetrics.verified, note: 'ready for diligence', accent: 'text-brand-primary' },
            { label: 'Needs Review', value: readinessMetrics.needsReview, note: 'awaiting validation', accent: 'text-brand-accent' },
            { label: 'Missing Critical', value: readinessMetrics.missingRequired, note: 'required for HABU / diligence', accent: 'text-[#3B5B76] dark:text-white/75' },
          ].map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-card">
              <div className="text-[10px] font-normal uppercase tracking-[0.1em] text-[#94A3B8]">{metric.label}</div>
              <div className={`mt-2 text-h1 font-normal tracking-tight ${metric.accent}`}>{metric.value}</div>
              <div className="mt-1 text-xs text-[#64748B] dark:text-white/40">{metric.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[#D9E8F4] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-normal uppercase tracking-[0.1em] text-brand-primary">Portfolio Readiness</div>
                <h2 className="mt-2 text-h3 font-normal tracking-tight text-[#0F172A] dark:text-white">
                  Which assets are ready for analysis
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-brand-primary/[0.08] px-3 py-2 text-xs text-brand-primary dark:bg-white/[0.06] dark:text-white/80">
                <Shield className="h-3.5 w-3.5" />
                HABU + diligence ready
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {propertySummaries.map((property) => (
                <button
                  key={property.name}
                  onClick={() => setSelectedProperty(property.name)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all ${
                    selectedProperty === property.name
                      ? 'border-brand-primary/20 bg-brand-primary/[0.04] dark:border-brand-primary/25 dark:bg-white/[0.04]'
                      : 'border-[#E2E8F0] bg-[#FBFDFF] hover:border-brand-primary/15 dark:border-white/[0.06] dark:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-small font-normal text-[#0F172A] dark:text-white">{property.name}</div>
                      <div className="mt-1 text-xs text-[#64748B] dark:text-white/45">{property.location}</div>
                    </div>
                    <div className="rounded-xl bg-white px-3 py-1.5 text-xs text-brand-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-white/[0.06] dark:text-white/80">
                      {property.readiness}% ready
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E8F1F7] dark:bg-white/[0.08]">
                      <div className="h-full rounded-full bg-brand-primary" style={{ width: `${property.readiness}%` }} />
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-white/45">
                      {property.verifiedCount}/{property.total} verified
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {property.missingRequired.length === 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/[0.10] px-2.5 py-1 text-[10px] uppercase tracking-[0.06em] text-[#0C7F86] dark:bg-brand-accent/15 dark:text-brand-accent">
                        <CheckCircle2 className="h-3 w-3" />
                        Complete
                      </span>
                    ) : (
                      property.missingRequired.map((missing) => (
                        <span key={`${property.name}-${missing}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F8FC] px-2.5 py-1 text-[10px] uppercase tracking-[0.06em] text-[#5B7285] dark:bg-white/[0.06] dark:text-white/65">
                          <AlertTriangle className="h-3 w-3" />
                          Missing {missing}
                        </span>
                      ))
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-card">
            <div className="text-[10px] font-normal uppercase tracking-[0.1em] text-brand-accent">Action Queue</div>
            <h2 className="mt-2 text-h3 font-normal tracking-tight text-[#0F172A] dark:text-white">
              Required before review
            </h2>
            <div className="mt-5 space-y-3">
              {requirementRows.length > 0 ? (
                requirementRows.map((row, index) => (
                  <div key={`${row.propertyName}-${row.category}-${index}`} className="rounded-2xl border border-[#E2E8F0] bg-[#FBFDFF] p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-small font-normal text-[#0F172A] dark:text-white">{row.propertyName}</div>
                        <div className="mt-1 text-xs text-[#64748B] dark:text-white/45">{row.location}</div>
                      </div>
                      <span className="rounded-full bg-brand-primary/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-[0.06em] text-brand-primary dark:bg-white/[0.06] dark:text-white/75">
                        Required
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="text-sm text-[#475569] dark:text-white/55">Upload or verify {row.category}</div>
                      <button
                        onClick={() => navigate(id ? `/property/${id}/documents/upload` : '/documents/upload')}
                        className="inline-flex items-center gap-1.5 text-xs text-brand-primary dark:text-white/80"
                      >
                        Resolve
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#FBFDFF] p-5 text-center dark:border-white/[0.06] dark:bg-white/[0.02]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/[0.10] dark:bg-brand-accent/15">
                    <CheckCircle2 className="h-6 w-6 text-[#0C7F86] dark:text-brand-accent" />
                  </div>
                  <div className="mt-3 text-small text-[#0F172A] dark:text-white">No critical gaps right now</div>
                  <div className="mt-1 text-xs text-[#64748B] dark:text-white/40">The current vault is ready for review workflows.</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documents, properties, or categories"
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#FBFDFF] py-3 pl-10 pr-4 text-small text-[#0F172A] outline-none transition-all focus:border-brand-primary/30 focus:ring-2 focus:ring-brand-primary/[0.08] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white"
                />
              </div>
              <div className="hidden items-center gap-2 rounded-xl border border-[#E2E8F0] px-3 py-3 text-xs text-[#64748B] dark:border-white/[0.08] dark:text-white/45 md:flex">
                <Lock className="h-3.5 w-3.5" />
                encrypted
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[220px_auto]">
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#FBFDFF] py-3 pl-10 pr-10 text-small text-[#0F172A] outline-none dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white"
                >
                  {propertyFilterOptions.map((property) => (
                    <option key={property.value} value={property.value}>
                      {property.label} ({property.count})
                    </option>
                  ))}
                </select>
                <Filter className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'required', label: 'Required' },
                  { id: 'needs-review', label: 'Needs Review' },
                  { id: 'verified', label: 'Verified' },
                  { id: 'independent', label: 'Independent' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFocusMode(option.id as FocusMode)}
                    className={`rounded-full px-3 py-2 text-xs font-normal transition-all ${
                      focusMode === option.id
                        ? 'bg-brand-primary text-white'
                        : 'border border-[#E2E8F0] bg-white text-[#64748B] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/55'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-normal uppercase tracking-[0.1em] text-[#94A3B8]">Documents</div>
                <h2 className="mt-2 text-h3 font-normal tracking-tight text-[#0F172A] dark:text-white">
                  {filteredDocuments.length} files in view
                </h2>
              </div>
              <div className="text-xs text-[#64748B] dark:text-white/45">
                Search stays because this list will grow
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {filteredDocuments.map((doc) => {
                const meta = CATEGORY_META[doc.category];
                return (
                  <div
                    key={doc.id}
                    className="rounded-2xl border border-[#E2E8F0] bg-[#FBFDFF] p-4 transition-all hover:border-brand-primary/15 dark:border-white/[0.06] dark:bg-white/[0.02]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-white/[0.06]">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-small font-normal text-[#0F172A] dark:text-white">{doc.name}</div>
                          <div className="mt-1 text-xs text-[#64748B] dark:text-white/45">
                            {doc.propertyName}
                            {doc.propertyLocation ? ` · ${doc.propertyLocation}` : ''}
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.06em] ${meta.tone} ${meta.border}`}>
                              {doc.category}
                            </span>
                            <span className="text-xs text-[#64748B] dark:text-white/40">{doc.size}</span>
                            <span className="text-xs text-[#64748B] dark:text-white/40">{doc.uploadDate}</span>
                            {doc.verified ? (
                              <span className="inline-flex items-center gap-1 text-xs text-[#0C7F86] dark:text-brand-accent">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-[#5B7285] dark:text-white/55">
                                <Clock className="h-3.5 w-3.5" />
                                Review pending
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDocument(doc)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-brand-primary dark:border-white/10 dark:text-white/80"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                        <button className="inline-flex items-center gap-1.5 rounded-xl bg-brand-primary px-3 py-2 text-xs text-white">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredDocuments.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#D9E8F4] p-10 text-center dark:border-white/[0.08]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F8FC] dark:bg-white/[0.04]">
                    <FolderOpen className="h-6 w-6 text-[#94A3B8]" />
                  </div>
                  <div className="mt-3 text-small text-[#0F172A] dark:text-white">No documents match this view</div>
                  <div className="mt-1 text-xs text-[#64748B] dark:text-white/40">Try another property, focus mode, or search term.</div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-card">
              <div className="text-[10px] font-normal uppercase tracking-[0.1em] text-[#94A3B8]">Recently Touched</div>
              <h2 className="mt-2 text-h3 font-normal tracking-tight text-[#0F172A] dark:text-white">
                Recent activity
              </h2>
              <div className="mt-4 space-y-3">
                {recentDocuments.map((doc) => (
                  <div key={`recent-${doc.id}`} className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] p-3 dark:border-white/[0.06]">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#F3F8FC] dark:bg-white/[0.04]">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-[#0F172A] dark:text-white">{doc.name}</div>
                      <div className="mt-1 text-xs text-[#64748B] dark:text-white/40">
                        {doc.lastAccessed || doc.uploadDate} · {doc.uploadedBy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#D9E8F4] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-card">
              <div className="inline-flex items-center gap-2 rounded-xl bg-brand-accent/[0.10] px-3 py-2 text-xs text-[#0C7F86] dark:bg-brand-accent/15 dark:text-brand-accent">
                <Shield className="h-3.5 w-3.5" />
                Review standard
              </div>
              <h2 className="mt-4 text-h3 font-normal tracking-tight text-[#0F172A] dark:text-white">
                What the business can show
              </h2>
              <div className="mt-4 space-y-3 text-sm text-[#475569] dark:text-white/55">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" />
                  <span>Readiness is visible by asset, not buried inside folders.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" />
                  <span>Missing compliance and ownership gaps surface immediately.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" />
                  <span>Verified files and pending reviews are separated cleanly.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedDocument && (
        <>
          <div className="fixed inset-0 z-40 bg-brand-navy/55 backdrop-blur-sm" onClick={() => setSelectedDocument(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_80px_rgba(var(--brand-navy-rgb),0.25)] dark:border-white/[0.08] dark:bg-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F3F8FC] dark:bg-white/[0.05]">
                    {getFileIcon(selectedDocument.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-body font-normal text-[#0F172A] dark:text-white">{selectedDocument.name}</div>
                    <div className="mt-1 text-xs text-[#64748B] dark:text-white/45">
                      {selectedDocument.size} · {selectedDocument.uploadDate}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs text-[#64748B] dark:border-white/10 dark:text-white/55"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 rounded-3xl border border-dashed border-[#D9E8F4] bg-[#FBFDFF] px-6 py-14 text-center dark:border-white/[0.08] dark:bg-white/[0.03]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:bg-white/[0.06]">
                  {getFileIcon(selectedDocument.type)}
                </div>
                <div className="mt-4 text-small text-[#0F172A] dark:text-white">Preview placeholder</div>
                <div className="mt-1 text-xs text-[#64748B] dark:text-white/40">
                  The review version focuses on readiness and auditability. File rendering can sit behind this.
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl bg-brand-primary/[0.08] px-3 py-2 text-xs text-brand-primary dark:bg-white/[0.06] dark:text-white/80">
                  <Calendar className="h-3.5 w-3.5" />
                  Last accessed {selectedDocument.lastAccessed || selectedDocument.uploadDate}
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-brand-accent/[0.10] px-3 py-2 text-xs text-[#0C7F86] dark:bg-brand-accent/15 dark:text-brand-accent">
                  <Shield className="h-3.5 w-3.5" />
                  {selectedDocument.verified ? 'Verified file' : 'Awaiting review'}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
