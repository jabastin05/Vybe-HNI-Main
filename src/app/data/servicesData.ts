import { FileText, FileCheck, Building2, Users, FileSignature, TrendingUp, ShieldCheck, Wrench, Package, Ruler, PenTool, DollarSign, Compass, HardHat, Clipboard, Flower2, Map, Sparkles, Home } from 'lucide-react';

export interface ServiceAttribute {
  name: string;
  description: string;
  eta: string;
  priceRange: string;
  requirements: string[];
  deliverables: string[];
  executionPartnerRole: string;
  enabled: boolean;
}

export interface ServiceData {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  iconName: string; // Store icon name instead of component
  color: string;
  badge?: string;
  featured: boolean;
  attributes: ServiceAttribute[];
}

// Icon mapping
export const iconMap: Record<string, any> = {
  FileText,
  FileCheck,
  Building2,
  Users,
  FileSignature,
  TrendingUp,
  ShieldCheck,
  Wrench,
  Package,
  Ruler,
  PenTool,
  DollarSign,
  Compass,
  HardHat,
  Clipboard,
  Flower2,
  Map,
  Sparkles,
  Home,
};

// Mock service data organized by categories
export const servicesData: ServiceData[] = [
  // Legal
  {
    id: 'title-verification',
    name: 'Title Verification',
    categoryId: 'legal',
    categoryName: 'Legal',
    description: 'Complete title deed verification and clearance with legal expert review',
    iconName: 'FileText',
    color: 'from-blue-500 to-cyan-500',
    badge: 'Most Popular',
    featured: true,
    attributes: [
      {
        name: 'Title Verification',
        description: 'Complete title deed verification and legal clearance',
        eta: '5-7 days',
        priceRange: '₹50,000 - ₹1,00,000',
        requirements: ['Sale deed', 'Encumbrance certificate', 'Tax receipts', 'Survey documents'],
        deliverables: ['Title verification report', 'Legal opinion', 'Chain of ownership', 'Risk assessment'],
        executionPartnerRole: 'Legal Partner',
        enabled: true,
      },
    ],
  },
  {
    id: 'legal-documentation',
    name: 'Legal Documentation',
    categoryId: 'legal',
    categoryName: 'Legal',
    description: 'Preparation of sale deed, agreements and related legal documents',
    iconName: 'FileSignature',
    color: 'from-blue-500 to-cyan-500',
    featured: false,
    attributes: [
      {
        name: 'Legal Documentation',
        description: 'Professional legal document preparation and filing',
        eta: '3-5 days',
        priceRange: '₹75,000 - ₹1,50,000',
        requirements: ['Parties identification', 'Property details', 'Transaction terms'],
        deliverables: ['Sale deed draft', 'Registration documents', 'Affidavits', 'Legal checklist'],
        executionPartnerRole: 'Legal Partner',
        enabled: true,
      },
    ],
  },
  {
    id: 'noc-processing',
    name: 'NOC Processing',
    categoryId: 'legal',
    categoryName: 'Legal',
    description: 'No Objection Certificate processing from relevant authorities',
    iconName: 'ShieldCheck',
    color: 'from-blue-500 to-cyan-500',
    featured: false,
    attributes: [
      {
        name: 'NOC Processing',
        description: 'Complete NOC processing and approval management',
        eta: '14-21 days',
        priceRange: '₹25,000 - ₹60,000',
        requirements: ['Application forms', 'Property documents', 'Compliance certificates'],
        deliverables: ['NOC certificate', 'Application tracking', 'Authority liaison', 'Approval documents'],
        executionPartnerRole: 'Legal Partner',
        enabled: true,
      },
    ],
  },
  {
    id: 'lease-agreement',
    name: 'Lease Agreement',
    categoryId: 'legal',
    categoryName: 'Legal',
    description: 'Professional lease agreement drafting and registration',
    iconName: 'FileSignature',
    color: 'from-blue-500 to-cyan-500',
    featured: false,
    attributes: [
      {
        name: 'Lease Agreement',
        description: 'Legal lease agreement preparation and registration',
        eta: '3-7 days',
        priceRange: '₹5,000 - ₹15,000',
        requirements: ['Landlord details', 'Tenant details', 'Property information', 'Terms and conditions'],
        deliverables: ['Lease agreement draft', 'Registration support', 'Stamp duty guidance', 'Legal review'],
        executionPartnerRole: 'Legal Partner',
        enabled: true,
      },
    ],
  },
  
  // Architect
  {
    id: 'architectural-design',
    name: 'Architectural Design',
    categoryId: 'architect',
    categoryName: 'Architect',
    description: 'Complete architectural design and planning package',
    iconName: 'PenTool',
    color: 'from-purple-500 to-pink-500',
    badge: 'Premium',
    featured: true,
    attributes: [
      {
        name: 'Architectural Design',
        description: 'Comprehensive architectural design services',
        eta: '30-45 days',
        priceRange: '₹3,00,000 - ₹10,00,000',
        requirements: ['Site survey', 'Client requirements', 'Budget details', 'Local regulations'],
        deliverables: ['Design drawings', 'Floor plans', 'Elevations', '3D renders', 'BOQ'],
        executionPartnerRole: 'Architect & Planning',
        enabled: true,
      },
    ],
  },
  {
    id: 'site-planning',
    name: 'Site Planning',
    categoryId: 'architect',
    categoryName: 'Architect',
    description: 'Master site layout and planning services',
    iconName: 'Ruler',
    color: 'from-purple-500 to-pink-500',
    featured: false,
    attributes: [
      {
        name: 'Site Planning',
        description: 'Strategic site layout and master planning',
        eta: '15-21 days',
        priceRange: '₹1,50,000 - ₹4,00,000',
        requirements: ['Site survey', 'Topography data', 'Zoning regulations'],
        deliverables: ['Site plan', 'Layout drawings', 'Space utilization', 'Access planning'],
        executionPartnerRole: 'Architect & Planning',
        enabled: true,
      },
    ],
  },
  {
    id: '3d-visualization',
    name: '3D Visualization',
    categoryId: 'architect',
    categoryName: 'Architect',
    description: 'Photorealistic 3D renders and walkthroughs',
    iconName: 'Building2',
    color: 'from-purple-500 to-pink-500',
    featured: false,
    attributes: [
      {
        name: '3D Visualization',
        description: 'High-quality 3D renders and virtual tours',
        eta: '10-14 days',
        priceRange: '₹80,000 - ₹2,50,000',
        requirements: ['Design drawings', 'Material preferences', 'Reference images'],
        deliverables: ['3D renders', 'Virtual walkthrough', 'Multiple views', 'Revision rounds'],
        executionPartnerRole: 'Architect & Planning',
        enabled: true,
      },
    ],
  },

  // Valuation
  {
    id: 'property-valuation',
    name: 'Property Valuation',
    categoryId: 'valuation',
    categoryName: 'Valuation',
    description: 'Professional property valuation by certified valuers',
    iconName: 'DollarSign',
    color: 'from-emerald-500 to-green-500',
    featured: true,
    attributes: [
      {
        name: 'Property Valuation',
        description: 'Comprehensive property valuation and assessment',
        eta: '3-5 days',
        priceRange: '₹10,000 - ₹50,000',
        requirements: ['Property documents', 'Site access', 'Building plans'],
        deliverables: ['Valuation report', 'Market analysis', 'Comparable data', 'Certified certificate'],
        executionPartnerRole: 'Survey Technician',
        enabled: true,
      },
    ],
  },
  {
    id: 'market-research',
    name: 'Market Research',
    categoryId: 'valuation',
    categoryName: 'Valuation',
    description: 'Comprehensive market research and competitive analysis',
    iconName: 'TrendingUp',
    color: 'from-emerald-500 to-green-500',
    featured: false,
    attributes: [
      {
        name: 'Market Research',
        description: 'Detailed market analysis and insights',
        eta: '5-7 days',
        priceRange: '₹25,000 - ₹75,000',
        requirements: ['Research scope', 'Location details', 'Property type'],
        deliverables: ['Market report', 'Competitive analysis', 'Price trends', 'Growth forecast'],
        executionPartnerRole: 'Survey Technician',
        enabled: true,
      },
    ],
  },
  {
    id: 'investment-analysis',
    name: 'Investment Analysis',
    categoryId: 'valuation',
    categoryName: 'Valuation',
    description: 'Investment potential and ROI analysis',
    iconName: 'TrendingUp',
    color: 'from-emerald-500 to-green-500',
    featured: false,
    attributes: [
      {
        name: 'Investment Analysis',
        description: 'Comprehensive investment potential assessment',
        eta: '7-10 days',
        priceRange: '₹50,000 - ₹1,50,000',
        requirements: ['Property details', 'Financial goals', 'Timeline expectations'],
        deliverables: ['Investment report', 'ROI projections', 'Risk analysis', 'Recommendations'],
        executionPartnerRole: 'Developer & JV',
        enabled: true,
      },
    ],
  },

  // Surveyor
  {
    id: 'land-survey',
    name: 'Land Survey',
    categoryId: 'surveyor',
    categoryName: 'Surveyor',
    description: 'Detailed topographical land survey and mapping',
    iconName: 'Compass',
    color: 'from-orange-500 to-amber-500',
    featured: true,
    attributes: [
      {
        name: 'Land Survey',
        description: 'Professional topographical survey',
        eta: '5-10 days',
        priceRange: '₹35,000 - ₹1,00,000',
        requirements: ['Property access', 'Boundary details', 'Site clearance'],
        deliverables: ['Survey report', 'Topographic map', 'Contour drawings', 'Coordinates'],
        executionPartnerRole: 'Survey Technician',
        enabled: true,
      },
    ],
  },
  {
    id: 'boundary-marking',
    name: 'Boundary Marking',
    categoryId: 'surveyor',
    categoryName: 'Surveyor',
    description: 'Physical boundary demarcation and verification',
    iconName: 'Ruler',
    color: 'from-orange-500 to-amber-500',
    featured: false,
    attributes: [
      {
        name: 'Boundary Marking',
        description: 'Professional boundary demarcation services',
        eta: '3-5 days',
        priceRange: '₹15,000 - ₹40,000',
        requirements: ['Survey documents', 'Neighbor consent', 'Site access'],
        deliverables: ['Boundary markers', 'Demarcation report', 'Site photographs', 'Verification certificate'],
        executionPartnerRole: 'Survey Technician',
        enabled: true,
      },
    ],
  },
  {
    id: 'soil-testing',
    name: 'Soil Testing',
    categoryId: 'surveyor',
    categoryName: 'Surveyor',
    description: 'Comprehensive soil analysis and geotechnical testing',
    iconName: 'Compass',
    color: 'from-orange-500 to-amber-500',
    featured: false,
    attributes: [
      {
        name: 'Soil Testing',
        description: 'Complete soil analysis and load-bearing capacity',
        eta: '7-10 days',
        priceRange: '₹20,000 - ₹60,000',
        requirements: ['Site access', 'Testing locations', 'Depth requirements'],
        deliverables: ['Soil test report', 'Bearing capacity analysis', 'Foundation recommendations', 'Lab certificates'],
        executionPartnerRole: 'Survey Technician',
        enabled: true,
      },
    ],
  },

  // Contractor
  {
    id: 'construction-services',
    name: 'Construction Services',
    categoryId: 'contractor',
    categoryName: 'Contractor',
    description: 'End-to-end construction and project execution',
    iconName: 'HardHat',
    color: 'from-red-500 to-orange-500',
    badge: 'Premium',
    featured: true,
    attributes: [
      {
        name: 'Construction Services',
        description: 'Complete construction execution services',
        eta: '6-18 months',
        priceRange: '₹10,00,000 - ₹5,00,00,000',
        requirements: ['Approved plans', 'Budget allocation', 'Timeline', 'Permits'],
        deliverables: ['Project execution', 'Quality control', 'Progress reports', 'Completion certificate'],
        executionPartnerRole: 'Developer & JV',
        enabled: true,
      },
    ],
  },
  {
    id: 'renovation-remodeling',
    name: 'Renovation & Remodeling',
    categoryId: 'contractor',
    categoryName: 'Contractor',
    description: 'Property renovation and interior remodeling',
    iconName: 'Wrench',
    color: 'from-red-500 to-orange-500',
    featured: false,
    attributes: [
      {
        name: 'Renovation & Remodeling',
        description: 'Professional renovation and remodeling services',
        eta: '30-90 days',
        priceRange: '₹5,00,000 - ₹50,00,000',
        requirements: ['Scope of work', 'Design preferences', 'Budget', 'Timeline'],
        deliverables: ['Renovation execution', 'Material procurement', 'Quality finishing', 'Warranty'],
        executionPartnerRole: 'Channel & Field',
        enabled: true,
      },
    ],
  },
  {
    id: 'project-management',
    name: 'Project Management',
    categoryId: 'contractor',
    categoryName: 'Contractor',
    description: 'Construction project management and supervision',
    iconName: 'Clipboard',
    color: 'from-red-500 to-orange-500',
    featured: false,
    attributes: [
      {
        name: 'Project Management',
        description: 'Professional construction project oversight',
        eta: 'Project duration',
        priceRange: '₹2,00,000 - ₹20,00,000',
        requirements: ['Project details', 'Scope of supervision', 'Timeline'],
        deliverables: ['Progress monitoring', 'Quality checks', 'Vendor coordination', 'Status reports'],
        executionPartnerRole: 'Developer & JV',
        enabled: true,
      },
    ],
  },

  // Property Management
  {
    id: 'facility-management',
    name: 'Facility Management',
    categoryId: 'property-management',
    categoryName: 'Property Management',
    description: 'End-to-end facility management services',
    iconName: 'Home',
    color: 'from-indigo-500 to-blue-500',
    featured: true,
    attributes: [
      {
        name: 'Facility Management',
        description: 'Complete facility management solutions',
        eta: 'Ongoing',
        priceRange: '₹15,000 - ₹1,00,000/month',
        requirements: ['Property details', 'Service scope', 'Budget allocation'],
        deliverables: ['Maintenance services', 'Vendor management', 'Monthly reports', '24/7 support'],
        executionPartnerRole: 'Channel & Field',
        enabled: true,
      },
    ],
  },
  {
    id: 'property-maintenance',
    name: 'Property Maintenance',
    categoryId: 'property-management',
    categoryName: 'Property Management',
    description: 'Regular maintenance and repair services',
    iconName: 'Wrench',
    color: 'from-indigo-500 to-blue-500',
    featured: false,
    attributes: [
      {
        name: 'Property Maintenance',
        description: 'Comprehensive property maintenance services',
        eta: '1-3 days',
        priceRange: '₹3,000 - ₹50,000',
        requirements: ['Property access', 'Maintenance scope', 'Schedule'],
        deliverables: ['Repair services', 'Preventive maintenance', 'Work reports', 'Warranty'],
        executionPartnerRole: 'Channel & Field',
        enabled: true,
      },
    ],
  },
  {
    id: 'rental-management',
    name: 'Rental Management',
    categoryId: 'property-management',
    categoryName: 'Property Management',
    description: 'Complete rental property management services',
    iconName: 'Users',
    color: 'from-indigo-500 to-blue-500',
    featured: false,
    attributes: [
      {
        name: 'Rental Management',
        description: 'End-to-end rental property management',
        eta: 'Ongoing',
        priceRange: '₹5,000 - ₹30,000/month',
        requirements: ['Property access', 'Owner authorization', 'Service scope'],
        deliverables: ['Rent collection', 'Tenant management', 'Maintenance coordination', 'Financial reports'],
        executionPartnerRole: 'Channel & Field',
        enabled: true,
      },
    ],
  },
  {
    id: 'tenant-screening',
    name: 'Tenant Screening',
    categoryId: 'property-management',
    categoryName: 'Property Management',
    description: 'Comprehensive tenant background verification',
    iconName: 'Users',
    color: 'from-indigo-500 to-blue-500',
    featured: false,
    attributes: [
      {
        name: 'Tenant Screening',
        description: 'Complete tenant verification services',
        eta: '2-4 days',
        priceRange: '₹2,000 - ₹10,000',
        requirements: ['Tenant consent', 'Identity documents', 'Employment details'],
        deliverables: ['Background report', 'Credit check', 'Employment verification', 'Reference checks'],
        executionPartnerRole: 'Channel & Field',
        enabled: true,
      },
    ],
  },

  // Documentation
  {
    id: 'property-tax-filing',
    name: 'Property Tax Filing',
    categoryId: 'documentation',
    categoryName: 'Documentation',
    description: 'Complete property tax assessment and filing',
    iconName: 'FileCheck',
    color: 'from-teal-500 to-cyan-500',
    featured: true,
    attributes: [
      {
        name: 'Property Tax Filing',
        description: 'Professional tax filing and compliance',
        eta: '7-14 days',
        priceRange: '₹5,000 - ₹20,000',
        requirements: ['Property documents', 'Previous tax receipts', 'Ownership proof'],
        deliverables: ['Tax assessment', 'Filed documents', 'Payment receipts', 'Compliance certificate'],
        executionPartnerRole: 'Documentation & Compliance',
        enabled: true,
      },
    ],
  },
  {
    id: 'document-verification',
    name: 'Document Verification',
    categoryId: 'documentation',
    categoryName: 'Documentation',
    description: 'Complete property document verification',
    iconName: 'ShieldCheck',
    color: 'from-teal-500 to-cyan-500',
    featured: false,
    attributes: [
      {
        name: 'Document Verification',
        description: 'Comprehensive document verification services',
        eta: '5-7 days',
        priceRange: '₹15,000 - ₹50,000',
        requirements: ['Property documents', 'Sale agreements', 'Previous records'],
        deliverables: ['Verification report', 'Document checklist', 'Risk analysis', 'Recommendations'],
        executionPartnerRole: 'Documentation & Compliance',
        enabled: true,
      },
    ],
  },
  {
    id: 'permit-approvals',
    name: 'Permit & Approvals',
    categoryId: 'documentation',
    categoryName: 'Documentation',
    description: 'Building permits and government approvals',
    iconName: 'Clipboard',
    color: 'from-teal-500 to-cyan-500',
    featured: false,
    attributes: [
      {
        name: 'Permit & Approvals',
        description: 'Complete permit and approval processing',
        eta: '30-60 days',
        priceRange: '₹50,000 - ₹2,00,000',
        requirements: ['Approved plans', 'Property documents', 'Application forms'],
        deliverables: ['Permit processing', 'Authority liaison', 'Approval tracking', 'Certificates'],
        executionPartnerRole: 'Documentation & Compliance',
        enabled: true,
      },
    ],
  },

  // Vastu
  {
    id: 'vastu-consultation',
    name: 'Vastu Consultation',
    categoryId: 'vastu',
    categoryName: 'Vastu',
    description: 'Professional Vastu consultation and recommendations',
    iconName: 'Flower2',
    color: 'from-pink-500 to-rose-500',
    featured: true,
    attributes: [
      {
        name: 'Vastu Consultation',
        description: 'Expert Vastu analysis and guidance',
        eta: '3-5 days',
        priceRange: '₹10,000 - ₹50,000',
        requirements: ['Site plan', 'Building layout', 'Compass directions'],
        deliverables: ['Vastu analysis report', 'Recommendations', 'Correction suggestions', 'Follow-up support'],
        executionPartnerRole: 'Architect & Planning',
        enabled: true,
      },
    ],
  },
  {
    id: 'vastu-correction',
    name: 'Vastu Correction',
    categoryId: 'vastu',
    categoryName: 'Vastu',
    description: 'Vastu defect correction and remedies',
    iconName: 'Sparkles',
    color: 'from-pink-500 to-rose-500',
    featured: false,
    attributes: [
      {
        name: 'Vastu Correction',
        description: 'Implementation of Vastu corrections',
        eta: '7-14 days',
        priceRange: '₹25,000 - ₹2,00,000',
        requirements: ['Vastu report', 'Budget allocation', 'Implementation timeline'],
        deliverables: ['Correction implementation', 'Material guidance', 'Supervision', 'Verification report'],
        executionPartnerRole: 'Architect & Planning',
        enabled: true,
      },
    ],
  },

  // Drone + GIS
  {
    id: 'drone-survey',
    name: 'Drone Survey',
    categoryId: 'drone-gis',
    categoryName: 'Drone + GIS',
    description: 'Aerial drone survey and mapping',
    iconName: 'Map',
    color: 'from-violet-500 to-purple-500',
    badge: 'Advanced',
    featured: true,
    attributes: [
      {
        name: 'Drone Survey',
        description: 'High-resolution aerial survey and mapping',
        eta: '3-5 days',
        priceRange: '₹25,000 - ₹1,00,000',
        requirements: ['Site access', 'Survey scope', 'Flight permissions'],
        deliverables: ['Aerial photographs', 'Orthomosaic maps', '3D models', 'Survey report'],
        executionPartnerRole: 'Survey Technician',
        enabled: true,
      },
    ],
  },
  {
    id: 'gis-mapping',
    name: 'GIS Mapping',
    categoryId: 'drone-gis',
    categoryName: 'Drone + GIS',
    description: 'Geographic Information System mapping and analysis',
    iconName: 'Compass',
    color: 'from-violet-500 to-purple-500',
    featured: false,
    attributes: [
      {
        name: 'GIS Mapping',
        description: 'Professional GIS mapping and spatial analysis',
        eta: '5-7 days',
        priceRange: '₹30,000 - ₹1,50,000',
        requirements: ['Survey data', 'Mapping scope', 'Data requirements'],
        deliverables: ['GIS maps', 'Spatial database', 'Analysis reports', 'Digital formats'],
        executionPartnerRole: 'Survey Technician',
        enabled: true,
      },
    ],
  },
  {
    id: 'progress-monitoring',
    name: 'Progress Monitoring',
    categoryId: 'drone-gis',
    categoryName: 'Drone + GIS',
    description: 'Construction progress monitoring via drone',
    iconName: 'Map',
    color: 'from-violet-500 to-purple-500',
    featured: false,
    attributes: [
      {
        name: 'Progress Monitoring',
        description: 'Drone-based construction progress tracking',
        eta: 'Monthly',
        priceRange: '₹15,000 - ₹50,000/month',
        requirements: ['Site access', 'Flight schedule', 'Monitoring frequency'],
        deliverables: ['Aerial progress photos', 'Comparison reports', 'Time-lapse videos', 'Analytics dashboard'],
        executionPartnerRole: 'Survey Technician',
        enabled: true,
      },
    ],
  },
];

// Helper function to get service by ID
export function getServiceById(id: string): ServiceData | undefined {
  return servicesData.find(service => service.id === id);
}

// Helper function to get icon component by name
export function getIconComponent(iconName: string) {
  return iconMap[iconName] || FileText;
}
