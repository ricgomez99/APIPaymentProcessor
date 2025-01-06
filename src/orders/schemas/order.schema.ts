import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product as ProductSchema } from '../../products/schemas/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  productId: string;
  @Prop()
  quantity: number;
  @Prop()
  customer: string;
  @Prop()
  shippingAddress: string;
  @Prop({ type: ProductSchema })
  productDetails: ProductSchema;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
