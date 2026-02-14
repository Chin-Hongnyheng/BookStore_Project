import { Repository } from 'typeorm';
import { NewArrival } from './entity/new-arrival.entity';
import { Product } from '../product/entity/product.entity';
import { CreateNewArrivalDto } from './dto/create-new-arrival.dto';
import { UpdateNewArrivalDto } from './dto/update-new-arrival.dto';
export declare class NewArrivalService {
    private newArrivalRepository;
    private productRepository;
    constructor(newArrivalRepository: Repository<NewArrival>, productRepository: Repository<Product>);
    create(dto: CreateNewArrivalDto): Promise<NewArrival>;
    findAllActive(): Promise<NewArrival[]>;
    findOne(id: number): Promise<NewArrival | null>;
    update(id: number, dto: UpdateNewArrivalDto): Promise<NewArrival>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
