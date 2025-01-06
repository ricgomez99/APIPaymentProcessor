import { Product } from 'src/products/interfaces/product.interface';

export interface Order {
  productId: string;
  quantity: number;
  customer: string;
  shippingAddress: string;
  productDetails: Product;
}
