import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor() { }
  
  employeeId: any;

  sendEmpId(value: any) {
    this.employeeId = value;
  }

  getCMSempID(){
    return this.employeeId;
  }
  FAQ:any
  setFaq(value:any){
  this.FAQ=value
  }

  cmsGetData() {
    return [
      this.FAQ
    ];
  }
}
