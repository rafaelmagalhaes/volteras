import { z, ZodError } from 'zod';
import { vehicleDataTable } from '~~/schema/vehicle';
import { sendError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const headers = getRequestHeaders(event);
  const token = headers['token'];
  const { db } = event.context;
  if (!token) {
    return createError({
      status: 400,
      message: 'Missing header token',
      statusMessage: 'Bad request'
    });
  }
  if (token === '123') {
    const insertSchema = z.object({
      vehicle_id: z.string().uuid(),
      timestamp: z.string().datetime(),
      speed: z.number().nullable(),
      odometer: z.number(),
      soc: z.number(),
      elevation: z.number(),
      shift_state: z.string().nullable()
    });
    try {
      const newVehicle = insertSchema.parse(body);
      await db.insert(vehicleDataTable).values(newVehicle);
      setResponseStatus(event, 201);
      return newVehicle;
    } catch (error: ZodError | any) {
      return sendError(event, {
        name: '400 Bad request',
        statusCode: 400,
        statusMessage: 'Bad request',
        message: 'Bad request',
        data: error
      });
    }
  } else {
    return createError({
      status: 401,
      message: 'Unauthorised request',
      statusMessage: 'Unauthorised'
    });
  }
});
