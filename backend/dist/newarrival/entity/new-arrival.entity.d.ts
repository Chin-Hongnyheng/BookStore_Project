import { Product } from '../../product/entity/product.entity';
export declare class NewArrival {
    id: number;
    product: Product;
    isActive: boolean;
    priority?: number;
    expiresAt?: Date;
    createdAt: Date;
}
