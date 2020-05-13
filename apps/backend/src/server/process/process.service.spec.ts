import { Test, TestingModule } from '@nestjs/testing';
import { ProcessRecordsUpdater } from './process-records-updater.service';

describe('ProcessService', () => {
  let service: ProcessRecordsUpdater;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessRecordsUpdater],
    }).compile();

    service = module.get<ProcessRecordsUpdater>(ProcessRecordsUpdater);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
