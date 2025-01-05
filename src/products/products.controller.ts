import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AxiosError } from 'axios';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await this.productsService.create(createProductDto);
      return result;
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        throw new Error(error.message);
      }
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.productsService.findAll();
      return result;
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        throw new Error(error.message);
      }
    }
  }
}
