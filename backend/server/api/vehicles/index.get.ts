import { vehicleDataTable } from '~~/schema/vehicle';
import { count, eq, between } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const { limit, offset, vehicle_id, initialTimestamp, finalTimestamp } = getQuery(event);

  const currentLimit = limit ?? 10; // default to 10 if undefined
  const currentOffset = offset ?? 0; // default to 0 if undefined

  try {
    let totalItems = await db?.select({ value: count() }).from(vehicleDataTable);
    let data = await db.select().from(vehicleDataTable).limit(currentLimit).offset(currentOffset);

    if (vehicle_id) {
      totalItems = await db
        ?.select({ value: count() })
        .from(vehicleDataTable)
        .where(eq(vehicleDataTable.vehicle_id, vehicle_id as string));
      if (totalItems[0].value === 0) {
        return createError({
          status: 404,
          statusMessage: 'vehicle not found'
        });
      }
      data = await db
        .select()
        .from(vehicleDataTable)
        .limit(currentLimit)
        .offset(currentOffset)
        .where(eq(vehicleDataTable.vehicle_id, vehicle_id as string));
    }
    if (initialTimestamp && finalTimestamp) {
      const initial = new Date(initialTimestamp as string);
      const final = new Date(finalTimestamp as string);
      totalItems = await db
        .select({ value: count() })
        .from(vehicleDataTable)
        .where(between(vehicleDataTable.timestamp, initial, final));
      data = await db
        .select()
        .from(vehicleDataTable)
        .limit(currentLimit)
        .offset(currentOffset)
        .where(between(vehicleDataTable.timestamp, initial, final));
    }

    return { totalCount: totalItems[0].value, limit: currentLimit, offset: currentOffset, data };
  } catch (e) {
    throw createError({
      status: 500,
      statusMessage: 'Internal Error',
      message: e
    });
  }
});
