import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Property {
 id: string;
 displayId?: string;
 name: string;
 type: string;
 buildingType?: 'residential' | 'commercial' | '';
 plotSize?: string;
 builtUpArea?: string;
 yearOfConstruction?: string;
 numberOfFloors?: string;
 surveyNumber?: string;
 currentUsage?: string;
 rentalIncome?: string;
 country?: string;
 state?: string;
 city?: string;
 address: string;
 latitude?: string;
 longitude?: string;
 district?: string;
 zoning?: string;
 dateAdded: string;
 documents?: {
 id: string;
 name: string;
 size: string;
 status: 'uploading' | 'verified' | 'processing' | 'error';
 type: string;
 documentType?: string;
 }[];
 extractedData?: {
 surveyNumber?: string;
 landArea?: string;
 landAreaUnit?: string;
 ownershipType?: string;
 zoningClassification?: string;
 roadAccess?: string;
 encumbranceStatus?: string;
 utilitiesAvailability?: string[];
 };
}

const createMockProperty = (
 index: number,
 name: string,
 type: string,
 buildingType: Property['buildingType'],
 city: string,
 state: string,
 plotSize: string,
 builtUpArea = '',
 yearOfConstruction = '2018',
 numberOfFloors = 'G+8'
): Property => ({
 id: `prop-demo-${String(index).padStart(3, '0')}`,
 displayId: `PROP-${String(index).padStart(6, '0')}`,
 name,
 type,
 buildingType,
 plotSize,
 builtUpArea,
 yearOfConstruction,
 numberOfFloors,
 surveyNumber: `${40 + index}/${index}A`,
 currentUsage: index % 3 === 0 ? 'Vacant' : 'Rented Out',
 rentalIncome: builtUpArea ? `${45000 + index * 3000}` : '',
 country: 'India',
 state,
 city,
 district: city,
 address: `${name}, ${city}, ${state}`,
 latitude: `${12.9 + index / 1000}`,
 longitude: `${77.5 + index / 1000}`,
 zoning: buildingType === 'commercial' ? 'Commercial' : 'Residential',
 dateAdded: new Date(2026, (index - 1) % 12, 12).toISOString(),
 documents: [
 {
 id: `doc-demo-${index}-1`,
 name: 'sale-deed.pdf',
 size: '2.4 MB',
 status: 'verified',
 type: 'pdf',
 documentType: 'Sale Deed',
 },
 {
 id: `doc-demo-${index}-2`,
 name: 'khata-certificate.pdf',
 size: '1.1 MB',
 status: 'verified',
 type: 'pdf',
 documentType: 'Khata Certificate',
 },
 {
 id: `doc-demo-${index}-3`,
 name: 'property-tax-receipt.pdf',
 size: '480 KB',
 status: index % 2 === 0 ? 'verified' : 'processing',
 type: 'pdf',
 documentType: 'Property Tax Receipt',
 },
 ],
 extractedData: {
 surveyNumber: `${40 + index}/${index}A`,
 landArea: plotSize.replace(/[^\d]/g, '') || plotSize,
 landAreaUnit: 'sq ft',
 ownershipType: 'Freehold',
 zoningClassification: buildingType === 'commercial' ? 'Commercial' : 'Residential',
 roadAccess: '30ft arterial road',
 encumbranceStatus: index % 4 === 0 ? 'Review recommended' : 'Clear',
 utilitiesAvailability: ['Water', 'Electricity', 'Sewage'],
 },
});

