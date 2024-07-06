import { createDatabase } from 'db0';
import postgresql from 'db0/connectors/postgresql';

export default defineNitroPlugin((nitro) => {
  const db = createDatabase(
    postgresql({
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    })
  );

  nitro.hooks.hookOnce('request', async (event) => {
    event.context.db = db;
  });
});
