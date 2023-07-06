import { Component } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-movie-swiper',
  templateUrl: './movie-swiper.component.html',
  styleUrls: ['./movie-swiper.component.scss']
})
export class MovieSwiperComponent {
  swiper: Swiper = new Swiper('.swiper', {

  });

  ngOnInit() {
    this.swiper = new Swiper('.swiper', {
      slidesPerView: 2,
      spaceBetween: 5,
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        500: {
          slidesPerView: 3,
        },
        800: {
          slidesPerView: 4,
        },
        1100: {
          slidesPerView: 5,
        },
        1400: {
          slidesPerView: 6,

        }
      }
    });
  }
}
