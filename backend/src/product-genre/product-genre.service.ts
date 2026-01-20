import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductGenre } from './entities/product_genres.entity'
import { Product } from 'src/product/entity/product.entity'

@Injectable()
export class ProductGenreService {
  constructor(
    @InjectRepository(ProductGenre)
    private readonly productGenreRepo: Repository<ProductGenre>,
  ) {}

  async findAll() {
    return this.productGenreRepo.find();
  }
  
  async countProductsByGenre() {
    return this.productGenreRepo
      .createQueryBuilder('pg')
      .select('pg.genre_id', 'genre_id')
      .addSelect('COUNT(pg.product_id)', 'total')
      .groupBy('pg.genre_id')
      .getRawMany();
  }
}
