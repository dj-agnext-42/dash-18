import { SoilQualityData, CropManagementData, QualityInspectionData, StorageConditionsData } from "@/types/compliance.d";
// Remove date-fns import if not used, or keep if needed later
// import { subDays, format } from "date-fns";

// --- Soil Quality Data ---
export const sampleSoilQualityData: SoilQualityData = {
  id: "SQ001",
  pH_trend: [
    { date: "3/1/2024", value: 6.8 },
    { date: "3/8/2024", value: 6.9 },
    { date: "3/15/2024", value: 7.2 },
    { date: "3/22/2024", value: 6.7 },
    { date: "3/29/2024", value: 6.8 },
  ],
  nutrients: {
    nitrogen: { current: 85, optimal: 150, unit: "mg/kg" },      // From image (looks like 106.3% is typo, 85/150=56.7%)
    phosphorus: { current: 45, optimal: 40, unit: "mg/kg" },    // 112.5%
    potassium: { current: 180, optimal: 200, unit: "mg/kg" },    // 90.0%
    calcium: { current: 1200, optimal: 1000, unit: "mg/kg" },   // 120.0%
    magnesium: { current: 150, optimal: 150, unit: "mg/kg" },   // 100.0%
  },
};

// --- Crop Management Data (Placeholder based on images) ---
export const sampleCropManagementData: CropManagementData = {
  id: "CM001",
  fertilizer: {
    usage_trend: [
      { date: "3/1/2024", value: 24 },
      { date: "3/8/2024", value: 26 },
      { date: "3/15/2024", value: 25 },
      { date: "3/22/2024", value: 28 },
      { date: "3/29/2024", value: 26 },
    ],
    efficiency_rating: 85,
  },
  pest_management: {
    incidents_trend: [
      { date: "3/1/2024", value: 5 },
      { date: "3/8/2024", value: 3 },
      { date: "3/15/2024", value: 2 },
      { date: "3/22/2024", value: 4 },
      { date: "3/29/2024", value: 1 },
    ],
    effectiveness: 92,
  },
  irrigation: {
    usage_trend: [
      { date: "3/1/2024", value: 1200 },
      { date: "3/8/2024", value: 1050 },
      { date: "3/15/2024", value: 1100 },
      { date: "3/22/2024", value: 950 },
      { date: "3/29/2024", value: 1000 },
    ],
    efficiency: 88,
  },
};

// --- Quality Inspection Data (Placeholder based on images) ---
export const sampleQualityInspectionData: QualityInspectionData = {
  id: "QI001",
  batchId: "BATCH123", // Example Batch ID
  grade_distribution: {
    extra_class: 30,
    class_i: 45,
    class_ii: 20,
    below_standard: 5,
  },
  quality_metrics: {
    cleanliness: 95,
    size_consistency: 88,
    color_uniformity: 92,
    shape_conformity: 85,
  },
  defect_analysis: {
    // Assuming distribution is absolute counts based on image
    distribution: {
      bruising: 8, // Matches Size Var? Image seems to have 8 for Size Variation
      size_variation: 3, // Matches Shape Issues? Image seems to have 3 for Shape Issues
      color_defects: 5, // Matches Color Defects
      shape_issues: 3, // Matches Bruising?
    },
    // Summary percentages match image
    summary: {
      bruising: 42.9,
      size_variation: 28.6,
      color_defects: 17.9,
      shape_issues: 10.7,
    },
  },
};

// --- Storage Conditions Data (Placeholder based on images) ---
export const sampleStorageConditionsData: StorageConditionsData = {
  id: "SC001",
  location: "Cold Storage Unit A", // Example Location
  current_temperature: 14,
  temperature_range: "13°C - 15°C",
  temperature_history: [
    { date: "08:00", value: 13.5 },
    { date: "09:00", value: 13.8 },
    { date: "10:00", value: 14.1 },
    { date: "11:00", value: 14.3 },
    { date: "12:00", value: 14.2 },
    { date: "13:00", value: 14.0 },
    { date: "14:00", value: 13.9 },
  ],
  current_humidity: 85,
  humidity_range: "80% - 90%",
  humidity_history: [
    { date: "08:00", value: 82 },
    { date: "09:00", value: 84 },
    { date: "10:00", value: 85 },
    { date: "11:00", value: 86 },
    { date: "12:00", value: 85 },
    { date: "13:00", value: 84 },
    { date: "14:00", value: 83 },
  ],
  quality_checks: [
    { time: "08:00", status: "Passed", notes: "All parameters within acceptable range" },
    { time: "10:00", status: "Warning", notes: "Humidity slightly above optimal" },
    { time: "12:00", status: "Passed", notes: "Conditions normalized" },
    { time: "14:00", status: "Passed", notes: "Regular check - all normal" },
  ],
};


