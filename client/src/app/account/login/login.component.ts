import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // query params from the route; if not return url - send them to /shop
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }

  // create the form controls that will comprise the login form (email and password)
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    // the login method in the service does not return a user object so log in console
    this.accountService.login(this.loginForm.value).subscribe(
      () => {
        // the token should be loaded in the local storage
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
