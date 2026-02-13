import { IsBoolean, IsOptional, IsNumber, IsDate } from 'class-validator';

export class CreateNewArrivalDto {
  @IsNumber()
  productId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsDate()
  @IsOptional()
  expiresAt?: Date;
}