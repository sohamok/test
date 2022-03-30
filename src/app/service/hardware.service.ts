import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  constructor(private http: HttpClient) { }

  
  baseUrl: string = environment.apiUrl;

  getHardware(): Observable<any> {
    console.log('Attemp To get hardware ::');
    return this.http.get<any>(`${this.baseUrl}/hardware/list`);
  }

  getAvailableHardware(): Observable<any> {
    console.log('Attemp To get available hardware ::');
    return this.http.get<any>(`${this.baseUrl}availablehardware/list`);
  }

  getHardwareByOrg(): Observable<any> {
    console.log('Attemp To get hardwares by org ::');
    return this.http.get<any>(`${this.baseUrl}hardwarebyorg/list`);
  }


  createHardware(hardware: any): Observable<any> {
    console.log('Attemp To Create Filler Material ::');
    console.log(hardware);
    return this.http.post<any>(`${this.baseUrl}hardware/create`, hardware);
  }

  updateHardware(hardware: any): Observable<any> {
    const hwid = hardware.hwid;
    console.log('Attemp To Update Filler Material ::');
    console.log(hardware);
    return this.http.post<any>(`${this.baseUrl}hardware/update/` + hwid, hardware);
  }

  deleteHardware(id: any): Observable<any> {
    console.log('Attemp To Delete Filler Material ::');
    return this.http.post<any>(`${this.baseUrl}hardware/delete/${id}`, {});
  }
}
