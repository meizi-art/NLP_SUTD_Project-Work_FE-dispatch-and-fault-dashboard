export type SeverityLevel = 'P1-CRITICAL' | 'P2-HIGH' | 'P3-STANDARD' | 'P4-LOW';

export type CaseStatus = 
  | 'UNASSIGNED' 
  | 'AI_RECOMMENDED' 
  | 'DISPATCHED' 
  | 'EN_ROUTE' 
  | 'ON_SITE' 
  | 'PENDING_PARTS' 
  | 'RESOLVED';

export type FacilityType = 'Data Center' | 'Biotech Cleanroom' | 'Hospital Facility' | 'Airport Terminal' | 'Financial Vault' | 'Industrial Plant';

export interface SiteSecurityProtocol {
  clearanceLevel: 'Level 1 - Public' | 'Level 2 - Escort Required' | 'Level 3 - Biometric & Secret' | 'Level 4 - High Voltage / Hazmat';
  accessCode: string;
  gateContact: string;
  gatePhone: string;
  ppeRequired: string[];
  lotoRequired: boolean;
  notes: string;
}

export interface TelemetryReading {
  metric: string;
  value: string;
  normalRange: string;
  status: 'nominal' | 'warning' | 'critical';
  unit: string;
}

export interface TechnicianMatchScore {
  technicianId: string;
  overallScore: number; // 0-100
  proximityMinutes: number;
  distanceMiles: number;
  skillMatchScore: number;
  hasRequiredParts: boolean;
  workloadScore: number;
  matchReasons: string[];
  missingCertifications?: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  type: 'system' | 'manual' | 'telemetry' | 'status_change';
  details?: string;
}

export interface FaultCase {
  id: string; // e.g. #FLT-9842
  title: string;
  siteName: string;
  siteAddress: string;
  facilityType: FacilityType;
  coordinates: { x: number; y: number; lat: number; lng: number }; // x/y percentage on map
  assetName: string;
  assetTag: string;
  errorCode: string;
  description: string;
  severity: SeverityLevel;
  status: CaseStatus;
  isVipClient: boolean;
  vipClientName?: string;
  reportedAt: string;
  slaTargetMinutes: number;
  slaMinutesRemaining: number;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  telemetryReadings: TelemetryReading[];
  securityProtocol: SiteSecurityProtocol;
  recommendedTechnicians: TechnicianMatchScore[];
  requiredParts: { partNumber: string; name: string; requiredQty: number }[];
  auditLogs: AuditLogEntry[];
  wiringDiagramUrl?: string;
}

export interface Technician {
  id: string; // e.g. TECH-402
  name: string;
  avatarUrl: string;
  phone: string;
  currentStatus: 'ONLINE_AVAILABLE' | 'EN_ROUTE' | 'ON_SITE' | 'OFF_SHIFT' | 'REST_BREAK';
  currentLocationName: string;
  coordinates: { x: number; y: number; lat: number; lng: number };
  activeCaseId?: string;
  certifications: string[];
  specialties: string[];
  shiftHours: string;
  hoursWorkedToday: number;
  rating: number;
  jobsCompletedToday: number;
  vanInventory: { partNumber: string; name: string; qty: number; category: string }[];
}

export interface SiteKnowledgeItem {
  id: string;
  siteName: string;
  facilityType: FacilityType;
  primaryEquipment: string[];
  accessGuide: string;
  powerSchematicCode: string;
  hvacZoneGuide: string;
  emergencyContacts: { role: string; name: string; phone: string }[];
  pastIncidentsCount: number;
  lastUpdated: string;
}
