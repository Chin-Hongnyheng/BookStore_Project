import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Product } from '../product/entity/product.entity';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly telegramService: TelegramService,
  ) {}

  async create(dto: CreateOrderDto, paymentImage?: string) {
    // Build order items
    const orderItems: OrderItem[] = [];
    let subtotal = 0;

    for (const item of dto.items) {
      const product = await this.productRepo.findOne({
        where: { id: item.productId },
      });
      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
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

    // Auto-lookup Telegram chatId from linked account if userId is provided
    if (dto.userId && !order.telegramChatId) {
      const chatId = await this.telegramService.getChatIdForUser(dto.userId);
      if (chatId) {
        order.telegramChatId = chatId;
      }
    }

    const saved = await this.orderRepo.save(order);
    this.logger.log(`Order #${saved.id} created — Total: $${totalAmount}`);

    // Send Telegram notification to admin with payment screenshot
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

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = await this.findOne(id);
    order.status = dto.status;
    const saved = await this.orderRepo.save(order);
    this.logger.log(`Order #${id} status updated to ${dto.status}`);

    // Send Telegram notification to user when order is CONFIRMED
    if (dto.status === 'CONFIRMED' && order.telegramChatId) {
      await this.telegramService.notifyUserOrderConfirmed(
        order.telegramChatId,
        {
          id: saved.id,
          totalAmount: saved.totalAmount,
        },
      );
    }

    return saved;
  }

  async uploadPayment(id: number, paymentImage: string) {
    const order = await this.findOne(id);
    order.paymentImage = paymentImage;
    order.status = 'PAID';
    const saved = await this.orderRepo.save(order);
    this.logger.log(`Order #${id} payment uploaded`);
    return saved;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
    this.logger.log(`Order #${id} deleted`);
  }
}
