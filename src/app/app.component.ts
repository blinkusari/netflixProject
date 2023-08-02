import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router, NavigationStart, RouterEvent, NavigationEnd } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NetflixProject';
  isLoggedIn: boolean = false;
  isAuthPage$: Observable<boolean>;

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
    this.isAuthPage$ = this.router.events.pipe(
      filter<any>((event) => event instanceof RouterEvent),
      map((event: NavigationEnd) => {
        const excludedUrls = ["/login", "/register"];
        return !excludedUrls.includes(event.url);
      })
    );
  }

}
