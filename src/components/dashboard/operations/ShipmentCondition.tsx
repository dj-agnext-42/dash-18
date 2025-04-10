"use client";

import { sampleShipments } from "@/data/sampleData";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export const ShipmentCondition = () => {
  return (
    <div className="space-y-4">
      {sampleShipments.map((shipment) => (
        <Card key={shipment.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">Shipment {shipment.id}</h3>
              <p className="text-sm text-gray-500">{shipment.phase}</p>
            </div>
            {shipment.condition.damage ? (
              <XCircle className="text-red-500 w-6 h-6" />
            ) : (
              <CheckCircle className="text-green-500 w-6 h-6" />
            )}
          </div>
          <div className="mt-2">
            <p className="text-sm">
              {shipment.condition.notes}
            </p>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Status: <span className="font-medium">{shipment.status}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}; 