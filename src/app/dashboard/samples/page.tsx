"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleCRMData } from "@/data/samplesCRMData";
import { MarketSegment } from "@/types/samples";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const GRADE_COLORS = {
  extraClass: "#4CAF50",
  classOne: "#2196F3",
  classTwo: "#FFC107",
  rejected: "#F44336",
};

export default function SamplesCRMDashboard() {
  const [selectedMarket, setSelectedMarket] = useState<MarketSegment>("ALL");

  // Filter data based on selected market segment
  const filteredAssessments = selectedMarket === "ALL"
    ? sampleCRMData.qualityAssessments
    : sampleCRMData.qualityAssessments.filter(a => a.marketSegment === selectedMarket);

  // Prepare data for grade distribution pie chart
  const gradeData = sampleCRMData.gradeDistributions.map(dist => [
    { name: "Extra Class", value: dist.extraClass },
    { name: "Class I", value: dist.classOne },
    { name: "Class II", value: dist.classTwo },
    { name: "Rejected", value: dist.rejected },
  ])[0]; // Using first batch for demo

  // Prepare data for labeling accuracy bar chart
  const labelingData = sampleCRMData.labelingAccuracy.map(acc => ({
    batch: acc.batchId,
    Correct: (acc.correctLabels / acc.totalInspected) * 100,
    "Grade Error": (acc.incorrectGrade / acc.totalInspected) * 100,
    "Weight Error": (acc.incorrectWeight / acc.totalInspected) * 100,
    "Missing Label": (acc.missingLabels / acc.totalInspected) * 100,
  }));

  return (
    <div className="flex flex-col h-full p-4 md:p-6 space-y-4 bg-gray-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Samples CRM Dashboard</h1>
          <p className="text-sm text-gray-600">
            Track produce quality and customer satisfaction metrics
          </p>
        </div>
        <Select
          value={selectedMarket}
          onValueChange={(value: MarketSegment | "ALL") => setSelectedMarket(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Markets</SelectItem>
            <SelectItem value="EU">European Union</SelectItem>
            <SelectItem value="US">United States</SelectItem>
            <SelectItem value="ASIA">Asia</SelectItem>
            <SelectItem value="OTHER">Other Markets</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quality Assessment Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAssessments.map((assessment) => (
          <Card key={assessment.batchId}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Batch {assessment.batchId} ({assessment.customer})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessment.overallScore.toFixed(1)}/10</div>
              <div className="space-y-2 mt-2">
                <div className="text-xs">
                  Size: {assessment.size.score}/10 - {assessment.size.notes}
                </div>
                <div className="text-xs">
                  Shape: {assessment.shape.score}/10 - {assessment.shape.notes}
                </div>
                <div className="text-xs">
                  Color: {assessment.color.score}/10 - {assessment.color.notes}
                </div>
                <div className="text-xs">
                  Defects: {assessment.defects.score}/10 - {assessment.defects.notes}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Labeling Accuracy */}
        <Card>
          <CardHeader>
            <CardTitle>Labeling Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={labelingData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="batch" />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Correct" fill="#4CAF50" />
                <Bar dataKey="Grade Error" fill="#FF9800" />
                <Bar dataKey="Weight Error" fill="#F44336" />
                <Bar dataKey="Missing Label" fill="#9C27B0" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Feedback Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Customer feedback integration coming soon. This section will display customer satisfaction metrics,
            quality concerns, and improvement suggestions.
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 