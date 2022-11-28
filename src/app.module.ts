import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO1_URI),
    ProductModule,
    UserModule,
    CartModule,
    MailerModule,
  ],
})
export class AppModule {}
