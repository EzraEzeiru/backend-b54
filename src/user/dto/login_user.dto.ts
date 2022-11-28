import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  maxLength,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
