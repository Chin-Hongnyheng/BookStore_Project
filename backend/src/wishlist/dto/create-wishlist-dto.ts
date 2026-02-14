import { IsInt, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateWishlistDto {
  @IsInt()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  productIds: number[];
}
