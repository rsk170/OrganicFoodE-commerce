import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IOrderToCreate } from '../shared/models/order';
import { IShippingOption } from '../shared/models/shippingOption';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFlatService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }

  getShippingOptions() {
    return this.http.get(this.baseUrl + 'orders/shippingOptions').pipe(
      map((so: IShippingOption[]) => {
        return so.sort((a, b) => b.price - a.price);
      })
    );
  }
}
