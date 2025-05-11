import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemDetailsComponent } from '../feature/item-details/item-details.component';
import {
  Basket,
  IBasket,
  IBasketItem,
  ICartTotals,
} from '../shared/models/basket';
import { IProduct } from '../shared/models/product';
import { IShippingOption } from '../shared/models/shippingOption';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private cartTotalSource = new BehaviorSubject<ICartTotals>(null);
  cartTotal$ = this.cartTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) {}

  setShippingPrice(shippingOption: IShippingOption) {
    this.shipping = shippingOption.price;
    this.calculateTotals();
  }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const basketItemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const currentBasket = this.getCurrentBasketValue() ?? this.createBasket();
    currentBasket.items = this.addOrUpdateItem(
      currentBasket.items,
      basketItemToAdd,
      quantity
    );
    this.setBasket(currentBasket);
  }

  incrementItemQuantity(product: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === product.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(product: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === product.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(product);
    }
  }
  removeItemFromBasket(product: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === product.id)) {
      basket.items = basket.items.filter(i => i.id !== product.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.cartTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.cartTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }

  private calculateTotals() {
    const cart = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = cart.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + shipping;
    this.cartTotalSource.next({ shipping, total, subtotal });
  }

  private addOrUpdateItem(
    items: IBasketItem[],
    basketItemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = items.findIndex((i) => i.id === basketItemToAdd.id);
    if (index === -1) {
      basketItemToAdd.quantity = quantity;
      items.push(basketItemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id); // this is a browser specific local storage
    return basket;
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
