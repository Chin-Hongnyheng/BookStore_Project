import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Genre } from '../genre/entity/genre.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Genre) private readonly genreRepo: Repository<Genre>,
  ) {}

  async create(dto: CreateProductDto, file?: Express.Multer.File) {
    const genres = dto.genreIds?.length
      ? await this.genreRepo.findBy({ id: In(dto.genreIds) })
      : [];

    const product = this.productRepo.create({
      ...dto,
      published: dto.published ? new Date(dto.published) : null, // convert to Date or null
      image: file?.filename ?? null, // store filename only, null if no file
      genres,
    });
    console.log("Data created");
    return this.productRepo.save(product);
  }

  async findAll() {
    return this.productRepo.find({ relations: ['genres'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['genres'],
    });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async update(id: number, dto: Partial<CreateProductDto>, file?: Express.Multer.File) {
    const product = await this.findOne(id);

    // Handle empty string for published date
    if (dto.published === '') {
      dto.published = undefined;
      product.published = null;
    }

    Object.assign(product, dto);

    if (file) {
      product.image = file.filename;
    }

    if (dto.genreIds?.length) {
      const genres = await this.genreRepo.findBy({ id: In(dto.genreIds) });
      product.genres = genres;
    }
    console.log("Data Updated");
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}

