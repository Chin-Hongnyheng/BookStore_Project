import { IsString, IsNumber, IsDateString, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    discount?: number;

    @IsNumber()
    inStock: number;

    @IsOptional()
    @IsDateString()
    published?: string;

    @IsNumber()
    pages: number;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsString()
    language: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    genreIds?: number[];
}
