"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNewArrivalDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_new_arrival_dto_1 = require("./create-new-arrival.dto");
class UpdateNewArrivalDto extends (0, mapped_types_1.PartialType)(create_new_arrival_dto_1.CreateNewArrivalDto) {
}
exports.UpdateNewArrivalDto = UpdateNewArrivalDto;
//# sourceMappingURL=update-new-arrival.dto.js.map