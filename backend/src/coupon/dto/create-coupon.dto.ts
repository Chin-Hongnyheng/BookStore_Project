import { IsString, IsNumber, IsDateString, IsOptional, IsBoolean, IsIn, Min, MaxLength, MinLength } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  code: string;

  @IsString()
  name: string;

  @IsString()
  @IsIn(['percentage', 'fixed'])
  discountType: string;

  @IsNumber()
  @Min(0)
  discountValue: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumPurchase?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumDiscount?: number;

  @IsOptional()
  @IsNumber()
  usageLimit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  usageLimitPerUser?: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFirstTimeOnly?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
