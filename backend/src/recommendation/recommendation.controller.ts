import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';
import { recommendation } from './entity/recommendation.entity';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  create(@Body() dto: CreateRecommendationDto): Promise<recommendation> {
    return this.recommendationService.create(dto);
  }

  @Get()
  findAll(): Promise<recommendation[]> {
    return this.recommendationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<recommendation> {
    return this.recommendationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRecommendationDto): Promise<recommendation> {
    return this.recommendationService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.recommendationService.remove(id);
  }
}