// --- Comment out old data definitions ---
/*
import { SoilQuality, FarmMetrics, QualityInspection, StorageConditions } from "@/types/compliance";
import { subDays, format } from "date-fns";

export const sampleSoilQuality: SoilQuality[] = [
  {
    id: "SOIL001",
    location: "Field A",
    pH: 6.8,
    nutrients: {
      nitrogen: 45,
      phosphorus: 30,
      potassium: 25,
    },
    lastTested: "2024-03-01",
  },
  {
    id: "SOIL002",
    location: "Field B",
    pH: 7.2,
    nutrients: {
      nitrogen: 35,
      phosphorus: 28,
      potassium: 22,
    },
    lastTested: "2024-03-01",
  },
];

export const sampleFarmMetrics: FarmMetrics[] = [
  {
    id: "FARM001",
    date: "2024-03-01",
    fertilizer: {
      type: "NPK 14-14-14",
      amount: 250,
      unit: "kg",
      area: 1,
      areaUnit: "hectare",
    },
    pestManagement: {
      effectiveness: 85,
      pestCount: 12,
      treatment: "Organic pesticide",
    },
    irrigation: {
      efficiency: 92,
      waterUsed: 1000,
      unit: "liters",
      coverage: 95,
    },
    maturityMetrics: {
      stage: "developing",
      daysToHarvest: 45,
      color: "light green",
      size: 3.5,
    },
  },
  {
    id: "FARM002",
    date: "2024-03-01",
    fertilizer: {
      type: "Organic Compost",
      amount: 300,
      unit: "kg",
      area: 1,
      areaUnit: "hectare",
    },
    pestManagement: {
      effectiveness: 78,
      pestCount: 18,
      treatment: "Biological control",
    },
    irrigation: {
      efficiency: 88,
      waterUsed: 1200,
      unit: "liters",
      coverage: 90,
    },
    maturityMetrics: {
      stage: "mature",
      daysToHarvest: 15,
      color: "dark green",
      size: 4.2,
    },
  },
];

export const sampleQualityInspections: QualityInspection[] = [
  {
    id: "QC001",
    date: "2024-03-01",
    batchId: "BATCH001",
    visualInspection: {
      cleanliness: 95,
      colorConsistency: 92,
      surfaceDefects: 3,
      overallAppearance: 94,
    },
    measurements: {
      averageSize: 7.5,
      sizeUnit: "cm",
      weightPerUnit: 250,
      weightUnit: "g",
    },
    grading: {
      extraClass: 70,
      classI: 20,
      classII: 8,
      rejected: 2,
    },
  },
  {
    id: "QC002",
    date: "2024-03-01",
    batchId: "BATCH002",
    visualInspection: {
      cleanliness: 88,
      colorConsistency: 85,
      surfaceDefects: 7,
      overallAppearance: 86,
    },
    measurements: {
      averageSize: 7.2,
      sizeUnit: "cm",
      weightPerUnit: 245,
      weightUnit: "g",
    },
    grading: {
      extraClass: 60,
      classI: 25,
      classII: 12,
      rejected: 3,
    },
  },
];

// Generate 24 hours of storage conditions
export const sampleStorageConditions: StorageConditions[] = Array.from({ length: 24 }, (_, i) => ({
  id: `STORAGE${String(i + 1).padStart(3, '0')}`,
  timestamp: format(subDays(new Date(), 1 - i/24), "yyyy-MM-dd HH:mm:ss"),
  location: "Cold Storage A",
  temperature: 13 + Math.random() * 2, // 13-15°C
  humidity: 85 + Math.random() * 10, // 85-95%
  co2Level: 350 + Math.random() * 100, // 350-450 ppm
  alerts: {
    type: Math.random() > 0.9 ? 'warning' : 'none',
    message: Math.random() > 0.9 ? 'Temperature approaching upper limit' : undefined,
  },
}));
*/ 