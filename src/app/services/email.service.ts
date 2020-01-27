import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class EmailService {
    url = environment.apiServerUrl;
  
    constructor(private http: HttpClient, private authService: AuthService) { }
    getHeaders() {
        const header = {
          headers: new HttpHeaders()
            .set('Authorization',  `Bearer ${this.authService.activeJWT()}`)
        };
        return header;
      }

    verifyEmail(email:string):Observable<any> {
        return this.http.post(this.url + '/verifyEmail/' + email, null).pipe(map((res) => res['verificationSent']))
    }
  }