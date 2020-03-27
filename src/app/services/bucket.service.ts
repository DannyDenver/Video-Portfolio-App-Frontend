import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
    constructor(private http: HttpClient) { }

    uploadFile(url: string, file: File): Observable<any> {
      let headers = new HttpHeaders();
      headers = headers.set("Cache-Control", "max-age=2592000");
        return this.http.put(url, file, {headers});
      }
}