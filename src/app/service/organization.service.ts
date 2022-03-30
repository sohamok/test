import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getOrganization(): Observable<any> {
    console.log('Attemp To get orgs ::');
    return this.http.get<any>(`${this.baseUrl}organization/list`);
  }

  createOrganization(org: any): Observable<any> {
    console.log('Attemp To Create Organization ::');
    console.log(org);
    return this.http.post<any>(`${this.baseUrl}organization/create`, org);
  }

  updateOrganization(org: any): Observable<any> {
    const orgid = org.orgid;
    console.log('Attemp To Update Organization ::');
    console.log(org);
    return this.http.post<any>(`${this.baseUrl}organization/update/` + orgid, org);
  }

  deleteOrganization(id: any): Observable<any> {
    console.log('Attemp To Delete Organization ::');
    return this.http.post<any>(`${this.baseUrl}organization/delete/${id}`, {});
  }
}
