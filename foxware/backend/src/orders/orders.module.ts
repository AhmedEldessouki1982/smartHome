// Orders module — read-side order history used by the customer "My Orders" page and
// the admin dashboard (recent orders + status updates). No order creation is invoked
// anywhere in the frontend yet: the checkout flow submits a QUOTE via POST /quotes.
// Orders are a placeholder for a future direct-purchase flow and cannot be created through the UI today.
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
