import { useEffect, useState } from 'react';
import { fetchVehiclesList } from '@/api/vehicles.ts';

import { VehicleTable } from '@/components/Vehicles/Table.tsx';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const getVehicles = async () => {
    setLoading(true);
    await fetchVehiclesList({ offset, limit }).then((res) => {
      setTotalItems(res.totalCount);
      setVehicles(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getVehicles();
  }, [offset, limit]);

  const handlePageChange = (page: number) => {
    const newOffset = page * limit - limit;
    setOffset(newOffset);
  };
  const handleRowChange = (newPerPage: number, page: number) => {
    const newOffset = page * limit - limit;
    setLimit(newPerPage);
    setOffset(newOffset);
  };

  return (
    <>
      {vehicles.length > 0 && (
        <VehicleTable
          vehicles={vehicles}
          loading={loading}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
          handleRowChange={handleRowChange}
        />
      )}
    </>
  );
}

export default Home;
