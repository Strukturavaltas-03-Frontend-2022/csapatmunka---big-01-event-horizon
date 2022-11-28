import { Component, Input, OnInit } from '@angular/core';
import { RelayDataService } from 'src/app/services/relay-data.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  items: any[] = [];
  headers: string[] = [];

  dataRelay: RelayDataService = inject(RelayDataService);

  ngOnInit(): void {
    this.items = this.dataRelay.getItems();

    this.headers = [];
    for (const key in this.items[0]) {
      this.headers.push(key);
    }
  }
}
