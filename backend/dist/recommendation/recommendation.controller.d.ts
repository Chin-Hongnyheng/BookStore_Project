import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { recommendation } from './entity/recommendation.entity';
export declare class RecommendationController {
    private readonly recommendationService;
    constructor(recommendationService: RecommendationService);
    create(dto: CreateRecommendationDto): Promise<recommendation>;
    findAll(): Promise<recommendation[]>;
    findOne(id: number): Promise<recommendation>;
    update(id: number, dto: UpdateRecommendationDto): Promise<recommendation>;
    remove(id: number): Promise<void>;
}
