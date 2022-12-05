import { BehaviorSubject } from 'rxjs';
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

export class BehaviorItemList {
  [key: string]: any;
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  customers: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  bills: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);
}
