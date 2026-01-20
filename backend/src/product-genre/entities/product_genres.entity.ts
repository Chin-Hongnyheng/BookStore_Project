import { Entity, PrimaryColumn } from 'typeorm'

@Entity('product_genres')
export class ProductGenre{

    @PrimaryColumn()
    product_id: number;

    @PrimaryColumn()
    genre_id: number;

}