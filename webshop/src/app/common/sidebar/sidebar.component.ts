import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { ConfigService, IMenuItem } from 'src/app/services/config.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { RelayDataService } from 'src/app/services/relay-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  appName: string = this.config.appName;
  menuItems: IMenuItem[] = this.config.menuItems;

  productService: ProductService = inject(ProductService);
  customerService: CustomerService = inject(CustomerService);
  orderService: OrderService = inject(OrderService);
  billService: BillService = inject(BillService);
  dataRelay: RelayDataService = inject(RelayDataService);
  router: Router = inject(Router);

  showSpinner: boolean = false;

  ngOnInit(): void {}

  constructor(private config: ConfigService) {}
}
