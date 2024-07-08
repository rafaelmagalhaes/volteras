import { useEffect, useMemo, useState } from 'react';
import { fetchVehiclesList } from '@/api/vehicles.ts';
import DataTable from 'react-data-table-component';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
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

  const handlePageChange = (page) => {
    setPageNumber(page);
    const newOffset = page * limit - limit;
    setOffset(newOffset);
  };
  const handleRowChange = (newPerPage, page) => {
    console.log('=>(Home.tsx:33) newPerPage,page', newPerPage, page);
    setPageNumber(page);
    const newOffset = page * limit - limit;
    setLimit(newPerPage);
    setOffset(newOffset);
  };
  const columns = [
    { id: 'id', name: 'ID', selector: (row) => row.id },
    { id: 'vehicle_id', name: 'Vehicle Id', selector: (row) => row.vehicle_id },
    { id: 'timestamp', name: 'Timestamp', selector: (row) => row.timestamp, sortable: true },
    {
      id: 'speed',
      name: 'Speed km/h',
      selector: (row) => row.speed,
      sortable: true
    },
    {
      id: 'odometer',
      name: 'Odometer Km',
      selector: (row) => row.odometer,
      sortable: true
    },
    {
      id: 'soc',
      name: 'State of charge',
      selector: (row) => row.soc,
      sortable: true
    },
    {
      id: 'elevation',
      name: ' Elevation of the vehicle',
      selector: (row) => row.elevation,
      sortable: true
    },
    {
      id: 'shift_state',
      name: 'Current gear',
      selector: (row) => row.shift_state,
      sortable: true
    }
  ];
  const paginationComponentOptions = {
    rowsPerPageText: 'Rows per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true
  };
  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(vehicles[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <button onClick={(e) => onExport(e.target.value)}>Export</button>
  );
  const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(vehicles)} />, [vehicles]);

  return (
    <>
      <div style={{ width: '100%' }}>
        {vehicles.length > 0 && (
          <DataTable
            title="Vehicles"
            progressPending={loading}
            data={vehicles}
            columns={columns}
            fixedHeader={true}
            pagination
            paginationServer
            paginationTotalRows={totalItems}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowChange}
            paginationComponentOptions={paginationComponentOptions}
            actions={actionsMemo}
          />
        )}
      </div>
    </>
  );
}

export default Home;
