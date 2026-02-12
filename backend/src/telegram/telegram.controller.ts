import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  /**
   * Check if a user has connected their Telegram
   * GET /telegram/status/:userId
   */
  @Get('status/:userId')
  async getStatus(@Param('userId') userId: string) {
    const connected = await this.telegramService.isUserConnected(userId);
    return { connected };
  }

  /**
   * Webhook endpoint for production use (optional)
   * POST /telegram/webhook
   */
  @Post('webhook')
  async webhook(@Body() body: any) {
    if (body?.message?.text?.startsWith('/start ')) {
      const userId = body.message.text.replace('/start ', '').trim();
      const chatId = String(body.message.chat.id);
      if (userId) {
        await this.telegramService.linkUser(userId, chatId);
      }
    }
    return { ok: true };
  }
}
