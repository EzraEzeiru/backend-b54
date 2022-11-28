import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { UserSchema, User } from 'src/user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ProductSchema, Product } from 'src/product/schema/product.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({defaultStrategy:'jwt'}), JwtModule.register({
    secret: 'topSecret51',
    signOptions:{
      expiresIn: 3600
    }
    }),
    MongooseModule.forFeature([{name: Product.name, schema:ProductSchema}]),
   
  ],
  providers: [CartService, UserService, ProductService],
  controllers: [CartController],
})
export class CartModule {}
