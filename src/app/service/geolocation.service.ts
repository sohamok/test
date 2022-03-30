import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) {

  }

  baseUrl: string = environment.apiUrl;

  location(location: any): Observable<any> {
   console.log('Attemp To Create Location ::');
   console.log(location);
   return this.http.post<any>(`${this.baseUrl}locationsitehierarchy/create`, location);
 }

 getLocation(): Observable<any> {
  console.log('Attemp To get Location ::');
  return this.http.get<any>(`${this.baseUrl}locationsitehierarchy/list`);
  }

  deleteLocationIndex(location: any, id: any): Observable<any> {
    console.log('Attemp To Delete Location ::');
    // return this.http.post<any>(`${this.baseUrl}location/delete`,location,{params: id} );
    return this.http.post<any>(`${this.baseUrl}location/delete/${id}`, {});
  }

  deleteSiteIndex(id: any): Observable<any> {
    console.log('Attemp To Delete Site ::');
    return this.http.post<any>(`${this.baseUrl}site/delete/${id}`, {});
  }

  deleteHierarchyIndex(id: any): Observable<any> {
    console.log('Attemp To Delete Hierarchy Group ::');
    return this.http.post<any>(`${this.baseUrl}hierarchy/delete/${id}`, {});
  }

  getHierarchyGroup(): Observable<any> {
    console.log('Attemp To get All Hierarchy ::');
    return this.http.get<any>(`${this.baseUrl}hierarchy/list`);
    }
}
