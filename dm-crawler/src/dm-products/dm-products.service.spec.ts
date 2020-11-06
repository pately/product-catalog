import { Test, TestingModule } from '@nestjs/testing';
import { DmProductsService } from './dm-products.service';

describe('DmProductsService', () => {
  let service: DmProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DmProductsService],
    }).compile();

    service = module.get<DmProductsService>(DmProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
