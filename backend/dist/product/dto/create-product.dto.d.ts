export declare class CreateProductDto {
    title: string;
    author: string;
    description: string;
    price: number;
    discount?: number;
    inStock: number;
    published?: string;
    pages: number;
    rating?: number;
    language: string;
    genreIds?: number[];
}
