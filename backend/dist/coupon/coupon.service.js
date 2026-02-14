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
var CouponService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coupon_entity_1 = require("./entity/coupon.entity");
let CouponService = CouponService_1 = class CouponService {
    couponRepo;
    logger = new common_1.Logger(CouponService_1.name);
    constructor(couponRepo) {
        this.couponRepo = couponRepo;
    }
    async create(dto) {
        const existing = await this.couponRepo.findOne({ where: { code: dto.code.toUpperCase() } });
        if (existing) {
            throw new common_1.BadRequestException(`Coupon code "${dto.code}" already exists`);
        }
        const coupon = this.couponRepo.create({
            ...dto,
            code: dto.code.toUpperCase(),
            startDate: new Date(dto.startDate),
            endDate: new Date(dto.endDate),
        });
        this.logger.log(`Coupon created: ${coupon.code}`);
        return this.couponRepo.save(coupon);
    }
    async findAll() {
        return this.couponRepo.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const coupon = await this.couponRepo.findOne({ where: { id } });
        if (!coupon)
            throw new common_1.NotFoundException(`Coupon with id ${id} not found`);
        return coupon;
    }
    async findByCode(code) {
        const coupon = await this.couponRepo.findOne({ where: { code: code.toUpperCase() } });
        if (!coupon)
            throw new common_1.NotFoundException(`Coupon code "${code}" not found`);
        return coupon;
    }
    async validateCoupon(code, cartTotal, isFirstTimeUser = false) {
        const coupon = await this.findByCode(code);
        const now = new Date();
        if (!coupon.isActive) {
            throw new common_1.BadRequestException('This coupon is no longer active');
        }
        const startDate = new Date(coupon.startDate);
        const endDate = new Date(coupon.endDate);
        if (now < startDate) {
            throw new common_1.BadRequestException('This coupon is not yet active');
        }
        if (now > endDate) {
            throw new common_1.BadRequestException('This coupon has expired');
        }
        if (coupon.usageLimit !== -1 && coupon.usageCount >= coupon.usageLimit) {
            throw new common_1.BadRequestException('This coupon has reached its usage limit');
        }
        if (cartTotal < Number(coupon.minimumPurchase)) {
            throw new common_1.BadRequestException(`Minimum purchase of $${coupon.minimumPurchase} required for this coupon`);
        }
        if (coupon.isFirstTimeOnly && !isFirstTimeUser) {
            throw new common_1.BadRequestException('This coupon is only valid for first-time users');
        }
        let discountAmount;
        if (coupon.discountType === 'percentage') {
            discountAmount = (cartTotal * Number(coupon.discountValue)) / 100;
            if (coupon.maximumDiscount && discountAmount > Number(coupon.maximumDiscount)) {
                discountAmount = Number(coupon.maximumDiscount);
            }
        }
        else {
            discountAmount = Number(coupon.discountValue);
        }
        discountAmount = Math.min(discountAmount, cartTotal);
        return {
            valid: true,
            coupon: {
                id: coupon.id,
                code: coupon.code,
                name: coupon.name,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
            },
            discountAmount: discountAmount,
            finalTotal: cartTotal - discountAmount,
        };
    }
    async useCoupon(code) {
        const coupon = await this.findByCode(code);
        coupon.usageCount += 1;
        return this.couponRepo.save(coupon);
    }
    async update(id, dto) {
        const coupon = await this.findOne(id);
        if (dto.code && dto.code.toUpperCase() !== coupon.code) {
            const existing = await this.couponRepo.findOne({ where: { code: dto.code.toUpperCase() } });
            if (existing) {
                throw new common_1.BadRequestException(`Coupon code "${dto.code}" already exists`);
            }
            dto.code = dto.code.toUpperCase();
        }
        Object.assign(coupon, dto);
        if (dto.startDate) {
            coupon.startDate = new Date(dto.startDate);
        }
        if (dto.endDate) {
            coupon.endDate = new Date(dto.endDate);
        }
        this.logger.log(`Coupon updated: ${coupon.code}`);
        return this.couponRepo.save(coupon);
    }
    async remove(id) {
        const coupon = await this.findOne(id);
        this.logger.log(`Coupon deleted: ${coupon.code}`);
        return this.couponRepo.remove(coupon);
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = CouponService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CouponService);
//# sourceMappingURL=coupon.service.js.map