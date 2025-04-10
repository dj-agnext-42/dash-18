export interface SoilQualityData {
  farmId: string;
  date: string;
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

export interface FarmInputData {
  farmId: string;
  date: string;
  fertilizer: {
    type: string;
    quantityKg: number;
    coverageAcres: number;
    effectivenessScore: number;
  };
  pestManagement: {
    method: string;
    effectivenessScore: number;
    targetPest: string;
    coverage: number;
  };
  irrigation: {
    method: string;
    volumeLiters: number;
    efficiency: number;
    uniformity: number;
  };
}

export interface ProductQualityData {
  batchId: string;
  date: string;
  maturityScore: number;
  handlingScore: number;
  cleanliness: number;
  physicalAttributes: {
    size: {
      score: number;
      notes: string;
    };
    shape: {
      score: number;
      notes: string;
    };
    color: {
      score: number;
      notes: string;
    };
    defects: {
      score: number;
      type: string[];
    };
  };
  grade: "Extra" | "Class I" | "Class II" | "Rejected";
}

export interface StorageConditionData {
  facilityId: string;
  date: string;
  temperature: number;
  humidity: number;
  airflow: number;
  qualityImpact: {
    score: number;
    issues: string[];
  };
}

export interface RMPerformanceData {
  soilQuality: SoilQualityData[];
  farmInputs: FarmInputData[];
  productQuality: ProductQualityData[];
  storageConditions: StorageConditionData[];
}

export const sampleRMPerformanceData: RMPerformanceData = {
  soilQuality: [
    {
      farmId: "F001",
      date: "2024-03-01",
      pH: 6.8,
      nitrogen: 85,
      phosphorus: 45,
      potassium: 180,
      organicMatter: 3.2
    },
    {
      farmId: "F002",
      date: "2024-03-01",
      pH: 6.5,
      nitrogen: 75,
      phosphorus: 40,
      potassium: 160,
      organicMatter: 2.8
    },
    {
      farmId: "F003",
      date: "2024-03-01",
      pH: 7.1,
      nitrogen: 90,
      phosphorus: 50,
      potassium: 200,
      organicMatter: 3.5
    }
  ],
  farmInputs: [
    {
      farmId: "F001",
      date: "2024-03-01",
      fertilizer: {
        type: "NPK 14-14-14",
        quantityKg: 500,
        coverageAcres: 100,
        effectivenessScore: 8.5
      },
      pestManagement: {
        method: "Integrated Pest Management",
        effectivenessScore: 9.0,
        targetPest: "Banana Weevil",
        coverage: 95
      },
      irrigation: {
        method: "Drip Irrigation",
        volumeLiters: 50000,
        efficiency: 0.92,
        uniformity: 0.88
      }
    },
    {
      farmId: "F002",
      date: "2024-03-01",
      fertilizer: {
        type: "Organic Compost",
        quantityKg: 800,
        coverageAcres: 80,
        effectivenessScore: 7.8
      },
      pestManagement: {
        method: "Biological Control",
        effectivenessScore: 8.5,
        targetPest: "Nematodes",
        coverage: 90
      },
      irrigation: {
        method: "Sprinkler",
        volumeLiters: 45000,
        efficiency: 0.85,
        uniformity: 0.82
      }
    },
    {
      farmId: "F003",
      date: "2024-03-01",
      fertilizer: {
        type: "Balanced NPK",
        quantityKg: 600,
        coverageAcres: 90,
        effectivenessScore: 9.2
      },
      pestManagement: {
        method: "Chemical Control",
        effectivenessScore: 8.8,
        targetPest: "Aphids",
        coverage: 98
      },
      irrigation: {
        method: "Drip Irrigation",
        volumeLiters: 48000,
        efficiency: 0.94,
        uniformity: 0.90
      }
    },
    {
      farmId: "F004",
      date: "2024-03-01",
      fertilizer: {
        type: "Low-grade NPK",
        quantityKg: 450,
        coverageAcres: 85,
        effectivenessScore: 6.5
      },
      pestManagement: {
        method: "Manual Control",
        effectivenessScore: 7.0,
        targetPest: "Various",
        coverage: 80
      },
      irrigation: {
        method: "Flood Irrigation",
        volumeLiters: 60000,
        efficiency: 0.70,
        uniformity: 0.65
      }
    },
    {
      farmId: "F005",
      date: "2024-03-01",
      fertilizer: {
        type: "Premium Blend",
        quantityKg: 550,
        coverageAcres: 95,
        effectivenessScore: 9.5
      },
      pestManagement: {
        method: "Integrated Pest Management",
        effectivenessScore: 9.2,
        targetPest: "Multiple",
        coverage: 97
      },
      irrigation: {
        method: "Precision Drip",
        volumeLiters: 52000,
        efficiency: 0.95,
        uniformity: 0.93
      }
    }
  ],
  productQuality: [
    {
      batchId: "F001-B001",
      date: "2024-03-15",
      maturityScore: 8.5,
      handlingScore: 9.0,
      cleanliness: 9.5,
      physicalAttributes: {
        size: { score: 9.0, notes: "Consistent size distribution" },
        shape: { score: 8.5, notes: "Minor shape variations" },
        color: { score: 9.5, notes: "Excellent color uniformity" },
        defects: { score: 9.0, type: ["Minor scratches"] }
      },
      grade: "Extra"
    },
    {
      batchId: "F002-B001",
      date: "2024-03-15",
      maturityScore: 7.8,
      handlingScore: 8.5,
      cleanliness: 8.8,
      physicalAttributes: {
        size: { score: 8.0, notes: "Slight size variations" },
        shape: { score: 7.5, notes: "Some irregular shapes" },
        color: { score: 8.0, notes: "Good color consistency" },
        defects: { score: 8.5, type: ["Minor blemishes"] }
      },
      grade: "Class I"
    },
    {
      batchId: "F003-B001",
      date: "2024-03-15",
      maturityScore: 9.2,
      handlingScore: 9.0,
      cleanliness: 9.3,
      physicalAttributes: {
        size: { score: 9.5, notes: "Excellent size uniformity" },
        shape: { score: 9.0, notes: "Consistent shape" },
        color: { score: 9.4, notes: "Premium color quality" },
        defects: { score: 9.2, type: ["Minimal marks"] }
      },
      grade: "Extra"
    },
    {
      batchId: "F004-B001",
      date: "2024-03-15",
      maturityScore: 6.8,
      handlingScore: 7.2,
      cleanliness: 7.5,
      physicalAttributes: {
        size: { score: 7.0, notes: "Inconsistent sizes" },
        shape: { score: 6.5, notes: "Variable shapes" },
        color: { score: 7.0, notes: "Acceptable color" },
        defects: { score: 6.8, type: ["Surface marks", "Minor bruising"] }
      },
      grade: "Class II"
    },
    {
      batchId: "F005-B001",
      date: "2024-03-15",
      maturityScore: 9.5,
      handlingScore: 9.4,
      cleanliness: 9.6,
      physicalAttributes: {
        size: { score: 9.8, notes: "Perfect size uniformity" },
        shape: { score: 9.5, notes: "Excellent shape consistency" },
        color: { score: 9.7, notes: "Superior color quality" },
        defects: { score: 9.6, type: ["Negligible marks"] }
      },
      grade: "Extra"
    }
  ],
  storageConditions: [
    {
      facilityId: "CS001",
      date: "2024-03-01",
      temperature: 13.5,
      humidity: 85,
      airflow: 0.92,
      qualityImpact: {
        score: 9.2,
        issues: []
      }
    },
    {
      facilityId: "CS002",
      date: "2024-03-01",
      temperature: 14.2,
      humidity: 82,
      airflow: 0.88,
      qualityImpact: {
        score: 8.5,
        issues: ["Slight temperature fluctuation"]
      }
    }
  ]
}; 