import {Controller, Get, HttpService} from '@nestjs/common';
import {map} from "rxjs/operators";
import {InMemoryDBService} from "@nestjs-addons/in-memory-db";
import {InjectRepository} from "@nestjs/typeorm";
import {ProcessRecord} from "../entities/process.record.entity";
import {Repository} from "typeorm";

@Controller('process')
export class ProcessController {

  constructor(
    private httpService: HttpService,
    @InjectRepository(ProcessRecord)
    private readonly processRecordRepository: Repository<ProcessRecord>,
  ) {}

  @Get()
  async detail () {
    return  this.httpService.get('http://localhost:3004/pm2').pipe(
      map(response => response.data)
    )
  }

  @Get('/list')
  async list () {
    return this.processRecordRepository.find()
  }

  @Get('/actual')
  async actual () {
    return this.processRecordRepository.findOne({
      order: {
        id: "DESC"
      }
    })
  }
}
