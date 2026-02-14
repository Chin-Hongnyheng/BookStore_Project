import { Product } from '../../product/entity/product.entity';
export declare class Promotion {
    id: number;
    name: string;
    type: string;
    discount: number;
    startDate: Date;
    endDate: Date;
    status: string;
    description: string | null;
    badgeText: string | null;
    products: Product[];
    createdAt: Date;
}
