import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updatedCartDto {
  @ApiProperty({ type: Number, example: 3, required: true })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
