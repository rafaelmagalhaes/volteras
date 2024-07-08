export type VehiclesTypes = {
  id: number;
  vehicle_id: string;
  timestamp: string;
  speed: number | string;
  odometer: number;
  soc: number;
  elevation: number;
  shift_state: number | string;
};
export type TimeStampType = {
  from: Date | undefined;
  to: Date | undefined;
};
export type VehicleListPayload = {
  limit?: number;
  offset?: number;
  vehicle_id?: string;
  timestamp: TimeStampType | undefined;
};

export type VehicleFilters = {
  vehicleId?: string;
  reset?: boolean;
  timestamp?: TimeStampType | undefined;
};
