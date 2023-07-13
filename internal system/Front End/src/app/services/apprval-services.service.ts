import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApprvalServicesService {

  constructor() { }
  professionalDetail:any;
  personalDetail:any;


  setprofessionalDetail(value:any){
    this.professionalDetail=value;
  }

 setpersonalDetail (value:any){
    this.personalDetail=value;
  }

  getapprovalview(){
   
    
    return[this.personalDetail,this.professionalDetail]
  }

}
