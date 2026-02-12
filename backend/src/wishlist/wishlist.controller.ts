import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { UpdateWishlistDto } from './dto/update-wishlist-dto';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  /** Get all wishlist items for a user */
  @Get(':userId')
  async findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.wishlistService.findAll(userId);
  }

  /** Add multiple products to wishlist */
  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  /** Replace/update user's wishlist */
  @Put(':userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistService.update(userId, updateWishlistDto);
  }

  /** Remove a single product from wishlist */
  @Delete(':userId/:productId')
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.wishlistService.remove(userId, productId);
  }
}
