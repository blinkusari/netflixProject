import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {
  baseImgUrl = "https://image.tmdb.org/t/p/w300";
  dummyImgUrl: string = "https://picsum.photos/300/168";

  @Input() title: string = '';

  _imageUrl: string = '';
  @Input() set imageUrl(value: string) {
    this._imageUrl = value ? (this.baseImgUrl + value) : this.dummyImgUrl;
  }
  get imageUrl(): string {
    return this._imageUrl;
  }

  constructor() { }
}
