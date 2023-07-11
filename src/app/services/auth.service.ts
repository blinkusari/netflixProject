import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

// export class User {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   password_confirmation: string;
// }

export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, public router: Router) {
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${environment.authUrl}/register`, user).pipe(
      catchError(this.handleError)
    )
  }

  login(user: any) {
    return this.httpClient.post<any>(`${environment.authUrl}/login`, user)
      .subscribe((res: any) => {
        console.log('LOGIn', res)
        localStorage.setItem('access_token', res.token)
        this.router.navigate(['/home']);
      })
  }

  public isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
