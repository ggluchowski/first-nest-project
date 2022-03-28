import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helper';
import { Order } from './db/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExternalOrderDto } from './dto/external-order.dto';
import { OrdersDataService } from './orders-data.service';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderRepository: OrdersDataService) {}

  mapOrderToExternal(order: Order): ExternalOrderDto {
    return {
      ...order,
      createAt: dateToArray(order.createdAt),
    };
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(@Body() _order_: CreateOrderDto): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.addOrder(_order_),
    );
  }

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderRepository.getOrderById(_id_),
    );
  }

  @Get()
  async getAllOrders(): Promise<ExternalOrderDto[]> {
    const allOrders = await this.orderRepository.getAllOrders();
    const externalOrders = allOrders.map((i) => this.mapOrderToExternal(i));
    return externalOrders;
  }

  @Delete(':id')
  async deleteOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<void> {
    return await this.orderRepository.deleteOrder(_id_);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() _updateOrder_: UpdateOrderDto,
  ): Promise<ExternalOrderDto> {
    const orderToUpdate = await this.orderRepository.updateOrder(
      _id_,
      _updateOrder_,
    );

    return this.mapOrderToExternal(orderToUpdate);
  }
}
