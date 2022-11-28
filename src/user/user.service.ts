import { InjectModel } from '@nestjs/mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create_user.dto';
import { LoginUserDto } from './dto/login_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import aws from "aws-sdk"



@Injectable()
export class UserService {
  constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
      ) {}

  async Register(createUserDto: CreateUserDto): Promise<void> {
    const { email} = createUserDto;
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException(`User already exists`, HttpStatus.BAD_REQUEST);
    }
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    
  }

  async Login(LoginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = LoginUserDto;
    const user = await this.userModel.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const user = await this.userModel.findOne({ email });
      const payload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return [{ id: user._id, accessToken: accessToken }];
        
        
      }else {
      throw new UnauthorizedException('Please enter your login credentials');
      }

  }

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findUserById(Id: string): Promise<UserDocument> {
    const id = new mongoose.Types.ObjectId(Id);
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async deleteUser(Id: string): Promise<UserDocument> {
    try {
      const userDeleted = await this.userModel.findByIdAndDelete(Id);

      if (!userDeleted) {
        throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
      }

      return userDeleted;
    } catch (error) {
      throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
    }
  }
}
