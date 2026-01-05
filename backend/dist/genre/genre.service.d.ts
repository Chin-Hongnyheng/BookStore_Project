import { Repository } from 'typeorm';
import { Genre } from './entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
export declare class GenreService {
    private readonly genreRepo;
    private readonly logger;
    constructor(genreRepo: Repository<Genre>);
    create(dto: CreateGenreDto): Promise<Genre>;
    findAll(): Promise<Genre[]>;
    findOne(id: number): Promise<Genre>;
    update(id: number, dto: Partial<CreateGenreDto>): Promise<Genre>;
    remove(id: number): Promise<void>;
}
