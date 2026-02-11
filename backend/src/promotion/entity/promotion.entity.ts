import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entity/product.entity';

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // 'Sale', '% Off', 'Hot Badge'

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'varchar', nullable: true })
  status: string; // 'Active', 'Upcoming', 'Expired'

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToMany(() => Product, { cascade: true })
  @JoinTable({
    name: 'promotion_products',
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;
}
