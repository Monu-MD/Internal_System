import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-un-mark-leave',
  templateUrl: './un-mark-leave.component.html',
  styleUrls: ['./un-mark-leave.component.css']
})
export class UnMarkLeaveComponent {

  unMarkLeaveForm=new FormGroup<any>({
   
    employeeId: new FormControl('', [Validators.required]),
    employeeName: new FormControl('', [Validators.required]),
    leaveType:new FormControl('', [Validators.required]),
    fromDate:new FormControl('', [Validators.required]),
    toDate:new FormControl('', [Validators.required]),
    applyTo:new FormControl('', [Validators.required]),
    appliedNoOfDays:new FormControl('', [Validators.required]),
    availableLeaves:new FormControl('', [Validators.required]),
    leavesBorrowed:new FormControl('', [Validators.required]),
    reason:new FormControl('', [Validators.required]),
    remarks:new FormControl('', [Validators.required])
 })
 submit(item:any){
    console.log(item);
  }

  get(){
    return this.submit
  }
}
