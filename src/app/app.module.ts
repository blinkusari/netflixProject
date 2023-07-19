import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthModule } from './pages/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {BaseInterceptor} from "./core/interceptors/base.interceptor";
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HomeModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule,
    TranslocoRootModule,
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
