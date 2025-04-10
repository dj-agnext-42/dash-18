"use client";

import { sampleQualityInspectionData } from "@/data/complianceSampleData";
import { QualityInspectionData } from "@/types/compliance.d";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const GRADE_COLORS = ["#16a34a", "#2563eb", "#f97316", "#dc2626"]; // Green, Blue, Orange, Red
const DEFECT_COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6"]; // Red, Amber, Blue, Purple

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + (radius + 15) * Math.cos(-midAngle * RADIAN); // Adjust radius for label position
  const y = cy + (radius + 15) * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#334155" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderDefectLabel = ({ cx, cy, midAngle, outerRadius, name, value }: any) => {
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#475569" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11}>
      {`${name}: ${value}`}
    </text>
  );
};

export const QualityInspectionSection = () => {
  const data: QualityInspectionData = sampleQualityInspectionData;

  if (!data) {
    return <div>Loading quality inspection data...</div>;
  }

  const gradeData = [
    { name: "Extra Class", value: data.grade_distribution.extra_class },
    { name: "Class I", value: data.grade_distribution.class_i },
    { name: "Class II", value: data.grade_distribution.class_ii },
    { name: "Below Standard", value: data.grade_distribution.below_standard },
  ];

  const defectDistributionData = Object.entries(data.defect_analysis.distribution).map(([key, value]) => ({
      name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), // Format name
      value: value
  }));

  const qualityMetrics = [
    { name: "Cleanliness", value: data.quality_metrics.cleanliness },
    { name: "Size Consistency", value: data.quality_metrics.size_consistency },
    { name: "Color Uniformity", value: data.quality_metrics.color_uniformity },
    { name: "Shape Conformity", value: data.quality_metrics.shape_conformity },
  ];

  const defectSummary = Object.entries(data.defect_analysis.summary).map(([key, value]) => ({
    name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: value
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GRADE_COLORS[index % GRADE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {qualityMetrics.map((metric) => (
              <div key={metric.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">{metric.name}</span>
                  <span className="text-sm font-semibold">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Defect Analysis Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Defect Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                 <Pie
                  data={defectDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderDefectLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {defectDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEFECT_COLORS[index % DEFECT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                {/* No Legend here as labels are outside */}
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Defect Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Defect Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {defectSummary.map((defect) => (
              <div key={defect.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">{defect.name}</span>
                  <span className="text-sm font-semibold">{defect.value.toFixed(1)}%</span>
                </div>
                <Progress value={defect.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 