import {Controller, Get} from '@nestjs/common';
import {Server} from "./entities/server.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Controller('servers')
export class ServerController {

  constructor(
    @InjectRepository(Server)
    private readonly serverRepository: Repository<Server>
  ) {
  }

  @Get()
  async findAll(): Promise<Server[]> {
    return await this.serverRepository.find()
  }
}
