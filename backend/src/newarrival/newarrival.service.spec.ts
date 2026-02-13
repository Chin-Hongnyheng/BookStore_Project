import { Test, TestingModule } from '@nestjs/testing';
import { NewarrivalService } from './newarrival.service';

describe('NewarrivalService', () => {
  let service: NewarrivalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewarrivalService],
    }).compile();

    service = module.get<NewarrivalService>(NewarrivalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
