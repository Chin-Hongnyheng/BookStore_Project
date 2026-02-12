import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  status: string; // 'PENDING' | 'PAID' | 'CONFIRMED' | 'REJECTED'

  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
