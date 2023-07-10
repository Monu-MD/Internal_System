import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectserviceService {

  constructor(private http:HttpClient,private router:Router) { 
  


  }

  project_det:any;
  setData(value: any) {
    this.project_det = value; // Assuming project_details[6] contains the data object
     //
   }
   getEmpDet(){
     return [this.project_det];
   }
  
}
