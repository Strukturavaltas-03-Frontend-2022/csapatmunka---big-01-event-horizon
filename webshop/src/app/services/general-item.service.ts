import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bill } from '../model/bill';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { BehaviorSubject } from 'rxjs';
import { BehaviorItemList } from '../model/item-list';

@Injectable({
  providedIn: 'root',
})
export class GeneralItemService {
  firebaseUrl: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  listOfAll$: BehaviorSubject<BehaviorItemList> =
    new BehaviorSubject<BehaviorItemList>({
      products: new BehaviorSubject<Product[]>([]),
      customers: new BehaviorSubject<Customer[]>([]),
      orders: new BehaviorSubject<Order[]>([]),
      bills: new BehaviorSubject<Bill[]>([]),
    });

  products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  customers$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  orders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  bills$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);

  fetchAllListsFromAllEntities(entityList: string[]): void {
    entityList.forEach((entity: string) => {
      this.http
        .get<{ [key: string]: any }>(`${this.firebaseUrl}${entity}.json`)
        .pipe(
          map((responseData) => {
            const itemArray: any[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                itemArray.push({ ...responseData[key], uniqueId: key });
              }
            }
            return itemArray;
          })
        )
        .subscribe((data) => {
          switch (entity) {
            case 'products':
              this.products$.next(data);
              this.listOfAll$.value.products.next(data);

              break;
            case 'customers':
              this.customers$.next(data);
              this.listOfAll$.value.customers.next(data);

              break;
            case 'orders':
              this.orders$.next(data);
              this.listOfAll$.value.orders.next(data);

              break;
            case 'bills':
              this.bills$.next(data);
              this.listOfAll$.value.bills.next(data);
          }
        });
    });
  }

  addItem(newItem: Customer | Product | Order | Bill, entity: string) {
    return this.http.post(`${this.firebaseUrl}${entity}.json`, newItem);
  }

  deleteItem(uniqueId: string, entity: string) {
    return this.http.delete(`${this.firebaseUrl}${entity}/${uniqueId}.json`);
  }

  updateItem(item: Customer | Product | Order | Bill, entity: string) {
    return this.http.patch(
      `${this.firebaseUrl}${entity}/${item.uniqueId}.json`,
      item
    );
  }
}
