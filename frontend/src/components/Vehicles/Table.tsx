import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card.tsx';
import DataTable from 'react-data-table-component';
import { VehicleColumns } from '@/components/Vehicles/TableColumns.tsx';
import { useMemo, useState } from 'react';
import { Export } from '@/components/Export.tsx';
import { downloadCSV } from '@/helpers/csvConverter.ts';
import { VehiclesTypes } from '@/types/vehicles.types.ts';
import { Input } from '@/components/Input.tsx';
import { Button } from '@/components/Button.tsx';
import { z } from 'zod';
interface VehicleTableProps {
  loading: boolean;
  vehicles: VehiclesTypes[];
  totalItems: number;
  handlePageChange: () => void;
  handleRowChange: () => void;
  handleVehicleIdChange: () => void;
}

export const VehicleTable = ({
  loading,
  vehicles,
  totalItems,
  handlePageChange,
  handleRowChange,
  handleVehicleIdChange
}: VehicleTableProps) => {
  const [validationError, setValidationError] = useState(null);
  const [vehicleId, setVehicleId] = useState('');
  const columns = useMemo(() => VehicleColumns, []);
  const paginationComponentOptions = {
    rowsPerPageText: 'Rows per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true
  };

  const filterSchema = z.object({
    vehicle_id: z.string().uuid({
      message: 'Must be a valid uuid'
    })
  });

  const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(vehicles)} />, [vehicles]);
  // todo display message when data is empty
  // todo when there's an error

  const handleInputChanges = (event) => {
    const vehicle_id = event.target.value;
    if (vehicle_id === '') {
      setValidationError(null);
    } else {
      const { success, error } = filterSchema.safeParse({ vehicle_id });
      if (error) {
        setValidationError(error.issues[0]);
      }
      if (success) {
        setValidationError(null);
        setVehicleId(vehicle_id);
      }
    }
  };

  const clearFilter = () => {
    setVehicleId('');
    setValidationError(null);
    handleVehicleIdChange('');
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            <Input
              id="vehicle_id"
              placeholder="Search by vehicle id"
              onChange={handleInputChanges}
              value={vehicleId}
              className={validationError ? 'border-rose-500' : ''}
            />
            <Button
              variant="outline"
              disabled={validationError || !vehicleId}
              onClick={() => handleVehicleIdChange(vehicleId)}>
              Filter
            </Button>
            <Button variant="outline" disabled={!vehicleId} onClick={clearFilter}>
              Clear Filter
            </Button>
          </div>
          <small className=" text-left block text-xs text-rose-500">
            {validationError && validationError.message}
          </small>

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
