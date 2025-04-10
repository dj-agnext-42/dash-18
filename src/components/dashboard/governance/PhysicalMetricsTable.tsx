"use client";

import { samplePhysicalMetrics } from "@/data/governanceSampleData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";

export const PhysicalMetricsTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">Threshold</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {samplePhysicalMetrics.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell className="font-medium">{metric.metric}</TableCell>
              <TableCell className="text-right">
                {metric.value}
                {metric.unit}
              </TableCell>
              <TableCell className="text-right">
                {metric.threshold}
                {metric.unit}
              </TableCell>
              <TableCell className="text-center">
                {metric.status === "within_range" ? (
                  <CheckCircle className="inline w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="inline w-5 h-5 text-red-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 