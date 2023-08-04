import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit{

  addLeaveForm!: FormGroup;


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
    this.fetchData();
  }

  initializeForm() {
    this.addLeaveForm = this.formBuilder.group({
      sessionType: ['', Validators.required],
      sessions: [''],
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      appliedNoOfDays: [null, [Validators.required, this.notNullValidator]],
      description: ['', Validators.required],
    });
  }

  notNullValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === null) {
      return { notNull: true };
    }
    return null;
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


  leave_type:any;
  fetchData() {
    this.http.get('http://localhost:4000/holiday/cocd').subscribe(
      (response: any) => {
        console.log(response.data);
        this.leave_type=response.data.leave_type;
       
  
        
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
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
