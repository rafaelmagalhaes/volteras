export type VehiclesTypes = {
  id: number;
  vehicle_id: string;
  timestamp: string;
  speed: number;
  odometer: number;
  soc: number;
  elevation: number;
  shift_state: number;
};

export type VehicleListPayload = {
  limit?: number;
  offset?: number;
  vehicle_id?: string;
};
