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
var ProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entity/product.entity");
const genre_entity_1 = require("../genre/entity/genre.entity");
let ProductService = ProductService_1 = class ProductService {
    productRepo;
    genreRepo;
    logger = new common_1.Logger(ProductService_1.name);
    constructor(productRepo, genreRepo) {
        this.productRepo = productRepo;
        this.genreRepo = genreRepo;
    }
    async create(dto, file) {
        const genres = dto.genreIds?.length
            ? await this.genreRepo.findBy({ id: (0, typeorm_2.In)(dto.genreIds) })
            : [];
        const product = this.productRepo.create({
            title: dto.title,
            author: dto.author,
            description: dto.description,
            image: file?.filename || '',
            price: dto.price,
            discount: dto.discount ?? 0,
            inStock: dto.inStock,
            pages: dto.pages,
            language: dto.language,
            published: dto.published ? new Date(dto.published) : null,
            genres,
            rating: dto.rating ?? 0,
        });
        console.log('Product created successfully');
        return this.productRepo.save(product);
    }
    async findAll() {
        return this.productRepo.find();
    }
    async findOne(id) {
        const product = await this.productRepo.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        return product;
    }
    async update(id, dto, file) {
        const product = await this.findOne(id);
        if (dto.title !== undefined)
            product.title = dto.title;
        if (dto.author !== undefined)
            product.author = dto.author;
        if (dto.description !== undefined)
            product.description = dto.description;
        if (dto.price !== undefined)
            product.price = Number(dto.price);
        if (dto.discount !== undefined)
            product.discount = Number(dto.discount);
        if (dto.inStock !== undefined)
            product.inStock = Number(dto.inStock);
        if (dto.pages !== undefined)
            product.pages = Number(dto.pages);
        if (dto.language !== undefined)
            product.language = dto.language;
        if (dto.published !== undefined)
            product.published = new Date(dto.published);
        if (dto.rating !== undefined)
            product.rating = Number(dto.rating);
        if (dto.genreIds?.length) {
            const genres = await this.genreRepo.findBy({ id: (0, typeorm_2.In)(dto.genreIds) });
            product.genres = genres;
        }
        if (file)
            product.image = file.filename;
        console.log('Product updated successfully');
        return this.productRepo.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepo.remove(product);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map