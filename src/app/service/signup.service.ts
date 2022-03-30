import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {

   }

   baseUrl: string = environment.apiUrl;

   signup(signup: any): Observable<any> {
    console.log('Attemp To Sign up ::');
    console.log(signup);
    return this.http.post<any>(`${this.baseUrl}signup`, signup);
  }
}
