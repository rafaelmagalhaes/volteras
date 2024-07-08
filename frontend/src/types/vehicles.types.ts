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

export type VehicleListPayload = {
  limit?: number;
  offset?: number;
  vehicle_id?: string;
};
