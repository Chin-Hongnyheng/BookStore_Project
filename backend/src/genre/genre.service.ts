  import { Injectable, NotFoundException, Logger } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Genre } from './entity/genre.entity';
  import { CreateGenreDto } from './dto/create-genre.dto';

  @Injectable()
  export class GenreService {
    private readonly logger = new Logger(GenreService.name);

    constructor(
      @InjectRepository(Genre)
      private readonly genreRepo: Repository<Genre>,
    ) {}

    async create(dto: CreateGenreDto, file?: Express.Multer.File) {
      const genre = this.genreRepo.create({
        ...dto,
        image: file?.filename || null,
      });

      this.logger.log('Genre created');
      return this.genreRepo.save(genre);
    }

    async findAll() {
      return this.genreRepo.find();
    }

    async findOne(id: number) {
      const genre = await this.genreRepo.findOne({ where: { id } });
      if (!genre) throw new NotFoundException(`Genre with id ${id} not found`);
      return genre;
    }

    async update(
      id: number,
      dto: Partial<CreateGenreDto>,
      file?: Express.Multer.File,
    ) {
      const genre = await this.findOne(id);

      Object.assign(genre, dto);

      if (file) {
        genre.image = file.filename;
      }

      this.logger.log('Genre updated');
      return this.genreRepo.save(genre);
    }

    async remove(id: number) {
      const genre = await this.findOne(id);
      return this.genreRepo.remove(genre);
    }
  }
