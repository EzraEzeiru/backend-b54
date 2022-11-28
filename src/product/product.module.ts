import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schema/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema:ProductSchema}]),
    UserModule
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
