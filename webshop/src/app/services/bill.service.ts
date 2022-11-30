import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  firebaseUrl: string = environment.apiURL;
  entity: string = 'bills.json';

  constructor(private http: HttpClient) {}

  fetchBills() {
    return this.http
      .get<{ [key: string]: Bill }>(`${this.firebaseUrl}${this.entity}`)
      .pipe(
        map((responseData) => {
          const billArray: Bill[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              billArray.push({ ...responseData[key], uniqueId: key });
            }
          }
          return billArray;
        })
      );
  }

  fetchSingleBill(uniqueId: string) {
    return this.http
      .get<Bill>(`${this.firebaseUrl}bills/${uniqueId}.json`)
      .pipe(
        map((responseData) => {
          responseData['uniqueId'] = uniqueId;

          return responseData;
        })
      );
  }

  addBill(newBill: Bill) {
    return this.http.post(`${this.firebaseUrl}${this.entity}`, newBill);
  }

  deleteBill(bill: Bill) {
    return this.http.delete(`${this.firebaseUrl}bills/${bill.uniqueId}.json`);
  }

  updateBill(bill: Bill) {
    return this.http.patch(
      `${this.firebaseUrl}bills/${bill.uniqueId}.json`,
      bill
    );
  }
}
