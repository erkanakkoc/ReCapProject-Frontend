import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() { 
    this.localStorage = window.localStorage;
  }

  get(value:string){
    var result = this.localStorage.getItem(value);
    if (result) {
      return result
    }else{
      return undefined
    }
  }

  set(key: string, value: string){
    this.localStorage.setItem(key,value);
  }

  remove(key: string){
    this.localStorage.removeItem(key);
  }

  clean(){
    this.localStorage.clear();
  }
}
