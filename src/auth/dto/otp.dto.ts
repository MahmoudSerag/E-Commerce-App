import { IsNotEmpty, IsNumber } from 'class-validator';

export class otpCodeDto {
  @IsNotEmpty()
  @IsNumber()
  otpCode: number;
}
