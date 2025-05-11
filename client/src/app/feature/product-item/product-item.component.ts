import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BasketRoutingModule } from 'src/app/basket/basket-routing.module';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct; // allows us to accept a property from a parent component

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }
}
