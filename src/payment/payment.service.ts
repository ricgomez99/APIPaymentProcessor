import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import axios from 'axios';
import { paymentHeader } from '../lib/paymentHeader';

@Injectable()
export class PaymentService {
  async create(createDto: CreatePaymentDto) {
    try {
      console.log('headers: ', paymentHeader(process.env.KEY));
      const result = await axios.post(
        `${process.env.BASE_URL}/token/cards`,
        createDto,
        paymentHeader(process.env.KEY),
      );
      console.log(result);
      return result;
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }
}
