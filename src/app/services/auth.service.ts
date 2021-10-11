import { Message } from './../inbox/inbox.model';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';


// const OAUTH_CLIENT = 'clientid';
// const OAUTH_SECRET = 'clientsecret';


// @Injectable({
//   providedIn: 'root'
// })

// export class AuthService {

//   private baseUrl = environment.baseUrl
//   private authUrl = environment.authUrl

//   constructor(
//     private http: HttpClient,
//     public router: Router,
//   ) { }

//   getService(url:String) : Observable<HttpResponse<any>> {
//     return this.http.get<any>(this.baseUrl +''+ url,{ observe: 'response' });

//   }

//   postService(url:String,data: any): Observable<HttpResponse<any>> {
//     return this.http.post(this.baseUrl+''+url,data,{ observe: 'response' });
//   }

//   // signUp(user: User): Observable<any> {
//   //   let api = this.baseUrl+'register-user';
//   //   return this.http.post(api, user)
//   //     .pipe(
//   //       catchError(this.handleError)
//   //     )
//   // }


//   signIn(user: any) {
//     let header = new HttpHeaders({
//       'Authorization': 'Basic '+btoa("clientid:clientsecret"),
//       'Content-Type': 'application/x-www-form-urlencoded'
//     });
//     let credentials='username=' +user.username  + '&password=' + user.password +'&grant_type=password'; 
//     return this.http.post<any>(this.authUrl,credentials,{ headers : header, observe: 'response' });
//   }

//   registerUser(user: any) {
//     return this.http.post<any>(this.baseUrl+'user/registration', user,{observe:'response'});
//   }

//   forget(forget:any):Observable<HttpResponse<any>>{ 
//     let credentials='param1=' +forget.username  + '&param2=' + forget.mobile; 
//     return this.http.get(this.baseUrl+'user/forgetPassward?'+credentials, {observe: 'response'})

//   }

//   change(forget:any, token:any): Observable<HttpResponse<any>>{ 
//     let headers = new HttpHeaders({
//       'token':token
//     });
//     return this.http.post(this.baseUrl+'user/resetPassward', forget, {headers: headers, observe: 'response'})
//   }

//   verifiedOtp(user:any) {
//     return this.http.post(this.baseUrl+'user/verifiedOtp', user, {observe:'response'})
//   }

//   saveToken(token:any){
//     localStorage.setItem("access_token", token.access_token);
//     this.router.navigate(['/component']);
//   }

//   getToken() {
//     return localStorage.getItem("access_token");
//   }

//   isLoggedIn(): boolean {
//     const token = this.getToken();
//     return token != 'null';
//   }

//   DownloadFiles(url:String) 
//   {
//     return this.http.get(this.baseUrl +''+ url,{responseType: 'arraybuffer'});
//   }

