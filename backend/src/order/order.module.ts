// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service'; // Keep as OrderService
import { OrdersController } from './order.controller'; // CHANGED: OrdersController (plural)
import { Order, OrderSchema } from './schemas/order.schema';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MenuModule,
  ],
  controllers: [OrdersController], // CHANGED: OrdersController (plural)
  providers: [OrderService], // Keep as OrderService
  exports: [OrderService],
})
export class OrderModule {} // Keep as OrderModule