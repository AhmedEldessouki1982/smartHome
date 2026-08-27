import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  addToCart(
    @Request() req: { user: { id: string } },
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.addToCart(req.user.id, dto);
  }

  @Get('items')
  @ApiOperation({ summary: 'Get cart items' })
  getItems(@Request() req: { user: { id: string } }) {
    return this.cartService.getItems(req.user.id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  updateItem(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.updateItem(req.user.id, id, dto);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeItem(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.cartService.removeItem(req.user.id, id);
  }
}
