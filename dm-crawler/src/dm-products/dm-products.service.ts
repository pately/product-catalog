import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DmProducts } from './interfaces/dm-products.interface';
import { CreateDmProductsDTO } from './dto/dm-products.dto';

@Injectable()
export class DmProductsService {
    constructor(@InjectModel('DmProducts') private dmProductsModel: Model<DmProducts>) { }

    async create(createDmProductsDTO: CreateDmProductsDTO): Promise<any> {
        const createDmProducts = new this.dmProductsModel(createDmProductsDTO);
        return createDmProducts.save();
    }

    async upsert(createDmProductsDTO: CreateDmProductsDTO): Promise<any> {
        return await this.dmProductsModel.updateOne(
            { 'url': createDmProductsDTO.url },
            { $set: createDmProductsDTO },
            { upsert: true, multi: true },
        );
    }

    async find(): Promise<any> {
        return await this.dmProductsModel.aggregate([
            {$match: {currency: "€"}},
            {$sample: {size: 10}}
        ]).exec();
    }
}
