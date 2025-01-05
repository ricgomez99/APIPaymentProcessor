import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import mongoose, { Model } from 'mongoose';

const EXCLUDE_FIELDS = '-__v';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      const result = await newProduct.save();
      return {
        status: 201,
        data: result,
        message: 'product created!',
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
      const products = await this.productModel
        .find()
        .select(EXCLUDE_FIELDS)
        .exec();

      return {
        status: 200,
        data: products,
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
