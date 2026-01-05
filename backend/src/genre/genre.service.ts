import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class GenreService {
  private readonly logger = new Logger(GenreService.name); // <-- add logger
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
  ) {}

  // Create a new genre
  async create(dto: CreateGenreDto): Promise<Genre> {
  console.log('RAW console.log reached');
  this.logger.log('create successfully'); 

    const genre = this.genreRepo.create(dto);
    return await this.genreRepo.save(genre);
  }

  // Get all genres
  async findAll(): Promise<Genre[]> {
    return await this.genreRepo.find();
  }  

  // Get one genre by id
  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepo.findOne({ where: { id } });
    if (!genre) throw new NotFoundException(`Genre with id ${id} not found`);
    return genre;
  }

  // Update a genre
  async update(id: number, dto: Partial<CreateGenreDto>): Promise<Genre> {
    const genre = await this.findOne(id);
    Object.assign(genre, dto);
    return await this.genreRepo.save(genre);
  }

  // Delete a genre
  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);
    await this.genreRepo.remove(genre);
  }
}
