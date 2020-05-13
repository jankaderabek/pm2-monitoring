import { Test, TestingModule } from '@nestjs/testing';
import { ServerController } from './server.controller';
import {Repository} from "typeorm";
import {Server} from "./entities/server.entity";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('Server Controller', () => {
  let controller: ServerController;
  const serverRepository = new Repository<Server>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Server),
          useClass: Repository,
        },
      ],
      controllers: [ServerController],
    }).compile();

    controller = new ServerController(serverRepository)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it ('should return an array of cats', async () => {
      const result: Server[] = [{
        id: 1,
        name: 'local',
        ip: '127.0.0.1'
      }];

      jest.spyOn(serverRepository, 'find').mockReturnValue(Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });
});
