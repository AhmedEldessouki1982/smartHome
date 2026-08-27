import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({ example: 'Ahmed Ali' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'ahmed@almashareq.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'password123' })
  password: string;
}
