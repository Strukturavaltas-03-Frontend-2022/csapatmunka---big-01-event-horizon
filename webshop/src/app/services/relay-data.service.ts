import { Injectable } from '@angular/core';
import { Bill } from '../model/bill';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { of } from 'rxjs';
import { ItemList } from '../model/item-list';

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

  activeUsers: number = 0;
  valueOfAllCars: number = 0;
  mostPopularCar: Product = new Product();
  mostExpensiveCar: Product = new Product();
  mostLoyalCustomer: Customer = new Customer();

  getAll(): ItemList {
    return this.itemList;
  }

  getItems(type: string): Product[] | Customer[] | Order[] | Bill[] {
    return this.itemList[type];
  }

  getSingleItem(type: string, id: string): Product | Customer | Order | Bill {
    return this.itemList[type].filter(
      (item: any) => String(item.uniqueId) === id
    );
  }

  getType() {
    return this.type;
  }

  setAll(itemList: ItemList) {
    this.itemList = itemList;
  }

  setItems(items: Product[] | Customer[] | Order[] | Bill[], type: string) {
    this.itemList[type] = [...items];
  }

  setType(type: string) {
    this.type = type;
  }

  setAllStatisticalData(itemList: ItemList) {
    this.activeCustomersCalculator(itemList.customers);
    this.valueOfAllCarsCalculator(itemList.products);
    this.mostExpensiveCarCalculator(itemList.products);
    this.mostPopularCarCalculator(itemList.orders, itemList.products);
    this.mostLoyalCustomerCalculator(itemList.orders, itemList.customers);
  }

  getAllStatisticalData() {
    return [
      this.activeUsers,
      this.valueOfAllCars,
      this.mostPopularCar,
      this.mostExpensiveCar,
      this.mostLoyalCustomer,
    ];
  }

  private activeCustomersCalculator(customers: Customer[]) {
    customers.forEach((customer: Customer) => {
      if (customer.active === true) {
        this.activeUsers += 1;
      }
    });
  }

  private valueOfAllCarsCalculator(products: Product[]) {
    products.forEach((product: Product) => {
      this.valueOfAllCars += product.price;
    });
  }

  private mostExpensiveCarCalculator(products: Product[]) {
    this.mostExpensiveCar = products?.reduce((acc: Product, cur: Product) =>
      acc.price > cur.price ? acc : cur
    );
  }

  private mostPopularCarCalculator(orders: Order[], products: Product[]) {
    let ordersByCar: number[] = Array(1000).fill(0);
    orders.forEach((order: Order) => {
      ordersByCar[order.productId - 1] += order.amount;
    });
    const max: number = Math.max(...ordersByCar);
    const mostPopularCarIndex = ordersByCar.indexOf(max) + 1;

    this.mostPopularCar = products.filter(
      (product: Product) => product.id === mostPopularCarIndex
    )[0];
  }

  private mostLoyalCustomerCalculator(orders: Order[], customers: Customer[]) {
    let ordersByCustomer: number[] = Array(1000).fill(0);
    orders.forEach((order: Order) => {
      ordersByCustomer[order.customerId - 1] += order.amount;
    });
    const max: number = Math.max(...ordersByCustomer);
    const mostOrdersCustomerIndex = ordersByCustomer.indexOf(max) + 1;

    this.mostLoyalCustomer = customers.filter(
      (customer: Customer) => customer.id === mostOrdersCustomerIndex
    )[0];
  }
}