const MOCK_PROPERTIES: Property[] = [
 createMockProperty(1, 'Sterling Heights, Sector 47', 'Apartment', 'residential', 'Bangalore', 'Karnataka', '2400 sq ft', '1850 sq ft', '2019', 'G+18'),
 createMockProperty(2, 'Golden Meadows Estate', 'Villa', 'residential', 'Hyderabad', 'Telangana', '5200 sq ft', '4100 sq ft', '2021', 'G+2'),
 createMockProperty(3, 'Riverside Enclave Plot', 'Plot', 'residential', 'Pune', 'Maharashtra', '8000 sq ft', '', '2020', ''),
 createMockProperty(4, 'Indiranagar Builder Floor', 'Builder Floor', 'residential', 'Bangalore', 'Karnataka', '1800 sq ft', '1600 sq ft', '2017', 'G+4'),
 createMockProperty(5, 'Skyline Penthouse', 'Penthouse', 'residential', 'Mumbai', 'Maharashtra', '3600 sq ft', '3200 sq ft', '2022', 'G+32'),
 createMockProperty(6, 'Palm Grove House', 'Independent House', 'residential', 'Chennai', 'Tamil Nadu', '4500 sq ft', '2800 sq ft', '2016', 'G+1'),
 createMockProperty(7, 'Orion Business Tower', 'Office Space', 'commercial', 'Gurgaon', 'Haryana', '12000 sq ft', '9800 sq ft', '2020', 'G+12'),
 createMockProperty(8, 'High Street Retail Unit', 'Shop', 'commercial', 'Delhi', 'Delhi', '900 sq ft', '850 sq ft', '2015', 'G'),
 createMockProperty(9, 'Outer Ring Road Land', 'Land', 'commercial', 'Bangalore', 'Karnataka', '15000 sq ft', '', '2021', ''),
 createMockProperty(10, 'Cyber Park SEZ Office', 'Office in IT/SEZ', 'commercial', 'Hyderabad', 'Telangana', '18000 sq ft', '14500 sq ft', '2023', 'G+16'),
 createMockProperty(11, 'Phoenix Showroom', 'Showroom', 'commercial', 'Ahmedabad', 'Gujarat', '5000 sq ft', '4200 sq ft', '2018', 'G+1'),
 createMockProperty(12, 'North Logistics Warehouse', 'Warehouse', 'commercial', 'Navi Mumbai', 'Maharashtra', '30000 sq ft', '26000 sq ft', '2019', ''),
 createMockProperty(13, 'Central Co-Working Hub', 'Co-Working Space', 'commercial', 'Pune', 'Maharashtra', '11000 sq ft', '9300 sq ft', '2022', 'G+8'),
];

const MOCK_PROPERTY_IDS = new Set(MOCK_PROPERTIES.map(property => property.id));

interface PropertiesContextType {
 properties: Property[];
 addProperty: (property: Property) => void;
 removeProperty: (id: string) => void;
 getProperty: (id: string) => Property | undefined;
 updateProperty: (id: string, updates: Partial<Property>) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: ReactNode }) {
 const [properties, setProperties] = useState<Property[]>(() => {
 // Load from localStorage on initial mount
 const saved = localStorage.getItem('vybe-properties');
 const savedProperties = saved ? JSON.parse(saved) as Property[] : [];
 const currentSavedProperties = savedProperties.filter(property =>
 !property.id.startsWith('prop-demo-') || MOCK_PROPERTY_IDS.has(property.id)
 );
 const savedIds = new Set(currentSavedProperties.map(property => property.id));
 const missingMockProperties = MOCK_PROPERTIES.filter(property => !savedIds.has(property.id));
 return [...currentSavedProperties, ...missingMockProperties];
 });

 // Save to localStorage whenever properties change
 useEffect(() => {
 localStorage.setItem('vybe-properties', JSON.stringify(properties));
 }, [properties]);

 const addProperty = (property: Property) => {
 setProperties(prev => [...prev, property]);
 };

 const removeProperty = (id: string) => {
 setProperties(prev => prev.filter(p => p.id !== id));
 };

 const getProperty = (id: string) => {
 return properties.find(p => p.id === id);
 };

 const updateProperty = (id: string, updates: Partial<Property>) => {
 setProperties(prev => 
 prev.map(p => p.id === id ? { ...p, ...updates } : p)
 );
 };

 return (
 <PropertiesContext.Provider value={{
 properties,
 addProperty,
 removeProperty,
 getProperty,
 updateProperty,
 }}>
 {children}
 </PropertiesContext.Provider>
 );
}

export function useProperties() {
 const context = useContext(PropertiesContext);
 if (context === undefined) {
 throw new Error('useProperties must be used within a PropertiesProvider');
 }
 return context;
}
