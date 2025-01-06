import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Order as OrderSchema } from './schemas/order.schema';
import { Order } from './interfaces/order.interface';
import { getModelToken } from '@nestjs/mongoose';

const mockOrder = {} as Order;
const EXCLUDE_FIELDS = '-__v';

class mockOrderModule {
  new = jest.fn().mockResolvedValue({});
  create = jest.fn().mockResolvedValue(mockOrder);
  static find = jest.fn().mockReturnThis();
  static select = jest.fn().mockReturnThis();
  static exec = jest.fn().mockReturnValue(mockOrder);
}

class mockProductModule {
  new = jest.fn().mockResolvedValue({});
  create = jest.fn().mockResolvedValue({});
  static findOne = jest.fn().mockResolvedValue({});
  static find = jest.fn().mockReturnThis();
  static exec = jest.fn().mockReturnValue({});
}

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(OrderSchema.name),
          useValue: mockOrderModule,
        },
        {
          provide: getModelToken('Product'), // Mock del modelo Product
          useValue: mockProductModule,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new order', async () => {
    const result = await service.create(mockOrder);
    expect(result).toEqual({ ...result });
    expect(201);
  });

  it('should return an array of orders', async () => {
    const result = await service.findAll();
    expect(mockOrderModule.exec).toHaveBeenCalledTimes(1);
    expect(mockOrderModule.select).toHaveBeenCalledTimes(1);
    expect(mockOrderModule.select).toHaveBeenCalledWith(EXCLUDE_FIELDS);
    expect(result).toEqual({ ...result });
    expect(200);
  });
});
