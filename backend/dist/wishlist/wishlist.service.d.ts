import { Repository } from 'typeorm';
import { Wishlist } from './entity/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { UpdateWishlistDto } from './dto/update-wishlist-dto';
import { Product } from 'src/product/entity/product.entity';
export declare class WishlistService {
    private wishlistRepository;
    private productRepository;
    constructor(wishlistRepository: Repository<Wishlist>, productRepository: Repository<Product>);
    findAll(userId: number): Promise<Wishlist[]>;
    create(createWishlistDto: CreateWishlistDto): Promise<Wishlist[]>;
    update(userId: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist[]>;
    remove(userId: number, productId: number): Promise<{
        message: string;
    }>;
}
