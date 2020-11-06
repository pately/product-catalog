import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DmProductsService } from '../dm-products/dm-products.service';
import { DmProductsSchema } from '../dm-products/schemas/dm-products.schema';


@Module({
  providers: [TasksService, DmProductsService],
  imports: [MongooseModule.forFeature([{ name: 'DmProducts', schema: DmProductsSchema }])],
  controllers: [TasksController]
})
export class TasksModule {}
