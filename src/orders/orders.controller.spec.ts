import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { LoggerModule } from 'nestjs-pino';
import { CreateOrderDto } from './dto/create-order.dto';

const mockOrder: CreateOrderDto = {
  productId: '123',
  quantity: 2,
  customer: 'John Doe',
  shippingAddress: 'Str 1 1 1',
  productDetails: {
    title: 'Iphone 16',
    description: 'Brand new Iphone 16 12g RAM and 256g',
    price: 1200,
    imageUrl: '',
    stock: 6,
  },
};

const mockService = {
  create: jest.fn().mockReturnValue(mockOrder),
  findAll: jest.fn().mockReturnValue([mockOrder]),
};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new order', async () => {
    const result = await controller.create(mockOrder);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockOrder);
    expect(result).toEqual(mockOrder);
    expect(201);
  });

  it('should return an array of products', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockOrder]);
    expect(200);
  });
});
