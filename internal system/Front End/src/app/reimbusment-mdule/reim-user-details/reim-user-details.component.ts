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

 

  constructor(private http: HttpClient, private router: Router, private loginservice: LoginServiceService, private reimbusmentservice: ReimbursementserviceService) {

    const user = this.loginservice.getData();
    this.user_type = user[2];
    this.user_id = user[0];

    const data = this.reimbusmentservice.getData()[1];
    console.log(data, "data");
    this.empid = data.empid;
    this.empname = data.empname;
    this.project_id = data.project_id;
    this.emp_access = data.emp_access;
    this.remburse_id = data.remburse_id;
    this.reporting_mgr = data.reporting_mgr;
    this.status = data.status;
    this.user_remarks = data.user_remarks;
    this.lodge_date = data.lodge_date;
    this.amt_payable = data.amt_payable;




  }
  getdata(value: any) {
  }


  approveProfile() {




    
  }

  openRejectInput() {

    this.showRejectInput = true;
    this.rejectionReason = '';

  }


  openDeleteInput() {

  }
  rejectProfile() {

  }



}
