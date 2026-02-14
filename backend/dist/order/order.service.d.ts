import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Product } from '../product/entity/product.entity';
import { TelegramService } from '../telegram/telegram.service';
import { InvoiceService } from '../invoice/invoice.service';
export declare class OrderService {
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly productRepo;
    private readonly telegramService;
    private readonly invoiceService;
    private readonly logger;
    constructor(orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, productRepo: Repository<Product>, telegramService: TelegramService, invoiceService: InvoiceService);
    create(dto: CreateOrderDto, paymentImage?: string): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<Order>;
    uploadPayment(id: number, paymentImage: string): Promise<Order>;
    remove(id: number): Promise<void>;
}
