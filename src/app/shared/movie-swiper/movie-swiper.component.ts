import { Component, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-movie-swiper',
  templateUrl: './movie-swiper.component.html',
  styleUrls: ['./movie-swiper.component.scss']
})
export class MovieSwiperComponent {

  @Input() genreId!: string;
  @Input() genreName!: string;
  AllMoviesbyGenre:any = [];
  constructor(private moviesService: MoviesService) { }

  swiper: Swiper = new Swiper('.swiper', {});

  ngOnInit() {
    this.getAllMoviesByGenres();

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

  getAllMoviesByGenres() {
    this.moviesService.getAllMovieByGenres(this.genreId)
      .subscribe((res: any) => {
        console.log('getPopularMovies', res)
        this.AllMoviesbyGenre = res.results;
        console.log("this.AllMoviesbyGenre",this.AllMoviesbyGenre)
      });
  }
}
