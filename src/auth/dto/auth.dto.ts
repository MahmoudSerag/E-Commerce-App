import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class authDto {
  @ApiProperty({ type: String, example: 'JohnDoe@example.com', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
