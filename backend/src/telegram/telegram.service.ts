import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { TelegramLink } from './telegram-link.entity';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const FormData = require('form-data');

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken: string;
  private readonly adminChatId: string;
  private readonly baseUrl: string;
  private lastUpdateId = 0;
  private pollingInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TelegramLink)
    private readonly telegramLinkRepo: Repository<TelegramLink>,
  ) {
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN', '');
    this.adminChatId = this.configService.get<string>(
      'TELEGRAM_ADMIN_CHAT_ID',
      '',
    );
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;

    if (!this.botToken) {
      this.logger.warn(
        'TELEGRAM_BOT_TOKEN is not set — notifications disabled',
      );
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

  private isEnabled(): boolean {
    return !!this.botToken;
  }

  // ──────────────────────────────────────────────
  // POLLING — listen for /start <userId> commands
  // ──────────────────────────────────────────────

  private startPolling() {
    this.logger.log('Telegram polling started — listening for /start commands');
    this.pollingInterval = setInterval(() => this.pollUpdates(), 3000);
  }

  private async pollUpdates() {
    try {
      const { data } = await axios.get(`${this.baseUrl}/getUpdates`, {
        params: {
          offset: this.lastUpdateId + 1,
          timeout: 1,
          allowed_updates: JSON.stringify(['message']),
        },
        timeout: 10000,
      });

      if (!data.ok || !data.result?.length) return;

      for (const update of data.result) {
        this.lastUpdateId = update.update_id;
        await this.processUpdate(update);
      }
    } catch (error) {
      // Silently retry on network errors
    }
  }

  private async processUpdate(update: any) {
    const message = update.message;
    if (!message?.text) return;

    const text = message.text.trim();
    const chatId = String(message.chat.id);

    // Handle /start <userId>
    if (text.startsWith('/start ')) {
      const userId = text.replace('/start ', '').trim();
      if (!userId) return;

      await this.linkUser(userId, chatId);

      // Send confirmation to user
      try {
        await axios.post(`${this.baseUrl}/sendMessage`, {
          chat_id: chatId,
          text:
            `✅ Telegram Connected!\n\n` +
            `Your account has been linked successfully.\n` +
            `You will receive order confirmation notifications here.\n\n` +
            `📚 Happy reading with Boundora BookStore!`,
        });
      } catch (e) {
        this.logger.error(`Failed to send link confirmation: ${e.message}`);
      }

      this.logger.log(`User ${userId} linked to Telegram chat ${chatId}`);
    }
  }

  // ──────────────────────────────────────────────
  // LINK MANAGEMENT
  // ──────────────────────────────────────────────

  async linkUser(userId: string, chatId: string) {
    let link = await this.telegramLinkRepo.findOne({ where: { userId } });
    if (link) {
      link.chatId = chatId;
    } else {
      link = this.telegramLinkRepo.create({ userId, chatId });
    }
    return this.telegramLinkRepo.save(link);
  }

  async isUserConnected(userId: string): Promise<boolean> {
    const link = await this.telegramLinkRepo.findOne({ where: { userId } });
    return !!link;
  }

  async getChatIdForUser(userId: string): Promise<string | null> {
    const link = await this.telegramLinkRepo.findOne({ where: { userId } });
    return link?.chatId || null;
  }

  /**
   * 1️⃣ Notify ADMIN when a new order is placed (with payment screenshot)
   */
  async notifyAdminNewOrder(order: {
    id: number;
    customerName: string;
    customerPhone: string;
    totalAmount: number;
    paymentImage?: string | null;
    status: string;
  }) {
    if (!this.isEnabled() || !this.adminChatId) return;

    const caption =
      `📚 New Order Received\n\n` +
      `🆔 Order ID: #${order.id}\n` +
      `👤 Customer: ${order.customerName}\n` +
      `📞 Phone: ${order.customerPhone}\n` +
      `💰 Total Amount: $${Number(order.totalAmount).toFixed(2)}\n` +
      `📌 Status: ${order.status}`;

    try {
      if (order.paymentImage) {
        // Send photo with the payment screenshot
        const imagePath = path.join(
          process.cwd(),
          'uploads',
          'payments',
          order.paymentImage,
        );

        if (fs.existsSync(imagePath)) {
          const formData = new FormData();
          formData.append('chat_id', this.adminChatId);
          formData.append('photo', fs.createReadStream(imagePath));
          formData.append('caption', caption);

          await axios.post(`${this.baseUrl}/sendPhoto`, formData, {
            headers: formData.getHeaders(),
          });

          this.logger.log(
            `Telegram photo notification sent to admin for Order #${order.id}`,
          );
          return;
        }
      }

      // Fallback: send text message if no image
      await axios.post(`${this.baseUrl}/sendMessage`, {
        chat_id: this.adminChatId,
        text: caption,
      });
      this.logger.log(
        `Telegram text notification sent to admin for Order #${order.id}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send Telegram notification to admin: ${error.message}`,
      );
    }
  }

  /**
   * 2️⃣ Notify USER when admin confirms their order — with invoice preview + PDF
   */
  async notifyUserOrderConfirmed(
    userChatId: string,
    order: {
      id: number;
      totalAmount: number;
    },
    invoicePreviewPath?: string | null,
    invoicePdfPath?: string | null,
  ) {
    if (!this.isEnabled() || !userChatId) return;

    const invoiceNumber = `INV-${String(order.id).padStart(6, '0')}`;
    const invoicesDir = path.join(process.cwd(), 'uploads', 'invoices');

    // 1) Send preview image with caption
    if (invoicePreviewPath) {
      const previewFullPath = path.join(invoicesDir, invoicePreviewPath);
      if (fs.existsSync(previewFullPath)) {
        try {
          await this.sendPhoto(
            userChatId,
            previewFullPath,
            `✅ Purchase Confirmed\n\n` +
              `📄 Invoice: ${invoiceNumber}\n` +
              `💰 Total Paid: $${Number(order.totalAmount).toFixed(2)}\n\n` +
              `Thank you for your purchase! 🎉`,
          );
        } catch (e) {
          this.logger.error(`Failed to send preview image: ${e.message}`);
        }
      }
    }

    // 2) Send full PDF invoice as document
    if (invoicePdfPath) {
      const pdfFullPath = path.join(invoicesDir, invoicePdfPath);
      if (fs.existsSync(pdfFullPath)) {
        try {
          await this.sendDocument(
            userChatId,
            pdfFullPath,
            `📄 Full invoice for Order #${order.id}`,
          );
        } catch (e) {
          this.logger.error(`Failed to send PDF invoice: ${e.message}`);
        }
      }
    }

    // 3) Fallback: send text message if no files available
    if (!invoicePreviewPath && !invoicePdfPath) {
      const message =
        `✅ Purchase Confirmed\n\n` +
        `🆔 Order ID: #${order.id}\n` +
        `💰 Total Paid: $${Number(order.totalAmount).toFixed(2)}\n\n` +
        `📦 Your books are being prepared.\n` +
        `Thank you for your purchase! 🎉`;

      try {
        await axios.post(`${this.baseUrl}/sendMessage`, {
          chat_id: userChatId,
          text: message,
        });
      } catch (e) {
        this.logger.error(`Failed to send text confirmation: ${e.message}`);
      }
    }

    this.logger.log(
      `Telegram confirmation sent to user (${userChatId}) for Order #${order.id}`,
    );
  }

  // ──────────────────────────────────────────────
  // LOW-LEVEL SEND HELPERS
  // ──────────────────────────────────────────────

  /**
   * Send a photo file to a Telegram chat
   */
  async sendPhoto(chatId: string, imagePath: string, caption?: string) {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', fs.createReadStream(imagePath));
    if (caption) formData.append('caption', caption);

    await axios.post(`${this.baseUrl}/sendPhoto`, formData, {
      headers: formData.getHeaders(),
    });
  }

  /**
   * Send a document file to a Telegram chat
   */
  async sendDocument(chatId: string, filePath: string, caption?: string) {
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', fs.createReadStream(filePath));
    if (caption) formData.append('caption', caption);

    await axios.post(`${this.baseUrl}/sendDocument`, formData, {
      headers: formData.getHeaders(),
    });
  }
}
