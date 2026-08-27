import {
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

class CreateOrderItemDto {
  @ApiProperty({ example: 'productId123' })
  productId: string;

  @IsNumber()
  @ApiProperty({ example: 2 })
  quantity: number;

  @IsNumber()
  @ApiProperty({ example: 19.99 })
  price: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ApiProperty({ type: [CreateOrderItemDto] })
  items: CreateOrderItemDto[];

  @IsNumber()
  @ApiProperty({ example: 199.99 })
  total: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiPropertyOptional({ enum: OrderStatus, default: 'PENDING' })
  status?: OrderStatus;

  @IsOptional()
  @ApiPropertyOptional()
  shipping?: Record<string, unknown>;
}
