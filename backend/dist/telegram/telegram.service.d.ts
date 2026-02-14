import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { TelegramLink } from './telegram-link.entity';
export declare class TelegramService implements OnModuleInit {
    private readonly configService;
    private readonly telegramLinkRepo;
    private readonly logger;
    private readonly botToken;
    private readonly adminChatId;
    private readonly baseUrl;
    private lastUpdateId;
    private pollingInterval;
    constructor(configService: ConfigService, telegramLinkRepo: Repository<TelegramLink>);
    onModuleInit(): Promise<void>;
    private isEnabled;
    private startPolling;
    private pollUpdates;
    private processUpdate;
    linkUser(userId: string, chatId: string): Promise<TelegramLink>;
    isUserConnected(userId: string): Promise<boolean>;
    getChatIdForUser(userId: string): Promise<string | null>;
    notifyAdminNewOrder(order: {
        id: number;
        customerName: string;
        customerPhone: string;
        totalAmount: number;
        paymentImage?: string | null;
        status: string;
    }): Promise<void>;
    notifyUserOrderConfirmed(userChatId: string, order: {
        id: number;
        totalAmount: number;
    }, invoicePreviewPath?: string | null, invoicePdfPath?: string | null): Promise<void>;
    sendPhoto(chatId: string, imagePath: string, caption?: string): Promise<void>;
    sendDocument(chatId: string, filePath: string, caption?: string): Promise<void>;
}
