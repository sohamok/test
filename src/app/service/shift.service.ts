import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getShift(): Observable<any> {
    console.log('Attemp To get shift details ::');
    return this.http.get<any>(`${this.baseUrl}shift/list`);
  }

  createShift(shift: any): Observable<any> {
    console.log('Attemp To Create new shift ::');
    console.log(shift);
    return this.http.post<any>(`${this.baseUrl}shift/create`, shift);
  }

  updateShift(shift: any): Observable<any> {
    const shid = shift.shid;
    console.log('Attemp To Update Shift ::');
    console.log(shift);
    return this.http.post<any>(`${this.baseUrl}shift/update/` + shid, shift);
  }

  deleteShift(id: any): Observable<any> {
    console.log('Attemp To Delete Shift ::');
    return this.http.post<any>(`${this.baseUrl}shift/delete/${id}`, {});
  }
}
