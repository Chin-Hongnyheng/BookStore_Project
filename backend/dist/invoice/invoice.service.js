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
var InvoiceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require('pdfkit');
const sharp = require('sharp');
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let InvoiceService = InvoiceService_1 = class InvoiceService {
    logger = new common_1.Logger(InvoiceService_1.name);
    invoiceDir;
    constructor() {
        this.invoiceDir = path.join(process.cwd(), 'uploads', 'invoices');
        if (!fs.existsSync(this.invoiceDir)) {
            fs.mkdirSync(this.invoiceDir, { recursive: true });
        }
    }
    getInvoiceNumber(orderId) {
        return `INV-${String(orderId).padStart(6, '0')}`;
    }
    async generatePDF(order) {
        const invoiceNumber = this.getInvoiceNumber(order.id);
        const fileName = `${invoiceNumber}.pdf`;
        const filePath = path.join(this.invoiceDir, fileName);
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            doc
                .fontSize(24)
                .font('Helvetica-Bold')
                .fillColor('#1a1a2e')
                .text('Boundora BookStore', 50, 50);
            doc
                .fontSize(10)
                .font('Helvetica')
                .fillColor('#6b7280')
                .text('Your favorite online bookstore', 50, 78);
            doc
                .fontSize(18)
                .font('Helvetica-Bold')
                .fillColor('#3255fb')
                .text('INVOICE', 400, 50, { align: 'right' });
            doc
                .fontSize(10)
                .font('Helvetica')
                .fillColor('#374151')
                .text(`${invoiceNumber}`, 400, 75, { align: 'right' });
            doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 400, 90, { align: 'right' });
            doc
                .moveTo(50, 115)
                .lineTo(545, 115)
                .strokeColor('#e5e7eb')
                .lineWidth(1)
                .stroke();
            let y = 130;
            doc
                .fontSize(12)
                .font('Helvetica-Bold')
                .fillColor('#1a1a2e')
                .text('Bill To:', 50, y);
            y += 18;
            doc
                .fontSize(10)
                .font('Helvetica')
                .fillColor('#374151')
                .text(this.sanitizeForPdf(order.customerName), 50, y);
            y += 14;
            doc.text(this.sanitizeForPdf(order.customerEmail), 50, y);
            y += 14;
            doc.text(this.sanitizeForPdf(order.customerPhone), 50, y);
            y += 14;
            doc.text(this.sanitizeForPdf(order.customerAddress), 50, y, {
                width: 250,
            });
            y += 40;
            doc.fontSize(10).font('Helvetica-Bold').fillColor('#ffffff');
            doc.rect(50, y, 495, 22).fill('#3255fb');
            doc
                .fillColor('#ffffff')
                .text('#', 58, y + 6, { width: 30 })
                .text('Item', 90, y + 6, { width: 220 })
                .text('Qty', 320, y + 6, { width: 50, align: 'center' })
                .text('Price', 375, y + 6, { width: 70, align: 'right' })
                .text('Total', 460, y + 6, { width: 80, align: 'right' });
            y += 26;
            doc.font('Helvetica').fillColor('#374151');
            for (let i = 0; i < order.items.length; i++) {
                const item = order.items[i];
                if (i % 2 === 0) {
                    doc.rect(50, y, 495, 20).fill('#f8f9ff');
                }
                doc
                    .fillColor('#374151')
                    .fontSize(9)
                    .text(`${i + 1}`, 58, y + 5, { width: 30 })
                    .text(this.sanitizeForPdf(item.product?.title || 'Unknown'), 90, y + 5, { width: 220 })
                    .text(`${item.quantity}`, 320, y + 5, { width: 50, align: 'center' })
                    .text(`$${Number(item.unitPrice).toFixed(2)}`, 375, y + 5, {
                    width: 70,
                    align: 'right',
                })
                    .text(`$${Number(item.totalPrice).toFixed(2)}`, 460, y + 5, {
                    width: 80,
                    align: 'right',
                });
                y += 20;
            }
            y += 15;
            doc
                .moveTo(350, y)
                .lineTo(545, y)
                .strokeColor('#e5e7eb')
                .lineWidth(1)
                .stroke();
            y += 10;
            doc
                .fontSize(10)
                .font('Helvetica')
                .fillColor('#374151')
                .text('Subtotal:', 350, y, { width: 120 })
                .text(`$${Number(order.subtotal).toFixed(2)}`, 460, y, {
                width: 80,
                align: 'right',
            });
            y += 18;
            if (Number(order.discountAmount) > 0) {
                doc
                    .fillColor('#10b981')
                    .text(`Discount${order.couponCode ? ` (${order.couponCode})` : ''}:`, 350, y, {
                    width: 120,
                })
                    .text(`-$${Number(order.discountAmount).toFixed(2)}`, 460, y, {
                    width: 80,
                    align: 'right',
                });
                y += 18;
            }
            doc
                .moveTo(350, y)
                .lineTo(545, y)
                .strokeColor('#1a1a2e')
                .lineWidth(1.5)
                .stroke();
            y += 8;
            doc
                .fontSize(14)
                .font('Helvetica-Bold')
                .fillColor('#1a1a2e')
                .text('Total:', 350, y, { width: 120 })
                .text(`$${Number(order.totalAmount).toFixed(2)}`, 460, y, {
                width: 80,
                align: 'right',
            });
            y += 50;
            doc
                .moveTo(50, y)
                .lineTo(545, y)
                .strokeColor('#e5e7eb')
                .lineWidth(1)
                .stroke();
            y += 12;
            const cx = 272;
            const cy = y + 5;
            doc.circle(cx, cy, 8).fill('#10b981');
            doc
                .moveTo(cx - 4, cy)
                .lineTo(cx - 1, cy + 3)
                .lineTo(cx + 5, cy - 4)
                .strokeColor('#ffffff')
                .lineWidth(2)
                .stroke();
            doc
                .fontSize(10)
                .font('Helvetica-Bold')
                .fillColor('#10b981')
                .text('Payment Confirmed', cx + 14, y, { width: 200 });
            y += 20;
            doc
                .fontSize(9)
                .font('Helvetica')
                .fillColor('#9ca3af')
                .text('Thank you for your purchase at Boundora BookStore!', 50, y, {
                align: 'center',
            });
            y += 14;
            doc.text('This invoice was generated automatically. No signature required.', 50, y, { align: 'center' });
            doc.end();
            stream.on('finish', () => {
                this.logger.log(`Invoice PDF generated: ${fileName}`);
                resolve(fileName);
            });
            stream.on('error', (err) => {
                this.logger.error(`Failed to generate PDF: ${err.message}`);
                reject(err);
            });
        });
    }
    async generatePreviewImage(order) {
        const invoiceNumber = this.getInvoiceNumber(order.id);
        const fileName = `${invoiceNumber}-preview.png`;
        const filePath = path.join(this.invoiceDir, fileName);
        const width = 600;
        const height = 520;
        const itemCount = order.items.length;
        const cleanName = this.sanitizeForPdf(order.customerName) || 'Customer';
        const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <!-- Background -->
  <rect width="${width}" height="${height}" rx="16" fill="#ffffff"/>
  <rect width="${width}" height="${height}" rx="16" fill="none" stroke="#e5e7eb" stroke-width="1"/>

  <!-- Top accent bar -->
  <rect width="${width}" height="6" rx="0" fill="#3255fb"/>
  <rect x="0" y="0" width="${width}" height="6" fill="#3255fb"/>

  <!-- Store name -->
  <text x="${width / 2}" y="50" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="bold" fill="#1a1a2e">
    Boundora BookStore
  </text>

  <!-- Invoice label -->
  <text x="${width / 2}" y="76" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#6b7280">
    Invoice: ${invoiceNumber}
  </text>

  <!-- Divider -->
  <line x1="60" y1="96" x2="${width - 60}" y2="96" stroke="#e5e7eb" stroke-width="1"/>

  <!-- Row: Order ID -->
  <text x="80" y="128" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#6b7280">Order ID</text>
  <text x="${width - 80}" y="128" text-anchor="end"
        font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="bold" fill="#1a1a2e">#${order.id}</text>

  <!-- Row: Customer -->
  <text x="80" y="158" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#6b7280">Customer</text>
  <text x="${width - 80}" y="158" text-anchor="end"
        font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="bold" fill="#1a1a2e">${this.escapeXml(cleanName)}</text>

  <!-- Row: Date -->
  <text x="80" y="188" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#6b7280">Date</text>
  <text x="${width - 80}" y="188" text-anchor="end"
        font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="bold" fill="#1a1a2e">${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</text>

  <!-- Row: Items -->
  <text x="80" y="218" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#6b7280">Items</text>
  <text x="${width - 80}" y="218" text-anchor="end"
        font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="bold" fill="#1a1a2e">${itemCount} item${itemCount > 1 ? 's' : ''}</text>

  <!-- Divider -->
  <line x1="60" y1="240" x2="${width - 60}" y2="240" stroke="#e5e7eb" stroke-width="1"/>

  <!-- Row: Subtotal -->
  <text x="80" y="272" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#6b7280">Subtotal</text>
  <text x="${width - 80}" y="272" text-anchor="end"
        font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="bold" fill="#374151">$${Number(order.subtotal).toFixed(2)}</text>

  <!-- Row: Discount -->
  <text x="80" y="302" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="#6b7280">Discount</text>
  <text x="${width - 80}" y="302" text-anchor="end"
        font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="bold" fill="#10b981">${Number(order.discountAmount) > 0 ? '-$' + Number(order.discountAmount).toFixed(2) : '$0.00'}</text>

  <!-- Total divider -->
  <line x1="60" y1="326" x2="${width - 60}" y2="326" stroke="#1a1a2e" stroke-width="1.5"/>

  <!-- Row: Total -->
  <text x="80" y="358" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="bold" fill="#1a1a2e">Total Paid</text>
  <text x="${width - 80}" y="358" text-anchor="end"
        font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="bold" fill="#3255fb">$${Number(order.totalAmount).toFixed(2)}</text>

  <!-- Confirmed badge -->
  <rect x="${width / 2 - 120}" y="388" width="240" height="40" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>
  <!-- Checkmark circle -->
  <circle cx="${width / 2 - 80}" cy="408" r="10" fill="#059669"/>
  <polyline points="${width / 2 - 85},408 ${width / 2 - 81},412 ${width / 2 - 74},403" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${width / 2 + 10}" y="414" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="bold" fill="#059669">Payment Confirmed</text>

  <!-- Thank you -->
  <text x="${width / 2}" y="468" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="12" fill="#9ca3af">
    Thank you for your purchase at Boundora BookStore!
  </text>
</svg>`;
        await sharp(Buffer.from(svg, 'utf-8')).png().toFile(filePath);
        this.logger.log(`Invoice preview image generated: ${fileName}`);
        return fileName;
    }
    sanitizeForPdf(str) {
        if (!str)
            return '';
        const garbagePrefix = "&oe&š&C &š&.&'&Ò&'.";
        return str
            .replace(garbagePrefix, '')
            .replace(/&[^ ]+/g, '')
            .trim();
    }
    escapeXml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = InvoiceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map