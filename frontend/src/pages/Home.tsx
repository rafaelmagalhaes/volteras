import viteLogo from '../../public/vite.svg';
import reactLogo from '../assets/react.svg';
import { useEffect, useState } from 'react';
import { fetchVehiclesList } from '@/api/vehicles.ts';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const getVehicles = async () => {
    await fetchVehiclesList({ offset, limit }).then((res) => {
      setTotalItems(res.totalCount);
      setVehicles(res.data);
    });
  };

  useEffect(() => {
    getVehicles();
  }, [offset]);

  const nextPage = (paginationModel: GridPaginationModel) => {
    console.log('=>(Home.tsx:26) paginationModel', paginationModel);
    setPageNumber(paginationModel.page);
    const newOffset = (paginationModel.page + 1) * limit - limit;
    console.log('=>(Home.tsx:29) newOffset', newOffset);
    setOffset(newOffset);
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'vehicle_id', headerName: 'Vehicle Id' },
    { field: 'timestamp', headerName: 'Timestamp' },
    {
      field: 'speed',
      headerName: 'Speed km/h',
      type: 'number'
    },
    {
      field: 'odometer',
      headerName: 'Odometer Km',
      type: 'number'
    },
    {
      field: 'soc',
      headerName: 'State of charge',
      type: 'number'
    },
    {
      field: 'elevation',
      headerName: ' Elevation of the vehicle',
      description: ' Elevation of the vehicle represented in metres',
      type: 'number'
    },
    {
      field: 'shift_state',
      headerName: 'Current gear',
      type: 'number'
    }
  ];

  return (
    <>
      <div style={{ width: '100%' }}>
        {vehicles.length > 0 && (
          <DataGrid
            rows={vehicles}
            columns={columns}
            rowCount={totalItems}
            paginationMode="server"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: limit }
              }
            }}
            onPaginationModelChange={nextPage}
          />
        )}
      </div>
    </>
  );
}

export default Home;
