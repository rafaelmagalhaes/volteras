import { vehicleDataTable } from '~~/schema/vehicle';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const id = getRouterParam(event, 'id');
  try {
    const data = await db
      .select()
      .from(vehicleDataTable)
      .where(eq(vehicleDataTable.id, parseInt(id)));
    if (!data.length) {
      return { status: 200, message: 'No vehicle found' };
    }
    return data[0];
  } catch (e) {
    throw createError({
      status: 500,
      statusMessage: 'Internal Error',
      message: e
    });
  }
});