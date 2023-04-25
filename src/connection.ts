import { createConnection, Connection } from 'typeorm';

export const connectDatabase = async (): Promise<Connection> => {
  const connection = await createConnection();
  return connection;
};
