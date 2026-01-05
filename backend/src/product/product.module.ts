import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entity/product.entity'
import { Genre } from '../genre/entity/genre.entity'

@Module({
  imports: [ TypeOrmModule.forFeature([Product, Genre])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
