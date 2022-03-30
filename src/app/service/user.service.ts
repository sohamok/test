import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getRole(): Observable<any> {
    console.log('Attemp To get Roles ::');
    return this.http.get<any>(`${this.baseUrl}/role/list/`);
  }

  createUser(user: any): Observable<any> {
    console.log('Attemp To Create User ::');
    console.log(user);
    return this.http.post<any>(`${this.baseUrl}user/create`, user);
  }

  getUser(): Observable<any> {
    console.log('Attemp To get User ::');
    return this.http.get<any>(`${this.baseUrl}/user/list`);
  }

  updateUser(user: any): Observable<any> {
    const uid = user.uid;
    console.log('Attemp To Update User ::');
    console.log(user);
    return this.http.post<any>(`${this.baseUrl}user/update/` + uid, user);
  }

  deleteUser(id: any): Observable<any> {
    console.log('Attemp To Delete User ::');
    return this.http.post<any>(`${this.baseUrl}user/delete/${id}`, {});
  }

}
