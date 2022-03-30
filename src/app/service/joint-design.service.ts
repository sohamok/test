import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JointDesignService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getJointDesign(): Observable<any> {
    console.log('Attemp To get Joint Design ::');
    return this.http.get<any>(`${this.baseUrl}/jointdesign/list`);
  }

  createJointDesign(jointDesign: any): Observable<any> {
    console.log('Attemp To Create Joint Design ::');
    console.log(jointDesign);
    return this.http.post<any>(`${this.baseUrl}jointdesign/create`, jointDesign);
  }

  updateJointDesign(jointDesign: any): Observable<any> {
    const jd_id = jointDesign.jd_id;
    console.log('Attemp To Update Joint Design ::');
    console.log(jointDesign);
    return this.http.post<any>(`${this.baseUrl}jointdesign/update/` + jd_id, jointDesign);
  }

  deleteJointDesign(id: any): Observable<any> {
    console.log('Attemp To Delete Joint Design ::');
    return this.http.post<any>(`${this.baseUrl}jointdesign/delete/${id}`, {});
  }
}
