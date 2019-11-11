import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  getGreeting() {
    return this.http.get(this.url + '/hello', {responseType: 'text'})
  }
}
