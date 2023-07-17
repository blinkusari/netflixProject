import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {

  baseImgUrl = "https://image.tmdb.org/t/p/w400";
  movieImgUrl: any;
  dummyUrl: string = "https://picsum.photos/500/281";
  @Input() movieTitle!: string;
  @Input() movieImage!: string;
  @Input() movieOverview!: string;
  @Input() movieId!: string;

  @Output() action: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnInit() {
    if (this.movieImage) {
      this.movieImgUrl = this.baseImgUrl + this.movieImage;
    }
  }
  handleClick() {
    this.action.emit(this.movieId);
  }

}
