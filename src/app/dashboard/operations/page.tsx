"use client";

import { Card } from "@/components/ui/card";
import { TransitTimeChart } from "@/components/dashboard/operations/TransitTimeChart";
import { QuantityComparisonChart } from "@/components/dashboard/operations/QuantityComparisonChart";
import { TemperatureGauge } from "@/components/dashboard/operations/TemperatureGauge";
import { ShipmentCondition } from "@/components/dashboard/operations/ShipmentCondition";
import { ShipmentFilter } from "@/components/dashboard/operations/ShipmentFilter";

export default function OperationsDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Agency Operations Dashboard</h1>
      
      <ShipmentFilter />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Transit Time Tracking</h2>
          <TransitTimeChart />
        </Card>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quantity Loaded vs Received</h2>
          <QuantityComparisonChart />
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Temperature Monitoring</h2>
          <TemperatureGauge />
        </Card>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Shipment Condition</h2>
          <ShipmentCondition />
        </Card>
      </div>
    </div>
  );
} 