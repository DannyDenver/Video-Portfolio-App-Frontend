import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
    constructor(private http: HttpClient) { }

    uploadFile(url: string, file: File): Observable<any> {
        return this.http.put(url, file)
      }
}