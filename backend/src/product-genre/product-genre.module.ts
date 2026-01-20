import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGenreController } from './product-genre.controller';
import { ProductGenreService } from './product-genre.service';
import { ProductGenre } from './entities/product_genres.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductGenre])],
  controllers: [ProductGenreController],
  providers: [ProductGenreService],
})
export class ProductGenreModule {}
