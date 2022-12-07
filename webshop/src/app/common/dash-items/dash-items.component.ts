import { Component, inject, OnInit } from '@angular/core';
import { BehaviorItemList, ItemList } from 'src/app/model/item-list';
import { RelayDataService } from 'src/app/services/relay-data.service';

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

  billStatusChart: any;
  orderStatusChart: any;
  productDescriptionChart: any;
  carTypeDistributionChart: any;
  customerCityDistributionChart: any;
  top5CityByPurchaseCount: any;

  allItems: ItemList = new ItemList();
  products: Product[] = [];
  orders: Order[] = [];
  bills: Bill[] = [];
  customers: Customer[] = [];

  allCities: string[] = [];
  allCarTypes: string[] = [];

  newBills: number = 0;
  paidBills: number = 0;

  newOrders: number = 0;
  paidOrders: number = 0;
  shippedOrders: number = 0;

  newCars: number = 0;
  usedCars: number = 0;
  testCars: number = 0;

  top5MostPopularCarMake: Product[] = [];

  top10CityNames: any[] = [];
  top10CityDistribution: any[] = [];
  top5CityNamesByPurchases: any[] = [];

  carTypeNameList: any[] = [];
  carTypeCountList: any[] = [];

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
    debounceTime(300)
  );

  ngOnInit() {
    this.combinedList.subscribe((list) => {
      this.statCalculations();
    });
  }

  statCalculations() {
    this.billStatusChart = {
      series: [this.newBills, this.paidBills],
      colors: ['#6c9dda', '#99516b'],
      labels: ['New', 'Paid'],
      chart: {
        width: 275,
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
        width: 275,
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
        width: 275,
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

    this.carTypeDistributionChart = {
      series: [
        {
          name: '',
          data: [2.3, 3.1, 4.0, 10.1, 2.3, 3.1, 4.0, 10.1, 2.3, 3.1],
        },
      ],
      chart: {
        height: 350,
        width: 800,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + '%';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: [
          'Hatchback',
          'Sedan',
          'SUV',
          'Crossover',
          'Convertible',
          'Coupe',
          'Minivan',
          'Pickup Truck',
          'Sports Car',
          'Muscle Car',
        ],
        position: 'bottom',
        labels: {
          offsetY: -6,
          rotate: -70,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        colors: ['#faa600'],
        gradient: {
          shade: 'dark',
          type: 'diagonal',
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.8,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val + '%';
          },
        },
      },
      title: {
        text: 'Dealership car distribution by type',
        floating: 0,
        offsetY: 0,
        align: 'center',
        style: {
          color: '#444',
        },
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              height: 350,
              width: 450,
              type: 'bar',
            },
          },
        },
      ],
    };

    this.customerCityDistributionChart = {
      series: [
        {
          name: '',
          data: [2.3, 3.1, 4.0, 10.1, 2.3, 3.1, 4.0, 10.1, 2.3, 3.1],
        },
      ],
      chart: {
        height: 350,
        width: 800,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: this.top10CityNames,
        position: 'bottom',
        labels: {
          offsetY: -6,
          rotate: -70,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: false,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        colors: ['#165baa'],
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: [],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val;
          },
        },
      },
      title: {
        text: 'Top 10 city by customer count',
        floating: 0,
        offsetY: 0,
        align: 'center',
        style: {
          color: '#444',
        },
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              height: 350,
              width: 450,
              type: 'bar',
            },
          },
        },
      ],
    };

    this.allItems.bills.forEach((bill) => {
      if (bill.status?.includes('new')) this.newBills += 1;
      else this.paidBills += 1;
    });
    this.billStatusChart.series = [this.newBills, this.paidBills];

    this.allItems.orders.forEach((order) => {
      if (order.status?.includes('new')) this.newOrders += 1;
      else if (order.status?.includes('paid')) this.paidOrders += 1;
      else this.shippedOrders += 1;
    });

    this.orderStatusChart.series = [
      this.newOrders,
      this.paidOrders,
      this.shippedOrders,
    ];

    this.allItems.products.forEach((product) => {
      if (product.description?.includes('New')) this.newCars += 1;
      else if (product.description?.includes('Used')) this.usedCars += 1;
      else this.testCars += 1;
    });

    this.productDescriptionChart.series = [
      this.newCars,
      this.testCars,
      this.usedCars,
    ];

    // calc car type distribution for dealership
    this.allItems.products.forEach((product) => {
      this.allCarTypes.push(product.category.name);
    });

    const allCarCount: number = this.allItems.products.length;

    const productMap = this.allCarTypes.reduce(
      (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
      new Map()
    );

    Array.from(productMap)
      .sort((a: any, b: any) => b[1] - a[1])
      .forEach((product) => {
        this.carTypeNameList.push(product[0]);
        this.carTypeCountList.push(
          ((product[1] / allCarCount) * 100).toFixed(2)
        );
      });

    this.carTypeDistributionChart.xaxis.categories = this.carTypeNameList;
    this.carTypeDistributionChart.series[0].data = this.carTypeCountList;

    // calc customer cities
    this.allItems.customers.forEach((customer) => {
      this.allCities.push(customer.address.city);
    });

    const cityMap = this.allCities.reduce(
      (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
      new Map()
    );

    const top10SortedCities = [...cityMap]
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 10);

    top10SortedCities.forEach((city) => {
      this.top10CityNames.push(city[0]);
      this.top10CityDistribution.push(city[1]);
    });

    this.customerCityDistributionChart.xaxis.categories = this.top10CityNames;
    this.customerCityDistributionChart.series[0].data =
      this.top10CityDistribution;
  }
}
