import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  sendLink(body:any): Observable<any> {
    console.log('Attemp To send link ::');
    console.log(body);
    return this.http.post(`${this.baseUrl}reqresetpass`, body);
  }

  sendAdminLink(body:any): Observable<any> {
    console.log('Attemp To send Admin link ::');
    console.log(body);
    return this.http.post(`${this.baseUrl}reqadminresetpass`, body);
  }

  validateToken(validToken: any): Observable<any> {
    console.log('Attemp To validate token ::');
    console.log(validToken);
    return this.http.post<any>(`${this.baseUrl}tokenpass`, validToken);
  }

  resetPassword(validToken: any,resetValue:any): Observable<any> {
    const uid = validToken.uid;
    console.log('Attemp To reset password ::');
    
    return this.http.post<any>(`${this.baseUrl}resetpass/` + uid, resetValue);
  }

 
}
