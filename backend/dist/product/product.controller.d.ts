import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(dto: CreateProductDto, file?: any): Promise<import("./entity/product.entity").Product>;
    findAll(): Promise<import("./entity/product.entity").Product[]>;
    findOne(id: number): Promise<import("./entity/product.entity").Product>;
    update(id: number, dto: Partial<CreateProductDto>, file?: any): Promise<import("./entity/product.entity").Product>;
    remove(id: number): Promise<void>;
}
