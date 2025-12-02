// src/payments/payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async createCOD(orderId: string, amount: number): Promise<Payment> {
    const payment = new this.paymentModel({
      orderId: new Types.ObjectId(orderId),
      amount,
      method: 'cod',
      status: 'pending',
      transactionId: `COD-${Date.now()}`,
    });

    return payment.save();
  }

  async processMockPayment(orderId: string, amount: number): Promise<Payment> {
    const payment = new this.paymentModel({
      orderId: new Types.ObjectId(orderId),
      amount,
      method: 'mock',
      status: 'completed',
      transactionId: `MOCK-${Date.now()}`,
      completedAt: new Date(),
    });

    return payment.save();
  }

  async createDemoUPI(orderId: string, amount: number): Promise<{ upiId: string; qrCode: string }> {
    const upiId = `demo${Date.now()}@practicebank`;
    
    const payment = new this.paymentModel({
      orderId: new Types.ObjectId(orderId),
      amount,
      method: 'demo_upi',
      status: 'pending',
      upiId,
      transactionId: `UPI-${Date.now()}`,
    });

    await payment.save();

    return {
      upiId,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${upiId}`,
    };
  }

  async completeUPIPayment(orderId: string): Promise<Payment> {
    const payment = await this.paymentModel.findOneAndUpdate(
      { orderId: new Types.ObjectId(orderId), method: 'demo_upi' },
      { 
        status: 'completed',
        completedAt: new Date()
      },
      { new: true }
    ).exec();
    
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    
    return payment;
  }

  async findByOrderId(orderId: string): Promise<Payment> {
    const payment = await this.paymentModel.findOne({ 
      orderId: new Types.ObjectId(orderId) 
    }).populate('orderId').exec();
    
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    
    return payment;
  }
}