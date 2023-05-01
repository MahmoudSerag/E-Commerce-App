import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class addressDto {
  @ApiProperty({ type: String, example: 'Egypt', required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w.,]+\s{1})*[\w.,]+$/, {
    message:
      'Invalid country. Enter only letters, numbers, periods (.) and commas (,).',
  })
  country: string;

  @ApiProperty({ type: String, example: 'October - Egypt', required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w.,]+\s{1})*[\w.,]+$/, {
    message:
      'Invalid physicalAddress. Enter only letters, numbers, periods (.) and commas (,).',
  })
  physicalAddress: string;

  @ApiProperty({ type: String, example: 'John', required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w.,]+\s{1})*[\w.,]+$/, {
    message:
      'Invalid firstName. Enter only letters, numbers, periods (.) and commas (,).',
  })
  firstName: string;

  @ApiProperty({ type: String, example: 'Doe', required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w.,]+\s{1})*[\w.,]+$/, {
    message:
      'Invalid lastName. Enter only letters, numbers, periods (.) and commas (,).',
  })
  lastName: string;

  @ApiProperty({ type: Number, example: 13, required: false })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  apartmentNumber: number;

  @ApiProperty({ type: String, example: 'Shoubra', required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w.,]+\s{1})*[\w.,]+$/, {
    message:
      'Invalid city. Enter only letters, numbers, periods (.) and commas (,).',
  })
  city: string;

  @ApiProperty({ type: String, example: 'Cairo', required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([\w.,]+\s{1})*[\w.,]+$/, {
    message:
      'Invalid governorate. Enter only letters, numbers, periods (.) and commas (,).',
  })
  governorate: string;

  @ApiProperty({ type: Number, example: 11511, required: true })
  @IsNumber()
  @IsNotEmpty()
  postalCode: number;

  @ApiProperty({ type: String, example: '+201064560413' })
  @IsMobilePhone()
  @IsNotEmpty()
  phoneNumber: string;
}
