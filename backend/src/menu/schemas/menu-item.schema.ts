// src/practice/menu/schemas/menu-item.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MenuItem extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  image: string;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);