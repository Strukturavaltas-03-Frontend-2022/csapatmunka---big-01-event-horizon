import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  firebaseUrl: string = environment.apiURL;
  entity: string = 'orders.json';

  constructor(private http: HttpClient) {}

  fetchOrders() {
    return this.http
      .get<{ [key: string]: Order }>(`${this.firebaseUrl}${this.entity}`)
      .pipe(
        map((responseData) => {
          const orderArray: Order[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              orderArray.push({ ...responseData[key], uniqueId: key });
            }
          }
          return orderArray;
        })
      );
  }

  fetchSingleOrder(uniqueId: string) {
    return this.http
      .get<Order>(`${this.firebaseUrl}orders/${uniqueId}.json`)
      .pipe(
        map((responseData) => {
          responseData['uniqueId'] = uniqueId;

          return responseData;
        })
      );
  }

  addOrder(newOrder: Order) {
    return this.http.post(`${this.firebaseUrl}${this.entity}`, newOrder);
  }

  deleteOrder(order: Order) {
    return this.http.delete(`${this.firebaseUrl}orders/${order.uniqueId}.json`);
  }

  updateOrder(order: Order) {
    return this.http.patch(
      `${this.firebaseUrl}orders/${order.uniqueId}.json`,
      order
    );
  }
}
