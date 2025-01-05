import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() createDto: CreatePaymentDto) {
    try {
      await this.paymentService.create(createDto);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(error.message);
      }
    }
  }
}
