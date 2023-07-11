import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  authForm: FormGroup;
  isSubmitted = false;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    console.log("log", this.authService.isLoggedIn())
   
    //     "email":"superman@gmail.com",
    //     "password":"123456"
  }

  signIn() {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.authService.login(this.authForm.value);
  }

  login() {
    const userData = {
      email: this.email,
      password: this.password
    }
    this.authService.login(userData)
  }
}
