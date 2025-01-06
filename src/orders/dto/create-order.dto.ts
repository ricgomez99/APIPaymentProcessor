import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from '../../products/dto/create-product.dto';

export class CreateOrderDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsString()
  customer: string;

  @IsString()
  shippingAddress: string;

  @ValidateNested()
  @Type(() => CreateProductDto)
  productDetails: CreateProductDto;
}
