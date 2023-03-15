import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class authDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
