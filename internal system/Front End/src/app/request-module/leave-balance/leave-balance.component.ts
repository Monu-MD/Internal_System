import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent {


  user_id: any;
  user_access: any;
  userData: any;
  year:any;

  leaveBalanceForm = new FormGroup({
    empname: new FormControl('', [Validators.required]),
    leaveType: new FormControl('', [Validators.required]),
    available_leaves: new FormControl('', [Validators.required]),
    aviledleaves: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_access = user[2];
  }

  ngOnInit(): void {
    this.leaveBalanceForm.get('leaveType')?.valueChanges.subscribe((selectedLeaveType: string | null) => {
      if (selectedLeaveType !== null) {
        this.fetchData(this.user_id, selectedLeaveType);
      }
    });
  }

  fetchData(user_id: any, selectedLeaveType: string): void {
    const userinfo = {
      user_id: user_id.toString(),
      leave_type: selectedLeaveType
    };
  
    console.log(userinfo);

    this.http.post('http://localhost:4000/viewrequest/levBalance', { userinfo })
      .subscribe(
        (response: any) => {
          console.log(response.Data);
          this.userData = response.Data;
          this.year = response.Data.year;
          this.updateFormFields();
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  updateFormFields(): void {
    this.leaveBalanceForm.patchValue({
      // empname: this.userData.empname,
      available_leaves: this.userData.available_leaves,
      aviledleaves: this.userData.availed_Lev
    });
  }

  submit(item: any): void {
    console.log(item);
  }

}
