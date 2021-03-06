import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Video } from '../shared/models/video';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  getVideos(video?: Video): Observable<any> {
    let params = video ? new HttpParams().set('video', JSON.stringify(video)) : null;
    return this.http.get(this.url + '/videos', { params },);
  }

  getVideo(videoId:string):Observable<Video> {
    return this.http.get(this.url + '/videos/' + videoId).pipe(map((res) => res['video']))
  }
  
  addVideo(video: Video) {
    const id = this.authService.activeUserId()
    return this.http.post(this.url + '/videographers/' + encodeURI(id) + '/videos', video, this.getHeaders()).pipe(map((res) => res['uploadUrl']));
  }

  editVideo(video: Video) {
    return this.http.patch(this.url + '/videos/' + video.id, video, this.getHeaders())
  }

  addVideoThumbnail(videoId: string) {
    return this.http.post(this.url + `/videos/${videoId}/thumbnailPhoto`, null, this.getHeaders()).pipe(map((res) => res['uploadUrl']));
  }
  
  deleteVideo(id: string, videoId: string) {
    return this.http.delete(this.url +'/videographers/' + encodeURI(id) + '/videos/'+ videoId, this.getHeaders());
  }
}
