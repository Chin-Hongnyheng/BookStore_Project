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
exports.NewArrivalController = void 0;
const common_1 = require("@nestjs/common");
const newarrival_service_1 = require("./newarrival.service");
const create_new_arrival_dto_1 = require("./dto/create-new-arrival.dto");
const update_new_arrival_dto_1 = require("./dto/update-new-arrival.dto");
let NewArrivalController = class NewArrivalController {
    newArrivalService;
    constructor(newArrivalService) {
        this.newArrivalService = newArrivalService;
    }
    create(dto) {
        return this.newArrivalService.create(dto);
    }
    findAll() {
        return this.newArrivalService.findAllActive();
    }
    findOne(id) {
        return this.newArrivalService.findOne(+id);
    }
    update(id, dto) {
        return this.newArrivalService.update(+id, dto);
    }
    remove(id) {
        return this.newArrivalService.remove(+id);
    }
};
exports.NewArrivalController = NewArrivalController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_arrival_dto_1.CreateNewArrivalDto]),
    __metadata("design:returntype", void 0)
], NewArrivalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewArrivalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewArrivalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_new_arrival_dto_1.UpdateNewArrivalDto]),
    __metadata("design:returntype", void 0)
], NewArrivalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewArrivalController.prototype, "remove", null);
exports.NewArrivalController = NewArrivalController = __decorate([
    (0, common_1.Controller)('new-arrivals'),
    __metadata("design:paramtypes", [newarrival_service_1.NewArrivalService])
], NewArrivalController);
//# sourceMappingURL=newarrival.controller.js.map