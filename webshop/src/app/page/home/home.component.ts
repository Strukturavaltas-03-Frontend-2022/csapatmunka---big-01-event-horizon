import { Component, OnInit } from '@angular/core';

import { BillService } from 'src/app/services/bill.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { inject } from '@angular/core';
import { RelayDataService } from 'src/app/services/relay-data.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productService: ProductService = inject(ProductService);
  customerService: CustomerService = inject(CustomerService);
  orderService: OrderService = inject(OrderService);
  billService: BillService = inject(BillService);
  dataRelay: RelayDataService = inject(RelayDataService);
  router: Router = inject(Router);

  showSpinner: boolean = false;

  constructor() {}

  onClickCustomers() {
    this.showSpinner = true;
    this.customerService.fetchCustomers().subscribe((customers) => {
      this.setData(customers);
    });
  }

  onClickProducts() {
    this.showSpinner = true;
    this.productService.fetchProducts().subscribe((products) => {
      this.setData(products);
    });
  }

  onClickOrders() {
    this.showSpinner = true;
    this.orderService.fetchOrders().subscribe((orders) => {
      this.setData(orders);
    });
  }

  onClickBills() {
    this.showSpinner = true;
    this.billService.fetchBills().subscribe((bills) => {
      this.setData(bills);
    });
  }

  setData(items: any) {
    this.dataRelay.setItems([]);
    this.dataRelay.setItems([...items]);
    this.router.navigate(['/list']);
  }

  ngOnInit(): void {
    this.showSpinner = false;
  }
}
