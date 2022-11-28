import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { LoginUserDto } from './dto/login_user.dto';
import { UserService } from './user.service';
import { MailerService } from '../mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
import { CartItemDto } from 'src/cart/dto/cart-product.dto';

import {
  Body,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Header
} from '@nestjs/common';
import mongoose from 'mongoose';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private mailerService: MailerService,
  ) {}
  @Post('/signup')
  async Signup(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.userService.Register(createUserDto);
  }

  @Post('/signin')
  async Signin(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.userService.Login(loginUserDto);
  }

  @Post('cart/:id1/:id2')
  async AddItemToCart(
    @Param('id1') id1: string,
    @Param('id2') id2: string,
  ): Promise<string> {
    return await this.cartService.createCartItem(id1, id2);
  }

  @Post('rmdcart/:id1/:id2')
  @Header('content-type', 'text/html')
  async removeCartItem(
    @Param('id1') id1: string,
    @Param('id2') id2: string,
  ): Promise<string> {
    return await this.cartService.removeCartItem(id1, id2);
  }

  // @Get()
  // async Alluser(@Res() response) {
  //   const users = await this.userService.readAll();
  //   return response.status(HttpStatus.OK).json({
  //     users,
  //   });
  // }

  @Get('/:email')
  async FindByEmail(@Param('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }

  @Get('getid/:id3')
  async findUserById(@Param('id3') id3: string) {
    return await this.userService.findUserById(id3);
  }

  @Get('usercart/:id4')
  async userCartItem(@Param('id4') id4: string) {
    return await this.cartService.userCartItem(id4);
  }
  
  @Get()
  async Alluser(@Res() response) {
    const users = await this.userService.readAll();
    return response.status(HttpStatus.OK).json({
      users,
    });
  }

  @Post('email/:id5')
  async sendMail(@Param('id5') id5: string) {
    
    return await this.mailerService.SendMail(id5);
  }
}