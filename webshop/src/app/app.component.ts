import { Component, inject, OnInit } from '@angular/core';
import { Bill } from './model/bill';
import { Customer } from './model/customer';
import { Order } from './model/order';
import { Product } from './model/product';
import { GeneralItemService } from './services/general-item.service';
import { RelayDataService } from './services/relay-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'car-retailer';

  dataRelay: RelayDataService = inject(RelayDataService);
  generalItemService: GeneralItemService = inject(GeneralItemService);

  ngOnInit() {
    this.generalItemService.fetchItems('products').subscribe((products) => {
      this.dataRelay.setItems([...products], 'products');
    });
    this.generalItemService.fetchItems('customers').subscribe((customers) => {
      this.dataRelay.setItems([...customers], 'customers');
    });

    this.generalItemService.fetchItems('orders').subscribe((orders) => {
      this.dataRelay.setItems([...orders], 'orders');
    });

    this.generalItemService.fetchItems('bills').subscribe((bills) => {
      this.dataRelay.setItems([...bills], 'bills');
    });
  }
}
