import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { UseGuards } from '@nestjs/common';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get(':userId')
  async findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.wishlistService.findAll(userId);
  }

  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @Delete(':userId/:productId')
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.wishlistService.remove(userId, productId);
  }
}
