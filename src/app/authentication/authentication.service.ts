import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TELCOPRO_URL } from '../models/config.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';

@Injectable()
export class AuthenticationService {
  token: any;
  user: User;

  constructor(private http: Http) {}

  onLogin(user: User) {
    return this.http.post(TELCOPRO_URL + '/login', user);
  }

  setToken(token: any) {
    this.token = token;
    localStorage.setItem('token', this.token);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    localStorage.setItem("username", decodedToken.sub);
    console.log(decodedToken);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  setUser(user) {
    this.user = user;
  }

  getUserName(){
    return localStorage.getItem('username');
  }

  getUser(): User {
    return this.user;
  }

   getHeaders(): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.getToken());
    const options = new RequestOptions({headers: headers});
    return options;
  }
}
