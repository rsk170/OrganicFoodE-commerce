import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;

  // observable for the current user - "1" for just one user subject
  // replay subject doesn't  emit an initial value like behaviour subject - needed for the auth guard
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  private isAdminSource = new ReplaySubject<boolean>(1);
  isAdmin$ = this.isAdminSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // pass a token to the API if it exists in the local storage
  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    // pass the token in the header of the request as a Bearer {token}
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    // pipe to map the user object that is receive to currentUser observable
    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);  // update observable and pass in user
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }

  // values come from the log in form
  login(values: any) {
    // project a response with pipe() into the current user's observable
    // but it is not a user object
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        // check if there is something in the user object
        if (user) {
          // if there is sth in user, put the token in local storage
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        // check if there is something in the user object
        if (user) {
          // if there is sth in user, put the token in local storage
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

  isAdmin(token: string): boolean {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role.indexOf('Admin') > -1) {
        return true;
      }
    }
  }
}
