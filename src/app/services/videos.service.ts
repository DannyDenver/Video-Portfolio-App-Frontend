import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Video } from '../shared/models/video';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  url = environment.apiServerUrl;


  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders() {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authService.activeJWT()}`)
    };
    return header;
  }

  addVideo(video: Video) {  
    return this.http.post(this.url + '/videos', video, this.getHeaders())
  }

  deleteVideo(id: number) {
    return this.http.delete(this.url + '/videos/'+ id, this.getHeaders())
  }
}
