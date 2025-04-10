export interface ComplianceDocument {
  id: string;
  name: string;
  status: 'completed' | 'pending' | 'missing';
  dueDate: string;
}

export interface QualityTest {
  id: string;
  name: string;
  result: 'pass' | 'fail';
  date: string;
  type: 'pesticide' | 'physical' | 'chemical';
  notes?: string;
}

export interface RejectionData {
  date: string;
  totalInspected: number;
  rejected: number;
  reason?: string;
}

export interface PhysicalQualityMetric {
  id: string;
  metric: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'within_range' | 'out_of_range';
} 