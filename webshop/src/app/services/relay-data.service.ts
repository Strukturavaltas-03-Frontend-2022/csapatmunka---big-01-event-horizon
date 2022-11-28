import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelayDataService {
  items: any[] = [];

  getItems() {
    return this.items;
  }

  setItems(items: any[]) {
    this.items = [...items];
  }

  constructor() {}
}
