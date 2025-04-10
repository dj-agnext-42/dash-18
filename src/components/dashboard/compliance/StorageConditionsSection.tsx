"use client";

import { sampleStorageConditionsData } from "@/data/complianceSampleData";
import { StorageConditionsData } from "@/types/compliance";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Thermometer, Waves } from "lucide-react"; // Icons

export const StorageConditionsSection = () => {
  const data: StorageConditionsData = sampleStorageConditionsData;

  if (!data) {
    return <div>Loading storage conditions data...</div>;
  }

  // Helper to calculate progress bar value (0-100) based on current value and range string
  const calculateProgress = (current: number, range: string): number => {
    const matches = range.match(/(\d+(\.\d+)?)\s*°?C?\s*-\s*(\d+(\.\d+)?)\s*°?C?|(\d+(\.\d+)?)\s*%/);
    if (!matches) return 50; // Default or error case

    let min: number, max: number;
    if (matches[5]) { // Humidity match (%)
      min = 80; // Assuming fixed range based on image
      max = 90;
    }
    else if (matches[1] && matches[3]){ // Temperature match (°C)
        min = parseFloat(matches[1]);
        max = parseFloat(matches[3]);
    }
    else return 50;


    if (current <= min) return 0;
    if (current >= max) return 100;
    return ((current - min) / (max - min)) * 100;
  };

  const temperatureProgress = calculateProgress(data.current_temperature, data.temperature_range);
  const humidityProgress = calculateProgress(data.current_humidity, data.humidity_range);

  return (
    <div className="space-y-6">
      {/* Current Conditions & History Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-red-500" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{data.current_temperature}°C</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {data.temperature_range}
              </span>
            </div>
            <Progress value={temperatureProgress} className="h-2 mb-4" />
            <p className="text-sm font-medium mb-2">Temperature History</p>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.temperature_history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Temp (°C)"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Humidity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Waves className="w-5 h-5 text-blue-500" />
              Humidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{data.current_humidity}%</span>
               <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {data.humidity_range}
              </span>
            </div>
            <Progress value={humidityProgress} className="h-2 mb-4" />
            <p className="text-sm font-medium mb-2">Humidity History</p>
             <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.humidity_history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Humidity (%)"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quality Checks Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Quality Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.quality_checks.map((check, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold">{check.time}</p>
                  <p className="text-xs text-gray-500">{check.notes}</p>
                </div>
                <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${check.status === 'Passed' ? 'bg-green-100 text-green-800' : check.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 