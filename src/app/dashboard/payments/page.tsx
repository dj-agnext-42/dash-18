"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { samplePaymentsData } from "@/data/paymentsSampleData";
import { PaymentsData } from "@/types/payments";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react"; // Import icon for export button

export default function PaymentsDashboard() {
  const data: PaymentsData = samplePaymentsData;

  if (!data) {
    return <div>Loading payments data...</div>;
  }

  // Calculate total quantities for KPIs
  const totalHarvested = data.quantities.reduce((sum, batch) => sum + batch.harvested, 0);
  const totalReceived = data.quantities.reduce((sum, batch) => sum + batch.received, 0);
  const averageWeightPerBox = data.weightConsistency.reduce((sum, point) => sum + point.weightPerBox, 0) / data.weightConsistency.length;

  // Prepare data for Harvest vs Received chart
  const quantityComparisonData = data.quantities.map(batch => ({
    name: batch.batchId,
    Harvested: batch.harvested,
    Received: batch.received,
  }));

  // Data for Weight Consistency chart
  const weightChartData = data.weightConsistency.map(point => ({
    date: point.date,
    weight: point.weightPerBox,
    batch: point.batchId
  }));

  // Calculate payment for each batch (example rate of $0.50 per kg)
  const RATE_PER_KG = 0.50;
  const batchPayments = data.quantities.map(batch => ({
    batchId: batch.batchId,
    received: batch.received,
    payment: batch.received * RATE_PER_KG
  }));

  const handleExport = () => {
    // In a real implementation, this would generate a CSV with:
    // - Batch details (ID, dates, quantities)
    // - Weight measurements
    // - Payment calculations
    const csvData = [
      ["Batch ID", "Date", "Harvested (kg)", "Received (kg)", "Payment ($)"].join(","),
      ...data.quantities.map(batch => 
        [batch.batchId, batch.date, batch.harvested, batch.received, (batch.received * RATE_PER_KG).toFixed(2)].join(",")
      )
    ].join("\n");
    
    console.log("Export data:", csvData);
    alert("Export functionality would save this data as CSV");
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Payments Dashboard</h1>
          <p className="text-sm text-gray-600">
            Monitor and manage financial transactions based on produce volume from harvest to export.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Harvested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalHarvested / 1000).toFixed(2)} tons</div>
            <p className="text-xs text-muted-foreground">Total quantity harvested</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalReceived / 1000).toFixed(2)} tons</div>
            <p className="text-xs text-muted-foreground">Total quantity received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Weight/Box</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageWeightPerBox.toFixed(1)} kg</div>
            <p className="text-xs text-muted-foreground">Average weight per box</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalExportedTons} tons</div>
            <p className="text-xs text-muted-foreground">Total quantity loaded at port</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quantity Harvested vs. Received</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quantityComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
                <YAxis tick={{ fontSize: 12 }} label={{ value: data.quantities[0]?.unit || 'Quantity', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fontSize: '14px'}, dy: 40 }}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="Harvested" fill="#8884d8" />
                <Bar dataKey="Received" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weight per Box Consistency</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightChartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis 
                  domain={['dataMin - 0.2', 'dataMax + 0.2']} 
                  tick={{ fontSize: 12 }} 
                  label={{ value: "Weight (kg)", angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fontSize: '14px'}, dy: 40 }}
                />
                <Tooltip formatter={(value, name, props) => [`${value} kg (Batch: ${props.payload.batch})`, null]}/>
                <Line type="monotone" dataKey="weight" stroke="#ff7300" strokeWidth={2} dot={{ r: 3 }} name="Weight/Box" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payment Calculation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Payments are calculated based on received quantity at rate of ${RATE_PER_KG.toFixed(2)}/kg
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {batchPayments.map(batch => (
                <div key={batch.batchId} className="p-4 rounded-lg border">
                  <div className="font-medium">Batch {batch.batchId}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Received: {batch.received} kg
                  </div>
                  <div className="text-lg font-bold mt-2">
                    ${batch.payment.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 