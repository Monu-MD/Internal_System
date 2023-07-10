import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpdetaislService {

  constructor(private http: HttpClient, private router: Router) { }
 
emp_det:any;
  setData(value: any) {
   this.emp_det = value; // Assuming emp_details[4] contains the data object
    //
  }
  getEmpDet(){
    return [this.emp_det];
  }
}
