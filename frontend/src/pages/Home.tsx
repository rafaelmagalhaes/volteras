import { useEffect, useState } from 'react';
import { fetchVehiclesList } from '@/api/vehicles.ts';

import { VehicleTable } from '@/components/Vehicles/Table.tsx';
import { Card, CardContent } from '@/components/Card.tsx';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState('');
  const getVehicles = async () => {
    setLoading(true);
    await fetchVehiclesList({ offset, limit, vehicle_id: vehicleId }).then((res) => {
      setTotalItems(res.totalCount);
      setVehicles(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getVehicles();
  }, [offset, limit, vehicleId]);

  const handlePageChange = (page: number) => {
    const newOffset = page * limit - limit;
    setOffset(newOffset);
  };
  const handleRowChange = (newPerPage: number, page: number) => {
    const newOffset = page * limit - limit;
    setLimit(newPerPage);
    setOffset(newOffset);
  };
  const handleVehicleIdChange = (vehicleId: string) => {
    setVehicleId(vehicleId);
    setOffset(0);
    setLimit(10);
  };

  return (
    <>
      <VehicleTable
        vehicles={vehicles}
        loading={loading}
        totalItems={totalItems}
        handlePageChange={handlePageChange}
        handleRowChange={handleRowChange}
        handleVehicleIdChange={handleVehicleIdChange}
      />
    </>
  );
}

export default Home;
