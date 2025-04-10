"use client";

import { sampleCropManagementData } from "@/data/complianceSampleData";
import { CropManagementData } from "@/types/compliance.d";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, Bug, Droplets } from "lucide-react"; // Icons

export const CropManagementSection = () => {
  const data: CropManagementData = sampleCropManagementData;

  if (!data) {
    return <div>Loading crop management data...</div>;
  }

  // Common chart settings
  const chartMargin = { top: 5, right: 20, left: 10, bottom: 5 };
  const tickStyle = { fontSize: 10 };

  return (
    <div className="space-y-6">
      {/* Fertilizer Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Fertilizer Management
          </CardTitle>
          {/* Potential actions/links can go here */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fertilizer Usage Trend */}
            <div>
              <p className="text-sm font-medium mb-2">Usage Trends</p>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.fertilizer.usage_trend} margin={chartMargin}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={tickStyle} />
                    <YAxis tick={tickStyle} label={{ value: "kg/hectare", angle: -90, position: 'insideLeft', style: {fontSize: '10px'}, dx: -5}} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} name="Usage" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Fertilizer Efficiency */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium mb-2">Efficiency Rating</p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Current Efficiency</span>
                <span className="text-lg font-semibold">{data.fertilizer.efficiency_rating}%</span>
              </div>
              <Progress value={data.fertilizer.efficiency_rating} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pest Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Bug className="w-5 h-5 text-red-600" />
            Pest Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pest Incidents Chart */}
            <div>
              <p className="text-sm font-medium mb-2">Pest Incidents</p>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.pest_management.incidents_trend} margin={chartMargin}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={tickStyle} />
                    <YAxis tick={tickStyle} label={{ value: "Incidents", angle: -90, position: 'insideLeft', style: {fontSize: '10px'}, dx: -5}}/>
                    <Tooltip />
                    <Bar dataKey="value" fill="#dc2626" name="Incidents" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Pest Control Effectiveness */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium mb-2">Control Effectiveness</p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Current Effectiveness</span>
                <span className="text-lg font-semibold">{data.pest_management.effectiveness}%</span>
              </div>
              <Progress value={data.pest_management.effectiveness} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Irrigation Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            Irrigation Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Irrigation Usage Trend */}
            <div>
              <p className="text-sm font-medium mb-2">Water Usage</p>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.irrigation.usage_trend} margin={chartMargin}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={tickStyle} />
                    <YAxis tick={tickStyle} label={{ value: "Liters/hectare", angle: -90, position: 'insideLeft', style: {fontSize: '10px'}, dx: -15}}/>
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Usage"/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Irrigation Efficiency */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium mb-2">Irrigation Efficiency</p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Current Efficiency</span>
                <span className="text-lg font-semibold">{data.irrigation.efficiency}%</span>
              </div>
              <Progress value={data.irrigation.efficiency} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 