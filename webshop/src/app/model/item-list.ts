import { Bill } from './bill';
import { Customer } from './customer';
import { Order } from './order';
import { Product } from './product';

export class ItemList {
  [key: string]: any;
  products: Product[] = [];
  customers: Customer[] = [];
  orders: Order[] = [];
  bills: Bill[] = [];
}
