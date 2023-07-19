import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieModalComponent } from './movie-modal/movie-modal.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieSwiperComponent } from './movie-swiper/movie-swiper.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';



@NgModule({
  declarations: [
    MovieModalComponent,
    MovieItemComponent,
    MovieSwiperComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MovieModalComponent,
    MovieItemComponent,
    MovieSwiperComponent,
    LanguageSelectorComponent
  ]
})
export class SharedModule { }
