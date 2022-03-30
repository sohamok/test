import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { report } from 'process';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  getReport(): Observable<any> {
    console.log('Attemp To get report ::');
    return this.http.get<any>(`${this.baseUrl}report/list`);
  }

  createReport(report: any): Observable<any> {
    console.log('Attemp To Create Report ::');
    console.log(report);
    return this.http.post<any>(`${this.baseUrl}report/create`, report);
  }

  updateReport(report: any): Observable<any> {
    const rid = report.rid;
    console.log('Attemp To Update Report ::');
    console.log(report);
    return this.http.post<any>(`${this.baseUrl}report/update/` + rid, report);
  }

  deleteReport(id: any): Observable<any> {
    console.log('Attemp To Delete Report ::');
    return this.http.post<any>(`${this.baseUrl}report/delete/${id}`, {});
  }
}
