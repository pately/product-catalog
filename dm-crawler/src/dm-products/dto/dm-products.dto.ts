import { ApiProperty } from '@nestjs/swagger';

export class CreateDmProductsDTO {
    @ApiProperty()
    readonly url: string;
    @ApiProperty()
    readonly digit: string;
    @ApiProperty()
    readonly cent: string;
    @ApiProperty()
    readonly currency: string;
    @ApiProperty()
    readonly images: string[];
    @ApiProperty()
    readonly produktbeschreibung: string[];
    @ApiProperty()
    readonly base: string;
    @ApiProperty()
    readonly product: string;
    @ApiProperty()
    readonly brand: string;
    @ApiProperty()
    readonly selling: string;
}