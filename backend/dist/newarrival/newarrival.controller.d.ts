import { NewArrivalService } from './newarrival.service';
import { CreateNewArrivalDto } from './dto/create-new-arrival.dto';
import { UpdateNewArrivalDto } from './dto/update-new-arrival.dto';
export declare class NewArrivalController {
    private readonly newArrivalService;
    constructor(newArrivalService: NewArrivalService);
    create(dto: CreateNewArrivalDto): Promise<import("./entity/new-arrival.entity").NewArrival>;
    findAll(): Promise<import("./entity/new-arrival.entity").NewArrival[]>;
    findOne(id: string): Promise<import("./entity/new-arrival.entity").NewArrival | null>;
    update(id: string, dto: UpdateNewArrivalDto): Promise<import("./entity/new-arrival.entity").NewArrival>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
