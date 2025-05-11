import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  constructor(
    // used to create the form
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      // form controls - set the properties inside the array
      displayName: [null, [Validators.required]],
      email: [
        null,
        // array for the synchronous validators
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
        // array for async validators - only called if sync validators are passed
        [this.validateEmailNotTaken()]
      ],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    });
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      // add a delay - in order not to continue making requests every time user types a character
      return timer (500).pipe(
        // return the inner observable to control which is the outer observabe with switchMap()
        switchMap(() => {
          // if control has value or not - return observable of null
          if (!control.value) {
            return of(null);
          }
          // go to account service to check if exists, pass in the email (in control.value)
          return this.accountService.checkEmailExists(control.value).pipe(
            // from the response we get, result is returned
            map(result => {
              // emailExists to call the validator in template
              return result ? {emailExists: true} : null;
            })
          );
          })
      );
    };
}
}
