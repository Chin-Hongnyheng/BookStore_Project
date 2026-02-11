import {
  Controller,
  Post,
  Delete,
  Get,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

const multerOptions = {
  storage: multer.diskStorage({
    destination: './uploads/genres',
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + '-' + file.originalname);
    },
  }),
};

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateGenreDto,
  ) {
    return this.genreService.create(dto, file);
  }
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.genreService.update(id, {}, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: Partial<CreateGenreDto>,
  ) {
    return this.genreService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.remove(id);
  }
}
