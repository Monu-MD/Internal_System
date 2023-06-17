import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-leave-details-value',
  templateUrl: './report-leave-details-value.component.html',
  styleUrls: ['./report-leave-details-value.component.css']
})
export class ReportLeaveDetailsValueComponent {

  constructor(private router:Router){}
  
  employeeId:any;
  register=new FormGroup<any>({
    employeeId: new FormControl('', [Validators.required]),
    ReportType:new FormControl(''),
    LeaveType:new FormControl('')

  })
 login(item:any){
    console.log(item);
  
  }

  get(){
    return this.login
  }
}
