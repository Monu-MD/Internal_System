import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CmsService } from 'src/app/services/cms.service';
import { EmpdetaislService } from 'src/app/services/employeeDetails/empdetaisl.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

interface EmployeeDocument {
  govDocs: string[];
  govLen: number;
  eduDocs: string[];
  eduLen: number;
  medDocs: string[];
  medLen: number;
  expDocs: string[];
  expLen: number;
  phDocs: string[];
  phLen: number;
  resDocs: string[];
  resLen: number;
  othrDocs: string[];
  othrLen: number;
  hrDocs: string[];
  hrLen: number;
  cerDocs: string[];
  cerLen: number;
  bgDocs: string[];
  bgLen: number;

  eid: string;
  ename: string;
  emp_access: string;
}

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent {
  user_type: any;
  user_id: any;

  employeeData: EmployeeDocument | undefined;
  employeeId: any;

  constructor(private service: CmsService, private loginSerivce: LoginServiceService, private http: HttpClient,
    private router: Router) {
    const user = this.loginSerivce.getData();
    this.user_type = user[2];
    this.user_id = user[0];
  }

  searchEmpolyeeDetailsForm = new FormGroup<any>({
    employeeId: new FormControl('', [Validators.required])
  })

  onSubmit(item: any) {
    console.log("On Item employeeID: " + item.employeeId);
    if (item != null) {
      this.service.sendEmpId(item.employeeId)
      this.router.navigateByUrl("/viewDocs");
    }
  

  }
  
}