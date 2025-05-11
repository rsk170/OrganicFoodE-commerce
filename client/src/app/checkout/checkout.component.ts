import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit(): void {
    this.createCheckourForm();
    this.getAddressFormValues();
  }

  createCheckourForm() {
    this.checkoutForm = this.fb.group({
      // three form groups inside form group
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
        postcode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        shippingOption: [null, Validators.required]
        }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required],
        cardNumber: [null, Validators.required],
        cardExpiry: [null, Validators.required],
        cvv: [null, Validators.required],
      })
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(
      address => {
        if (address) {
          this.checkoutForm.get('addressForm').patchValue(address);
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
