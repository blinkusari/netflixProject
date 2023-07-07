import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {
  }
ngOnInit() {
  this.authService.login(
    {
      "email":"superman@gmail.com",
      "password":"123456"
    }
  )
}
}
