import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService 
{

  constructor(private http: HttpClient) { }

  login(formdata): Observable<any>
  {
    return this.http.post('/api/users/login', formdata);
  }

  register(registerData): Observable<any> 
  {
    return this.http.post('/api/users/register', registerData);
  }

  setToken(res) 
  {
    if (res['success'] == true) 
    {
      localStorage.setItem('access_token', res.accessToken);
    }
  }

  getToken(): string 
  {
    return localStorage.getItem('access_token');
  }

  logout() 
  {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean 
  {
    return (localStorage.getItem('access_token') !== null);
  }

}
