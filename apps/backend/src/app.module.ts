import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ServerModule } from './server/server.module';
import { TypeOrmModule} from "@nestjs/typeorm";

import * as ormconfig from './../ormconfig';
import {DefaultAdminModule} from "nestjs-admin";


@Module({
  imports: [
    DefaultAdminModule,
    InMemoryDBModule.forRoot(),
    ServerModule,
    TypeOrmModule.forRoot(ormconfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
