import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    // this.authService.login(
    //   {
    //     "email":"superman@gmail.com",
    //     "password":"123456"
    //   }
    // )
  }

  login() {
    const userData = {
      email: this.email,
      password: this.password
    }
    this.authService.login(userData)
  }
}
