import { Controller, Get } from '@nestjs/common';
import { DmProductsService } from './dm-products.service';

@Controller('dm-products')
export class DmProductsController {
    constructor(private readonly dmProductsService: DmProductsService) {}

    @Get('products')
    getDmProducts(): any {
      return this.dmProductsService.find();
    }
}
