import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    create(dto: CreateGenreDto): Promise<import("./entity/genre.entity").Genre>;
    findAll(): Promise<import("./entity/genre.entity").Genre[]>;
    findOne(id: number): Promise<import("./entity/genre.entity").Genre>;
    update(id: number, dto: Partial<CreateGenreDto>): Promise<import("./entity/genre.entity").Genre>;
    remove(id: number): Promise<void>;
}
