import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { User } from "../user";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, public router: Router) {
  }


  register(user: User) {
    console.log('user', user)
    return this.httpClient.post(`${environment.authUrl}/register`, user)
      .subscribe((res: any) => {
        console.log('response', res)
        localStorage.setItem('access_token', res.token)
        this.router.navigate(['/home']);
      });
  }


  login(user: User) {
    return this.httpClient.post<any>(`${environment.authUrl}/login`, user)
      .subscribe((res: any) => {
        console.log('login', res)
        localStorage.setItem('access_token', res.token)
        this.router.navigate(['/home']);
      })
  }

  public isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }
}
