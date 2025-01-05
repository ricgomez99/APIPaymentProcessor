import { TestingModule, Test } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { LoggerModule } from 'nestjs-pino';
import { CreatePaymentDto } from './dto/create-payment.dto';

const mockPayment: CreatePaymentDto = {
  number: '4242424242424242',
  cvc: '123',
  exp_month: '08',
  exp_year: '28',
  card_holder: 'José Pérez',
};

const mockPaymentService = {
  create: jest.fn().mockReturnValue(mockPayment),
};

describe('Payment Controller', () => {
  let paymentController: PaymentController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
      ],
    }).compile();
    paymentService = moduleRef.get<PaymentService>(PaymentService);
    paymentController = moduleRef.get<PaymentController>(PaymentController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(paymentController).toBeDefined();
  });

  it('should create a payment', async () => {
    const result = await paymentController.create(mockPayment);
    expect(paymentService.create).toHaveBeenCalledTimes(1);
    expect(paymentService.create).toHaveBeenCalledWith(mockPayment);
    expect(result).toEqual(mockPayment);
    expect(201);
  });
});
