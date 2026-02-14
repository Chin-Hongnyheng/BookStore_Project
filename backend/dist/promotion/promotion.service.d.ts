import { Repository } from 'typeorm';
import { Promotion } from './entity/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Product } from '../product/entity/product.entity';
export declare class PromotionService {
    private readonly promotionRepo;
    private readonly productRepo;
    private readonly logger;
    constructor(promotionRepo: Repository<Promotion>, productRepo: Repository<Product>);
    private calculateStatus;
    create(dto: CreatePromotionDto): Promise<Promotion>;
    findAll(): Promise<{
        status: string;
        id: number;
        name: string;
        type: string;
        discount: number;
        startDate: Date;
        endDate: Date;
        description: string | null;
        badgeText: string | null;
        products: Product[];
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        status: string;
        id: number;
        name: string;
        type: string;
        discount: number;
        startDate: Date;
        endDate: Date;
        description: string | null;
        badgeText: string | null;
        products: Product[];
        createdAt: Date;
    }>;
    update(id: number, dto: UpdatePromotionDto): Promise<Promotion>;
    remove(id: number): Promise<Promotion>;
}
