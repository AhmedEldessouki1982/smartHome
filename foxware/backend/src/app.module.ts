import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { AiModule } from './ai/ai.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    CartModule,
    AuthModule,
    PrismaModule,
    AdminModule,
    AiModule,
    QuotesModule,
  ],
})
export class AppModule {}
