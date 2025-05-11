import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { CheckoutFlatService } from '../checkout--flat.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutFlatService: CheckoutFlatService,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutFlatService.createOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        this.toastr.success('Order created successfully');
        this.basketService.deleteLocalBasket(basket.id);
        const navigationExtras: NavigationExtras = {state: order};
        this.router.navigate(['checkout/success'], navigationExtras);
        console.log(order);
      },
      (error) => {
        this.toastr.error(error.message);
        console.log(error);
      }
    );
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      shippingOptionId: +this.checkoutForm
        .get('deliveryForm')
        .get('shippingOption').value,
      shippingAddress: this.checkoutForm.get('addressForm').value,
    };
  }
}
