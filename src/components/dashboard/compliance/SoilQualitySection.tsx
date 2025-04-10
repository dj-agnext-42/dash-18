"use client";

import { sampleSoilQualityData } from "@/data/complianceSampleData";
// Attempt to import types again, hoping TS server catches up
import { SoilQualityData, NutrientDetail } from "@/types/compliance.d";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Helper function to calculate percentage and determine color
const getNutrientPercentage = (nutrient: NutrientDetail) => {
  // Added explicit checks for nutrient presence
  if (!nutrient || typeof nutrient.current !== 'number' || typeof nutrient.optimal !== 'number' || nutrient.optimal === 0) {
      return { percentage: 0, color: "text-gray-500" };
  }
  const percentage = (nutrient.current / nutrient.optimal) * 100;
  let color = "text-green-600"; // Default to green (optimal or above)
  if (percentage < 80) {
    color = "text-red-600"; // Below optimal threshold
  } else if (percentage < 95) {
    color = "text-yellow-600"; // Slightly below optimal
  }
  return { percentage: parseFloat(percentage.toFixed(1)), color };
};

export const SoilQualitySection = () => {
  const data: SoilQualityData = sampleSoilQualityData;

  // Explicitly type 'details' as NutrientDetail
  const nutrientChartData = Object.entries(data.nutrients).map(([name, details]: [string, NutrientDetail]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    "Current Level": details.current,
    "Optimal Level": details.optimal,
  }));

  const nutrientDetails = [
    { name: "Nitrogen", data: data.nutrients.nitrogen },
    { name: "Phosphorus", data: data.nutrients.phosphorus },
    { name: "Potassium", data: data.nutrients.potassium },
    { name: "Calcium", data: data.nutrients.calcium },
    { name: "Magnesium", data: data.nutrients.magnesium },
  ];

  // Add check for data availability
  if (!data) {
    return <div>Loading soil quality data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Section 1: pH Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Soil pH Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.pH_trend}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis
                // Set a reasonable fixed domain for pH, e.g., 6 to 8
                domain={[6, 8]}
                allowDecimals={true}
                tick={{ fontSize: 12 }}
                label={{ value: "pH Level", angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fontSize: '14px'}, dy: 40 }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="pH"/>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Section 2: Nutrient Levels Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Nutrient Levels</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={nutrientChartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
              <YAxis tick={{ fontSize: 12 }} label={{ value: "Level (mg/kg)", angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fontSize: '14px'}, dy: 40 }}/>
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="Current Level" fill="#3b82f6" />
              <Bar dataKey="Optimal Level" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Section 3: Individual Nutrient Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nutrientDetails.map((nutrient) => {
          // Add check for nutrient.data existence
          if (!nutrient.data) return null;
          const { percentage, color } = getNutrientPercentage(nutrient.data);
          return (
            <Card key={nutrient.name}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base font-medium mb-1">{nutrient.name}</p>
                    <p className="text-xs text-gray-500">
                      Current: {nutrient.data.current} {nutrient.data.unit}
                    </p>
                  </div>
                  <p className={cn("text-base font-semibold", color)}>
                    {percentage}% of optimal
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}; 