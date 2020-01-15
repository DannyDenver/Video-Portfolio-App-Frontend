import { Injectable } from '@angular/core';
import { Videographer } from '../shared/models/videographer';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideographerService {
  url = environment.apiServerUrl;
  videographers = [new Videographer(1, 'Brad', 'Taylor', 'Tallahassee, FL', 'Videographer at FSU', 'https://law.fsu.edu/sites/g/files/upcbnu1581/files/styles/three_into_two_ratio/public/2019-10/Rider%2C%20Bailey_439A8174_REV_web.jpg?itok=GGc1VOsA', null),
  new Videographer(2, 'Daniel', 'Taylor', 'Denver, Co', 'Videographer in Denver', 'https://cache.legacy.net/legacy/images/cobrands/york/photos/MPA033950-1_20190805.jpg', null),
  new Videographer(3, 'Michael', 'Bubley', 'LA, CA', 'Videographer in LA', 'https://law.fsu.edu/sites/g/files/upcbnu1581/files/styles/three_into_two_ratio/public/2019-10/Rider%2C%20Bailey_439A8174_REV_web.jpg?itok=GGc1VOsA', null),
  new Videographer(4, 'Arnold', 'Schwarz', 'SF, CA', 'Videographer in SF', 'https://cache.legacy.net/legacy/images/cobrands/york/photos/MPA033950-1_20190805.jpg', null)
]

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

  getVideographer(id:string): Observable<any> {
    return this.http.get<any>(this.url + '/videographers/' + id).pipe(map((res) => res['videographer']))
  }

  getVideographers(): Observable<any> {
    return this.http.get<any>(this.url + '/videographers', this.getHeaders()).pipe(map((res) => res['videographers']))
  }

  addProfilePicture(): Observable<string> {
    const id = this.authService.activeUserId()
    return this.http.post<string>(this.url + '/videographers/' + id + '/profilePicture', null, this.getHeaders()).pipe(map((res) => res['uploadUrl']))
  }

  patchVideographer(videographer: Videographer) {
    return this.http.patch(this.url + '/videographers', videographer, this.getHeaders()).pipe(map((res) => res['updatedVideographer']))
  }

  deleteVideographer(id: string) {
    return this.http.delete(this.url + '/videographers/' + id, this.getHeaders())
  }

  addVideographer(videographer: Videographer) {  
    return this.http.post(this.url + '/videographers', videographer, this.getHeaders())
  }
}
