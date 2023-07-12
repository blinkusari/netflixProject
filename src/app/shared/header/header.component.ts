import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showSearchInput: boolean = false;
  searchTerm: string = '';

  constructor(private route: Router, private authService: AuthService) {

  }
  logout() {
    localStorage.removeItem('access_token');
    this.route.navigateByUrl('/login');
  }

  onSearchButtonClick() {
    this.showSearchInput = true;
  }

  closeSearchInput() {
    this.showSearchInput = false;

  }

  performSearch() {
    if (this.searchTerm.trim() !== '') {
      this.route.navigate(['/search'], { queryParams: { term: this.searchTerm } });
    } else {
      this.route.navigateByUrl('/home');
    }
  }

}
