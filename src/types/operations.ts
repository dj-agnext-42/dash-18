export type TransportPhase = 'Farm to Packhouse' | 'Packhouse to Cold Storage' | 'Cold Storage to Port';

export type ShipmentStatus = 'In Transit' | 'Delivered' | 'Delayed';

export interface Shipment {
  id: string;
  phase: TransportPhase;
  status: ShipmentStatus;
  departureTime: string;
  arrivalTime: string;
  quantityLoaded: number;
  quantityReceived: number;
  temperature: number;
  condition: {
    damage: boolean;
    notes: string;
  };
}

export interface ShipmentFilter {
  phase?: TransportPhase;
  shipmentId?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
} 