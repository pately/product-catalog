import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DmProductsDocument = DmProducts & Document;
@Schema()
export class DmProducts {
    @Prop()
    url: string;

    @Prop()
    digit: string;

    @Prop()
    cent: string;

    @Prop()
    currency: string;

    @Prop()
    images: string[];

    @Prop()
    produktbeschreibung: string[];

    @Prop()
    base: string;

    @Prop()
    product: string;

    @Prop()
    brand: string;

    @Prop()
    selling: string;
}

export const DmProductsSchema = SchemaFactory.createForClass(DmProducts);