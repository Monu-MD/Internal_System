import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementserviceService {

  fetchaddRemDeAlldetails: any;
  reimbusrowData: any;
  reqdata: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  setfetchaddRemDeAlldetails(value: any) {
    this.fetchaddRemDeAlldetails = value;
  }


  setFetchaddRemDeAlldetails(value: any) {
    this.fetchaddRemDeAlldetails = value;
  }

  setremuserdetails(value:any){
    this.reimbusrowData =value;
     
  }
  setreqdata(value:any){
    this.reqdata=value;
  }



  getData() {
    return [
      this.fetchaddRemDeAlldetails,
      this.reimbusrowData,
      this.reqdata,
    ];
  }
}
