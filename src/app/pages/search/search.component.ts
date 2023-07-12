import {Component, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from 'src/app/services/movies.service';

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

  constructor(private route: ActivatedRoute, private movieService: MoviesService) {
  }

  @HostListener('window:scroll', ['$event.target'])
  async onWindowScroll(event) {
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
      console.log(this.searchTerm);
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
    }
  }
}
