import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    findAll(userId: number): Promise<import("./entity/wishlist.entity").Wishlist[]>;
    create(createWishlistDto: CreateWishlistDto): Promise<import("./entity/wishlist.entity").Wishlist[]>;
    remove(userId: number, productId: number): Promise<{
        message: string;
    }>;
}
