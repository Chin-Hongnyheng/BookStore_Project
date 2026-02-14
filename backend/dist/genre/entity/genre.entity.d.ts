import { Product } from '../../product/entity/product.entity';
export declare class Genre {
    id: number;
    name: string;
    description: string;
    image: string | null;
    svgIcon: string;
    products: Product[];
}
