import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  imageUrl: string;
  @Prop()
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
