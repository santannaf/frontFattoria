import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UrlsService } from './urls.service';
import { Url } from './url';

@Injectable({
  providedIn: 'root'
})
export class UrlResolverGuard implements Resolve<Url> {

  constructor(private service: UrlsService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Url>{
    
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({
      id: null,
      fullUrl: null,
      shortUrl: null
    });
  }
}
