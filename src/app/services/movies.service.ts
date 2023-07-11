import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private httpClient: HttpClient, public router: Router) {
  }

  getMovies(){
    let parameters = {
      page: 2,
      include_adult: false
    };
    let queryParams = new HttpParams({ fromObject: parameters });

    return this.httpClient.get(`${environment.baseUrl}/discover/movie`, { params: queryParams })
      .subscribe((res: any) => {
        console.log('response', res)
      });
  }
}
