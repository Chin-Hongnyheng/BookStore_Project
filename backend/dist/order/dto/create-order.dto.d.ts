export declare class OrderItemDto {
    productId: number;
    quantity: number;
    unitPrice: number;
}
export declare class CreateOrderDto {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: OrderItemDto[];
    couponCode?: string;
    discountAmount?: number;
    paymentMethod?: string;
    bankName?: string;
    telegramChatId?: string;
    userId?: string;
}
