import { config } from '@config/app';
import * as Mongoose from 'mongoose';
import { logger } from '@core/logger';
import { Connection, createConnection } from 'typeorm';
import { connectionOptions } from '../config/db';

const connectionString = config.database_url;
export class Database {
  private static connection: Mongoose.Connection;

  private static postgresConnect: Connection;

  private static postgresVentoryConnect: Connection;

  static async getConnection(): Promise<Mongoose.Connection> {
    if (!this.connection) {
      logger.info('Start connect database');
      this.connection = await Database.getDBConnect();
      logger.info('Connected to database');
    }

    return this.connection;
  }

  static async getPostgresConnection(): Promise<Connection> {
    if (!this.postgresConnect || !this.postgresConnect.isConnected) {
      logger.info('Start connect postgres database');
      this.postgresConnect = await Database.getPostgresConnect();
      logger.info('Connected to postgres database');
    }

    return this.postgresConnect;
  }

  static async getPostgresVentoryConnection(): Promise<Connection> {
    if (
      !this.postgresVentoryConnect ||
      !this.postgresVentoryConnect.isConnected
    ) {
      logger.info('Start connect postgres database Ventory');
      // this.postgresVentoryConnect = await Database.getPostgresVentoryConnect();
      logger.info('Connected to postgres database Ventory');
    }

    return this.postgresVentoryConnect;
  }

  static async disConnect() {
    if (!this.connection) return;

    await Mongoose.disconnect();
    logger.info('Close DB connection:');
  }

  static async getDBConnect({
    retries = 1,
    maxRetries = 3,
  }: {
    retries?: number;
    maxRetries?: number;
  } = {}): Promise<Mongoose.Connection> {
    try {
      await Mongoose.connect(connectionString);
      this.connection = Mongoose.connection;
      return this.connection;
    } catch (error) {
      if (retries < maxRetries) {
        logger.info('ERROR DB connection:', error);
        logger.info('Retry DB connection times:', retries++);
        return Database.getDBConnect({ retries, maxRetries });
      }

      logger.info('UNHANDLED ERROR DB connection after 3 times');
      throw error;
    }
  }

  static async getPostgresConnect({
    retries = 1,
    maxRetries = 3,
  }: {
    retries?: number;
    maxRetries?: number;
  } = {}): Promise<Connection> {
    try {
      return await createConnection(connectionOptions);
    } catch (error) {
      if (retries < maxRetries) {
        logger.info('ERROR postgres DB connection:', error);
        logger.info('Retry postgres DB connection times:', retries++);
        return Database.getPostgresConnect({ retries, maxRetries });
      }

      logger.info('UNHANDLED ERROR postgres DB connection after 3 times');
      throw error;
    }
  }

  // static async getPostgresVentoryConnect({
  //   retries = 1,
  //   maxRetries = 3,
  // }: {
  //   retries?: number;
  //   maxRetries?: number;
  // } = {}): Promise<Connection> {
  //   try {
  //     return await createConnection(connectionOptionsVentory);
  //   } catch (error) {
  //     if (retries < maxRetries) {
  //       logger.info('ERROR postgres DB Ventory connection:', error);
  //       logger.info('Retry postgres DB Ventory connection times:', retries++);
  //       return Database.getPostgresVentoryConnect({ retries, maxRetries });
  //     }
  //
  //     logger.info(
  //       'UNHANDLED ERROR postgres DB Ventory connection after 3 times',
  //     );
  //     throw error;
  //   }
  // }
}
