import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from '../../product/entity/product.entity';

@Entity('genres')
export class Genre{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    name: string;
    // could be comedy, action

    @ManyToMany(() => Product, (product) => product.genres)
    products: Product[];
}