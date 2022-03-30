import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShieldingGasService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getShieldingGas(): Observable<any> {
    console.log('Attemp To get Shielding Gas ::');
    return this.http.get<any>(`${this.baseUrl}/shieldinggas/list`);
  }

  createShieldingGas(shieldingGas: any): Observable<any> {
    console.log('Attemp To Create ShieldingGas ::');
    console.log(shieldingGas);
    return this.http.post<any>(`${this.baseUrl}shieldinggas/create`, shieldingGas);
  }

  updateShieldingGas(shieldingGas: any): Observable<any> {
    const sg_id = shieldingGas.sg_id;
    console.log('Attemp To Update shieldingGas ::');
    console.log(shieldingGas);
    return this.http.post<any>(`${this.baseUrl}shieldinggas/update/` + sg_id, shieldingGas);
  }

  deleteShieldingGas(id: any): Observable<any> {
    console.log('Attemp To Delete shieldingGas ::');
    return this.http.post<any>(`${this.baseUrl}shieldinggas/delete/${id}`, {});
  }
}
