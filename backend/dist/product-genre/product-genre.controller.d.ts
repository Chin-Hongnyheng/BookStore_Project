import { ProductGenreService } from './product-genre.service';
export declare class ProductGenreController {
    private readonly productGenreService;
    constructor(productGenreService: ProductGenreService);
    countProducts(): Promise<any[]>;
    findAll(): Promise<import("./entities/product_genres.entity").ProductGenre[]>;
}
