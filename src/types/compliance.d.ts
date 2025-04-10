export interface HistoricalDataPoint {
  date: string; // e.g., "3/1/2024" or "08:00"
  value: number;
}

export interface NutrientDetail {
  current: number;
  optimal: number;
  unit: string; // e.g., "mg/kg"
}

export interface SoilQualityData {
  id: string;
  pH_trend: HistoricalDataPoint[];
  nutrients: {
    nitrogen: NutrientDetail;
    phosphorus: NutrientDetail;
    potassium: NutrientDetail;
    calcium: NutrientDetail;
    magnesium: NutrientDetail;
  };
}

export interface CropManagementData {
  id: string;
  fertilizer: {
    usage_trend: HistoricalDataPoint[]; // value = kg/hectare
    efficiency_rating: number; // percentage
  };
  pest_management: {
    incidents_trend: HistoricalDataPoint[]; // value = incidents
    effectiveness: number; // percentage
  };
  irrigation: {
    usage_trend: HistoricalDataPoint[]; // value = Liters/hectare
    efficiency: number; // percentage
  };
}

export interface GradeDistribution {
  extra_class: number; // percentage
  class_i: number; // percentage
  class_ii: number; // percentage
  below_standard: number; // percentage
}

export interface QualityMetrics {
  cleanliness: number; // percentage
  size_consistency: number; // percentage
  color_uniformity: number; // percentage
  shape_conformity: number; // percentage
}

export interface DefectAnalysis {
  distribution: {
    bruising: number; // percentage
    size_variation: number; // percentage
    color_defects: number; // percentage
    shape_issues: number; // percentage
  };
  summary: {
    bruising: number; // percentage
    size_variation: number; // percentage
    color_defects: number; // percentage
    shape_issues: number; // percentage
  };
}

export interface QualityInspectionData {
  id: string;
  batchId: string;
  grade_distribution: GradeDistribution;
  quality_metrics: QualityMetrics;
  defect_analysis: DefectAnalysis;
}

export interface QualityCheckLog {
  time: string; // e.g., "08:00"
  status: "Passed" | "Warning" | "Failed";
  notes: string;
}

export interface StorageConditionsData {
  id: string;
  location: string;
  current_temperature: number; // Celsius
  temperature_range: string; // e.g., "13°C - 15°C"
  temperature_history: HistoricalDataPoint[]; // value = °C
  current_humidity: number; // percentage
  humidity_range: string; // e.g., "80% - 90%"
  humidity_history: HistoricalDataPoint[]; // value = %
  quality_checks: QualityCheckLog[];
}

// Keep original types if they are still used elsewhere or for reference
// export interface SoilQuality {
//   id: string;
//   location: string;
//   pH: number;
//   nutrients: {
//     nitrogen: number;
//     phosphorus: number;
//     potassium: number;
//   };
//   lastTested: string;
// }

// export interface FarmMetrics {
//   id: string;
//   date: string;
//   fertilizer: {
//     type: string;
//     amount: number;
//     unit: string;
//     area: number;
//     areaUnit: string;
//   };
//   pestManagement: {
//     effectiveness: number;
//     pestCount: number;
//     treatment: string;
//   };
//   irrigation: {
//     efficiency: number;
//     waterUsed: number;
//     unit: string;
//     coverage: number;
//   };
//   maturityMetrics: {
//     stage: string;
//     daysToHarvest: number;
//     color: string;
//     size: number;
//   };
// }

// export interface QualityInspection {
//   id: string;
//   date: string;
//   batchId: string;
//   visualInspection: {
//     cleanliness: number;
//     colorConsistency: number;
//     surfaceDefects: number;
//     overallAppearance: number;
//   };
//   measurements: {
//     averageSize: number;
//     sizeUnit: string;
//     weightPerUnit: number;
//     weightUnit: string;
//   };
//   grading: {
//     extraClass: number;
//     classI: number;
//     classII: number;
//     rejected: number;
//   };
// }

// export interface StorageConditions {
//   id: string;
//   timestamp: string; // ISO 8601 format
//   location: string;
//   temperature: number;
//   humidity: number;
//   co2Level: number;
//   alerts: {
//     type: 'warning' | 'critical' | 'none';
//     message?: string;
//   };
// } 