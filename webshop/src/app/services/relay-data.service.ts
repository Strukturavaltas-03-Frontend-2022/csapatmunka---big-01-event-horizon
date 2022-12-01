import { Injectable } from '@angular/core';
import { Bill } from '../model/bill';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class RelayDataService {
  itemList: {
    [key: string]: any;
    products: Product[];
    customers: Customer[];
    orders: Order[];
    bills: Bill[];
  } = { products: [], customers: [], orders: [], bills: [] };

  type: string = '';

  getItems(type: string) {
    return this.itemList[type];
  }

  getSingleItem(type: string, id: string) {
    return this.itemList[type].filter(
      (item: any) => String(item.uniqueId) === id
    );
  }

  getType() {
    return this.type;
  }

  setItems(items: any[], type: string) {
    this.itemList[type] = [...items];
  }

  setType(type: string) {
    this.type = type;
  }

  constructor() {}
}
