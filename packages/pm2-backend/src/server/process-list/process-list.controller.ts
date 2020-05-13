import {Controller, Get, HttpService} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProcessRecord} from "../entities/process.record.entity";
import {Repository} from "typeorm";
import {Server} from "../entities/server.entity";

@Controller('/servers/process-list')
export class ProcessListController {

  constructor(
    private httpService: HttpService,
    @InjectRepository(ProcessRecord)
    private readonly processRecordRepository: Repository<ProcessRecord>,
    @InjectRepository(Server)
    private readonly serverRepository: Repository<Server>,
  ) {}


  @Get()
  async list () {
    const servers = await this.serverRepository.find()
    const serversResponse = [];

    for (const server of servers) {
      const processes = await this.processRecordRepository.createQueryBuilder()
        .where('ProcessRecord.server = :server', { server: server.id })
        .orderBy('ProcessRecord.id', 'DESC')
        .groupBy('ProcessRecord.name')
        .having('MAX(ProcessRecord.id)')
        .getMany().then()

      serversResponse.push({
        id: server.id,
        name: server.name,
        processes
      })
    }

    return serversResponse
  }

}
