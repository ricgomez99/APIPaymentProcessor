import { IsString, IsNumber, Min, MinLength, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title: string;

  @IsString()
  @MinLength(4)
  @MaxLength(100)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  imageUrl: string;

  @IsNumber()
  @Min(0)
  stock: number;
}
