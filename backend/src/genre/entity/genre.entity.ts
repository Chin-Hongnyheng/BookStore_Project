import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from '../../product/entity/product.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
  // could be comedy, action

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string | null;

  @Column({ type: 'text', nullable: true })
  svgIcon: string;

  @ManyToMany(() => Product, (product) => product.genres)
  products: Product[];
}
