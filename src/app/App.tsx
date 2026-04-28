import { RouterProvider } from 'react-router';
import { router } from './routes';
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { PropertiesProvider } from './contexts/PropertiesContext';
import { CasesProvider } from './contexts/CasesContext';

// VYBE Platform - HNI Client Application
export default function App() {
 return (
 <ThemeProvider>
 <PropertiesProvider>
 <CasesProvider>
 <RouterProvider router={router} />
 </CasesProvider>
 </PropertiesProvider>
 </ThemeProvider>
 );
}
