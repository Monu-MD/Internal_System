import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent {

  approveLeaveForm=new FormGroup<any>({
    employeeId: new FormControl('', [Validators.required]),
    employeeName: new FormControl('', [Validators.required]),
    leaveType:new FormControl('', [Validators.required]),
    appliedNoOfDays:new FormControl('', [Validators.required]),
    fromDate:new FormControl('', [Validators.required]),
    toDate:new FormControl('', [Validators.required]),
    reason:new FormControl('', [Validators.required])

 })
 submit(item:any){
    console.log(item);
  }

  get(){
    return this.submit
  }
}
