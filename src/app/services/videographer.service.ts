import { Injectable } from '@angular/core';
import { Videographer } from '../shared/models/videographer';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
        .set('Authorization', `Bearer ${this.authService.activeJWT()}`)
    };

    return header;
  }

  addCoverPhoto(): Observable<string> {
    const id = this.authService.activeUserId()
    return this.http.post<string>(this.url + '/videographers/' + encodeURI(id) + '/coverPhoto', null, this.getHeaders()).pipe(map((res) => res['uploadUrl']))
  }

  addProfilePicture(fileType: string = null): Observable<string> {
    const id = this.authService.activeUserId();
    let params = { 'fileType': fileType }

    return this.http.post<string>(this.url + '/videographers/' + encodeURI(id) + '/profilePicture', params, this.getHeaders()).pipe(map((res) => res['uploadUrl']))
  }

  deleteVideographer(id: string) {
    return this.http.delete(this.url + '/videographers/' + encodeURI(id), this.getHeaders())
  }
  
  getVideographer(id: string): Observable<Portfolio> {
    return this.http.get<any>(this.url + '/videographers/' + encodeURI(id), this.getHeaders());
  }

  getVideographers(): Observable<Videographer[]> {
    return this.http.get<any>(this.url + '/videographers', this.getHeaders());
  }

  patchVideographer(videographer: Videographer) {
    return this.http.patch(this.url + '/videographers', videographer, this.getHeaders());
  }

  postVideographer(videographer: Videographer) {
    return this.http.post(this.url + '/videographers', videographer, this.getHeaders())
  }

  subscribeToPortfolio(videographer: Videographer, phoneNumber: string): Observable<any> {
    return this.http.post(this.url + `/videographers/${videographer.id}/addSubscriber/${phoneNumber}`, videographer).pipe(map((res) => res['verificationSent']))
  }
}
