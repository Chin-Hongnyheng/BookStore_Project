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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entity/product.entity");
const genre_entity_1 = require("../genre/entity/genre.entity");
let ProductService = class ProductService {
    productRepo;
    genreRepo;
    constructor(productRepo, genreRepo) {
        this.productRepo = productRepo;
        this.genreRepo = genreRepo;
    }
    async create(dto, file) {
        const genres = dto.genreIds?.length
            ? await this.genreRepo.findBy({ id: (0, typeorm_2.In)(dto.genreIds) })
            : [];
        const product = this.productRepo.create({
            ...dto,
            published: dto.published ? new Date(dto.published) : null,
            image: file?.filename ?? null,
            genres,
        });
        console.log("Data created");
        return this.productRepo.save(product);
    }
    async findAll() {
        return this.productRepo.find({ relations: ['genres'] });
    }
    async findOne(id) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['genres'],
        });
        if (!product)
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        return product;
    }
    async update(id, dto, file) {
        const product = await this.findOne(id);
        if (dto.published === '') {
            dto.published = undefined;
            product.published = null;
        }
        Object.assign(product, dto);
        if (file) {
            product.image = file.filename;
        }
        if (dto.genreIds?.length) {
            const genres = await this.genreRepo.findBy({ id: (0, typeorm_2.In)(dto.genreIds) });
            product.genres = genres;
        }
        console.log("Data Updated");
        return this.productRepo.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        return this.productRepo.remove(product);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map