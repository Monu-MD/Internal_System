import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheServiceService {

  customerName='yashu';

  constructor() { }
  get(key: string): any {




    return this.customerName;

    // const data = localStorage.getItem(key);
    // if (data) {
    //   return JSON.parse(data);
    // }
    // return null;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
