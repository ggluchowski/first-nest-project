import { dbVariable } from './var';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: dbVariable.userDB,
  password: dbVariable.userDBPassword,
  database: 'shop',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  autoLoadEntities: true, //zmienione
  synchronize: false, // przy produkcji powinno byc na false
  dropSchema: false,
  migrationsRun: false,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  subscribers: [__dirname + '/db/subscribers/*{.ts,.js}'],
};
