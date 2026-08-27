import { IsString, IsEmail, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class QuoteItemDto {
  @IsString()
  @ApiProperty({ example: 'productId123' })
  productId: string;

  @IsString()
  @ApiProperty({ example: 'Smart LED Bulb - WiFi' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'https://images.unsplash.com/...' })
  image: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 2 })
  quantity?: number;
}

export class CreateQuoteDto {
  @IsString()
  @ApiProperty({ example: 'Ahmed Ali' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'ahmed@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '+20 128 569 6767' })
  phone: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Looking for a full home automation setup' })
  message?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteItemDto)
  @ApiProperty({ type: [QuoteItemDto] })
  items: QuoteItemDto[];
}
