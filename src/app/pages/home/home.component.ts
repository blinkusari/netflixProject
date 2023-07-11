import { Component } from '@angular/core';
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private moviesService: MoviesService) {

  }
  ngOnInit() {
    this.moviesService.getMovies();
  }
}
