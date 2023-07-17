import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NetflixProject';
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/register') {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
        }
      }
    });
  }
  ngOnInit() {
  }

}
