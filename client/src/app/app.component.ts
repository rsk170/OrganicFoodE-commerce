import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // properties
  title = 'E-shop';

  // constructors
  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  // lifecycle methods
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(
      () => {
        console.log('loaded user');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('initialised basket');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
