import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewArrival } from './entity/new-arrival.entity';
import { Product } from '../product/entity/product.entity';
import { CreateNewArrivalDto } from './dto/create-new-arrival.dto';
import { UpdateNewArrivalDto } from './dto/update-new-arrival.dto';

@Injectable()
export class NewArrivalService {
  constructor(
    @InjectRepository(NewArrival)
    private newArrivalRepository: Repository<NewArrival>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateNewArrivalDto) {
    const product = await this.productRepository.findOneBy({
      id: dto.productId,
    });
    if (!product) throw new NotFoundException('Product not found');

    const newArrival = this.newArrivalRepository.create({
      product,
      isActive: dto.isActive ?? true,
      priority: dto.priority ?? 0,
      expiresAt: dto.expiresAt,
    });

    return this.newArrivalRepository.save(newArrival);
  }

  findAllActive() {
    return this.newArrivalRepository.find({
      where: { isActive: true },
      order: { priority: 'DESC', createdAt: 'DESC' },
      relations: ['product'],
    });
  }

  findOne(id: number) {
    return this.newArrivalRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async update(id: number, dto: UpdateNewArrivalDto) {
    const newArrival = await this.newArrivalRepository.findOneBy({ id });
    if (!newArrival) throw new NotFoundException('New arrival not found');

    if (dto.productId) {
      const product = await this.productRepository.findOneBy({
        id: dto.productId,
      });
      if (!product) throw new NotFoundException('Product not found');
      newArrival.product = product;
    }

    Object.assign(newArrival, dto);
    return this.newArrivalRepository.save(newArrival);
  }

  remove(id: number) {
    return this.newArrivalRepository.delete(id);
  }
}
