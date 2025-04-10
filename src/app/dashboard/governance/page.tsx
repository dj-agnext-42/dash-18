"use client";

import { Card } from "@/components/ui/card";
import { RejectionRateChart } from "@/components/dashboard/governance/RejectionRateChart";
import { QualityTestsPieChart } from "@/components/dashboard/governance/QualityTestsPieChart";
import { ComplianceProgress } from "@/components/dashboard/governance/ComplianceProgress";
import { PhysicalMetricsTable } from "@/components/dashboard/governance/PhysicalMetricsTable";
import { DateRangePicker } from "@/components/dashboard/governance/DateRangePicker";

export default function GovernanceDashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Governance Dashboard</h1>
        <DateRangePicker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Rejection Rate Trends</h2>
          <RejectionRateChart />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quality Test Results</h2>
          <QualityTestsPieChart />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Compliance Documentation</h2>
          <ComplianceProgress />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Physical Quality Metrics</h2>
          <PhysicalMetricsTable />
        </Card>
      </div>
    </div>
  );
} 