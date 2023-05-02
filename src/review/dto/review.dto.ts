import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Matches,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class reviewDto {
  @ApiProperty({ type: String, example: 'Nice product.', required: true })
  @Matches(/^([\w.,]+\s{1})*[\w.,]+$/, {
    message:
      'Invalid comment. Enter only letters, numbers, periods (.) and commas (,).',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    type: Number,
    example: 4,
    minLength: 1,
    maxLength: 5,
    required: true,
  })
  @Max(5)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  rate: number;
}
