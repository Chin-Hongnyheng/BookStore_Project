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
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entity/order.entity");
const order_item_entity_1 = require("./entity/order-item.entity");
const product_entity_1 = require("../product/entity/product.entity");
const telegram_service_1 = require("../telegram/telegram.service");
const invoice_service_1 = require("../invoice/invoice.service");
let OrderService = OrderService_1 = class OrderService {
    orderRepo;
    orderItemRepo;
    productRepo;
    telegramService;
    invoiceService;
    logger = new common_1.Logger(OrderService_1.name);
    constructor(orderRepo, orderItemRepo, productRepo, telegramService, invoiceService) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.productRepo = productRepo;
        this.telegramService = telegramService;
        this.invoiceService = invoiceService;
    }
    async create(dto, paymentImage) {
        const orderItems = [];
        let subtotal = 0;
        for (const item of dto.items) {
            const product = await this.productRepo.findOne({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product with id ${item.productId} not found`);
            }
            const totalPrice = item.unitPrice * item.quantity;
            subtotal += totalPrice;
            const orderItem = this.orderItemRepo.create({
                product,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice,
            });
            orderItems.push(orderItem);
        }
        const discountAmount = dto.discountAmount || 0;
        const totalAmount = Math.max(0, subtotal - discountAmount);
        const order = this.orderRepo.create({
            customerName: dto.customerName,
            customerEmail: dto.customerEmail,
            customerPhone: dto.customerPhone,
            customerAddress: dto.customerAddress,
            subtotal,
            discountAmount,
            couponCode: dto.couponCode || null,
            totalAmount,
            status: 'PENDING',
            paymentMethod: dto.paymentMethod || 'BANK_QR',
            paymentImage: paymentImage || null,
            bankName: dto.bankName || null,
            telegramChatId: dto.telegramChatId || null,
            userId: dto.userId || null,
            items: orderItems,
        });
        if (dto.userId && !order.telegramChatId) {
            const chatId = await this.telegramService.getChatIdForUser(dto.userId);
            if (chatId) {
                order.telegramChatId = chatId;
            }
        }
        const saved = await this.orderRepo.save(order);
        this.logger.log(`Order #${saved.id} created — Total: $${totalAmount}`);
        await this.telegramService.notifyAdminNewOrder({
            id: saved.id,
            customerName: saved.customerName,
            customerPhone: saved.customerPhone,
            totalAmount: saved.totalAmount,
            paymentImage: saved.paymentImage,
            status: saved.status,
        });
        return saved;
    }
    async findAll() {
        return this.orderRepo.find({
            relations: ['items', 'items.product'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['items', 'items.product'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order #${id} not found`);
        return order;
    }
    async updateStatus(id, dto) {
        const order = await this.findOne(id);
        order.status = dto.status;
        let saved = await this.orderRepo.save(order);
        this.logger.log(`Order #${id} status updated to ${dto.status}`);
        if (dto.status === 'CONFIRMED') {
            try {
                const pdfFileName = await this.invoiceService.generatePDF(saved);
                saved.invoicePath = pdfFileName;
                this.logger.log(`Invoice PDF generated for Order #${id}: ${pdfFileName}`);
                const previewFileName = await this.invoiceService.generatePreviewImage(saved);
                saved.invoicePreviewPath = previewFileName;
                this.logger.log(`Invoice preview generated for Order #${id}: ${previewFileName}`);
                saved = await this.orderRepo.save(saved);
            }
            catch (err) {
                this.logger.error(`Failed to generate invoice for Order #${id}: ${err.message}`);
            }
            if (order.telegramChatId) {
                try {
                    await this.telegramService.notifyUserOrderConfirmed(order.telegramChatId, {
                        id: saved.id,
                        totalAmount: saved.totalAmount,
                    }, saved.invoicePreviewPath, saved.invoicePath);
                }
                catch (err) {
                    this.logger.error(`Telegram notification failed for Order #${id}: ${err.message}`);
                }
            }
        }
        return saved;
    }
    async uploadPayment(id, paymentImage) {
        const order = await this.findOne(id);
        order.paymentImage = paymentImage;
        order.status = 'PAID';
        const saved = await this.orderRepo.save(order);
        this.logger.log(`Order #${id} payment uploaded`);
        return saved;
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.orderRepo.remove(order);
        this.logger.log(`Order #${id} deleted`);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        telegram_service_1.TelegramService,
        invoice_service_1.InvoiceService])
], OrderService);
//# sourceMappingURL=order.service.js.map