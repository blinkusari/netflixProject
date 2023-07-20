import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Genre, Movie } from "../interfaces/genre";

@Component({
  selector: 'app-movie-swiper',
  templateUrl: './movie-swiper.component.html',
  styleUrls: ['./movie-swiper.component.scss']
})
export class MovieSwiperComponent {
  baseImgUrl = "https://image.tmdb.org/t/p/w400";
  movieImgUrl: string;
  dummyUrl: string = "https://picsum.photos/500/281";
  @Input() genre: Genre;
  @Output() selectedMovie = new EventEmitter<Movie>();

  constructor() {
  }

  swiper: Swiper = new Swiper('.swiper', {});

  ngOnInit() {
    this.swiper = new Swiper('.swiper', {
      lazy: true,
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

  selectMovie(movie: Movie) {
    this.selectedMovie.emit(movie)
  }
}
