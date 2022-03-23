import { dbVariable } from './var';

export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: dbVariable.userDB,
  password: dbVariable.userDBPassword,
  database: 'shop',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: true, // przy produkcji powinno byc na false
};
