import { serial, text, numeric, char, pgTable, uuid } from 'drizzle-orm/pg-core';
export const vehicleDataTable = pgTable('vehicle_data', {
  id: serial('id').primaryKey(),
  vehicle_id: uuid('vehicle_id'),
  timestamp: text('timestamp'),
  speed: numeric('speed'),
  odometer: numeric('odometer'),
  soc: numeric('soc'),
  elevation: numeric('elevation'),
  shift_state: char('shift_state')
});
