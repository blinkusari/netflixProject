import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent {
  baseImgUrl = "https://image.tmdb.org/t/p/500";
  dummyImgUrl: string = "https://picsum.photos/500/281";
  movieImage: string;
  movieTitle: string;
  movieOverview: string;

  constructor(
    public dialogRef: MatDialogRef<MovieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movieImage = data.movieImage ? this.baseImgUrl + data.movieImage : this.dummyImgUrl;
    this.movieTitle = data.movieTitle;
    this.movieOverview = data.movieOverview;

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
