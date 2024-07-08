import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card.tsx';
import DataTable from 'react-data-table-component';
import { VehicleColumns } from '@/components/Vehicles/TableColumns.tsx';
import { useMemo } from 'react';
import { Export } from '@/components/Export.tsx';
import { downloadCSV } from '@/helpers/csvConverter.ts';
import { VehiclesTypes } from '@/types/vehicles.types.ts';

interface VehicleTableProps {
  loading: boolean;
  vehicles: VehiclesTypes[];
  totalItems: number;
  handlePageChange: () => void;
  handleRowChange: () => void;
}

export const VehicleTable = ({
  loading,
  vehicles,
  totalItems,
  handlePageChange,
  handleRowChange
}: VehicleTableProps) => {
  const columns = VehicleColumns;
  const paginationComponentOptions = {
    rowsPerPageText: 'Rows per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true
  };

  const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(vehicles)} />, [vehicles]);
  // todo display message when data is empty
  // todo when there's an error
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
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
        </CardContent>
      </Card>
    </>
  );
};
