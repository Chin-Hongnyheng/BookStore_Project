"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const telegram_link_entity_1 = require("./telegram-link.entity");
const FormData = require('form-data');
let TelegramService = TelegramService_1 = class TelegramService {
    configService;
    telegramLinkRepo;
    logger = new common_1.Logger(TelegramService_1.name);
    botToken;
    adminChatId;
    baseUrl;
    lastUpdateId = 0;
    pollingInterval = null;
    constructor(configService, telegramLinkRepo) {
        this.configService = configService;
        this.telegramLinkRepo = telegramLinkRepo;
        this.botToken = this.configService.get('TELEGRAM_BOT_TOKEN', '');
        this.adminChatId = this.configService.get('TELEGRAM_ADMIN_CHAT_ID', '');
        this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
        if (!this.botToken) {
            this.logger.warn('TELEGRAM_BOT_TOKEN is not set — notifications disabled');
        }
        if (!this.adminChatId) {
            this.logger.warn('TELEGRAM_ADMIN_CHAT_ID is not set');
        }
    }
    async onModuleInit() {
        if (this.isEnabled()) {
            this.startPolling();
        }
    }
    isEnabled() {
        return !!this.botToken;
    }
    startPolling() {
        this.logger.log('Telegram polling started — listening for /start commands');
        this.pollingInterval = setInterval(() => this.pollUpdates(), 3000);
    }
    async pollUpdates() {
        try {
            const { data } = await axios_1.default.get(`${this.baseUrl}/getUpdates`, {
                params: {
                    offset: this.lastUpdateId + 1,
                    timeout: 1,
                    allowed_updates: JSON.stringify(['message']),
                },
                timeout: 10000,
            });
            if (!data.ok || !data.result?.length)
                return;
            for (const update of data.result) {
                this.lastUpdateId = update.update_id;
                await this.processUpdate(update);
            }
        }
        catch (error) {
        }
    }
    async processUpdate(update) {
        const message = update.message;
        if (!message?.text)
            return;
        const text = message.text.trim();
        const chatId = String(message.chat.id);
        if (text.startsWith('/start ')) {
            const userId = text.replace('/start ', '').trim();
            if (!userId)
                return;
            await this.linkUser(userId, chatId);
            try {
                await axios_1.default.post(`${this.baseUrl}/sendMessage`, {
                    chat_id: chatId,
                    text: `✅ Telegram Connected!\n\n` +
                        `Your account has been linked successfully.\n` +
                        `You will receive order confirmation notifications here.\n\n` +
                        `📚 Happy reading with Boundora BookStore!`,
                });
            }
            catch (e) {
                this.logger.error(`Failed to send link confirmation: ${e.message}`);
            }
            this.logger.log(`User ${userId} linked to Telegram chat ${chatId}`);
        }
    }
    async linkUser(userId, chatId) {
        let link = await this.telegramLinkRepo.findOne({ where: { userId } });
        if (link) {
            link.chatId = chatId;
        }
        else {
            link = this.telegramLinkRepo.create({ userId, chatId });
        }
        return this.telegramLinkRepo.save(link);
    }
    async isUserConnected(userId) {
        const link = await this.telegramLinkRepo.findOne({ where: { userId } });
        return !!link;
    }
    async getChatIdForUser(userId) {
        const link = await this.telegramLinkRepo.findOne({ where: { userId } });
        return link?.chatId || null;
    }
    async notifyAdminNewOrder(order) {
        if (!this.isEnabled() || !this.adminChatId)
            return;
        const caption = `📚 New Order Received\n\n` +
            `🆔 Order ID: #${order.id}\n` +
            `👤 Customer: ${order.customerName}\n` +
            `📞 Phone: ${order.customerPhone}\n` +
            `💰 Total Amount: $${Number(order.totalAmount).toFixed(2)}\n` +
            `📌 Status: ${order.status}`;
        try {
            if (order.paymentImage) {
                const imagePath = path.join(process.cwd(), 'uploads', 'payments', order.paymentImage);
                if (fs.existsSync(imagePath)) {
                    const formData = new FormData();
                    formData.append('chat_id', this.adminChatId);
                    formData.append('photo', fs.createReadStream(imagePath));
                    formData.append('caption', caption);
                    await axios_1.default.post(`${this.baseUrl}/sendPhoto`, formData, {
                        headers: formData.getHeaders(),
                    });
                    this.logger.log(`Telegram photo notification sent to admin for Order #${order.id}`);
                    return;
                }
            }
            await axios_1.default.post(`${this.baseUrl}/sendMessage`, {
                chat_id: this.adminChatId,
                text: caption,
            });
            this.logger.log(`Telegram text notification sent to admin for Order #${order.id}`);
        }
        catch (error) {
            this.logger.error(`Failed to send Telegram notification to admin: ${error.message}`);
        }
    }
    async notifyUserOrderConfirmed(userChatId, order, invoicePreviewPath, invoicePdfPath) {
        if (!this.isEnabled() || !userChatId)
            return;
        const invoiceNumber = `INV-${String(order.id).padStart(6, '0')}`;
        const invoicesDir = path.join(process.cwd(), 'uploads', 'invoices');
        if (invoicePreviewPath) {
            const previewFullPath = path.join(invoicesDir, invoicePreviewPath);
            if (fs.existsSync(previewFullPath)) {
                try {
                    await this.sendPhoto(userChatId, previewFullPath, `✅ Purchase Confirmed\n\n` +
                        `📄 Invoice: ${invoiceNumber}\n` +
                        `💰 Total Paid: $${Number(order.totalAmount).toFixed(2)}\n\n` +
                        `Thank you for your purchase! 🎉`);
                }
                catch (e) {
                    this.logger.error(`Failed to send preview image: ${e.message}`);
                }
            }
        }
        if (invoicePdfPath) {
            const pdfFullPath = path.join(invoicesDir, invoicePdfPath);
            if (fs.existsSync(pdfFullPath)) {
                try {
                    await this.sendDocument(userChatId, pdfFullPath, `📄 Full invoice for Order #${order.id}`);
                }
                catch (e) {
                    this.logger.error(`Failed to send PDF invoice: ${e.message}`);
                }
            }
        }
        if (!invoicePreviewPath && !invoicePdfPath) {
            const message = `✅ Purchase Confirmed\n\n` +
                `🆔 Order ID: #${order.id}\n` +
                `💰 Total Paid: $${Number(order.totalAmount).toFixed(2)}\n\n` +
                `📦 Your books are being prepared.\n` +
                `Thank you for your purchase! 🎉`;
            try {
                await axios_1.default.post(`${this.baseUrl}/sendMessage`, {
                    chat_id: userChatId,
                    text: message,
                });
            }
            catch (e) {
                this.logger.error(`Failed to send text confirmation: ${e.message}`);
            }
        }
        this.logger.log(`Telegram confirmation sent to user (${userChatId}) for Order #${order.id}`);
    }
    async sendPhoto(chatId, imagePath, caption) {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', fs.createReadStream(imagePath));
        if (caption)
            formData.append('caption', caption);
        await axios_1.default.post(`${this.baseUrl}/sendPhoto`, formData, {
            headers: formData.getHeaders(),
        });
    }
    async sendDocument(chatId, filePath, caption) {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('document', fs.createReadStream(filePath));
        if (caption)
            formData.append('caption', caption);
        await axios_1.default.post(`${this.baseUrl}/sendDocument`, formData, {
            headers: formData.getHeaders(),
        });
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(telegram_link_entity_1.TelegramLink)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map