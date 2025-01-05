import { IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  number: string;
  @IsString()
  cvc: string;
  @IsString()
  exp_month: string;
  @IsString()
  exp_year: string;
  @IsString()
  card_holder: string;
}
