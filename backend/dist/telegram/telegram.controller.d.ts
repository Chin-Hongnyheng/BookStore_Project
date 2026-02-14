import { TelegramService } from './telegram.service';
export declare class TelegramController {
    private readonly telegramService;
    constructor(telegramService: TelegramService);
    getStatus(userId: string): Promise<{
        connected: boolean;
    }>;
    webhook(body: any): Promise<{
        ok: boolean;
    }>;
}
