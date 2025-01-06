import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';
import { Order } from './schemas/order.schema';

const EXCLUDE_FIELDS = '-__v';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { productId, quantity } = createOrderDto;
      const product = await this.productModel.findById(productId);

      if (product.stock < quantity) {
        throw new BadRequestException('Insuficient Stock');
      }

      product.stock -= quantity;
      await product.save();

      const newOrder = new this.orderModel(createOrderDto);
      const result = await newOrder.save();

      return {
        status: 201,
        data: result,
        message: 'Order created!',
      };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return {
          status: 400,
          data: error.reason,
          message: error.message,
        };
      }

      if (error instanceof Error) {
        return {
          status: 400,
          data: error.name,
          message: error.message,
        };
      }
    }
  }

  async findAll() {
    try {
      const orders = await this.orderModel.find().select(EXCLUDE_FIELDS).exec();
      return {
        status: 200,
        data: orders ?? [],
        message: 'OK',
      };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return {
          status: 400,
          data: error.reason,
          message: error.message,
        };
      }

      if (error instanceof Error) {
        return {
          status: 400,
          data: error.name,
          message: error.message,
        };
      }
    }
  }
}
