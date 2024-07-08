import { vehicleDataTable } from '~~/schema/vehicle';
import { count, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const { limit, offset, vehicle_id } = getQuery(event);

  const currentLimit = limit ?? 10; // default to 10 if undefined
  const currentOffset = offset ?? 0; // default to 0 if undefined

  try {
    let totalItems;
    let data;
    if (vehicle_id) {
      totalItems = await db
        ?.select({ value: count() })
        .from(vehicleDataTable)
        .where(eq(vehicleDataTable.vehicle_id, vehicle_id as string));
      data = await db
        .select()
        .from(vehicleDataTable)
        .limit(currentLimit)
        .offset(currentOffset)
        .where(eq(vehicleDataTable.vehicle_id, vehicle_id as string));
      if (!data.length) {
        return createError({
          status: 404,
          statusMessage: 'vehicle not found'
        });
      }
    } else {
      totalItems = await db?.select({ value: count() }).from(vehicleDataTable);
      data = await db.select().from(vehicleDataTable).limit(currentLimit).offset(currentOffset);
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
