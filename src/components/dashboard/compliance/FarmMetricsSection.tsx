"use client";

import { sampleFarmMetrics } from "@/data/complianceSampleData";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface FarmMetricsSectionProps {
  showMaturityOnly?: boolean;
}

export const FarmMetricsSection = ({ showMaturityOnly = false }: FarmMetricsSectionProps) => {
  const radarData = sampleFarmMetrics.map((metric) => ({
    name: `Field ${metric.id.slice(-3)}`,
    "Pest Management": metric.pestManagement.effectiveness,
    "Irrigation": metric.irrigation.efficiency,
    "Maturity": (metric.maturityMetrics.daysToHarvest <= 30 ? 90 : 70),
  }));

  const getMaturityColor = (stage: string) => {
    switch (stage) {
      case "ready":
        return "text-green-500";
      case "mature":
        return "text-yellow-500";
      case "developing":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  if (showMaturityOnly) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleFarmMetrics.map((metric) => (
          <div
            key={metric.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <h3 className="font-medium mb-2">Field {metric.id.slice(-3)}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Stage</span>
                <span className={getMaturityColor(metric.maturityMetrics.stage)}>
                  {metric.maturityMetrics.stage.charAt(0).toUpperCase() +
                    metric.maturityMetrics.stage.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Days to Harvest</span>
                <span>{metric.maturityMetrics.daysToHarvest} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size</span>
                <span>{metric.maturityMetrics.size} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Color</span>
                <span>{metric.maturityMetrics.color}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Metrics"
              dataKey="Pest Management"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
            />
            <Radar
              name="Metrics"
              dataKey="Irrigation"
              stroke="#16a34a"
              fill="#16a34a"
              fillOpacity={0.6}
            />
            <Radar
              name="Metrics"
              dataKey="Maturity"
              stroke="#dc2626"
              fill="#dc2626"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sampleFarmMetrics.map((metric) => (
          <div
            key={metric.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <h3 className="font-medium mb-2">Field {metric.id.slice(-3)}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Fertilizer</span>
                <span>
                  {metric.fertilizer.amount} {metric.fertilizer.unit}/
                  {metric.fertilizer.areaUnit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pest Control</span>
                <span>{metric.pestManagement.effectiveness}% effective</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Irrigation</span>
                <span>{metric.irrigation.efficiency}% efficient</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 