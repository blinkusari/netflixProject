import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private httpClient: HttpClient, public router: Router) {
  }
  private searchTermSubject = new Subject<string>();
  public searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  getGenres() {
    return this.httpClient.get(`${environment.baseUrl}/genre/movie/list`)
      .pipe(
        map((response: any) => {
          const genres = response.genres.slice(0, 5);
          response.genres = genres;
          return response;
        })
      );
  }

  getAllMovieByGenres(id: string) {
    let parameters = {
      page: 1,
      with_genres: id,
    };

    let queryParams = new HttpParams({ fromObject: parameters });

    return this.httpClient.get(`${environment.baseUrl}/discover/movie`, { params: queryParams });
  }


  getSearchMovies(keyword: string, pageIndex: number) {
    let parameters = {
      page: pageIndex,
      query: keyword,
    };

    let queryParams = new HttpParams({ fromObject: parameters });

    return this.httpClient.get(`${environment.baseUrl}/search/movie`, { params: queryParams });
  }

}
