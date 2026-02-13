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

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  /** * GET /wishlists/:userId
   * Fetches all wishlist entries for a specific user
   */
  @Get(':userId')
  async findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.wishlistService.findAll(userId);
  }

  /** * POST /wishlists
   * Expects { userId: number, productIds: number[] }
   */
  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  /** * DELETE /wishlists/:userId/:productId
   * Removes a specific book from a specific user's wishlist
   */
  @Delete(':userId/:productId')
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.wishlistService.remove(userId, productId);
  }
}
