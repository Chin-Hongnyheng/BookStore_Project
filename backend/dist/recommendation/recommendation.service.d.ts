import { Repository } from 'typeorm';
import { recommendation } from './entity/recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { Product } from '../product/entity/product.entity';
export declare class RecommendationService {
    private recommendationRepo;
    private productRepo;
    constructor(recommendationRepo: Repository<recommendation>, productRepo: Repository<Product>);
    create(dto: CreateRecommendationDto): Promise<recommendation>;
    findAll(): Promise<recommendation[]>;
    findOne(id: number): Promise<recommendation>;
    update(id: number, dto: UpdateRecommendationDto): Promise<recommendation>;
    remove(id: number): Promise<void>;
}
