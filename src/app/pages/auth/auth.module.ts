import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        AuthComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        FormsModule
    ],
    exports: [
        AuthComponent,
    ]
})
export class AuthModule { }
