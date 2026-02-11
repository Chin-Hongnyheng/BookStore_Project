import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  discountType: string; // 'percentage' | 'fixed'

  @Column('decimal', { precision: 10, scale: 2 })
  discountValue: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  minimumPurchase: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  maximumDiscount: number | null; // Cap for percentage discounts

  @Column({ default: -1 })
  usageLimit: number; // -1 = unlimited

  @Column({ default: 0 })
  usageCount: number;

  @Column({ default: 1 })
  usageLimitPerUser: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFirstTimeOnly: boolean; // First-time user discount flag

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
