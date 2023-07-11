import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddemployeeserviceService } from 'src/app/services/addemployeeservice.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-emp-professional-details',
  templateUrl: './emp-professional-details.component.html',
  styleUrls: ['./emp-professional-details.component.css']
})
export class EmpProfessionalDetailsComponent {

  user_type: any;
  cocd: any;
  comm_code_curr: any;
  comm_code_class: any;
  comm_code_rpt: any;
  comm_code_dsg: any;
  constructor(private empdet: AddemployeeserviceService, private router: Router,
    private http: HttpClient,
    private loginSerivce: LoginServiceService) {


    const user = this.loginSerivce.getData();
    this.user_type = user[2];

    const data = this.loginSerivce.getData();
    this.cocd = data[10];
    console.log(this.cocd);

    this.comm_code_curr = this.cocd.comm_code_curr;
    this.comm_code_class = this.cocd.comm_code_class;
    this.comm_code_rpt = this.cocd.comm_code_rpt;
    this.comm_code_dsg = this.cocd.comm_code_dsg;



  }
  probation_Period = '';
  previous_Experience = '';
  add_Employee_Profile = new FormGroup<any>({

    employeeId: new FormControl('', [Validators.required]),
    employeeName: new FormControl(''),
    emp_acess: new FormControl(''),
    designation: new FormControl(''),
    joiningDate: new FormControl(''),
    email_ID: new FormControl(''),
    Salary: new FormControl(''),
    pid: new FormControl(''),
    rptMgr: new FormControl(''),
    empClass: new FormControl(''),
    sal_curr: new FormControl(''),
    rcreusedid: new FormControl(''),

    probation_Period: new FormControl(''),
    previous_Experience: new FormControl(''),


    years: new FormControl(''),
    month: new FormControl(''),
    previous_Employer_One: new FormControl(''),
    previous_Employer_Two: new FormControl(''),
    previous_Employer_Three: new FormControl(''),
    previous_Employer_Four: new FormControl(''),
    previous_Employer_Five: new FormControl('')

  })

  addEmployeeProfile(item: any) {
    console.log(item);
    if (this.user_type == 'A1') {
      this.addProfile(item)
    }
  }
  addProfile(data: any): void {
    const curr = data.sal_curr;
    const empclas = data.emp_acess;
    const rptmgr=data.rptMgr;
    const designation=data.designation

    for (let i = 0; i < this.comm_code_curr.length; i++) {
      if (this.comm_code_curr[i].comm_code_desc === curr) {
        data.sal_curr = this.comm_code_curr[i].comm_code_id;

        break;
      }
    }
    for (let i = 0; i < this.comm_code_dsg.length; i++) {
      if (this.comm_code_dsg[i].comm_code_desc === designation) {
        data.designation = this.comm_code_dsg[i].comm_code_id;

        break;
      }
    }
    for (let i = 0; i < this.comm_code_rpt.length; i++) {
      if (this.comm_code_rpt[i].comm_code_desc === rptmgr) {
        data.rptMgr = this.comm_code_rpt[i].comm_code_id;

        break;
      }
    }
    for (let i = 0; i < this.comm_code_class.length; i++) {
      if (this.comm_code_class[i].comm_code_desc === empclas) {
        data.emp_acess = this.comm_code_class[i].comm_code_id;

        break;
      }
    }
    console.log(data);
    
    this.http.post('http://localhost:4000/employeeDetails/addempdet', data).subscribe(
      (response: any) => {

        console.log(response.message);
        console.log(response.notification);



        if (response.message == 'redirect to PersonalDetails') {
          this.router.navigate(['/empProfessional'])

        }

      },
      (error: any) => {
        console.error('API Error:', error);
        // Handle error cases and navigate accordingly
        // this.router.navigate(['/error']);
      }
    );
  }

  get employeeId() {
    return this.add_Employee_Profile.get('employeeId')
  }

}

