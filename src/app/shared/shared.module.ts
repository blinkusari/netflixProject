import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieModalComponent } from './movie-modal/movie-modal.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieSwiperComponent } from './movie-swiper/movie-swiper.component';



@NgModule({
  declarations: [
    MovieModalComponent,
    MovieItemComponent,
    MovieSwiperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MovieModalComponent,
    MovieItemComponent,
    MovieSwiperComponent
  ]
})
export class SharedModule { }
