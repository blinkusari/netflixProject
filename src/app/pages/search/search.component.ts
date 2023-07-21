import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieModalComponent } from 'src/app/shared/movie-modal/movie-modal.component';
import { Movie } from "../../shared/interfaces/genre";
import { debounceTime, distinctUntilChanged, take, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchedMovies: Movie[] = [];
  searchTerm: string = '';
  totalCount = 0;
  pageIndex = 1;
  pageSize = 20;
  scrolledToBottom = false;
  loader = false;
  private destroy$ = new Subject<void>();

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


    this.movieService.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.searchMovies();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchMovies() {
    this.movieService.getSearchMovies(this.searchTerm, 1).pipe(
      take(1)
    ).subscribe(
      response => {
        console.log("response", response);
        this.searchedMovies = response.results;
        this.totalCount = response?.total_results;
        if (this.searchedMovies.length + 20 >= this.totalCount) {
          this.loader = false;
        }
        else {
          this.loader = true;

        }
      }
    );

    console.log("this.searchedMovies", this.searchedMovies);

  }

  getMovies(pageIndex) {
    return this.movieService.getSearchMovies(this.searchTerm, pageIndex).pipe(
      tap((response: any) => {
        this.searchedMovies = [...this.searchedMovies, ...response.results];
      })
    );
  }

  onScrollLoadData() {
    if (this.searchedMovies.length !== this.totalCount) {
      this.pageIndex += 1;
      this.getMovies(this.pageIndex).subscribe();
    } else {
      this.loader = false;
    }
  }

  openModal(movie): void {
    const dialogRef = this.dialog.open(MovieModalComponent, {
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
