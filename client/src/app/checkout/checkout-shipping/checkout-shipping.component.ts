import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IShippingOption } from 'src/app/shared/models/shippingOption';
import { CheckoutFlatService } from '../checkout--flat.service';

@Component({
  selector: 'app-checkout-shipping',
  templateUrl: './checkout-shipping.component.html',
  styleUrls: ['./checkout-shipping.component.scss']
})
export class CheckoutShippingComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  shippingOptions: IShippingOption[];

  constructor(private checkoutFlatService: CheckoutFlatService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.checkoutFlatService.getShippingOptions().subscribe((so: IShippingOption[]) => {
      this.shippingOptions = so;
    }, error => {
      console.log(error);
    });
  }

  setShippingPrice(shippingOption: IShippingOption) {
    this.basketService.setShippingPrice(shippingOption);
  }

}
