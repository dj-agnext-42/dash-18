export interface FarmYield {
  farmId: string;
  date: string;
  acres: number;
  yieldInTons: number;
  expectedYield: number;
  crop: string;
}

export interface RejectionData {
  date: string;
  batchId: string;
  quantity: number;
  reason: string;
  costImpact: number;
}

export interface StorageData {
  batchId: string;
  product: string;
  entryDate: string;
  exitDate: string | null;
  quantity: number;
  optimalDuration: number;
  actualDuration: number;
  storageCondition: 'Optimal' | 'Suboptimal' | 'Critical';
}

export interface TransitData {
  shipmentId: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string | null;
  expectedDuration: number;
  actualDuration: number;
  status: 'Completed' | 'In Transit' | 'Delayed';
}

export interface FinancingData {
  yields: FarmYield[];
  rejections: RejectionData[];
  storage: StorageData[];
  transit: TransitData[];
}

export const sampleFinancingData: FinancingData = {
  yields: [
    {
      farmId: "F001",
      date: "2024-03-01",
      acres: 100,
      yieldInTons: 450,
      expectedYield: 500,
      crop: "Bananas"
    },
    {
      farmId: "F002",
      date: "2024-03-01",
      acres: 80,
      yieldInTons: 380,
      expectedYield: 360,
      crop: "Bananas"
    },
    {
      farmId: "F003",
      date: "2024-03-01",
      acres: 120,
      yieldInTons: 520,
      expectedYield: 540,
      crop: "Bananas"
    }
  ],
  rejections: [
    {
      date: "2024-03-01",
      batchId: "B001",
      quantity: 2.5,
      reason: "Quality standards not met",
      costImpact: 3750
    },
    {
      date: "2024-03-02",
      batchId: "B002",
      quantity: 1.8,
      reason: "Temperature deviation",
      costImpact: 2700
    },
    {
      date: "2024-03-03",
      batchId: "B003",
      quantity: 0.9,
      reason: "Physical damage",
      costImpact: 1350
    }
  ],
  storage: [
    {
      batchId: "B001",
      product: "Bananas",
      entryDate: "2024-03-01",
      exitDate: "2024-03-25",
      quantity: 50,
      optimalDuration: 21,
      actualDuration: 24,
      storageCondition: "Optimal"
    },
    {
      batchId: "B002",
      product: "Bananas",
      entryDate: "2024-03-02",
      exitDate: null,
      quantity: 45,
      optimalDuration: 21,
      actualDuration: 19,
      storageCondition: "Suboptimal"
    },
    {
      batchId: "B003",
      product: "Bananas",
      entryDate: "2024-03-03",
      exitDate: "2024-03-20",
      quantity: 60,
      optimalDuration: 21,
      actualDuration: 17,
      storageCondition: "Optimal"
    }
  ],
  transit: [
    {
      shipmentId: "S001",
      origin: "Farm A",
      destination: "Port X",
      startDate: "2024-03-01",
      endDate: "2024-03-02",
      expectedDuration: 24,
      actualDuration: 26,
      status: "Completed"
    },
    {
      shipmentId: "S002",
      origin: "Farm B",
      destination: "Port X",
      startDate: "2024-03-02",
      endDate: "2024-03-03",
      expectedDuration: 24,
      actualDuration: 22,
      status: "Completed"
    },
    {
      shipmentId: "S003",
      origin: "Farm C",
      destination: "Port X",
      startDate: "2024-03-03",
      endDate: null,
      expectedDuration: 24,
      actualDuration: 20,
      status: "In Transit"
    }
  ]
}; 