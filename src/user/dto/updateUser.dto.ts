import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class userInfoDto {
  @ApiProperty({ type: String, example: 'Mohamed', required: false })
  @IsString()
  firstName: string;

  @ApiProperty({ type: String, example: 'Ahmed', required: false })
  @IsString()
  lastName: string;
}
