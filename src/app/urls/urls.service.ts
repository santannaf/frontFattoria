import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from './url';
import { tap, take } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  private readonly API = `${environment.API}`;

  httpOptions = {
    headers: new HttpHeaders({ 
      // 'Access-Control-Allow-Methods':'POST, PUT, GET, OPTIONS, DELETE',
      // 'Access-Control-Allow-Origin': 'http://localhost:4200',
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Expose-Header': 'Location',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Url[]>(`${this.API}url/list`)
      .pipe(
        tap(console.log)
      )
  }

  loadById(id) {
    return this.http.get<Url>(`${this.API}url/${id}`).pipe(take(1));
  }

  createShortUrl(url) {
    console.log(this.httpOptions)
    return this.http.post(this.API, url)
      .pipe(
        take(1)
      );
  }

  updatedUrl(url) {
    return this.http.put(`${this.API}url/${url.id}`, url).pipe(take(1));
  }

  deleteurl(id) {
return this.http.delete(`${this.API}url/${id}`).pipe(take(1));
  }

}
