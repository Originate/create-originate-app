import { Connection, createConnection } from "typeorm"

export async function initializeDatabase(): Promise<Connection> {
  // Set up database connection pool based on configuration in `ormconfig.js`
  const connection = await createConnection();
  return connection;
}
