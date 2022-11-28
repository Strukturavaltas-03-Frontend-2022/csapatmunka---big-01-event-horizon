import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelayDataService {
  items: any[] = [];
  type: string = '';

  getItems() {
    return this.items;
  }

  getType() {
    return this.type;
  }

  setItems(items: any[]) {
    this.items = [...items];
  }

  setType(type: string) {
    this.type = type;
  }

  constructor() {}
}
