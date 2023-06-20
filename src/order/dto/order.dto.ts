import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class orderDto {
  @ApiProperty({ type: Number, example: 2500, required: true })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ type: String, example: '4242424242424242', required: true })
  @MaxLength(16)
  @MinLength(16)
  @IsNumberString()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({ type: Number, example: 6, required: true })
  @Max(12)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  expirationMonth: number;

  @ApiProperty({ type: Number, example: 2021, required: true })
  @Max(new Date().getFullYear() + 7)
  @Min(new Date().getFullYear())
  @IsNumber()
  @IsNotEmpty()
  expirationYear: number;

  @ApiProperty({ type: String, example: '314', required: true })
  @MaxLength(3)
  @MinLength(3)
  @IsNumberString()
  @IsNotEmpty()
  cvc: string;

  @ApiProperty({ type: String, example: 'Mahmoud Serag', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nameOnCard: string;
}
