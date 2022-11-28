import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches,
} from 'class-validator';
  
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullname?: string;
  
    
  
    @IsString()
    @IsNotEmpty()
    address: string
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password: string;
  
    @IsNotEmpty()
    phone_number: number;
  
    
  }
  