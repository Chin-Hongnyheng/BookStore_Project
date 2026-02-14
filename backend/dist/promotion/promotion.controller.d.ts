import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
export declare class PromotionController {
    private readonly promotionService;
    constructor(promotionService: PromotionService);
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
        products: import("../product/entity/product.entity").Product[];
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
        products: import("../product/entity/product.entity").Product[];
        createdAt: Date;
    }>;
    create(dto: CreatePromotionDto): Promise<import("./entity/promotion.entity").Promotion>;
    update(id: number, dto: UpdatePromotionDto): Promise<import("./entity/promotion.entity").Promotion>;
    remove(id: number): Promise<import("./entity/promotion.entity").Promotion>;
}
