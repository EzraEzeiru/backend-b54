import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CartModule } from 'src/cart/cart.module';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';
import { ProductSchema, Product } from 'src/product/schema/product.schema';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CartModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    CartService,
    ProductService,
    MailerService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
