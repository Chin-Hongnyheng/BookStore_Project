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
var PromotionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const promotion_entity_1 = require("./entity/promotion.entity");
const product_entity_1 = require("../product/entity/product.entity");
let PromotionService = PromotionService_1 = class PromotionService {
    promotionRepo;
    productRepo;
    logger = new common_1.Logger(PromotionService_1.name);
    constructor(promotionRepo, productRepo) {
        this.promotionRepo = promotionRepo;
        this.productRepo = productRepo;
    }
    calculateStatus(startDate, endDate) {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (now < start)
            return 'Upcoming';
        if (now > end)
            return 'Expired';
        return 'Active';
    }
    async create(dto) {
        const products = dto.productIds?.length
            ? await this.productRepo.findBy({ id: (0, typeorm_2.In)(dto.productIds) })
            : [];
        const { productIds, ...promotionData } = dto;
        const promotion = this.promotionRepo.create({
            name: promotionData.name,
            type: promotionData.type,
            discount: promotionData.discount ?? 0,
            startDate: promotionData.startDate ? new Date(promotionData.startDate) : new Date(),
            endDate: promotionData.endDate ? new Date(promotionData.endDate) : new Date(),
            description: promotionData.description ?? null,
            badgeText: promotionData.badgeText ?? null,
            status: this.calculateStatus(new Date(dto.startDate), new Date(dto.endDate)),
            products,
        });
        this.logger.log('Promotion created');
        return this.promotionRepo.save(promotion);
    }
    async findAll() {
        const promotions = await this.promotionRepo.find({
            relations: ['products'],
            order: { createdAt: 'DESC' },
        });
        return promotions.map(promo => ({
            ...promo,
            status: this.calculateStatus(promo.startDate, promo.endDate),
        }));
    }
    async findOne(id) {
        const promotion = await this.promotionRepo.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!promotion)
            throw new common_1.NotFoundException(`Promotion with id ${id} not found`);
        return {
            ...promotion,
            status: this.calculateStatus(promotion.startDate, promotion.endDate),
        };
    }
    async update(id, dto) {
        const promotion = await this.promotionRepo.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!promotion)
            throw new common_1.NotFoundException(`Promotion with id ${id} not found`);
        const { productIds, ...updateData } = dto;
        if (updateData.name !== undefined)
            promotion.name = updateData.name;
        if (updateData.type !== undefined)
            promotion.type = updateData.type;
        if (updateData.discount !== undefined)
            promotion.discount = updateData.discount;
        if (updateData.description !== undefined)
            promotion.description = updateData.description;
        if (updateData.badgeText !== undefined)
            promotion.badgeText = updateData.badgeText;
        if (updateData.startDate) {
            promotion.startDate = new Date(updateData.startDate);
        }
        if (updateData.endDate) {
            promotion.endDate = new Date(updateData.endDate);
        }
        promotion.status = this.calculateStatus(promotion.startDate, promotion.endDate);
        if (productIds) {
            const products = await this.productRepo.findBy({ id: (0, typeorm_2.In)(productIds) });
            promotion.products = products;
        }
        this.logger.log('Promotion updated');
        return this.promotionRepo.save(promotion);
    }
    async remove(id) {
        const promotion = await this.findOne(id);
        return this.promotionRepo.remove(promotion);
    }
};
exports.PromotionService = PromotionService;
exports.PromotionService = PromotionService = PromotionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promotion_entity_1.Promotion)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PromotionService);
//# sourceMappingURL=promotion.service.js.map