import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Promotion } from './entity/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Product } from '../product/entity/product.entity';

@Injectable()
export class PromotionService {
  private readonly logger = new Logger(PromotionService.name);

  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepo: Repository<Promotion>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  private calculateStatus(startDate: Date, endDate: Date): string {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'Upcoming';
    if (now > end) return 'Expired';
    return 'Active';
  }

  async create(dto: CreatePromotionDto) {
    const products = dto.productIds?.length
      ? await this.productRepo.findBy({ id: In(dto.productIds) })
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

    // Update status dynamically
    return promotions.map(promo => ({
      ...promo,
      status: this.calculateStatus(promo.startDate, promo.endDate),
    }));
  }

  async findOne(id: number) {
    const promotion = await this.promotionRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!promotion) throw new NotFoundException(`Promotion with id ${id} not found`);
    return {
      ...promotion,
      status: this.calculateStatus(promotion.startDate, promotion.endDate),
    };
  }

  async update(id: number, dto: UpdatePromotionDto) {
    const promotion = await this.promotionRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!promotion) throw new NotFoundException(`Promotion with id ${id} not found`);

    const { productIds, ...updateData } = dto;

    if (updateData.name !== undefined) promotion.name = updateData.name;
    if (updateData.type !== undefined) promotion.type = updateData.type;
    if (updateData.discount !== undefined) promotion.discount = updateData.discount;
    if (updateData.description !== undefined) promotion.description = updateData.description;
    if (updateData.badgeText !== undefined) promotion.badgeText = updateData.badgeText;

    if (updateData.startDate) {
      promotion.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      promotion.endDate = new Date(updateData.endDate);
    }

    // Update status based on dates
    promotion.status = this.calculateStatus(promotion.startDate, promotion.endDate);

    if (productIds) {
      const products = await this.productRepo.findBy({ id: In(productIds) });
      promotion.products = products;
    }

    this.logger.log('Promotion updated');
    return this.promotionRepo.save(promotion);
  }

  async remove(id: number) {
    const promotion = await this.findOne(id);
    return this.promotionRepo.remove(promotion as Promotion);
  }
}
