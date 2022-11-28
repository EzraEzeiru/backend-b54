import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product, ProductSchema } from 'src/product/schema/product.schema';


export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop()
  fullname: string;

  @Prop()
  address: string;

  @Prop({ required: true, unique: true })
  phone_number: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  seller: boolean;

  @Prop({ required: true, default: () => Date.now() })
  created_at: Date;

  @Prop([])
  shoppingCart: any;

  @Prop({default: 0})
  quantity: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
