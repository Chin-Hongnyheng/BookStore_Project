import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { recommendation } from './entity/recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { Product } from '../product/entity/product.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(recommendation)
    private recommendationRepo: Repository<recommendation>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateRecommendationDto): Promise<recommendation> {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException('Product not found');

    const newRecommendation = this.recommendationRepo.create({
      product,
      isActive: dto.isActive ?? true,
      priority: dto.priority,
      expiresAt: dto.expiresAt,
    });

    return this.recommendationRepo.save(newRecommendation);
  }

  findAll(): Promise<recommendation[]> {
    return this.recommendationRepo.find({ relations: ['product'] });
  }

  async findOne(id: number): Promise<recommendation> {
    const rec = await this.recommendationRepo.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!rec) throw new NotFoundException('Recommendation not found');
    return rec;
  }

  async update(
    id: number,
    dto: UpdateRecommendationDto,
  ): Promise<recommendation> {
    const rec = await this.findOne(id);

    if (dto.productId) {
      const product = await this.productRepo.findOneBy({ id: dto.productId });
      if (!product) throw new NotFoundException('Product not found');
      rec.product = product;
    }

    if (dto.isActive !== undefined) rec.isActive = dto.isActive;
    if (dto.priority !== undefined) rec.priority = dto.priority;
    if (dto.expiresAt !== undefined) rec.expiresAt = dto.expiresAt;

    return this.recommendationRepo.save(rec);
  }

  async remove(id: number): Promise<void> {
    const result = await this.recommendationRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Recommendation not found');
  }
}
