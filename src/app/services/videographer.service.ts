import { Injectable } from '@angular/core';
import { Videographer } from '../shared/models/videographer';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideographerService {
  url = environment.apiServerUrl;
  videographers = [new Videographer(1, 'Brad', 'Taylor', 'Tallahassee, FL', 'Videographer at FSU', 'https://law.fsu.edu/sites/g/files/upcbnu1581/files/styles/three_into_two_ratio/public/2019-10/Rider%2C%20Bailey_439A8174_REV_web.jpg?itok=GGc1VOsA'),
  new Videographer(2, 'Daniel', 'Taylor', 'Denver, Co', 'Videographer in Denver', 'https://cache.legacy.net/legacy/images/cobrands/york/photos/MPA033950-1_20190805.jpg'),
  new Videographer(3, 'Michael', 'Bubley', 'LA, CA', 'Videographer in LA', 'https://law.fsu.edu/sites/g/files/upcbnu1581/files/styles/three_into_two_ratio/public/2019-10/Rider%2C%20Bailey_439A8174_REV_web.jpg?itok=GGc1VOsA'),
  new Videographer(4, 'Arnold', 'Schwarz', 'SF, CA', 'Videographer in SF', 'https://cache.legacy.net/legacy/images/cobrands/york/photos/MPA033950-1_20190805.jpg')
]
  constructor(private http: HttpClient) { }

  getVideographers(): Observable<Videographer[]> {
    return this.http.get<Videographer[]>(this.url + '/videographers')
  }

  getVideographer(name: string) {
    return this.http.get<Videographer>(this.url + '/videographers/' + name)
  }

  addVideographer(videographer: Videographer) {  
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post(this.url + '/videographers', videographer, options)
  }
}
