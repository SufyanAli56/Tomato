import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'])
  status: string;
}