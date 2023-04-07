import { Transform } from 'class-transformer';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class addressDto {
  @ApiProperty({ type: String, example: 'Egypt', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  country: string;

  @ApiProperty({ type: String, example: 'October - Egypt', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  physicalAddress: string;

  @ApiProperty({ type: String, example: 'John', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @ApiProperty({ type: String, example: 'Doe', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @ApiProperty({ type: Number, example: 13, required: false })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  apartmentNumber: number;

  @ApiProperty({ type: String, example: 'Shoubra', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  city: string;

  @ApiProperty({ type: String, example: 'Cairo', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
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
