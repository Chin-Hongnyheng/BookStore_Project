"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_product_dto_1 = require("./create-product.dto");
class UpdateProduct extends (0, mapped_types_1.PartialType)(create_product_dto_1.CreateProductDto) {
}
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=update-product.dto.js.map