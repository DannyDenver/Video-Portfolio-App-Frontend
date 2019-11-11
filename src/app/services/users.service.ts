import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
    url = environment.apiServiceUrl;

    constructor(private http: HttpClient){}

    getGreeting() {

    }
}