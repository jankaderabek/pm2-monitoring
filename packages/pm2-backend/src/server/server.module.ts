import {HttpModule, Module} from '@nestjs/common';
import { ServerController } from './server.controller';
import { ProcessController } from './process/process.controller';
import { ProcessRecordsUpdater } from './process/process-records-updater.service';
import {ScheduleModule} from "@nestjs/schedule";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Server} from "./entities/server.entity";
import {DefaultAdminModule, DefaultAdminSite} from "nestjs-admin";
import {ProcessRecord} from "./entities/process.record.entity";

@Module({
  imports: [
    DefaultAdminModule,
    ScheduleModule.forRoot(),
    HttpModule,
    TypeOrmModule.forFeature([Server, ProcessRecord])
  ],
  controllers: [ServerController, ProcessController],
  providers: [ProcessRecordsUpdater]
})
export class ServerModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('Server', Server)
  }
}
