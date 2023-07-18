import { Component } from '@angular/core';
import { MoviesService } from "../../core/services/movies.service";
import {MovieModalComponent} from "../../shared/movie-modal/movie-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  moviesByGenre: any[] = [];

  constructor(private moviesService: MoviesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    this.moviesService.getGenres().subscribe((res: any) => {
      res.genres.forEach((genre: any) => {
        this.moviesService.getAllMovieByGenres(genre.id)
          .subscribe((moviesRes: any) => {
            genre.movies = moviesRes.results;
          });
      });
      console.log('res.', res.genres)
      this.moviesByGenre = res.genres;
    });
  }

  openModal(movie: any): void {
    const dialogRef = this.dialog.open(MovieModalComponent, {
      width: '1000px',
      minWidth: '0px',
      height: '90vh',
      maxWidth: '90vw',
      data: {
        movieImage: movie.backdrop_path,
        movieTitle: movie.original_title,
        movieOverview: movie.overview,

      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
