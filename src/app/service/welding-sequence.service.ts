import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeldingSequenceService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getWeldingSequence(): Observable<any> {
    console.log('Attemp To get Welding Sequence ::');
    return this.http.get<any>(`${this.baseUrl}/weldingsequence/list`);
  }

  createWeldingSequence(weldingSequence: any): Observable<any> {
    console.log('Attemp To Create Welding Sequence ::');
    console.log(weldingSequence);
    return this.http.post<any>(`${this.baseUrl}weldingsequence/create`, weldingSequence);
  }

  updateWeldingSequence(weldingSequence: any): Observable<any> {
    const ws_id = weldingSequence.ws_id;
    console.log('Attemp To Update Welding Sequence ::');
    console.log(weldingSequence);
    return this.http.post<any>(`${this.baseUrl}weldingsequence/update/` + ws_id, weldingSequence);
  }

  deleteWeldingSequence(id: any): Observable<any> {
    console.log('Attemp To Delete Welding Sequence ::');
    return this.http.post<any>(`${this.baseUrl}weldingsequence/delete/${id}`, {});
  }
}
