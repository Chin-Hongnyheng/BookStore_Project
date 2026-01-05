import { Controller, Body, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  // Create a genre
  @Post()
  create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  // Get all genres
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  // Get one genre by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.findOne(id);
  }

  // Update a genre
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateGenreDto>,
  ) {
    return this.genreService.update(id, dto);
  }

  // Delete a genre
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.remove(id);
  }
}
