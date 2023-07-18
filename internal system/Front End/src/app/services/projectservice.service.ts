import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectserviceService {

  constructor(private http: HttpClient, private router: Router) {
  }

  
  cocdProjectdetails:any;
  setAddProjectdetails(value:any){
    this.cocdProjectdetails=value;
  }

  coustomerviewData: any;
  setcoustomerviewData(value: any) {
    this.coustomerviewData = value; // Assuming project_details[6] contains the data object
    //
  }
  fetchaddPjtAlldetails:any
  setfetchaddPjtAlldetails(value:any){
    this.fetchaddPjtAlldetails=value;
  }
  fetchaddPjtDeAlldetails:any;
  setFetchaddPjtDeAlldetails(value:any){
    this.fetchaddPjtDeAlldetails=value;
  }
  getData() {
    return [this.coustomerviewData,this.cocdProjectdetails, this.fetchaddPjtAlldetails,this.fetchaddPjtDeAlldetails];
  }
}
