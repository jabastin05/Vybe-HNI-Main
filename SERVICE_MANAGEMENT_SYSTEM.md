# VYBE Service Management System

## Overview
A comprehensive service management system for the VYBE platform with Glass-Data design framework, featuring service cards with detailed attributes, an enhanced catalog interface for HNIs, and improved admin configuration.

## Components Created

### 1. ServiceCard Component (`/src/app/components/ServiceCard.tsx`)
A reusable service card component with:
- **Attributes Display**:
  - ETA (Estimated Time of Arrival)
  - Price Range
  - Requirements
  - Deliverables
  - Execution Partner Role
- **Visual Features**:
  - Glass-morphism design (backdrop-blur, semi-transparent backgrounds)
  - Emerald-500 accent color
  - Featured/Popular badges
  - Multiple service options indicator
  - Hover effects and animations
- **Props**:
  - `id`: Service identifier
  - `name`: Service name
  - `description`: Service description
  - `icon`: Lucide icon component
  - `color`: Gradient color class
  - `badge`: Optional badge text (e.g., "Most Popular")
  - `attributes`: Array of ServiceAttribute objects
  - `onClick`: Click handler
  - `isSelected`: Selection state
  - `featured`: Featured status
  - `categoryName`: Parent category name

### 2. Service Catalog for HNIs (`/src/app/screens/ServiceCatalog.tsx`)
Enhanced service browsing interface featuring:
- **Search Functionality**: Real-time search across service names, descriptions, and categories
- **Filter Tabs**:
  - All Services
  - Featured
  - Property Service
  - Legal Services
  - Lease & Rent
- **Service Cards Grid**: Responsive 2-column layout with ServiceCard components
- **AI Recommendation Card**: Personalized service recommendation CTA
- **Glass-Data Design**: Consistent with platform design system

### 3. Enhanced Admin Service Configuration (`/src/app/screens/ServiceConfigurationEnhanced.tsx`)
Comprehensive admin interface for service management:
- **Service Category Management**:
  - Name, description, icon, color
  - Badge (e.g., "Most Popular")
  - Featured status
  - Enable/disable toggle
- **Service Management** (nested under categories):
  - Name and description
  - **ETA**: Estimated completion time
  - **Price Range**: Service pricing
  - **Requirements**: Array of client requirements
  - **Deliverables**: Array of service deliverables
  - **Execution Partner Role**: Required partner type
  - Enable/disable toggle
- **Features**:
  - Expandable category sections
  - Add, edit, delete services
  - Visual attribute indicators (ETA, Price, Role)
  - Dynamic requirements and deliverables lists
  - Search functionality
  - Success notifications

## Routes

### HNI Client Routes:
- `/services` - Main service management (existing flow with service requests)
- `/services/catalog` - **NEW**: Service catalog browser with search and filters
- `/service/:serviceId` - Service detail page (existing)

### Admin Routes:
- `/admin/services` - **Enhanced**: Service configuration with full attributes

## Data Structure

### ServiceAttribute Interface:
```typescript
interface ServiceAttribute {
  name: string;
  description: string;
  eta: string;
  priceRange: string;
  requirements?: string[];
  deliverables?: string[];
  executionPartnerRole?: string;
  enabled: boolean;
}
```

### Service Category (Admin):
```typescript
interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  badge?: string;
  featured: boolean;
  enabled: boolean;
  subServices: SubService[];
}
```

### Service (nested under category):
```typescript
interface SubService {
  id: number;
  name: string;
  description: string;
  eta: string;
  priceRange: string;
  requirements: string[];
  deliverables: string[];
  enabled: boolean;
  role?: 'legal-partner' | 'survey-technician' | 'architect-planning' | 
         'developer-jv' | 'channel-field' | 'documentation-compliance';
}
```

## Design Guidelines Followed

### Glass-Data Design Framework:
- **Colors**:
  - `sys-bg-canvas`: `#F2F2F2` (main background)
  - `sys-bg-glass`: `#FFFFFF` at 85-95% opacity (card backgrounds)
  - `sys-accent-gold`: `#FFC700` (badges)
  - `sys-accent-green`: Emerald-500 (primary actions)
- **Radius**:
  - 24px: Main cards
  - 12px: Inner modules, buttons
  - 4px: Tags, badges
- **Effects**:
  - Background blur: 20-40px
  - Shadow stacks: Multiple drop shadows for depth
  - Border: Semi-transparent strokes
- **Typography**:
  - Labels: 10px, bold, uppercase, +5% letter spacing
  - Body: 14px, regular
  - Headings: 18-32px with negative letter spacing

## Mock Data

The system includes comprehensive mock data:
- **Property Service** category:
  - Property Tax Filing
  - Asset Valuation
  - Property Maintenance
- **Legal Services** category (Most Popular):
  - Title Verification
  - Legal Documentation
- **Lease & Rent** category:
  - Tenant Screening
  - Rental Management

## Usage

### For HNI Clients:
1. Navigate to **Services** from the side navigation
2. Use the existing service request flow OR click "Browse Catalog" to explore `/services/catalog`
3. Search and filter services by category
4. Click on service cards to view details and initiate requests

### For Admins:
1. Sign in to admin portal
2. Navigate to **Service Configuration**
3. Expand service categories to view/edit services
4. Click "Add Service" to create new services with full attributes
5. Edit existing services to update ETA, pricing, requirements, deliverables, etc.
6. Toggle service availability with enable/disable switch

## Future Enhancements
- Integration with backend API for real-time data
- Service analytics and usage tracking
- Dynamic pricing based on property type/location
- Partner availability integration
- Client service history and recommendations
- Multi-language support
- Advanced filtering (by price range, ETA, partner type)
