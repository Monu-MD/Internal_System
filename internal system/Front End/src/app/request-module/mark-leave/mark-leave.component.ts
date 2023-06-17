import { Component } from '@angular/core';
import{FormGroup,ReactiveFormsModule,FormControl,FormControlDirective,Validators} from '@angular/forms';

@Component({
  selector: 'app-mark-leave',
  templateUrl: './mark-leave.component.html',
  styleUrls: ['./mark-leave.component.css']
})
export class MarkLeaveComponent {

  unMarkLeaveForm=new FormGroup<any>({
   
    employeeId: new FormControl('', [Validators.required]),
    sessionType:new FormControl('', [Validators.required]),
    leaveType:new FormControl('', [Validators.required]),
    fromDate:new FormControl('', [Validators.required]),
    applyTo:new FormControl('', [Validators.required]),
    appliedNoOfDays:new FormControl('', [Validators.required]),
    availableLeaves:new FormControl('', [Validators.required]),
    leavesBorrowed:new FormControl('', [Validators.required]),
    reason:new FormControl('', [Validators.required])

 })
 submit(item:any){
    console.log(item);
  }

  get(){
    return this.submit
  }
}
