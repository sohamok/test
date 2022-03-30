import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  baseUrl: string = environment.apiUrl;

  login(login: any): Observable<any> {
   console.log('Attemp To Log in ::');
   console.log(login);
   return this.http.post<any>(`${this.baseUrl}login`, login);
 }

 loginAdmin(login: any): Observable<any> {
  console.log('Attemp To Admin Log in ::');
  console.log(login);
  return this.http.post<any>(`${this.baseUrl}loginadmin`, login);
}
}
