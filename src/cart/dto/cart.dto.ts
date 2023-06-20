import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const sizes = ['small', 'medium', 'large', 'x-large', 'xx-large', 'xxx-large'];
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'brown',
  'black',
  'white',
  'gray',
];
export class cartDto {
  @ApiProperty({ type: String, example: 'Large', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(sizes)
  size: string;

  @ApiProperty({ type: String, example: 'red', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(colors)
  color: string;

  @ApiProperty({ type: Number, example: 3, required: true })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
