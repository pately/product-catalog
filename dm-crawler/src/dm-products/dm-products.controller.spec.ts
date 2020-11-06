import { Test, TestingModule } from '@nestjs/testing';
import { DmProductsController } from './dm-products.controller';

describe('DmProductsController', () => {
  let controller: DmProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DmProductsController],
    }).compile();

    controller = module.get<DmProductsController>(DmProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