// }
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import { User } from '../models';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { ToastyService } from 'ng2-toasty';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage.service';
import { el } from 'date-fns/locale';
// import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthsService {
  private baseUrl = environment.baseUrl
  private _user: any;
  public message: string = "somethiong went wrong"
  private _currentUserSubject = new Subject<any>()
  userChanges = this._currentUserSubject.asObservable()

  constructor(
    private http: HttpClient,
    private toasty: ToastrService,
    private ngxLoader: NgxUiLoaderService,
    private store: LocalStorageService
  ) {
  }
  getHeader() {
    let token = this.store.getItem('token');

    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token
      })
    }
    return header

  }
  setUser(user: any) {
    if (user) {
      this.store.setItem('token', user.jwtToken);
    } else {
      this.store.clear();
    }
    this._user = user;
    this._currentUserSubject.next(user);
  }
  setToken(token: string) {
    if (token) {
      this.store.setItem('token', token);
    } else {
      this.store.clear();
    }
    // this._user = user;
    // this._currentUserSubject.next(user);
  }

  currentUser(): any {
    // if (this._user) {
    this._user = this.store.getObject('userData');

    return this._user
    // }
    // else{
    //   this.store.clear();
    // }

  }

  oauth(model): Observable<any[]> {
    // const formData = new FormData();
    // let header = new HttpHeaders({
    //   'Authorization': 'Basic ' + btoa(model.Username + ':' + model.Password),
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });
    // let credentials = 'username=' + model.Username + '&password=' + model.Password + '&grant_type=client_credentials';
    let body = new URLSearchParams();
    // const params = new HttpParams({
    //   fromObject: {
    //     grant_type: 'client_credentials',
    //     // username: user,
    //     // password: password,
    //     // scope: 'if no scope just delete this line',
    //   }
    // });
    body.set('grant_type', 'client_credentials');
    // formData.append("grant_type", "client_credentials");
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa(model.c + ':' + model.Password));
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers = headers.append('cache-control', 'no-cache');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(model.Username + ':' + model.Password)
      })
    };
    // const headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(model.Username + ':' + model.Password) });
    this.ngxLoader.start();
    const subject = new Subject<any[]>();
    this.http.post(`${this.baseUrl}/oauth/token`, body.toString(), httpOptions).subscribe((responseData: any) => {
      this.ngxLoader.stop();
      // this.message = "login Successfully"
      // this.toasty.success(this.message);
      const dataModel = responseData
      this.setToken(dataModel.access_token)
      subject.next(dataModel.response);
    },
      (error) => {
        this.ngxLoader.stop();
        if (error.status !== 0) {
          this.message = error.error.response || error.error.error
        }
        this.toasty.error(this.message);
        // subject.next(error.error);
      });
    return subject.asObservable();
  }
  login(model): Observable<any[]> {
    this.ngxLoader.start();
    let token = this.store.getItem('token');
    let body = new URLSearchParams();
    body.set('username', model.username);
    body.set('password', model.password);
    body.set('grant_type', 'password');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('Truckee-Service' + ':' + 'Truckee-Service')
      })
    };
    const subject = new Subject<any[]>();
    this.http.post(`${this.baseUrl}/oauth/token`, body.toString(), httpOptions).subscribe((responseData: any) => {
      this.ngxLoader.stop();
      this.message = "login Successfully"
      this.toasty.success(this.message);
      const dataModel = responseData
      // this.setUser(dataModel.response)
      subject.next(dataModel.response);
    },
      (error) => {
        this.ngxLoader.stop();
        if (error.status !== 0) {
          this.message = error.error.response || error.error.error
        }
        this.toasty.error(this.message);
        // subject.next(error.error);
      });
    return subject.asObservable();
  }

  otpVerify(code: string, email: string): Observable<any[]> {
    let token = this.store.getItem('token');
    this.ngxLoader.start();
    const subject = new Subject<any[]>();
    this.http.get(`${this.baseUrl}/user/v1/verify/${code}?username=${email}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token
      })
    }).subscribe((responseData: any) => {
      this.ngxLoader.stop();
      this.message = "otp Verify Successfully"
      this.toasty.success(this.message);
      const dataModel = responseData
      this.setUser(dataModel.response)
      subject.next(dataModel.response);
    },
      (error) => {
        this.ngxLoader.stop();
        if (error.status !== 0) {
          this.message = error.error.response || error.error.error
        }
        this.toasty.error(this.message);
        // subject.next(error.error);
      });
    return subject.asObservable();
  }
  signUp(model): Observable<any[]> {
    this.ngxLoader.start();
    const subject = new Subject<any[]>();
    this.http.post(`${this.baseUrl}/user/v1/register`, model, this.getHeader()).subscribe((responseData: any) => {
      this.ngxLoader.stop();
      const dataModel = responseData
      subject.next(responseData.response);
    },
      (error) => {
        this.ngxLoader.stop();
        if (error.status !== 0) {
          this.message = error.error.response || error.error.error
        }
        this.toasty.error(this.message);
        // subject.next(error.error);
      });
    return subject.asObservable();
  }

  forgotPassword(email): Observable<any[]> {
    let token = this.store.getItem('token');
    // this.ngxLoader.start();
    const subject = new Subject<any[]>();
    this.http.get(`${this.baseUrl}/user/v1/forgot-password?username=${email}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token

      })
    }).subscribe((responseData: any) => {
      this.ngxLoader.stop();
      const dataModel = responseData
      this.toasty.success(responseData.response);
      subject.next(responseData.response);
    },
      (error) => {
        this.ngxLoader.stop();
        if (error.status !== 0) {
          this.message = error.error.response || error.error.error
        }
        this.toasty.error(this.message);
        // subject.next(error.error);
      });
    return subject.asObservable();
  }
  resetPassword(code, password): Observable<any[]> {
    let token = this.store.getItem('token');
    this.ngxLoader.start();
    const subject = new Subject<any[]>();
    this.http.get(`${this.baseUrl}/user/v1/reset-password/${code}?password=${password}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token

      })
    }).subscribe((responseData: any) => {
      this.ngxLoader.stop();
      const dataModel = responseData
      this.toasty.success('Password Reset Successfully');
      subject.next(dataModel.response);
    },
      (error) => {
        this.ngxLoader.stop();
        if (error.status !== 0) {
          this.message = error.error.response || error.error.error
        }
        this.toasty.error(this.message);
        // subject.next(error.error);
      });
    return subject.asObservable();
  }



}
