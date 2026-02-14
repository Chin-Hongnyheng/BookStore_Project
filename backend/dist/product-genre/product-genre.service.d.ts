import { Repository } from 'typeorm';
import { ProductGenre } from './entities/product_genres.entity';
export declare class ProductGenreService {
    private readonly productGenreRepo;
    constructor(productGenreRepo: Repository<ProductGenre>);
    findAll(): Promise<ProductGenre[]>;
    countProductsByGenre(): Promise<any[]>;
}
