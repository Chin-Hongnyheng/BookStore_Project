import {
    Controller,
    Get,
} from '@nestjs/common'
import { ProductGenreService } from './product-genre.service'

@Controller('product_genres')
export class ProductGenreController {
  constructor(private readonly productGenreService: ProductGenreService) {}

  @Get('count')
  async countProducts() {
    return this.productGenreService.countProductsByGenre();
  }

  @Get()
  async findAll() {
    return this.productGenreService.findAll();
  }
}
