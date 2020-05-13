import {ConnectionOptions} from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}', 'node_modules/nestjs-admin/**/*.entity.js'],
  migrationsRun: true,
  logging: ["query", "error"],
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

export = config;
