import { ConnectionConfig, connect } from 'mysqldriver';

export function connectDB() {
  let port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
  let config: ConnectionConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port,
    multipleStatements: true,
  };
  return connect(config);
}
