import {Get, HttpService, Injectable} from '@nestjs/common';
import {Interval} from "@nestjs/schedule";
import {InjectRepository} from "@nestjs/typeorm";
import {Server} from "../entities/server.entity";
import {Repository} from "typeorm";
import {ProcessRecord} from "../entities/process.record.entity"
import * as moment from 'moment'

@Injectable()
export class ProcessRecordsUpdater {

  constructor(
    @InjectRepository(Server)
    private readonly serverRepository: Repository<Server>,
    @InjectRepository(ProcessRecord)
    private readonly processRecordRepository: Repository<ProcessRecord>,
    private httpService: HttpService
  ) {}

  @Interval(5000)
  async detail () {
    const servers = await this.serverRepository.find()

    for (const server of servers) {
      let response

      try {
        response = await this.httpService.get(`http://${server.ip}:3004/pm2`).toPromise()
      } catch (e) {
        console.log('Error when fetching data from server')

        return
      }

      for (const process of response.data) {
        const processRecord = new ProcessRecord()
        processRecord.name = process.name
        processRecord.status = process.pm2_env.status
        processRecord.server = server

        await this.processRecordRepository.save(processRecord)
      }
    }
  }

  @Interval(10000)
  async deleteOld () {
    const deleteFrom = moment().utc().subtract(5, 'minutes')

    const records = await this.processRecordRepository.createQueryBuilder('ProcessRecord')
      .where('ProcessRecord.timestamp < :time', { time: deleteFrom.format('Y-MM-DD HH:mm:ss') })
      .getMany()

    records.forEach(oldRecord => {
      this.processRecordRepository.remove(oldRecord);
    });
  }

}
