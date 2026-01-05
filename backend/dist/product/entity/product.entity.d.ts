import { Genre } from '../../genre/entity/genre.entity';
export declare class Product {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string;
    price: number;
    discount: number;
    inStock: number;
    countSold: number;
    published: Date | null;
    pages: number;
    language: string;
    genres: Genre[];
    rating: number;
}
