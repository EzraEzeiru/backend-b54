import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  product_description: string;

  @Prop({ required: true })
  product_title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image_urls: string;

  @Prop({ default: 1 })
  count: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);


