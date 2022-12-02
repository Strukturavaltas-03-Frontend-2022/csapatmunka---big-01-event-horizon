import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bill } from '../model/bill';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { of } from 'rxjs';
import { ItemList } from '../model/item-list';

@Injectable({
  providedIn: 'root',
})
export class GeneralItemService {
  firebaseUrl: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  // fetch items from all entities
  fetchAllEntities(entityList: string[]) {
    let allDatabaseLists: ItemList = new ItemList();

    entityList.forEach((entity: string) => {
      return this.http
        .get<{ [key: string]: any }>(`${this.firebaseUrl}${entity}.json`)
        .forEach((list) => {
          allDatabaseLists[entity] = list;
          const itemArray: any[] = [];
          for (const key in allDatabaseLists[entity]) {
            if (allDatabaseLists[entity].hasOwnProperty(key)) {
              itemArray.push({
                ...allDatabaseLists[entity][key],
                uniqueId: key,
              });
            }
          }
          allDatabaseLists[entity] = [...itemArray];
        });
    });
    return of(allDatabaseLists);
  }

  //fetch items by entity name
  fetchItems(entity: string) {
    return this.http
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
      );
  }

  //fetch single item by entity name
  fetchSingleItem(
    uniqueId: string,
    entity: string,
    model: Customer | Product | Order | Bill
  ) {
    return this.http
      .get<typeof model>(`${this.firebaseUrl}${entity}/${uniqueId}.json`)
      .pipe(
        map((responseData) => {
          responseData['uniqueId'] = uniqueId;

          return responseData;
        })
      );
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

  /*updateAll(items: any[], entity: string) {
    let updateObject: { [key: string]: any } = {};
    items.forEach((item) => {
      updateObject[item.uniqueId] = item;
    });
    
    return this.http.post(`${this.firebaseUrl}${entity}.json`, updateObject);
  }*/
}
