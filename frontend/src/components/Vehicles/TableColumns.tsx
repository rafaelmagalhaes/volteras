import { VehiclesTypes } from '@/types/vehicles.types.ts';
import { formatDate } from '@/helpers/dateFormater.ts';

export const VehicleColumns = [
  {
    id: 'vehicle_id',
    name: 'Vehicle Id',
    selector: (row: VehiclesTypes) => row.vehicle_id,
    grow: 3
  },
  {
    id: 'timestamp',
    name: 'Timestamp',
    selector: (row: VehiclesTypes) => row.timestamp,
    cell: (row: VehiclesTypes) => <div>{formatDate(row.timestamp)}</div>,
    sortable: true,
    grow: 2
  },
  {
    id: 'speed',
    name: 'Speed km/h',
    selector: (row: VehiclesTypes) => row.speed,
    cell: (row: VehiclesTypes) => (
      <div>
        {row.speed === 'NULL' || row.speed === null ? <span>0</span> : <span>{row.speed}</span>}
      </div>
    ),
    sortable: true
  },
  {
    id: 'odometer',
    name: 'Odometer Km',
    selector: (row: VehiclesTypes) => row.odometer,
    sortable: true
  },
  {
    id: 'soc',
    name: 'State of charge',
    selector: (row: VehiclesTypes) => row.soc,
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row: VehiclesTypes) => row.soc > 60,
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'white'
        }
      },
      {
        when: (row: VehiclesTypes) => row.soc > 20 && row.soc < 60,
        style: {
          backgroundColor: 'rgba(247,128,14,0.9)',
          color: 'white'
        }
      },
      {
        when: (row: VehiclesTypes) => row.soc <= 20,
        style: {
          backgroundColor: 'rgba(255,0,0,0.9)',
          color: 'white'
        }
      }
    ]
  },
  {
    id: 'elevation',
    name: ' Elevation of the vehicle',
    selector: (row: VehiclesTypes) => row.elevation,
    sortable: true
  },
  {
    id: 'shift_state',
    name: 'Current gear',
    selector: (row: VehiclesTypes) => row.shift_state,
    cell: (row: VehiclesTypes) => (
      <div>
        {row.shift_state === 'NULL' || row.speed === null ? (
          <span>N</span>
        ) : (
          <span>{row.shift_state}</span>
        )}
      </div>
    ),

    sortable: true
  }
];
