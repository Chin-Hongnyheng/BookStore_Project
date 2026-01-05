import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Genre } from '../genre/entity/genre.entity';
export declare class ProductService {
    private readonly productRepo;
    private readonly genreRepo;
    private readonly logger;
    constructor(productRepo: Repository<Product>, genreRepo: Repository<Genre>);
    create(dto: CreateProductDto, file?: any): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, dto: Partial<CreateProductDto>, file?: any): Promise<Product>;
    remove(id: number): Promise<void>;
}
