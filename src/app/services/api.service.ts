import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/index";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  headers: any = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("access_token")
  });

  getService(url: String): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.baseUrl + '' + url, { headers: headers, observe: 'response' });
  }

  getServiceWithoutAuth(url: String): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.baseUrl + '' + url, { headers: headers, observe: 'response' });
  }

  DownloadFiles(url: String) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    return this.http.get(this.baseUrl + '' + url, { responseType: 'arraybuffer', headers: headers });
  }

  postService(url: String, data: any): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    return this.http.post(this.baseUrl + '' + url, data, { headers: headers, observe: 'response' });
  }

  putService(url: String, data: any): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    return this.http.put<any>(this.baseUrl + '' + url, data, { headers: headers, observe: 'response' });
  }

  deleteService(url: String, id: number): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("access_token")
    });
    return this.http.delete<any>(this.baseUrl + '' + url + id, { headers: headers, observe: 'response' });
  }

}
