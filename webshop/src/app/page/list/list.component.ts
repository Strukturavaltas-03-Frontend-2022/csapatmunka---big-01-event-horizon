import { Component, Input, OnInit } from '@angular/core';
import { RelayDataService } from 'src/app/services/relay-data.service';
import { inject } from '@angular/core';
import { Customer, customerHeaders } from 'src/app/model/customer';
import { productHeaders } from 'src/app/model/product';
import { orderHeaders } from 'src/app/model/order';
import { billHeaders } from 'src/app/model/bill';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  items: any[] = [];
  type: string = '';

  headers: string[] = [];

  dataRelay: RelayDataService = inject(RelayDataService);

  ngOnInit(): void {
    this.items = this.dataRelay.getItems();
    this.type = this.dataRelay.getType();

    switch (this.type) {
      case 'products':
        this.headers = productHeaders;
        break;
      case 'customers':
        this.headers = customerHeaders;
        break;
      case 'orders':
        this.headers = orderHeaders;
        break;
      case 'bills':
        this.headers = billHeaders;
        break;
    }
    /*
    this.headers = [];
    for (const key in this.items[0]) {
      this.headers = customerHeaders;
    }*/
  }
}
