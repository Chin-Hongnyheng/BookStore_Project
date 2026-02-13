import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entity/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { UpdateWishlistDto } from './dto/update-wishlist-dto';
import { Product } from 'src/product/entity/product.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  /** Get all wishlist items for a user */
  async findAll(userId: number): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      where: { userId },
      relations: ['product'],
    });
  }

  /** Add multiple products to wishlist (prevent duplicates) */
  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist[]> {
    const { userId, productIds } = createWishlistDto;

    // Get existing wishlist products for the user
    const existingWishlist = await this.wishlistRepository.find({
      where: { userId },
      relations: ['product'],
    });
    const existingProductIds = existingWishlist.map((item) => item.product.id);

    // Filter out products already in wishlist
    const newProductIds = productIds.filter(
      (id) => !existingProductIds.includes(id),
    );
    if (newProductIds.length === 0) {
      throw new BadRequestException('All products are already in the wishlist');
    }

    const products = await this.productRepository.findByIds(newProductIds);

    const wishlistEntries = products.map((product) => {
      const entry = new Wishlist();
      entry.userId = userId;
      entry.product = product;
      return entry;
    });

    return this.wishlistRepository.save(wishlistEntries);
  }

  /** Update wishlist: replace user's wishlist with new product IDs */
  async update(
    userId: number,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist[]> {
    const productIds = updateWishlistDto.productIds || [];

    // Delete existing wishlist for the user
    await this.wishlistRepository.delete({ userId });

    if (productIds.length === 0) {
      return [];
    }

    return this.create({ userId, productIds });
  }

  /** Remove a specific product from wishlist */
  async remove(userId: number, productId: number) {
    const result = await this.wishlistRepository.delete({
      userId,
      product: { id: productId },
    });
    if (result.affected === 0) {
      throw new NotFoundException('Wishlist item not found');
    }
    return { message: 'Wishlist item removed successfully' };
  }
}
