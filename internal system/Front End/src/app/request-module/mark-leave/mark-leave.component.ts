import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

declare var angular: any;

@Component({
  selector: 'app-mark-leave',
  templateUrl: './mark-leave.component.html',
  styleUrls: ['./mark-leave.component.css']
})
export class MarkLeaveComponent {
  MarkLeaveForm!: FormGroup;

  user_id: any;
  user_type: any;
  user_name: any;

  constructor(private http: HttpClient,
    private router: Router, private loginservice: LoginServiceService,private formBuilder: FormBuilder) {
    const user = this.loginservice.getData();
    this.user_id = user[0];
    this.user_name = user[1];
    this.user_type = user[2];
  }


  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.MarkLeaveForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      sessionType: ['', Validators.required],
      sessions: ['', Validators.required],
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      appliedNoOfDays: ['', Validators.required],
      reason: ['', Validators.required]
    });
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

    this.http.post('http://localhost:4000/request/markpostLeave', data)
      .subscribe(
        (response: any) => {


          console.log('Data posted successfully:', response);
          if (response.message == "Leave Marked successfully") {
            this.router.navigateByUrl("/unmarkLev");
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
}
