import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showSearchInput: boolean = false;
  searchTerm: string = '';
  getAllSearchedMovies: any = []
  searchTimeout: any;
  constructor(private route: Router, private authService: AuthService, private movieService: MoviesService) { }

  logout() {
    localStorage.removeItem('access_token');
    this.route.navigateByUrl('/login');
  }

  onSearchButtonClick() {
    this.showSearchInput = true;
  }

  closeSearchInput() {
    this.showSearchInput = false;
    this.route.navigateByUrl('/home');
    this.searchTerm = '';

  }

  performSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (this.searchTerm.trim() !== '') {
        this.route.navigate(['/search'], { queryParams: { term: this.searchTerm } });
        this.movieService.setSearchTerm(this.searchTerm);
      } else {
        this.route.navigateByUrl('/home');
      }
    }, 1000);
  }



}
