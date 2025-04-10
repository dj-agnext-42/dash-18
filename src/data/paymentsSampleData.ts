import { PaymentsData, BatchQuantity, WeightDataPoint } from "@/types/payments";

// Sample Batch Quantities (assuming kg for simplicity)
const sampleQuantities: BatchQuantity[] = [
  {
    batchId: "B001",
    date: "2024-03-01",
    harvested: 12000,
    received: 11850,
    loadedAtPort: 11800,
    unit: "kg",
  },
  {
    batchId: "B002",
    date: "2024-03-03",
    harvested: 15500,
    received: 15300,
    loadedAtPort: 15250,
    unit: "kg",
  },
  {
    batchId: "B003",
    date: "2024-03-05",
    harvested: 13000,
    received: 12900,
    loadedAtPort: 12800,
    unit: "kg",
  },
  {
    batchId: "B004",
    date: "2024-03-07",
    harvested: 14200,
    received: 14150,
    loadedAtPort: 14050,
    unit: "kg",
  },
   {
    batchId: "B005",
    date: "2024-03-09",
    harvested: 16000,
    received: 15800,
    loadedAtPort: 15750,
    unit: "kg",
  },
];

// Sample Weight Consistency Data (Weight per Box in kg)
const sampleWeightConsistency: WeightDataPoint[] = [
  { batchId: "B001", date: "2024-03-01", weightPerBox: 18.2 },
  { batchId: "B002", date: "2024-03-03", weightPerBox: 18.1 },
  { batchId: "B003", date: "2024-03-05", weightPerBox: 18.3 },
  { batchId: "B004", date: "2024-03-07", weightPerBox: 18.0 },
  { batchId: "B005", date: "2024-03-09", weightPerBox: 18.2 },
  // Add more data points for a better chart visualization if needed
  { batchId: "B005", date: "2024-03-10", weightPerBox: 18.4 }, // Simulating variation within a batch over time
  { batchId: "B005", date: "2024-03-11", weightPerBox: 18.1 },
];

// Calculate Total Exported Tons
const totalExportedKg = sampleQuantities.reduce((sum, batch) => sum + batch.loadedAtPort, 0);
const totalExportedTons = parseFloat((totalExportedKg / 1000).toFixed(2)); // Convert kg to tons

// Consolidate sample data
export const samplePaymentsData: PaymentsData = {
  quantities: sampleQuantities,
  weightConsistency: sampleWeightConsistency,
  totalExportedTons: totalExportedTons,
}; 