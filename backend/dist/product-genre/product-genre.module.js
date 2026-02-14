"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGenreModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_genre_controller_1 = require("./product-genre.controller");
const product_genre_service_1 = require("./product-genre.service");
const product_genres_entity_1 = require("./entities/product_genres.entity");
let ProductGenreModule = class ProductGenreModule {
};
exports.ProductGenreModule = ProductGenreModule;
exports.ProductGenreModule = ProductGenreModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_genres_entity_1.ProductGenre])],
        controllers: [product_genre_controller_1.ProductGenreController],
        providers: [product_genre_service_1.ProductGenreService],
    })
], ProductGenreModule);
//# sourceMappingURL=product-genre.module.js.map