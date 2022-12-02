import { Component, inject, Input, OnInit } from '@angular/core';
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
    this.generalItemService
      .fetchAllEntities(['products', 'customers', 'orders', 'bills'])
      .subscribe((data) => {
        setTimeout(() => {
          this.dataRelay.setAll(data);
          this.dataRelay.setAllStatisticalData(data);
        }, 50);
      });
  }

  /*fetchData(entity: string) {
    this.generalItemService.fetchItems(entity).subscribe((items) => {
      this.dataRelay.setItems([...items], entity);
    });
  }*/
}
