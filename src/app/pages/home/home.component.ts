import { Component } from '@angular/core';
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  AllGenres: any = [];
  constructor(private moviesService: MoviesService) {

  }
  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    this.moviesService.getGenres().subscribe((res: any) => {
      this.AllGenres = res.genres;
      console.log("this.AllGenres",this.AllGenres)
    });
  }

}
