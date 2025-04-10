"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleSupplierKYCData } from "@/data/supplierKYCData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function SupplierKYCDashboard() {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("ALL");

  // Filter data based on selection
  const filteredSuppliers = selectedSupplier === "ALL"
    ? sampleSupplierKYCData.suppliers
    : sampleSupplierKYCData.suppliers.filter(s => s.id === selectedSupplier);

  // Calculate compliance metrics
  const averageComplianceScore = filteredSuppliers.reduce(
    (sum, supplier) => sum + supplier.complianceScore, 0
  ) / filteredSuppliers.length;

  // Calculate document completion rate
  const documentStats = filteredSuppliers.reduce((acc, supplier) => {
    supplier.documents.forEach(doc => {
      if (doc.required) {
        acc.total++;
        if (doc.status === "completed") acc.completed++;
      }
    });
    return acc;
  }, { total: 0, completed: 0 });

  const documentCompletionRate = (documentStats.completed / documentStats.total) * 100;

  // Prepare quality test data
  const qualityTestResults = filteredSuppliers.flatMap(s => s.qualityTests);
  const testStatusData = qualityTestResults.reduce((acc, test) => {
    acc[test.status] = (acc[test.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const testChartData = Object.entries(testStatusData).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count
  }));

  // Prepare inspection data
  const inspectionResults = filteredSuppliers.flatMap(s => s.inspections);
  const inspectionData = [
    {
      name: "Pass",
      value: inspectionResults.filter(i => i.overallStatus === "pass").length
    },
    {
      name: "Fail",
      value: inspectionResults.filter(i => i.overallStatus === "fail").length
    }
  ];

  const COLORS = ["#4ade80", "#f87171"];

  // Non-compliant suppliers alert
  const nonCompliantSuppliers = filteredSuppliers.filter(s => s.complianceScore < 80);

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Supplier KYC Dashboard</h1>
          <p className="text-sm text-gray-600">
            Monitor supplier compliance and quality metrics
          </p>
        </div>
        <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Supplier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Suppliers</SelectItem>
            {sampleSupplierKYCData.suppliers.map(supplier => (
              <SelectItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Non-compliant Suppliers Alert */}
      {nonCompliantSuppliers.length > 0 && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Non-compliant Suppliers Detected</AlertTitle>
          <AlertDescription>
            {nonCompliantSuppliers.map(s => s.name).join(", ")} have compliance scores below 80%.
          </AlertDescription>
        </Alert>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageComplianceScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Overall supplier compliance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Document Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentCompletionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Required documents submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspection Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((inspectionData[0].value / inspectionResults.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Pre-loading inspections passed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Test Results</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={testChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="count" 
                  fill="#8884d8" 
                  name="Number of Tests"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pre-loading Inspection Results */}
        <Card>
          <CardHeader>
            <CardTitle>Pre-loading Inspection Results</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inspectionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inspectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 