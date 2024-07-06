export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const { rows } = await db.sql`SELECT * FROM users`;

  return { hello: 'API', rows };
});
