/* eslint-disable no-console */
import { Connection, createConnection } from 'typeorm';

export default class BDConnection {
  private static con: Connection;

  static getConnection(): Connection {
    if (!BDConnection.con) throw new Error('Connection is not established');
    return BDConnection.con;
  }

  static async start() {
    console.log(`Connecting to ${process.env.DB_HOST}:${process.env.DB_PORT}...`);
    BDConnection.con = await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.BD_NAME,
      synchronize: true,
      logging: false,
      entities: ['src/domain/model/**.ts'],
      migrations: ['src/domain/migrations/*.ts'],
    });
    console.log(`Connected to ${process.env.DB_HOST}:${process.env.DB_PORT}...`);
  }
}
