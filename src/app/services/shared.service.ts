import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private SharedComponentDatas = new BehaviorSubject<string>('');
  cast = this.SharedComponentDatas.asObservable();

  constructor() { }

  setStorage(key:any, value:any) {
    sessionStorage.setItem(key, value);
  }
  getStorage(key:any) {
    return sessionStorage.getItem(key);
  }
  localStorageclear() {
    sessionStorage.clear();
    return true;
  }
  localStorageclearItem(key:any) {
    sessionStorage.removeItem(key);
    return true;
  }
}
