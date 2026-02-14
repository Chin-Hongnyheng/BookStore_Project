export interface InvoiceOrderData {
    id: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    subtotal: number;
    discountAmount: number;
    couponCode: string | null;
    totalAmount: number;
    createdAt: Date;
    items: {
        product: {
            title: string;
        };
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    }[];
}
export declare class InvoiceService {
    private readonly logger;
    private readonly invoiceDir;
    constructor();
    private getInvoiceNumber;
    generatePDF(order: InvoiceOrderData): Promise<string>;
    generatePreviewImage(order: InvoiceOrderData): Promise<string>;
    private sanitizeForPdf;
    private escapeXml;
}
