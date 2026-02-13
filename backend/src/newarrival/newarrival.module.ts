import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewArrivalService } from './newarrival.service';
import { NewArrivalController } from './newarrival.controller';
import { NewArrival } from './entity/new-arrival.entity';
import { Product } from '../product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewArrival, Product])],
  controllers: [NewArrivalController],
  providers: [NewArrivalService],
  exports: [NewArrivalService],
})
export class NewArrivalModule {}
