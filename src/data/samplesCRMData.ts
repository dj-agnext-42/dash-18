import { MarketSegment } from "@/types/samples";

export interface QualityAssessment {
  batchId: string;
  date: string;
  overallScore: number; // Out of 10
  customer: string;
  marketSegment: MarketSegment;
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
    notes: string;
  };
}

export interface GradeDistribution {
  batchId: string;
  extraClass: number;
  classOne: number;
  classTwo: number;
  rejected: number;
}

export interface LabelingAccuracy {
  batchId: string;
  date: string;
  totalInspected: number;
  correctLabels: number;
  incorrectGrade: number;
  incorrectWeight: number;
  missingLabels: number;
}

export interface SamplesCRMData {
  qualityAssessments: QualityAssessment[];
  gradeDistributions: GradeDistribution[];
  labelingAccuracy: LabelingAccuracy[];
}

export const sampleCRMData: SamplesCRMData = {
  qualityAssessments: [
    {
      batchId: "B001",
      date: "2024-03-01",
      overallScore: 8.5,
      customer: "FreshMart",
      marketSegment: "EU",
      size: { score: 9, notes: "Consistent sizing within specifications" },
      shape: { score: 8, notes: "Minor variations in shape" },
      color: { score: 9, notes: "Excellent color uniformity" },
      defects: { score: 8, notes: "Minimal surface blemishes" }
    },
    {
      batchId: "B002",
      date: "2024-03-02",
      overallScore: 7.8,
      customer: "USAFresh",
      marketSegment: "US",
      size: { score: 8, notes: "Slightly larger than target" },
      shape: { score: 7, notes: "Some irregular shapes noted" },
      color: { score: 8, notes: "Good color consistency" },
      defects: { score: 8, notes: "Few minor defects observed" }
    },
    {
      batchId: "B003",
      date: "2024-03-03",
      overallScore: 9.2,
      customer: "EuroGourmet",
      marketSegment: "EU",
      size: { score: 9, notes: "Perfect size distribution" },
      shape: { score: 9, notes: "Excellent uniformity" },
      color: { score: 10, notes: "Outstanding color" },
      defects: { score: 9, notes: "Minimal defects" }
    }
  ],
  gradeDistributions: [
    {
      batchId: "B001",
      extraClass: 60,
      classOne: 30,
      classTwo: 8,
      rejected: 2
    },
    {
      batchId: "B002",
      extraClass: 45,
      classOne: 40,
      classTwo: 12,
      rejected: 3
    },
    {
      batchId: "B003",
      extraClass: 70,
      classOne: 25,
      classTwo: 4,
      rejected: 1
    }
  ],
  labelingAccuracy: [
    {
      batchId: "B001",
      date: "2024-03-01",
      totalInspected: 1000,
      correctLabels: 980,
      incorrectGrade: 10,
      incorrectWeight: 5,
      missingLabels: 5
    },
    {
      batchId: "B002",
      date: "2024-03-02",
      totalInspected: 1200,
      correctLabels: 1150,
      incorrectGrade: 25,
      incorrectWeight: 15,
      missingLabels: 10
    },
    {
      batchId: "B003",
      date: "2024-03-03",
      totalInspected: 800,
      correctLabels: 785,
      incorrectGrade: 8,
      incorrectWeight: 4,
      missingLabels: 3
    }
  ]
}; 