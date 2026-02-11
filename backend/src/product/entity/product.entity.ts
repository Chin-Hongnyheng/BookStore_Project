import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from '../../genre/entity/genre.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string | null;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column()
  inStock: number;

  @Column({ default: 0 })
  countSold: number;

  @Column({ type: 'date', nullable: true })
  published: Date | null;

  @Column()
  pages: number;

  @Column()
  language: string;

  @ManyToMany(() => Genre, (genre) => genre.products, { cascade: true })
  @JoinTable({
    name: 'product_genres',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: Genre[];

  @Column({ type: 'float', nullable: true })
  rating: number;
}
