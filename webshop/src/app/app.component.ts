import { Component, inject, OnInit } from '@angular/core';

import { GeneralItemService } from './services/general-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'car-retailer';

  generalItemService: GeneralItemService = inject(GeneralItemService);

  ngOnInit() {
    this.generalItemService.fetchAllListsFromAllEntities([
      'products',
      'customers',
      'orders',
      'bills',
    ]);
  }
}
