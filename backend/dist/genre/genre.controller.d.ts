import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    findAll(): Promise<import("./entity/genre.entity").Genre[]>;
    findOne(id: number): Promise<import("./entity/genre.entity").Genre>;
    create(file: Express.Multer.File, dto: CreateGenreDto): Promise<import("./entity/genre.entity").Genre>;
    uploadImage(id: number, file: Express.Multer.File): Promise<import("./entity/genre.entity").Genre>;
    update(id: number, file: Express.Multer.File, dto: Partial<CreateGenreDto>): Promise<import("./entity/genre.entity").Genre>;
    remove(id: number): Promise<import("./entity/genre.entity").Genre>;
}
