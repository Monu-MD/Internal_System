import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {

  addLeaveForm = new FormGroup<any>({
    sessionType: new FormControl('', [Validators.required]),
    leaveType: new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    mangername: new FormControl('', [Validators.required]),
    appliedNoOfDays: new FormControl('', [Validators.required]),
    availableLeaves: new FormControl('', [Validators.required]),
    availedLevs: new FormControl('', [Validators.required]),
  })

  user_id: any;
  user_type: any;
  user_name: any;
  constructor(private http: HttpClient,
    private router: Router, private loginservice: LoginServiceService) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_name = user[1];
    this.user_type = user[2];
  }


  submit(item: any) {
    console.log(item);
    const data = {
      user_id: this.user_id,
      user_name: this.user_name,
      item: item
    }
    this.postData(data);
  }

  get() {
    return this.submit
  }


  postData(data: any) {
    // post Data api 
    console.log("post enterd");

    this.http.post('http://localhost:4000/request/applyLeave', data)
      .subscribe(
        (response: any) => {


          console.log('Data posted successfully:', response);
          if (response.message == "Leave request submitted successfully") {
            this.router.navigateByUrl("/viewLev");
          }
          else {

          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
}
