import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ReimbursementserviceService } from 'src/app/services/reimbursementservice.service';

@Component({
  selector: 'app-initiate-rem',
  templateUrl: './initiate-rem.component.html',
  styleUrls: ['./initiate-rem.component.css']
})
export class InitiateRemComponent {

  financemgrname: any
  user_id: any;
  notification: any;
  user_access: any;
  loginservice: any;
  defProjectId: any;
  Manager_name: any;
  emp_id: any;
  emp_name: any;
  pid: any[] = [];
  Manager_id: any;
  item: any = {}; 

  constructor(private http: HttpClient, loginservice: LoginServiceService, private reimbusmentservice: ReimbursementserviceService) {
    const data = this.reimbusmentservice.getData()[0];
    this.pid = [{ project_id: data.project_id }];
    this.emp_name = data.emp_name;
    this.emp_id = data.emp_id;
    this.defProjectId = data.defProjectId;
    // this.Manager_name = data.Manager_name;
    this.Manager_id = data.Manager_id;  
    this.financemgrname = data.financemgrname;


    console.log(this.Manager_id, "managerid");
  }

  initiaterem = new FormGroup<any>({
    emp_id: new FormControl(''),
    Manager_id: new FormControl(''),
    project_id: new FormControl(''),
    emp_name: new FormControl(''),
    defProjectId: new FormControl(''),
    Manager_name: new FormControl(''),
    totalAmount: new FormControl(''),
    remarks: new FormControl(''),
    BillDate: new FormControl(''),
    BillId: new FormControl(''),
    NatureofExpenses: new FormControl(''),
    Description: new FormControl(''),
    BillAmount: new FormControl(''),
  });

  Submit() {
    this.initiateRem(this.item);
  }

  initiateRem(item: any) {
    const allItems = {
      user_id: this.emp_id,
      item: item,
      test: 'Submit'
    };
    this.initiateremsdata(allItems);
    console.log(allItems, "allItems");
  }

  initiateremsdata(allItems: any) {
    console.log(allItems, "api");
    this.http.post('http://localhost:4000/reimbursement/rembReq', allItems)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.notification = response.notification;
        },
        error => {
          console.error(error);
          // alert('enter valid details ');
        }
      );
  }

}
