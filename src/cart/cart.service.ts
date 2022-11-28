import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { CartItemDto } from './dto/cart-product.dto';
  import { UserService } from 'src/user/user.service';
  import { ProductService } from 'src/product/product.service';
  import { User, UserDocument } from 'src/user/schema/user.schema';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Product } from 'src/product/schema/product.schema';
  
  @Injectable()
  export class CartService {
    constructor(
      private userService: UserService,
      private productService: ProductService,
    ) {}
    async createCartItem(userId: string, productId: string): Promise<string> {
      const user = await this.userService.findUserById(userId);
      const product = await this.productService.readById(productId);
      const check = await user.shoppingCart.find((task) => task._id == productId);
      console.log(user);
  
      if (user && product && !check) {
        await user.shoppingCart.push(product);
        user.quantity = user.quantity + 1;
        user.save();
        return 'success';
      } else {
        //  let count
        // //  user.shoppingCart.forEach(element => {
        // //      element.count = element.count + 1
        // //      console.log(element.count)
        // //      user.save();
  
        // //   });
        return 'success';
      }
    }
  
    async removeCartItem(userId: string, productId: string): Promise<string> {
      try {
        const user = await this.userService.findUserById(userId);
        const product = await this.productService.readById(productId);
        const check = await user.shoppingCart.find(
          (task) => task._id === productId,
        );
        console.log(product)
  
        // if (!user) {
        //   throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
        // }
        // if (!product) {
        //   throw new HttpException(`Product Not exist`, HttpStatus.NOT_FOUND);
        // }
        if (user && product) {
          console.log(product, user)
          await user.shoppingCart.pop({product});
          user.save();
          return 'success';
        }
      } catch (error) {
        throw new HttpException(` not found`, HttpStatus.NOT_FOUND);
      }
    }
  
    async userCartItem(userId: string): Promise<[]> {
      try {
        const user = await this.userService.findUserById(userId);
  
        if (!user) {
          throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
        }
  
        if (user) {
          return await user.shoppingCart;
        }
      } catch (error) {
        throw new HttpException(`Cart not found`, HttpStatus.NOT_FOUND);
      }
    }
  }
  