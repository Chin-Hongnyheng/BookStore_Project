"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entity/wishlist.entity");
const product_entity_1 = require("../product/entity/product.entity");
let WishlistService = class WishlistService {
    wishlistRepository;
    productRepository;
    constructor(wishlistRepository, productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }
    async findAll(userId) {
        return this.wishlistRepository.find({
            where: { userId },
            relations: ['product'],
        });
    }
    async create(createWishlistDto) {
        const { userId, productIds } = createWishlistDto;
        const existingWishlist = await this.wishlistRepository.find({
            where: { userId },
            relations: ['product'],
        });
        const existingProductIds = existingWishlist.map((item) => item.product.id);
        const newProductIds = productIds.filter((id) => !existingProductIds.includes(id));
        if (newProductIds.length === 0) {
            throw new common_1.BadRequestException('All products are already in the wishlist');
        }
        const products = await this.productRepository.findByIds(newProductIds);
        const wishlistEntries = products.map((product) => {
            const entry = new wishlist_entity_1.Wishlist();
            entry.userId = userId;
            entry.product = product;
            return entry;
        });
        return this.wishlistRepository.save(wishlistEntries);
    }
    async update(userId, updateWishlistDto) {
        const productIds = updateWishlistDto.productIds || [];
        await this.wishlistRepository.delete({ userId });
        if (productIds.length === 0) {
            return [];
        }
        return this.create({ userId, productIds });
    }
    async remove(userId, productId) {
        const result = await this.wishlistRepository.delete({
            userId,
            product: { id: productId },
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Wishlist item not found');
        }
        return { message: 'Wishlist item removed successfully' };
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map