import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { Product as ProductSchema } from './schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockProduct = {} as Product;
const EXCLUDE_FIELDS = '-__v';

class mockProductModule {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({});
  create = jest.fn().mockResolvedValue(mockProduct);
  static find = jest.fn().mockReturnThis();
  static select = jest.fn().mockReturnThis();
  static exec = jest.fn().mockReturnValue(mockProduct);
}

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(ProductSchema.name),
          useValue: mockProductModule,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await service.create(mockProduct);
    expect(result).toEqual({ ...result });
    expect(201);
  });

  it('should return an array products', async () => {
    const result = await service.findAll();
    expect(mockProductModule.exec).toHaveBeenCalledTimes(1);
    expect(mockProductModule.select).toHaveBeenCalledTimes(1);
    expect(mockProductModule.select).toHaveBeenCalledWith(EXCLUDE_FIELDS);
    expect(result).toEqual({ ...result });
    expect(200);
  });
});
