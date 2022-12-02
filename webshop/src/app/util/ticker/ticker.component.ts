import { Component, inject, OnInit } from '@angular/core';

import { RelayDataService } from 'src/app/services/relay-data.service';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss'],
})
export class TickerComponent implements OnInit {
  dataRelay: RelayDataService = inject(RelayDataService);

  statisticalData: any[] = [];
  ngOnInit(): void {
    setTimeout(() => {
      this.statisticalData = this.dataRelay.getAllStatisticalData();
    }, 50);
  }
}
