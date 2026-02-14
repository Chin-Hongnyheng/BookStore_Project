"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recommendation_entity_1 = require("./entity/recommendation.entity");
const product_entity_1 = require("../product/entity/product.entity");
let RecommendationService = class RecommendationService {
    recommendationRepo;
    productRepo;
    constructor(recommendationRepo, productRepo) {
        this.recommendationRepo = recommendationRepo;
        this.productRepo = productRepo;
    }
    async create(dto) {
        const product = await this.productRepo.findOneBy({ id: dto.productId });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const newRecommendation = this.recommendationRepo.create({
            product,
            isActive: dto.isActive ?? true,
            priority: dto.priority,
            expiresAt: dto.expiresAt,
        });
        return this.recommendationRepo.save(newRecommendation);
    }
    findAll() {
        return this.recommendationRepo.find({ relations: ['product'] });
    }
    async findOne(id) {
        const rec = await this.recommendationRepo.findOne({
            where: { id },
            relations: ['product'],
        });
        if (!rec)
            throw new common_1.NotFoundException('Recommendation not found');
        return rec;
    }
    async update(id, dto) {
        const rec = await this.findOne(id);
        if (dto.productId) {
            const product = await this.productRepo.findOneBy({ id: dto.productId });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            rec.product = product;
        }
        if (dto.isActive !== undefined)
            rec.isActive = dto.isActive;
        if (dto.priority !== undefined)
            rec.priority = dto.priority;
        if (dto.expiresAt !== undefined)
            rec.expiresAt = dto.expiresAt;
        return this.recommendationRepo.save(rec);
    }
    async remove(id) {
        const result = await this.recommendationRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Recommendation not found');
    }
};
exports.RecommendationService = RecommendationService;
exports.RecommendationService = RecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recommendation_entity_1.recommendation)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RecommendationService);
//# sourceMappingURL=recommendation.service.js.map