import { Document } from 'mongoose';

export interface DmProducts extends Document {
    readonly url: string;
    readonly digit: string;
    readonly cent: string;
    readonly currency: string;
    readonly images: string[];
    readonly produktbeschreibung: string[];
    readonly base: string;
    readonly product: string;
    readonly brand: string;
    readonly selling: string;
    readonly created_at: Date;
}