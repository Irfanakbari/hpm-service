import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrders')
  create(@Payload() createOrderDto: CreateOrderDto[]) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() options: any) {
    return this.ordersService.findAll(options);
  }

  @MessagePattern('findOneOrders')
  findOne(@Payload() id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: string) {
    return this.ordersService.remove(id);
  }
}
