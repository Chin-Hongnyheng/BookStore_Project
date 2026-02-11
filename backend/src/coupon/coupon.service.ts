import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entity/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  private readonly logger = new Logger(CouponService.name);

  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) {}

  async create(dto: CreateCouponDto) {
    // Check if code already exists
    const existing = await this.couponRepo.findOne({ where: { code: dto.code.toUpperCase() } });
    if (existing) {
      throw new BadRequestException(`Coupon code "${dto.code}" already exists`);
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

  async findOne(id: number) {
    const coupon = await this.couponRepo.findOne({ where: { id } });
    if (!coupon) throw new NotFoundException(`Coupon with id ${id} not found`);
    return coupon;
  }

  async findByCode(code: string) {
    const coupon = await this.couponRepo.findOne({ where: { code: code.toUpperCase() } });
    if (!coupon) throw new NotFoundException(`Coupon code "${code}" not found`);
    return coupon;
  }

  async validateCoupon(code: string, cartTotal: number, isFirstTimeUser: boolean = false) {
    const coupon = await this.findByCode(code);
    const now = new Date();

    // Check if coupon is active
    if (!coupon.isActive) {
      throw new BadRequestException('This coupon is no longer active');
    }

    // Check date validity
    const startDate = new Date(coupon.startDate);
    const endDate = new Date(coupon.endDate);
    if (now < startDate) {
      throw new BadRequestException('This coupon is not yet active');
    }
    if (now > endDate) {
      throw new BadRequestException('This coupon has expired');
    }

    // Check usage limit
    if (coupon.usageLimit !== -1 && coupon.usageCount >= coupon.usageLimit) {
      throw new BadRequestException('This coupon has reached its usage limit');
    }

    // Check minimum purchase
    if (cartTotal < Number(coupon.minimumPurchase)) {
      throw new BadRequestException(
        `Minimum purchase of $${coupon.minimumPurchase} required for this coupon`
      );
    }

    // Check first-time user restriction
    if (coupon.isFirstTimeOnly && !isFirstTimeUser) {
      throw new BadRequestException('This coupon is only valid for first-time users');
    }

    // Calculate discount
    let discountAmount: number;
    if (coupon.discountType === 'percentage') {
      discountAmount = (cartTotal * Number(coupon.discountValue)) / 100;
      // Apply maximum discount cap if set
      if (coupon.maximumDiscount && discountAmount > Number(coupon.maximumDiscount)) {
        discountAmount = Number(coupon.maximumDiscount);
      }
    } else {
      discountAmount = Number(coupon.discountValue);
    }

    // Don't allow discount greater than cart total
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

  async useCoupon(code: string) {
    const coupon = await this.findByCode(code);
    coupon.usageCount += 1;
    return this.couponRepo.save(coupon);
  }

  async update(id: number, dto: UpdateCouponDto) {
    const coupon = await this.findOne(id);

    if (dto.code && dto.code.toUpperCase() !== coupon.code) {
      const existing = await this.couponRepo.findOne({ where: { code: dto.code.toUpperCase() } });
      if (existing) {
        throw new BadRequestException(`Coupon code "${dto.code}" already exists`);
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

  async remove(id: number) {
    const coupon = await this.findOne(id);
    this.logger.log(`Coupon deleted: ${coupon.code}`);
    return this.couponRepo.remove(coupon);
  }
}
