import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import axios, { AxiosError } from 'axios';
import { paymentHeader } from '../lib/paymentHeader';

@Injectable()
export class PaymentService {
  async create(createDto: CreatePaymentDto) {
    try {
      const { data } = await axios.post(
        `${process.env.BASE_URL}/tokens/cards`,
        createDto,
        paymentHeader(process.env.KEY),
      );

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      if (error instanceof AxiosError) {
        console.log(error.response.data);
      }
    }
  }
}
