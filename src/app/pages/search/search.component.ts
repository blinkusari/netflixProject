import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieModalComponent } from 'src/app/shared/movie-modal/movie-modal.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchedMovies: any = [];
  searchTerm: string = '';

  totalCount = 0;
  pageIndex = 1;
  pageSize = 20;
  scrolledToBottom = false;
  loader = false;
  baseImgUrl = "https://image.tmdb.org/t/p/w400";
  movieImgUrl: any;
  dummyUrl: string = "https://picsum.photos/500/281";
  constructor(private route: ActivatedRoute, private movieService: MoviesService, private dialog: MatDialog) {
  }

  @HostListener('window:scroll', ['$event.target'])
  async onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!this.scrolledToBottom) {
        this.scrolledToBottom = true;
        await this.onScrollLoadData();
      }
    } else {
      this.scrolledToBottom = false;
    }
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('term') || '';
      console.log("this.searchTerm", this.searchTerm);
    });


    this.movieService.searchTerm$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.searchMovies().then();
    });
  }

  async searchMovies() {
    const response: any = await this.movieService.getSearchMovies(this.searchTerm, 1).toPromise();
    this.searchedMovies = response.results;
    this.totalCount = response?.total_results;
    if (this.searchedMovies.length + 20 >= this.totalCount) {
      this.loader = false;
    }
    else {
      this.loader = true;

    }
    console.log("this.searchedMovies", this.searchedMovies);

  }

  async getMovies(pageIndex) {
    try {
      const response: any = await this.movieService.getSearchMovies(this.searchTerm, pageIndex).toPromise();
      this.searchedMovies = [...this.searchedMovies, ...response.results];
    } catch (error) {
      console.log(error)
    }
  }

  async onScrollLoadData() {
    if (this.searchedMovies.length !== this.totalCount) {
      this.pageIndex += 1;
      await this.getMovies(this.pageIndex);
    } else {
      this.loader = false;


    }
  }

  getClickedMovie(id) {
    const movieById = this.searchedMovies.filter(movie => movie.id === id);
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
