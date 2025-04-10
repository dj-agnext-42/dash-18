"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleRMPerformanceData } from "@/data/rmPerformanceData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState } from "react";

export default function RMPerformanceDashboard() {
  const [selectedFarm, setSelectedFarm] = useState<string>("ALL");
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");

  // Filter data based on selections
  const filteredSoilData = selectedFarm === "ALL" 
    ? sampleRMPerformanceData.soilQuality
    : sampleRMPerformanceData.soilQuality.filter(s => s.farmId === selectedFarm);

  const filteredProductData = selectedBatch === "ALL"
    ? sampleRMPerformanceData.productQuality
    : sampleRMPerformanceData.productQuality.filter(p => p.batchId === selectedBatch);

  // Calculate KPIs
  const soilHealthScore = filteredSoilData.reduce((sum, soil) => {
    const pHScore = soil.pH >= 6.5 && soil.pH <= 7.5 ? 1 : 0;
    const nutrientScore = (
      (soil.nitrogen / 100) +
      (soil.phosphorus / 100) +
      (soil.potassium / 200)
    ) / 3;
    return sum + (pHScore + nutrientScore) / 2;
  }, 0) / filteredSoilData.length * 100;

  const averageFertilizerEffectiveness = sampleRMPerformanceData.farmInputs
    .filter(input => selectedFarm === "ALL" || input.farmId === selectedFarm)
    .reduce((sum, input) => sum + input.fertilizer.effectivenessScore, 0) / 
    sampleRMPerformanceData.farmInputs.length;

  const averageProductQuality = filteredProductData.reduce((sum, product) => 
    sum + (
      product.maturityScore +
      product.handlingScore +
      product.cleanliness +
      product.physicalAttributes.size.score +
      product.physicalAttributes.shape.score +
      product.physicalAttributes.color.score +
      product.physicalAttributes.defects.score
    ) / 7, 0) / filteredProductData.length;

  const averagePestManagement = sampleRMPerformanceData.farmInputs
    .filter(input => selectedFarm === "ALL" || input.farmId === selectedFarm)
    .reduce((sum, input) => sum + input.pestManagement.effectivenessScore, 0) /
    sampleRMPerformanceData.farmInputs.length;

  const averageIrrigation = sampleRMPerformanceData.farmInputs
    .filter(input => selectedFarm === "ALL" || input.farmId === selectedFarm)
    .reduce((sum, input) => sum + input.irrigation.efficiency, 0) /
    sampleRMPerformanceData.farmInputs.length;

  const gradeDistribution = filteredProductData.reduce((acc, product) => {
    const grade = product.grade || "Ungraded";
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const gradeData = Object.entries(gradeDistribution).map(([grade, count]) => ({
    grade,
    count,
    percentage: (count / filteredProductData.length) * 100
  }));

  // Prepare correlation data (fertilizer effectiveness vs product quality)
  const correlationData = sampleRMPerformanceData.farmInputs.map(input => {
    const relatedProducts = sampleRMPerformanceData.productQuality
      .filter(p => p.batchId.startsWith(input.farmId));
    const avgQuality = relatedProducts.length > 0
      ? relatedProducts.reduce((sum, p) => sum + (
          p.maturityScore +
          p.handlingScore +
          p.cleanliness
        ) / 3, 0) / relatedProducts.length
      : 0;
    
    return {
      farmId: input.farmId,
      fertilizerEffectiveness: input.fertilizer.effectivenessScore,
      productQuality: avgQuality,
    };
  });

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">RM and Product Performance</h1>
          <p className="text-sm text-gray-600">
            Monitor raw material quality and product performance metrics
          </p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedFarm} onValueChange={setSelectedFarm}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Farm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Farms</SelectItem>
              {sampleRMPerformanceData.soilQuality.map(soil => (
                <SelectItem key={soil.farmId} value={soil.farmId}>
                  Farm {soil.farmId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Batches</SelectItem>
              {sampleRMPerformanceData.productQuality.map(product => (
                <SelectItem key={product.batchId} value={product.batchId}>
                  Batch {product.batchId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soilHealthScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Combined pH and nutrient score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fertilizer Effectiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageFertilizerEffectiveness.toFixed(1)}/10</div>
            <p className="text-xs text-muted-foreground">Average effectiveness score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProductQuality.toFixed(1)}/10</div>
            <p className="text-xs text-muted-foreground">Average quality score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pest Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averagePestManagement.toFixed(1)}/10</div>
            <p className="text-xs text-muted-foreground">Pest control effectiveness</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Irrigation Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageIrrigation.toFixed(1)}/10</div>
            <p className="text-xs text-muted-foreground">Water usage optimization</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil Quality and Pest Management Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Soil Quality & Pest Management Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleRMPerformanceData.soilQuality}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="pH" 
                  stroke="#8884d8" 
                  name="Soil pH"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="nitrogen" 
                  stroke="#82ca9d" 
                  name="Nitrogen Level"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="pestManagement" 
                  stroke="#ffc658" 
                  name="Pest Management"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Defect Rates and Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredProductData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="batchId" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="maturityScore" name="Maturity" fill="#8884d8" />
                <Bar dataKey="handlingScore" name="Handling" fill="#82ca9d" />
                <Bar dataKey="cleanliness" name="Cleanliness" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Storage Impact */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Conditions Impact</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleRMPerformanceData.storageConditions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#8884d8" 
                  name="Humidity (%)"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#82ca9d" 
                  name="Temperature (°C)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="qualityImpact.score" 
                  stroke="#ffc658" 
                  name="Quality Impact"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Input-Output Correlation */}
        <Card>
          <CardHeader>
            <CardTitle>Input-Output Correlation Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="fertilizerEffectiveness" 
                  name="Fertilizer Effectiveness"
                  domain={[0, 10]}
                  label={{ value: "Fertilizer Effectiveness", position: "bottom" }}
                />
                <YAxis 
                  type="number" 
                  dataKey="productQuality" 
                  name="Product Quality"
                  domain={[0, 10]}
                  label={{ value: "Product Quality", angle: -90, position: "insideLeft" }}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter 
                  name="Farm Performance" 
                  data={correlationData} 
                  fill="#8884d8"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" name="Percentage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 