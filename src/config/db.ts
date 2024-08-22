import * as entities from "../entities/postgres-entities";
// import * as ventoryEntities from "../entities/ventory-entities";
import * as migrations from "../migrations";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { parse, ConnectionOptions as parseOptions } from "pg-connection-string";
import dotenv from "dotenv";

dotenv.config();

interface CustomOptions extends parseOptions {
  schema: string;
}

const database_url = process.env.DATABASE_URL;
const db = parse(database_url) as CustomOptions;
export const schema = db.schema || "public";
export const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: db.host,
  port: Number(db.port),
  schema: schema,
  database: db.database,
  username: db.user,
  password: db.password,
  entities: Object.values(entities),
  migrations: Object.values(migrations),
  synchronize: true,
  // logging:
  //   process.env.NODE_ENV != 'development' ? ['error'] : ['query', 'error'],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: {
    rejectUnauthorized: false
  },
  extra: {
    // set pool max size to 1
    max: 1,
    //  close idle clients after 1 second
    idleTimeoutMillis: 1000
  }
};

// const database_url_ventory = process.env.DATABASE_URL_VENTORY;
// const db_eth = parse(database_url_ventory) as CustomOptions;
// export const schema_eth = db_eth.schema || 'public';
// export const connectionOptionsVentory: ConnectionOptions = {
//   type: 'postgres',
//   host: db_eth.host,
//   name: 'ventory',
//   port: Number(db_eth.port),
//   schema: schema,
//   database: db_eth.database,
//   username: db_eth.user,
//   password: db_eth.password,
//   entities: Object.values(ventoryEntities),
//   // migrations: Object.values(migrations),
//   // logging:
//   //   process.env.NODE_ENV != 'development' ? ['error'] : ['query', 'error'],
//   namingStrategy: new SnakeNamingStrategy(),
//   extra: {
//     // set pool max size to 1
//     max: 1,
//     //  close idle clients after 1 second
//     idleTimeoutMillis: 1000,
//   },
// };
