import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import aws from 'aws-sdk';

import { UserService } from '../user/user.service';

@Injectable()
export class MailerService {
  constructor(private readonly userService: UserService) {}

  async SendMail(Id: string) {
    const user = await this.userService.findUserById(Id);
    if (user) {
      const name = [];
      for (const cart of user.shoppingCart) {
        name.push(cart.product_description);
      }

      function and(names, conjunction = 'and') {
        const named = names.slice(0, names.length - 1)
        if (names) {
          return [named] + ' ' + 'and' + ' ' + names[names.length - 1];
        }
      }
  
      const mailerClient: nodemailer.Transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 587,
        auth: {
          user: 'ezeiru.ezra@gmail.com',
          pass: 'vyntmifirypojdgb',
        },
      });

      return mailerClient.sendMail({
        from: 'Ezra ezeiru.ezra@gmail.com',
        to: 'ezrapyezeiru@gmail.com',
        subject: 'Thank you for your order ',
        html: `Thank you for ordering ${name}`,
      });
    }
  }
}
