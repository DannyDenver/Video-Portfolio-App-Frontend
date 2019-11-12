import { Injectable } from '@angular/core';
import { Videographer } from '../shared/models/videographer';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideographerService {
  videographers = [new Videographer(1, 'Brad', 'Taylor', 'Tallahassee, FL', 'Videographer at FSU', 'https://law.fsu.edu/sites/g/files/upcbnu1581/files/styles/three_into_two_ratio/public/2019-10/Rider%2C%20Bailey_439A8174_REV_web.jpg?itok=GGc1VOsA'),
  new Videographer(2, 'Daniel', 'Taylor', 'Denver, Co', 'Videographer in Denver', 'https://cache.legacy.net/legacy/images/cobrands/york/photos/MPA033950-1_20190805.jpg'),
  new Videographer(3, 'Michael', 'Bubley', 'LA, CA', 'Videographer in LA', 'https://law.fsu.edu/sites/g/files/upcbnu1581/files/styles/three_into_two_ratio/public/2019-10/Rider%2C%20Bailey_439A8174_REV_web.jpg?itok=GGc1VOsA'),
  new Videographer(4, 'Arnold', 'Schwarz', 'SF, CA', 'Videographer in SF', 'https://cache.legacy.net/legacy/images/cobrands/york/photos/MPA033950-1_20190805.jpg')
]
  constructor() { }

  getVideographers(): Observable<Videographer[]> {
    return observableOf(this.videographers);
  }

  getVideographer(firstName: string, lastName: string) {
    const videogoo = this.videographers.find(function(vid) {
        return vid.lastName.toLowerCase() === lastName && vid.lastName.toLowerCase() === lastName;
    }); 
    //const videogoo = this.videographers[0];
    return observableOf(videogoo);
  }
}
