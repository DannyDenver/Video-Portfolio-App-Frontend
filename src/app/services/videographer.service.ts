import { Injectable } from '@angular/core';
import { Videographer } from '../shared/models/videographer';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Portfolio } from '../shared/models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class VideographerService {
  url = environment.apiServerUrl;

constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders() {
    if (!this.authService.activeJWT()) {
      return undefined;
    }

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authService.activeJWT()}`)
    };

    return header;
  }

  getPortfolio(id: string):Observable<Portfolio>{
    return this.http.get<any>(this.url + '/portfolio/' + encodeURI(id))
  }

  getVideographer(id:string): Observable<any> {
    return this.http.get<any>(this.url + '/videographers/' + encodeURI(id)).pipe(map((res) => res['videographer']))
  }

  getVideographers(): Observable<any> {
    return this.http.get<any>(this.url + '/videographers', this.getHeaders()).pipe(map((res) => res['videographers']))
  }

  addProfilePicture(): Observable<string> {
    const id = this.authService.activeUserId()
    return this.http.post<string>(this.url + '/videographers/' + encodeURI(id) + '/profilePicture', null, this.getHeaders()).pipe(map((res) => res['uploadUrl']))
  }

  patchVideographer(videographer: Videographer) {
    return this.http.patch(this.url + '/videographers', videographer, this.getHeaders()).pipe(map((res) => res['updatedVideographer']))
  }

  deleteVideographer(id: string) {
    return this.http.delete(this.url + '/videographers/' + encodeURI(id), this.getHeaders())
  }

  postVideographer(videographer: Videographer) {  
    return this.http.post(this.url + '/videographers', videographer, this.getHeaders())
  }
}
