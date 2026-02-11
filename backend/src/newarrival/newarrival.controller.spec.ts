import { Test, TestingModule } from '@nestjs/testing';
import { NewarrivalController } from './newarrival.controller';

describe('NewarrivalController', () => {
  let controller: NewarrivalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewarrivalController],
    }).compile();

    controller = module.get<NewarrivalController>(NewarrivalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
