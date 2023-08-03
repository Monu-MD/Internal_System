import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ReimbursementserviceService } from 'src/app/services/reimbursementservice.service';

@Component({
  selector: 'app-reim-user-details',
  templateUrl: './reim-user-details.component.html',
  styleUrls: ['./reim-user-details.component.css']
})
export class ReimUserDetailsComponent {
  empid: any;
  empname: any;
  project_id: any;
  emp_access: any;
  remburse_id: any;
  reporting_mgr: any;
  status: any;
  user_remarks: any;
  lodge_date: any;
  amt_payable: any;
  user_id: any;
  user_type: any;
  showRejectInput: any;
  rejectionReason: any;
  notification: any;
  data: any;



  constructor(private http: HttpClient, private router: Router, private loginservice: LoginServiceService, private reimbusmentservice: ReimbursementserviceService) {

    const user = this.loginservice.getData();
    this.user_type = user[2];
    this.user_id = user[0];

    this.data = this.reimbusmentservice.getData()[1];
    console.log(this.data , "data");
    this.empid = this.data .empid;
    this.empname = this.data .empname;
    this.project_id = this.data .project_id;
    this.emp_access = this.data .emp_access;
    this.remburse_id = this.data .remburse_id;
    this.reporting_mgr = this.data .reporting_mgr;
    this.status = this.data .status;
    this.user_remarks = this.data .user_remarks;
    this.lodge_date = this.data .lodge_date;
    this.amt_payable = this.data .amt_payable;


  }
  getdata(data: any) {
    console.log(data);

  }


  data1: any;
  rejectReson: any
  rjt: boolean = false;
  count = 0;

  approveclaim(value: string) {
    console.log(value);


    if (value == 'rej') {
      this.rjt = true
      this.count++;
      console.log(this.count);

      if (this.count > 1) {
        this.data1 = {
          user_type: this.user_type,
          user_id: this.user_id,
          action: value,
          tq: this.data,
          rejectReson: this.rejectReson
          
        }
      }

    } else {
      if (value = 'apr') {

        this.data1 = {
          user_type: this.user_type,
          user_id: this.user_id,
          action: value,
          tq: this.data
        }
      }
    }
    console.log(this.data1);


    if (this.data != undefined) {

      this.http.post('http://localhost:4000/reimbursement/approvee', this.data1).subscribe(
        (response: any) => {
          console.log('API Response:', response);
          this.notification = response.notification

        },
        (error: any) => {
          console.error('API Error:', error);
          // Handle error cases and navigate accordingly
          // this.router.navigate(['/error']);
        }
      );
    }


  }







}
