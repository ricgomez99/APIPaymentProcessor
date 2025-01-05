import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { LoggerModule } from 'nestjs-pino';
import { CreateProductDto } from './dto/create-product.dto';

const mockProduct: CreateProductDto = {
  title: 'Iphone 16',
  description: 'Brand new Iphone 16 12g RAM and 256g',
  price: 1200,
  imageUrl: '',
  stock: 6,
};

const mockProductService = {
  create: jest.fn().mockReturnValue(mockProduct),
  findAll: jest.fn().mockReturnValue([mockProduct]),
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await controller.create(mockProduct);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
    expect(201);
  });

  it('should return an array of products', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockProduct]);
    expect(200);
  });
});
