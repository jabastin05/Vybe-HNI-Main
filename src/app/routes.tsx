import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
import { Landing } from "./screens/Landing";
import { EmptyDashboard } from "./screens/EmptyDashboard";
import { PropertyUpload } from "./screens/PropertyUpload";
import { PropertyIntelligence } from "./screens/PropertyIntelligence";
import { HABUReport } from "./screens/HABUReport";
import { HabuReportView } from "./screens/HabuReportView";
import { StrategyDetail } from "./screens/StrategyDetail";
import { PartnerRouting } from "./screens/PartnerRouting";
import { PartnerAssignment } from "./screens/PartnerAssignment";
import { ExecutionDashboard } from "./screens/ExecutionDashboard";
import { ExecutionTracker } from "./screens/ExecutionTracker";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { Settings } from "./screens/Settings";
import { Onboarding } from "./screens/Onboarding";
import { Waitlist } from "./screens/Waitlist";
import { ServiceDetail } from "./screens/ServiceDetail";
import { ServiceCatalog } from "./screens/ServiceCatalog";
import { MyProperties } from "./screens/MyProperties";
import { PropertyDetail } from "./screens/PropertyDetail";
import { DocumentVault } from "./screens/DocumentVault";
import { DocumentUpload } from "./screens/DocumentUpload";
import { CaseManagement } from "./screens/CaseManagement";
import { CaseDetail } from "./screens/CaseDetail";
import { CaseChat } from "./screens/CaseChat";
import { TermsAndConditions } from "./screens/TermsAndConditions";
import { PrivacyPolicy } from "./screens/PrivacyPolicy";
import { HelpSupport } from "./screens/HelpSupport";
import { NotFound } from "./screens/NotFound";

// VYBE Platform Router Configuration - HNI Client Routes
export const router = createBrowserRouter([
 {
 path: "/",
 Component: Root,
 children: [
 {
   index: true,
   element: <Navigate to="/signup" replace />,
  },
 {
 path: "onboarding",
 Component: Onboarding,
 },
 {
 path: "signin",
 Component: SignIn,
 },
 {
 path: "signup",
 Component: SignUp,
 },
 {
 path: "waitlist",
 Component: Waitlist,
 },
 {
 path: "empty-dashboard",
 Component: EmptyDashboard,
 },
 {
 path: "properties",
 element: <Navigate to="/my-properties" replace />,
 },
 {
 path: "settings",
 Component: Settings,
 },
 {
 path: "help-support",
 Component: HelpSupport,
 },
 {
 path: "upload",
 Component: PropertyUpload,
 },
 {
 path: "property/:id",
 Component: PropertyIntelligence,
 },
 {
 path: "property/:id/habu",
 Component: HABUReport,
 },
 {
 path: "report/habu",
 Component: HabuReportView,
 },
 {
 path: "property/:id/strategy/:strategyId/assignment",
 Component: PartnerAssignment,
 },
 {
 path: "property/:id/strategy/:strategyId",
 Component: StrategyDetail,
 },
 {
 path: "property/:id/partner",
 Component: PartnerRouting,
 },
 {
 path: "property/:id/execution",
 Component: ExecutionDashboard,
 },
 {
 path: "property/:id/execution-tracker",
 Component: ExecutionTracker,
 },
 {
 path: "services",
 Component: ServiceCatalog,
 },
 {
 path: "service/:serviceId",
 Component: ServiceDetail,
 },
 {
 path: "my-properties",
 Component: MyProperties,
 },
 {
 path: "property/:id/detail",
 Component: PropertyDetail,
 },
 {
 path: "documents",
 Component: DocumentVault,
 },
 {
 path: "documents/upload",
 Component: DocumentUpload,
 },
 {
 path: "property/:id/documents",
 Component: DocumentVault,
 },
 {
 path: "property/:id/documents/upload",
 Component: DocumentUpload,
 },
 {
 path: "cases",
 Component: CaseManagement,
 },
 {
 path: "case/:id",
 Component: CaseDetail,
 },
 {
 path: "case/:id/chat",
 Component: CaseChat,
 },
 {
 path: "terms-and-conditions",
 Component: TermsAndConditions,
 },
 {
 path: "privacy-policy",
 Component: PrivacyPolicy,
 },
 {
 path: "*",
 Component: NotFound,
 },
 ]
 }
]);