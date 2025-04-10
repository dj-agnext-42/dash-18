export interface SupplierDocument {
  id: string;
  name: string;
  required: boolean;
  status: "completed" | "pending" | "expired" | "missing";
  lastUpdated: string;
  expiryDate?: string;
}

export interface QualityTestResult {
  id: string;
  date: string;
  testType: string;
  parameter: string;
  result: number;
  unit: string;
  limit: number;
  status: "pass" | "fail";
  notes?: string;
}

export interface PreLoadingInspection {
  id: string;
  date: string;
  supplierId: string;
  batchId: string;
  parameters: {
    name: string;
    status: "pass" | "fail";
    notes?: string;
  }[];
  overallStatus: "pass" | "fail";
  inspector: string;
}

export interface SupplierData {
  id: string;
  name: string;
  registrationDate: string;
  riskLevel: "low" | "medium" | "high";
  complianceScore: number;
  status: "active" | "suspended" | "blacklisted";
  documents: SupplierDocument[];
  qualityTests: QualityTestResult[];
  inspections: PreLoadingInspection[];
}

export interface SupplierKYCData {
  suppliers: SupplierData[];
}

export const sampleSupplierKYCData: SupplierKYCData = {
  suppliers: [
    {
      id: "SUP001",
      name: "Green Farms Ltd",
      registrationDate: "2023-01-15",
      riskLevel: "low",
      complianceScore: 92,
      status: "active",
      documents: [
        {
          id: "DOC001",
          name: "Business License",
          required: true,
          status: "completed",
          lastUpdated: "2024-01-10",
          expiryDate: "2025-01-10"
        },
        {
          id: "DOC002",
          name: "Food Safety Certification",
          required: true,
          status: "completed",
          lastUpdated: "2023-12-15",
          expiryDate: "2024-12-15"
        },
        {
          id: "DOC003",
          name: "Environmental Compliance",
          required: true,
          status: "completed",
          lastUpdated: "2023-11-20",
          expiryDate: "2024-11-20"
        }
      ],
      qualityTests: [
        {
          id: "QT001",
          date: "2024-03-01",
          testType: "Pesticide Residue",
          parameter: "Organophosphates",
          result: 0.05,
          unit: "mg/kg",
          limit: 0.1,
          status: "pass"
        },
        {
          id: "QT002",
          date: "2024-03-01",
          testType: "Heavy Metals",
          parameter: "Lead",
          result: 0.02,
          unit: "mg/kg",
          limit: 0.1,
          status: "pass"
        }
      ],
      inspections: [
        {
          id: "INS001",
          date: "2024-03-15",
          supplierId: "SUP001",
          batchId: "B001",
          parameters: [
            { name: "Packaging Integrity", status: "pass" },
            { name: "Label Compliance", status: "pass" },
            { name: "Product Condition", status: "pass" }
          ],
          overallStatus: "pass",
          inspector: "John Smith"
        }
      ]
    },
    {
      id: "SUP002",
      name: "Fresh Produce Co",
      registrationDate: "2023-03-20",
      riskLevel: "medium",
      complianceScore: 78,
      status: "active",
      documents: [
        {
          id: "DOC004",
          name: "Business License",
          required: true,
          status: "completed",
          lastUpdated: "2024-02-01",
          expiryDate: "2025-02-01"
        },
        {
          id: "DOC005",
          name: "Food Safety Certification",
          required: true,
          status: "pending",
          lastUpdated: "2024-02-15"
        }
      ],
      qualityTests: [
        {
          id: "QT003",
          date: "2024-03-05",
          testType: "Pesticide Residue",
          parameter: "Organophosphates",
          result: 0.12,
          unit: "mg/kg",
          limit: 0.1,
          status: "fail",
          notes: "Above acceptable limit"
        }
      ],
      inspections: [
        {
          id: "INS002",
          date: "2024-03-10",
          supplierId: "SUP002",
          batchId: "B002",
          parameters: [
            { name: "Packaging Integrity", status: "pass" },
            { name: "Label Compliance", status: "fail", notes: "Missing batch code" },
            { name: "Product Condition", status: "pass" }
          ],
          overallStatus: "fail",
          inspector: "Jane Doe"
        }
      ]
    },
    {
      id: "SUP003",
      name: "Organic Growers Association",
      registrationDate: "2023-02-10",
      riskLevel: "low",
      complianceScore: 95,
      status: "active",
      documents: [
        {
          id: "DOC006",
          name: "Business License",
          required: true,
          status: "completed",
          lastUpdated: "2024-01-05",
          expiryDate: "2025-01-05"
        },
        {
          id: "DOC007",
          name: "Organic Certification",
          required: true,
          status: "completed",
          lastUpdated: "2024-01-15",
          expiryDate: "2025-01-15"
        }
      ],
      qualityTests: [
        {
          id: "QT004",
          date: "2024-03-08",
          testType: "Pesticide Residue",
          parameter: "Organophosphates",
          result: 0.01,
          unit: "mg/kg",
          limit: 0.1,
          status: "pass"
        }
      ],
      inspections: [
        {
          id: "INS003",
          date: "2024-03-12",
          supplierId: "SUP003",
          batchId: "B003",
          parameters: [
            { name: "Packaging Integrity", status: "pass" },
            { name: "Label Compliance", status: "pass" },
            { name: "Product Condition", status: "pass" }
          ],
          overallStatus: "pass",
          inspector: "Mike Johnson"
        }
      ]
    },
    {
      id: "SUP004",
      name: "Global Agro Exports",
      registrationDate: "2023-04-05",
      riskLevel: "high",
      complianceScore: 65,
      status: "active",
      documents: [
        {
          id: "DOC008",
          name: "Business License",
          required: true,
          status: "expired",
          lastUpdated: "2023-01-05",
          expiryDate: "2024-01-05"
        },
        {
          id: "DOC009",
          name: "Food Safety Certification",
          required: true,
          status: "pending",
          lastUpdated: "2024-03-01"
        },
        {
          id: "DOC010",
          name: "Quality Management System",
          required: true,
          status: "missing",
          lastUpdated: "2024-03-01"
        }
      ],
      qualityTests: [
        {
          id: "QT005",
          date: "2024-03-10",
          testType: "Pesticide Residue",
          parameter: "Organophosphates",
          result: 0.15,
          unit: "mg/kg",
          limit: 0.1,
          status: "fail",
          notes: "Significantly above limit"
        },
        {
          id: "QT006",
          date: "2024-03-10",
          testType: "Heavy Metals",
          parameter: "Lead",
          result: 0.09,
          unit: "mg/kg",
          limit: 0.1,
          status: "pass"
        }
      ],
      inspections: [
        {
          id: "INS004",
          date: "2024-03-15",
          supplierId: "SUP004",
          batchId: "B004",
          parameters: [
            { name: "Packaging Integrity", status: "fail", notes: "Damaged packaging" },
            { name: "Label Compliance", status: "fail", notes: "Incomplete information" },
            { name: "Product Condition", status: "pass" }
          ],
          overallStatus: "fail",
          inspector: "Sarah Wilson"
        }
      ]
    },
    {
      id: "SUP005",
      name: "Premium Farms Inc",
      registrationDate: "2023-05-15",
      riskLevel: "low",
      complianceScore: 88,
      status: "active",
      documents: [
        {
          id: "DOC011",
          name: "Business License",
          required: true,
          status: "completed",
          lastUpdated: "2024-02-15",
          expiryDate: "2025-02-15"
        },
        {
          id: "DOC012",
          name: "Food Safety Certification",
          required: true,
          status: "completed",
          lastUpdated: "2024-01-20",
          expiryDate: "2025-01-20"
        },
        {
          id: "DOC013",
          name: "Environmental Compliance",
          required: true,
          status: "pending",
          lastUpdated: "2024-03-01"
        }
      ],
      qualityTests: [
        {
          id: "QT007",
          date: "2024-03-12",
          testType: "Pesticide Residue",
          parameter: "Organophosphates",
          result: 0.03,
          unit: "mg/kg",
          limit: 0.1,
          status: "pass"
        },
        {
          id: "QT008",
          date: "2024-03-12",
          testType: "Microbial Analysis",
          parameter: "E. coli",
          result: 0,
          unit: "cfu/g",
          limit: 10,
          status: "pass"
        }
      ],
      inspections: [
        {
          id: "INS005",
          date: "2024-03-16",
          supplierId: "SUP005",
          batchId: "B005-1",
          parameters: [
            { name: "Packaging Integrity", status: "pass" },
            { name: "Label Compliance", status: "pass" },
            { name: "Product Condition", status: "pass" }
          ],
          overallStatus: "pass",
          inspector: "David Chen"
        },
        {
          id: "INS006",
          date: "2024-03-17",
          supplierId: "SUP005",
          batchId: "B005-2",
          parameters: [
            { name: "Packaging Integrity", status: "pass" },
            { name: "Label Compliance", status: "fail", notes: "Wrong date format" },
            { name: "Product Condition", status: "pass" }
          ],
          overallStatus: "fail",
          inspector: "David Chen"
        }
      ]
    }
  ]
}; 