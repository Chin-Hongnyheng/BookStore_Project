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
var GenreService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const genre_entity_1 = require("./entity/genre.entity");
const common_2 = require("@nestjs/common");
let GenreService = GenreService_1 = class GenreService {
    genreRepo;
    logger = new common_2.Logger(GenreService_1.name);
    constructor(genreRepo) {
        this.genreRepo = genreRepo;
    }
    async create(dto) {
        console.log('RAW console.log reached');
        this.logger.log('create successfully');
        const genre = this.genreRepo.create(dto);
        return await this.genreRepo.save(genre);
    }
    async findAll() {
        return await this.genreRepo.find();
    }
    async findOne(id) {
        const genre = await this.genreRepo.findOne({ where: { id } });
        if (!genre)
            throw new common_1.NotFoundException(`Genre with id ${id} not found`);
        return genre;
    }
    async update(id, dto) {
        const genre = await this.findOne(id);
        Object.assign(genre, dto);
        return await this.genreRepo.save(genre);
    }
    async remove(id) {
        const genre = await this.findOne(id);
        await this.genreRepo.remove(genre);
    }
};
exports.GenreService = GenreService;
exports.GenreService = GenreService = GenreService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GenreService);
//# sourceMappingURL=genre.service.js.map