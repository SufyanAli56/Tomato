import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop({ required: true })
  title: string;

  @Prop([String])
  ingredients: string[];

  @Prop()
  instructions: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
