import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeldingMaterialService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getWeldingMaterial(): Observable<any> {
    console.log('Attemp To get Welding Material ::');
    return this.http.get<any>(`${this.baseUrl}/weldingmaterial/list`);
  }

  createWeldingMaterial(weldingMaterial: any): Observable<any> {
    console.log('Attemp To Create Welding Material ::');
    console.log(weldingMaterial);
    return this.http.post<any>(`${this.baseUrl}weldingmaterial/create`, weldingMaterial);
  }

  updateWeldingMaterial(weldingMaterial: any): Observable<any> {
    const wm_id = weldingMaterial.wm_id;
    console.log('Attemp To Update Welding Material ::');
    console.log(weldingMaterial);
    return this.http.post<any>(`${this.baseUrl}weldingmaterial/update/` + wm_id, weldingMaterial);
  }

  deleteWeldingMaterial(id: any): Observable<any> {
    console.log('Attemp To Delete Welding Material ::');
    return this.http.post<any>(`${this.baseUrl}weldingmaterial/delete/${id}`, {});
  }
}
