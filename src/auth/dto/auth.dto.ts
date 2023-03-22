import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class authDto {
  @ApiProperty({ type: String, example: 'JohnDoe@example.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
