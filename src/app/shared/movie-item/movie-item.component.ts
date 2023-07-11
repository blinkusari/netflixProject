import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {
  constructor(private dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(MovieModalComponent, {
      width: '1000px',
      minWidth: '0px',
      height: '90vh',
      data: { /* Optionally pass data to the modal component */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the modal is closed, if needed
    });
  }
}
