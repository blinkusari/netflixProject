import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoRootModule } from 'src/app/transloco-root.module';



@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoRootModule
  ],
  exports: [
  ]
})
export class HomeModule { }
