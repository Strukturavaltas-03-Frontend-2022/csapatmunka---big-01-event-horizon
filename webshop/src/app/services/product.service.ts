import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  firebaseUrl: string = environment.apiURL;
  entity: string = 'products.json';

  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http
      .get<{ [key: string]: Product }>(`${this.firebaseUrl}${this.entity}`)
      .pipe(
        map((responseData) => {
          const productArray: Product[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              productArray.push({ ...responseData[key], uniqueId: key });
            }
          }
          return productArray;
        })
      );
  }

  fetchSingleProduct(uniqueId: string) {
    return this.http
      .get<Product>(`${this.firebaseUrl}products/${uniqueId}.json`)
      .pipe(
        map((responseData) => {
          responseData['uniqueId'] = uniqueId;

          return responseData;
        })
      );
  }

  addProduct(newProduct: Product) {
    return this.http.post(`${this.firebaseUrl}${this.entity}`, newProduct);
  }

  deleteProduct(product: Product) {
    return this.http.delete(
      `${this.firebaseUrl}products/${product.uniqueId}.json`
    );
  }

  updateProduct(product: Product) {
    return this.http.patch(
      `${this.firebaseUrl}products/${product.uniqueId}.json`,
      Product
    );
  }
}
