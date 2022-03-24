import { dbVariable } from './var';

export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: dbVariable.userDB,
  password: dbVariable.userDBPassword,
  database: 'shop',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: false, // przy produkcji powinno byc na false
  autoLoadEntities: true, //zmienione
  dropSchema: false,
  migrationsRun: true,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
};
