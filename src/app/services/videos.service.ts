import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Video } from '../shared/models/video';
import { map } from 'rxjs/operators';

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

  getVideos(id: string) {
    return this.http.get(this.url + '/videographers/' + id + '/videos', this.getHeaders()).pipe(map((res) => res['videos']));
  }

  addVideo(video: Video) {
    const id = this.authService.activeUserId()
    return this.http.post(this.url + '/videographers/' + id + '/videos', video, this.getHeaders()).pipe(map((res) => res['uploadUrl']));
  }
  
  deleteVideo(userId: string, videoId: string) {
    return this.http.delete(this.url +'/videographers/' + userId + '/videos/'+ videoId, this.getHeaders()).pipe(map((res) => res['deletedVideoUrl']));
  }
}
