import { IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class CartItemDto {

    @IsString()
    productId: string;

    @IsString()
    userId: string;
}
