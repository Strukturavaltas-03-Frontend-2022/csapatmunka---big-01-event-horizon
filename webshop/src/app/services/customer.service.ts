import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  firebaseUrl: string = environment.apiURL;
  entity: string = 'customers.json';

  constructor(private http: HttpClient) {}

  fetchCustomers() {
    return this.http
      .get<{ [key: string]: Customer }>(`${this.firebaseUrl}${this.entity}`)
      .pipe(
        map((responseData) => {
          const customerArray: Customer[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              customerArray.push({ ...responseData[key], uniqueId: key });
            }
          }
          return customerArray;
        })
      );
  }

  fetchSingleCustomer(uniqueId: string) {
    return this.http
      .get<Customer>(`${this.firebaseUrl}customers/${uniqueId}.json`)
      .pipe(
        map((responseData) => {
          responseData['uniqueId'] = uniqueId;

          return responseData;
        })
      );
  }

  addCustomer(newCustomer: Customer) {
    return this.http.post(`${this.firebaseUrl}${this.entity}`, newCustomer);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(
      `${this.firebaseUrl}customers/${customer.uniqueId}.json`
    );
  }

  updateCustomer(customer: Customer) {
    return this.http.patch(
      `${this.firebaseUrl}customers/${customer.uniqueId}.json`,
      customer
    );
  }
}
