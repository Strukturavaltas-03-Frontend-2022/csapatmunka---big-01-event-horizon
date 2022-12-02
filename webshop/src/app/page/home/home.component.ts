import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /*allDBItms: {
    [key: string]: any;
    products: Product[];
    customers: Customer[];
    orders: Order[];
    bills: Bill[];
  } = { products: [], customers: [], orders: [], bills: [] };

  allOrderPrices: number[] = [];*/

  /*constructor(
    private dataRelay: RelayDataService,
    private generalService: GeneralItemService
  ) {}*/

  ngOnInit(): void {
    /*this.allDBItms = this.dataRelay.getAll();

    this.allDBItms.orders.forEach((order) => {
      this.allDBItms.products.forEach((product) => {
        if (order.productId === product.id) {
          this.allOrderPrices.push(order.amount * product.price);
        }
      });
    });

    this.allOrderPrices.forEach((price, i) => {
      this.allDBItms.bills.forEach((bill) => {
        if (bill.orderId === i + 1) {
          bill.amount = price;
        }
      });
    });

    console.log(this.allOrderPrices);
    console.log(this.allDBItms.bills);

    this.generalService
      .updateAll(this.allDBItms.bills)
      .subscribe((bills) => console.log(bills));*/
  }
}
