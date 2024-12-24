import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '@models/app.model';
import { baseUrl } from '@config/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  login(loginRequset : any) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(baseUrl + `/api/auth/login`, loginRequset);
  }

  register(registerRequset : any) : Observable<AuthResponse>{
    return this.http.post<AuthResponse>(baseUrl + `/api/auth/register`, registerRequset);
  }

  logout() : Observable<AuthResponse>{
    this.logoutLocal();
    return this.http.get<AuthResponse>(baseUrl + `/api/auth/logout`);
  }

  logoutLocal() : void{
    let language = localStorage.getItem('language');
    localStorage.clear();
    if(language) localStorage.setItem('language', language);
    this.router.navigate(['/login']);
  }

  goToForbiddenPage() : void{
    this.router.navigate(['/forbidden']);
  }

}
