import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<import("./entity/product.entity").Product[]>;
    findOne(id: number): Promise<import("./entity/product.entity").Product>;
    create(file: Express.Multer.File, dto: CreateProductDto): Promise<import("./entity/product.entity").Product>;
    uploadImage(id: number, file: Express.Multer.File): Promise<import("./entity/product.entity").Product>;
    update(id: number, file: Express.Multer.File, dto: Partial<CreateProductDto>): Promise<import("./entity/product.entity").Product>;
    remove(id: number): Promise<import("./entity/product.entity").Product>;
}
