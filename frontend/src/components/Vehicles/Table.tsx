import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card.tsx';
import DataTable from 'react-data-table-component';
import { VehicleColumns } from '@/components/Vehicles/TableColumns.tsx';
import React, { useMemo, useState } from 'react';
import { Export } from '@/components/Export.tsx';
import { downloadCSV } from '@/helpers/csvConverter.ts';
import { TimeStampType, VehicleFilters, VehiclesTypes } from '@/types/vehicles.types.ts';
import { Input } from '@/components/Input.tsx';
import { Button } from '@/components/Button.tsx';
import { z, ZodIssue } from 'zod';
import { DatePickerWithRange } from '@/components/DatePickerRange.tsx';
interface VehicleTableProps {
  loading: boolean;
  vehicles: VehiclesTypes[];
  totalItems: number | undefined;
  handlePageChange: (page: number) => void;
  handleRowChange: (newPerPage: number, page: number) => void;
  handleFilterChanges: (filter: VehicleFilters) => void;
}

export const VehicleTable = ({
  loading,
  vehicles,
  totalItems,
  handlePageChange,
  handleRowChange,
  handleFilterChanges
}: VehicleTableProps) => {
  const [validationError, setValidationError] = useState<ZodIssue | null>(null);
  const [vehicleId, setVehicleId] = useState('');
  const [timestamp, setTimestamp] = useState<TimeStampType | undefined>({
    from: undefined,
    to: undefined
  });
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

  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const updateFilter = () => {
    handleFilterChanges({ vehicleId, timestamp });
  };
  const clearFilter = () => {
    setVehicleId('');
    setValidationError(null);
    setTimestamp({
      from: undefined,
      to: undefined
    });
    handleFilterChanges({ reset: true });
  };
  const handleTimestampChange = (date: TimeStampType | undefined) => {
    setTimestamp(date);
  };
  const customSort = (rows: VehiclesTypes[], selector: any, direction: string) => {
    return rows.sort((rowA, rowB): any => {
      const aField = selector(rowA);
      const bField = selector(rowB);
      if (direction === 'asc') {
        return aField - bField;
      }
      if (direction === 'desc') {
        return bField - aField;
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="sm:flex w-full max-w-screen-lg items-center sm:space-x-2 sm:space-y-0 space-y-2 mb-4">
            <Input
              id="vehicle_id"
              placeholder="Search by vehicle id"
              onChange={handleInputChanges}
              value={vehicleId}
              className={validationError ? 'border-rose-500 sm:w-50 sm:mr-2' : 'sm:w-50 sm:mr-2'}
            />
            <DatePickerWithRange
              className="w-[100%] sm:w-[300px]"
              label="Filter by timeStamp"
              handleTimestampChange={handleTimestampChange}
            />
            <Button
              className="float-left sm:float-none"
              variant="outline"
              disabled={!!validationError?.message}
              onClick={updateFilter}>
              Filter
            </Button>
            <Button
              className="float-left sm:float-none ml-2"
              variant="outline"
              onClick={clearFilter}>
              Clear Filter
            </Button>
          </div>
          <small className="text-left block text-xs text-rose-500">
            {validationError && validationError.message}
          </small>

          <DataTable
            sortFunction={customSort}
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
