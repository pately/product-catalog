import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DmProductsService } from './dm-products.service';
import { DmProductsController } from './dm-products.controller';
import { DmProductsSchema } from './schemas/dm-products.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DmProducts', schema: DmProductsSchema }])],
  providers: [DmProductsService],
  controllers: [DmProductsController]
})
export class DmProductsModule {}
