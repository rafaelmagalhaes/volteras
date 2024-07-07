import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

export default defineNitroPlugin((nitro) => {
  const user = process.env.DB_USER;
  const pwd = process.env.DB_PWD;
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;
  const client = postgres(`postgres://${user}:${pwd}@${dbHost}:${dbPort}/${dbName}`);

  nitro.hooks.hook('request', async (event) => {
    event.context.db = drizzle(client);
  });
});
