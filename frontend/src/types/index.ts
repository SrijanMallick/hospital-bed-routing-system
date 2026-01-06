export interface Hospital {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  beds: {
    icu: BedInfo;
    oxygen: BedInfo;
    general: BedInfo;
  };
  lastUpdated: string;
}

export interface BedInfo {
  available: number;
  total: number;
}

export interface TriageResponses {
  isConscious: boolean | null;
  hasSevereBleeding: boolean | null;
  breathingDifficulty: 'none' | 'mild' | 'severe' | null;
  hasChestPain: boolean | null;
  hasHighFever: boolean | null;
  hasSevereTrauma: boolean | null;
  ageGroup: 'infant' | 'child' | 'adult' | 'elderly' | null;
}

export interface TriageResult {
  severity: 'CRITICAL' | 'URGENT' | 'STABLE';
  score: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  conflictingSignals: string[];
  requiresHumanReview: boolean;
}

export interface HospitalRecommendation extends Hospital {
  distance: number;
  travelTime: number;
  loadScore: number;
  availableBeds: number;
  requiredWardType: string;
  rankingScore: number;
}

export interface RoutingResult {
  hasCapacity: boolean;
  recommended: HospitalRecommendation | null;
  fallbacks: HospitalRecommendation[];
  totalHospitalsChecked: number;
  hospitalsWithCapacity: number;
  alternativeOptions?: any[];
}

export interface TriageApiResponse {
  success: boolean;
  triage: TriageResult;
  requiredWard: string;
  routing: RoutingResult;
  timestamp: string;
}

export interface PatientLocation {
  lat: number;
  lng: number;
}

export interface DashboardStats {
  totalHospitals: number;
  totalBeds: {
    icu: BedInfo;
    oxygen: BedInfo;
    general: BedInfo;
  };
  hospitalsByLoad: HospitalLoadInfo[];
  criticalCapacityHospitals: CriticalHospitalInfo[];
}

export interface HospitalLoadInfo {
  id: string;
  name: string;
  icuOccupancy: number;
  oxygenOccupancy: number;
  generalOccupancy: number;
  overallOccupancy: number;
}

export interface CriticalHospitalInfo {
  id: string;
  name: string;
  icuAvailable: number;
  oxygenAvailable: number;
  generalAvailable: number;
}

