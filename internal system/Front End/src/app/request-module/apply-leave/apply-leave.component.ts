import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    applyTo: new FormControl('', [Validators.required]),
    appliedNoOfDays: new FormControl('', [Validators.required]),
    availableLeaves: new FormControl('', [Validators.required]),
    leavesBorrowed: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  constructor(private http: HttpClient,
    private router: Router) { }


  submit(item: any) {
    console.log(item);
    this.postData(item);
  }

  get() {
    return this.submit
  }


  postData(data: any) {
    // post Data api 
    this.http.post('http://localhost:4000/request/requestLeave', data)
      .subscribe(
        (response: any) => {


          console.log('Data posted successfully:', response);


        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }
}
