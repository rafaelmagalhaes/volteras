import { useEffect, useState } from 'react';
import { fetchVehiclesList } from '@/api/vehicles.ts';
import { VehicleTable } from '@/components/Vehicles/Table.tsx';
import { TimeStampType, VehicleFilters } from '@/types/vehicles.types.ts';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState('');
  const [timestamp, setTimestamp] = useState<TimeStampType | undefined>({
    from: undefined,
    to: undefined
  });
  const getVehicles = async () => {
    setLoading(true);
    await fetchVehiclesList({ offset, limit, vehicle_id: vehicleId, timestamp }).then((res) => {
      setTotalItems(res.totalCount);
      setVehicles(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getVehicles();
  }, [offset, limit, vehicleId, timestamp]);

  const handlePageChange = (page: number) => {
    const newOffset = page * limit - limit;
    setOffset(newOffset);
  };
  const handleRowChange = (newPerPage: number, page: number) => {
    const newOffset = page * limit - limit;
    setLimit(newPerPage);
    setOffset(newOffset);
  };
  const handleFilterChanges = ({ vehicleId, reset, timestamp: date }: VehicleFilters) => {
    if (reset) {
      setVehicleId('');
      setTimestamp({
        to: undefined,
        from: undefined
      });
    }
    if (date?.from && date?.to) {
      setTimestamp(date);
    }
    if (vehicleId !== '') {
      setVehicleId(vehicleId as string);
    }
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
        handleFilterChanges={handleFilterChanges}
      />
    </>
  );
}

export default Home;
