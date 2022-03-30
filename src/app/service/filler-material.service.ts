import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FillerMaterialService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getFillerMaterial(): Observable<any> {
    console.log('Attemp To get Filler Material ::');
    return this.http.get<any>(`${this.baseUrl}fillermaterial/list`);
  }

  createFillerMaterial(fillerMaterial: any): Observable<any> {
    console.log('Attemp To Create Filler Material ::');
    console.log(fillerMaterial);
    return this.http.post<any>(`${this.baseUrl}fillermaterial/create`, fillerMaterial);
  }

  updateFillerMaterial(fillerMaterial: any): Observable<any> {
    const fm_id = fillerMaterial.fm_id;
    console.log('Attemp To Update Filler Material ::');
    console.log(fillerMaterial);
    return this.http.post<any>(`${this.baseUrl}fillermaterial/update/` + fm_id, fillerMaterial);
  }

  deleteFillerMaterial(id: any): Observable<any> {
    console.log('Attemp To Delete Filler Material ::');
    return this.http.post<any>(`${this.baseUrl}fillermaterial/delete/${id}`, {});
  }

}
