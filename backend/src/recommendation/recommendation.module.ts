import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { recommendation } from './entity/recommendation.entity';
import { Product } from '../product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([recommendation, Product])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}