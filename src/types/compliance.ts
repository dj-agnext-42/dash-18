export interface SoilQuality {
  id: string;
  location: string;
  pH: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  lastTested: string;
}

export interface FarmMetrics {
  id: string;
  date: string;
  fertilizer: {
    type: string;
    amount: number;
    unit: string;
    area: number;
    areaUnit: string;
  };
  pestManagement: {
    effectiveness: number;
    pestCount: number;
    treatment: string;
  };
  irrigation: {
    efficiency: number;
    waterUsed: number;
    unit: string;
    coverage: number;
  };
  maturityMetrics: {
    stage: 'early' | 'developing' | 'mature' | 'ready';
    daysToHarvest: number;
    color: string;
    size: number;
  };
}

export interface QualityInspection {
  id: string;
  date: string;
  batchId: string;
  visualInspection: {
    cleanliness: number;
    colorConsistency: number;
    surfaceDefects: number;
    overallAppearance: number;
  };
  measurements: {
    averageSize: number;
    sizeUnit: string;
    weightPerUnit: number;
    weightUnit: string;
  };
  grading: {
    extraClass: number;
    classI: number;
    classII: number;
    rejected: number;
  };
}

export interface StorageConditions {
  id: string;
  timestamp: string;
  location: string;
  temperature: number;
  humidity: number;
  co2Level: number;
  alerts: {
    type: 'none' | 'warning' | 'critical';
    message?: string;
  };
} 