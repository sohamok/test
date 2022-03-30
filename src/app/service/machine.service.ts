import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.apiUrl;

  // getHierarchy(): Observable<any> {
  //   console.log('Attemp To get Hierarchy ::');
  //   return this.http.get<any>(`${this.baseUrl}/hierarchy/list`);
  // }

  // getConfig() :Observable<any> {
  //   console.log('Attemp To get Config ::');
  //   return this.http.get<any>(`${this.baseUrl}/config/list/`);
  // }

// *******************************     Machines **********************************

  getMachineStatus(): Observable<any> {
    console.log('Attemp To get Machine Status ::');
    return this.http.get<any>(`${this.baseUrl}/machinestatus/list/`);
  }

  getMachiineType(): Observable<any> {
    console.log('Attemp To get Machine Type ::');
    return this.http.get<any>(`${this.baseUrl}/machinetype/list/`);
  }

  getMachines(): Observable<any> {
    console.log('Attemp To get Hierarchy ::');
    return this.http.get<any>(`${this.baseUrl}/machine/list`);
  }

  createMachine(machine: any): Observable<any> {
    console.log('Attemp To Create Machine ::');
    console.log(machine);
    return this.http.post<any>(`${this.baseUrl}machine/create`, machine);
  }

  updateMachine(machine: any): Observable<any> {
    const mid = machine.mid;
    console.log('Attemp To Update Machine ::');
    console.log(machine);
    return this.http.post<any>(`${this.baseUrl}machine/update/` + mid, machine);
  }

  deleteMachine(id: any): Observable<any> {
    console.log('Attemp To Delete Machine ::');
    return this.http.post<any>(`${this.baseUrl}machine/delete/${id}`, {});
  }

// ************************  Machine Configurations *****************************
  getMachineConfig(): Observable<any> {
    console.log('Attemp To Create Machine Config ::');
    return this.http.get<any>(`${this.baseUrl}config/list`);
  }

  createMachineConfig(config): Observable<any> {
    console.log('Attemp To Create Machine Config ::');
    return this.http.post<any>(`${this.baseUrl}config/create`, config);
  }

  updateMachineConfig(config): Observable<any> {
    const mcid = config.mcid;
    console.log('Attemp To Update Machine Config ::');
    return this.http.post<any>(`${this.baseUrl}config/update/${mcid}`, config);
  }

  deleteMachineConfig(id: any): Observable<any> {
    console.log('Attemp To Delete Config ::');
    return this.http.post<any>(`${this.baseUrl}config/delete/${id}`, {});
  }


  // ************************  Machine details & Thresholds *****************************

  getMachineThreshold(): Observable<any> {
    console.log('Attemp To get Machine wise Threshold ::');
    return this.http.get<any>(`${this.baseUrl}/config/listbymachine`);
  }

  updateMachineThreshold(data): Observable<any> {
    console.log('Attemp To Update Machine Threshold ::');
    return this.http.post<any>(`${this.baseUrl}config/updatebyhardware`, data);
  }


  // ************************  Machine Component Spec. *****************************
  getComponent(): Observable<any> {
    console.log('Attemp To get Component ::');
    return this.http.get<any>(`${this.baseUrl}/component/list`);
  }

  createMachineComSpec(spec): Observable<any> {
    console.log('Attemp To Create Machine Com Spec ::');
    return this.http.post<any>(`${this.baseUrl}component/create`, spec);
  }

  updateMachineComSpec(spec): Observable<any> {
    const mcsid = spec.mcsid;
    console.log('Attemp To Update Machine Com Spec ::');
    return this.http.post<any>(`${this.baseUrl}component/update/${mcsid}`, spec);
  }

  deleteMachineComSpec(id: any): Observable<any> {
    console.log('Attemp To Delete Machine Com Spec ::');
    return this.http.post<any>(`${this.baseUrl}component/delete/${id}`, {});
  }

  createComponentTracking(contacttip: any): Observable<any> {
    console.log('Attemp To refill components ::');
    console.log(contacttip);
    return this.http.post<any>(`${this.baseUrl}componenttracking/create`, contacttip);
  }

  getComponentTracking(): Observable<any> {
   console.log('Attemp To get Component remainings ::');
   return this.http.get<any>(`${this.baseUrl}componenttracking/list`);
   }







}
