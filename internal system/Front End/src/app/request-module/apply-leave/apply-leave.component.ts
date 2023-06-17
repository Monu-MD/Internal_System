import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {
  addLeaveForm=new FormGroup<any>({
    sessionType: new FormControl('', [Validators.required]),
    leaveType:new FormControl('', [Validators.required]),
    fromDate:new FormControl('', [Validators.required]),
    applyTo:new FormControl('', [Validators.required]),
    appliedNoOfDays:new FormControl('', [Validators.required]),
    availableLeaves:new FormControl('', [Validators.required]),
    leavesBorrowed:new FormControl('', [Validators.required]),
    description:new FormControl('', [Validators.required])

 })
 submit(item:any){
    console.log(item);
  
  }

  get(){
    return this.submit
  }
}
