import { TestingModule, Test } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { Payment } from './interfaces/payment.interface';

const mockPayment = {} as Payment;
const mockRespone = {
  status: 'CREATED',
  data: {},
};

class mockPaymentModel {
  constructor(private _: any) {}
  static create = jest.fn().mockReturnValue(mockPayment);
}

describe('Payment Service', () => {
  let paymentService: PaymentService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PaymentService,
          useValue: mockPaymentModel,
        },
      ],
    }).compile();
    paymentService = moduleRef.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(paymentService).toBeDefined();
  });

  it('should create a payment', async () => {
    const result = await paymentService.create(mockPayment);
    expect(result).toEqual(mockRespone);
  });
});
