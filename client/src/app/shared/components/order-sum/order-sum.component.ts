import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { ICartTotals } from '../../models/basket';

@Component({
  selector: 'app-order-sum',
  templateUrl: './order-sum.component.html',
  styleUrls: ['./order-sum.component.scss']
})
export class OrderSumComponent implements OnInit {
  cartTotal$: Observable<ICartTotals>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.cartTotal$ = this.basketService.cartTotal$;
  }

}
