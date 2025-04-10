import { ComplianceDocument, QualityTest, RejectionData, PhysicalQualityMetric } from "@/types/governance";
import { subDays, format } from "date-fns";

const generatePastDates = (days: number): string[] => {
  return Array.from({ length: days }, (_, i) => 
    format(subDays(new Date(), i), 'yyyy-MM-dd')
  ).reverse();
};

export const sampleComplianceDocuments: ComplianceDocument[] = [
  {
    id: "DOC001",
    name: "Food Safety Certification",
    status: "completed",
    dueDate: "2024-04-01"
  },
  {
    id: "DOC002",
    name: "Quality Management System",
    status: "pending",
    dueDate: "2024-03-15"
  },
  {
    id: "DOC003",
    name: "Environmental Compliance",
    status: "completed",
    dueDate: "2024-05-01"
  },
  {
    id: "DOC004",
    name: "Worker Safety Protocol",
    status: "missing",
    dueDate: "2024-03-01"
  },
  {
    id: "DOC005",
    name: "Supply Chain Verification",
    status: "pending",
    dueDate: "2024-04-15"
  }
];

export const sampleQualityTests: QualityTest[] = [
  {
    id: "TEST001",
    name: "Pesticide Residue Test",
    result: "pass",
    date: "2024-03-01",
    type: "pesticide",
    notes: "Within acceptable limits"
  },
  {
    id: "TEST002",
    name: "Physical Inspection",
    result: "pass",
    date: "2024-03-01",
    type: "physical"
  },
  {
    id: "TEST003",
    name: "Chemical Analysis",
    result: "fail",
    date: "2024-03-01",
    type: "chemical",
    notes: "pH levels above threshold"
  },
  {
    id: "TEST004",
    name: "Pesticide Test B",
    result: "pass",
    date: "2024-03-01",
    type: "pesticide"
  }
];

export const sampleRejectionData: RejectionData[] = generatePastDates(30).map(date => ({
  date,
  totalInspected: Math.floor(Math.random() * 500) + 500,
  rejected: Math.floor(Math.random() * 50),
  reason: Math.random() > 0.5 ? "Quality standards not met" : "Documentation incomplete"
}));

export const samplePhysicalMetrics: PhysicalQualityMetric[] = [
  {
    id: "METRIC001",
    metric: "Size Consistency",
    value: 95,
    unit: "%",
    threshold: 90,
    status: "within_range"
  },
  {
    id: "METRIC002",
    metric: "Color Uniformity",
    value: 88,
    unit: "%",
    threshold: 85,
    status: "within_range"
  },
  {
    id: "METRIC003",
    metric: "Defect Rate",
    value: 3.5,
    unit: "%",
    threshold: 5,
    status: "within_range"
  },
  {
    id: "METRIC004",
    metric: "Moisture Content",
    value: 15,
    unit: "%",
    threshold: 12,
    status: "out_of_range"
  }
]; 