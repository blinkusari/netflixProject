import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  getAllSearchedMovies: any = [];
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private movieService: MoviesService) { }
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('term') || '';
      console.log(this.searchTerm);
    });


    this.movieService.searchTerm$.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.searchMovies();
    });
  }

  searchMovies() {
    this.movieService.getSearchMovies(this.searchTerm)
      .subscribe((res: any) => {
        console.log('getAllSearchedMovies', res)
        this.getAllSearchedMovies = res.results;
        console.log("this.getAllSearchedMovies", this.getAllSearchedMovies)
      });
  }

}
