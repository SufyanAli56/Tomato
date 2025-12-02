// src/practice/orders/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class OrderItem {
  @Prop({ required: true, type: Types.ObjectId, ref: 'MenuItem' })
  menuItemId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: [OrderItem] })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ 
    required: true, 
    enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
    default: 'pending'
  })
  status: string;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop({ default: '' })
  specialInstructions: string;

  @Prop({ default: Date.now })
  orderTime: Date;

  @Prop()
  estimatedDelivery: Date;

  @Prop()
  deliveredAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);