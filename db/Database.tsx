import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager
} from 'typeorm';
import { Item } from '../entity/Item';

/**
 * Database manager class
 */
export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = `default`;

    let connection: Connection;

    if (!this.connectionManager.has(CONNECTION_NAME)) {
      const connectionOptions: ConnectionOptions = {
        name: CONNECTION_NAME,
        type: `postgres`,
        port: 5432,
        synchronize: true,
        logging: true,
        database: 'ronstoys',
        entities: [Item]
      };

      connection = this.connectionManager.create(connectionOptions);
    } else {
      console.info(`Database.getConnection()-using existing connection ...`);
      connection = this.connectionManager.get(CONNECTION_NAME);
    }

    if (!connection.isConnected) {
      connection = await connection.connect();
    }

    return connection;
  }
}
