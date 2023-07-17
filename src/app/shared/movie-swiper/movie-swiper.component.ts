import { Component, Input } from '@angular/core';
import { MoviesService } from 'src/app/core/services/movies.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';

@Component({
  selector: 'app-movie-swiper',
  templateUrl: './movie-swiper.component.html',
  styleUrls: ['./movie-swiper.component.scss']
})
export class MovieSwiperComponent {

  @Input() genreId!: string;
  @Input() genreName!: string;
  allMoviesbyGenre: any = [];
  baseImgUrl = "https://image.tmdb.org/t/p/w400";
  movieImgUrl: any;
  dummyUrl: string = "https://picsum.photos/500/281";
  constructor(private moviesService: MoviesService, private dialog: MatDialog) { }

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
        this.allMoviesbyGenre = res.results;
        console.log("this.AllMoviesbyGenre", this.allMoviesbyGenre)
      });
  }

  getClickedMovie(id) {
    const movieById = this.allMoviesbyGenre.filter(movie => movie.id === id);
    return movieById.shift();
  }

  handleMovieItemClick(movieId: string) {
    this.openModal(movieId);
  }

  openModal(id): void {
    let movie = this.getClickedMovie(id);

    if (movie.backdrop_path) {
      this.movieImgUrl = this.baseImgUrl + movie.backdrop_path;
    }
    const dialogRef = this.dialog.open(MovieModalComponent, {
      width: '1000px',
      minWidth: '0px',
      height: '90vh',
      maxWidth: '90vw',
      data: {
        movieImage: this.movieImgUrl ? this.movieImgUrl : this.dummyUrl,
        movieTitle: movie.original_title,
        movieOverview: movie.overview,

      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
