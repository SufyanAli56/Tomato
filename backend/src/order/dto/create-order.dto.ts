import { 
    IsString, 
    IsNotEmpty, 
    IsArray, 
    IsNumber, 
    IsOptional, 
    IsEnum,
    IsPhoneNumber,
    Min,
    ValidateNested,
    ArrayMinSize
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class OrderItemDto {
    @IsNotEmpty()
    @IsString()
    menuItemId: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
  }
  
  export class CreateOrderDto {
    @IsOptional()
    @IsString()
    userId?: string;
  
    @IsNotEmpty()
    @IsString()
    customerName: string;
  
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('IN') // Change 'IN' to your country code or remove for generic
    customerPhone: string;
  
    @IsNotEmpty()
    @IsString()
    deliveryAddress: string;
  
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    totalAmount: number;
  
    @IsOptional()
    @IsString()
    specialInstructions?: string;
  
    @IsOptional()
    @IsEnum(['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'])
    status?: string;
  }