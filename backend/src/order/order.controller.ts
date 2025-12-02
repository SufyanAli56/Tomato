import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Patch, 
    UsePipes, 
    ValidationPipe 
  } from '@nestjs/common';
  import { OrderService } from './order.service';
  import { Order } from './schemas/order.schema';
  import { CreateOrderDto } from './dto/create-order.dto';
  import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
  
  @Controller('practice/orders')
  @UsePipes(new ValidationPipe({ transform: true }))
  export class OrdersController {
    constructor(private readonly ordersService: OrderService) {}
  
    @Post()
    async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
      return this.ordersService.create(createOrderDto);
    }
  
    @Get()
    async findAll(): Promise<Order[]> {
      return this.ordersService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Order> {
      return this.ordersService.findOne(id);
    }
  
    @Patch(':id/status')
    async updateStatus(
      @Param('id') id: string,
      @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    ): Promise<Order> {
      return this.ordersService.updateStatus(id, updateOrderStatusDto.status);
    }
  }