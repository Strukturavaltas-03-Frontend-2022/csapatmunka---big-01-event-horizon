import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelayDataService {
  type: string = '';

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }
}
