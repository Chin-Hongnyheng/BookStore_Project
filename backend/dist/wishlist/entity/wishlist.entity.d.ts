import { Product } from 'src/product/entity/product.entity';
export declare class Wishlist {
    id: number;
    userId: number;
    product: Product;
    createdAt: Date;
}
