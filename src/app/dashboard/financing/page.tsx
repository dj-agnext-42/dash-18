"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleFinancingData } from "@/data/financingData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function FinancingDashboard() {
  // Calculate KPIs
  const averageYieldPerAcre = sampleFinancingData.yields.reduce((sum, farm) => 
    sum + (farm.yieldInTons / farm.acres), 0) / sampleFinancingData.yields.length;

  const totalRejectionRate = (sampleFinancingData.rejections.reduce((sum, rej) => 
    sum + rej.quantity, 0) / sampleFinancingData.yields.reduce((sum, y) => 
    sum + y.yieldInTons, 0)) * 100;

  const averageStorageDuration = sampleFinancingData.storage.reduce((sum, store) => 
    sum + store.actualDuration, 0) / sampleFinancingData.storage.length;

  const averageTransitTime = sampleFinancingData.transit
    .filter(t => t.status === "Completed")
    .reduce((sum, t) => sum + t.actualDuration, 0) / 
    sampleFinancingData.transit.filter(t => t.status === "Completed").length;

  // Prepare data for yield comparison chart
  const yieldData = sampleFinancingData.yields.map(farm => ({
    farm: farm.farmId,
    actual: farm.yieldInTons / farm.acres,
    expected: farm.expectedYield / farm.acres,
  }));

  // Prepare data for storage duration vs optimal chart
  const storageData = sampleFinancingData.storage.map(store => ({
    batch: store.batchId,
    actual: store.actualDuration,
    optimal: store.optimalDuration,
    condition: store.storageCondition,
  }));

  // Calculate financial impact
  const totalRejectionCost = sampleFinancingData.rejections.reduce((sum, rej) => 
    sum + rej.costImpact, 0);

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Financing Dashboard</h1>
          <p className="text-sm text-gray-600">
            High-level view of operational efficiency and financial performance
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => console.log("Resource allocation simulation")}>
          <Search className="mr-2 h-4 w-4" />
          Run Simulation
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yield per Acre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageYieldPerAcre.toFixed(1)} tons</div>
            <p className="text-xs text-muted-foreground">Average yield across all farms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRejectionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Total rejected produce percentage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageStorageDuration.toFixed(1)} days</div>
            <p className="text-xs text-muted-foreground">Average time in storage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transit Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageTransitTime.toFixed(1)} hours</div>
            <p className="text-xs text-muted-foreground">Average transportation duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Yield Performance by Farm</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="farm" />
                <YAxis label={{ value: 'Tons per Acre', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="actual" name="Actual Yield" fill="#4CAF50" />
                <Bar dataKey="expected" name="Expected Yield" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Storage Duration */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Duration vs Optimal</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={storageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="batch" />
                <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual Duration" 
                  stroke="#FF9800" 
                  strokeWidth={2}
                  dot={{ r: 6, fill: "#FF9800" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="optimal" 
                  name="Optimal Duration" 
                  stroke="#4CAF50" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <div className="text-sm font-medium">Total Rejection Cost</div>
                <div className="text-2xl font-bold text-red-600">
                  ${totalRejectionCost.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Cost impact from rejected produce
                </div>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="text-sm font-medium">Storage Efficiency</div>
                <div className="text-2xl font-bold text-blue-600">
                  {((sampleFinancingData.storage.filter(s => s.storageCondition === "Optimal").length / 
                    sampleFinancingData.storage.length) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Percentage of optimal storage conditions
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Click "Run Simulation" to explore resource allocation scenarios and potential cost savings.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 