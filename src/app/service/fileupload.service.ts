import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http: HttpClient) {

  }

  baseUrl: string = environment.apiUrl;

  uploadFile(file: File, filename): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', filename);
    // formData.append('imageDesc',file.name);
  //   const header = new HttpHeaders();
  //   const params = new HttpParams();

  //   const options = {
  //     params,
  //     reportProgress: true,
  //     headers: header
  //   };
  //   const req = new HttpRequest('POST', apiUrl, formData, options);
  //   return this.http.request(req);
  // }
      console.log('Attemp To Upload File ::');
      console.log(file);
      return this.http.post<any>(`${this.baseUrl}upload/${filename}`, formData);
  }


  uploadazureFile(file: File, filename): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', filename);
    console.log('Attemp To Upload azure File ::');
    console.log(file);
    return this.http.post<any>(`${this.baseUrl}azureupload/${filename}`, formData);
  }

  createURL(url: string): Observable<Blob> {
    console.log(url);
    const params = new HttpParams().append('filepath', url);
    return this.http.get(`${this.baseUrl}download`, { responseType: 'blob', params});
  }

}
