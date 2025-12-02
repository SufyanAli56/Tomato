// src/practice/payments/payments.controller.ts
import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './schemas/payment.schema';

@Controller('practice/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Cash on Delivery
  @Post('cod')
  async createCOD(@Body() data: { orderId: string; amount: number }): Promise<Payment> {
    return this.paymentsService.createCOD(data.orderId, data.amount);
  }

  // Mock Payment (Always succeeds)
  @Post('mock')
  async processMockPayment(@Body() data: { orderId: string; amount: number }): Promise<Payment> {
    return this.paymentsService.processMockPayment(data.orderId, data.amount);
  }

  // Demo UPI Payment
  @Post('upi')
  async createDemoUPI(@Body() data: { orderId: string; amount: number }) {
    return this.paymentsService.createDemoUPI(data.orderId, data.amount);
  }

  // Complete UPI Payment
  @Patch('upi/complete/:orderId')
  async completeUPIPayment(@Param('orderId') orderId: string): Promise<Payment> {
    return this.paymentsService.completeUPIPayment(orderId);
  }

  // Get payment by order
  @Get('order/:orderId')
  async findByOrderId(@Param('orderId') orderId: string): Promise<Payment> {
    return this.paymentsService.findByOrderId(orderId);
  }
}