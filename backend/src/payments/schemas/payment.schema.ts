// src/practice/payments/schemas/payment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Order' })
  orderId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ 
    required: true, 
    enum: ['cod', 'mock', 'demo_upi'],
    default: 'cod' 
  })
  method: string;

  @Prop({ 
    required: true,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  })
  status: string;

  @Prop({ default: '' })
  transactionId: string;

  @Prop({ default: '' })
  upiId: string; // For demo UPI payments

  @Prop()
  completedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);