import { Component, inject, Input, OnInit } from '@angular/core';
import { combineLatest, debounceTime, map, Observable, switchMap } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { BehaviorItemList, ItemList } from 'src/app/model/item-list';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { GeneralItemService } from 'src/app/services/general-item.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss'],
})
export class TickerComponent implements OnInit {
  generalItemService: GeneralItemService = inject(GeneralItemService);

  allDataLists$: Observable<BehaviorItemList> =
    this.generalItemService.listOfAll$;

  data: ItemList = new ItemList();

  activeCustomers: number = 0;
  activeProducts: number = 0;
  shippedOrders: number = 0;
  allCustomers: number = 0;
  allProducts: number = 0;
  allOrders: number = 0;
  valueOfAllCars: number = 0;
  mostExpensiveCar: Product = new Product();
  mostPopularCar: Product = new Product();
  mostLoyalCustomer: Customer = new Customer();

  combinedList = combineLatest({
    products: this.generalItemService.products$,
    customers: this.generalItemService.customers$,
    orders: this.generalItemService.orders$,
    bills: this.generalItemService.bills$,
  }).pipe(
    map((result) => {
      this.data.products = result.products;
      this.data.customers = result.customers;
      this.data.orders = result.orders;
      this.data.bills = result.bills;
    }),
    debounceTime(500)
  );

  ngOnInit(): void {
    this.combinedList.subscribe((list) => {
      this.statCalculations();
    });
  }

  statCalculations() {
    // active customers
    this.data.customers.forEach((customer: Customer, i) => {
      if (customer.active === true) {
        this.activeCustomers += 1;
      }
    });

    this.allCustomers = this.data.customers.length;

    // active products
    this.data.products.forEach((product: Product, i) => {
      if (product.active === true) {
        this.activeProducts += 1;
      }
    });

    this.allProducts = this.data.products.length;

    // shipped orders
    this.data.orders.forEach((order: Order, i) => {
      if (order.status.includes('shipped')) {
        this.shippedOrders += 1;
      }
    });
    this.allOrders = this.data.orders.length;

    // value of all cars
    this.data.products.forEach((product: Product) => {
      this.valueOfAllCars += product.price;
    });

    // most expensive car
    this.mostExpensiveCar = this.data?.products?.reduce(
      (acc: Product, cur: Product) => (acc.price > cur.price ? acc : cur)
    );

    // most popular car
    let ordersByCar: number[] = Array(1000).fill(0);
    this.data.orders.forEach((order: Order) => {
      ordersByCar[order.productId - 1] += order.amount;
    });
    const maxOrderNumber: number = Math.max(...ordersByCar);
    const mostPopularCarIndex = ordersByCar.indexOf(maxOrderNumber) + 1;

    this.mostPopularCar = this.data.products.filter(
      (product: Product) => product.id === mostPopularCarIndex
    )[0];

    // most loyal customer
    let ordersByCustomer: number[] = Array(1000).fill(0);
    this.data.orders.forEach((order: Order) => {
      ordersByCustomer[order.customerId - 1] += order.amount;
    });
    const maxOrdersByCustomer: number = Math.max(...ordersByCustomer);
    const mostOrdersCustomerIndex =
      ordersByCustomer.indexOf(maxOrdersByCustomer) + 1;

    this.mostLoyalCustomer = this.data.customers.filter(
      (customer: Customer) => customer.id === mostOrdersCustomerIndex
    )[0];
  }
}
