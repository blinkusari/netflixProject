import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {

  baseImgUrl = "https://image.tmdb.org/t/p/w400";
  movieImgUrl :any;
  dummyUrl:string = "https://picsum.photos/500/281";
  @Input() movieTitle!: string;
  @Input() movieImage!: string;
  @Input() movieOverview!: string;

  constructor(private dialog: MatDialog) { }
  ngOnInit(){
    if(this.movieImage){
    this.movieImgUrl= this.baseImgUrl + this.movieImage;
    }
  }
  openModal(): void {
    const dialogRef = this.dialog.open(MovieModalComponent, {
      width: '1000px',
      minWidth: '0px',
      height: '90vh',
      maxWidth: '90vw',
      data: {
        movieImage: this.movieImgUrl? this.movieImgUrl : this.dummyUrl,
        movieTitle: this.movieTitle,
        movieOverview: this.movieOverview,

      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
