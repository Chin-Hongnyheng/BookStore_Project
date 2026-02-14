import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    subtotal: number;
    discountAmount: number;
    couponCode: string | null;
    totalAmount: number;
    status: string;
    paymentMethod: string;
    paymentImage: string | null;
    bankName: string | null;
    telegramChatId: string | null;
    userId: string | null;
    invoicePath: string | null;
    invoicePreviewPath: string | null;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
