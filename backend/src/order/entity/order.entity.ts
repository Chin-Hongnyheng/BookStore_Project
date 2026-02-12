import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // Customer info
  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  customerPhone: string;

  @Column({ type: 'text' })
  customerAddress: string;

  // Order totals
  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'varchar', nullable: true })
  couponCode: string | null;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  // Order status: PENDING | PAID | CONFIRMED | REJECTED
  @Column({ type: 'varchar', default: 'PENDING' })
  status: string;

  // Payment
  @Column({ type: 'varchar', default: 'BANK_QR' })
  paymentMethod: string;

  @Column({ type: 'varchar', nullable: true })
  paymentImage: string | null;

  @Column({ type: 'varchar', nullable: true })
  bankName: string | null;

  @Column({ type: 'varchar', nullable: true })
  telegramChatId: string | null;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @Column({ type: 'varchar', nullable: true })
  invoicePath: string | null;

  @Column({ type: 'varchar', nullable: true })
  invoicePreviewPath: string | null;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
