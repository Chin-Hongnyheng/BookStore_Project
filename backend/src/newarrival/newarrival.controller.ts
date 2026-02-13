import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewArrivalService } from './newarrival.service';
import { CreateNewArrivalDto } from './dto/create-new-arrival.dto';
import { UpdateNewArrivalDto } from './dto/update-new-arrival.dto';

@Controller('new-arrivals')
export class NewArrivalController {
  constructor(private readonly newArrivalService: NewArrivalService) {}

  @Post()
  create(@Body() dto: CreateNewArrivalDto) {
    return this.newArrivalService.create(dto);
  }

  @Get()
  findAll() {
    return this.newArrivalService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newArrivalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewArrivalDto) {
    return this.newArrivalService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newArrivalService.remove(+id);
  }
}
