import { VehicleListPayload } from '../types/vehicles.types.ts';

export const fetchVehiclesList = async (payload: VehicleListPayload) => {
  let queryParams = new URLSearchParams();
  // Append parameters if they exist
  if (payload?.limit) queryParams.append('limit', payload?.limit.toString());
  if (payload?.vehicle_id) queryParams.append('vehicle_id', payload?.vehicle_id);
  if (payload.offset && payload.offset >= 0)
    queryParams.append('offset', payload?.offset.toString());

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/vehicles/?${queryParams}`);
    if (!response.ok) {
      throw new Error('Call  was unsuccessful');
    }
    return await response.json();
  } catch (error) {
    console.warn('An error occured while trying to fetch vehicles:', error);
    return false;
  }
};

export const fetchSingleVehicle = async (id: string) => {
  try {
    const response = await fetch(`${import.meta.env.API_URL}/vehicles/${id}`);
    if (!response.ok) {
      throw new Error('Call  was unsuccessful');
    }
    return true;
  } catch (error) {
    console.warn('An error occured while trying to fetch vehicles:', error);
    return false;
  }
};
