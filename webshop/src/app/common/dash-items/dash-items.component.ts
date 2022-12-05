import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorItemList, ItemList } from 'src/app/model/item-list';
import { RelayDataService } from 'src/app/services/relay-data.service';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

import { Product } from 'src/app/model/product';
import { Order } from 'src/app/model/order';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { GeneralItemService } from 'src/app/services/general-item.service';
import { combineLatest, debounceTime, map, Observable } from 'rxjs';

export interface iCar {
  id: number;
  orderAmount: number;
}

@Component({
  selector: 'app-dash-items',
  templateUrl: './dash-items.component.html',
  styleUrls: ['./dash-items.component.scss'],
})
export class DashItemsComponent implements OnInit {
  dataRelay: RelayDataService = inject(RelayDataService);
  generalItemService: GeneralItemService = inject(GeneralItemService);

  allDataLists$: Observable<BehaviorItemList> =
    this.generalItemService.listOfAll$;

  @ViewChild('chart') chart!: ChartComponent;

  billStatusChart: any;
  orderStatusChart: any;
  productDescriptionChart: any;

  allItems: ItemList = new ItemList();
  products: Product[] = [];
  orders: Order[] = [];
  bills: Bill[] = [];
  customers: Customer[] = [];

  newBills: number = 0;
  paidBills: number = 0;

  newOrders: number = 0;
  paidOrders: number = 0;
  shippedOrders: number = 0;

  newCars: number = 0;
  usedCars: number = 0;
  testCars: number = 0;

  top5MostPopularCarMake: Product[] = [];
  ordersByCar: number[] = Array(1000).fill(0);
  allCars: Array<iCar> = Array(1000).fill({ id: 0, orderAmount: 0 });

  combinedList = combineLatest({
    products: this.generalItemService.products$,
    customers: this.generalItemService.customers$,
    orders: this.generalItemService.orders$,
    bills: this.generalItemService.bills$,
  }).pipe(
    map((result) => {
      this.allItems.products = result.products;
      this.allItems.customers = result.customers;
      this.allItems.orders = result.orders;
      this.allItems.bills = result.bills;
    }),
    debounceTime(0)
  );

  ngOnInit() {
    this.combinedList.subscribe((list) => {
      this.statCalculations();
    });
  }

  statCalculations() {
    this.allItems.bills.forEach((bill) => {
      if (bill.status.includes('new')) this.newBills += 1;
      else this.paidBills += 1;
    });

    this.allItems.orders.forEach((order) => {
      if (order.status.includes('new')) this.newOrders += 1;
      else if (order.status.includes('paid')) this.paidOrders += 1;
      else this.shippedOrders += 1;
    });

    this.allItems.products.forEach((product) => {
      if (product.description.includes('New')) this.newCars += 1;
      else if (product.description.includes('Used')) this.usedCars += 1;
      else this.testCars += 1;
    });

    this.allItems.orders.forEach((order: Order) => {
      this.ordersByCar[order.productId - 1] += order.amount;
    });

    /* this.ordersByCar.forEach((amount, i) => {
      this.allCars.forEach((car, j) => {
        if (i + 1 === car.id) {
          car.orderAmount = amount;
        }
      });
    });*/

    /*allCars.sort((a: iCar, b: iCar) => {
      return b.orderAmount - a.orderAmount;
    });*/

    // const sortedCars = this.ordersByCar.sort((a, b) => a - b);
    //  this.top5MostPopularCarMake= sortedCars.slice(0,5)
    // const mostPopularCarIndex = ordersByCar.indexOf(max) + 1;

    this.billStatusChart = {
      series: [this.newBills, this.paidBills],
      colors: ['#6c9dda', '#99516b'],
      labels: ['New', 'Paid'],
      chart: {
        width: 250,
        type: 'pie',
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',

        labels: {
          colors: 'black',
        },
        markers: {
          fillColors: ['#6c9dda', '#99516b'],
        },
      },
      stroke: {
        colors: ['#FFFFFF40'],
        width: 3,
      },

      fill: {
        opacity: 1,
        type: 'solid',
      },

      tooltip: {
        enabled: true,
        fillSeriesColor: true,
      },
    };

    this.orderStatusChart = {
      series: [this.newOrders, this.paidOrders, this.shippedOrders],
      colors: ['#d2b48c', '#d8bfd8', '#ffc0cb'],
      labels: ['New', 'Paid', 'Shipped'],
      chart: {
        width: 250,
        type: 'pie',
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',

        labels: {
          colors: 'black',
        },
        markers: {
          fillColors: ['#d2b48c', '#d8bfd8', '#ffc0cb'],
        },
      },
      stroke: {
        colors: ['#FFFFFF40'],
        width: 3,
      },

      fill: {
        opacity: 1,
        type: 'solid',
      },

      tooltip: {
        enabled: true,
        fillSeriesColor: true,
      },
    };

    this.productDescriptionChart = {
      series: [this.newCars, this.usedCars, this.testCars],
      colors: ['#33ab5f', '#8cbda9', '#d5f591'],
      labels: ['New', 'Used', 'Test'],
      chart: {
        width: 250,
        type: 'pie',
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',

        labels: {
          colors: 'black',
        },
        markers: {
          fillColors: ['#33ab5f', '#8cbda9', '#d5f591'],
        },
      },
      stroke: {
        colors: ['#FFFFFF40'],
        width: 3,
      },

      fill: {
        opacity: 1,
        type: 'solid',
      },

      tooltip: {
        enabled: true,
        fillSeriesColor: true,
      },
    };
  }
}
