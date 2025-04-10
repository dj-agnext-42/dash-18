// Types for Payments Dashboard Data

export interface BatchQuantity {
  batchId: string;
  date: string; // Date of the measurement/event
  harvested: number; // Quantity harvested (e.g., in units or kg)
  received: number; // Quantity received at processing (e.g., in units or kg)
  loadedAtPort: number; // Quantity loaded at port (e.g., in units or kg)
  unit: string; // e.g., 'kg', 'boxes', 'units'
}

export interface WeightDataPoint {
  batchId: string;
  date: string; // Date of measurement
  weightPerBox: number; // e.g., in kg
}

export interface PaymentsData {
  quantities: BatchQuantity[];
  weightConsistency: WeightDataPoint[];
  totalExportedTons: number;
} 