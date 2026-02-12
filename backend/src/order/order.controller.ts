import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('paymentImage', {
      storage: diskStorage({
        destination: './uploads/payments',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @Body() body: any,
    @UploadedFile() paymentImage?: Express.Multer.File,
  ) {
    // Parse the order data from the form
    const dto: CreateOrderDto = {
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      customerAddress: body.customerAddress,
      items:
        typeof body.items === 'string' ? JSON.parse(body.items) : body.items,
      couponCode: body.couponCode || undefined,
      discountAmount: body.discountAmount
        ? Number(body.discountAmount)
        : undefined,
      paymentMethod: body.paymentMethod || 'BANK_QR',
      bankName: body.bankName || undefined,
      telegramChatId: body.telegramChatId || undefined,
      userId: body.userId || undefined,
    };

    return this.orderService.create(dto, paymentImage?.filename);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(id, dto);
  }

  @Patch(':id/payment')
  @UseInterceptors(
    FileInterceptor('paymentImage', {
      storage: diskStorage({
        destination: './uploads/payments',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  uploadPayment(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() paymentImage: Express.Multer.File,
  ) {
    return this.orderService.uploadPayment(id, paymentImage.filename);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
